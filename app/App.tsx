import { StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent isDarkMode={isDarkMode} />
    </SafeAreaProvider>
  );
}

function AppContent({ isDarkMode }: { isDarkMode: boolean }) {
  const insets = useSafeAreaInsets();
  const palette = isDarkMode ? darkPalette : lightPalette;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: palette.bg, paddingTop: insets.top },
      ]}
    >
      <Text style={[styles.title, { color: palette.fg }]}>MindSync</Text>
    </View>
  );
}

const lightPalette = { bg: '#ffffff', fg: '#111111' };
const darkPalette = { bg: '#0b0b0b', fg: '#f5f5f5' };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});

export default App;
