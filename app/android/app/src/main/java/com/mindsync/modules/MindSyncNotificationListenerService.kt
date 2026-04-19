package com.mindsync.modules

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.service.notification.NotificationListenerService
import android.service.notification.StatusBarNotification
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.modules.core.DeviceEventManagerModule
import java.lang.ref.WeakReference

class MindSyncNotificationListenerService : NotificationListenerService() {

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
        val extras = sbn.notification.extras
        val payload = Arguments.createMap().apply {
            putString("pkg", sbn.packageName)
            putString("title", extras.getCharSequence("android.title")?.toString() ?: "")
            putString("text", extras.getCharSequence("android.text")?.toString() ?: "")
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
