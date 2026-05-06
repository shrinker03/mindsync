import { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  useColorScheme,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { count, eq } from 'drizzle-orm';

import { db } from '../db';
import { callEntries, notifications, smsMessages } from '../db/schema';
import { useSyncStore } from '../stores/useSyncStore';
import { testConnection } from '../services/sync/runtimeConfig';

type Counts = { sms: number; calls: number; notifs: number };

function formatRelative(ts: number | null): string {
  if (!ts) return 'never';
  const diff = Date.now() - ts;
  if (diff < 5_000) return 'just now';
  if (diff < 60_000) return `${Math.floor(diff / 1000)}s ago`;
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`;
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h ago`;
  return new Date(ts).toLocaleString();
}

export function HomeScreen() {
  const isDark = useColorScheme() === 'dark';
  const insets = useSafeAreaInsets();
  const palette = isDark ? dark : light;

  const { isSyncing, lastSyncAt, lastError, triggerSync } = useSyncStore();
  const [pending, setPending] = useState<Counts | null>(null);
  const [total, setTotal] = useState<Counts | null>(null);
  const [connStatus, setConnStatus] = useState<string | null>(null);

  const refreshCounts = useCallback(() => {
    Promise.all([
      db.select({ n: count() }).from(smsMessages).where(eq(smsMessages.synced, 0)).get(),
      db.select({ n: count() }).from(callEntries).where(eq(callEntries.synced, 0)).get(),
      db.select({ n: count() }).from(notifications).where(eq(notifications.synced, 0)).get(),
      db.select({ n: count() }).from(smsMessages).get(),
      db.select({ n: count() }).from(callEntries).get(),
      db.select({ n: count() }).from(notifications).get(),
    ])
      .then(([ps, pc, pn, ts, tc, tn]) => {
        setPending({ sms: ps?.n ?? 0, calls: pc?.n ?? 0, notifs: pn?.n ?? 0 });
        setTotal({ sms: ts?.n ?? 0, calls: tc?.n ?? 0, notifs: tn?.n ?? 0 });
      })
      .catch(() => {
        setPending(null);
        setTotal(null);
      });
  }, []);

  useEffect(() => {
    refreshCounts();
    const id = setInterval(refreshCounts, 5000);
    return () => clearInterval(id);
  }, [refreshCounts]);

  const onSyncNow = async () => {
    await triggerSync();
    refreshCounts();
  };

  const onTestConn = async () => {
    setConnStatus('Testing…');
    const r = await testConnection();
    if (r.ok) setConnStatus(`OK (${r.status})`);
    else setConnStatus(`Failed: ${r.status ?? r.message ?? 'unknown'}`);
  };

  const totalPending = pending ? pending.sms + pending.calls + pending.notifs : null;

  return (
    <ScrollView
      style={[styles.root, { backgroundColor: palette.bg }]}
      contentContainerStyle={[styles.content, { paddingTop: insets.top + 24 }]}
    >
      <Text style={[styles.heading, { color: palette.fg }]}>MindSync</Text>
      <Text style={[styles.sub, { color: palette.muted }]}>
        Background capture is running. The app syncs automatically.
      </Text>

      <View style={[styles.card, { backgroundColor: palette.card, borderColor: palette.border }]}>
        <Text style={[styles.cardLabel, { color: palette.fg }]}>Sync status</Text>
        <Text style={[styles.row, { color: palette.muted }]}>
          {isSyncing ? 'Syncing now…' : `Last sync: ${formatRelative(lastSyncAt)}`}
        </Text>
        {lastError && (
          <Text style={[styles.row, { color: '#ef4444' }]} numberOfLines={3}>
            Error: {lastError}
          </Text>
        )}
        <Text style={[styles.bigNumber, { color: totalPending && totalPending > 0 ? palette.accent : palette.muted }]}>
          {totalPending ?? '–'}
        </Text>
        <Text style={[styles.row, { color: palette.muted }]}>pending to upload</Text>
      </View>

      <View style={[styles.card, { backgroundColor: palette.card, borderColor: palette.border }]}>
        <Text style={[styles.cardLabel, { color: palette.fg }]}>Captured (local DB)</Text>
        <View style={styles.gridRow}>
          <View style={styles.gridCell}>
            <Text style={[styles.cellLabel, { color: palette.muted }]}>SMS</Text>
            <Text style={[styles.cellValue, { color: palette.fg }]}>{total?.sms ?? '–'}</Text>
            {pending && pending.sms > 0 && (
              <Text style={[styles.cellHint, { color: palette.accent }]}>+{pending.sms}</Text>
            )}
          </View>
          <View style={styles.gridCell}>
            <Text style={[styles.cellLabel, { color: palette.muted }]}>Calls</Text>
            <Text style={[styles.cellValue, { color: palette.fg }]}>{total?.calls ?? '–'}</Text>
            {pending && pending.calls > 0 && (
              <Text style={[styles.cellHint, { color: palette.accent }]}>+{pending.calls}</Text>
            )}
          </View>
          <View style={styles.gridCell}>
            <Text style={[styles.cellLabel, { color: palette.muted }]}>Notifs</Text>
            <Text style={[styles.cellValue, { color: palette.fg }]}>{total?.notifs ?? '–'}</Text>
            {pending && pending.notifs > 0 && (
              <Text style={[styles.cellHint, { color: palette.accent }]}>+{pending.notifs}</Text>
            )}
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.btn, { backgroundColor: palette.accent }]}
        onPress={onSyncNow}
        activeOpacity={0.8}
        disabled={isSyncing}
      >
        <Text style={styles.btnText}>{isSyncing ? 'Syncing…' : 'Sync now'}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.btn, { backgroundColor: palette.btnSecondary, borderColor: palette.border, borderWidth: 1 }]}
        onPress={onTestConn}
        activeOpacity={0.8}
      >
        <Text style={[styles.btnText, { color: palette.fg }]}>Test connection</Text>
      </TouchableOpacity>
      {connStatus && (
        <Text style={[styles.row, { color: connStatus.startsWith('OK') ? '#22c55e' : '#ef4444', textAlign: 'center' }]}>
          {connStatus}
        </Text>
      )}
    </ScrollView>
  );
}

