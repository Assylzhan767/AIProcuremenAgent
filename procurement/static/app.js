const API = "";

const state = {
  page: "home",
  lots: [],
  source: "",
  activeIndex: -1,
  detail: null,
  query: "",
  loading: false,
  lang: localStorage.getItem("lang") || "ru",
  theme: localStorage.getItem("theme") || "dark",
};

const store = {
  getAuth() { try { return JSON.parse(localStorage.getItem("auth") || "null"); } catch { return null; } },
  setAuth(a) { a ? localStorage.setItem("auth", JSON.stringify(a)) : localStorage.removeItem("auth"); },
  getApps() { try { return JSON.parse(localStorage.getItem("apps") || "[]"); } catch { return []; } },
  setApps(a) { localStorage.setItem("apps", JSON.stringify(a)); },
  getChats() { try { return JSON.parse(localStorage.getItem("chats") || "[]"); } catch { return []; } },
  setChats(c) { localStorage.setItem("chats", JSON.stringify(c)); },
};

// ---------- I18N ----------
const translations = {
  ru: {
    home: "Главная", registry: "Реестр", apps: "Мои заявки", report: "Отчёт", chats: "Чаты", profile: "Профиль",
    search: "Поиск товара (ноутбук, бумага, мебель...)", find: "Найти", refresh: "↻ Обновить лоты",
    login: "Войти", register: "Регистрация", logout: "Выйти", username: "Логин", password: "Пароль",
    submitApp: "Подать заявку", contact: "Связаться", aiReply: "🤖 AI-ответ", send: "Отправить",
    customer: "Заказчик", method: "Способ закупки", quantity: "Количество", price: "Сумма",
    status: "Статус", description: "Описание", general: "Общая информация", address: "Адрес",
    contacts: "Контакты", documents: "Документы",
    aiRecommend: "AI рекомендация", marketAnalysis: "Анализ рынка", suppliers: "Поставщики · Финансовый расчёт",
    bestChoice: "⭐ Лучший выбор", profit: "Прибыль", tax: "Налог 12%", netProfit: "Чистая прибыль",
    margin: "Маржа", deliveryDays: "Срок", reliability: "Надёжность", pricePerUnit: "Цена за ед.",
    totalCost: "Полная стоимость", deliveryCost: "Доставка",
    appNo: "№", appLot: "Лот", appProduct: "Товар", appSupplier: "Поставщик", appCost: "Стоимость", appNet: "Чистая прибыль", appStatus: "Статус", appActions: "Действия",
    cancel: "Отменить", annul: "Аннулировать", report_title: "Ручной отчёт по сделке",
    report_sub: "Расчёт прибыли с учётом всех расходов и налога 12%.",
    revenue: "Цена лота (доход), ₸", purchase: "Цена закупа за ед., ₸", deliveryF: "Доставка, ₸",
    packing: "Упаковка, ₸", other: "Прочие расходы, ₸", autoFill: "Авто заполнить из выбранного лота",
    calc: "Рассчитать", editor: "Редактор отчёта", exportPdf: "📄 PDF", exportWord: "📝 Word", exportExcel: "📊 Excel",
    profile_title: "Профиль", ecpLogin: "🔐 Войти через ЭЦП (симуляция)", clearLocal: "Очистить заявки и чаты",
    chatsCount: "Диалоги", noChats: "Нет диалогов", deleteChat: "Удалить",
    msg: "Введите сообщение...", aiVariant: "Вариант",
    statusSent: "Отправлена", statusPending: "В обработке", statusConfirmed: "Подтверждена",
    statusDone: "Выполнена", statusCancelled: "Отменена", statusReview: "На рассмотрении",
    openSource: "Открыть на goszakup.gov.kz →",
    heroTitle: "AI-агент для государственных закупок",
    heroDesc: "Автоматический мониторинг лотов goszakup.gov.kz, анализ цен, подбор поставщиков и подача заявок в один клик.",
    openRegistry: "Открыть реестр", regNow: "Зарегистрироваться",
    activeLots: "Активных лотов", yourApps: "Ваших заявок", dialogs: "Диалогов", srcCount: "Источника поставщиков",
  },
  kz: {
    home: "Басты", registry: "Тізілім", apps: "Менің өтінімдерім", report: "Есеп", chats: "Чаттар", profile: "Профиль",
    search: "Тауарды іздеу (ноутбук, қағаз, жиhаз...)", find: "Табу", refresh: "↻ Лоттарды жаңарту",
    login: "Кіру", register: "Тіркелу", logout: "Шығу", username: "Логин", password: "Құпиясөз",
    submitApp: "Өтінім беру", contact: "Хабарласу", aiReply: "🤖 AI-жауап", send: "Жіберу",
    customer: "Тапсырыс беруші", method: "Сатып алу әдісі", quantity: "Саны", price: "Сомасы",
    status: "Күйі", description: "Сипаттама", general: "Жалпы ақпарат", address: "Мекенжай",
    contacts: "Байланыс", documents: "Құжаттар",
    aiRecommend: "AI ұсыныс", marketAnalysis: "Нарықты талдау", suppliers: "Жеткізушілер · Қаржылық есептеу",
    bestChoice: "⭐ Үздік таңдау", profit: "Пайда", tax: "Салық 12%", netProfit: "Таза пайда",
    margin: "Маржа", deliveryDays: "Мерзім", reliability: "Сенімділік", pricePerUnit: "Бір бірлік бағасы",
    totalCost: "Толық құны", deliveryCost: "Жеткізу",
    appNo: "№", appLot: "Лот", appProduct: "Тауар", appSupplier: "Жеткізуші", appCost: "Құны", appNet: "Таза пайда", appStatus: "Күйі", appActions: "Әрекеттер",
    cancel: "Бас тарту", annul: "Күшін жою", report_title: "Мәміле бойынша қолмен есеп",
    report_sub: "Барлық шығындар мен 12% салықты ескере отырып пайданы есептеу.",
    revenue: "Лот бағасы (табыс), ₸", purchase: "Бір бірлікке сатып алу бағасы, ₸", deliveryF: "Жеткізу, ₸",
    packing: "Қаптама, ₸", other: "Басқа шығындар, ₸", autoFill: "Таңдалған лоттан авто толтыру",
    calc: "Есептеу", editor: "Есеп редакторы", exportPdf: "📄 PDF", exportWord: "📝 Word", exportExcel: "📊 Excel",
    profile_title: "Профиль", ecpLogin: "🔐 ЭЦҚ арқылы кіру (симуляция)", clearLocal: "Өтінімдер мен чаттарды тазалау",
    chatsCount: "Диалогтар", noChats: "Диалог жоқ", deleteChat: "Жою",
    msg: "Хабарлама енгізіңіз...", aiVariant: "Нұсқа",
    statusSent: "Жіберілді", statusPending: "Өңделуде", statusConfirmed: "Расталды",
    statusDone: "Орындалды", statusCancelled: "Бас тартылды", statusReview: "Қаралуда",
    openSource: "goszakup.gov.kz сайтында ашу →",
    heroTitle: "Мемлекеттік сатып алуларға арналған AI-агент",
    heroDesc: "goszakup.gov.kz лоттарын автоматты бақылау, бағаны талдау, жеткізушілерді таңдау және бір рет басу арқылы өтінім беру.",
    openRegistry: "Тізілімді ашу", regNow: "Тіркелу",
    activeLots: "Белсенді лоттар", yourApps: "Сіздің өтінімдер", dialogs: "Диалогтар", srcCount: "Жеткізушілер көзі",
  },
};
function t(key) { return (translations[state.lang] || translations.ru)[key] || translations.ru[key] || key; }

