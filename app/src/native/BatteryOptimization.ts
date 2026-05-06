import { NativeModules } from 'react-native';

const { BatteryOptimization: Native } = NativeModules as {
  BatteryOptimization: {
    isIgnoring(): Promise<boolean>;
    requestIgnore(): Promise<void>;
    openSettings(): Promise<void>;
  };
};

export const BatteryOptimization = {
  isIgnoring(): Promise<boolean> {
    return Native.isIgnoring();
  },
  requestIgnore(): Promise<void> {
    return Native.requestIgnore();
  },
  openSettings(): Promise<void> {
    return Native.openSettings();
  },
};
