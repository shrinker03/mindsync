import { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, Text, TouchableOpacity, View, useColorScheme } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

import { initDb } from './src/db';
import { startNotificationCapture } from './src/services/notificationCapture';
import { SyncModule } from './src/native/SyncModule';
import { useSyncStore } from './src/stores/useSyncStore';
import { appLog } from './src/services/log';
import { HomeScreen } from './src/screens/HomeScreen';
import { PermissionsScreen } from './src/screens/PermissionsScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';

type Tab = 'home' | 'permissions' | 'settings';

function TabBar({
  active,
  onChange,
  isDark,
}: {
  active: Tab;
  onChange: (t: Tab) => void;
  isDark: boolean;
}) {
  const insets = useSafeAreaInsets();
  const palette = isDark ? dark : light;
  const tabs: Array<{ key: Tab; label: string }> = [
    { key: 'home', label: 'Home' },
    { key: 'permissions', label: 'Permissions' },
    { key: 'settings', label: 'Settings' },
  ];
  return (
    <View
      style={[
        styles.tabBar,
        {
          backgroundColor: palette.tabBg,
          borderTopColor: palette.border,
          paddingBottom: insets.bottom > 0 ? insets.bottom : 8,
        },
      ]}
    >
      {tabs.map(t => {
        const isActive = active === t.key;
        return (
          <TouchableOpacity
            key={t.key}
            style={styles.tabBtn}
            onPress={() => onChange(t.key)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.tabLabel,
                { color: isActive ? palette.accent : palette.muted },
                isActive && styles.tabLabelActive,
              ]}
            >
              {t.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [tab, setTab] = useState<Tab>('home');

  useEffect(() => {
    initDb()
      .then(async () => {
        void appLog('info', 'app', 'boot complete');
        startNotificationCapture();
        await useSyncStore.getState().triggerSync().catch((e: Error) => {
          void appLog('error', 'app', 'initial sync failed', { message: e.message });
          console.warn(e);
        });
        SyncModule.schedulePeriodicSync().catch(console.warn);
      })
      .catch((e: Error) => {
        void appLog('error', 'app', 'initDb failed', { message: e.message });
        console.warn(e);
      });
  }, []);

  const palette = isDarkMode ? dark : light;

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={[styles.body, { backgroundColor: palette.bg }]}>
        <View style={{ flex: 1 }}>
          {tab === 'home' && <HomeScreen />}
          {tab === 'permissions' && <PermissionsScreen />}
          {tab === 'settings' && <SettingsScreen />}
        </View>
        <TabBar active={tab} onChange={setTab} isDark={isDarkMode} />
      </View>
    </SafeAreaProvider>
  );
}

const light = {
  bg: '#f9fafb',
  tabBg: '#ffffff',
  border: '#e5e7eb',
  accent: '#2563eb',
  muted: '#6b7280',
};
const dark = {
  bg: '#0b0f17',
  tabBg: '#111827',
  border: '#1f2937',
  accent: '#3b82f6',
  muted: '#9ca3af',
};

const styles = StyleSheet.create({
  body: { flex: 1 },
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    paddingTop: 8,
  },
  tabBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  tabLabel: { fontSize: 13 },
  tabLabelActive: { fontWeight: '600' },
});

export default App;
