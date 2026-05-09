// data.js
// Safe mode for compliance review

const sitesData = [
    { id: "crunchyroll", name: "Crunchyroll", url: "https://www.crunchyroll.com", category: "Anime Streaming", description: "The world's most popular official anime brand. Offers free ad-supported and premium viewing.", tags: ["Official","Paid","Freemium"], rating: 4.5, addedAt: "2026-05-09" },
    { id: "hidive", name: "HIDIVE", url: "https://www.hidive.com", category: "Anime Streaming", description: "Premium streaming service known for uncut, uncensored anime and exclusive dubs.", tags: ["Paid","Official","Uncensored"], rating: 4.3, addedAt: "2026-05-09" },
    { id: "tubianime", name: "Tubi Anime", url: "https://tubitv.com/category/anime", category: "Anime Streaming", description: "Free ad-supported official anime streaming platform.", tags: ["Free","Official","Ads"], rating: 4, addedAt: "2026-05-09" },
    { id: "retrocrush", name: "RetroCrush", url: "https://www.retrocrush.tv", category: "Anime Streaming", description: "Dedicated exclusively to classic and retro anime titles.", tags: ["Free","Official","Retro"], rating: 4.4, addedAt: "2026-05-09" },
    { id: "fakku", name: "FAKKU!", url: "https://www.fakku.net", category: "Manga/Doujin", description: "The premier official publisher of English translated hentai manga.", tags: ["Paid","Official","English"], rating: 4.8, addedAt: "2026-05-09" },
    { id: "dlsite", name: "DLsite", url: "https://www.dlsite.com/eng", category: "Games", description: "The largest official marketplace for Japanese indie games, doujin, and audio.", tags: ["Paid","Official","Indie"], rating: 4.9, addedAt: "2026-05-09" },
    { id: "nutaku", name: "Nutaku", url: "https://www.nutaku.net", category: "Games", description: "The largest portal for adult browser and mobile games.", tags: ["Free","Freemium","Browser Games"], rating: 4.4, addedAt: "2026-05-09" },
    { id: "jastusa", name: "JAST USA", url: "https://jastusa.com", category: "Games", description: "Official publisher of classic Japanese visual novels and eroge.", tags: ["Paid","Official","Eroge"], rating: 4.6, addedAt: "2026-05-09" },
    { id: "mangagamer", name: "MangaGamer", url: "https://www.mangagamer.com", category: "Games", description: "Official English localizer and distributor of Japanese eroge.", tags: ["Paid","Official","Eroge"], rating: 4.7, addedAt: "2026-05-09" },
    { id: "kaguragames", name: "Kagura Games", url: "https://kaguragames.com", category: "Games", description: "Publisher focusing on officially localized adult RPG Maker titles.", tags: ["Paid","Official","RPG"], rating: 4.5, addedAt: "2026-05-09" },
    { id: "shiravune", name: "Shiravune", url: "https://shiravune.com", category: "Games", description: "Official localizer of Japanese adult games.", tags: ["Paid","Official","Localizer"], rating: 4.5, addedAt: "2026-05-09" },
    { id: "patreon", name: "Patreon", url: "https://www.patreon.com", category: "Communities", description: "The main funding hub for thousands of indie creators.", tags: ["Paid","Indie","Crowdfunding"], rating: 4.8, addedAt: "2026-05-09" },
    { id: "itchio", name: "Itch.io", url: "https://itch.io/games/nsfw", category: "Games", description: "Indie game marketplace with a thriving official NSFW section.", tags: ["Free","Paid","Indie"], rating: 4.7, addedAt: "2026-05-09" },
    { id: "myanimelist", name: "MyAnimeList", url: "https://myanimelist.net", category: "Communities", description: "The world's most active online anime and manga database and community.", tags: ["Database","Community","Reviews"], rating: 4.9, addedAt: "2026-05-09" },
    { id: "anilist", name: "AniList", url: "https://anilist.co", category: "Communities", description: "Modern anime and manga tracker with a sleek interface and social features.", tags: ["Database","Modern","Social"], rating: 4.8, addedAt: "2026-05-09" },
    { id: "animeplanet", name: "Anime-Planet", url: "https://www.anime-planet.com", category: "Communities", description: "Track anime, read manga, and engage in a friendly community.", tags: ["Database","Reviews","Legal"], rating: 4.6, addedAt: "2026-05-09" },
    { id: "kitsu", name: "Kitsu", url: "https://kitsu.io", category: "Communities", description: "A social media-style anime tracker and discovery engine.", tags: ["Database","Social","Discovery"], rating: 4.5, addedAt: "2026-05-09" },
    { id: "ranime", name: "r/Anime", url: "https://www.reddit.com/r/anime", category: "Communities", description: "The largest anime discussion board on Reddit.", tags: ["Community","Discussion","News"], rating: 4.8, addedAt: "2026-05-09" },
    { id: "steamvisualnovels", name: "Steam Visual Novels", url: "https://store.steampowered.com/tags/en/Visual+Novel/", category: "Visual Novels", description: "Steam's official visual novel catalog with thousands of titles.", tags: ["Free","Paid","Official"], rating: 4.5, addedAt: "2026-05-09" }
];

// Extract unique categories and tags for the UI filters
const ALL_CATEGORIES = [...new Set(sitesData.map(site => site.category))].sort();

const allTagsRaw = [];
sitesData.forEach(site => site.tags.forEach(tag => allTagsRaw.push(tag)));
const ALL_TAGS = [...new Set(allTagsRaw)].sort();
