package com.mindsync.modules

import android.app.Notification
import android.content.Intent
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
        startForeground(FOREGROUND_ID, notification)
        return super.onStartCommand(intent, flags, startId)
    }

    override fun getTaskConfig(intent: Intent?): HeadlessJsTaskConfig? =
        HeadlessJsTaskConfig(
            "SyncTask",
            Arguments.createMap(),
            30_000L,
            true,
        )

    companion object {
        private const val FOREGROUND_ID = 2
    }
}
