import { create } from 'zustand';

import { runSync } from '../services/sync/syncRunner';
import { appLog } from '../services/log';

interface SyncState {
  isSyncing: boolean;
  lastSyncAt: number | null;
  lastError: string | null;
  triggerSync: () => Promise<void>;
}

export const useSyncStore = create<SyncState>(set => ({
  isSyncing: false,
  lastSyncAt: null,
  lastError: null,
  triggerSync: async () => {
    set({ isSyncing: true, lastError: null });
    try {
      await runSync();
      set({ isSyncing: false, lastSyncAt: Date.now() });
      void appLog('info', 'sync', 'sync completed');
    } catch (e) {
      const msg = (e as Error).message;
      set({ isSyncing: false, lastError: msg });
      void appLog('error', 'sync', 'sync failed', { message: msg });
    }
  },
}));
