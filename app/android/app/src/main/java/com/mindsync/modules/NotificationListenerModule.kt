package com.mindsync.modules

import android.provider.Settings
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import android.content.Intent

class NotificationListenerModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    init {
        MindSyncNotificationListenerService.setReactContext(reactContext)
    }

    override fun getName() = NAME

    @ReactMethod
    fun isNotificationListenerEnabled(promise: Promise) {
        val flat = Settings.Secure.getString(
            reactApplicationContext.contentResolver,
            "enabled_notification_listeners"
        )
        promise.resolve(flat != null && flat.contains(reactApplicationContext.packageName))
    }

    @ReactMethod
    fun openNotificationListenerSettings() {
        val intent = Intent(Settings.ACTION_NOTIFICATION_LISTENER_SETTINGS).apply {
            addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
        }
        reactApplicationContext.startActivity(intent)
    }

    /** Reads and clears the durable notification queue, returning a JSON array string. */
    @ReactMethod
    fun drainQueue(promise: Promise) {
        try {
            promise.resolve(NotificationQueue.drainAsJsonArray(reactApplicationContext))
        } catch (e: Exception) {
            promise.reject("NOTIF_QUEUE_DRAIN_ERROR", e.message, e)
        }
    }

    @ReactMethod
    fun addListener(eventName: String) {}

    @ReactMethod
    fun removeListeners(count: Int) {}

    companion object {
        const val NAME = "NotificationListener"
    }
}
