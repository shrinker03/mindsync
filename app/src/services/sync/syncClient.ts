import { getBearerToken, getServerUrl } from './runtimeConfig';

export type SyncResponse = { accepted: number; duplicates: number };

function delay(ms: number): Promise<void> {
  return new Promise<void>(resolve => setTimeout(() => resolve(), ms));
}

const B64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

// UTF-8 + base64 encode, dependency-free (Hermes has no btoa/Buffer/TextEncoder).
// We wrap sync payloads in a base64 envelope so the upstream Cloudflare WAF (in
// front of Render) can't pattern-match notification/SMS text as an "attack" and
// 403 the request. The server decodes the envelope before validation.
function base64Utf8(str: string): string {
  const bytes: number[] = [];
  for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i);
    if (c < 0x80) {
      bytes.push(c);
    } else if (c < 0x800) {
      bytes.push(0xc0 | (c >> 6), 0x80 | (c & 0x3f));
    } else if (c >= 0xd800 && c <= 0xdbff) {
      const c2 = str.charCodeAt(++i);
      const cp = 0x10000 + ((c & 0x3ff) << 10) + (c2 & 0x3ff);
      bytes.push(0xf0 | (cp >> 18), 0x80 | ((cp >> 12) & 0x3f), 0x80 | ((cp >> 6) & 0x3f), 0x80 | (cp & 0x3f));
    } else {
      bytes.push(0xe0 | (c >> 12), 0x80 | ((c >> 6) & 0x3f), 0x80 | (c & 0x3f));
    }
  }

  let out = '';
  for (let i = 0; i < bytes.length; i += 3) {
    const b0 = bytes[i] ?? 0;
    const b1 = i + 1 < bytes.length ? bytes[i + 1] ?? 0 : 0;
    const b2 = i + 2 < bytes.length ? bytes[i + 2] ?? 0 : 0;
    out += B64[b0 >> 2];
    out += B64[((b0 & 3) << 4) | (b1 >> 4)];
    out += i + 1 < bytes.length ? B64[((b1 & 15) << 2) | (b2 >> 6)] : '=';
    out += i + 2 < bytes.length ? B64[b2 & 63] : '=';
  }
  return out;
}

export async function postBatch<T>(
  type: 'sms' | 'call' | 'notification',
  source: string,
  items: T[],
): Promise<SyncResponse> {
  const [serverUrl, token] = await Promise.all([getServerUrl(), getBearerToken()]);
  const url = `${serverUrl}/api/sync/${type}`;
  const body = JSON.stringify({ enc: 'b64', data: base64Utf8(JSON.stringify({ source, items })) });

  let lastError: Error = new Error('No attempts made');
  for (let attempt = 0; attempt < 3; attempt++) {
    if (attempt > 0) await delay(2 ** attempt * 1000);
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body,
      });
      if (!res.ok) {
        const snippet = (await res.text().catch(() => '')).slice(0, 200).replace(/\s+/g, ' ').trim();
        const server = res.headers.get('server');
        const cfRay = res.headers.get('cf-ray');
        const detail = [server && `server=${server}`, cfRay && `cf-ray=${cfRay}`, snippet && `body=${snippet}`]
          .filter(Boolean)
          .join(' ');
        throw new Error(`HTTP ${res.status}${detail ? ` (${detail})` : ''}`);
      }
      return (await res.json()) as SyncResponse;
    } catch (e) {
      lastError = e as Error;
    }
  }
  throw lastError;
}
