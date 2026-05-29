import { EmitterSubscription } from 'react-native';

import { NotificationListener, type NotificationEvent } from '../native/NotificationListener';
import { db } from '../db';
import { notifications } from '../db/schema';
import { isAllowed } from './notificationFilter';

let subscription: EmitterSubscription | null = null;

function fnv1aHex(input: string): string {
  let hash = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(16).padStart(8, '0');
}

function makeExternalId(event: NotificationEvent): string {
  const key = event.key ?? '';
  const payload = `${event.pkg}|${key}|${event.title}|${event.text}`;
  // Two FNV-1a passes (raw + reversed) to widen the keyspace to 16 hex chars.
  return fnv1aHex(payload) + fnv1aHex(payload.split('').reverse().join(''));
}

async function handleNotification(event: NotificationEvent): Promise<void> {
  if (!(await isAllowed(event.pkg))) return;
  const externalId = makeExternalId(event);
  try {
    await db.insert(notifications)
      .values({
        externalId,
        pkg: event.pkg,
        title: event.title ?? null,
        text: event.text ?? null,
        timestamp: event.timestamp,
        synced: 0,
        createdAt: Date.now(),
      })
      .onConflictDoNothing()
      .run();
  } catch (e) {
    console.warn('notificationCapture write failed', e);
  }
}

/**
 * Drains notifications the native listener captured while JS wasn't running (app closed)
 * and persists them. Runs inside the sync reconcile step, alongside SMS/call reconcile.
 * Returns the number of queued events processed.
 */
export async function drainNativeNotifications(): Promise<number> {
  const events = await NotificationListener.drainQueue();
  for (const event of events) {
    await handleNotification(event);
  }
  return events.length;
}

export function startNotificationCapture(): void {
  if (subscription) return;
  subscription = NotificationListener.onNotification(handleNotification);
}

export function stopNotificationCapture(): void {
  subscription?.remove();
  subscription = null;
}
