package com.mindsync.modules

import android.provider.Telephony
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class SmsReaderModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName() = NAME

    @ReactMethod
    fun read(afterId: String, limit: Int, promise: Promise) {
        try {
            val cr = reactApplicationContext.contentResolver
            val projection = arrayOf("_id", "address", "body", "date", "type", "thread_id", "read")
            // afterId cursors forward (ASC); no afterId fetches most recent (DESC)
            val selection = if (afterId.isNotEmpty()) "_id > ?" else null
            val selectionArgs = if (afterId.isNotEmpty()) arrayOf(afterId) else null
            val sortOrder = if (afterId.isNotEmpty()) "_id ASC" else "_id DESC"

            val cursor = cr.query(
                Telephony.Sms.CONTENT_URI,
                projection,
                selection,
                selectionArgs,
                sortOrder
            )

            val result = Arguments.createArray()
            cursor?.use { c ->
                val colId = c.getColumnIndexOrThrow("_id")
                val colAddress = c.getColumnIndexOrThrow("address")
                val colBody = c.getColumnIndexOrThrow("body")
                val colDate = c.getColumnIndexOrThrow("date")
                val colType = c.getColumnIndexOrThrow("type")
                val colThread = c.getColumnIndexOrThrow("thread_id")
                val colRead = c.getColumnIndexOrThrow("read")

                var count = 0
                while (c.moveToNext() && count < limit) {
                    val row = Arguments.createMap()
                    row.putString("id", c.getLong(colId).toString())
                    row.putString("address", c.getString(colAddress) ?: "")
                    row.putString("body", c.getString(colBody) ?: "")
                    row.putDouble("date", c.getLong(colDate).toDouble())
                    row.putInt("type", c.getInt(colType))
                    row.putString("threadId", c.getLong(colThread).toString())
                    row.putInt("read", c.getInt(colRead))
                    result.pushMap(row)
                    count++
                }
            }

            promise.resolve(result)
        } catch (e: Exception) {
            promise.reject("SMS_READ_ERROR", e.message, e)
        }
    }

    companion object {
        const val NAME = "SmsReader"
    }
}
