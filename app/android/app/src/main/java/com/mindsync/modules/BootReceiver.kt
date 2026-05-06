package com.mindsync.modules

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.util.Log
import androidx.core.content.ContextCompat
import androidx.work.Constraints
import androidx.work.ExistingPeriodicWorkPolicy
import androidx.work.NetworkType
import androidx.work.PeriodicWorkRequestBuilder
import androidx.work.WorkManager
import java.util.concurrent.TimeUnit

class BootReceiver : BroadcastReceiver() {

    override fun onReceive(context: Context, intent: Intent) {
        when (intent.action) {
            Intent.ACTION_BOOT_COMPLETED,
            Intent.ACTION_MY_PACKAGE_REPLACED,
            "android.intent.action.QUICKBOOT_POWERON" -> {
                Log.d(TAG, "boot/replace event: ${intent.action} — re-enqueueing periodic sync")
                schedulePeriodic(context)
                kickImmediate(context)
            }
        }
    }

    private fun schedulePeriodic(context: Context) {
        try {
            val constraints = Constraints.Builder()
                .setRequiredNetworkType(NetworkType.CONNECTED)
                .build()
            val request = PeriodicWorkRequestBuilder<SyncWorker>(15, TimeUnit.MINUTES)
                .setConstraints(constraints)
                .build()
            WorkManager.getInstance(context.applicationContext)
                .enqueueUniquePeriodicWork(
                    SyncModule.WORK_NAME,
                    ExistingPeriodicWorkPolicy.KEEP,
                    request,
                )
        } catch (e: Exception) {
            Log.w(TAG, "schedulePeriodic failed", e)
        }
    }

    private fun kickImmediate(context: Context) {
        try {
            val svc = Intent(context, SyncTaskService::class.java).apply {
                putExtra(SyncTaskService.EXTRA_REASON, "boot")
            }
            ContextCompat.startForegroundService(context, svc)
        } catch (e: Exception) {
            Log.w(TAG, "kickImmediate failed", e)
        }
    }

    companion object {
        private const val TAG = "MindSync.BootReceiver"
    }
}
