import { DeviceEventEmitter } from 'react-native';
import NativeNotificationListener from '../specs/NativeNotificationListener';

export type NotificationEvent = {
  pkg: string;
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
};
