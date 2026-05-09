// data.js
// This array contains the directory listings. 
// You can add as many as you want here.

const sitesData = [
    // Anime Streaming
    {
        id: "crunchyroll",
        name: "Crunchyroll",
        url: "https://www.crunchyroll.com",
        category: "Anime Streaming",
        description: "The world's most popular anime brand. Offers both free ad-supported and premium viewing.",
        tags: ["Official", "Paid", "Freemium", "Subbed", "Dubbed"],
        rating: 4.5,
        addedAt: "2026-05-01"
    },
    {
        id: "aniwave",
        name: "Aniwave (formerly 9anime)",
        url: "https://aniwave.to",
        category: "Anime Streaming",
        description: "One of the most popular unofficial anime streaming sites with a massive library.",
        tags: ["Free", "Subbed", "Dubbed"],
        rating: 4.8,
        addedAt: "2026-05-02"
    },
    {
        id: "gogoanime",
        name: "Gogoanime",
        url: "https://gogoanime3.co",
        category: "Anime Streaming",
        description: "A long-standing site for fast releases of subbed and dubbed anime.",
        tags: ["Free", "Subbed", "Dubbed", "Downloads"],
        rating: 4.2,
        addedAt: "2026-05-03"
    },

    // Hentai Streaming
    {
        id: "hanime",
        name: "Hanime.tv",
        url: "https://hanime.tv",
        category: "Hentai Streaming",
        description: "Highly rated hentai streaming site with HD video and an active community.",
        tags: ["Free", "Uncensored", "Adult (18+)", "Community"],
        rating: 4.9,
        addedAt: "2026-05-01"
    },
    {
        id: "hentaihaven",
        name: "HentaiHaven",
        url: "https://hentaihaven.com",
        category: "Hentai Streaming",
        description: "Classic hentai streaming site known for high-quality subs.",
        tags: ["Free", "Adult (18+)", "Subbed"],
        rating: 4.6,
        addedAt: "2026-05-04"
    },

    // Manga/Doujin
    {
        id: "mangadex",
        name: "MangaDex",
        url: "https://mangadex.org",
        category: "Manga/Doujin",
        description: "The largest open-source manga reader with no ads and massive community translation support.",
        tags: ["Free", "No Ads", "Community"],
        rating: 5.0,
        addedAt: "2026-05-01"
    },
    {
        id: "nhentai",
        name: "nHentai",
        url: "https://nhentai.net",
        category: "Manga/Doujin",
        description: "The definitive source for doujinshi and hentai manga reading.",
        tags: ["Free", "Adult (18+)", "Downloads"],
        rating: 4.8,
        addedAt: "2026-05-02"
    },
    {
        id: "fakku",
        name: "FAKKU",
        url: "https://www.fakku.net",
        category: "Manga/Doujin",
        description: "Official publisher of English localized hentai manga.",
        tags: ["Official", "Paid", "Adult (18+)"],
        rating: 4.0,
        addedAt: "2026-05-05"
    },

    // Images/Boorus
    {
        id: "danbooru",
        name: "Danbooru",
        url: "https://danbooru.donmai.us",
        category: "Images/Boorus",
        description: "Massive anime image board with strict tagging and moderation.",
        tags: ["Free", "Images", "Adult (18+)", "Safe for Work (Optional)"],
        rating: 4.7,
        addedAt: "2026-05-01"
    },
    {
        id: "gelbooru",
        name: "Gelbooru",
        url: "https://gelbooru.com",
        category: "Images/Boorus",
        description: "Unrestricted image board covering all anime art, including NSFW.",
        tags: ["Free", "Images", "Adult (18+)"],
        rating: 4.5,
        addedAt: "2026-05-06"
    },
    {
        id: "rule34",
        name: "Rule34",
        url: "https://rule34.xxx",
        category: "Images/Boorus",
        description: "If it exists, there is porn of it. Massive NSFW image database.",
        tags: ["Free", "Images", "Adult (18+)"],
        rating: 4.8,
        addedAt: "2026-05-02"
    },

    // Games
    {
        id: "f95zone",
        name: "F95Zone",
        url: "https://f95zone.to",
        category: "Games",
        description: "The biggest community for adult games, visual novels, and development.",
        tags: ["Free", "Community", "Downloads", "Adult (18+)"],
        rating: 4.9,
        addedAt: "2026-05-01"
    },
    {
        id: "dlsite",
        name: "DLsite",
        url: "https://www.dlsite.com",
        category: "Games",
        description: "Japanese digital distribution platform for indie games, doujinshi, and audio.",
        tags: ["Official", "Paid", "Adult (18+)"],
        rating: 4.5,
        addedAt: "2026-05-07"
    },

    // Communities
    {
        id: "myanimelist",
        name: "MyAnimeList (MAL)",
        url: "https://myanimelist.net",
        category: "Communities",
        description: "The world's largest anime and manga database and community.",
        tags: ["Free", "Database", "Community", "Safe for Work"],
        rating: 4.6,
        addedAt: "2026-05-01"
    },
    {
        id: "anilist",
        name: "AniList",
        url: "https://anilist.co",
        category: "Communities",
        description: "Modern anime and manga tracking and discovery platform.",
        tags: ["Free", "Database", "Community", "Safe for Work"],
        rating: 4.8,
        addedAt: "2026-05-03"
    }
];

// Extract unique categories and tags for the UI filters
const ALL_CATEGORIES = [...new Set(sitesData.map(site => site.category))].sort();

const allTagsRaw = [];
sitesData.forEach(site => site.tags.forEach(tag => allTagsRaw.push(tag)));
const ALL_TAGS = [...new Set(allTagsRaw)].sort();
