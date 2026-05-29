import { create } from 'zustand';

import { runSync } from '../services/sync/syncRunner';
import { syncSms } from '../services/smsSync';
import { syncCalls } from '../services/callSync';
import { drainNativeNotifications } from '../services/notificationCapture';
import { appLog } from '../services/log';

interface SyncState {
  isSyncing: boolean;
  lastSyncAt: number | null;
  lastError: string | null;
  triggerSync: () => Promise<void>;
}

// SMS broadcasts fire before the row is committed to content://sms — wait briefly so the reconcile read sees it.
const RECONCILE_SETTLE_MS = 1500;

async function reconcileLocal(): Promise<void> {
  await new Promise<void>(resolve => setTimeout(() => resolve(), RECONCILE_SETTLE_MS));
  const [smsAdded, callsAdded, notifsAdded] = await Promise.all([
    syncSms().catch(e => {
      void appLog('warn', 'sync', 'syncSms failed', { message: (e as Error).message });
      return 0;
    }),
    syncCalls().catch(e => {
      void appLog('warn', 'sync', 'syncCalls failed', { message: (e as Error).message });
      return 0;
    }),
    drainNativeNotifications().catch(e => {
      void appLog('warn', 'sync', 'drainNativeNotifications failed', { message: (e as Error).message });
      return 0;
    }),
  ]);
  if (smsAdded > 0 || callsAdded > 0 || notifsAdded > 0) {
    void appLog('info', 'sync', 'reconciled', { smsAdded, callsAdded, notifsAdded });
  }
}

export const useSyncStore = create<SyncState>(set => ({
  isSyncing: false,
  lastSyncAt: null,
  lastError: null,
  triggerSync: async () => {
    set({ isSyncing: true, lastError: null });
    try {
      await reconcileLocal();
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
