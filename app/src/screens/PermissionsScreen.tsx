import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  useColorScheme,
  AppState,
  AppStateStatus,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { count } from 'drizzle-orm';
import {
  usePermissionsStore,
  PermissionKey,
  PermissionStatus,
} from '../stores/usePermissionsStore';
import { NotificationListener, NotificationEvent } from '../native/NotificationListener';
import { SmsReaderModule } from '../native/SmsReader';
import { CallLogReaderModule } from '../native/CallLogReader';
import { syncSms } from '../services/smsSync';
import { syncCalls } from '../services/callSync';
import { db } from '../db';
import { smsMessages, callEntries, notifications } from '../db/schema';
import type { SmsEnvelope, CallEnvelope } from '@mind-sync/shared';

const PERMISSION_META: Record<PermissionKey, { label: string; description: string }> = {
  READ_SMS: {
    label: 'Read SMS',
    description: 'Read incoming and existing SMS messages for sync.',
  },
  RECEIVE_SMS: {
    label: 'Receive SMS',
    description: 'Capture SMS messages as they arrive.',
  },
  READ_CALL_LOG: {
    label: 'Read Call Log',
    description: 'Sync call history to your server.',
  },
  POST_NOTIFICATIONS: {
    label: 'Notifications',
    description: 'Show service status and sync alerts.',
  },
};

function statusColor(status: PermissionStatus, isDark: boolean): string {
  switch (status) {
    case 'granted':
      return '#22c55e';
    case 'denied':
    case 'never_ask_again':
      return '#ef4444';
    default:
      return isDark ? '#9ca3af' : '#6b7280';
  }
}

function statusLabel(status: PermissionStatus): string {
  switch (status) {
    case 'granted':
      return 'Granted';
    case 'denied':
      return 'Denied';
    case 'never_ask_again':
      return 'Blocked';
    default:
      return 'Not asked';
  }
}

