package com.mindsync.modules

import android.app.Notification
import android.content.Intent
import android.content.pm.ServiceInfo
import android.os.Build
import android.util.Log
import com.facebook.react.HeadlessJsTaskService
import com.facebook.react.bridge.Arguments
import com.facebook.react.jstasks.HeadlessJsTaskConfig

class SyncTaskService : HeadlessJsTaskService() {

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        val notification = Notification.Builder(
            this,
            MindSyncNotificationListenerService.CHANNEL_ID,
        )
            .setContentTitle("MindSync")
            .setContentText("Syncing data…")
            .setSmallIcon(android.R.drawable.ic_dialog_info)
            .build()
        // shortService (API 34+): for quick background tasks. Unlike dataSync it can be started
        // from the background and is NOT subject to Android 15's ~6h/24h dataSync FGS budget,
        // which was crashing us with "Time limit already exhausted for foreground service type dataSync".
        try {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.UPSIDE_DOWN_CAKE) {
                startForeground(
                    FOREGROUND_ID,
                    notification,
                    ServiceInfo.FOREGROUND_SERVICE_TYPE_SHORT_SERVICE,
                )
            } else {
                startForeground(FOREGROUND_ID, notification)
            }
            Log.d(TAG, "startForeground ok (shortService); reason=${intent?.getStringExtra(EXTRA_REASON)}")
        } catch (e: Exception) {
            // Last-resort guard: never let an FGS-start refusal crash the whole process.
            Log.w(TAG, "startForeground refused; skipping this sync cycle", e)
            stopSelf()
            return START_NOT_STICKY
        }
        return super.onStartCommand(intent, flags, startId)
    }

    // shortService must finish within ~3 min; our sync takes seconds. If the system ever
    // signals a timeout, stop cleanly rather than being force-crashed.
    override fun onTimeout(startId: Int) {
        Log.w(TAG, "shortService onTimeout — stopping")
        stopSelf()
    }

    override fun onTimeout(startId: Int, fgsType: Int) {
        Log.w(TAG, "shortService onTimeout (type=$fgsType) — stopping")
        stopSelf()
    }

    override fun getTaskConfig(intent: Intent?): HeadlessJsTaskConfig? {
        val payload = Arguments.createMap()
        val reason = intent?.getStringExtra(EXTRA_REASON) ?: "periodic"
        payload.putString("reason", reason)
        return HeadlessJsTaskConfig(
            "SyncTask",
            payload,
            30_000L,
            true,
        )
    }

    companion object {
        private const val FOREGROUND_ID = 2
        private const val TAG = "MindSync.SyncTaskService"
        const val EXTRA_REASON = "mind_sync_reason"
    }
}
