/**
 * Global News Hub — API Layer
 *
 * All external data is fetched here.  When API keys are absent the module
 * falls back to rich mock data so the UI is always functional.
 */

/* ── Mock data ──────────────────────────────────────────────────────────── */

const MOCK_ARTICLES = [
  {
    title: "World Leaders Gather for Climate Summit in Geneva",
    description: "Heads of state from over 150 nations convene to agree on new emissions targets ahead of the 2030 deadline.",
    content: "World leaders have gathered in Geneva for the landmark Climate Summit, where they are expected to negotiate binding agreements on carbon emissions reductions...",
    url: "#",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80",
    publishedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    source: { name: "Global Times", url: "#" },
    category: "world",
  },
  {
    title: "Tech Giants Face New Antitrust Regulations in Europe",
    description: "The European Commission finalises landmark digital markets legislation that will reshape how big tech operates across the continent.",
    content: "The European Commission has introduced sweeping new antitrust regulations targeting major technology companies...",
    url: "#",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    publishedAt: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
    source: { name: "Tech Insider", url: "#" },
    category: "technology",
  },
  {
    title: "Gold Surges to Record High Amid Economic Uncertainty",
    description: "The precious metal broke through the $2,500/oz barrier as investors seek safe-haven assets.",
    content: "Gold prices reached a historic high today, surging past the $2,500 per ounce mark as global economic uncertainty...",
    url: "#",
    image: "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=800&q=80",
    publishedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    source: { name: "Financial Review", url: "#" },
    category: "finance",
  },
  {
    title: "Championship Final: Historic Victory Stuns Millions of Fans",
    description: "In a nail-biting 90-minute contest, the underdogs clinched a sensational 3-2 victory in extra time.",
    content: "In one of the most dramatic finals in recent memory, the championship title changed hands last night...",
    url: "#",
    image: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=800&q=80",
    publishedAt: new Date(Date.now() - 1000 * 60 * 150).toISOString(),
    source: { name: "Sports Daily", url: "#" },
    category: "sports",
  },
  {
    title: "Blockbuster Film Breaks All-Time Opening Weekend Records",
    description: "The highly anticipated sequel shattered box-office records, earning over $400 million in its opening weekend worldwide.",
    content: "Hollywood celebrated a record-breaking weekend as the latest blockbuster sequel swept theatres across the globe...",
    url: "#",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=80",
    publishedAt: new Date(Date.now() - 1000 * 60 * 200).toISOString(),
    source: { name: "Entertainment Weekly", url: "#" },
    category: "entertainment",
  },
  {
    title: "Central Banks Signal Interest Rate Cuts Later This Year",
    description: "Major central banks hint at policy easing as inflation finally cools towards target levels.",
    content: "Several of the world's most influential central banks signalled on Thursday that interest rate reductions may be on the horizon...",
    url: "#",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
    publishedAt: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
    source: { name: "Bloomberg", url: "#" },
    category: "finance",
  },
  {
    title: "Breakthrough in Cancer Research Offers New Hope",
    description: "Scientists announce a novel immunotherapy treatment that has shown remarkable results in early-stage clinical trials.",
    content: "Researchers at a leading university hospital have unveiled an experimental immunotherapy treatment that has demonstrated extraordinary results...",
    url: "#",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&q=80",
    publishedAt: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
    source: { name: "Health Today", url: "#" },
    category: "health",
  },
  {
    title: "Election Results: Landmark Shift in Political Landscape",
    description: "Voters delivered a decisive verdict yesterday in one of the most closely watched elections of the decade.",
    content: "Millions of citizens headed to the polls yesterday in an election that analysts called a watershed moment for the nation...",
    url: "#",
    image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800&q=80",
    publishedAt: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
    source: { name: "Political Observer", url: "#" },
    category: "politics",
  },
  {
    title: "NASA Unveils Next-Generation Space Telescope",
    description: "The agency announces a powerful new observatory set to launch in 2027 that will peer deeper into the universe than ever before.",
    content: "NASA has unveiled plans for its most ambitious space telescope to date, a facility that promises to revolutionise our understanding of the cosmos...",
    url: "#",
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&q=80",
    publishedAt: new Date(Date.now() - 1000 * 60 * 420).toISOString(),
    source: { name: "Science Today", url: "#" },
    category: "science",
  },
  {
    title: "Global Supply Chain Recovery Boosts Business Confidence",
    description: "A new survey reveals business optimism at a three-year high as freight and logistics bottlenecks ease.",
    content: "The global supply chain, battered by disruptions over the past few years, is showing clear signs of recovery...",
    url: "#",
    image: "https://images.unsplash.com/photo-1578574577315-3fbeb0cecdc2?w=800&q=80",
    publishedAt: new Date(Date.now() - 1000 * 60 * 480).toISOString(),
    source: { name: "Business Insider", url: "#" },
    category: "business",
  },
  {
    title: "International Peace Talks Resume After Six-Month Hiatus",
    description: "Diplomats from rival factions return to the negotiating table in a renewed push to end a prolonged regional conflict.",
    content: "Hope was cautiously rekindled today as delegations from both sides of a protracted conflict arrived in Vienna for fresh peace negotiations...",
    url: "#",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&q=80",
    publishedAt: new Date(Date.now() - 1000 * 60 * 540).toISOString(),
    source: { name: "World Affairs", url: "#" },
    category: "world",
  },
  {
    title: "Renewable Energy Investment Hits Record $1 Trillion in 2025",
    description: "Clean energy spending surpassed fossil-fuel investment for the first time in history, a report reveals.",
    content: "Global investment in renewable energy reached a historic milestone in 2025, crossing the $1 trillion threshold for the first time...",
    url: "#",
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&q=80",
    publishedAt: new Date(Date.now() - 1000 * 60 * 600).toISOString(),
    source: { name: "Energy Monitor", url: "#" },
    category: "business",
  },
];

