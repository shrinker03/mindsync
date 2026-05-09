'use strict';

const TOKEN_KEY = 'mindsync.token';

const PKG_LABELS = {
  'com.whatsapp': 'WhatsApp',
  'com.whatsapp.w4b': 'WhatsApp Business',
  'org.telegram.messenger': 'Telegram',
  'com.google.android.gm': 'Gmail',
  'com.google.android.apps.messaging': 'Messages',
  'com.android.mms': 'Messages',
  'com.android.messaging': 'Messages',
  'com.samsung.android.messaging': 'Messages',
  'com.android.dialer': 'Phone',
  'com.google.android.dialer': 'Phone',
  'com.instagram.android': 'Instagram',
  'com.facebook.katana': 'Facebook',
  'com.facebook.orca': 'Messenger',
  'com.discord': 'Discord',
  'com.Slack': 'Slack',
  'com.spotify.music': 'Spotify',
  'com.android.chrome': 'Chrome',
  'com.google.android.youtube': 'YouTube',
  'com.linkedin.android': 'LinkedIn',
  'com.twitter.android': 'X',
  'com.zhiliaoapp.musically': 'TikTok',
  'com.microsoft.teams': 'Teams',
  'com.microsoft.outlook': 'Outlook',
};

const SMS_TYPE = {
  1: 'Inbox',
  2: 'Sent',
  3: 'Draft',
  4: 'Outbox',
  5: 'Failed',
  6: 'Queued',
};

const CALL_TYPE = {
  1: { label: 'Incoming', cls: 'type-incoming' },
  2: { label: 'Outgoing', cls: 'type-outgoing' },
  3: { label: 'Missed',   cls: 'type-missed' },
  4: { label: 'Voicemail',cls: 'type-other' },
  5: { label: 'Rejected', cls: 'type-missed' },
  6: { label: 'Blocked',  cls: 'type-missed' },
  7: { label: 'External', cls: 'type-other' },
};

const fmt = new Intl.DateTimeFormat(undefined, {
  month: 'short', day: 'numeric',
  hour: '2-digit', minute: '2-digit',
  hour12: false,
});

const state = {
  tab: 'notifications',
  query: '',
  pkg: '',
  items: [],
  nextCursor: null,
  loading: false,
  exhausted: false,
};

const $ = (id) => document.getElementById(id);

function fmtDate(ms) {
  const n = typeof ms === 'string' ? Number(ms) : ms;
  if (!Number.isFinite(n)) return '';
  return fmt.format(new Date(n));
}

