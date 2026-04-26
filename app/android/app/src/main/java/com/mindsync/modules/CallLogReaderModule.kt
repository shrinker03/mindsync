package com.mindsync.modules

import android.provider.CallLog
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class CallLogReaderModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName() = NAME

    @ReactMethod
    fun read(afterId: String, limit: Int, promise: Promise) {
        try {
            val cr = reactApplicationContext.contentResolver
            val projection = arrayOf(
                CallLog.Calls._ID,
                CallLog.Calls.NUMBER,
                CallLog.Calls.DURATION,
                CallLog.Calls.DATE,
                CallLog.Calls.TYPE,
                CallLog.Calls.CACHED_NAME
            )
            // afterId cursors forward (ASC); no afterId fetches most recent (DESC)
            // CallLog provider rejects LIMIT in sortOrder — enforce in loop instead
            val selection = if (afterId.isNotEmpty()) "${CallLog.Calls._ID} > ?" else null
            val selectionArgs = if (afterId.isNotEmpty()) arrayOf(afterId) else null
            val sortOrder = if (afterId.isNotEmpty()) "${CallLog.Calls._ID} ASC" else "${CallLog.Calls._ID} DESC"

            val cursor = cr.query(
                CallLog.Calls.CONTENT_URI,
                projection,
                selection,
                selectionArgs,
                sortOrder
            )

            val result = Arguments.createArray()
            cursor?.use { c ->
                val colId = c.getColumnIndexOrThrow(CallLog.Calls._ID)
                val colNumber = c.getColumnIndexOrThrow(CallLog.Calls.NUMBER)
                val colDuration = c.getColumnIndexOrThrow(CallLog.Calls.DURATION)
                val colDate = c.getColumnIndexOrThrow(CallLog.Calls.DATE)
                val colType = c.getColumnIndexOrThrow(CallLog.Calls.TYPE)
                val colName = c.getColumnIndexOrThrow(CallLog.Calls.CACHED_NAME)

                var count = 0
                while (c.moveToNext() && count < limit) {
                    val row = Arguments.createMap()
                    row.putString("id", c.getLong(colId).toString())
                    row.putString("number", c.getString(colNumber) ?: "")
                    row.putDouble("duration", c.getLong(colDuration).toDouble())
                    row.putDouble("date", c.getLong(colDate).toDouble())
                    row.putInt("type", c.getInt(colType))
                    val name = c.getString(colName)
                    if (name != null) row.putString("name", name) else row.putNull("name")
                    result.pushMap(row)
                    count++
                }
            }

            promise.resolve(result)
        } catch (e: Exception) {
            promise.reject("CALL_LOG_READ_ERROR", e.message, e)
        }
    }

    companion object {
        const val NAME = "CallLogReader"
    }
}
