import { SYNC_SERVER_URL, SYNC_BEARER_TOKEN } from './syncConfig';

export type SyncResponse = { accepted: number; duplicates: number };

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function postBatch<T>(
  type: 'sms' | 'call' | 'notification',
  source: string,
  items: T[],
): Promise<SyncResponse> {
  const url = `${SYNC_SERVER_URL}/api/sync/${type}`;
  const body = JSON.stringify({ source, items });

  let lastError: Error = new Error('No attempts made');
  for (let attempt = 0; attempt < 3; attempt++) {
    if (attempt > 0) await delay(2 ** attempt * 1000);
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${SYNC_BEARER_TOKEN}`,
        },
        body,
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return (await res.json()) as SyncResponse;
    } catch (e) {
      lastError = e as Error;
    }
  }
  throw lastError;
}