function fmtDuration(seconds) {
  const s = Number(seconds) || 0;
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${r.toString().padStart(2, '0')}`;
}

function pkgLabel(pkg) {
  return PKG_LABELS[pkg] || pkg;
}

function escapeHtml(s) {
  if (s == null) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

async function api(path) {
  const token = localStorage.getItem(TOKEN_KEY);
  const res = await fetch(path, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.status === 401) {
    localStorage.removeItem(TOKEN_KEY);
    showLogin();
    throw new Error('Unauthorized');
  }
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

function showLogin() {
  $('login').classList.remove('hidden');
  $('header').classList.add('hidden');
  $('main').classList.add('hidden');
  $('login-error').textContent = '';
  $('token-input').focus();
}

function showApp() {
  $('login').classList.add('hidden');
  $('header').classList.remove('hidden');
  $('main').classList.remove('hidden');
}

async function tryLogin() {
  const token = $('token-input').value.trim();
  if (!token) return;
  $('login-error').textContent = '';
  // Probe a cheap endpoint to validate.
  try {
    const res = await fetch('/api/data/sms?limit=1', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.status === 401) {
      $('login-error').textContent = 'Invalid token.';
      return;
    }
    if (!res.ok) {
      $('login-error').textContent = `Server error (${res.status}).`;
      return;
    }
    localStorage.setItem(TOKEN_KEY, token);
    showApp();
    init();
  } catch (e) {
    $('login-error').textContent = `Network error: ${e.message}`;
  }
}

function logout() {
  localStorage.removeItem(TOKEN_KEY);
  showLogin();
  $('token-input').value = '';
}

function endpoint() {
  const params = new URLSearchParams();
  params.set('limit', '50');
  if (state.nextCursor) params.set('cursor', state.nextCursor);
  if (state.query) params.set('q', state.query);
  if (state.tab === 'notifications' && state.pkg) params.set('pkg', state.pkg);
  return `/api/data/${state.tab}?${params.toString()}`;
}

function rowSms(item) {
  const typeLabel = SMS_TYPE[item.type] || `Type ${item.type}`;
  return `
    <li class="row">
      <div class="row-meta">
        <span>${escapeHtml(typeLabel)}</span>
        <span>${escapeHtml(fmtDate(item.date))}</span>
      </div>
      <div class="row-body">
        <div class="row-title">${escapeHtml(item.address)}</div>
        <div class="row-text">${escapeHtml(item.body)}</div>
      </div>
    </li>`;
}

function rowCall(item) {
  const t = CALL_TYPE[item.type] || { label: `Type ${item.type}`, cls: 'type-other' };
  const display = item.name || item.number;
  return `
    <li class="row">
      <div class="row-meta">
        <span class="${t.cls}">${escapeHtml(t.label)}</span>
        <span>${escapeHtml(fmtDuration(item.duration))}</span>
        <span>${escapeHtml(fmtDate(item.date))}</span>
      </div>
      <div class="row-body">
        <div class="row-title">${escapeHtml(display)}</div>
        ${item.name ? `<div class="row-text">${escapeHtml(item.number)}</div>` : ''}
      </div>
    </li>`;
}

function rowNotif(item) {
  return `
    <li class="row">
      <div class="row-meta">
        <span class="chip">${escapeHtml(pkgLabel(item.pkg))}</span>
        <span>${escapeHtml(fmtDate(item.timestamp))}</span>
      </div>
      <div class="row-body">
        ${item.title ? `<div class="row-title">${escapeHtml(item.title)}</div>` : ''}
        ${item.text  ? `<div class="row-text">${escapeHtml(item.text)}</div>` : ''}
      </div>
    </li>`;
}

function renderItems() {
  const renderer = state.tab === 'sms' ? rowSms
                  : state.tab === 'calls' ? rowCall
                  : rowNotif;
  $('rows').innerHTML = state.items.map(renderer).join('');
}

function renderStatus() {
  if (state.loading) $('status').textContent = 'Loading…';
  else if (state.items.length === 0) $('status').textContent = 'No data.';
  else if (state.exhausted) $('status').textContent = `${state.items.length} rows.`;
  else $('status').textContent = `${state.items.length} loaded — scroll for more.`;
}

async function load(reset = false) {
  if (state.loading) return;
  if (reset) {
    state.items = [];
    state.nextCursor = null;
    state.exhausted = false;
    renderItems();
  }
  if (state.exhausted) return;
  state.loading = true;
  renderStatus();
  try {
    const data = await api(endpoint());
    state.items = state.items.concat(data.items);
    state.nextCursor = data.nextCursor;
    state.exhausted = !data.nextCursor;
    renderItems();
  } catch (e) {
    $('status').textContent = `Error: ${e.message}`;
  } finally {
    state.loading = false;
    renderStatus();
  }
}

async function loadPkgs() {
  if (state.tab !== 'notifications') return;
  try {
    const data = await api('/api/data/notifications/pkgs');
    const list = $('pkg-list');
    const all = `<li class="pkg-item ${!state.pkg ? 'active' : ''}" data-pkg="">
      <span>All apps</span>
      <span class="pkg-count">${data.items.reduce((a, b) => a + b.count, 0)}</span>
    </li>`;
    const items = data.items.map(p => `
      <li class="pkg-item ${state.pkg === p.pkg ? 'active' : ''}" data-pkg="${escapeHtml(p.pkg)}">
        <span>${escapeHtml(pkgLabel(p.pkg))}</span>
        <span class="pkg-count">${p.count}</span>
      </li>`).join('');
    list.innerHTML = all + items;
  } catch {
    $('pkg-list').innerHTML = '';
  }
}

function setTab(tab) {
  state.tab = tab;
  state.pkg = '';
  state.query = '';
  $('search').value = '';
  document.querySelectorAll('.tab').forEach(b => {
    b.classList.toggle('active', b.dataset.tab === tab);
  });
  $('main').classList.toggle('no-sidebar', tab !== 'notifications');
  load(true);
  loadPkgs();
}

function debounce(fn, ms) {
  let t = 0;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
}

const debouncedSearch = debounce(() => {
  state.query = $('search').value.trim();
  load(true);
}, 300);

function init() {
  document.querySelectorAll('.tab').forEach(b => {
    b.addEventListener('click', () => setTab(b.dataset.tab));
  });
  $('search').addEventListener('input', debouncedSearch);
  $('pkg-list').addEventListener('click', (e) => {
    const li = e.target.closest('.pkg-item');
    if (!li) return;
    state.pkg = li.dataset.pkg || '';
    document.querySelectorAll('.pkg-item').forEach(el => el.classList.remove('active'));
    li.classList.add('active');
    load(true);
  });
  $('content').addEventListener('scroll', () => {
    const el = $('content');
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 200) {
      if (!state.loading && !state.exhausted) load(false);
    }
  });
  $('logout-btn').addEventListener('click', logout);
  setTab('notifications');
}

$('login-btn').addEventListener('click', tryLogin);
$('token-input').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') tryLogin();
});

if (localStorage.getItem(TOKEN_KEY)) {
  showApp();
  init();
} else {
  showLogin();
}
