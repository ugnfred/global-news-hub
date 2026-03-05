/**
 * Global News Hub — API Layer
 *
 * All external data is fetched here.  When API keys are absent the module
 * falls back to rich mock data so the UI is always functional.
 */

/* ── Valid GNews topic names for /top-headlines ─────────────────────────── */
// GNews only supports these topic values; unsupported categories use /search instead.
const GNEWS_VALID_TOPICS = new Set([
  "world", "nation", "business", "technology", "sports",
  "entertainment", "health", "science", "breaking-news",
]);

/* ── Mock data ──────────────────────────────────────────────────────────── */

const MOCK_ARTICLES = [
  {
    title: "World Leaders Gather for Climate Summit in Geneva",
    description: "Heads of state from over 150 nations convene to agree on new emissions targets ahead of the 2030 deadline.",
    content: "World leaders have gathered in Geneva for the landmark Climate Summit, where they are expected to negotiate binding agreements on carbon emissions reductions. The summit, the largest of its kind since the Paris Agreement, has drawn heads of state from more than 150 countries.\n\nNegotiators are focused on three main areas: setting binding national targets for a 50% cut in greenhouse-gas emissions by 2030, establishing a $500 billion green-transition fund for developing economies, and creating enforceable penalties for nations that fall short of their pledges.\n\nOpening the proceedings, the UN Secretary-General warned that current commitments put the planet on course for 2.7°C of warming — well above the 1.5°C limit scientists say is necessary to avoid the most catastrophic impacts. \"We are not doing enough, and we are not doing it fast enough,\" he said to sustained applause.\n\nSeveral major emitters have already tabled upgraded pledges ahead of the summit. The European Union announced a new target of net-zero by 2045, five years earlier than its previous goal. India revealed a $200 billion national clean-energy plan backed by international financing. The United States put forward expanded methane regulations and a commitment to phase out coal-fired power by 2035.\n\nA final communiqué is expected by the end of the week, though diplomats caution that agreement on the penalty mechanism remains the most contentious issue on the agenda.",
    url: "#",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80",
    publishedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    source: { name: "Global Times", url: "#" },
    category: "world",
  },
  {
    title: "Tech Giants Face New Antitrust Regulations in Europe",
    description: "The European Commission finalises landmark digital markets legislation that will reshape how big tech operates across the continent.",
    content: "The European Commission has introduced sweeping new antitrust regulations targeting major technology companies operating in the European Union. The Digital Markets Act, now fully in force, designates six companies as 'gatekeepers' — Alphabet, Amazon, Apple, ByteDance, Meta, and Microsoft — and imposes strict obligations on how they run their platforms.\n\nUnder the new rules, gatekeepers must allow third-party app stores on their devices, give business users access to the data they generate, and refrain from self-preferencing their own services in rankings and search results. Violations can result in fines of up to 10% of global annual revenue, rising to 20% for repeat offenders, and structural remedies including forced break-ups for systemic breaches.\n\nCommission Executive Vice-President Margrethe Vestager called the legislation \"a fundamental shift in digital regulation\" that puts European consumers and businesses back in control. \"The era of unchecked market power in tech is over,\" she said at a press conference in Brussels.\n\nIndustry groups have warned the rules could reduce innovation and push companies to withdraw services from European markets. Apple has already challenged several provisions in the European Court of Justice, arguing that requirements to open the iPhone to third-party stores undermine security.\n\nThe Commission is expected to publish compliance assessments for each gatekeeper within six months, with enforcement actions likely to follow swiftly against any company found in breach.",
    url: "#",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    publishedAt: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
    source: { name: "Tech Insider", url: "#" },
    category: "technology",
  },
  {
    title: "Gold Surges to Record High Amid Economic Uncertainty",
    description: "The precious metal broke through the $2,500/oz barrier as investors seek safe-haven assets.",
    content: "Gold prices reached a historic high today, surging past the $2,500 per ounce mark as global economic uncertainty drove investors toward safe-haven assets in unprecedented numbers. The rally, which began in Asian trading hours, accelerated through European and US sessions as fresh data pointed to slowing growth in major economies.\n\nThe move higher was fuelled by a combination of factors: a surprise contraction in euro-zone manufacturing output, renewed concerns about commercial real-estate stress in the United States, and ongoing geopolitical tensions that have kept risk appetite subdued. The dollar softened against major peers, providing an additional tailwind for dollar-denominated commodities.\n\nAnalysts at three of the world's largest investment banks now see gold testing $2,700 before year-end. 'The structural drivers — central-bank buying, de-dollarisation trends and retail demand from Asia — remain firmly intact,' said the chief commodities strategist at one major bank. 'This breakout is technically significant and may attract substantial momentum flows.'\n\nCentral banks have been net buyers of gold for 13 consecutive quarters, with emerging-market institutions accounting for the bulk of purchases. Retail demand has also surged, with exchange-traded funds backed by physical gold recording their largest single-day inflow since 2020.\n\nSilver, platinum and palladium followed gold higher, with silver briefly touching a 12-year peak. Commodity traders note that if inflationary pressures persist and rate cuts materialise later this year, the precious-metals complex could see sustained gains through the remainder of 2025.",
    url: "#",
    image: "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=800&q=80",
    publishedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    source: { name: "Financial Review", url: "#" },
    category: "finance",
  },
  {
    title: "Championship Final: Historic Victory Stuns Millions of Fans",
    description: "In a nail-biting 90-minute contest, the underdogs clinched a sensational 3-2 victory in extra time.",
    content: "In one of the most dramatic finals in recent memory, the championship title changed hands last night as the underdogs produced a stunning comeback to win 3-2 in extra time before a packed stadium of 85,000 spectators and a worldwide television audience estimated at 400 million.\n\nTrailing 2-0 at half-time and seemingly heading for a heavy defeat, the team's captain rallied his side with what team-mates later described as an unforgettable dressing-room speech. Two goals in three second-half minutes — a long-range strike and a deflected cross — levelled the match, before a clinical finish in the 108th minute of extra time sealed an improbable triumph.\n\nSocial media erupted within seconds of the final whistle, with the winning captain's name trending globally on every major platform. 'I told the boys at half-time: this is not over. We've been through worse. Believe,' he said in an emotional post-match interview, his voice cracking with relief.\n\nThe manager, who was widely expected to be sacked if his side failed to win, was engulfed in a prolonged team celebration on the pitch. His opposite number was gracious in defeat, describing his rivals as 'worthy champions who never gave up.'\n\nThe victory secured a domestic-and-continental double for the club — their first in 27 years — and sparked celebrations across the city that continued until dawn. The squad is set to parade through the streets tomorrow afternoon before an open-top bus rally expected to draw hundreds of thousands of supporters.",
    url: "#",
    image: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=800&q=80",
    publishedAt: new Date(Date.now() - 1000 * 60 * 150).toISOString(),
    source: { name: "Sports Daily", url: "#" },
    category: "sports",
  },
  {
    title: "Blockbuster Film Breaks All-Time Opening Weekend Records",
    description: "The highly anticipated sequel shattered box-office records, earning over $400 million in its opening weekend worldwide.",
    content: "Hollywood celebrated a record-breaking weekend as the latest blockbuster sequel swept theatres across the globe, amassing $412 million in its opening three days — the highest domestic debut ever recorded, surpassing the previous record by more than $30 million.\n\nThe film, the sixth entry in a franchise that has now grossed over $8 billion worldwide, benefited from an unprecedented marketing campaign that included exclusive IMAX previews, a week-long world tour by its principal cast, and a viral social-media strategy that generated more than two billion impressions in the month before release.\n\nCritics have been largely enthusiastic, with the film holding an 87% approval rating on major review aggregator sites. Audiences gave it an A+ Cinemascore — a rare distinction — with exit surveys noting that viewers responded particularly warmly to its emotional third act and a surprise cameo appearance that has already become the most discussed scene of the year.\n\nThe studio's chief executive called the result 'a validation of everything we believe about the power of cinematic storytelling' and confirmed that a seventh instalment is already in early development. The director, attending the premiere in London, hinted that the sequel would explore territory 'more personal and surprising than anything we've done before.'\n\nInternational markets contributed a further $218 million, with the film topping the box office in 74 countries. Industry analysts now expect a global cumulative total of $1.2 billion within the first month of release.",
    url: "#",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=80",
    publishedAt: new Date(Date.now() - 1000 * 60 * 200).toISOString(),
    source: { name: "Entertainment Weekly", url: "#" },
    category: "entertainment",
  },
  {
    title: "Central Banks Signal Interest Rate Cuts Later This Year",
    description: "Major central banks hint at policy easing as inflation finally cools towards target levels.",
    content: "Several of the world's most influential central banks signalled on Thursday that interest rate reductions may be on the horizon, marking a potential turning point in the most aggressive global monetary tightening cycle in four decades. The Federal Reserve, the European Central Bank, and the Bank of England each released statements that economists interpreted as preparing markets for cuts as early as the third quarter.\n\nThe Federal Reserve's minutes from its latest policy meeting revealed that 'a significant majority' of committee members now believe the current level of restriction is 'more than sufficient' to bring inflation back to the 2% target. Fed Chair Jerome Powell, speaking at a press conference, said the committee would be 'data-dependent' but acknowledged that the direction of the next move was 'becoming clearer.'\n\nHeadline inflation in the United States fell to 2.4% in the latest reading, its lowest level in three years and closer to the target than at any point since the tightening cycle began. Core services inflation — the measure most closely watched by the Fed — also eased, albeit more modestly, to 3.1%.\n\nIn Europe, the ECB's chief economist indicated that the Governing Council was 'growing more confident' that inflation was durably converging to target. Markets are now pricing in three quarter-point cuts from the ECB before year-end, beginning in June.\n\nBond markets responded sharply, with yields on two-year Treasuries falling 18 basis points on the day. Equity indices touched fresh highs, led by rate-sensitive sectors including real estate and utilities. The dollar weakened 0.6% against a basket of major currencies.",
    url: "#",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
    publishedAt: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
    source: { name: "Bloomberg", url: "#" },
    category: "finance",
  },
  {
    title: "Breakthrough in Cancer Research Offers New Hope",
    description: "Scientists announce a novel immunotherapy treatment that has shown remarkable results in early-stage clinical trials.",
    content: "Researchers at a leading university hospital have unveiled an experimental immunotherapy treatment that has demonstrated extraordinary results in early-stage clinical trials, raising hopes for a new approach to treating some of the most aggressive forms of cancer. The therapy, which harnesses the body's own immune system to identify and destroy tumour cells, produced a complete response — meaning no detectable cancer — in 68% of participants with advanced pancreatic cancer, a disease that typically has a five-year survival rate of less than 12%.\n\nThe treatment works by engineering a patient's T-cells to express novel receptors capable of recognising a protein found on the surface of pancreatic tumour cells but absent from healthy tissue. This specificity reduces the risk of the dangerous off-target immune reactions that have limited earlier generations of cell therapies.\n\nThe lead researcher called the results 'beyond anything we dared hope for at this stage' but emphasised that the trial involved only 47 patients and that larger, randomised studies are essential before the therapy can be considered for regulatory approval. 'We are still years from clinical availability, but these data justify urgent expansion of the trial,' she said.\n\nThe findings have been published in the New England Journal of Medicine and simultaneously presented at the American Society of Clinical Oncology annual meeting, where they were greeted with a standing ovation from thousands of oncologists. Several cancer charities immediately pledged additional funding to accelerate the next phase of research.\n\nA Phase II trial involving 300 patients across 15 centres in North America and Europe is expected to begin within six months.",
    url: "#",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&q=80",
    publishedAt: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
    source: { name: "Health Today", url: "#" },
    category: "health",
  },
  {
    title: "Election Results: Landmark Shift in Political Landscape",
    description: "Voters delivered a decisive verdict yesterday in one of the most closely watched elections of the decade.",
    content: "Millions of citizens headed to the polls yesterday in an election that analysts called a watershed moment for the nation, delivering a decisive result that will reshape the political landscape for years to come. The winning party secured a commanding majority, overcoming a heavily fragmented opposition and a campaign marred by a last-minute controversy over leaked policy documents.\n\nThe election, which saw record turnout of 71% — the highest since 1987 — was fought primarily on economic concerns, immigration, and the cost of living. Exit polls conducted by three independent organisations correctly predicted the outcome within the margin of error, signalling a clear and consistent expression of voter intent.\n\nThe incoming prime minister, addressing jubilant supporters at party headquarters just after midnight, pledged to govern 'for every citizen, not only those who voted for us' and outlined a first-100-days agenda centred on tax reform, NHS investment, and a new national housing programme. 'Tonight, the people have spoken. Tomorrow, the work begins,' she declared.\n\nThe outgoing administration, which had held power for 14 years, suffered its worst result in modern history, losing 89 seats. The former prime minister announced his resignation as party leader shortly after the scale of the defeat became clear, triggering an immediate internal post-mortem.\n\nMarkets reacted positively at the open, with the leading stock index rising 1.8% and the currency strengthening against the dollar as investors anticipated policy continuity on fiscal matters. Economists from major banks broadly welcomed the clarity of the result, noting that decisive government is typically positive for medium-term investment sentiment.",
    url: "#",
    image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800&q=80",
    publishedAt: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
    source: { name: "Political Observer", url: "#" },
    category: "politics",
  },
  {
    title: "NASA Unveils Next-Generation Space Telescope",
    description: "The agency announces a powerful new observatory set to launch in 2027 that will peer deeper into the universe than ever before.",
    content: "NASA has unveiled plans for its most ambitious space telescope to date, a facility that promises to revolutionise our understanding of the cosmos by observing the universe at ultraviolet, optical, and near-infrared wavelengths with a mirror nearly three times the size of the Hubble Space Telescope. The observatory, named the Habitable Worlds Observatory, is designed specifically to search for biosignatures — chemical signs of life — in the atmospheres of Earth-like planets orbiting nearby stars.\n\nThe telescope's 6.5-metre primary mirror, composed of 18 hexagonal beryllium segments coated with a thin layer of gold, will collect more than nine times the light-gathering power of Hubble. Advances in coronagraph technology will allow it to block a star's glare and directly image planets in its habitable zone — something no previous telescope has been able to do for Sun-like stars.\n\nNASA Administrator Bill Nelson described the mission as 'the next giant leap in our search for life beyond Earth.' The agency has committed to a launch window in 2027, with deployment to the second Lagrange point — some 1.5 million kilometres from Earth — where it will join the James Webb Space Telescope.\n\nThe project has an estimated cost of $11 billion and is the product of a decade of planning by a team of over 1,200 scientists, engineers, and technologists. International partners including the European Space Agency and the Canadian Space Agency will contribute instruments and support operations.\n\nInitial science targets include a survey of 25 nearby Earth-sized exoplanets in habitable zones, deep-field imaging to study the formation of the first galaxies, and ultraviolet spectroscopy of stellar populations across cosmic time.",
    url: "#",
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&q=80",
    publishedAt: new Date(Date.now() - 1000 * 60 * 420).toISOString(),
    source: { name: "Science Today", url: "#" },
    category: "science",
  },
  {
    title: "Global Supply Chain Recovery Boosts Business Confidence",
    description: "A new survey reveals business optimism at a three-year high as freight and logistics bottlenecks ease.",
    content: "The global supply chain, battered by disruptions over the past few years, is showing clear signs of recovery, with a comprehensive new survey of 2,400 executives across 38 countries revealing business confidence at its highest level in three years. Average container shipping times have fallen by 22% over the past six months, port congestion has eased significantly at major hubs, and freight rates have normalised to near-pre-pandemic levels.\n\nThe survey, conducted jointly by a leading consultancy and a major industry association, found that 64% of respondents now describe supply chain risk as 'manageable' — up from just 29% eighteen months ago. Inventory levels, which had swung dramatically between shortages and gluts, are now described as 'balanced' by more than half of manufacturers.\n\nThe recovery is being driven by a combination of factors: substantial capital investment in port infrastructure, the widespread adoption of AI-based demand-forecasting tools, a diversification of sourcing away from single-country dependence, and a gradual normalisation of consumer spending patterns after the post-pandemic surge.\n\nNot all sectors are recovering equally. The automotive industry continues to grapple with semiconductor availability, albeit at a much-reduced level of severity compared with 2022. Some pharmaceutical supply chains remain fragile, particularly for active pharmaceutical ingredients sourced from a narrow group of countries.\n\nCEOs who previously described reshoring manufacturing as a priority have now moderated their ambitions, with most settling for a 'China-plus-one' strategy that diversifies production to lower-cost locations in Southeast Asia, India, and Mexico rather than returning it to domestic markets.",
    url: "#",
    image: "https://images.unsplash.com/photo-1578574577315-3fbeb0cecdc2?w=800&q=80",
    publishedAt: new Date(Date.now() - 1000 * 60 * 480).toISOString(),
    source: { name: "Business Insider", url: "#" },
    category: "business",
  },
  {
    title: "International Peace Talks Resume After Six-Month Hiatus",
    description: "Diplomats from rival factions return to the negotiating table in a renewed push to end a prolonged regional conflict.",
    content: "Hope was cautiously rekindled today as delegations from both sides of a protracted conflict arrived in Vienna for fresh peace negotiations, six months after talks collapsed amid mutual accusations of bad faith. The resumption was brokered by a coalition of five neutral nations and the United Nations Special Envoy, who spent three months conducting shuttle diplomacy to rebuild a minimum of trust between the parties.\n\nOpening the proceedings, the UN Special Envoy acknowledged the fragility of the moment but expressed 'guarded optimism' that the conditions for a sustainable ceasefire were now better than at any point in the conflict's four-year history. Both delegations arrived in Vienna having observed a 72-hour humanitarian pause, the longest uninterrupted cessation of hostilities since fighting escalated.\n\nThe agenda for the first three days focuses on confidence-building measures: the exchange of prisoners of war, the establishment of humanitarian corridors for civilians, and the creation of a joint monitoring commission overseen by neutral observers. Substantive political questions — territorial boundaries, power-sharing arrangements, and accountability for alleged war crimes — are expected to be addressed only in a later phase.\n\nInternational observers note that outside pressure has increased markedly since the previous round of talks. Three of the conflict parties' principal external backers have signalled that continued financial and military support is conditional on meaningful engagement with the peace process. Economic exhaustion on both sides is also widely cited as a driver for renewed engagement.\n\nA spokesperson for one of the delegations said the talks 'will not be easy' but that her government was 'committed to giving diplomacy every chance.' Her counterpart echoed the cautious tone, saying his side had come 'in good faith and with serious proposals.'",
    url: "#",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&q=80",
    publishedAt: new Date(Date.now() - 1000 * 60 * 540).toISOString(),
    source: { name: "World Affairs", url: "#" },
    category: "world",
  },
  {
    title: "Renewable Energy Investment Hits Record $1 Trillion in 2025",
    description: "Clean energy spending surpassed fossil-fuel investment for the first time in history, a report reveals.",
    content: "Global investment in renewable energy reached a historic milestone in 2025, crossing the $1 trillion threshold for the first time and, for the first time, outpacing total investment in fossil fuels. The landmark finding, published in the annual Global Energy Transition Report, underscores a profound structural shift in the world's energy system driven by falling technology costs, tightening climate policies, and surging corporate demand for clean electricity.\n\nSolar power attracted the largest share of investment, accounting for $420 billion, as the levelised cost of utility-scale solar continued to fall and reached grid parity in more than 100 countries. Offshore wind attracted $180 billion, with Asia and Europe dominating new capacity additions. Green hydrogen, battery storage, and electricity grid infrastructure accounted for much of the remainder.\n\nThe report's authors credit three policy developments with accelerating the transition: the US Inflation Reduction Act, which has catalysed over $300 billion in clean-energy manufacturing investment since its passage; the EU's Green Deal Industrial Plan; and China's continued dominance in solar panel, battery, and wind-turbine manufacturing, which has driven component costs down globally.\n\nDespite the record investment headline, the report cautions that the pace of transition remains insufficient to limit global warming to 1.5°C. 'We need to triple investment again by 2030,' said the lead author. 'A trillion dollars is a milestone, not the destination.'\n\nCoal investment fell to its lowest level in two decades, though natural gas continues to attract significant capital as a transition fuel. Oil investment held broadly steady, concentrated in a handful of low-cost producers. Employment in clean energy now exceeds employment in fossil fuels globally for the first time, reaching 14.4 million jobs worldwide.",
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
  // GNews free tier appends "[+N chars]" to truncated content — strip it
  const rawContent = a.content || "";
  const content = rawContent.replace(/\s*\[\+\d+\s*chars?\]\s*$/, "").trim();
  return {
    title:       a.title        || "No title",
    description: a.description  || "",
    content,
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
    let pool;
    if (_mockRefreshCycle === 1) {
      pool = MOCK_ARTICLES;
    } else {
      const poolIdx    = (_mockRefreshCycle - 2) % MOCK_REFRESH_POOL.length;
      const freshEntry = {
        ...MOCK_REFRESH_POOL[poolIdx],
        url:         `${MOCK_REFRESH_POOL[poolIdx].url}-${_mockRefreshCycle}`,
        publishedAt: new Date().toISOString(),
      };
      pool = [freshEntry, ...MOCK_ARTICLES];
    }
    // Apply category filter in mock mode so category tabs show relevant articles
    if (category && category !== "general") {
      const filtered = pool.filter(a => a.category === category);
      return filtered.length ? filtered : pool;
    }
    return pool;
  }

  try {
    const params = { lang };
    // Only pass `topic` for categories supported by the GNews /top-headlines endpoint
    if (category && category !== "general" && GNEWS_VALID_TOPICS.has(category)) {
      params.topic = category;
    }
    if (country) params.country = country;

    const res = await fetch(buildGNewsURL("/top-headlines", params));
    if (!res.ok) throw new Error(`GNews ${res.status}`);
    const data = await res.json();
    return (data.articles || []).map(a => ({ ...mapGNewsArticle(a), _category: category }));
  } catch (err) {
    console.warn("fetchTopHeadlines error — using mock data:", err.message);
    const fallback = category && category !== "general"
      ? MOCK_ARTICLES.filter(a => a.category === category)
      : MOCK_ARTICLES;
    return fallback.length ? fallback : MOCK_ARTICLES;
  }
}

/**
 * Search articles by keyword, with optional country / language filter.
 * @param {string} query
 * @param {object} opts - { country, lang, category }
 */
async function searchNews(query, { country = "", lang = "en", category = "" } = {}) {
  if (!CONFIG.GNEWS_API_KEY) {
    const q = query.toLowerCase();
    return MOCK_ARTICLES.filter(a =>
      a.title.toLowerCase().includes(q) ||
      a.description.toLowerCase().includes(q) ||
      a.category.toLowerCase() === q
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
