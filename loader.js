const AUTH_URL = 'https://with-agri-dream.duckdns.org';
const CACHE_KEY_DATA = 'cached_data_js';
const CACHE_KEY_APP  = 'cached_app_js';
const TOKEN_KEY      = 'auth_token';

document.addEventListener('DOMContentLoaded', () => {
  initAuth();
});

async function initAuth() {
  const token = localStorage.getItem(TOKEN_KEY);

  if (token) {
    const valid = await verifyToken(token);
    if (valid) {
      await loadApp(token);
      return;
    }
    clearCache();
  }

  showAuthScreen();
}

async function verifyToken(token) {
  try {
    const res = await fetch(`${AUTH_URL}/verify`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    return data.valid === true;
  } catch {
    return false;
  }
}

function clearCache() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(CACHE_KEY_DATA);
  localStorage.removeItem(CACHE_KEY_APP);
}

// JSを動的にロード（Blob URL経由）
async function loadApp(token) {
  try {
    let dataJs = localStorage.getItem(CACHE_KEY_DATA);
    let appJs  = localStorage.getItem(CACHE_KEY_APP);

    if (!dataJs || !appJs) {
      // ラズパイからJSファイルを取得（プリフライト回避のためURLパラメータでトークン渡す）
      const [dataRes, appRes] = await Promise.all([
        fetch(`${AUTH_URL}/protected/data.js?t=${encodeURIComponent(token)}`),
        fetch(`${AUTH_URL}/protected/app.js?t=${encodeURIComponent(token)}`)
      ]);

      if (!dataRes.ok || !appRes.ok) {
        clearCache();
        showAuthScreen();
        return;
      }

      dataJs = await dataRes.text();
      appJs  = await appRes.text();

      localStorage.setItem(CACHE_KEY_DATA, dataJs);
      localStorage.setItem(CACHE_KEY_APP, appJs);
    }

    // Blob URLで動的に実行（順番に読み込む）
    await execScript(dataJs);
    await execScript(appJs);

    // DOMContentLoadedは再発火しないため直接初期化
    renderAlwaysDanger();
    showDisclaimer();

  } catch {
    clearCache();
    showAuthScreen();
  }
}

function execScript(code) {
  return new Promise((resolve, reject) => {
    const blob = new Blob([code], { type: 'application/javascript' });
    const url  = URL.createObjectURL(blob);
    const el   = document.createElement('script');
    el.src = url;
    el.onload = () => { URL.revokeObjectURL(url); resolve(); };
    el.onerror = reject;
    document.head.appendChild(el);
  });
}

function showAuthScreen() {
  const screen = document.getElementById('auth-screen');
  screen.hidden = false;

  const btn   = document.getElementById('auth-btn');
  const input = document.getElementById('auth-password');
  const errEl = document.getElementById('auth-error');

  const doLogin = async () => {
    const pw = input.value.trim();
    if (!pw) return;

    btn.disabled = true;
    btn.textContent = '確認中...';
    errEl.hidden = true;

    try {
      const res  = await fetch(`${AUTH_URL}/auth`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body:    `password=${encodeURIComponent(pw)}`
      });
      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem(TOKEN_KEY, data.token);
        screen.hidden = true;
        await loadApp(data.token);
      } else {
        errEl.textContent = 'パスワードが正しくありません';
        errEl.hidden = false;
        btn.disabled = false;
        btn.textContent = 'ログイン';
        input.value = '';
        input.focus();
      }
    } catch {
      errEl.textContent = 'サーバーに接続できません。時間をおいて再試行してください。';
      errEl.hidden = false;
      btn.disabled = false;
      btn.textContent = 'ログイン';
    }
  };

  btn.addEventListener('click', doLogin);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') doLogin(); });
}
