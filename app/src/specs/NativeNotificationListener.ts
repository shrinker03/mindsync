import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  isNotificationListenerEnabled(): Promise<boolean>;
  openNotificationListenerSettings(): void;
  // Reads + clears the durable native notification queue; returns a JSON array string.
  drainQueue(): Promise<string>;
  addListener(eventName: string): void;
  removeListeners(count: number): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('NotificationListener');