/* ── Extra articles used only for mock-mode refresh cycling ──────────────── */
const MOCK_REFRESH_POOL = [
  {
    title: "BREAKING: Major Earthquake Strikes Pacific Region, Tsunami Warning Issued",
    description: "A powerful 7.8-magnitude earthquake has struck off the coast, prompting emergency tsunami warnings for six nations.",
    content: "Emergency services have been placed on high alert following a major seismic event measuring 7.8 on the Richter scale...",
    url: "#mock-r1",
    image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=800&q=80",
    source: { name: "Breaking News Wire", url: "#" },
    category: "world",
  },
  {
    title: "Gold Hits New Intraday High as Fed Minutes Signal Caution on Rate Cuts",
    description: "Precious metals surged after Federal Reserve meeting minutes revealed a more dovish stance than markets expected.",
    content: "Gold traders scrambled to buy as minutes from the latest Federal Reserve meeting revealed a shift in tone...",
    url: "#mock-r2",
    image: "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=800&q=80",
    source: { name: "Reuters Finance", url: "#" },
    category: "finance",
  },
  {
    title: "AI Sector Leads Broad Market Rally as NASDAQ Surges 2.3%",
    description: "Artificial intelligence stocks drove a broad recovery, with the NASDAQ gaining over 2% and tech giants outperforming.",
    content: "A powerful rally in technology shares, led by artificial intelligence companies, pushed the NASDAQ higher...",
    url: "#mock-r3",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    source: { name: "Market Watch", url: "#" },
    category: "finance",
  },
  {
    title: "Emergency G7 Summit Called Amid Escalating Trade Tensions",
    description: "G7 leaders convene an emergency virtual summit to address rapidly escalating trade disputes and tariff threats.",
    content: "Leaders of the world's most powerful economies are holding an emergency meeting to discuss trade policy...",
    url: "#mock-r4",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&q=80",
    source: { name: "AP News", url: "#" },
    category: "politics",
  },
  {
    title: "Oil Prices Plunge 5% on Surprise OPEC+ Production Increase",
    description: "Crude oil prices dropped sharply after OPEC+ members agreed to increase production quotas by 500,000 barrels per day.",
    content: "Oil markets experienced significant volatility after OPEC+ announced an unexpected production increase...",
    url: "#mock-r5",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
    source: { name: "Energy Report", url: "#" },
    category: "business",
  },
  {
    title: "Central Bank Holds Rates Steady; Analysts Predict Cut by Q3",
    description: "The central bank's latest decision keeps benchmark rates unchanged as policymakers monitor inflation data closely.",
    content: "In a widely anticipated move, the central bank held interest rates steady at its latest policy meeting...",
    url: "#mock-r6",
    image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800&q=80",
    source: { name: "Financial Times", url: "#" },
    category: "finance",
  },
];

