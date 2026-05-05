const AUTH_URL    = 'https://withagridream.com';
const LOGIN_URL   = `${AUTH_URL}/login`;
const TOKEN_KEY   = 'auth_token';
const CACHE_DATA  = 'cached_data_js';
const CACHE_APP   = 'cached_app_js';

document.addEventListener('DOMContentLoaded', () => {
  // リダイレクト後のトークンをURLハッシュから取得
  const hash = window.location.hash;
  if (hash.startsWith('#token=')) {
    const token = hash.slice(7);
    localStorage.setItem(TOKEN_KEY, token);
    // URLからトークンを消す
    history.replaceState(null, '', window.location.pathname);
  }

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

  // 未認証：ラズパイのログインページへリダイレクト
  window.location.href = LOGIN_URL;
}

async function verifyToken(token) {
  try {
    const res  = await fetch(`${AUTH_URL}/verify?t=${encodeURIComponent(token)}`);
    const data = await res.json();
    return data.valid === true;
  } catch {
    return false;
  }
}

function clearCache() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(CACHE_DATA);
  localStorage.removeItem(CACHE_APP);
}

async function loadApp(token) {
  try {
    let dataJs = localStorage.getItem(CACHE_DATA);
    let appJs  = localStorage.getItem(CACHE_APP);

    if (!dataJs || !appJs) {
      const [dataRes, appRes] = await Promise.all([
        fetch(`${AUTH_URL}/protected/data.js?t=${encodeURIComponent(token)}`),
        fetch(`${AUTH_URL}/protected/app.js?t=${encodeURIComponent(token)}`)
      ]);

      if (!dataRes.ok || !appRes.ok) {
        clearCache();
        window.location.href = LOGIN_URL;
        return;
      }

      dataJs = await dataRes.text();
      appJs  = await appRes.text();
      localStorage.setItem(CACHE_DATA, dataJs);
      localStorage.setItem(CACHE_APP, appJs);
    }

    execScript(dataJs);
    execScript(appJs);
    renderAlwaysDanger();
    showDisclaimer();

  } catch {
    clearCache();
    window.location.href = LOGIN_URL;
  }
}

function execScript(code) {
  const el = document.createElement('script');
  el.textContent = code;
  document.head.appendChild(el);
}
