import { NativeModules } from 'react-native';

const { SyncModule: Native } = NativeModules as {
  SyncModule: {
    schedulePeriodicSync(): Promise<void>;
  };
};

export const SyncModule = {
  schedulePeriodicSync(): Promise<void> {
    return Native.schedulePeriodicSync();
  },
};
