package com.mindsync.modules

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.service.notification.NotificationListenerService
import android.service.notification.StatusBarNotification
import android.util.LruCache
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.modules.core.DeviceEventManagerModule
import java.lang.ref.WeakReference

class MindSyncNotificationListenerService : NotificationListenerService() {

    private val recentHashes = LruCache<String, Int>(256)

    override fun onListenerConnected() {
        super.onListenerConnected()
        ensureChannel()
        val notification = Notification.Builder(this, CHANNEL_ID)
            .setContentTitle("MindSync")
            .setContentText("MindSync is capturing")
            .setSmallIcon(android.R.drawable.ic_dialog_info)
            .setOngoing(true)
            .build()
        startForeground(FOREGROUND_ID, notification)
    }

    override fun onListenerDisconnected() {
        super.onListenerDisconnected()
        stopForeground(STOP_FOREGROUND_REMOVE)
    }

    override fun onNotificationPosted(sbn: StatusBarNotification) {
        val ctx = reactContextRef?.get() ?: return
        if (!ctx.hasActiveReactInstance()) return
        val extras = sbn.notification.extras
        val title = extras.getCharSequence("android.title")?.toString() ?: ""
        val text = extras.getCharSequence("android.text")?.toString() ?: ""

        // Drop reposts whose content hasn't changed since the last emission for the same key.
        val contentHash = (sbn.packageName + "|" + title + "|" + text).hashCode()
        val previous = recentHashes.get(sbn.key)
        if (previous != null && previous == contentHash) return
        recentHashes.put(sbn.key, contentHash)

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

    private fun ensureChannel() {
        val channel = NotificationChannel(
            CHANNEL_ID,
            "MindSync Capture",
            NotificationManager.IMPORTANCE_LOW
        ).apply { description = "Persistent capture indicator" }
        getSystemService(NotificationManager::class.java).createNotificationChannel(channel)
    }

    companion object {
        const val CHANNEL_ID = "mind_sync_capture"
        private const val FOREGROUND_ID = 1
        private var reactContextRef: WeakReference<ReactApplicationContext>? = null

        fun setReactContext(ctx: ReactApplicationContext) {
            reactContextRef = WeakReference(ctx)
        }
    }
}
