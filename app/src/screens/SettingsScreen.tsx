import { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Switch,
  useColorScheme,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { sql } from 'drizzle-orm';

import {
  getBearerToken,
  getServerUrl,
  setBearerToken,
  setServerUrl,
  testConnection,
} from '../services/sync/runtimeConfig';
import { block, listDenylist, unblock } from '../services/notificationFilter';
import { db } from '../db';
import { notifications } from '../db/schema';

type AppRow = { pkg: string; count: number };

export function SettingsScreen() {
  const isDark = useColorScheme() === 'dark';
  const insets = useSafeAreaInsets();
  const palette = isDark ? dark : light;

  const [url, setUrl] = useState('');
  const [token, setToken] = useState('');
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [testStatus, setTestStatus] = useState<string | null>(null);
  const [denylist, setDenylist] = useState<Set<string>>(new Set());
  const [appList, setAppList] = useState<AppRow[]>([]);

  const refreshFilter = useCallback(async () => {
    const dl = await listDenylist();
    setDenylist(new Set(dl));
    try {
      const rows = await db
        .select({ pkg: notifications.pkg, count: sql<number>`count(*)` })
        .from(notifications)
        .groupBy(notifications.pkg)
        .all();
      const merged = new Map<string, number>();
      rows.forEach(r => merged.set(r.pkg, r.count));
      dl.forEach(p => { if (!merged.has(p)) merged.set(p, 0); });
      const list = Array.from(merged.entries())
        .map(([pkg, count]) => ({ pkg, count }))
        .sort((a, b) => b.count - a.count || a.pkg.localeCompare(b.pkg));
      setAppList(list);
    } catch {
      setAppList([]);
    }
  }, []);

  useEffect(() => {
    Promise.all([getServerUrl(), getBearerToken()]).then(([u, t]) => {
      setUrl(u);
      setToken(t);
    });
    refreshFilter();
  }, [refreshFilter]);

  const onSave = async () => {
    setSaveStatus('Saving…');
    try {
      await Promise.all([setServerUrl(url), setBearerToken(token)]);
      setSaveStatus('Saved');
      setTimeout(() => setSaveStatus(null), 2000);
    } catch (e) {
      setSaveStatus(`Error: ${(e as Error).message}`);
    }
  };

  const onTest = async () => {
    setTestStatus('Testing…');
    const r = await testConnection();
    if (r.ok) setTestStatus(`OK (HTTP ${r.status})`);
    else setTestStatus(`Failed: ${r.status ?? r.message ?? 'unknown'}`);
  };

  const toggleApp = async (pkg: string, blocked: boolean) => {
    if (blocked) await unblock(pkg);
    else await block(pkg);
    refreshFilter();
  };

  return (
    <ScrollView
      style={[styles.root, { backgroundColor: palette.bg }]}
      contentContainerStyle={[styles.content, { paddingTop: insets.top + 24 }]}
    >
      <Text style={[styles.heading, { color: palette.fg }]}>Settings</Text>

      <View style={[styles.card, { backgroundColor: palette.card, borderColor: palette.border }]}>
        <Text style={[styles.cardLabel, { color: palette.fg }]}>Server</Text>
        <Text style={[styles.fieldLabel, { color: palette.muted }]}>URL</Text>
        <TextInput
          style={[styles.input, { color: palette.fg, borderColor: palette.border, backgroundColor: palette.bg }]}
          value={url}
          onChangeText={setUrl}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="https://example.onrender.com"
          placeholderTextColor={palette.muted}
        />
        <Text style={[styles.fieldLabel, { color: palette.muted, marginTop: 12 }]}>Bearer token</Text>
        <TextInput
          style={[styles.input, { color: palette.fg, borderColor: palette.border, backgroundColor: palette.bg }]}
          value={token}
          onChangeText={setToken}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
          placeholder="long-random-string"
          placeholderTextColor={palette.muted}
        />
        <View style={styles.btnRow}>
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: palette.accent, flex: 1 }]}
            onPress={onSave}
            activeOpacity={0.8}
          >
            <Text style={styles.btnText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: palette.btnSecondary, borderColor: palette.border, borderWidth: 1, flex: 1 }]}
            onPress={onTest}
            activeOpacity={0.8}
          >
            <Text style={[styles.btnText, { color: palette.fg }]}>Test</Text>
          </TouchableOpacity>
        </View>
        {saveStatus && (
          <Text style={[styles.row, { color: saveStatus === 'Saved' ? '#22c55e' : palette.muted }]}>{saveStatus}</Text>
        )}
        {testStatus && (
          <Text style={[styles.row, { color: testStatus.startsWith('OK') ? '#22c55e' : '#ef4444' }]}>{testStatus}</Text>
        )}
      </View>

      <View style={[styles.card, { backgroundColor: palette.card, borderColor: palette.border }]}>
        <Text style={[styles.cardLabel, { color: palette.fg }]}>Notification filter</Text>
        <Text style={[styles.row, { color: palette.muted }]}>
          Toggle off apps you don't want to capture. Default is allow-all. The list grows as new apps post notifications.
        </Text>
        {appList.length === 0 ? (
          <Text style={[styles.row, { color: palette.muted, marginTop: 8 }]}>
            No apps captured yet. Try a notification, then refresh.
          </Text>
        ) : (
          appList.map((a, i) => {
            const blocked = denylist.has(a.pkg);
            return (
              <View
                key={a.pkg}
                style={[styles.filterRow, { borderTopColor: palette.border, borderTopWidth: i === 0 ? 0 : 1 }]}
              >
                <View style={{ flex: 1, paddingRight: 12 }}>
                  <Text style={[styles.pkgName, { color: palette.fg }]} numberOfLines={1}>{a.pkg}</Text>
                  <Text style={[styles.pkgMeta, { color: palette.muted }]}>{a.count} captured</Text>
                </View>
                <Switch
                  value={!blocked}
                  onValueChange={() => toggleApp(a.pkg, blocked)}
                />
              </View>
            );
          })
        )}
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: palette.btnSecondary, borderColor: palette.border, borderWidth: 1, marginTop: 8 }]}
          onPress={refreshFilter}
          activeOpacity={0.8}
        >
          <Text style={[styles.btnText, { color: palette.fg }]}>Refresh app list</Text>
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
  card: { borderRadius: 12, borderWidth: 1, padding: 16, gap: 4 },
  cardLabel: { fontSize: 13, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 },
  fieldLabel: { fontSize: 12, marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
  },
  btnRow: { flexDirection: 'row', gap: 8, marginTop: 12 },
  btn: { borderRadius: 8, paddingVertical: 12, alignItems: 'center' },
  btnText: { color: '#ffffff', fontWeight: '600', fontSize: 14 },
  row: { fontSize: 13, lineHeight: 18, marginTop: 4 },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  pkgName: { fontSize: 13, fontWeight: '500' },
  pkgMeta: { fontSize: 11, marginTop: 2 },
});
