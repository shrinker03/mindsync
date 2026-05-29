import { DeviceEventEmitter } from 'react-native';
import NativeNotificationListener from '../specs/NativeNotificationListener';

export type NotificationEvent = {
  pkg: string;
  key?: string;
  title: string;
  text: string;
  timestamp: number;
};

export const NotificationListener = {
  isEnabled: (): Promise<boolean> =>
    NativeNotificationListener.isNotificationListenerEnabled(),

  openSettings: (): void =>
    NativeNotificationListener.openNotificationListenerSettings(),

  onNotification: (handler: (event: NotificationEvent) => void) =>
    DeviceEventEmitter.addListener('onNotification', handler),

  /**
   * Drains notifications the native listener captured while JS wasn't running (app closed).
   * Reads and clears the durable native queue.
   */
  drainQueue: async (): Promise<NotificationEvent[]> => {
    const json = await NativeNotificationListener.drainQueue();
    try {
      return JSON.parse(json) as NotificationEvent[];
    } catch {
      return [];
    }
  },
};
