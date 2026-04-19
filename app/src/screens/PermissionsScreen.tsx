import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  useColorScheme,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  usePermissionsStore,
  PermissionKey,
  PermissionStatus,
} from '../stores/usePermissionsStore';

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

  useEffect(() => {
    refresh();
  }, [refresh]);

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

      {allGranted && (
        <View style={[styles.successBanner, { backgroundColor: '#dcfce7', borderColor: '#86efac' }]}>
          <Text style={styles.successText}>All permissions granted. MindSync is ready.</Text>
        </View>
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
});
