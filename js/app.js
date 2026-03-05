/**
 * Global News Hub — Main Application
 *
 * Dynamic features added in v2:
 *   • Auto-refresh every CONFIG.AUTO_REFRESH_INTERVAL seconds (silent background poll)
 *   • Relevance scoring via RELEVANCE engine — most important news always on top
 *   • New-article detection (URL registry diff) → "N new articles" banner
 *   • Live timestamp updates every minute without full re-render
 *   • Animated refresh progress bar
 *   • Relevance badges: Breaking / New / Market / Trending
 *   • Gold & markets widgets refresh every MARKET_REFRESH_EVERY_N_CYCLES cycles
 *   • Page Visibility API — immediate catch-up refresh when tab regains focus
 */

/* ── State ───────────────────────────────────────────────────────────────── */
const State = {
  articles:         [],
  pendingArticles:  [],           // new articles waiting for user to accept
  articleRegistry:  new Set(),   // URLs of all articles ever shown
  currentPage:      1,
  pageSize:         CONFIG.NEWS_PAGE_SIZE,
  totalResults:     0,
  loading:          false,
  refreshing:       false,
  darkMode:         false,
  lastRefreshTime:  null,
  refreshCycle:     0,
  filters: {
    category:  "general",
    country:   "",
    region:    "",
    scope:     "all",   // "all" | "local" | "international"
    query:     "",
  },
  goldData:       null,
  marketsData:    [],
};

/* ── DOM refs ─────────────────────────────────────────────────────────────── */
const DOM = {
  heroGrid:           document.getElementById("heroGrid"),
  newsGrid:           document.getElementById("newsGrid"),
  trendingList:       document.getElementById("trendingList"),
  tickerItems:        document.getElementById("tickerItems"),
  goldWidget:         document.getElementById("goldWidget"),
  marketsWidget:      document.getElementById("marketsWidget"),
  pagination:         document.getElementById("pagination"),
  searchInput:        document.getElementById("searchInput"),
  categoryNav:        document.getElementById("categoryNav"),
  countryFilter:      document.getElementById("countryFilter"),
  regionFilter:       document.getElementById("regionFilter"),
  scopeChips:         document.querySelectorAll(".scope-chip"),
  loadingOverlay:     document.getElementById("loadingOverlay"),
  toastContainer:     document.getElementById("toastContainer"),
  articleModal:       document.getElementById("articleModal"),
  modalContent:       document.getElementById("modalContent"),
  darkModeToggle:     document.getElementById("darkModeToggle"),
  currentDate:        document.getElementById("currentDate"),
  newsSectionTitle:   document.getElementById("newsSectionTitle"),
  resultsCount:       document.getElementById("resultsCount"),
  refreshFill:        document.getElementById("refreshFill"),
  lastUpdatedText:    document.getElementById("lastUpdatedText"),
  nextRefreshText:    document.getElementById("nextRefreshText"),
  newArticlesBanner:  document.getElementById("newArticlesBanner"),
};

/* ══════════════════════════════════════════════════════════════════════════
   AUTO-REFRESH
══════════════════════════════════════════════════════════════════════════ */
const AutoRefresh = {
  _ticker:          null,   // 1-second interval ID
  nextIn:           CONFIG.AUTO_REFRESH_INTERVAL,  // seconds until next refresh
  _elapsedSeconds:  0,      // total seconds elapsed since start (used for timestamp refresh)

  start() {
    this.stop();
    if (!CONFIG.AUTO_REFRESH_INTERVAL) return;  // disabled
    this.nextIn          = CONFIG.AUTO_REFRESH_INTERVAL;
    this._elapsedSeconds = 0;
    this._updateBar();
    this._ticker = setInterval(() => this._tick(), 1000);
  },

  stop() {
    if (this._ticker) { clearInterval(this._ticker); this._ticker = null; }
  },

  _tick() {
    this.nextIn = Math.max(0, this.nextIn - 1);
    this._elapsedSeconds++;
    this._updateBar();

    // Refresh relative timestamps ("5m ago" → "6m ago") once every 60 seconds
    if (this._elapsedSeconds % 60 === 0) {
      refreshTimestamps();
    }

    if (this.nextIn <= 0) {
      this.nextIn = CONFIG.AUTO_REFRESH_INTERVAL;
      silentRefreshAll();
    }
  },

  _updateBar() {
    const interval = CONFIG.AUTO_REFRESH_INTERVAL || 60;
    const pct      = (this.nextIn / interval) * 100;
    if (DOM.refreshFill) DOM.refreshFill.style.width = pct + "%";
    if (DOM.nextRefreshText) {
      DOM.nextRefreshText.textContent =
        this.nextIn > 0 ? `Refreshes in ${this.nextIn}s` : "Refreshing…";
    }
  },

  /** Call when a refresh completes to reset the countdown visually */
  reset() {
    this.nextIn = CONFIG.AUTO_REFRESH_INTERVAL;
    this._updateBar();
  },
};