export function PermissionsScreen() {
  const isDark = useColorScheme() === 'dark';
  const insets = useSafeAreaInsets();
  const palette = isDark ? dark : light;
  const { statuses, refresh, request } = usePermissionsStore();

  const [nlEnabled, setNlEnabled] = useState<boolean | null>(null);
  const [feed, setFeed] = useState<NotificationEvent[]>([]);
  const appStateRef = useRef<AppStateStatus>(AppState.currentState);
  const [smsRows, setSmsRows] = useState<SmsEnvelope[] | null>(null);
  const [smsError, setSmsError] = useState<string | null>(null);
  const [callRows, setCallRows] = useState<CallEnvelope[] | null>(null);
  const [callError, setCallError] = useState<string | null>(null);
  const [dbCounts, setDbCounts] = useState<{ sms: number; calls: number; notifs: number } | null>(null);
  const [syncStatus, setSyncStatus] = useState<string | null>(null);

  const refreshDbCounts = useCallback(() => {
    Promise.all([
      db.select({ n: count() }).from(smsMessages).get(),
      db.select({ n: count() }).from(callEntries).get(),
      db.select({ n: count() }).from(notifications).get(),
    ])
      .then(([s, c, n]) => setDbCounts({ sms: s?.n ?? 0, calls: c?.n ?? 0, notifs: n?.n ?? 0 }))
      .catch(() => setDbCounts(null));
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    const checkNl = () => {
      NotificationListener.isEnabled().then(setNlEnabled).catch(() => setNlEnabled(false));
    };
    checkNl();

    const sub = AppState.addEventListener('change', next => {
      if (appStateRef.current.match(/inactive|background/) && next === 'active') {
        checkNl();
      }
      appStateRef.current = next;
    });
    return () => sub.remove();
  }, []);

  useEffect(() => {
    const sub = NotificationListener.onNotification(event => {
      setFeed(prev => [event, ...prev].slice(0, 10));
    });
    return () => sub.remove();
  }, []);

  const keys = Object.keys(PERMISSION_META) as PermissionKey[];
  const allGranted = keys.every(k => statuses[k] === 'granted');

  return (
    <ScrollView
      style={[styles.root, { backgroundColor: palette.bg }]}
      contentContainerStyle={[styles.content, { paddingTop: insets.top + 24, paddingBottom: insets.bottom + 24 }]}
    >
      <Text style={[styles.heading, { color: palette.fg }]}>Permissions</Text>
      <Text style={[styles.sub, { color: palette.muted }]}>
        MindSync needs the following permissions to capture and sync your data.
      </Text>

      {keys.map(key => {
        const meta = PERMISSION_META[key];
        const status = statuses[key];
        const canRequest = status !== 'granted' && status !== 'never_ask_again';

        return (
          <View key={key} style={[styles.card, { backgroundColor: palette.card, borderColor: palette.border }]}>
            <View style={styles.cardHeader}>
              <Text style={[styles.permLabel, { color: palette.fg }]}>{meta.label}</Text>
              <Text style={[styles.badge, { color: statusColor(status, isDark) }]}>
                {statusLabel(status)}
              </Text>
            </View>
            <Text style={[styles.permDesc, { color: palette.muted }]}>{meta.description}</Text>
            {canRequest && (
              <TouchableOpacity
                style={[styles.btn, { backgroundColor: palette.accent }]}
                onPress={() => request(key)}
                activeOpacity={0.8}
              >
                <Text style={styles.btnText}>Grant</Text>
              </TouchableOpacity>
            )}
            {status === 'never_ask_again' && (
              <Text style={[styles.blocked, { color: palette.muted }]}>
                Open Android Settings → Apps → MindSync → Permissions to enable.
              </Text>
            )}
          </View>
        );
      })}

      <View style={[styles.card, { backgroundColor: palette.card, borderColor: palette.border }]}>
        <View style={styles.cardHeader}>
          <Text style={[styles.permLabel, { color: palette.fg }]}>Notification Listener</Text>
          <Text style={[styles.badge, { color: nlEnabled ? '#22c55e' : nlEnabled === null ? (isDark ? '#9ca3af' : '#6b7280') : '#ef4444' }]}>
            {nlEnabled === null ? 'Checking…' : nlEnabled ? 'Enabled' : 'Disabled'}
          </Text>
        </View>
        <Text style={[styles.permDesc, { color: palette.muted }]}>
          Captures WhatsApp and other notifications via system listener access.
        </Text>
        {!nlEnabled && (
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: palette.accent }]}
            onPress={() => NotificationListener.openSettings()}
            activeOpacity={0.8}
          >
            <Text style={styles.btnText}>Open Settings</Text>
          </TouchableOpacity>
        )}
      </View>

      {allGranted && nlEnabled && (
        <View style={[styles.successBanner, { backgroundColor: '#dcfce7', borderColor: '#86efac' }]}>
          <Text style={styles.successText}>All permissions granted. MindSync is ready.</Text>
        </View>
      )}

      {nlEnabled && (
        <View style={[styles.card, { backgroundColor: palette.card, borderColor: palette.border }]}>
          <Text style={[styles.permLabel, { color: palette.fg, marginBottom: 8 }]}>
            Live Notifications {feed.length > 0 ? `(${feed.length})` : ''}
          </Text>
          {feed.length === 0 ? (
            <Text style={[styles.permDesc, { color: palette.muted }]}>
              Waiting for notifications…
            </Text>
          ) : (
            feed.map((n, i) => (
              <View key={i} style={[styles.feedRow, { borderTopColor: palette.border, borderTopWidth: i === 0 ? 0 : 1 }]}>
                <Text style={[styles.feedPkg, { color: palette.accent }]}>{n.pkg}</Text>
                {n.title ? <Text style={[styles.feedTitle, { color: palette.fg }]}>{n.title}</Text> : null}
                {n.text ? <Text style={[styles.feedText, { color: palette.muted }]} numberOfLines={2}>{n.text}</Text> : null}
              </View>
            ))
          )}
        </View>
      )}

      <View style={[styles.card, { backgroundColor: palette.card, borderColor: palette.border }]}>
        <View style={styles.cardHeader}>
          <Text style={[styles.permLabel, { color: palette.fg }]}>SMS Reader</Text>
          {smsRows !== null && (
            <Text style={[styles.badge, { color: palette.accent }]}>{smsRows.length} rows</Text>
          )}
        </View>
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: palette.accent }]}
          onPress={() => {
            setSmsError(null);
            SmsReaderModule.read('', 50)
              .then(rows => setSmsRows(rows))
              .catch(e => setSmsError(String(e?.message ?? e)));
          }}
          activeOpacity={0.8}
        >
          <Text style={styles.btnText}>Read last 50 SMS</Text>
        </TouchableOpacity>
        {smsError && (
          <Text style={[styles.permDesc, { color: '#ef4444' }]}>{smsError}</Text>
        )}
        {smsRows?.slice(0, 50).map((s, i) => (
          <View key={s.id} style={[styles.feedRow, { borderTopColor: palette.border, borderTopWidth: i === 0 ? 0 : 1 }]}>
            <Text style={[styles.feedPkg, { color: palette.accent }]}>{s.address}</Text>
            <Text style={[styles.feedText, { color: palette.muted }]} numberOfLines={2}>{s.body}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.card, { backgroundColor: palette.card, borderColor: palette.border }]}>
        <View style={styles.cardHeader}>
          <Text style={[styles.permLabel, { color: palette.fg }]}>Call Log Reader</Text>
          {callRows !== null && (
            <Text style={[styles.badge, { color: palette.accent }]}>{callRows.length} rows</Text>
          )}
        </View>
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: palette.accent }]}
          onPress={() => {
            setCallError(null);
            CallLogReaderModule.read('', 50)
              .then(rows => setCallRows(rows))
              .catch(e => setCallError(String(e?.message ?? e)));
          }}
          activeOpacity={0.8}
        >
          <Text style={styles.btnText}>Read last 50 calls</Text>
        </TouchableOpacity>
        {callError && (
          <Text style={[styles.permDesc, { color: '#ef4444' }]}>{callError}</Text>
        )}
        {callRows?.slice(0, 50).map((c, i) => (
          <View key={c.id} style={[styles.feedRow, { borderTopColor: palette.border, borderTopWidth: i === 0 ? 0 : 1 }]}>
            <Text style={[styles.feedPkg, { color: palette.accent }]}>{c.name ?? c.number}</Text>
            <Text style={[styles.feedText, { color: palette.muted }]}>
              {c.type === 1 ? 'Incoming' : c.type === 2 ? 'Outgoing' : 'Missed'} · {c.duration}s
            </Text>
          </View>
        ))}
      </View>

      <View style={[styles.card, { backgroundColor: palette.card, borderColor: palette.border }]}>
        <Text style={[styles.permLabel, { color: palette.fg, marginBottom: 8 }]}>DB Status</Text>
        {dbCounts ? (
          <View style={{ gap: 2, marginBottom: 8 }}>
            <Text style={[styles.permDesc, { color: palette.muted }]}>SMS: {dbCounts.sms} rows</Text>
            <Text style={[styles.permDesc, { color: palette.muted }]}>Calls: {dbCounts.calls} rows</Text>
            <Text style={[styles.permDesc, { color: palette.muted }]}>Notifications: {dbCounts.notifs} rows</Text>
          </View>
        ) : (
          <Text style={[styles.permDesc, { color: palette.muted, marginBottom: 8 }]}>Not loaded</Text>
        )}
        {syncStatus && (
          <Text style={[styles.permDesc, { color: palette.accent, marginBottom: 8 }]}>{syncStatus}</Text>
        )}
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: palette.accent }]}
          onPress={refreshDbCounts}
          activeOpacity={0.8}
        >
          <Text style={styles.btnText}>Refresh counts</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: palette.accent, marginTop: 6 }]}
          onPress={() => {
            setSyncStatus('Syncing…');
            Promise.all([syncSms(), syncCalls()])
              .then(([smsInserted, callsInserted]) => {
                setSyncStatus(`Done — SMS +${smsInserted}, Calls +${callsInserted}`);
                refreshDbCounts();
              })
              .catch(e => setSyncStatus(`Error: ${String(e?.message ?? e)}`));
          }}
          activeOpacity={0.8}
        >
          <Text style={styles.btnText}>Sync SMS + Calls to DB</Text>
        </TouchableOpacity>
      </View>
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
};
const dark = {
  bg: '#0b0f17',
  fg: '#f3f4f6',
  muted: '#9ca3af',
  card: '#1f2937',
  border: '#374151',
  accent: '#3b82f6',
};

const styles = StyleSheet.create({
  root: { flex: 1 },
  content: { paddingHorizontal: 20, gap: 16 },
  heading: { fontSize: 28, fontWeight: '700', marginBottom: 4 },
  sub: { fontSize: 14, lineHeight: 20, marginBottom: 8 },
  card: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    gap: 6,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  permLabel: { fontSize: 16, fontWeight: '600' },
  badge: { fontSize: 13, fontWeight: '500' },
  permDesc: { fontSize: 13, lineHeight: 18 },
  btn: {
    marginTop: 8,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  btnText: { color: '#ffffff', fontWeight: '600', fontSize: 14 },
  blocked: { fontSize: 12, lineHeight: 17, marginTop: 4, fontStyle: 'italic' },
  successBanner: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    alignItems: 'center',
  },
  successText: { color: '#166534', fontWeight: '600', fontSize: 14 },
  feedRow: { paddingVertical: 8, gap: 2 },
  feedPkg: { fontSize: 11, fontWeight: '600' },
  feedTitle: { fontSize: 13, fontWeight: '500' },
  feedText: { fontSize: 12, lineHeight: 17 },
});
