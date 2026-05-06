package com.mindsync.modules

import android.content.Context
import android.content.Intent
import android.database.ContentObserver
import android.net.Uri
import android.os.Handler
import android.os.HandlerThread
import android.provider.CallLog
import android.util.Log
import androidx.core.content.ContextCompat

class CallLogObserver private constructor(
    private val appContext: Context,
    handler: Handler,
) : ContentObserver(handler) {

    override fun onChange(selfChange: Boolean, uri: Uri?) {
        Log.d(TAG, "CallLog changed (uri=$uri) — kicking SyncTaskService")
        val svc = Intent(appContext, SyncTaskService::class.java).apply {
            putExtra(SyncTaskService.EXTRA_REASON, "call")
        }
        try {
            ContextCompat.startForegroundService(appContext, svc)
        } catch (e: Exception) {
            Log.w(TAG, "failed to start SyncTaskService", e)
        }
    }

    companion object {
        private const val TAG = "MindSync.CallLogObserver"
        private var instance: CallLogObserver? = null
        private var thread: HandlerThread? = null

        @Synchronized
        fun register(context: Context) {
            if (instance != null) return
            val ht = HandlerThread("MindSyncCallLogObserver").apply { start() }
            val obs = CallLogObserver(context.applicationContext, Handler(ht.looper))
            context.applicationContext.contentResolver.registerContentObserver(
                CallLog.Calls.CONTENT_URI,
                true,
                obs,
            )
            instance = obs
            thread = ht
            Log.d(TAG, "registered")
        }

        @Synchronized
        fun unregister(context: Context) {
            val obs = instance ?: return
            try {
                context.applicationContext.contentResolver.unregisterContentObserver(obs)
            } catch (e: Exception) {
                Log.w(TAG, "unregister failed", e)
            }
            thread?.quitSafely()
            thread = null
            instance = null
            Log.d(TAG, "unregistered")
        }
    }
}