const light = {
  bg: '#f9fafb',
  fg: '#111827',
  muted: '#6b7280',
  card: '#ffffff',
  border: '#e5e7eb',
  accent: '#2563eb',
  btnSecondary: '#ffffff',
};
const dark = {
  bg: '#0b0f17',
  fg: '#f3f4f6',
  muted: '#9ca3af',
  card: '#1f2937',
  border: '#374151',
  accent: '#3b82f6',
  btnSecondary: '#1f2937',
};

const styles = StyleSheet.create({
  root: { flex: 1 },
  content: { paddingHorizontal: 20, paddingBottom: 24, gap: 16 },
  heading: { fontSize: 28, fontWeight: '700', marginBottom: 4 },
  sub: { fontSize: 14, lineHeight: 20, marginBottom: 8 },
  card: { borderRadius: 12, borderWidth: 1, padding: 16, gap: 4 },
  cardLabel: { fontSize: 13, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 },
  row: { fontSize: 13, lineHeight: 18 },
  bigNumber: { fontSize: 36, fontWeight: '700', marginTop: 4, textAlign: 'left' },
  gridRow: { flexDirection: 'row', gap: 12, marginTop: 4 },
  gridCell: { flex: 1, alignItems: 'flex-start' },
  cellLabel: { fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.5 },
  cellValue: { fontSize: 22, fontWeight: '700' },
  cellHint: { fontSize: 12, fontWeight: '600' },
  btn: { borderRadius: 8, paddingVertical: 12, alignItems: 'center' },
  btnText: { color: '#ffffff', fontWeight: '600', fontSize: 14 },
});