/* ══════════════════════════════════════════════════════════════════════════
   INIT
══════════════════════════════════════════════════════════════════════════ */
async function init() {
  setCurrentDate();
  restoreTheme();
  buildCategoryNav();
  buildCountryOptions();
  populateRegionFilter();
  attachEventListeners();

  await Promise.all([
    loadNews(),
    loadGoldPrice(),
    loadMarkets(),
  ]);

  AutoRefresh.start();
  updateLastRefreshedTime();

  // Re-sync when tab becomes visible again
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      // Immediately refresh if overdue
      if (AutoRefresh.nextIn <= 0) silentRefreshAll();
      AutoRefresh.start();
    } else {
      AutoRefresh.stop();
    }
  });
}

/* ── Date ─────────────────────────────────────────────────────────────────── */
function setCurrentDate() {
  if (!DOM.currentDate) return;
  const opts = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  DOM.currentDate.textContent = new Date().toLocaleDateString(undefined, opts);
}

/* ── Last-refreshed text ─────────────────────────────────────────────────── */
function updateLastRefreshedTime() {
  State.lastRefreshTime = Date.now();
  if (DOM.lastUpdatedText) DOM.lastUpdatedText.textContent = "Updated just now";
}

/** Called every 60 s to refresh the "Updated X ago" label */
function refreshLastUpdatedLabel() {
  if (!DOM.lastUpdatedText || !State.lastRefreshTime) return;
  const diffMin = Math.floor((Date.now() - State.lastRefreshTime) / 60000);
  DOM.lastUpdatedText.textContent =
    diffMin < 1   ? "Updated just now"
    : diffMin < 2 ? "Updated 1 min ago"
    : `Updated ${diffMin} min ago`;
}

/* ── Theme ───────────────────────────────────────────────────────────────── */
function restoreTheme() {
  const saved = localStorage.getItem("theme");
  if (saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
    enableDarkMode(false);
  }
}
function enableDarkMode(save = true) {
  document.documentElement.setAttribute("data-theme", "dark");
  State.darkMode = true;
  if (DOM.darkModeToggle) DOM.darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  if (save) localStorage.setItem("theme", "dark");
}
function disableDarkMode(save = true) {
  document.documentElement.removeAttribute("data-theme");
  State.darkMode = false;
  if (DOM.darkModeToggle) DOM.darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  if (save) localStorage.setItem("theme", "light");
}
function toggleDarkMode() { State.darkMode ? disableDarkMode() : enableDarkMode(); }

/* ── Category nav ────────────────────────────────────────────────────────── */
function buildCategoryNav() {
  if (!DOM.categoryNav) return;
  DOM.categoryNav.innerHTML = CONFIG.CATEGORIES.map(cat => `
    <button class="cat-btn${cat.id === State.filters.category ? " active" : ""}"
            data-cat="${cat.id}">
      ${cat.label}
    </button>
  `).join("");
}

/* ── Country / region dropdowns ──────────────────────────────────────────── */
function buildCountryOptions() {
  if (!DOM.countryFilter) return;
  DOM.countryFilter.innerHTML = Object.entries(CONFIG.COUNTRIES)
    .map(([code, label]) => `<option value="${code}">${label}</option>`)
    .join("");
}
function populateRegionFilter() {
  if (!DOM.regionFilter) return;
  const country = State.filters.country;
  let options = '<option value="">All Regions / States</option>';
  if (country === "us") {
    options += CONFIG.US_STATES.map(s => `<option value="${s}">${s}</option>`).join("");
  }
  DOM.regionFilter.innerHTML = options;
}

