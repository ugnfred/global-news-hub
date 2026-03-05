/**
 * Global News Hub — Configuration
 *
 * To activate live news:
 *  1. Sign up at https://gnews.io and get a free API key (100 req/day).
 *  2. Replace the empty string below with your key.
 *
 * To activate live gold / finance data:
 *  1. Sign up at https://www.goldapi.io (free tier) and
 *     https://www.alphavantage.co (free tier).
 *  2. Replace the empty strings below.
 *
 * Without API keys the site runs entirely on realistic mock data so you can
 * explore the UI straight away.
 */

const CONFIG = {
  // ── News (GNews) ──────────────────────────────────────────────────────────
  GNEWS_API_KEY: "69d154c8bd676a12990124e89e2d13ae",          // e.g. "abc123xyz"
  GNEWS_BASE_URL: "https://gnews.io/api/v4",
  NEWS_PAGE_SIZE: 10,

  // ── Auto-refresh ──────────────────────────────────────────────────────────
  // How often (seconds) the page silently polls for new articles & market data.
  // Keep at 60 for a GNews free-tier key (100 req/day).  Set to 0 to disable.
  AUTO_REFRESH_INTERVAL: 60,

  // How many refresh cycles to wait before refreshing gold/market widgets.
  // (e.g. 5 × 60s = every 5 minutes, staying well within free-tier limits)
  MARKET_REFRESH_EVERY_N_CYCLES: 5,

  // ── Relevance scoring weights (must sum to 100) ───────────────────────────
  // Each component is scored 0–100 and then multiplied by its weight.
  RELEVANCE_WEIGHTS: {
    RECENCY:   40,   // how recently the article was published
    URGENCY:   30,   // high-signal keywords (breaking, crash, surge…)
    MARKET:    20,   // finance / economics keyword density
    CATEGORY:  10,   // editorial importance of the category
  },

  // ── Gold price (GoldAPI.io) ───────────────────────────────────────────────
  GOLD_API_KEY: "goldapi-316xx3osmmdghnyc-io",           // e.g. "goldapi-xxxx"
  GOLD_API_URL: "https://www.goldapi.io/api/XAU/USD",

  // ── Finance (Alpha Vantage) ───────────────────────────────────────────────
  ALPHA_VANTAGE_KEY: "OBKDKVNQSJ1748NI",      // e.g. "ABCDEFGHIJ"
  ALPHA_VANTAGE_URL: "https://www.alphavantage.co/query",

  // ── Google Analytics (optional) ──────────────────────────────────────────
  GA_MEASUREMENT_ID: "",      // e.g. "G-XXXXXXXXXX"

  // ── Site meta ─────────────────────────────────────────────────────────────
  SITE_NAME: "Global News Hub",
  SITE_URL:  "https://global-news-hub-dusky.vercel.app",

  // ── Internal mock URL prefix (used to suppress "Read full article" links) ─
  MOCK_URL_PREFIX: "#mock",

  // ── Supported countries (ISO-2 code → label) ─────────────────────────────
  COUNTRIES: {
    "":   "🌐 All Countries",
    "us": "🇺🇸 United States",
    "gb": "🇬🇧 United Kingdom",
    "ca": "🇨🇦 Canada",
    "au": "🇦🇺 Australia",
    "in": "🇮🇳 India",
    "de": "🇩🇪 Germany",
    "fr": "🇫🇷 France",
    "jp": "🇯🇵 Japan",
    "cn": "🇨🇳 China",
    "br": "🇧🇷 Brazil",
    "mx": "🇲🇽 Mexico",
    "za": "🇿🇦 South Africa",
    "ng": "🇳🇬 Nigeria",
    "eg": "🇪🇬 Egypt",
    "sa": "🇸🇦 Saudi Arabia",
    "ae": "🇦🇪 UAE",
    "sg": "🇸🇬 Singapore",
    "nz": "🇳🇿 New Zealand",
    "it": "🇮🇹 Italy",
    "es": "🇪🇸 Spain",
    "ru": "🇷🇺 Russia",
    "kr": "🇰🇷 South Korea",
    "ar": "🇦🇷 Argentina",
  },

  // ── US States ─────────────────────────────────────────────────────────────
  US_STATES: [
    "Alabama","Alaska","Arizona","Arkansas","California","Colorado",
    "Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho",
    "Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine",
    "Maryland","Massachusetts","Michigan","Minnesota","Mississippi",
    "Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey",
    "New Mexico","New York","North Carolina","North Dakota","Ohio",
    "Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina",
    "South Dakota","Tennessee","Texas","Utah","Vermont","Virginia",
    "Washington","West Virginia","Wisconsin","Wyoming",
  ],

  // ── Categories ────────────────────────────────────────────────────────────
  CATEGORIES: [
    { id: "general",       label: "🌐 Top Stories",   icon: "fa-newspaper"       },
    { id: "world",         label: "🌍 World",          icon: "fa-globe"           },
    { id: "nation",        label: "🏛️ National",       icon: "fa-landmark"        },
    { id: "politics",      label: "🗳️ Politics",       icon: "fa-vote-yea"        },
    { id: "business",      label: "💼 Business",       icon: "fa-briefcase"       },
    { id: "finance",       label: "💰 Finance",        icon: "fa-chart-line"      },
    { id: "technology",    label: "💻 Technology",     icon: "fa-microchip"       },
    { id: "sports",        label: "⚽ Sports",          icon: "fa-futbol"          },
    { id: "entertainment", label: "🎬 Entertainment",  icon: "fa-film"            },
    { id: "health",        label: "🏥 Health",         icon: "fa-heartbeat"       },
    { id: "science",       label: "🔬 Science",        icon: "fa-flask"           },
  ],
};
