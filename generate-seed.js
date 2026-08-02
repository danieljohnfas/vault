const initialAds = [
  // High Yield Bounties from user prompt
  {
    id: "B00DBYBNEE", // Placeholder ASIN for Prime Student
    title: "Prime for Young Adults",
    desc: "Join Prime for Young Adults and get 6 months free. Free delivery, Prime Video, and more.",
    emoji: "📦",
    cta: "Start Free Trial",
    priceHint: "6 Months Free",
    tags: "all,streaming,downloads",
    commission_rate: 30.00
  },
  {
    id: "B00NB86OYE", // Placeholder ASIN for Audible
    title: "Audible Premium Plus",
    desc: "Get unlimited listening to thousands of audiobooks, podcasts, and Originals.",
    emoji: "🎧",
    cta: "Try Audible Free",
    priceHint: "30 Days Free",
    tags: "books,manga,audio,all",
    commission_rate: 25.00
  },
  {
    id: "B01IEIFHJY", // Placeholder ASIN for Amazon Business
    title: "Amazon Business",
    desc: "Create a free Amazon Business account for exclusive business pricing and bulk discounts.",
    emoji: "🏢",
    cta: "Sign Up Free",
    priceHint: "Free Account",
    tags: "all,privacy,community",
    commission_rate: 15.00
  },
  {
    id: "B00N28818A", // Placeholder for Prime Video
    title: "Prime Video Add-on Subscriptions",
    desc: "Add your favorite channels like Crunchyroll and Paramount+ directly to Prime Video.",
    emoji: "📺",
    cta: "Explore Channels",
    priceHint: "Free Trials Available",
    tags: "streaming,anime,all",
    commission_rate: 3.00
  },
  // High Commission Rate Categories (Amazon Games 20%, Luxury 10%)
  {
    id: "B08F4XLKWZ",
    title: "Logitech G305 Wireless Gaming Mouse",
    desc: "HERO sensor, 250hr battery, 12000 DPI. Elite wireless gaming mouse.",
    emoji: "🖱️",
    cta: "Buy on Amazon",
    priceHint: "From ~$39",
    tags: "gaming,games,tech",
    commission_rate: 20.00 // Mapping to Amazon Games/Accessories high rate
  },
  // Storage (Important for this site)
  {
    id: "B0C4DV6P7M",
    title: "Samsung T7 Shield 2TB SSD",
    desc: "Blazing-fast 2TB portable SSD. Rugged, compact, perfect for large media libraries.",
    emoji: "⚡",
    cta: "Shop on Amazon",
    priceHint: "From ~$109",
    tags: "storage,all,downloads,premium",
    commission_rate: 2.50 // Computers
  },
  {
    id: "197410237X",
    title: "Demon Slayer Vol. 1 Manga",
    desc: "Tanjiro's journey begins. Collect official Demon Slayer manga volumes.",
    emoji: "🗡️",
    cta: "Shop Amazon",
    priceHint: "From ~$9",
    tags: "manga,anime,books",
    commission_rate: 4.50 // Books
  },
  {
    id: "B09G9FPHY6",
    title: "Privacy Screen Protector (Universal)",
    desc: "Browse privately IRL. Anti-spy filter keeps prying eyes away from your screen.",
    emoji: "🔒",
    cta: "View on Amazon",
    priceHint: "From ~$19",
    tags: "privacy,security,all",
    commission_rate: 4.00
  }
];

let sql = '';
for (const ad of initialAds) {
  sql += `INSERT OR IGNORE INTO amazon_ads (id, title, desc, emoji, cta, priceHint, tags, commission_rate, clicks) VALUES ('${ad.id}', '${ad.title.replace(/'/g, "''")}', '${ad.desc.replace(/'/g, "''")}', '${ad.emoji}', '${ad.cta}', '${ad.priceHint}', '${ad.tags}', ${ad.commission_rate}, 0);\n`;
}

require('fs').writeFileSync('seed-ads.sql', sql);
console.log('seed-ads.sql created.');
