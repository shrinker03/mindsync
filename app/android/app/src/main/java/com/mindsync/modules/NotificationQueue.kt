package com.mindsync.modules

import android.content.Context
import android.util.Log
import org.json.JSONArray
import org.json.JSONObject
import java.io.File

/**
 * Durable, process-independent buffer for captured notifications.
 *
 * Notifications are ephemeral — unlike SMS/call logs there is no OS content provider to
 * reconcile from later. [MindSyncNotificationListenerService] keeps running even when the app
 * (and its JS/React instance) is dead, so it writes each captured notification here. JS drains
 * the queue on the next sync, applies the denylist filter, and persists into Drizzle/SQLite.
 *
 * This is the one place native touches durable storage; it never writes the Drizzle DB directly.
 */
object NotificationQueue {

    private const val TAG = "MindSync.NotifQueue"
    private const val FILE_NAME = "notif_queue.jsonl"

    // Soft cap so a long offline stretch can't grow the file unbounded.
    private const val MAX_BYTES = 1_000_000L
    private const val KEEP_ENTRIES = 1_000

    private val lock = Any()

    fun enqueue(
        context: Context,
        pkg: String,
        key: String?,
        title: String,
        text: String,
        timestamp: Long,
    ) {
        val obj = JSONObject()
            .put("pkg", pkg)
            .put("key", key ?: "")
            .put("title", title)
            .put("text", text)
            .put("timestamp", timestamp)
        synchronized(lock) {
            val f = file(context)
            f.appendText(obj.toString() + "\n")
            if (f.length() > MAX_BYTES) trimLocked(f)
        }
        Log.d(TAG, "enqueued pkg=$pkg (queued while app may be closed)")
    }

    /** Reads every queued entry and clears the file. Returns a JSON array string (or "[]"). */
    fun drainAsJsonArray(context: Context): String {
        synchronized(lock) {
            val f = file(context)
            if (!f.exists()) return "[]"
            val arr = JSONArray()
            f.forEachLine { line ->
                val trimmed = line.trim()
                if (trimmed.isNotEmpty()) {
                    try {
                        arr.put(JSONObject(trimmed))
                    } catch (e: Exception) {
                        Log.w(TAG, "skipping malformed queue line", e)
                    }
                }
            }
            f.delete()
            Log.d(TAG, "drained ${arr.length()} queued notification(s)")
            return arr.toString()
        }
    }

    private fun trimLocked(f: File) {
        try {
            val kept = f.readLines().takeLast(KEEP_ENTRIES)
            f.writeText(kept.joinToString("\n", postfix = "\n"))
            Log.w(TAG, "queue exceeded $MAX_BYTES bytes; trimmed to last $KEEP_ENTRIES entries")
        } catch (e: Exception) {
            Log.w(TAG, "trim failed; clearing queue", e)
            f.delete()
        }
    }

    private fun file(context: Context): File =
        File(context.applicationContext.filesDir, FILE_NAME)
}
