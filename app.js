// 状態管理
const state = {
  month: null,
  vegetable: null,
  stage: null
};

// DOM取得
const stepMonth    = document.getElementById('step-month');
const stepVeg      = document.getElementById('step-veg');
const stepStage    = document.getElementById('step-stage');
const stepResult   = document.getElementById('step-result');

// 月選択
document.querySelectorAll('.month-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.month-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.month = parseInt(btn.dataset.month);
    state.vegetable = null;
    state.stage = null;
    renderVegetables();
    stepVeg.hidden = false;
    stepStage.hidden = true;
    stepResult.hidden = true;
    stepVeg.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// 野菜リスト描画
function renderVegetables() {
  const data = MONTH_DATA[state.month];
  const container = document.getElementById('veg-list');
  container.innerHTML = '';

  const note = document.getElementById('month-note');
  note.textContent = data.note;

  data.vegetables.forEach(vegId => {
    const veg = VEGETABLE_DATA[vegId];
    if (!veg) return;
    const btn = document.createElement('button');
    btn.className = 'veg-btn';
    btn.dataset.veg = vegId;
    btn.textContent = veg.name;
    btn.addEventListener('click', () => {
      document.querySelectorAll('.veg-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.vegetable = vegId;
      state.stage = null;
      renderStages();
      stepStage.hidden = false;
      stepResult.hidden = true;
      stepStage.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    container.appendChild(btn);
  });
}

// ステージリスト描画
function renderStages() {
  const veg = VEGETABLE_DATA[state.vegetable];
  const container = document.getElementById('stage-list');
  container.innerHTML = '';

  veg.stages.forEach(stageId => {
    const btn = document.createElement('button');
    btn.className = 'stage-btn';
    btn.dataset.stage = stageId;
    btn.textContent = STAGE_LABELS[stageId];
    btn.addEventListener('click', () => {
      document.querySelectorAll('.stage-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.stage = stageId;
      renderResult();
      stepResult.hidden = false;
      stepResult.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    container.appendChild(btn);
  });
}

// 結果描画
function renderResult() {
  const veg   = VEGETABLE_DATA[state.vegetable];
  const data  = veg.npk[state.stage];
  const prods = veg.products[state.stage];
  const drugs = veg.drugstore[state.stage];
  const pests = veg.pests;

  // タイトル
  document.getElementById('result-title').textContent =
    `${veg.name}（${STAGE_LABELS[state.stage]}）`;

  // N-P-K バー
  renderNPKBars(data.n, data.p, data.k);

  // アドバイス
  const tipEl = document.getElementById('result-tip');
  tipEl.innerHTML = `<img src="icons/tip.svg" class="inline-icon" alt=""> ${data.tip}`;

  // 市販品
  const prodList = document.getElementById('product-list');
  prodList.innerHTML = prods.map(p => `<li>${p}</li>`).join('');

  // ドラッグストア代替
  const drugList = document.getElementById('drugstore-list');
  drugList.innerHTML = drugs.map(d => `<li>${d}</li>`).join('');

  // 相性情報
  renderCompanions(state.vegetable);

  // 混用警告
  renderWarnings(prods, drugs);

  // 防虫対策
  const pestContainer = document.getElementById('pest-list');
  pestContainer.innerHTML = pests.map(pest => `
    <div class="pest-item">
      <div class="pest-name">${pest.name} <span class="pest-timing">（${pest.timing}）</span></div>
      <div class="pest-measure">${pest.measure}</div>
    </div>
  `).join('');

  // 防虫道具リスト
  const toolContainer = document.getElementById('pest-tools-list');
  toolContainer.innerHTML = PEST_TOOLS.map(tool => `
    <div class="pest-tool-item">
      <div class="pest-tool-name">${tool.name}</div>
      <div class="pest-tool-usage">${tool.usage}</div>
      <div class="pest-tool-where">入手先：${tool.where}</div>
    </div>
  `).join('');
}

// N-P-K バー描画
function renderNPKBars(n, p, k) {
  const max = Math.max(n, p, k, 1);
  const bars = [
    { label: 'N（窒素）', value: n, color: '#4caf50', desc: '葉・茎を育てる' },
    { label: 'P（リン酸）', value: p, color: '#ff9800', desc: '根・花・実を育てる' },
    { label: 'K（カリ）', value: k, color: '#9c27b0', desc: '実の充実・病害抵抗性' }
  ];

  const container = document.getElementById('npk-bars');
  container.innerHTML = bars.map(bar => {
    const pct = Math.round((bar.value / max) * 100);
    const label = bar.value === 0 ? '不要' : `${bar.value}%`;
    return `
      <div class="npk-row">
        <div class="npk-label">
          <span class="npk-name" style="color:${bar.color}">${bar.label}</span>
          <span class="npk-desc">${bar.desc}</span>
        </div>
        <div class="npk-bar-wrap">
          <div class="npk-bar" style="width:${pct}%;background:${bar.color}"></div>
          <span class="npk-value">${label}</span>
        </div>
      </div>
    `;
  }).join('');

  // 総評バッジ
  const badge = getNPKBadge(n, p, k);
  document.getElementById('npk-badge').textContent = badge;
}

// N-P-K比率の総評
function getNPKBadge(n, p, k) {
  if (n === 0 && p === 0 && k === 0) return '肥料不要';
  if (p > n && p > k) return '根・実づくり型（リン酸強化）';
  if (k > n && k > p) return '実充実型（カリ強化）';
  if (n > p && n > k) return '葉・茎育成型（窒素強化）';
  return 'バランス型';
}

// 相性情報描画
function renderCompanions(vegId) {
  const section = document.getElementById('companion-section');
  const data = COMPANION_DATA[vegId];

  if (!data) {
    section.hidden = true;
    return;
  }

  section.hidden = false;

  const goodEl = document.getElementById('companion-good');
  goodEl.innerHTML = data.good.map(item => `
    <div class="companion-item companion-good-item">
      <div class="companion-header">
        <img src="icons/good.svg" class="inline-icon" alt="">
        <span class="companion-partner">${item.partner}</span>
      </div>
      <div class="companion-reason">${item.reason}</div>
    </div>
  `).join('');

  const badEl = document.getElementById('companion-bad');
  badEl.innerHTML = data.bad.map(item => `
    <div class="companion-item companion-bad-item">
      <div class="companion-header">
        <img src="icons/bad.svg" class="inline-icon" alt="">
        <span class="companion-partner">${item.partner}</span>
      </div>
      <div class="companion-reason">${item.reason}</div>
    </div>
  `).join('');
}

// 結果テキストをスキャンして該当する警告を抽出
function detectWarnings(prods, drugs) {
  const allText = [...prods, ...drugs].join(' ');
  const matched = [];

  CHEMICAL_WARNINGS.forEach(w => {
    const hit = w.keywords.filter(kw => allText.includes(kw));
    if (hit.length > 0) {
      matched.push(w);
    }
  });

  return matched;
}

// 警告セクション描画
function renderWarnings(prods, drugs) {
  const container = document.getElementById('warning-list');
  const section   = document.getElementById('warning-section');
  const warnings  = detectWarnings(prods, drugs);

  if (warnings.length === 0) {
    section.hidden = true;
    return;
  }

  section.hidden = false;
  container.innerHTML = warnings.map(w => `
    <div class="warning-item warning-${w.level}">
      <div class="warning-title">
        <img src="icons/${w.level === 'danger' ? 'danger' : 'caution'}.svg" class="inline-icon" alt="">
        ${w.title}
      </div>
      <div class="warning-body">${w.body}</div>
    </div>
  `).join('');
}

// 常時表示の危険リスト描画（ページ読み込み時に1回）
function renderAlwaysDanger() {
  const container = document.getElementById('always-danger-list');
  container.innerHTML = ALWAYS_DANGER_LIST.map(item => `
    <div class="danger-combo">
      <img src="icons/danger.svg" class="inline-icon" alt="">
      <span class="danger-combo-name">${item.combo}</span>
      <span class="danger-combo-risk">→ ${item.risk}</span>
    </div>
  `).join('');
}

const AUTH_URL = 'https://with-agri-dream.duckdns.org';

// 起動時に常時警告を描画・認証チェック
document.addEventListener('DOMContentLoaded', () => {
  renderAlwaysDanger();
  initAuth();
});

// 認証フロー制御
async function initAuth() {
  const token = localStorage.getItem('auth_token');

  if (token) {
    const valid = await verifyToken(token);
    if (valid) {
      showDisclaimer();
      return;
    }
    localStorage.removeItem('auth_token');
  }

  showAuthScreen();
}

// トークン検証
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

// 認証画面を表示
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
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ password: pw })
      });
      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem('auth_token', data.token);
        screen.hidden = true;
        showDisclaimer();
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

// 免責同意画面を表示
function showDisclaimer() {
  const screen  = document.getElementById('disclaimer-screen');
  const appBody = document.getElementById('app-body');
  const btn     = document.getElementById('agree-btn');

  screen.hidden  = false;
  appBody.hidden = true;

  btn.addEventListener('click', () => {
    screen.hidden  = true;
    appBody.hidden = false;
  });
}

// 免責同意の制御（後方互換で残す）
function initDisclaimer() {
  showDisclaimer();
}