// Tracks how many times the mock feed has been refreshed
let _mockRefreshCycle = 0;

const MOCK_GOLD = {
  price:      2487.35,
  change:     +18.20,
  changePct:  +0.74,
  open:       2469.15,
  high:       2492.80,
  low:        2461.50,
  currency:   "USD",
  timestamp:  new Date().toISOString(),
};

const MOCK_MARKETS = [
  { symbol: "S&P 500",  price: 5208.91, change: +0.62 },
  { symbol: "NASDAQ",   price: 16421.77, change: +0.85 },
  { symbol: "DOW",      price: 39127.14, change: +0.40 },
  { symbol: "FTSE 100", price: 7941.27,  change: -0.15 },
  { symbol: "EUR/USD",  price: 1.0847,   change: +0.12 },
  { symbol: "BTC/USD",  price: 68341.22, change: +2.10 },
  { symbol: "OIL (WTI)",price: 78.32,    change: -0.55 },
];

/* ── Helpers ──────────────────────────────────────────────────────────────── */

function buildGNewsURL(path, params = {}) {
  const base = `${CONFIG.GNEWS_BASE_URL}${path}`;
  const query = new URLSearchParams({ token: CONFIG.GNEWS_API_KEY, max: CONFIG.NEWS_PAGE_SIZE, ...params });
  return `${base}?${query.toString()}`;
}

function mapGNewsArticle(a) {
  return {
    title:       a.title        || "No title",
    description: a.description  || "",
    content:     a.content      || "",
    url:         a.url          || "#",
    image:       a.image        || null,
    publishedAt: a.publishedAt  || new Date().toISOString(),
    source:      a.source       || { name: "Unknown", url: "#" },
    category:    a._category    || "general",
  };
}

/* ── Public API functions ─────────────────────────────────────────────────── */

/**
 * Fetch top headlines.
 * @param {object} opts - { category, country, lang }
 */
async function fetchTopHeadlines({ category = "", country = "", lang = "en" } = {}) {
  if (!CONFIG.GNEWS_API_KEY) {
    // In mock mode: on the first call return base articles;
    // on subsequent calls inject one fresh article from the pool per cycle
    // so the auto-refresh demo works without an API key.
    _mockRefreshCycle++;
    if (_mockRefreshCycle === 1) return MOCK_ARTICLES;
    const poolIdx    = (_mockRefreshCycle - 2) % MOCK_REFRESH_POOL.length;
    const freshEntry = {
      ...MOCK_REFRESH_POOL[poolIdx],
      url:         `${MOCK_REFRESH_POOL[poolIdx].url}-${_mockRefreshCycle}`,
      publishedAt: new Date().toISOString(),
    };
    return [freshEntry, ...MOCK_ARTICLES];
  }

  try {
    const params = { lang };
    if (category && category !== "general") params.topic = category;
    if (country) params.country = country;

    const res = await fetch(buildGNewsURL("/top-headlines", params));
    if (!res.ok) throw new Error(`GNews ${res.status}`);
    const data = await res.json();
    return (data.articles || []).map(a => ({ ...mapGNewsArticle(a), _category: category }));
  } catch (err) {
    console.warn("fetchTopHeadlines error — using mock data:", err.message);
    return MOCK_ARTICLES;
  }
}