/* ── Events ──────────────────────────────────────────────────────────────── */
function attachEventListeners() {
  DOM.darkModeToggle?.addEventListener("click", toggleDarkMode);

  const searchBtn = document.getElementById("searchBtn");
  searchBtn?.addEventListener("click", handleSearch);
  DOM.searchInput?.addEventListener("keydown", e => { if (e.key === "Enter") handleSearch(); });

  DOM.categoryNav?.addEventListener("click", e => {
    const btn = e.target.closest(".cat-btn");
    if (!btn) return;
    DOM.categoryNav.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    State.filters.category = btn.dataset.cat;
    State.currentPage = 1;
    loadNews();  // loadNews() rebuilds the registry internally
  });

  DOM.countryFilter?.addEventListener("change", () => {
    State.filters.country = DOM.countryFilter.value;
    State.filters.region  = "";
    populateRegionFilter();
    State.currentPage = 1;
    loadNews();  // loadNews() rebuilds the registry internally
  });

  DOM.regionFilter?.addEventListener("change", () => {
    State.filters.region = DOM.regionFilter.value;
    State.currentPage = 1;
    loadNews();
  });

  DOM.scopeChips.forEach(chip => {
    chip.addEventListener("click", () => {
      DOM.scopeChips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      State.filters.scope = chip.dataset.scope;
      State.currentPage = 1;
      loadNews();
    });
  });

  document.getElementById("modalClose")?.addEventListener("click", closeModal);
  DOM.articleModal?.addEventListener("click", e => { if (e.target === DOM.articleModal) closeModal(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });
}

/* ══════════════════════════════════════════════════════════════════════════
   INITIAL NEWS LOAD  (shows loading overlay)
══════════════════════════════════════════════════════════════════════════ */
async function loadNews() {
  if (State.loading) return;
  State.loading = true;
  showLoading(true);
  hideBanner();

  try {
    let raw = await _fetchCurrentFeed();

    // Relevance-rank and deduplicate
    const articles = RELEVANCE.sort(RELEVANCE.dedupe(raw));

    // Register all seen URLs
    State.articleRegistry.clear();
    articles.forEach(a => State.articleRegistry.add(a.url));

    State.articles     = articles;
    State.totalResults = articles.length;

    renderHero(articles.slice(0, 3));
    renderNewsGrid(articles);
    renderTicker(articles);
    renderTrending(articles);
    updateSectionTitle();
    updateResultsCount();

  } catch (err) {
    console.error("loadNews:", err);
    showToast("Failed to load news. Showing cached data.", "error");
  } finally {
    State.loading = false;
    showLoading(false);
  }
}

/* ══════════════════════════════════════════════════════════════════════════
   SILENT BACKGROUND REFRESH  (no loading overlay, no flicker)
══════════════════════════════════════════════════════════════════════════ */
async function silentRefreshAll() {
  if (State.refreshing || State.loading) return;
  State.refreshing = true;
  State.refreshCycle++;

  try {
    await silentRefreshNews();

    // Refresh market widgets less frequently to respect free-tier limits
    const n = CONFIG.MARKET_REFRESH_EVERY_N_CYCLES || 5;
    if (State.refreshCycle % n === 0) {
      const [gold, markets] = await Promise.all([fetchGoldPrice(), fetchMarkets()]);
      State.goldData    = gold;
      State.marketsData = markets;
      renderGoldWidget(gold);
      renderMarketsWidget(markets);
    }

  } catch (err) {
    console.warn("silentRefreshAll:", err);
  } finally {
    State.refreshing = false;
    updateLastRefreshedTime();
    refreshTimestamps();
    refreshLastUpdatedLabel();
    AutoRefresh.reset();
  }
}

async function silentRefreshNews() {
  try {
    let raw = await _fetchCurrentFeed();
    raw = RELEVANCE.dedupe(raw);

    // Detect articles we haven't seen before
    const newOnes = raw.filter(a => !State.articleRegistry.has(a.url));
    if (newOnes.length === 0) return;

    // Register the new URLs
    newOnes.forEach(a => State.articleRegistry.add(a.url));

    // Merge, re-score, dedupe
    const merged  = RELEVANCE.dedupe([...raw, ...State.articles]);
    const sorted  = RELEVANCE.sort(merged);

    const isPage1  = State.currentPage === 1;
    const isAtTop  = window.scrollY < 400;
    const noQuery  = !State.filters.query;

    if (isPage1 && isAtTop && noQuery) {
      // User is at top of the feed → apply immediately with subtle flash
      State.articles     = sorted;
      State.totalResults = sorted.length;
      State.pendingArticles = [];

      renderHero(sorted.slice(0, 3));
      renderNewsGrid(sorted, newOnes.map(a => a.url));  // mark new ones
      renderTicker(sorted);
      renderTrending(sorted);
      updateResultsCount();
      showToast(`${newOnes.length} new article${newOnes.length > 1 ? "s" : ""} — feed updated`, "success");
    } else {
      // User is scrolled / on another page → show banner
      State.pendingArticles = sorted;
      showBanner(newOnes.length);
    }
  } catch (err) {
    console.warn("silentRefreshNews:", err);
  }
}

/** Shared helper — builds the fetch call based on current filters */
async function _fetchCurrentFeed() {
  const { category, country, region, scope, query } = State.filters;
  if (query) {
    const q = region ? `${region} ${query}` : query;
    return searchNews(q, { country, category });
  }
  const topicQuery = buildTopicQuery(category, region, scope);
  if (topicQuery) return searchNews(topicQuery, { country, category });
  return fetchTopHeadlines({ category, country });
}

function buildTopicQuery(category, region, scope) {
  const parts = [];
  if (region) parts.push(region);
  if (scope === "local" && region) parts.push("local");
  if (scope === "international") parts.push("international");
  return parts.join(" ");
}

/* ── New-articles banner ─────────────────────────────────────────────────── */
function showBanner(count) {
  if (!DOM.newArticlesBanner) return;
  DOM.newArticlesBanner.innerHTML =
    `<i class="fas fa-arrow-up" aria-hidden="true"></i>` +
    `&nbsp;${count} new article${count > 1 ? "s" : ""} — click to load`;
  DOM.newArticlesBanner.style.display = "flex";
  DOM.newArticlesBanner.onclick = () => {
    if (State.pendingArticles.length) {
      State.articles      = State.pendingArticles;
      State.totalResults  = State.articles.length;
      State.currentPage   = 1;
      State.pendingArticles = [];
      renderHero(State.articles.slice(0, 3));
      renderNewsGrid(State.articles);
      renderTicker(State.articles);
      renderTrending(State.articles);
      updateResultsCount();
    }
    hideBanner();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
}
function hideBanner() {
  if (DOM.newArticlesBanner) DOM.newArticlesBanner.style.display = "none";
}

/* ── Live timestamp refresh (no full re-render) ──────────────────────────── */
function refreshTimestamps() {
  document.querySelectorAll("time[data-iso]").forEach(el => {
    el.textContent = timeAgo(el.dataset.iso);
  });
  refreshLastUpdatedLabel();
}

/* ══════════════════════════════════════════════════════════════════════════
   HERO
══════════════════════════════════════════════════════════════════════════ */
function renderHero(articles) {
  if (!DOM.heroGrid) return;
  if (!articles.length) { DOM.heroGrid.innerHTML = skeletonHero(); return; }

  const [main, ...rest] = articles;
  DOM.heroGrid.innerHTML = `
    <div class="hero-main">
      ${heroCardHTML(main, false)}
    </div>
    ${rest.slice(0, 2).map(a => `
      <div class="hero-card-small">
        ${heroCardHTML(a, true)}
      </div>
    `).join("")}
  `;

  DOM.heroGrid.querySelectorAll(".hero-card").forEach((el, i) => {
    el.addEventListener("click",  () => openModal(articles[i]));
    el.addEventListener("keydown", e => { if (e.key === "Enter") openModal(articles[i]); });
  });
}

function heroCardHTML(article, small) {
  const imgH  = small ? "190px" : "340px";
  const badge = RELEVANCE.getBadge(article);
  return `
    <article class="hero-card" role="button" tabindex="0" aria-label="${escHtml(article.title)}">
      ${article.image
        ? `<img src="${escHtml(article.image)}" alt="${escHtml(article.title)}" style="height:${imgH}" loading="lazy">`
        : `<div class="img-placeholder" style="height:${imgH}"><i class="fas fa-newspaper"></i></div>`
      }
      <div class="hero-card-body">
        <div class="card-badges">
          ${getBadgeHTML(badge)}
          <span class="tag badge-cat">${escHtml(categoryLabel(article.category))}</span>
        </div>
        <h2>${escHtml(article.title)}</h2>
        <p>${escHtml(article.description)}</p>
        <div class="card-meta">
          <span class="source-name">${escHtml(article.source.name)}</span>
          <span class="dot"></span>
          <time data-iso="${escHtml(article.publishedAt)}">${timeAgo(article.publishedAt)}</time>
        </div>
      </div>
    </article>
  `;
}

/* ══════════════════════════════════════════════════════════════════════════
   NEWS GRID
══════════════════════════════════════════════════════════════════════════ */
/**
 * @param {Array}  articles   - full sorted article list
 * @param {Array}  [freshUrls] - URLs of brand-new articles (get flash animation)
 */
function renderNewsGrid(articles, freshUrls = []) {
  if (!DOM.newsGrid) return;
  const freshSet = new Set(freshUrls);
  const start    = (State.currentPage - 1) * State.pageSize;
  const page     = articles.slice(start, start + State.pageSize);

  if (!page.length) {
    DOM.newsGrid.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1">
        <i class="fas fa-search"></i>
        <h3>No articles found</h3>
        <p>Try adjusting your filters or search query.</p>
      </div>`;
    renderPagination(0);
    return;
  }

  DOM.newsGrid.innerHTML = page.map((a, i) => newsCardHTML(a, i + start, freshSet.has(a.url))).join("");
  DOM.newsGrid.querySelectorAll(".news-card").forEach((el, i) => {
    el.addEventListener("click",  () => openModal(page[i]));
    el.addEventListener("keydown", e => { if (e.key === "Enter") openModal(page[i]); });
  });

  renderPagination(articles.length);
}

function newsCardHTML(article, _index, isNew = false) {
  const badge = RELEVANCE.getBadge(article);
  return `
    <article class="news-card${isNew ? " card-new" : ""}"
             role="button" tabindex="0" aria-label="${escHtml(article.title)}">
      <div class="news-card-img">
        ${article.image
          ? `<img src="${escHtml(article.image)}" alt="${escHtml(article.title)}" loading="lazy">`
          : `<div class="img-placeholder"><i class="fas fa-newspaper"></i></div>`
        }
      </div>
      <div class="news-card-body">
        <div class="card-badges">
          ${getBadgeHTML(badge)}
          <span class="tag badge-cat" style="font-size:.68rem">${escHtml(categoryLabel(article.category))}</span>
        </div>
        <h3>${escHtml(article.title)}</h3>
        <p>${escHtml(article.description)}</p>
        <div class="card-meta">
          <span class="source-name">${escHtml(article.source.name)}</span>
          <span class="dot"></span>
          <time data-iso="${escHtml(article.publishedAt)}">${timeAgo(article.publishedAt)}</time>
        </div>
      </div>
    </article>
  `;
}

/* ── Badge HTML ──────────────────────────────────────────────────────────── */
function getBadgeHTML(badge) {
  if (!badge) return "";
  const map = {
    breaking: '<span class="tag badge-breaking">🔴 Breaking</span>',
    new:      '<span class="tag badge-new">✨ New</span>',
    market:   '<span class="tag badge-market">📈 Market</span>',
    trending: '<span class="tag badge-trending">🔥 Trending</span>',
  };
  return map[badge] || "";
}

/* ── Ticker ──────────────────────────────────────────────────────────────── */
function renderTicker(articles) {
  if (!DOM.tickerItems) return;
  const items = articles.slice(0, 8);
  DOM.tickerItems.innerHTML = items.map((a, i) => `
    <span class="ticker-item">
      <a href="${escHtml(a.url)}" target="_blank" rel="noopener noreferrer">${escHtml(a.title)}</a>
    </span>
    ${i < items.length - 1 ? '<span class="ticker-sep">•</span>' : ""}
  `).join("");
}

/* ── Trending ────────────────────────────────────────────────────────────── */
function renderTrending(articles) {
  if (!DOM.trendingList) return;
  const top = articles.slice(0, 7);
  DOM.trendingList.innerHTML = top.map((a, i) => `
    <div class="trending-item" role="button" tabindex="0">
      <span class="trending-num">${String(i + 1).padStart(2, "0")}</span>
      <span class="trending-title">${escHtml(a.title)}</span>
    </div>
  `).join("");
  DOM.trendingList.querySelectorAll(".trending-item").forEach((el, i) => {
    el.addEventListener("click",  () => openModal(top[i]));
    el.addEventListener("keydown", e => { if (e.key === "Enter") openModal(top[i]); });
  });
}

/* ── Gold Widget ─────────────────────────────────────────────────────────── */
async function loadGoldPrice() {
  State.goldData = await fetchGoldPrice();
  renderGoldWidget(State.goldData);
}
function renderGoldWidget(gold) {
  if (!DOM.goldWidget) return;
  const up = gold.change >= 0;
  DOM.goldWidget.innerHTML = `
    <div class="gold-price-main">
      <span class="gold-price-value">$${formatNum(gold.price)}</span>
      <span class="gold-price-change ${up ? "up" : "down"}">
        ${up ? "▲" : "▼"} ${Math.abs(gold.change).toFixed(2)} (${Math.abs(gold.changePct).toFixed(2)}%)
      </span>
    </div>
    <div class="gold-details">
      <div class="gold-detail-row"><span>Open</span><span>$${formatNum(gold.open)}</span></div>
      <div class="gold-detail-row"><span>High</span><span class="up">$${formatNum(gold.high)}</span></div>
      <div class="gold-detail-row"><span>Low</span><span class="down">$${formatNum(gold.low)}</span></div>
      <div class="gold-detail-row"><span>Currency</span><span>${escHtml(gold.currency)}</span></div>
    </div>
    <p class="gold-updated">Updated: <time data-iso="${escHtml(gold.timestamp)}">${new Date(gold.timestamp).toLocaleTimeString()}</time></p>
  `;
}

/* ── Markets Widget ──────────────────────────────────────────────────────── */
async function loadMarkets() {
  State.marketsData = await fetchMarkets();
  renderMarketsWidget(State.marketsData);
}
function renderMarketsWidget(markets) {
  if (!DOM.marketsWidget) return;
  DOM.marketsWidget.innerHTML = markets.map(m => {
    const up = m.change >= 0;
    return `
      <div class="market-row">
        <span class="market-symbol">${escHtml(m.symbol)}</span>
        <span class="market-price">${formatMarketPrice(m.price)}</span>
        <span class="market-change ${up ? "up" : "down"}">
          ${up ? "▲" : "▼"} ${Math.abs(m.change).toFixed(2)}%
        </span>
      </div>
    `;
  }).join("");
}

/* ── Pagination ──────────────────────────────────────────────────────────── */
function renderPagination(total) {
  if (!DOM.pagination) return;
  const totalPages = Math.ceil(total / State.pageSize);
  if (totalPages <= 1) { DOM.pagination.innerHTML = ""; return; }

  const cur = State.currentPage;
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= cur - 1 && i <= cur + 1)) pages.push(i);
    else if (pages[pages.length - 1] !== "…") pages.push("…");
  }

  DOM.pagination.innerHTML = `
    <button class="page-btn" id="prevPage" ${cur === 1 ? "disabled" : ""}><i class="fas fa-chevron-left"></i></button>
    ${pages.map(p =>
      p === "…"
        ? `<span style="padding:0 .3rem;color:var(--clr-text-muted)">…</span>`
        : `<button class="page-btn${p === cur ? " active" : ""}" data-page="${p}">${p}</button>`
    ).join("")}
    <button class="page-btn" id="nextPage" ${cur === totalPages ? "disabled" : ""}><i class="fas fa-chevron-right"></i></button>
  `;

  document.getElementById("prevPage")?.addEventListener("click", () => changePage(cur - 1));
  document.getElementById("nextPage")?.addEventListener("click", () => changePage(cur + 1));
  DOM.pagination.querySelectorAll("[data-page]").forEach(btn => {
    btn.addEventListener("click", () => changePage(+btn.dataset.page));
  });
}
function changePage(page) {
  State.currentPage = page;
  renderNewsGrid(State.articles);
  document.getElementById("newsSection")?.scrollIntoView({ behavior: "smooth" });
}

/* ── Search ──────────────────────────────────────────────────────────────── */
function handleSearch() {
  const q = DOM.searchInput?.value.trim() || "";
  State.filters.query = q;
  State.currentPage   = 1;
  loadNews();
}

/* ── Modal ───────────────────────────────────────────────────────────────── */
function openModal(article) {
  if (!DOM.articleModal || !DOM.modalContent) return;
  const badge = RELEVANCE.getBadge(article);
  DOM.modalContent.innerHTML = `
    <div class="modal-header">
      <h2>${escHtml(article.title)}</h2>
      <button class="modal-close" id="modalClose" aria-label="Close">✕</button>
    </div>
    ${article.image
      ? `<img class="modal-img" src="${escHtml(article.image)}" alt="${escHtml(article.title)}" loading="lazy">`
      : ""
    }
    <div class="modal-body">
      <div class="card-meta" style="margin-bottom:.75rem;flex-wrap:wrap;gap:.4rem">
        ${getBadgeHTML(badge)}
        <span class="tag badge-cat">${escHtml(categoryLabel(article.category))}</span>
        <span style="color:var(--clr-text-muted)">•</span>
        <span class="source-name">${escHtml(article.source.name)}</span>
        <span style="color:var(--clr-text-muted)">•</span>
        <time data-iso="${escHtml(article.publishedAt)}">${timeAgo(article.publishedAt)}</time>
      </div>
      <p>${escHtml(article.description)}</p>
      <p>${escHtml(article.content)}</p>
      ${article.url && article.url !== "#" && !article.url.startsWith(CONFIG.MOCK_URL_PREFIX)
        ? `<a href="${escHtml(article.url)}" target="_blank" rel="noopener noreferrer" class="btn-read-full">
             Read Full Article <i class="fas fa-external-link-alt"></i>
           </a>`
        : ""
      }
    </div>
  `;
  DOM.articleModal.classList.add("visible");
  document.body.style.overflow = "hidden";
  document.getElementById("modalClose")?.addEventListener("click", closeModal);
}
function closeModal() {
  DOM.articleModal?.classList.remove("visible");
  document.body.style.overflow = "";
}

/* ── Section title / results ─────────────────────────────────────────────── */
function updateSectionTitle() {
  if (!DOM.newsSectionTitle) return;
  const cat = CONFIG.CATEGORIES.find(c => c.id === State.filters.category);
  DOM.newsSectionTitle.textContent = cat ? cat.label : "Latest News";
}
function updateResultsCount() {
  if (!DOM.resultsCount) return;
  DOM.resultsCount.textContent = `${State.totalResults} article${State.totalResults !== 1 ? "s" : ""}`;
}

/* ── Loading overlay ─────────────────────────────────────────────────────── */
function showLoading(show) {
  DOM.loadingOverlay?.classList.toggle("visible", show);
}

/* ── Toast ───────────────────────────────────────────────────────────────── */
function showToast(message, type = "info") {
  if (!DOM.toastContainer) return;
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;
  DOM.toastContainer.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}

/* ── Helpers ─────────────────────────────────────────────────────────────── */
function escHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g,  "&amp;")
    .replace(/</g,  "&lt;")
    .replace(/>/g,  "&gt;")
    .replace(/"/g,  "&quot;")
    .replace(/'/g,  "&#39;");
}

function timeAgo(iso) {
  if (!iso) return "";
  const diff  = Date.now() - new Date(iso).getTime();
  const mins  = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days  = Math.floor(diff / 86400000);
  if (mins  <  1)  return "just now";
  if (mins  < 60)  return `${mins}m ago`;
  if (hours < 24)  return `${hours}h ago`;
  return `${days}d ago`;
}

function formatNum(n) {
  if (!n && n !== 0) return "—";
  return Number(n).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function formatMarketPrice(n) {
  if (!n && n !== 0) return "—";
  return Number(n).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function categoryLabel(id) {
  const cat = CONFIG.CATEGORIES.find(c => c.id === id);
  return cat ? cat.label.replace(/^[^\w]*/, "").trim() : (id || "General");
}

function skeletonHero() {
  return `
    <div class="hero-main">
      <div class="skeleton-card"><div class="skeleton skeleton-img" style="height:340px"></div><div class="skeleton-body"><div class="skeleton skeleton-line medium"></div><div class="skeleton skeleton-line"></div><div class="skeleton skeleton-line short"></div></div></div>
    </div>
    <div><div class="skeleton-card"><div class="skeleton skeleton-img" style="height:190px"></div><div class="skeleton-body"><div class="skeleton skeleton-line medium"></div><div class="skeleton skeleton-line short"></div></div></div></div>
    <div><div class="skeleton-card"><div class="skeleton skeleton-img" style="height:190px"></div><div class="skeleton-body"><div class="skeleton skeleton-line medium"></div><div class="skeleton skeleton-line short"></div></div></div></div>
  `;
}

/* ── Bootstrap ───────────────────────────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", init);
