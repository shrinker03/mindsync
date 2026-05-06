package com.mindsync.modules

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.util.Log
import androidx.core.content.ContextCompat

class SmsReceiver : BroadcastReceiver() {

    override fun onReceive(context: Context, intent: Intent) {
        if (intent.action != "android.provider.Telephony.SMS_RECEIVED") return
        Log.d(TAG, "SMS_RECEIVED — kicking SyncTaskService for reconcile")

        val svc = Intent(context, SyncTaskService::class.java).apply {
            putExtra(SyncTaskService.EXTRA_REASON, "sms")
        }
        try {
            ContextCompat.startForegroundService(context, svc)
        } catch (e: Exception) {
            Log.w(TAG, "failed to start SyncTaskService", e)
        }
    }

    companion object {
        private const val TAG = "MindSync.SmsReceiver"
    }
}