const app = document.getElementById("app");
const statusEl = document.getElementById("status");
const authArea = document.getElementById("authArea");
const chatBadge = document.getElementById("chatBadge");

function setStatus(text, type = "ok") {
  statusEl.textContent = text;
  statusEl.className = "status " + type;
}

function esc(s) {
  return String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
function fmt(n) { return typeof n === "number" ? n.toLocaleString("ru-RU") : n; }
function trunc(s, n = 80) { s = String(s || ""); return s.length > n ? s.slice(0, n) + "..." : s; }

async function safeFetch(url, options = {}) {
  try {
    const auth = store.getAuth();
    const headers = Object.assign({ "Content-Type": "application/json" }, options.headers || {});
    if (auth?.token) headers["Authorization"] = "Bearer " + auth.token;
    const res = await fetch(url, Object.assign({}, options, { headers }));
    const json = await res.json().catch(() => null);
    if (!res.ok) return { __error: true, status: res.status, detail: json?.detail };
    return json;
  } catch (e) { return null; }
}

// ---------- NAVIGATION ----------
function navigate(page) {
  state.page = page;
  document.querySelectorAll(".nav-item").forEach(b => b.classList.toggle("active", b.dataset.page === page));
  render();
}
document.querySelectorAll(".nav-item").forEach(b => b.addEventListener("click", () => navigate(b.dataset.page)));

// ---------- THEME + LANG ----------
function applyTheme() {
  document.body.classList.toggle("light", state.theme === "light");
  document.body.classList.toggle("dark", state.theme === "dark");
  const tb = document.getElementById("themeBtn");
  if (tb) tb.textContent = state.theme === "dark" ? "🌙" : "☀️";
}
function applyLang() {
  const map = { home: "home", registry: "registry", apps: "apps", report: "report", chats: "chats", profile: "profile" };
  document.querySelectorAll(".nav-item").forEach(b => {
    const k = b.dataset.page; if (map[k]) {
      const badge = b.querySelector(".nav-badge");
      b.firstChild && (b.firstChild.nodeType === 3) ? (b.firstChild.nodeValue = t(map[k]) + " ") : (b.textContent = t(map[k]));
      if (badge) b.appendChild(document.createTextNode(" ")), b.appendChild(badge);
    }
  });
  const lb = document.getElementById("langBtn");
  if (lb) lb.textContent = state.lang.toUpperCase();
}
document.getElementById("themeBtn").onclick = () => {
  state.theme = state.theme === "dark" ? "light" : "dark";
  localStorage.setItem("theme", state.theme);
  applyTheme();
};
document.getElementById("langBtn").onclick = () => {
  state.lang = state.lang === "ru" ? "kz" : "ru";
  localStorage.setItem("lang", state.lang);
  applyLang();
  render();
};

// ---------- AUTH ----------
function renderAuthArea() {
  const auth = store.getAuth();
  if (auth) {
    authArea.innerHTML = `<span class="user-tag">👤 ${esc(auth.username)}</span><button id="logoutBtn" class="btn-ghost">Выйти</button>`;
    document.getElementById("logoutBtn").onclick = () => { store.setAuth(null); renderAuthArea(); render(); };
  } else {
    authArea.innerHTML = `<button id="loginBtn" class="btn-ghost">Войти</button><button id="regBtn" class="btn-primary">Регистрация</button>`;
    document.getElementById("loginBtn").onclick = () => openModal("login");
    document.getElementById("regBtn").onclick = () => openModal("register");
  }
}

let authMode = "login";
const modal = document.getElementById("modal");
function openModal(mode) {
  authMode = mode;
  modal.classList.remove("hidden");
  document.getElementById("modalTitle").textContent = mode === "login" ? "Вход" : "Регистрация";
  document.getElementById("authSubmit").textContent = mode === "login" ? "Войти" : "Создать аккаунт";
  document.querySelectorAll(".tab").forEach(t => t.classList.toggle("active", t.dataset.mode === mode));
  document.getElementById("authError").textContent = "";
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
  setTimeout(() => document.getElementById("username").focus(), 50);
}
function closeModal() { modal.classList.add("hidden"); }
document.getElementById("modalClose").onclick = closeModal;
modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
document.querySelectorAll(".tab").forEach(t => t.onclick = () => openModal(t.dataset.mode));

document.getElementById("authForm").onsubmit = async (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;
  const errEl = document.getElementById("authError");
  errEl.textContent = "";
  if (!username || !password) { errEl.textContent = "Заполните оба поля"; return; }
  const r = await safeFetch(`${API}/${authMode}`, { method: "POST", body: JSON.stringify({ username, password }) });
  if (r && !r.__error && r.token) {
    store.setAuth({ username: r.username, token: r.token });
    closeModal();
    renderAuthArea();
    render();
  } else {
    errEl.textContent = (r && r.detail) || "Ошибка авторизации";
  }
};

// ---------- DATA ----------
async function loadLots(query, force = false) {
  state.loading = true;
  state.query = query;
  setStatus(force ? "Обновление с goszakup.gov.kz..." : "Загрузка...", "loading");
  render();
  const endpoint = force ? "refresh" : "lots";
  const r = await safeFetch(`${API}/goszakup/${endpoint}?product=${encodeURIComponent(query || "")}`);
  if (r && !r.__error && Array.isArray(r.data) && r.data.length) {
    state.lots = r.data;
    state.source = r.source || "live";
  } else {
    state.lots = [];
    state.source = "demo";
  }
  state.loading = false;
  state.activeIndex = -1;
  state.detail = null;
  setStatus(`Найдено: ${state.lots.length} · ${state.source}`, "ok");
  render();
}

async function selectLot(i) {
  state.activeIndex = i;
  state.detail = { loading: true };
  render();
  const lot = state.lots[i];
  const requests = [
    safeFetch(`${API}/goszakup/analyze/${i}`),
    safeFetch(`${API}/goszakup/suppliers/${i}`),
  ];
  if (lot && lot.announce_id) {
    requests.push(safeFetch(`${API}/goszakup/detail/${lot.announce_id}`));
  } else {
    requests.push(Promise.resolve(null));
  }
  const [a, s, d] = await Promise.all(requests);
  state.detail = {
    analysis: (a && !a.__error) ? a : null,
    suppliers: (s && !s.__error) ? s : null,
    full: (d && !d.__error) ? d.data : null,
  };
  render();
}

// ---------- ACTIONS ----------
async function applyTo(lotIndex, sup) {
  if (!store.getAuth()) { openModal("login"); return; }
  const lot = state.lots[lotIndex];
  const r = await safeFetch(`${API}/apply`, {
    method: "POST",
    body: JSON.stringify({ lot_index: lotIndex, supplier_name: sup.name, supplier_price: sup.full_cost, net_profit: sup.net_profit }),
  });
  const apps = store.getApps();
  const local = {
    id: r?.application?.id || Date.now(),
    user: store.getAuth().username,
    lot_no: lot.lot_no,
    product: lot.title,
    customer: lot.customer,
    supplier: sup.name,
    price: sup.full_cost,
    net_profit: sup.net_profit,
    status: "На рассмотрении",
    created: new Date().toISOString(),
  };
  apps.unshift(local);
  store.setApps(apps);
  alert("Заявка отправлена");
  render();
}

function contactSupplier(lotIndex, supplier) {
  const lot = state.lots[lotIndex];
  const chats = store.getChats();
  const key = `${lot.lot_no}::${supplier.name}`;
  let chat = chats.find(c => c.key === key);
  if (!chat) {
    chat = {
      key,
      lot: { lot_no: lot.lot_no, title: lot.title, customer: lot.customer, price: lot.price },
      supplier: { name: supplier.name, source: supplier.source, contact: supplier.contact, price: supplier.full_cost },
      messages: [
        { from: "system", text: `Чат создан с поставщиком «${supplier.name}» по лоту ${lot.lot_no}.`, ts: Date.now() },
        { from: "supplier", text: `Здравствуйте! Готовы обсудить условия поставки. Полная стоимость: ${fmt(supplier.full_cost)} ₸ (цена за ед. ${fmt(supplier.price_per_unit)} ₸ × ${supplier.quantity}, доставка ${fmt(supplier.delivery_cost)} ₸), срок ${supplier.delivery_days} дн.`, ts: Date.now() + 1 },
      ],
      created: Date.now(),
    };
    chats.unshift(chat);
    store.setChats(chats);
  }
  state.activeChatKey = key;
  navigate("chats");
}

function sendMessage(key, text) {
  if (!text.trim()) return;
  const chats = store.getChats();
  const chat = chats.find(c => c.key === key);
  if (!chat) return;
  chat.messages.push({ from: "me", text: text.trim(), ts: Date.now() });
  setTimeout(() => {
    const c2 = store.getChats().find(x => x.key === key);
    if (c2) {
      c2.messages.push({ from: "supplier", text: "Принято. Подготовим коммерческое предложение в течение дня.", ts: Date.now() });
      store.setChats(store.getChats().map(x => x.key === key ? c2 : x));
      if (state.page === "chats") render();
    }
  }, 1200);
  store.setChats(chats);
  render();
}

// ---------- RENDER ----------
function updateChatBadge() {
  const n = store.getChats().length;
  chatBadge.textContent = n > 0 ? n : "";
  chatBadge.style.display = n > 0 ? "inline-block" : "none";
}

function render() {
  updateChatBadge();
  if (state.page === "home") return renderHome();
  if (state.page === "registry") return renderRegistry();
  if (state.page === "apps") return renderApps();
  if (state.page === "chats") return renderChats();
  if (state.page === "profile") return renderProfile();
}

function renderHome() {
  const auth = store.getAuth();
  app.innerHTML = `
    <div class="hero">
      <div class="hero-content">
        <h1>${esc(t("heroTitle"))}</h1>
        <p>${esc(t("heroDesc"))}</p>
        <div class="hero-actions">
          <button class="btn-primary lg" onclick="navigate('registry')">${esc(t("openRegistry"))}</button>
          ${!auth ? `<button class="btn-ghost lg" id="heroReg">${esc(t("regNow"))}</button>` : `<button class="btn-ghost lg" onclick="navigate('apps')">${esc(t("apps"))}</button>`}
        </div>
      </div>
      <div class="hero-stats">
        <div class="stat-card"><div class="stat-num">${state.lots.length || "—"}</div><div class="stat-cap">${esc(t("activeLots"))}</div></div>
        <div class="stat-card"><div class="stat-num">${store.getApps().length}</div><div class="stat-cap">${esc(t("yourApps"))}</div></div>
        <div class="stat-card"><div class="stat-num">${store.getChats().length}</div><div class="stat-cap">${esc(t("dialogs"))}</div></div>
        <div class="stat-card"><div class="stat-num">4</div><div class="stat-cap">${esc(t("srcCount"))}</div></div>
      </div>
    </div>
  `;
  if (!auth) {
    const b = document.getElementById("heroReg");
    if (b) b.onclick = () => openModal("register");
  }
}

function renderRegistry() {
  app.innerHTML = `
    <div class="grid">
      <section class="panel left">
        <div class="search-box">
          <input id="search" type="text" placeholder="Поиск товара (ноутбук, бумага, мебель...)" value="${esc(state.query)}" autocomplete="off" />
          <button id="searchBtn">Найти</button>
        </div>
        <div class="left-actions">
          <span class="source-tag">${state.source ? `Источник: ${esc(state.source)}` : ""}</span>
          <button id="refreshBtn" class="btn-secondary sm">↻ Обновить лоты</button>
        </div>
        <div id="lots" class="lots-list">${renderLotsList()}</div>
      </section>
      <section class="panel right">
        ${renderDetailPane()}
      </section>
    </div>
  `;
  const search = document.getElementById("search");
  const searchBtn = document.getElementById("searchBtn");
  let dt;
  search.addEventListener("input", () => { clearTimeout(dt); dt = setTimeout(() => loadLots(search.value.trim()), 400); });
  search.addEventListener("keydown", e => { if (e.key === "Enter") loadLots(search.value.trim()); });
  searchBtn.onclick = () => loadLots(search.value.trim());
  document.getElementById("refreshBtn").onclick = () => loadLots(search.value.trim(), true);
  document.querySelectorAll(".lot-card").forEach(el => el.onclick = () => selectLot(+el.dataset.i));
  if (!state.lots.length && !state.loading) loadLots("");
}

function statusClass(s) {
  s = (s || "").toLowerCase();
  if (s.includes("заверш") || s.includes("отмен")) return "done";
  if (s.includes("прием") || s.includes("приём")) return "active";
  return "open";
}

function renderLotsList() {
  if (state.loading) return `<div class="loading">Загрузка лотов...</div>`;
  if (!state.lots.length) return `<div class="empty">Нет данных</div>`;
  return state.lots.map((lot, i) => `
    <div class="lot-card${i === state.activeIndex ? " active" : ""}" data-i="${i}">
      <div class="lot-no">№ ${esc(lot.lot_no)}</div>
      <div class="lot-name">${esc(trunc(lot.title, 60))}</div>
      <div class="lot-meta">
        <span class="price">${esc(lot.price)}</span>
        <span class="lot-status ${statusClass(lot.status)}">${esc(trunc(lot.status || "Опубликован", 18))}</span>
      </div>
      <div class="lot-actions"><button class="more-btn">Подробнее →</button></div>
    </div>
  `).join("");
}

function renderSections(sections, fallbackDesc) {
  if (!sections) return fallbackDesc ? `<div class="description">${esc(fallbackDesc)}</div>` : "";
  const order = [
    { key: "general",     icon: "📋", title: t("general") },
    { key: "customer",    icon: "🏢", title: t("customer") },
    { key: "address",     icon: "📍", title: t("address") },
    { key: "contacts",    icon: "📞", title: t("contacts") },
    { key: "description", icon: "📝", title: t("description") },
  ];
  const blocks = order.filter(o => Array.isArray(sections[o.key]) && sections[o.key].length).map(o => `
    <div class="info-card">
      <div class="info-card-head"><span>${o.icon}</span><span>${esc(o.title)}</span></div>
      <div class="info-card-body">
        ${sections[o.key].map(it => `<div class="info-row"><span>${esc(it.label)}</span><b>${esc(it.value)}</b></div>`).join("")}
      </div>
    </div>
  `).join("");
  return blocks || (fallbackDesc ? `<div class="description">${esc(fallbackDesc)}</div>` : "");
}

function renderDetailPane() {
  if (!state.detail) return `<div class="empty large">Выберите лот слева, чтобы увидеть полную информацию, поставщиков и подать заявку</div>`;
  if (state.detail.loading) return `<div class="loading">Загрузка анализа и поставщиков...</div>`;
  const lot = state.lots[state.activeIndex];
  const a = state.detail.analysis;
  const s = state.detail.suppliers;
  const full = state.detail.full || {};
  const customer = full.customer || lot.customer;
  const method = full.method || lot.method;
  const status = full.status || lot.status;
  const quantity = full.quantity || lot.qty;
  const description = full.description || lot.description || lot.title;
  const docs = Array.isArray(full.documents) ? full.documents : [];
  const sourceUrl = full.url || (lot.announce_id ? `https://goszakup.gov.kz/ru/announce/index/${lot.announce_id}` : null);

  return `
    <div class="detail-block">
      <div class="lot-head">
        <span class="lot-no big">№ ${esc(lot.lot_no)}</span>
        <span class="lot-status ${statusClass(status)}">${esc(status)}</span>
      </div>
      <h2 class="lot-title">${esc(lot.title)}</h2>
      <div class="kv-grid">
        <div><span>Заказчик</span><b>${esc(customer)}</b></div>
        <div><span>Способ закупки</span><b>${esc(method)}</b></div>
        <div><span>Количество</span><b>${esc(quantity)}</b></div>
        <div><span>Сумма</span><b class="accent">${esc(lot.price)}</b></div>
      </div>
      ${renderSections(full.sections, description)}
      ${sourceUrl ? `<div class="lot-source"><a href="${esc(sourceUrl)}" target="_blank" rel="noopener">${esc(t("openSource"))}</a></div>` : ""}
      ${docs.length ? `
        <div class="docs">
          <div class="docs-head">${esc(t("documents"))} (${docs.length})</div>
          ${docs.map(d => `<a class="doc-link" href="${esc(d.url)}" target="_blank" rel="noopener">📄 ${esc(d.name)}</a>`).join("")}
        </div>
      ` : ""}
    </div>

    <div class="detail-block">
      <h3>Анализ рынка</h3>
      ${a ? `
        <div class="stats">
          <div class="stat"><div class="stat-label">Средняя</div><div class="stat-val">${fmt(a.avg)} ₸</div></div>
          <div class="stat"><div class="stat-label">Мин.</div><div class="stat-val">${fmt(a.min)} ₸</div></div>
          <div class="stat"><div class="stat-label">Макс.</div><div class="stat-val">${fmt(a.max)} ₸</div></div>
          <div class="stat"><div class="stat-label">Выборка</div><div class="stat-val">${a.sample_size}</div></div>
        </div>
        <div class="explanation">${esc(a.explanation)}</div>
      ` : `<div class="empty">Нет данных анализа</div>`}
    </div>

    ${s ? renderAIBox(s) : ""}

    <div class="detail-block">
      <h3>Поставщики · Финансовый расчёт</h3>
      <div class="suppliers">
        ${(s?.suppliers || []).map((sup, idx) => renderSupplierCard(sup, idx, s.recommended)).join("")}
      </div>
    </div>
  `;
}

function profitClass(v) {
  if (v > 0) return "pos";
  if (v < 0) return "neg";
  return "warn";
}

function renderAIBox(s) {
  const best = s.recommended;
  if (!best) return "";
  const cls = profitClass(best.net_profit);
  return `
    <div class="ai-recommend ${cls}">
      <div class="ai-head">
        <span class="ai-icon">🤖</span>
        <span>AI рекомендация</span>
      </div>
      <div class="ai-body">
        <div class="ai-title">${esc(best.name)}</div>
        <div class="ai-text">${esc(s.explanation)}</div>
        <div class="ai-stats">
          <div><span>Чистая прибыль</span><b class="${cls}">${fmt(best.net_profit)} ₸</b></div>
          <div><span>Маржа</span><b class="${cls}">${best.margin_pct}%</b></div>
          <div><span>Срок</span><b>${best.delivery_days} дн.</b></div>
          <div><span>Надёжность</span><b>${best.reliability}%</b></div>
        </div>
      </div>
    </div>
  `;
}

function renderSupplierCard(sup, idx, best) {
  const isBest = best && sup.name === best.name;
  const pCls = profitClass(sup.net_profit);
  return `
    <div class="supplier${isBest ? " best" : ""}">
      ${isBest ? `<div class="best-badge">⭐ Лучший выбор</div>` : ""}
      <div class="sup-head">
        <div>
          <div class="sup-name">${esc(sup.name)}</div>
          <div class="sup-meta">Срок ${sup.delivery_days} дн. · Надёжность ${sup.reliability}%</div>
        </div>
        <div class="sup-source">${esc(sup.source)}</div>
      </div>
      <div class="fin-grid">
        <div class="fin-cell"><span>Цена за ед.</span><b>${fmt(sup.price_per_unit)} ₸</b></div>
        <div class="fin-cell"><span>Кол-во × сумма</span><b>${sup.quantity} × ${fmt(sup.total)} ₸</b></div>
        <div class="fin-cell"><span>Доставка</span><b>${fmt(sup.delivery_cost)} ₸</b></div>
        <div class="fin-cell"><span>Полная стоимость</span><b>${fmt(sup.full_cost)} ₸</b></div>
        <div class="fin-cell"><span>Прибыль</span><b class="${profitClass(sup.profit)}">${fmt(sup.profit)} ₸</b></div>
        <div class="fin-cell"><span>Налог 12%</span><b>${fmt(sup.tax)} ₸</b></div>
        <div class="fin-cell highlight"><span>Чистая прибыль</span><b class="${pCls}">${fmt(sup.net_profit)} ₸</b></div>
        <div class="fin-cell"><span>Маржа</span><b class="${pCls}">${sup.margin_pct}%</b></div>
      </div>
      <div class="sup-actions">
        <button class="btn-primary sm" data-apply="${idx}">Подать заявку</button>
        <button class="btn-secondary sm" data-contact="${idx}">Связаться</button>
      </div>
    </div>
  `;
}

// post-render bindings for registry detail
function bindDetailButtons() {
  const s = state.detail?.suppliers;
  if (!s) return;
  document.querySelectorAll("[data-apply]").forEach(b => {
    b.onclick = () => {
      const sup = s.suppliers[+b.dataset.apply];
      applyTo(state.activeIndex, sup);
    };
  });
  document.querySelectorAll("[data-contact]").forEach(b => {
    b.onclick = () => {
      const sup = s.suppliers[+b.dataset.contact];
      contactSupplier(state.activeIndex, sup);
    };
  });
}
const _origRender = render;
function render() {
  updateChatBadge();
  if (state.page === "home") renderHome();
  else if (state.page === "registry") { renderRegistry(); bindDetailButtons(); }
  else if (state.page === "apps") renderApps();
  else if (state.page === "report") renderReport();
  else if (state.page === "chats") renderChats();
  else if (state.page === "profile") renderProfile();
}

function generateAiVariants(chat, lastMsg) {
  const supplier = chat.supplier?.name || "поставщик";
  const lotTitle = chat.lot?.title || "товар";
  const qty = chat.lot?.qty || "—";
  const isKz = state.lang === "kz";
  if (isKz) return [
    `Құрметті ${supplier}, ${lotTitle} (${qty}) бойынша ұсынысыңыз үшін рахмет. Жеткізу мерзімдері мен төлем шарттарын нақтылауыңызды сұраймын.`,
    `Сәлеметсіз бе! ${lotTitle} тобы үшін ҚҚС қосылған соңғы бағаны жіберуіңізді өтінеміз. Көлемі бойынша жеңілдік мүмкіндігі бар ма?`,
    `Сіздің ұсынысыңыз қарастырылды. Тапсырыс растау үшін шот-фактура мен сертификаттарды ұсынуыңызды сұраймыз.`,
  ];
  return [
    `Здравствуйте, ${supplier}. Благодарим за предложение по позиции «${lotTitle}» (${qty}). Просим уточнить сроки поставки и условия оплаты для подготовки договора.`,
    `Добрый день! По лоту «${lotTitle}» прошу прислать окончательную цену с НДС и условия скидки при объёме ${qty}. Готовы рассмотреть предоплату 30%.`,
    `Ваше предложение принято к рассмотрению. Для оформления заявки направьте, пожалуйста, счёт-фактуру и сертификаты соответствия. Сроки рассмотрения — до 2 рабочих дней.`,
  ];
}

function buildEditorTemplate(lot, sup) {
  const L = state.lang === "kz" ? {
    title: "САТЫП АЛУ БОЙЫНША ЕСЕП", lot: "Лот", customer: "Тапсырыс беруші",
    product: "Тауар", supplier: "Жеткізуші", price: "Лот сомасы", net: "Таза пайда",
    margin: "Маржа", verdict: "Қорытынды", date: "Күні",
  } : {
    title: "ОТЧЁТ ПО СДЕЛКЕ", lot: "Лот", customer: "Заказчик",
    product: "Товар", supplier: "Поставщик", price: "Сумма лота", net: "Чистая прибыль",
    margin: "Маржа", verdict: "Заключение", date: "Дата",
  };
  const dt = new Date().toLocaleDateString(state.lang === "kz" ? "kk-KZ" : "ru-RU");
  return `${L.title}
${"=".repeat(L.title.length)}
${L.date}: ${dt}

${L.lot}: ${lot?.lot_no || "—"}
${L.product}: ${lot?.title || "—"}
${L.customer}: ${lot?.customer || "—"}
${L.price}: ${lot?.price || "—"}
${L.supplier}: ${sup?.name || "—"}
${L.net}: ${sup ? fmt(sup.net_profit) + " ₸" : "—"}
${L.margin}: ${sup ? sup.margin_pct + "%" : "—"}

${L.verdict}:
${sup && sup.net_profit > 0 ? "Сделка прибыльная, рекомендуется к подаче заявки." : "Требуется дополнительный анализ."}
`;
}

function exportReport(format) {
  const text = document.getElementById("reportEditor").value || "";
  const fname = "report-" + new Date().toISOString().slice(0, 10);
  if (format === "pdf") {
    const w = window.open("", "_blank");
    w.document.write(`<html><head><title>${fname}</title><style>body{font-family:Arial;padding:40px;white-space:pre-wrap;line-height:1.6;color:#000;background:#fff;font-size:14px}</style></head><body>${esc(text)}<scr` + `ipt>window.onload=()=>window.print();</scr` + `ipt></body></html>`);
    w.document.close();
  } else if (format === "word") {
    const html = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word'><head><meta charset='utf-8'></head><body><pre style="font-family:Arial;font-size:12pt">${esc(text)}</pre></body></html>`;
    downloadBlob(html, fname + ".doc", "application/msword");
  } else if (format === "excel") {
    const lines = text.split("\n");
    const rows = lines.map(l => {
      const m = l.match(/^([^:]+):\s*(.*)$/);
      return m ? `<tr><td>${esc(m[1])}</td><td>${esc(m[2])}</td></tr>` : `<tr><td colspan="2">${esc(l)}</td></tr>`;
    }).join("");
    const html = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:excel'><head><meta charset='utf-8'></head><body><table border="1">${rows}</table></body></html>`;
    downloadBlob(html, fname + ".xls", "application/vnd.ms-excel");
  }
}
function downloadBlob(content, filename, mime) {
  const blob = new Blob(["\ufeff" + content], { type: mime + ";charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click();
  setTimeout(() => { document.body.removeChild(a); URL.revokeObjectURL(url); }, 100);
}

const STATUS_FLOW = ["sent", "pending", "confirmed", "done"];
const STATUS_LABELS = {
  sent: "statusSent", pending: "statusPending", confirmed: "statusConfirmed",
  done: "statusDone", cancelled: "statusCancelled", review: "statusReview",
};
function statusKeyFromLegacy(s) {
  if (!s) return "sent";
  const k = String(s).toLowerCase();
  if (k.includes("отмен") || k.includes("аннул") || k.includes("бас тарт")) return "cancelled";
  if (k.includes("выполн") || k.includes("орындал")) return "done";
  if (k.includes("подтверж") || k.includes("растал")) return "confirmed";
  if (k.includes("обработ") || k.includes("процесс") || k.includes("өңдел")) return "pending";
  if (k.includes("рассмотр") || k.includes("қарал")) return "review";
  return "sent";
}
function statusColorClass(k) {
  if (k === "done" || k === "confirmed") return "st-green";
  if (k === "cancelled") return "st-red";
  return "st-yellow";
}
window.appAction = function(id, action) {
  const apps = store.getApps();
  const a = apps.find(x => x.id === id);
  if (!a) return;
  const cur = statusKeyFromLegacy(a.statusKey || a.status);
  if (action === "cancel") {
    a.statusKey = "cancelled";
  } else if (action === "annul") {
    if (!confirm("Аннулировать заявку без возможности восстановления?")) return;
    a.statusKey = "cancelled"; a.annulled = true;
  } else if (action === "advance") {
    const idx = STATUS_FLOW.indexOf(cur);
    if (idx >= 0 && idx < STATUS_FLOW.length - 1) a.statusKey = STATUS_FLOW[idx + 1];
  }
  a.status = t(STATUS_LABELS[a.statusKey] || "statusSent");
  store.setApps(apps);
  render();
};

function renderApps() {
  const apps = store.getApps();
  app.innerHTML = `
    <div class="page-wrap">
      <h1 class="page-title">${esc(t("apps"))}</h1>
      ${apps.length ? `
        <div class="apps-table">
          <div class="apps-row apps-head">
            <div>${esc(t("appNo"))}</div><div>${esc(t("appLot"))}</div><div>${esc(t("appProduct"))}</div><div>${esc(t("appSupplier"))}</div><div>${esc(t("appCost"))}</div><div>${esc(t("appNet"))}</div><div>${esc(t("appStatus"))}</div><div>${esc(t("appActions"))}</div>
          </div>
          ${apps.map(a => {
            const sk = statusKeyFromLegacy(a.statusKey || a.status);
            const isFinal = sk === "cancelled" || sk === "done";
            return `
            <div class="apps-row">
              <div>#${a.id}</div>
              <div class="mono">${esc(a.lot_no || "—")}</div>
              <div>${esc(trunc(a.product, 60))}</div>
              <div>${esc(trunc(a.supplier, 40))}</div>
              <div>${fmt(a.price)} ₸</div>
              <div><b class="${profitClass(a.net_profit || 0)}">${fmt(a.net_profit || 0)} ₸</b></div>
              <div><span class="lot-status ${statusColorClass(sk)}">${esc(t(STATUS_LABELS[sk]))}</span></div>
              <div class="row-actions">
                ${!isFinal ? `<button class="btn-ghost xs" onclick="appAction(${a.id},'advance')">→</button>` : ""}
                ${!isFinal ? `<button class="btn-ghost xs warn" onclick="appAction(${a.id},'cancel')">${esc(t("cancel"))}</button>` : ""}
                ${sk !== "cancelled" ? `<button class="btn-ghost xs danger" onclick="appAction(${a.id},'annul')">${esc(t("annul"))}</button>` : ""}
              </div>
            </div>
          `;}).join("")}
        </div>
      ` : `<div class="empty large">У вас пока нет заявок. Перейдите в Реестр и подайте первую заявку.</div>`}
    </div>
  `;
}

function renderReport() {
  const lot = state.activeIndex >= 0 ? state.lots[state.activeIndex] : null;
  const sup = state.detail?.suppliers?.recommended;
  app.innerHTML = `
    <div class="page-wrap">
      <h1 class="page-title">${esc(t("report_title"))}</h1>
      <p class="page-sub">${esc(t("report_sub"))}</p>

      <div class="report-grid">
        <form id="reportForm" class="report-form">
          <div class="form-row">
            <label>${esc(t("revenue"))}<input type="number" id="r_revenue" step="any" required /></label>
            <label>${esc(t("quantity"))}, шт.<input type="number" id="r_qty" step="any" value="1" required /></label>
          </div>
          <div class="form-row">
            <label>${esc(t("purchase"))}<input type="number" id="r_purchase" step="any" required /></label>
            <label>${esc(t("deliveryF"))}<input type="number" id="r_delivery" step="any" value="0" /></label>
          </div>
          <div class="form-row">
            <label>${esc(t("packing"))}<input type="number" id="r_packing" step="any" value="0" /></label>
            <label>${esc(t("other"))}<input type="number" id="r_other" step="any" value="0" /></label>
          </div>
          <div class="form-actions">
            <button type="button" class="btn-secondary" id="autoFill">${esc(t("autoFill"))}</button>
            <button type="submit" class="btn-primary">${esc(t("calc"))}</button>
          </div>
        </form>

        <div id="reportResult" class="report-result">
          <div class="empty">${esc(t("calc"))}…</div>
        </div>
      </div>

      <div class="editor-block">
        <h2>${esc(t("editor"))}</h2>
        <textarea id="reportEditor" class="report-editor" rows="12" placeholder="${esc(t("editor"))}…">${esc(buildEditorTemplate(lot, sup))}</textarea>
        <div class="export-actions">
          <button class="btn-secondary" id="exPdf">${esc(t("exportPdf"))}</button>
          <button class="btn-secondary" id="exWord">${esc(t("exportWord"))}</button>
          <button class="btn-secondary" id="exExcel">${esc(t("exportExcel"))}</button>
        </div>
      </div>
    </div>
  `;

  document.getElementById("exPdf").onclick = () => exportReport("pdf");
  document.getElementById("exWord").onclick = () => exportReport("word");
  document.getElementById("exExcel").onclick = () => exportReport("excel");

  document.getElementById("autoFill").onclick = () => {
    if (!lot) { alert("Сначала выберите лот в Реестре"); return; }
    const lotTotal = parseFloat(String(lot.price).replace(/[^\d.,]/g, "").replace(",", ".")) || 0;
    const qty = parseInt(String(lot.qty).match(/\d+/)?.[0] || "1", 10);
    document.getElementById("r_revenue").value = lotTotal || "";
    document.getElementById("r_qty").value = qty;
    if (sup) {
      document.getElementById("r_purchase").value = sup.price_per_unit;
      document.getElementById("r_delivery").value = sup.delivery_cost;
    }
  };

  document.getElementById("reportForm").onsubmit = (e) => {
    e.preventDefault();
    const revenue = +document.getElementById("r_revenue").value || 0;
    const qty = +document.getElementById("r_qty").value || 1;
    const purchase = +document.getElementById("r_purchase").value || 0;
    const delivery = +document.getElementById("r_delivery").value || 0;
    const packing = +document.getElementById("r_packing").value || 0;
    const other = +document.getElementById("r_other").value || 0;

    const purchaseTotal = purchase * qty;
    const totalCost = purchaseTotal + delivery + packing + other;
    const profit = revenue - totalCost;
    const tax = profit > 0 ? Math.round(profit * 0.12) : 0;
    const net = profit - tax;
    const margin = revenue > 0 ? (net / revenue * 100).toFixed(1) : 0;
    const pCls = profitClass(net);
    const verdict = net > 0 ? "Сделка прибыльная" : net < 0 ? "Убыточная сделка — отказаться" : "На грани окупаемости";

    document.getElementById("reportResult").innerHTML = `
      <div class="report-summary ${pCls}">
        <div class="rs-head">
          <span class="rs-icon">${net > 0 ? "✅" : net < 0 ? "❌" : "⚠️"}</span>
          <span>${verdict}</span>
        </div>
        <div class="rs-grid">
          <div class="rs-cell"><span>Доход</span><b>${fmt(revenue)} ₸</b></div>
          <div class="rs-cell"><span>Закуп (${qty} × ${fmt(purchase)})</span><b>${fmt(purchaseTotal)} ₸</b></div>
          <div class="rs-cell"><span>Доставка</span><b>${fmt(delivery)} ₸</b></div>
          <div class="rs-cell"><span>Упаковка</span><b>${fmt(packing)} ₸</b></div>
          <div class="rs-cell"><span>Прочее</span><b>${fmt(other)} ₸</b></div>
          <div class="rs-cell"><span>Итого расходы</span><b class="neg">${fmt(totalCost)} ₸</b></div>
          <div class="rs-cell"><span>Прибыль до налога</span><b class="${profitClass(profit)}">${fmt(profit)} ₸</b></div>
          <div class="rs-cell"><span>Налог 12%</span><b>${fmt(tax)} ₸</b></div>
          <div class="rs-cell big"><span>Чистая прибыль</span><b class="${pCls}">${fmt(net)} ₸</b></div>
          <div class="rs-cell big"><span>Маржа</span><b class="${pCls}">${margin}%</b></div>
        </div>
      </div>
    `;
  };
}

function renderChats() {
  const chats = store.getChats();
  const active = chats.find(c => c.key === state.activeChatKey) || chats[0];
  if (active) state.activeChatKey = active.key;

  app.innerHTML = `
    <div class="chats-grid">
      <aside class="chat-list panel">
        <div class="chat-list-head">Диалоги (${chats.length})</div>
        ${chats.length ? chats.map(c => `
          <div class="chat-item${c.key === state.activeChatKey ? " active" : ""}" data-key="${esc(c.key)}">
            <div class="chat-supplier">${esc(c.supplier.name)}</div>
            <div class="chat-lot">${esc(c.lot.lot_no)} · ${esc(trunc(c.lot.title, 40))}</div>
            <div class="chat-preview">${esc(trunc((c.messages.at(-1)?.text || ""), 60))}</div>
          </div>
        `).join("") : `<div class="empty">Нет диалогов</div>`}
      </aside>
      <section class="chat-window panel">
        ${active ? `
          <div class="chat-head">
            <div>
              <div class="chat-supplier-big">${esc(active.supplier.name)}</div>
              <div class="chat-meta">Лот ${esc(active.lot.lot_no)} · ${esc(active.lot.customer)} · Контакт: ${esc(active.supplier.contact)}</div>
            </div>
            <button class="btn-ghost sm" id="deleteChat">Удалить</button>
          </div>
          <div class="chat-messages" id="chatMsgs">
            ${active.messages.map(m => `
              <div class="msg ${m.from}">
                <div class="msg-bubble">${esc(m.text)}</div>
              </div>
            `).join("")}
          </div>
          <div id="aiVariants" class="ai-variants"></div>
          <form class="chat-input" id="chatForm">
            <input type="text" id="chatText" placeholder="${esc(t("msg"))}" autocomplete="off" />
            <button class="btn-secondary" type="button" id="aiReplyBtn">${esc(t("aiReply"))}</button>
            <button class="btn-primary" type="submit">${esc(t("send"))}</button>
          </form>
        ` : `<div class="empty large">Выберите диалог слева или начните новый из карточки поставщика</div>`}
      </section>
    </div>
  `;

  document.querySelectorAll(".chat-item").forEach(el => el.onclick = () => { state.activeChatKey = el.dataset.key; render(); });
  if (active) {
    const msgs = document.getElementById("chatMsgs");
    if (msgs) msgs.scrollTop = msgs.scrollHeight;
    document.getElementById("chatForm").onsubmit = e => {
      e.preventDefault();
      const txt = document.getElementById("chatText").value;
      document.getElementById("chatText").value = "";
      sendMessage(active.key, txt);
    };
    document.getElementById("aiReplyBtn").onclick = () => {
      const lastIncoming = [...active.messages].reverse().find(m => m.from === "supplier")?.text || "";
      const variants = generateAiVariants(active, lastIncoming);
      const wrap = document.getElementById("aiVariants");
      wrap.innerHTML = variants.map((v, i) => `
        <div class="ai-variant">
          <div class="ai-variant-head">${esc(t("aiVariant"))} ${i + 1}</div>
          <div class="ai-variant-text">${esc(v)}</div>
          <button class="btn-ghost xs" data-v="${i}">${esc(t("send"))}</button>
        </div>
      `).join("");
      wrap.querySelectorAll("button[data-v]").forEach(b => b.onclick = () => {
        sendMessage(active.key, variants[+b.dataset.v]);
        wrap.innerHTML = "";
      });
    };
    document.getElementById("deleteChat").onclick = () => {
      if (!confirm("Удалить диалог?")) return;
      store.setChats(store.getChats().filter(c => c.key !== active.key));
      state.activeChatKey = null;
      render();
    };
  }
}

function renderProfile() {
  const auth = store.getAuth();
  const apps = store.getApps();
  const chats = store.getChats();
  app.innerHTML = `
    <div class="page-wrap">
      <h1 class="page-title">Профиль</h1>
      ${auth ? `
        <div class="profile-card">
          <div class="profile-avatar">${esc(auth.username.slice(0, 2).toUpperCase())}</div>
          <div class="profile-info">
            <div class="profile-name">${esc(auth.username)}</div>
            <div class="profile-meta">Авторизован · Сессия активна</div>
          </div>
          <button class="btn-ghost" id="profileLogout">Выйти</button>
        </div>
        <div class="profile-stats">
          <div class="stat-card"><div class="stat-num">${apps.length}</div><div class="stat-cap">Заявки</div></div>
          <div class="stat-card"><div class="stat-num">${chats.length}</div><div class="stat-cap">Диалоги</div></div>
          <div class="stat-card"><div class="stat-num">${state.lots.length || 0}</div><div class="stat-cap">Просмотрено лотов</div></div>
        </div>
        <div class="profile-actions">
          <button class="btn-secondary" onclick="if(confirm('Очистить локальные данные?')){localStorage.removeItem('apps');localStorage.removeItem('chats');render();}">${esc(t("clearLocal"))}</button>
        </div>
      ` : `
        <div class="empty large">Войдите, чтобы видеть свой профиль</div>
        <div style="text-align:center;margin-top:16px;display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
          <button class="btn-primary lg" id="profLogin">${esc(t("login"))}</button>
          <button class="btn-ghost lg" id="profReg">${esc(t("register"))}</button>
          <button class="btn-secondary lg" id="profEcp">${esc(t("ecpLogin"))}</button>
        </div>
      `}
    </div>
  `;
  if (auth) document.getElementById("profileLogout").onclick = () => { store.setAuth(null); renderAuthArea(); render(); };
  else {
    document.getElementById("profLogin").onclick = () => openModal("login");
    document.getElementById("profReg").onclick = () => openModal("register");
    document.getElementById("profEcp").onclick = () => ecpLogin();
  }
}

function ecpLogin() {
  const overlay = document.createElement("div");
  overlay.className = "modal-overlay";
  overlay.innerHTML = `
    <div class="modal ecp-modal">
      <h2>🔐 ЭЦП аутентификация</h2>
      <p class="page-sub">Симуляция входа через ключ НУЦ РК</p>
      <div class="ecp-step" id="ecpStep">Поиск ключа AUTH_RSA...</div>
      <div class="ecp-progress"><div class="ecp-bar" id="ecpBar"></div></div>
      <div class="modal-actions" style="margin-top:16px"><button class="btn-ghost" id="ecpCancel">Отмена</button></div>
    </div>`;
  document.body.appendChild(overlay);
  const steps = ["Поиск ключа AUTH_RSA...", "Проверка сертификата НУЦ РК...", "Подпись challenge...", "Авторизация на сервере..."];
  let i = 0;
  const tick = setInterval(() => {
    i++;
    document.getElementById("ecpBar").style.width = (i / steps.length * 100) + "%";
    if (i < steps.length) document.getElementById("ecpStep").textContent = steps[i];
    else {
      clearInterval(tick);
      const username = "ecp_user_" + Math.floor(100000 + Math.random() * 900000);
      store.setAuth({ token: "ecp-" + Date.now(), username, ecp: true });
      overlay.remove();
      renderAuthArea();
      render();
    }
  }, 700);
  document.getElementById("ecpCancel").onclick = () => { clearInterval(tick); overlay.remove(); };
}

window.navigate = navigate;

applyTheme();
applyLang();
renderAuthArea();
loadLots("");
