import { useEffect } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { initDb } from './src/db';
import { startNotificationCapture } from './src/services/notificationCapture';
import { syncSms } from './src/services/smsSync';
import { syncCalls } from './src/services/callSync';
import { SyncModule } from './src/native/SyncModule';
import { useSyncStore } from './src/stores/useSyncStore';
import { PermissionsScreen } from './src/screens/PermissionsScreen';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    initDb().then(async () => {
      startNotificationCapture();
      await syncSms();
      await syncCalls();
      await useSyncStore.getState().triggerSync().catch(console.warn);
      SyncModule.schedulePeriodicSync().catch(console.warn);
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
