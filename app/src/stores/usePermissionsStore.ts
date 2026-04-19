import { PermissionsAndroid, Permission } from 'react-native';
import { create } from 'zustand';

export type PermissionKey =
  | 'READ_SMS'
  | 'RECEIVE_SMS'
  | 'READ_CALL_LOG'
  | 'POST_NOTIFICATIONS';

export type PermissionStatus = 'unknown' | 'granted' | 'denied' | 'never_ask_again';

type PermissionsState = {
  statuses: Record<PermissionKey, PermissionStatus>;
  refresh: () => Promise<void>;
  request: (key: PermissionKey) => Promise<void>;
};

const ANDROID_PERMISSIONS: Record<PermissionKey, Permission> = {
  READ_SMS: PermissionsAndroid.PERMISSIONS.READ_SMS,
  RECEIVE_SMS: PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
  READ_CALL_LOG: PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
  POST_NOTIFICATIONS: PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
};

function toStatus(result: string): PermissionStatus {
  switch (result) {
    case PermissionsAndroid.RESULTS.GRANTED:
      return 'granted';
    case PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN:
      return 'never_ask_again';
    default:
      return 'denied';
  }
}

export const usePermissionsStore = create<PermissionsState>((set, get) => ({
  statuses: {
    READ_SMS: 'unknown',
    RECEIVE_SMS: 'unknown',
    READ_CALL_LOG: 'unknown',
    POST_NOTIFICATIONS: 'unknown',
  },

  refresh: async () => {
    const keys = Object.keys(ANDROID_PERMISSIONS) as PermissionKey[];
    const next: Record<PermissionKey, PermissionStatus> = { ...get().statuses };
    for (const key of keys) {
      const granted = await PermissionsAndroid.check(ANDROID_PERMISSIONS[key]);
      next[key] = granted ? 'granted' : next[key] === 'unknown' ? 'unknown' : next[key];
    }
    set({ statuses: next });
  },

  request: async (key: PermissionKey) => {
    const result = await PermissionsAndroid.request(ANDROID_PERMISSIONS[key]);
    set(state => ({
      statuses: { ...state.statuses, [key]: toStatus(result) },
    }));
  },
}));
