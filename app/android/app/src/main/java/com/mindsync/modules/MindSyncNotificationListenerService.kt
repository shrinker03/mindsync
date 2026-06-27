package com.mindsync.modules

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.content.Intent
import android.service.notification.NotificationListenerService
import android.service.notification.StatusBarNotification
import android.util.Log
import android.util.LruCache
import androidx.core.content.ContextCompat
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.modules.core.DeviceEventManagerModule
import java.lang.ref.WeakReference

class MindSyncNotificationListenerService : NotificationListenerService() {

    private val recentHashes = LruCache<String, Int>(256)

    override fun onListenerConnected() {
        super.onListenerConnected()
        ensureChannel()
    }

    override fun onNotificationPosted(sbn: StatusBarNotification) {
        // Skip group-summary notifications. Apps like Gmail/Slack/WhatsApp post a summary
        // alongside each child with the same title/text but a different sbn.key, so it gets
        // a different externalId and slips past dedup — the main source of duplicate rows.
        if (sbn.notification.flags and Notification.FLAG_GROUP_SUMMARY != 0) return

        val extras = sbn.notification.extras
        val title = extras.getCharSequence("android.title")?.toString() ?: ""
        val text = extras.getCharSequence("android.text")?.toString() ?: ""

        // Drop reposts whose content hasn't changed since the last emission for the same key.
        val contentHash = (sbn.packageName + "|" + title + "|" + text).hashCode()
        val previous = recentHashes.get(sbn.key)
        if (previous != null && previous == contentHash) return
        recentHashes.put(sbn.key, contentHash)

        // Always persist to the durable native queue. This service keeps running even when the
        // app's JS is dead, so this is the only path that survives the app being closed. JS
        // drains the queue on the next sync (where the denylist filter + dedupe are applied).
        try {
            NotificationQueue.enqueue(this, sbn.packageName, sbn.key, title, text, sbn.postTime)
        } catch (e: Exception) {
            Log.w(TAG, "failed to enqueue notification", e)
        }
        kickSync()

        // If JS is alive, also emit for immediate in-app capture. Harmless overlap with the
        // queue drain — both insert by externalId with onConflictDoNothing, so no duplicates.
        val ctx = reactContextRef?.get()
        if (ctx != null && ctx.hasActiveReactInstance()) {
            val payload = Arguments.createMap().apply {
                putString("pkg", sbn.packageName)
                putString("key", sbn.key)
                putString("title", title)
                putString("text", text)
                putDouble("timestamp", sbn.postTime.toDouble())
            }
            ctx.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit("onNotification", payload)
        }
    }

    // Kick a sync so queued notifications get drained promptly. Debounced so a burst of
    // notifications doesn't spin up the sync service dozens of times — one kick drains them all.
    private fun kickSync() {
        val now = System.currentTimeMillis()
        synchronized(kickLock) {
            if (now - lastKickAt < KICK_DEBOUNCE_MS) return
            lastKickAt = now
        }
        try {
            val svc = Intent(this, SyncTaskService::class.java).apply {
                putExtra(SyncTaskService.EXTRA_REASON, "notification")
            }
            ContextCompat.startForegroundService(this, svc)
        } catch (e: Exception) {
            Log.w(TAG, "failed to kick SyncTaskService", e)
        }
    }

    private fun ensureChannel() {
        val channel = NotificationChannel(
            CHANNEL_ID,
            "MindSync Capture",
            NotificationManager.IMPORTANCE_MIN
        ).apply { description = "Persistent capture indicator" }
        getSystemService(NotificationManager::class.java).createNotificationChannel(channel)
    }

    companion object {
        const val CHANNEL_ID = "mind_sync_capture_v2"
        private const val TAG = "MindSync.NotifListener"
        private const val KICK_DEBOUNCE_MS = 4_000L

        private val kickLock = Any()
        private var lastKickAt = 0L

        private var reactContextRef: WeakReference<ReactApplicationContext>? = null

        fun setReactContext(ctx: ReactApplicationContext) {
            reactContextRef = WeakReference(ctx)
        }
    }
}
