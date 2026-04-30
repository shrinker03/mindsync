/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { useSyncStore } from './src/stores/useSyncStore';

AppRegistry.registerComponent(appName, () => App);

AppRegistry.registerHeadlessTask('SyncTask', () => async () => {
  await useSyncStore.getState().triggerSync();
});
