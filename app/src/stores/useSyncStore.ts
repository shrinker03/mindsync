import { create } from 'zustand';

import { runSync } from '../services/sync/syncRunner';

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
    } catch (e) {
      set({ isSyncing: false, lastError: (e as Error).message });
    }
  },
}));
