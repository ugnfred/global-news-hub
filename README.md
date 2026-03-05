# 🌐 Global News Hub

A fully responsive, static news website that aggregates breaking news from around the world — filterable by **country**, **region/state**, **category** and **scope** (local/international). Includes live **gold price** and **financial markets** widgets.

---

## ✨ Features

| Feature | Detail |
|---|---|
| 🌍 World news aggregation | Powered by [GNews API](https://gnews.io) (free tier: 100 req/day) |
| 🗺️ Location filter | Country (24 countries), US State / region |
| 📂 Category tabs | Top Stories, World, National, Politics, Business, Finance, Technology, Sports, Entertainment, Health, Science |
| 🔎 Search | Full-text search with optional country/language filter |
| 💰 Gold price widget | Live XAU/USD via [GoldAPI.io](https://www.goldapi.io) |
| 📈 Markets widget | S&P 500, NASDAQ, DOW, FTSE 100, EUR/USD, BTC, Oil |
| 🌗 Dark / Light mode | Persisted in `localStorage`, respects `prefers-color-scheme` |
| 📰 Breaking news ticker | Auto-scrolling live ticker |
| 📱 Fully responsive | Mobile-first CSS Grid + Flexbox |
| ♿ Accessible | ARIA roles, keyboard navigation, skip-to-content |
| 🔍 SEO ready | Meta tags, Open Graph, Twitter Card, JSON-LD, Sitemap, Robots.txt |
| 📣 AdSense slots | Placeholder `<div>` elements ready to replace with AdSense code |

---

## 🚀 Quick Start (no API key needed)

```bash
# Clone and open — no build step required
open index.html
# or use a local dev server:
npx serve .
```

The site works immediately with **realistic mock data**. To activate live news:

### 1 — Get a GNews API key
Sign up at <https://gnews.io> → free plan (100 requests / day).

### 2 — Add your key to `js/config.js`
```js
const CONFIG = {
  GNEWS_API_KEY: "YOUR_KEY_HERE",   // ← paste here
  ...
};
```

### 3 — (Optional) Gold price
Sign up at <https://www.goldapi.io> and add:
```js
GOLD_API_KEY: "goldapi-XXXX",
```

### 4 — (Optional) Markets
Sign up at <https://www.alphavantage.co> (free) and add:
```js
ALPHA_VANTAGE_KEY: "ABCDEFGHIJ",
```

---

## 🌐 Deploy Online

The site is **100% static** — no server required.

### GitHub Pages (free)
1. Push this repository to GitHub.
2. Go to **Settings → Pages → Source: Deploy from branch → `main` / root**.
3. Your site will be live at `https://<username>.github.io/<repo>/`.

### Netlify (free)
1. Drag the project folder onto <https://app.netlify.com/drop>.
2. Done — instant HTTPS URL.

### Vercel (free)
```bash
npx vercel --prod
```

### Any static host
Upload all files (HTML, CSS, JS, robots.txt, sitemap.xml) to your host's web root.

---

## 📁 File Structure

```
global-news-hub/
├── index.html          # Main page
├── css/
│   └── style.css       # All styles (dark/light theme, responsive)
├── js/
│   ├── config.js       # API keys, country list, categories
│   ├── api.js          # GNews / GoldAPI / AlphaVantage + mock data
│   └── app.js          # Application logic, rendering, filters
├── robots.txt          # SEO — search engine crawling rules
├── sitemap.xml         # SEO — site structure for search engines
└── README.md
```

---

## 🔧 Customisation

- **Add more countries** — extend `CONFIG.COUNTRIES` in `js/config.js`.
- **Add more categories** — extend `CONFIG.CATEGORIES`.
- **AdSense** — replace `<div class="ad-slot">` placeholders in `index.html` with your `<ins class="adsbygoogle">` tags.
- **Google Analytics** — set `CONFIG.GA_MEASUREMENT_ID` and add the GA snippet before `</head>`.
- **Branding** — edit the logo text and colours in `css/style.css` (`--clr-primary`).

---

## 📄 License

MIT — free to use, modify, and distribute.

