import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'mindsync.notifFilterDenylist';

// Seeded into the denylist on first run (when nothing has been stored yet). These are
// low-value, high-volume system notifications that are noise, not signal. The user can
// still unblock any of them from Settings — once stored, this default is never re-applied.
const DEFAULT_DENYLIST = [
  'com.android.systemui', // battery/charging "… until 90%" spam
  'com.samsung.android.app.updatecenter', // software-update nags
];

let cache: Set<string> | null = null;
let loadPromise: Promise<Set<string>> | null = null;

async function load(): Promise<Set<string>> {
  if (cache) return cache;
  if (loadPromise) return loadPromise;
  loadPromise = (async () => {
    const raw = await AsyncStorage.getItem(KEY);
    if (raw === null) {
      // Never set before — seed defaults and persist so the choice is editable.
      cache = new Set(DEFAULT_DENYLIST);
      await AsyncStorage.setItem(KEY, JSON.stringify(DEFAULT_DENYLIST));
      return cache;
    }
    cache = new Set(JSON.parse(raw) as string[]);
    return cache;
  })();
  return loadPromise;
}

async function save(): Promise<void> {
  if (!cache) return;
  await AsyncStorage.setItem(KEY, JSON.stringify(Array.from(cache)));
}

export async function isAllowed(pkg: string): Promise<boolean> {
  const set = await load();
  return !set.has(pkg);
}

export async function listDenylist(): Promise<string[]> {
  const set = await load();
  return Array.from(set).sort();
}

export async function block(pkg: string): Promise<void> {
  const set = await load();
  set.add(pkg);
  await save();
}

export async function unblock(pkg: string): Promise<void> {
  const set = await load();
  set.delete(pkg);
  await save();
}
