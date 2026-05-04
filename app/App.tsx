import { useEffect } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { initDb } from './src/db';
import { startNotificationCapture } from './src/services/notificationCapture';
import { syncSms } from './src/services/smsSync';
import { syncCalls } from './src/services/callSync';
import { SyncModule } from './src/native/SyncModule';
import { useSyncStore } from './src/stores/useSyncStore';
import { appLog } from './src/services/log';
import { PermissionsScreen } from './src/screens/PermissionsScreen';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    initDb()
      .then(async () => {
        void appLog('info', 'app', 'boot complete');
        startNotificationCapture();
        await syncSms();
        await syncCalls();
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

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <PermissionsScreen />
    </SafeAreaProvider>
  );
}

export default App;