/**
 * Search articles by keyword, with optional country / language filter.
 * @param {string} query
 * @param {object} opts - { country, lang, category }
 */
async function searchNews(query, { country = "", lang = "en", category = "" } = {}) {
  if (!CONFIG.GNEWS_API_KEY) {
    return MOCK_ARTICLES.filter(a =>
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.description.toLowerCase().includes(query.toLowerCase())
    );
  }

  try {
    const params = { q: query, lang };
    if (country) params.country = country;

    const res = await fetch(buildGNewsURL("/search", params));
    if (!res.ok) throw new Error(`GNews ${res.status}`);
    const data = await res.json();
    return (data.articles || []).map(mapGNewsArticle);
  } catch (err) {
    console.warn("searchNews error — using mock data:", err.message);
    return MOCK_ARTICLES;
  }
}

/**
 * Fetch gold price.  Falls back to mock data if key absent.
 * In mock mode each call slightly varies the price to simulate live movement.
 */
async function fetchGoldPrice() {
  if (!CONFIG.GOLD_API_KEY) {
    // Simulate live fluctuation: small random walk around base price
    const delta = (Math.random() - 0.5) * 8;
    return {
      price:     +(MOCK_GOLD.price + delta).toFixed(2),
      change:    +(MOCK_GOLD.change + delta * 0.05).toFixed(2),
      changePct: +(MOCK_GOLD.changePct + delta * 0.002).toFixed(3),
      open:      MOCK_GOLD.open,
      high:      +(Math.max(MOCK_GOLD.high, MOCK_GOLD.price + delta)).toFixed(2),
      low:       +(Math.min(MOCK_GOLD.low,  MOCK_GOLD.price + delta)).toFixed(2),
      currency:  "USD",
      timestamp: new Date().toISOString(),
    };
  }

  try {
    const res = await fetch(CONFIG.GOLD_API_URL, {
      headers: { "x-access-token": CONFIG.GOLD_API_KEY, "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error(`GoldAPI ${res.status}`);
    const d = await res.json();
    return {
      price:     d.price,
      change:    d.ch,
      changePct: d.chp,
      open:      d.open_price,
      high:      d.high_price,
      low:       d.low_price,
      currency:  "USD",
      timestamp: new Date().toISOString(),
    };
  } catch (err) {
    console.warn("fetchGoldPrice error — using mock data:", err.message);
    return MOCK_GOLD;
  }
}

/**
 * Fetch stock market indices.  Returns mock data when key absent.
 * In mock mode each call adds small random variations to simulate live prices.
 */
async function fetchMarkets() {
  if (!CONFIG.ALPHA_VANTAGE_KEY) {
    return MOCK_MARKETS.map(m => ({
      ...m,
      price:  +(m.price  * (1 + (Math.random() - 0.5) * 0.003)).toFixed(2),
      change: +(m.change +     (Math.random() - 0.5) * 0.15  ).toFixed(2),
    }));
  }

  try {
    // Fetch S&P 500 as a representative sample
    const url = `${CONFIG.ALPHA_VANTAGE_URL}?function=GLOBAL_QUOTE&symbol=SPY&apikey=${CONFIG.ALPHA_VANTAGE_KEY}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`AlphaVantage ${res.status}`);
    const d = await res.json();
    const q = d["Global Quote"] || {};
    const live = {
      symbol: "S&P 500",
      price:  parseFloat(q["05. price"] || 0),
      change: parseFloat(q["10. change percent"]?.replace("%", "") || 0),
    };
    return [live, ...MOCK_MARKETS.slice(1)];
  } catch (err) {
    console.warn("fetchMarkets error — using mock data:", err.message);
    return MOCK_MARKETS;
  }
}
