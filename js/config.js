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
  GNEWS_API_KEY: "",          // e.g. "abc123xyz"
  GNEWS_BASE_URL: "https://gnews.io/api/v4",
  NEWS_PAGE_SIZE: 10,

  // ── Gold price (GoldAPI.io) ───────────────────────────────────────────────
  GOLD_API_KEY: "",           // e.g. "goldapi-xxxx"
  GOLD_API_URL: "https://www.goldapi.io/api/XAU/USD",

  // ── Finance (Alpha Vantage) ───────────────────────────────────────────────
  ALPHA_VANTAGE_KEY: "",      // e.g. "ABCDEFGHIJ"
  ALPHA_VANTAGE_URL: "https://www.alphavantage.co/query",

  // ── Google Analytics (optional) ──────────────────────────────────────────
  GA_MEASUREMENT_ID: "",      // e.g. "G-XXXXXXXXXX"

  // ── Site meta ─────────────────────────────────────────────────────────────
  SITE_NAME: "Global News Hub",
  SITE_URL:  "https://global-news-hub.com",  // update when you deploy

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
