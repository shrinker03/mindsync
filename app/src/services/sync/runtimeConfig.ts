import AsyncStorage from '@react-native-async-storage/async-storage';

import { SYNC_BEARER_TOKEN, SYNC_SERVER_URL } from './syncConfig';

const KEY_URL = 'mindsync.serverUrl';
const KEY_TOKEN = 'mindsync.bearerToken';

let cachedUrl: string | null = null;
let cachedToken: string | null = null;

export async function getServerUrl(): Promise<string> {
  if (cachedUrl !== null) return cachedUrl;
  const stored = await AsyncStorage.getItem(KEY_URL);
  cachedUrl = stored && stored.length > 0 ? stored : SYNC_SERVER_URL;
  return cachedUrl;
}

export async function getBearerToken(): Promise<string> {
  if (cachedToken !== null) return cachedToken;
  const stored = await AsyncStorage.getItem(KEY_TOKEN);
  cachedToken = stored && stored.length > 0 ? stored : SYNC_BEARER_TOKEN;
  return cachedToken;
}

export async function setServerUrl(url: string): Promise<void> {
  const trimmed = url.trim().replace(/\/+$/, '');
  await AsyncStorage.setItem(KEY_URL, trimmed);
  cachedUrl = trimmed;
}

export async function setBearerToken(token: string): Promise<void> {
  const trimmed = token.trim();
  await AsyncStorage.setItem(KEY_TOKEN, trimmed);
  cachedToken = trimmed;
}

export async function testConnection(): Promise<{ ok: boolean; status?: number; message?: string }> {
  try {
    const url = await getServerUrl();
    const token = await getBearerToken();
    const res = await fetch(`${url}/api/health`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { ok: res.ok, status: res.status };
  } catch (e) {
    return { ok: false, message: (e as Error).message };
  }
}
