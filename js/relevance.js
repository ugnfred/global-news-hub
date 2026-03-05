/**
 * Global News Hub — Relevance Scoring Engine
 *
 * Assigns a dynamic score to each article so that the most important,
 * timely, and market-relevant news always floats to the top of the feed.
 *
 * Score components (each 0–100, then multiplied by CONFIG.RELEVANCE_WEIGHTS):
 *   • RECENCY   — exponential half-life decay based on publication age
 *   • URGENCY   — weighted keyword scan of title + description
 *   • MARKET    — finance / economics keyword density
 *   • CATEGORY  — editorial importance weight of the news category
 */

const RELEVANCE = (() => {

  /* ── Urgency keyword groups (matched against title + description) ──────── */
  const URGENCY_GROUPS = [
    { words: ["breaking", "urgent", "flash", "alert"],                weight: 10 },
    { words: ["crisis", "emergency", "war", "attack", "terror"],      weight: 9  },
    { words: ["crash", "collapse", "explosion", "massacre", "coup"],  weight: 8  },
    { words: ["death", "killed", "dies", "dead", "fatal", "victims"], weight: 7  },
    { words: ["election", "vote", "historic", "record", "landmark"],  weight: 6  },
    { words: ["surge", "soar", "plunge", "slump", "tumble", "spike"], weight: 5  },
    { words: ["sanctions", "ban", "shutdown", "arrested", "seized"],  weight: 4  },
    { words: ["announce", "unveil", "reveal", "deal", "agreement"],   weight: 3  },
  ];
  // Maximum possible raw urgency score (each group counted once)
  const URGENCY_MAX = URGENCY_GROUPS.reduce((s, g) => s + g.weight, 0);

  /* ── Market / finance keywords ─────────────────────────────────────────── */
  const MARKET_KEYWORDS = [
    "gold", "silver", "oil", "crude", "brent",
    "inflation", "deflation", "rate", "interest", "fed", "ecb", "central bank",
    "gdp", "recession", "growth", "jobs", "unemployment",
    "stock", "shares", "market", "index", "dow", "nasdaq",
    "bitcoin", "crypto", "ethereum", "dollar", "euro", "yen", "currency",
    "trade", "tariff", "sanctions", "deficit", "debt", "budget",
    "earnings", "profit", "revenue", "acquisition", "merger",
    "housing", "mortgage", "bond", "yield", "treasury",
  ];
  // 5 distinct market keyword hits → full score
  const MARKET_SAT = 5;

  /* ── Category importance weights (0–100) ───────────────────────────────── */
  const CATEGORY_WEIGHTS = {
    general:       90,
    world:         85,
    politics:      80,
    finance:       80,
    business:      70,
    technology:    60,
    nation:        60,
    health:        55,
    science:       50,
    sports:        40,
    entertainment: 35,
  };

  /* ── Badge thresholds ─────────────────────────────────────────────────────── */
  const NEW_BADGE_MAX_AGE_MINUTES   = 15;   // article must be < 15 min old for "new" badge
  const MARKET_BADGE_MIN_SCORE      = 40;   // min market score (0-100) for "market" badge
  const TRENDING_BADGE_MIN_URGENCY  = 50;   // min urgency score (0-100) for "trending" badge

  /* ── Recency (exponential decay, half-life = 2 hours) ──────────────────── */
  // Score = 100 × (0.5 ^ (ageMinutes / 120))
  // → article published "just now" scores 100; after 2 h scores 50; after 4 h scores 25, etc.
  const RECENCY_HALF_LIFE_MINUTES = 120;
  function recencyScore(publishedAt) {
    const ageMs  = Date.now() - new Date(publishedAt).getTime();
    const ageMin = Math.max(0, ageMs / 60000);
    return 100 * Math.pow(0.5, ageMin / RECENCY_HALF_LIFE_MINUTES);
  }

  /* ── Urgency (keyword scan) ─────────────────────────────────────────────── */
  function urgencyScore(text) {
    const lower = text.toLowerCase();
    let raw = 0;
    for (const group of URGENCY_GROUPS) {
      for (const word of group.words) {
        if (lower.includes(word)) { raw += group.weight; break; }
      }
    }
    return Math.min(100, (raw / URGENCY_MAX) * 100);
  }

  /* ── Market relevance ──────────────────────────────────────────────────── */
  function marketScore(text) {
    const lower = text.toLowerCase();
    let hits = 0;
    for (const kw of MARKET_KEYWORDS) {
      if (lower.includes(kw)) hits++;
    }
    return Math.min(100, (hits / MARKET_SAT) * 100);
  }

  /* ── Composite score ────────────────────────────────────────────────────── */
  function score(article) {
    const text    = (article.title || "") + " " + (article.description || "");
    const w       = CONFIG.RELEVANCE_WEIGHTS;
    const catWt   = CATEGORY_WEIGHTS[article.category] ?? 50;
    return (
      recencyScore(article.publishedAt) * (w.RECENCY   / 100) +
      urgencyScore(text)                * (w.URGENCY   / 100) +
      marketScore(text)                 * (w.MARKET    / 100) +
      catWt                             * (w.CATEGORY  / 100)
    );
  }

  /* ── Sort by score descending (non-mutating) ────────────────────────────── */
  function sort(articles) {
    return [...articles].sort((a, b) => score(b) - score(a));
  }

  /* ── Deduplicate by Jaccard title similarity (>60% overlap = duplicate) ─── */
  function dedupe(articles) {
    const seen = [];
    return articles.filter(a => {
      const words = new Set(
        a.title.toLowerCase().replace(/[^\w\s]/g, " ").split(/\s+/).filter(Boolean)
      );
      const isDup = seen.some(s => {
        const sWords = new Set(
          s.title.toLowerCase().replace(/[^\w\s]/g, " ").split(/\s+/).filter(Boolean)
        );
        const inter = [...words].filter(w => sWords.has(w)).length;
        const union = new Set([...words, ...sWords]).size;
        return union > 0 && inter / union > 0.6;
      });
      if (!isDup) seen.push(a);
      return !isDup;
    });
  }

  /**
   * Return a badge key for an article:
   *   "breaking" | "new" | "market" | "trending" | null
   */
  function getBadge(article) {
    const text   = (article.title + " " + (article.description || "")).toLowerCase();
    const ageMin = (Date.now() - new Date(article.publishedAt).getTime()) / 60000;

    if (/\b(breaking|urgent|flash)\b/.test(text)) return "breaking";
    if (ageMin <= NEW_BADGE_MAX_AGE_MINUTES)       return "new";
    if (marketScore(text) >= MARKET_BADGE_MIN_SCORE)      return "market";
    if (urgencyScore(text) >= TRENDING_BADGE_MIN_URGENCY) return "trending";
    return null;
  }

  /* ── Public surface ─────────────────────────────────────────────────────── */
  return { score, sort, dedupe, getBadge, recencyScore, urgencyScore, marketScore };
})();
