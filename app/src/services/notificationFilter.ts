import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'mindsync.notifFilterDenylist';

let cache: Set<string> | null = null;
let loadPromise: Promise<Set<string>> | null = null;

async function load(): Promise<Set<string>> {
  if (cache) return cache;
  if (loadPromise) return loadPromise;
  loadPromise = (async () => {
    const raw = await AsyncStorage.getItem(KEY);
    const arr: string[] = raw ? (JSON.parse(raw) as string[]) : [];
    cache = new Set(arr);
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
