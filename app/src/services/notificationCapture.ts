import { EmitterSubscription } from 'react-native';

import { NotificationListener, type NotificationEvent } from '../native/NotificationListener';
import { db } from '../db';
import { notifications } from '../db/schema';

let subscription: EmitterSubscription | null = null;

function makeExternalId(event: NotificationEvent): string {
  return `${event.pkg}:${event.timestamp}`;
}

async function handleNotification(event: NotificationEvent): Promise<void> {
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

export function startNotificationCapture(): void {
  if (subscription) return;
  subscription = NotificationListener.onNotification(handleNotification);
}

export function stopNotificationCapture(): void {
  subscription?.remove();
  subscription = null;
}
