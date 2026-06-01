// data_full.js
const sitesData = [
    {
        "id": "crunchyroll",
        "name": "Crunchyroll",
        "url": "https://www.crunchyroll.com",
        "category": "Anime Streaming",
        "description": "The world's most popular anime brand. Offers both free ad-supported and premium viewing.",
        "tags": [
            "Official",
            "Paid",
            "Freemium",
            "Subbed",
            "Dubbed"
        ],
        "rating": 4.5,
        "addedAt": "2026-05-01"
    },
    {
        "id": "aniwave",
        "name": "Aniwave (formerly 9anime)",
        "url": "https://aniwave.to",
        "category": "Anime Streaming",
        "description": "One of the most popular unofficial anime streaming sites with a massive library.",
        "tags": [
            "Free",
            "Subbed",
            "Dubbed"
        ],
        "rating": 4.8,
        "addedAt": "2026-05-02"
    },
    {
        "id": "gogoanime",
        "name": "Gogoanime",
        "url": "https://gogoanime3.co",
        "category": "Anime Streaming",
        "description": "A long-standing site for fast releases of subbed and dubbed anime.",
        "tags": [
            "Free",
            "Subbed",
            "Dubbed",
            "Downloads"
        ],
        "rating": 4.2,
        "addedAt": "2026-05-03"
    },
    {
        "id": "hanime",
        "name": "Hanime.tv",
        "url": "https://hanime.tv",
        "category": "Hentai Streaming",
        "description": "Highly rated hentai streaming site with HD video and an active community.",
        "tags": [
            "Free",
            "Uncensored",
            "Adult (18+)",
            "Community"
        ],
        "rating": 4.9,
        "addedAt": "2026-05-01"
    },
    {
        "id": "hentaihaven",
        "name": "HentaiHaven",
        "url": "https://hentaihaven.com",
        "category": "Hentai Streaming",
        "description": "Classic hentai streaming site known for high-quality subs.",
        "tags": [
            "Free",
            "Adult (18+)",
            "Subbed"
        ],
        "rating": 4.6,
        "addedAt": "2026-05-04"
    },
    {
        "id": "mangadex",
        "name": "MangaDex",
        "url": "https://mangadex.org",
        "category": "Manga/Doujin",
        "description": "The largest open-source manga reader with no ads and massive community translation support.",
        "tags": [
            "Free",
            "No Ads",
            "Community"
        ],
        "rating": 5,
        "addedAt": "2026-05-01"
    },
    {
        "id": "nhentai",
        "name": "nHentai",
        "url": "https://nhentai.net",
        "category": "Manga/Doujin",
        "description": "The definitive source for doujinshi and hentai manga reading.",
        "tags": [
            "Free",
            "Adult (18+)",
            "Downloads"
        ],
        "rating": 4.8,
        "addedAt": "2026-05-02"
    },
    {
        "id": "fakku",
        "name": "FAKKU",
        "url": "https://www.fakku.net",
        "category": "Manga/Doujin",
        "description": "Official publisher of English localized hentai manga.",
        "tags": [
            "Official",
            "Paid",
            "Adult (18+)"
        ],
        "rating": 4,
        "addedAt": "2026-05-05"
    },
    {
        "id": "danbooru",
        "name": "Danbooru",
        "url": "https://danbooru.donmai.us",
        "category": "Images/Boorus",
        "description": "Massive anime image board with strict tagging and moderation.",
        "tags": [
            "Free",
            "Images",
            "Adult (18+)",
            "Safe for Work (Optional)"
        ],
        "rating": 4.7,
        "addedAt": "2026-05-01"
    },
    {
        "id": "gelbooru",
        "name": "Gelbooru",
        "url": "https://gelbooru.com",
        "category": "Images/Boorus",
        "description": "Unrestricted image board covering all anime art, including NSFW.",
        "tags": [
            "Free",
            "Images",
            "Adult (18+)"
        ],
        "rating": 4.5,
        "addedAt": "2026-05-06"
    },
    {
        "id": "rule34",
        "name": "Rule34",
        "url": "https://rule34.xxx",
        "category": "Images/Boorus",
        "description": "If it exists, there is porn of it. Massive NSFW image database.",
        "tags": [
            "Free",
            "Images",
            "Adult (18+)"
        ],
        "rating": 4.8,
        "addedAt": "2026-05-02"
    },
    {
        "id": "f95zone",
        "name": "F95Zone",
        "url": "https://f95zone.to",
        "category": "Games",
        "description": "The biggest community for adult games, visual novels, and development.",
        "tags": [
            "Free",
            "Community",
            "Downloads",
            "Adult (18+)"
        ],
        "rating": 4.9,
        "addedAt": "2026-05-01"
    },
    {
        "id": "dlsite",
        "name": "DLsite",
        "url": "https://www.dlsite.com",
        "category": "Games",
        "description": "Japanese digital distribution platform for indie games, doujinshi, and audio.",
        "tags": [
            "Official",
            "Paid",
            "Adult (18+)"
        ],
        "rating": 4.5,
        "addedAt": "2026-05-07"
    },
    {
        "id": "myanimelist",
        "name": "MyAnimeList (MAL)",
        "url": "https://myanimelist.net",
        "category": "Communities",
        "description": "The world's largest anime and manga database and community.",
        "tags": [
            "Free",
            "Database",
            "Community",
            "Safe for Work"
        ],
        "rating": 4.6,
        "addedAt": "2026-05-01"
    },
    {
        "id": "anilist",
        "name": "AniList",
        "url": "https://anilist.co",
        "category": "Communities",
        "description": "Modern anime and manga tracking and discovery platform.",
        "tags": [
            "Free",
            "Database",
            "Community",
            "Safe for Work"
        ],
        "rating": 4.8,
        "addedAt": "2026-05-03"
    },
    {
        "id": "hidive",
        "name": "HIDIVE",
        "url": "https://www.hidive.com",
        "category": "Anime Streaming",
        "description": "Legal anime streaming with simulcasts, dubs, and exclusive SVOD content.",
        "tags": [
            "Official",
            "Paid",
            "Subbed",
            "Dubbed"
        ],
        "rating": 4.3,
        "addedAt": "2026-05-09"
    },
    {
        "id": "funimation",
        "name": "Funimation",
        "url": "https://www.funimation.com",
        "category": "Anime Streaming",
        "description": "Pioneer of English anime dubbing, now merged with Crunchyroll.",
        "tags": [
            "Official",
            "Paid",
            "Dubbed"
        ],
        "rating": 4.1,
        "addedAt": "2026-05-09"
    },
    {
        "id": "hianime",
        "name": "HiAnime",
        "url": "https://hianime.to",
        "category": "Anime Streaming",
        "description": "Fast and clean anime streaming site, previously known as Zoro.to.",
        "tags": [
            "Free",
            "Subbed",
            "Dubbed"
        ],
        "rating": 4.9,
        "addedAt": "2026-05-09"
    },
    {
        "id": "allanime",
        "name": "AllAnime",
        "url": "https://allanime.to",
        "category": "Anime Streaming",
        "description": "Minimal, fast anime streaming site popular for quick episode releases.",
        "tags": [
            "Free",
            "Subbed",
            "Dubbed"
        ],
        "rating": 4.6,
        "addedAt": "2026-05-09"
    },
    {
        "id": "animepahe",
        "name": "AnimePahe",
        "url": "https://animepahe.ru",
        "category": "Anime Streaming",
        "description": "Known for small-size compressed downloads and clean UI.",
        "tags": [
            "Free",
            "Subbed",
            "Downloads"
        ],
        "rating": 4.5,
        "addedAt": "2026-05-09"
    },
    {
        "id": "kickassanime",
        "name": "KickAssAnime",
        "url": "https://kickassanime.mx",
        "category": "Anime Streaming",
        "description": "Mirrors multiple sources and known for fast simulcast releases.",
        "tags": [
            "Free",
            "Subbed",
            "Dubbed"
        ],
        "rating": 4.4,
        "addedAt": "2026-05-09"
    },
    {
        "id": "animixplay",
        "name": "AniMixPlay",
        "url": "https://animixplay.to",
        "category": "Anime Streaming",
        "description": "Simple and fast anime streaming aggregator.",
        "tags": [
            "Free",
            "Subbed"
        ],
        "rating": 4.2,
        "addedAt": "2026-05-09"
    },
    {
        "id": "twistmoe",
        "name": "Twist.moe",
        "url": "https://twist.moe",
        "category": "Anime Streaming",
        "description": "Ad-free anime streaming with direct video links. No frills, just anime.",
        "tags": [
            "Free",
            "No Ads",
            "Subbed"
        ],
        "rating": 4.4,
        "addedAt": "2026-05-09"
    },
    {
        "id": "subsplease",
        "name": "SubsPlease",
        "url": "https://subsplease.org",
        "category": "Anime Streaming",
        "description": "Simulcast release group providing weekly subbed anime downloads.",
        "tags": [
            "Free",
            "Subbed",
            "Downloads"
        ],
        "rating": 4.7,
        "addedAt": "2026-05-09"
    },
    {
        "id": "animedao",
        "name": "AnimeDao",
        "url": "https://animedao.to",
        "category": "Anime Streaming",
        "description": "Reliable alternative streaming site with large episode catalog.",
        "tags": [
            "Free",
            "Subbed",
            "Dubbed"
        ],
        "rating": 4.1,
        "addedAt": "2026-05-09"
    },
    {
        "id": "hentaitv",
        "name": "Hentai.tv",
        "url": "https://hentai.tv",
        "category": "Hentai Streaming",
        "description": "Premium hentai streaming with HD video and active upload community.",
        "tags": [
            "Free",
            "Adult (18+)",
            "Uncensored"
        ],
        "rating": 4.5,
        "addedAt": "2026-05-09"
    },
    {
        "id": "hentaigasm",
        "name": "HentaiGasm",
        "url": "https://hentaigasm.com",
        "category": "Hentai Streaming",
        "description": "Large catalog of censored and uncensored hentai anime.",
        "tags": [
            "Free",
            "Adult (18+)"
        ],
        "rating": 4.2,
        "addedAt": "2026-05-09"
    },
    {
        "id": "hentaimama",
        "name": "HentaiMama",
        "url": "https://hentaimama.io",
        "category": "Hentai Streaming",
        "description": "Clean UI hentai streaming site with episode tracking.",
        "tags": [
            "Free",
            "Adult (18+)",
            "Subbed"
        ],
        "rating": 4.3,
        "addedAt": "2026-05-09"
    },
    {
        "id": "hentaiworld",
        "name": "HentaiWorld",
        "url": "https://hentaiworld.tv",
        "category": "Hentai Streaming",
        "description": "Broad hentai catalog with genre filters and HD streams.",
        "tags": [
            "Free",
            "Adult (18+)",
            "Uncensored"
        ],
        "rating": 4.1,
        "addedAt": "2026-05-09"
    },
    {
        "id": "koharu",
        "name": "Koharu.to",
        "url": "https://koharu.to",
        "category": "Hentai Streaming",
        "description": "Modern hentai streaming site with fast load times.",
        "tags": [
            "Free",
            "Adult (18+)"
        ],
        "rating": 4.4,
        "addedAt": "2026-05-09"
    },
    {
        "id": "hentaifreak",
        "name": "HentaiFREAK",
        "url": "https://hentaifreak.org",
        "category": "Hentai Streaming",
        "description": "Extensive library of hentai episodes sorted by genre and series.",
        "tags": [
            "Free",
            "Adult (18+)",
            "Subbed"
        ],
        "rating": 4,
        "addedAt": "2026-05-09"
    },
    {
        "id": "mangakakalot",
        "name": "MangaKakalot",
        "url": "https://mangakakalot.com",
        "category": "Manga/Doujin",
        "description": "Large manga reading site with fast image loading.",
        "tags": [
            "Free",
            "Subbed"
        ],
        "rating": 4.4,
        "addedAt": "2026-05-09"
    },
    {
        "id": "manganato",
        "name": "MangaNato",
        "url": "https://manganato.com",
        "category": "Manga/Doujin",
        "description": "Mirror of MangaKakalot with daily update tracking.",
        "tags": [
            "Free"
        ],
        "rating": 4.3,
        "addedAt": "2026-05-09"
    },
    {
        "id": "mangaplus",
        "name": "MANGA Plus",
        "url": "https://mangaplus.shueisha.co.jp",
        "category": "Manga/Doujin",
        "description": "Official Shueisha platform â read One Piece, Naruto, and more free.",
        "tags": [
            "Official",
            "Free",
            "Safe for Work"
        ],
        "rating": 4.8,
        "addedAt": "2026-05-09"
    },
    {
        "id": "webtoons",
        "name": "Webtoons",
        "url": "https://www.webtoons.com",
        "category": "Manga/Doujin",
        "description": "Official platform for Korean webtoons with millions of free episodes.",
        "tags": [
            "Official",
            "Free",
            "Safe for Work"
        ],
        "rating": 4.7,
        "addedAt": "2026-05-09"
    },
    {
        "id": "batoto",
        "name": "Bato.to",
        "url": "https://bato.to",
        "category": "Manga/Doujin",
        "description": "Community manga reader with wide multilingual support.",
        "tags": [
            "Free",
            "Community"
        ],
        "rating": 4.5,
        "addedAt": "2026-05-09"
    },
    {
        "id": "comick",
        "name": "Comick.io",
        "url": "https://comick.io",
        "category": "Manga/Doujin",
        "description": "Fast manga reader with chapter tracking and clean interface.",
        "tags": [
            "Free"
        ],
        "rating": 4.6,
        "addedAt": "2026-05-09"
    },
    {
        "id": "hentai2read",
        "name": "Hentai2Read",
        "url": "https://hentai2read.com",
        "category": "Manga/Doujin",
        "description": "Hentai manga and doujin reading site with large tag system.",
        "tags": [
            "Free",
            "Adult (18+)",
            "Downloads"
        ],
        "rating": 4.3,
        "addedAt": "2026-05-09"
    },
    {
        "id": "mangasee",
        "name": "MangaSee",
        "url": "https://mangasee123.com",
        "category": "Manga/Doujin",
        "description": "Hosts official scan translations with a clean reading experience.",
        "tags": [
            "Free"
        ],
        "rating": 4.4,
        "addedAt": "2026-05-09"
    },
    {
        "id": "rawkuma",
        "name": "RawKuma",
        "url": "https://rawkuma.com",
        "category": "Manga/Doujin",
        "description": "Japanese raw manga reader for those studying Japanese.",
        "tags": [
            "Free",
            "Raw/Japanese"
        ],
        "rating": 4.1,
        "addedAt": "2026-05-09"
    },
    {
        "id": "safebooru",
        "name": "Safebooru",
        "url": "https://safebooru.org",
        "category": "Images/Boorus",
        "description": "SFW-only subset of Gelbooru. Great for clean anime art.",
        "tags": [
            "Free",
            "Images",
            "Safe for Work"
        ],
        "rating": 4.5,
        "addedAt": "2026-05-09"
    },
    {
        "id": "zerochan",
        "name": "Zerochan",
        "url": "https://www.zerochan.net",
        "category": "Images/Boorus",
        "description": "Curated anime image board focused on quality over quantity.",
        "tags": [
            "Free",
            "Images",
            "Safe for Work"
        ],
        "rating": 4.6,
        "addedAt": "2026-05-09"
    },
    {
        "id": "yandere",
        "name": "Yande.re",
        "url": "https://yande.re",
        "category": "Images/Boorus",
        "description": "High-resolution anime scans and artwork, NSFW allowed.",
        "tags": [
            "Free",
            "Images",
            "Adult (18+)"
        ],
        "rating": 4.5,
        "addedAt": "2026-05-09"
    },
    {
        "id": "konachan",
        "name": "Konachan",
        "url": "https://konachan.com",
        "category": "Images/Boorus",
        "description": "Wallpaper-focused anime image board with strict quality standards.",
        "tags": [
            "Free",
            "Images",
            "Wallpapers"
        ],
        "rating": 4.6,
        "addedAt": "2026-05-09"
    },
    {
        "id": "pixiv",
        "name": "Pixiv",
        "url": "https://www.pixiv.net",
        "category": "Images/Boorus",
        "description": "Japan's largest art community platform for anime and doujin artists.",
        "tags": [
            "Free",
            "Community",
            "Images",
            "Adult (18+)"
        ],
        "rating": 4.9,
        "addedAt": "2026-05-09"
    },
    {
        "id": "ehentai",
        "name": "E-Hentai",
        "url": "https://e-hentai.org",
        "category": "Images/Boorus",
        "description": "Massive doujin and hentai manga gallery archive.",
        "tags": [
            "Free",
            "Adult (18+)",
            "Downloads"
        ],
        "rating": 4.8,
        "addedAt": "2026-05-09"
    },
    {
        "id": "sankaku",
        "name": "Sankaku Complex",
        "url": "https://chan.sankakucomplex.com",
        "category": "Images/Boorus",
        "description": "Large anime and game image board with extensive tagging.",
        "tags": [
            "Free",
            "Images",
            "Adult (18+)"
        ],
        "rating": 4.4,
        "addedAt": "2026-05-09"
    },
    {
        "id": "wallhaven",
        "name": "Wallhaven",
        "url": "https://wallhaven.cc",
        "category": "Images/Boorus",
        "description": "High-quality wallpaper site with excellent anime section.",
        "tags": [
            "Free",
            "Wallpapers",
            "Images"
        ],
        "rating": 4.8,
        "addedAt": "2026-05-09"
    },
    {
        "id": "nutaku",
        "name": "Nutaku",
        "url": "https://www.nutaku.net",
        "category": "Games",
        "description": "Western platform for anime-style adult games, browser and download.",
        "tags": [
            "Free",
            "Paid",
            "Adult (18+)"
        ],
        "rating": 4.2,
        "addedAt": "2026-05-09"
    },
    {
        "id": "lewdzone",
        "name": "LewdZone",
        "url": "https://lewdzone.com",
        "category": "Games",
        "description": "Aggregator for free adult game downloads with version tracking.",
        "tags": [
            "Free",
            "Downloads",
            "Adult (18+)"
        ],
        "rating": 4.5,
        "addedAt": "2026-05-09"
    },
    {
        "id": "itchio",
        "name": "Itch.io (Adult)",
        "url": "https://itch.io/games/tag-adult",
        "category": "Games",
        "description": "Indie game platform with a large adult/NSFW game section.",
        "tags": [
            "Free",
            "Paid",
            "Adult (18+)",
            "Indie"
        ],
        "rating": 4.6,
        "addedAt": "2026-05-09"
    },
    {
        "id": "mangagamer",
        "name": "MangaGamer",
        "url": "https://www.mangagamer.com",
        "category": "Games",
        "description": "Official English publisher of visual novels and eroge.",
        "tags": [
            "Official",
            "Paid",
            "Adult (18+)"
        ],
        "rating": 4.3,
        "addedAt": "2026-05-09"
    },
    {
        "id": "jastusa",
        "name": "JAST USA",
        "url": "https://jastusa.com",
        "category": "Games",
        "description": "Veteran localizer of Japanese adult visual novels and games.",
        "tags": [
            "Official",
            "Paid",
            "Adult (18+)"
        ],
        "rating": 4.1,
        "addedAt": "2026-05-09"
    },
    {
        "id": "animenewsnetwork",
        "name": "Anime News Network",
        "url": "https://www.animenewsnetwork.com",
        "category": "Communities",
        "description": "The definitive English-language anime and manga news source.",
        "tags": [
            "Free",
            "News",
            "Database",
            "Safe for Work"
        ],
        "rating": 4.7,
        "addedAt": "2026-05-09"
    },
    {
        "id": "animeplanet",
        "name": "Anime-Planet",
        "url": "https://www.anime-planet.com",
        "category": "Communities",
        "description": "Anime and manga discovery and tracking with recommendation engine.",
        "tags": [
            "Free",
            "Database",
            "Community",
            "Safe for Work"
        ],
        "rating": 4.6,
        "addedAt": "2026-05-09"
    },
    {
        "id": "kitsu",
        "name": "Kitsu",
        "url": "https://kitsu.io",
        "category": "Communities",
        "description": "Social anime and manga tracker with a modern feed-based UI.",
        "tags": [
            "Free",
            "Community",
            "Safe for Work"
        ],
        "rating": 4.4,
        "addedAt": "2026-05-09"
    },
    {
        "id": "livechart",
        "name": "LiveChart.me",
        "url": "https://www.livechart.me",
        "category": "Communities",
        "description": "Real-time seasonal anime chart with airing countdowns.",
        "tags": [
            "Free",
            "Database",
            "Safe for Work"
        ],
        "rating": 4.7,
        "addedAt": "2026-05-09"
    },
    {
        "id": "anichart",
        "name": "AniChart",
        "url": "https://anichart.net",
        "category": "Communities",
        "description": "Visual seasonal anime chart built on AniList data.",
        "tags": [
            "Free",
            "Database",
            "Safe for Work"
        ],
        "rating": 4.5,
        "addedAt": "2026-05-09"
    },
    {
        "id": "anidb",
        "name": "AniDB",
        "url": "https://anidb.net",
        "category": "Communities",
        "description": "Detailed anime database with episode-level metadata and release groups.",
        "tags": [
            "Free",
            "Database"
        ],
        "rating": 4.3,
        "addedAt": "2026-05-09"
    },
    {
        "id": "reddit_anime",
        "name": "r/anime",
        "url": "https://www.reddit.com/r/anime",
        "category": "Communities",
        "description": "The largest English-language anime community on Reddit.",
        "tags": [
            "Free",
            "Community",
            "Safe for Work"
        ],
        "rating": 4.6,
        "addedAt": "2026-05-09"
    },
    {
        "id": "nyaasi",
        "name": "Nyaa.si",
        "url": "https://nyaa.si",
        "category": "Downloads",
        "description": "The #1 anime torrent tracker for fansubs and raw releases.",
        "tags": [
            "Free",
            "Torrents",
            "Downloads"
        ],
        "rating": 4.9,
        "addedAt": "2026-05-09"
    },
    {
        "id": "animetosho",
        "name": "AnimeTosho",
        "url": "https://animetosho.org",
        "category": "Downloads",
        "description": "Mirrors Nyaa torrents as direct NZB and magnet links.",
        "tags": [
            "Free",
            "Downloads",
            "Torrents"
        ],
        "rating": 4.7,
        "addedAt": "2026-05-09"
    },
    {
        "id": "erairaw",
        "name": "Erai-raws",
        "url": "https://www.erai-raws.info",
        "category": "Downloads",
        "description": "Popular fansub group offering soft-subbed seasonal anime releases.",
        "tags": [
            "Free",
            "Downloads",
            "Subbed"
        ],
        "rating": 4.6,
        "addedAt": "2026-05-09"
    },
    {
        "id": "tenshi",
        "name": "Tenshi.moe",
        "url": "https://tenshi.moe",
        "category": "Anime Streaming",
        "description": "Minimalist, ad-free anime streaming with a curated catalog.",
        "tags": [
            "Free",
            "No Ads",
            "Subbed"
        ],
        "rating": 4.5,
        "addedAt": "2026-05-09"
    },
    {
        "id": "animeultima",
        "name": "AnimeUltima",
        "url": "https://animeultima.to",
        "category": "Anime Streaming",
        "description": "Clean anime streaming site with both sub and dub options.",
        "tags": [
            "Free",
            "Subbed",
            "Dubbed"
        ],
        "rating": 4.2,
        "addedAt": "2026-05-09"
    },
    {
        "id": "animekisa",
        "name": "AnimeKisa",
        "url": "https://animekisa.tv",
        "category": "Anime Streaming",
        "description": "No-ads anime streaming site with a large library.",
        "tags": [
            "Free",
            "No Ads",
            "Subbed",
            "Dubbed"
        ],
        "rating": 4.3,
        "addedAt": "2026-05-09"
    },
    {
        "id": "animefreak",
        "name": "AnimeFreak",
        "url": "https://animefreak.tv",
        "category": "Anime Streaming",
        "description": "Veteran anime streaming site with a very large back catalog.",
        "tags": [
            "Free",
            "Subbed",
            "Dubbed"
        ],
        "rating": 4,
        "addedAt": "2026-05-09"
    },
    {
        "id": "animeflv",
        "name": "AnimeFLV",
        "url": "https://www3.animeflv.net",
        "category": "Anime Streaming",
        "description": "The most popular anime streaming site for Spanish-speaking audiences.",
        "tags": [
            "Free",
            "Spanish",
            "Subbed",
            "Dubbed"
        ],
        "rating": 4.7,
        "addedAt": "2026-05-09"
    },
    {
        "id": "jkanime",
        "name": "JKAnime",
        "url": "https://jkanime.net",
        "category": "Anime Streaming",
        "description": "Fast Spanish-language anime site with same-day simulcast releases.",
        "tags": [
            "Free",
            "Spanish",
            "Subbed"
        ],
        "rating": 4.4,
        "addedAt": "2026-05-09"
    },
    {
        "id": "animeland",
        "name": "AnimeLand",
        "url": "https://animeland.us",
        "category": "Anime Streaming",
        "description": "French-language anime streaming platform with a solid library.",
        "tags": [
            "Free",
            "French",
            "Dubbed"
        ],
        "rating": 4.1,
        "addedAt": "2026-05-09"
    },
    {
        "id": "anime1s",
        "name": "Anime1.st",
        "url": "https://anime1.st",
        "category": "Anime Streaming",
        "description": "Regional anime streaming with an emphasis on HD quality streams.",
        "tags": [
            "Free",
            "Subbed"
        ],
        "rating": 4.2,
        "addedAt": "2026-05-09"
    },
    {
        "id": "animeonsen",
        "name": "Anime Onsen",
        "url": "https://animeonsen.xyz",
        "category": "Anime Streaming",
        "description": "Volunteer-run anime streaming platform, no ads.",
        "tags": [
            "Free",
            "No Ads",
            "Subbed"
        ],
        "rating": 4.3,
        "addedAt": "2026-05-09"
    },
    {
        "id": "9animetv",
        "name": "9AnimeTV",
        "url": "https://9animetv.to",
        "category": "Anime Streaming",
        "description": "Rebranded successor to the original 9anime with updated UI.",
        "tags": [
            "Free",
            "Subbed",
            "Dubbed"
        ],
        "rating": 4.3,
        "addedAt": "2026-05-09"
    },
    {
        "id": "xanimehub",
        "name": "xAnimeHub",
        "url": "https://xanimehub.com",
        "category": "Hentai Streaming",
        "description": "Aggregates hentai streams from multiple sources in one place.",
        "tags": [
            "Free",
            "Adult (18+)"
        ],
        "rating": 4.1,
        "addedAt": "2026-05-09"
    },
    {
        "id": "hentaihere",
        "name": "HentaiHere",
        "url": "https://hentaihere.com",
        "category": "Hentai Streaming",
        "description": "Hentai manga reader and streaming hybrid with tagging system.",
        "tags": [
            "Free",
            "Adult (18+)",
            "Subbed"
        ],
        "rating": 4,
        "addedAt": "2026-05-09"
    },
    {
        "id": "bestahentai",
        "name": "BestAHentai",
        "url": "https://bestahentai.com",
        "category": "Hentai Streaming",
        "description": "Curated hentai streaming with both new and classic titles.",
        "tags": [
            "Free",
            "Adult (18+)"
        ],
        "rating": 4.1,
        "addedAt": "2026-05-09"
    },
    {
        "id": "hentai01",
        "name": "Hentai01",
        "url": "https://hentai01.com",
        "category": "Hentai Streaming",
        "description": "Simple hentai streaming site with fast video servers.",
        "tags": [
            "Free",
            "Adult (18+)"
        ],
        "rating": 4,
        "addedAt": "2026-05-09"
    },
    {
        "id": "mangafire",
        "name": "MangaFire",
        "url": "https://mangafire.to",
        "category": "Manga/Doujin",
        "description": "Modern manga reader with fast CDN and chapter notifications.",
        "tags": [
            "Free"
        ],
        "rating": 4.6,
        "addedAt": "2026-05-09"
    },
    {
        "id": "mangaowl",
        "name": "MangaOwl",
        "url": "https://mangaowl.to",
        "category": "Manga/Doujin",
        "description": "Manga reader with user-submitted chapters and a large library.",
        "tags": [
            "Free",
            "Community"
        ],
        "rating": 4.3,
        "addedAt": "2026-05-09"
    },
    {
        "id": "toonily",
        "name": "Toonily",
        "url": "https://toonily.com",
        "category": "Manga/Doujin",
        "description": "Focuses on Korean manhwa including adult webtoons.",
        "tags": [
            "Free",
            "Adult (18+)",
            "Manhwa"
        ],
        "rating": 4.4,
        "addedAt": "2026-05-09"
    },
    {
        "id": "mangapanda",
        "name": "MangaPanda",
        "url": "https://mangapanda.onl",
        "category": "Manga/Doujin",
        "description": "Classic-style manga reader with extensive archive.",
        "tags": [
            "Free"
        ],
        "rating": 4,
        "addedAt": "2026-05-09"
    },
    {
        "id": "myreadingmanga",
        "name": "MyReadingManga",
        "url": "https://myreadingmanga.info",
        "category": "Manga/Doujin",
        "description": "Large yaoi and bara doujin reading archive.",
        "tags": [
            "Free",
            "Adult (18+)",
            "Yaoi"
        ],
        "rating": 4.2,
        "addedAt": "2026-05-09"
    },
    {
        "id": "mangahub",
        "name": "MangaHub",
        "url": "https://mangahub.io",
        "category": "Manga/Doujin",
        "description": "Clean, ad-light manga reader with regular chapter updates.",
        "tags": [
            "Free"
        ],
        "rating": 4.3,
        "addedAt": "2026-05-09"
    },
    {
        "id": "animepictures",
        "name": "Anime Pictures",
        "url": "https://anime-pictures.net",
        "category": "Images/Boorus",
        "description": "High-resolution anime wallpaper board with strict quality curation.",
        "tags": [
            "Free",
            "Images",
            "Wallpapers",
            "Safe for Work"
        ],
        "rating": 4.6,
        "addedAt": "2026-05-09"
    },
    {
        "id": "tbib",
        "name": "The Big ImageBoard",
        "url": "https://tbib.org",
        "category": "Images/Boorus",
        "description": "Large uncurated booru covering anime, games, and original art.",
        "tags": [
            "Free",
            "Images",
            "Adult (18+)"
        ],
        "rating": 4.2,
        "addedAt": "2026-05-09"
    },
    {
        "id": "paheal",
        "name": "Rule34.Paheal",
        "url": "https://rule34.paheal.net",
        "category": "Images/Boorus",
        "description": "One of the oldest Rule 34 image boards on the internet.",
        "tags": [
            "Free",
            "Images",
            "Adult (18+)"
        ],
        "rating": 4.1,
        "addedAt": "2026-05-09"
    },
    {
        "id": "alphacoders",
        "name": "Alphacoders Anime",
        "url": "https://wall.alphacoders.com/by_category.php?id=3",
        "category": "Images/Boorus",
        "description": "Large wallpaper collection with a dedicated anime category.",
        "tags": [
            "Free",
            "Images",
            "Wallpapers",
            "Safe for Work"
        ],
        "rating": 4.4,
        "addedAt": "2026-05-09"
    },
    {
        "id": "behoimi",
        "name": "Beh.oimi",
        "url": "https://behoimi.org",
        "category": "Images/Boorus",
        "description": "Niche booru focused on cosplay photography.",
        "tags": [
            "Free",
            "Images",
            "Cosplay"
        ],
        "rating": 4,
        "addedAt": "2026-05-09"
    },
    {
        "id": "rule34hentai",
        "name": "Rule34Hentai",
        "url": "https://rule34hentai.net",
        "category": "Images/Boorus",
        "description": "Booru dedicated specifically to hentai rule 34 artwork.",
        "tags": [
            "Free",
            "Images",
            "Adult (18+)"
        ],
        "rating": 4.2,
        "addedAt": "2026-05-09"
    },
    {
        "id": "lolibooru",
        "name": "ATFBooru",
        "url": "https://booru.allthefallen.moe",
        "category": "Images/Boorus",
        "description": "Community image board for anime artwork and fan art.",
        "tags": [
            "Free",
            "Images",
            "Community"
        ],
        "rating": 4,
        "addedAt": "2026-05-09"
    },
    {
        "id": "vndb",
        "name": "VNDB",
        "url": "https://vndb.org",
        "category": "Games",
        "description": "The Visual Novel Database â comprehensive catalog and reviews.",
        "tags": [
            "Free",
            "Database",
            "Safe for Work"
        ],
        "rating": 4.9,
        "addedAt": "2026-05-09"
    },
    {
        "id": "kagura",
        "name": "Kagura Games",
        "url": "https://www.kagura-games.com",
        "category": "Games",
        "description": "Publisher of translated Japanese indie adult games.",
        "tags": [
            "Paid",
            "Adult (18+)",
            "Official"
        ],
        "rating": 4.2,
        "addedAt": "2026-05-09"
    },
    {
        "id": "jlist",
        "name": "J-List",
        "url": "https://www.jlist.com",
        "category": "Games",
        "description": "Japanese import store selling games, figures, and adult content.",
        "tags": [
            "Paid",
            "Official",
            "Adult (18+)"
        ],
        "rating": 4.3,
        "addedAt": "2026-05-09"
    },
    {
        "id": "erogames",
        "name": "EroGames",
        "url": "https://erogames.com",
        "category": "Games",
        "description": "Storefront for adult anime games with free-to-play and paid titles.",
        "tags": [
            "Free",
            "Paid",
            "Adult (18+)"
        ],
        "rating": 4,
        "addedAt": "2026-05-09"
    },
    {
        "id": "gyutto",
        "name": "Gyutto",
        "url": "https://gyutto.com",
        "category": "Games",
        "description": "Japanese digital store for doujin games, CGs, and audio works.",
        "tags": [
            "Paid",
            "Adult (18+)",
            "Japanese"
        ],
        "rating": 4.1,
        "addedAt": "2026-05-09"
    },
    {
        "id": "4chan_a",
        "name": "4chan /a/",
        "url": "https://boards.4chan.org/a/",
        "category": "Communities",
        "description": "The original anime imageboard. Unfiltered discussion and meme origin.",
        "tags": [
            "Free",
            "Community"
        ],
        "rating": 4,
        "addedAt": "2026-05-09"
    },
    {
        "id": "anisearch",
        "name": "AniSearch",
        "url": "https://www.anisearch.com",
        "category": "Communities",
        "description": "European anime database and community hub.",
        "tags": [
            "Free",
            "Database",
            "Community",
            "Safe for Work"
        ],
        "rating": 4.3,
        "addedAt": "2026-05-09"
    },
    {
        "id": "shindanmaker",
        "name": "Shindan Maker",
        "url": "https://en.shindanmaker.com",
        "category": "Communities",
        "description": "Fun anime personality quiz and character generator tool.",
        "tags": [
            "Free",
            "Community",
            "Safe for Work"
        ],
        "rating": 4.4,
        "addedAt": "2026-05-09"
    },
    {
        "id": "animechardb",
        "name": "Anime Characters DB",
        "url": "https://www.animecharactersdatabase.com",
        "category": "Communities",
        "description": "Database of anime characters with images and quiz features.",
        "tags": [
            "Free",
            "Database",
            "Safe for Work"
        ],
        "rating": 4.2,
        "addedAt": "2026-05-09"
    },
    {
        "id": "nautiljon",
        "name": "Nautiljon",
        "url": "https://www.nautiljon.com",
        "category": "Communities",
        "description": "French anime and manga database and community platform.",
        "tags": [
            "Free",
            "Database",
            "French",
            "Safe for Work"
        ],
        "rating": 4.2,
        "addedAt": "2026-05-09"
    },
    {
        "id": "animesharing",
        "name": "Anime-Sharing",
        "url": "https://www.anime-sharing.com",
        "category": "Communities",
        "description": "Forum for sharing anime, visual novels, and doujin music.",
        "tags": [
            "Free",
            "Community",
            "Downloads"
        ],
        "rating": 4.1,
        "addedAt": "2026-05-09"
    },
    {
        "id": "crunchyforum",
        "name": "Crunchyroll Forums",
        "url": "https://www.crunchyroll.com/forums",
        "category": "Communities",
        "description": "Official Crunchyroll community forums for episode discussions.",
        "tags": [
            "Free",
            "Community",
            "Official",
            "Safe for Work"
        ],
        "rating": 4.1,
        "addedAt": "2026-05-09"
    },
    {
        "id": "reddit_hentai",
        "name": "r/hentai",
        "url": "https://www.reddit.com/r/hentai",
        "category": "Communities",
        "description": "The largest hentai community on Reddit for art and discussion.",
        "tags": [
            "Free",
            "Community",
            "Adult (18+)"
        ],
        "rating": 4.3,
        "addedAt": "2026-05-09"
    },
    {
        "id": "animebytes",
        "name": "AnimeBytes",
        "url": "https://animebytes.tv",
        "category": "Downloads",
        "description": "Private anime torrent tracker with high quality encodes.",
        "tags": [
            "Invite Only",
            "Torrents",
            "Downloads"
        ],
        "rating": 4.8,
        "addedAt": "2026-05-09"
    },
    {
        "id": "bakabt",
        "name": "BakaBT",
        "url": "https://bakabt.me",
        "category": "Downloads",
        "description": "Semi-private tracker focused on complete anime series.",
        "tags": [
            "Free",
            "Torrents",
            "Downloads"
        ],
        "rating": 4.5,
        "addedAt": "2026-05-09"
    },
    {
        "id": "tokyotosho",
        "name": "Tokyo Toshokan",
        "url": "https://tokyotosho.info",
        "category": "Downloads",
        "description": "Torrent index for Japanese media including fansubs and raws.",
        "tags": [
            "Free",
            "Torrents",
            "Downloads"
        ],
        "rating": 4.3,
        "addedAt": "2026-05-09"
    },
    {
        "id": "anirena",
        "name": "AniRena",
        "url": "https://www.anirena.com",
        "category": "Downloads",
        "description": "Anime torrent search engine and index.",
        "tags": [
            "Free",
            "Torrents",
            "Downloads"
        ],
        "rating": 4.2,
        "addedAt": "2026-05-09"
    },
    {
        "id": "animuzip",
        "name": "Animu.rip",
        "url": "https://animu.rip",
        "category": "Downloads",
        "description": "Direct download site for anime episodes and batches.",
        "tags": [
            "Free",
            "Downloads"
        ],
        "rating": 4.1,
        "addedAt": "2026-05-09"
    },
    {
        "id": "fuwanovel",
        "name": "Fuwanovel",
        "url": "https://fuwanovel.net",
        "category": "Visual Novels",
        "description": "Community hub for visual novel fans with guides and translations.",
        "tags": [
            "Free",
            "Community",
            "Safe for Work"
        ],
        "rating": 4.5,
        "addedAt": "2026-05-09"
    },
    {
        "id": "erogedownload",
        "name": "Eroge Download",
        "url": "https://erogedownload.com",
        "category": "Visual Novels",
        "description": "Free download site for English-patched eroge and visual novels.",
        "tags": [
            "Free",
            "Downloads",
            "Adult (18+)"
        ],
        "rating": 4.3,
        "addedAt": "2026-05-09"
    },
    {
        "id": "novelgame",
        "name": "NovelGame.jp",
        "url": "https://novelgame.jp",
        "category": "Visual Novels",
        "description": "Japanese VN discovery and ranking portal.",
        "tags": [
            "Free",
            "Japanese",
            "Database"
        ],
        "rating": 4.2,
        "addedAt": "2026-05-09"
    },
    {
        "id": "vntls",
        "name": "VN Translation Status",
        "url": "https://vntls.org",
        "category": "Visual Novels",
        "description": "Tracks the translation progress of fan-translated visual novels.",
        "tags": [
            "Free",
            "Community",
            "Safe for Work"
        ],
        "rating": 4.4,
        "addedAt": "2026-05-09"
    },
    {
        "id": "typemoon",
        "name": "Type-Moon",
        "url": "https://typemoon.com",
        "category": "Visual Novels",
        "description": "Official site of the creators of Fate, Tsukihime, and more.",
        "tags": [
            "Official",
            "Japanese",
            "Safe for Work"
        ],
        "rating": 4.7,
        "addedAt": "2026-05-09"
    },
    {
        "id": "keyvisual",
        "name": "Key Visual Arts",
        "url": "https://key.visualarts.gr.jp",
        "category": "Visual Novels",
        "description": "Official site of Key, makers of Clannad, Kanon, and Angel Beats VNs.",
        "tags": [
            "Official",
            "Japanese",
            "Safe for Work"
        ],
        "rating": 4.6,
        "addedAt": "2026-05-09"
    },
    {
        "id": "steamvn",
        "name": "Steam Visual Novels",
        "url": "https://store.steampowered.com/tags/en/Visual+Novel/",
        "category": "Visual Novels",
        "description": "Steam's visual novel catalog with thousands of titles.",
        "tags": [
            "Free",
            "Paid",
            "Official",
            "Safe for Work"
        ],
        "rating": 4.5,
        "addedAt": "2026-05-09"
    },
    {
        "id": "fuskator_moysq0a3",
        "name": "fuskator",
        "url": "http://fuskator.com",
        "category": "Downloads",
        "description": "none none none none none none",
        "tags": [
            "Community Submitted"
        ],
        "rating": 4,
        "addedAt": "2026-05-09"
    },
    {
        "id": "tubianime",
        "name": "Tubi Anime",
        "url": "https://tubitv.com/category/anime",
        "category": "Anime Streaming",
        "description": "Free ad-supported official anime streaming platform.",
        "tags": [
            "Free",
            "Official",
            "Ads"
        ],
        "rating": 4,
        "addedAt": "2026-05-09"
    },
    {
        "id": "retrocrush",
        "name": "RetroCrush",
        "url": "https://www.retrocrush.tv",
        "category": "Anime Streaming",
        "description": "Dedicated exclusively to classic and retro anime titles.",
        "tags": [
            "Free",
            "Official",
            "Retro"
        ],
        "rating": 4.4,
        "addedAt": "2026-05-09"
    },
    {
        "id": "yugenanime",
        "name": "YugenAnime",
        "url": "https://yugenanime.tv",
        "category": "Anime Streaming",
        "description": "Modern platform to discover, track, and watch anime.",
        "tags": [
            "Free",
            "Subbed",
            "Dubbed"
        ],
        "rating": 4.5,
        "addedAt": "2026-05-09"
    },
    {
        "id": "animesuge",
        "name": "AnimeSuge",
        "url": "https://animesuge.to",
        "category": "Anime Streaming",
        "description": "A great free streaming alternative with auto-tracking features.",
        "tags": [
            "Free",
            "Subbed",
            "Dubbed"
        ],
        "rating": 4.4,
        "addedAt": "2026-05-09"
    },
    {
        "id": "kaido",
        "name": "Kaido",
        "url": "https://kaido.to",
        "category": "Anime Streaming",
        "description": "Sleek anime streaming interface with zero intrusive ads.",
        "tags": [
            "Free",
            "Subbed",
            "Dubbed"
        ],
        "rating": 4.7,
        "addedAt": "2026-05-09"
    },
    {
        "id": "muchodoujin",
        "name": "MuchoDoujin",
        "url": "https://muchodoujin.com",
        "category": "Hentai Streaming",
        "description": "Streaming high-quality adult anime content directly to your browser.",
        "tags": [
            "Free",
            "Subbed"
        ],
        "rating": 4.2,
        "addedAt": "2026-05-09"
    },
    {
        "id": "hentaifox",
        "name": "HentaiFox",
        "url": "https://hentaifox.com",
        "category": "Hentai Streaming",
        "description": "Clean UI for finding and watching the latest adult anime releases.",
        "tags": [
            "Free",
            "Subbed"
        ],
        "rating": 4.5,
        "addedAt": "2026-05-09"
    },
    {
        "id": "animeidhentai",
        "name": "AnimeIDHentai",
        "url": "https://animeidhentai.com",
        "category": "Hentai Streaming",
        "description": "Huge database of free streaming hentai content.",
        "tags": [
            "Free",
            "Subbed",
            "Database"
        ],
        "rating": 4.1,
        "addedAt": "2026-05-09"
    },
    {
        "id": "hitomila",
        "name": "Hitomi.la",
        "url": "https://hitomi.la",
        "category": "Manga/Doujin",
        "description": "Fast, ad-free doujinshi and manga reader mirroring e-hentai.",
        "tags": [
            "Free",
            "Ad-Free",
            "Fast"
        ],
        "rating": 4.7,
        "addedAt": "2026-05-09"
    },
    {
        "id": "tsumino",
        "name": "Tsumino",
        "url": "https://www.tsumino.com",
        "category": "Manga/Doujin",
        "description": "High quality English-only doujinshi reading platform.",
        "tags": [
            "Free",
            "English",
            "High Quality"
        ],
        "rating": 4.6,
        "addedAt": "2026-05-09"
    },
    {
        "id": "asurascans",
        "name": "Asura Scans",
        "url": "https://asuratoon.com",
        "category": "Manga/Doujin",
        "description": "Top translation group for action manhwa and manga.",
        "tags": [
            "Free",
            "Manhwa",
            "Translations"
        ],
        "rating": 4.7,
        "addedAt": "2026-05-09"
    },
    {
        "id": "pururin",
        "name": "Pururin",
        "url": "https://pururin.to",
        "category": "Manga/Doujin",
        "description": "A long-running, clean doujinshi reading site.",
        "tags": [
            "Free",
            "Clean UI"
        ],
        "rating": 4.4,
        "addedAt": "2026-05-09"
    },
    {
        "id": "8muses",
        "name": "8muses",
        "url": "https://8muses.com",
        "category": "Manga/Doujin",
        "description": "Specializing in Western 3D adult comics alongside doujinshi.",
        "tags": [
            "Free",
            "Comics",
            "3D"
        ],
        "rating": 4.3,
        "addedAt": "2026-05-09"
    },
    {
        "id": "luscious",
        "name": "Luscious",
        "url": "https://luscious.net",
        "category": "Manga/Doujin",
        "description": "A massive adult image and doujinshi hosting platform.",
        "tags": [
            "Free",
            "Albums",
            "Images"
        ],
        "rating": 4.2,
        "addedAt": "2026-05-09"
    },
    {
        "id": "sankakucomplex",
        "name": "Sankaku Complex",
        "url": "https://chan.sankakucomplex.com",
        "category": "Images/Boorus",
        "description": "Adult-focused image board with millions of posts.",
        "tags": [
            "Free",
            "Imageboard",
            "Adult (18+)"
        ],
        "rating": 4.5,
        "addedAt": "2026-05-09"
    },
    {
        "id": "e621",
        "name": "E621",
        "url": "https://e621.net",
        "category": "Images/Boorus",
        "description": "The internet's largest furry and anthropomorphic booru.",
        "tags": [
            "Free",
            "Furry",
            "Adult (18+)"
        ],
        "rating": 4.8,
        "addedAt": "2026-05-09"
    },
    {
        "id": "kaguragames",
        "name": "Kagura Games",
        "url": "https://kaguragames.com",
        "category": "Games",
        "description": "Publisher focusing on adult RPG Maker titles.",
        "tags": [
            "Paid",
            "Official",
            "RPG"
        ],
        "rating": 4.5,
        "addedAt": "2026-05-09"
    },
    {
        "id": "shiravune",
        "name": "Shiravune",
        "url": "https://shiravune.com",
        "category": "Games",
        "description": "Rapidly growing localizer of Japanese adult games.",
        "tags": [
            "Paid",
            "Official",
            "Localizer"
        ],
        "rating": 4.5,
        "addedAt": "2026-05-09"
    },
    {
        "id": "patreon",
        "name": "Patreon",
        "url": "https://www.patreon.com",
        "category": "Games",
        "description": "The main funding hub for thousands of indie adult game devs.",
        "tags": [
            "Paid",
            "Indie",
            "Crowdfunding"
        ],
        "rating": 4.8,
        "addedAt": "2026-05-09"
    },
    {
        "id": "ranime",
        "name": "r/Anime",
        "url": "https://www.reddit.com/r/anime",
        "category": "Communities",
        "description": "The largest anime discussion board on Reddit.",
        "tags": [
            "Community",
            "Discussion",
            "News"
        ],
        "rating": 4.8,
        "addedAt": "2026-05-09"
    },
    {
        "id": "rhentai",
        "name": "r/Hentai",
        "url": "https://www.reddit.com/r/hentai",
        "category": "Communities",
        "description": "Reddit's primary hub for adult anime art and source finding.",
        "tags": [
            "Community",
            "Adult (18+)",
            "Images"
        ],
        "rating": 4.7,
        "addedAt": "2026-05-09"
    },
    {
        "id": "4chana",
        "name": "4chan /a/",
        "url": "https://boards.4channel.org/a/",
        "category": "Communities",
        "description": "The infamous anonymous anime and manga imageboard.",
        "tags": [
            "Community",
            "Anonymous",
            "Discussion"
        ],
        "rating": 4.4,
        "addedAt": "2026-05-09"
    },
    {
        "id": "4chanh",
        "name": "4chan /h/",
        "url": "https://boards.4chan.org/h/",
        "category": "Communities",
        "description": "Anonymous hentai discussion and image sharing.",
        "tags": [
            "Community",
            "Anonymous",
            "Adult (18+)"
        ],
        "rating": 4.3,
        "addedAt": "2026-05-09"
    },
    {
        "id": "nyaa",
        "name": "Nyaa",
        "url": "https://nyaa.si",
        "category": "Downloads",
        "description": "The definitive source for anime and manga torrents.",
        "tags": [
            "Free",
            "Torrents",
            "Raw/Subbed"
        ],
        "rating": 4.9,
        "addedAt": "2026-05-09"
    },
    {
        "id": "sukebei",
        "name": "Sukebei",
        "url": "https://sukebei.nyaa.si",
        "category": "Downloads",
        "description": "Nyaa's sister site dedicated entirely to adult content.",
        "tags": [
            "Free",
            "Torrents",
            "Adult (18+)"
        ],
        "rating": 4.8,
        "addedAt": "2026-05-09"
    },
    {
        "id": "erairaws",
        "name": "Erai-raws",
        "url": "https://www.erai-raws.info",
        "category": "Downloads",
        "description": "Direct downloads and torrents of currently airing anime.",
        "tags": [
            "Free",
            "Torrents",
            "Direct Downloads"
        ],
        "rating": 4.7,
        "addedAt": "2026-05-09"
    },
    {
        "id": "tokyotoshokan",
        "name": "TokyoToshokan",
        "url": "https://www.tokyotoshokan.info",
        "category": "Downloads",
        "description": "A classic bitTorrent tracker for Japanese media.",
        "tags": [
            "Free",
            "Torrents",
            "Classic"
        ],
        "rating": 4.4,
        "addedAt": "2026-05-09"
    },
    {
        "id": "animeout",
        "name": "AnimeOut",
        "url": "https://www.animeout.xyz",
        "category": "Downloads",
        "description": "Direct downloads of encoded anime with small file sizes.",
        "tags": [
            "Free",
            "Direct Downloads",
            "Encodes"
        ],
        "rating": 4.3,
        "addedAt": "2026-05-09"
    },
    {
        "id": "8a387413",
        "name": "Downloads - ErogeGames",
        "url": "https://erogegames.com",
        "category": "Games & Visual Novels",
        "description": "Discover Downloads - ErogeGames - A high quality portal for your favorite content.",
        "description_es": "Descubre Descargas - ErogeGames - Un portal de alta calidad para tu contenido favorito.",
        "description_jp": "ダウンロードを発見 - エロゲゲーム - お気に入りのコンテンツの高品質ポータル。",
        "description_fr": "Découvrez les téléchargements - ErogeGames - Un portail de haute qualité pour votre contenu préféré.",
        "description_pt": "Descubra Downloads - ErogeGames - Um portal de alta qualidade para seus conteúdos favoritos.",
        "description_hi": "डाउनलोड खोजें - ErogeGames - आपकी पसंदीदा सामग्री के लिए एक उच्च गुणवत्ता वाला पोर्टल।",
        "description_ar": "اكتشف التنزيلات - ErogeGames - بوابة عالية الجودة للمحتوى المفضل لديك.",
        "description_de": "Entdecken Sie Downloads – ErogeGames – Ein hochwertiges Portal für Ihre Lieblingsinhalte.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "cd21e2a3",
        "name": "Eroge Download & 94+ Free Sex Games Like Erogedown",
        "url": "https://theporndude.com/4473/erogedownload",
        "category": "Hentai Streaming",
        "description": "ErogeDownload.com! Looking to get your heartstrings tugged on while you tug on your dick? Then you need to try out some of the erotic visual novels ov",
        "description_es": "¡ErogeDownload.com! ¿Buscas que te toquen la fibra sensible mientras te jalas la polla? Entonces debes probar algunas de las novelas visuales eróticas de",
        "description_jp": "エロゲダウンロード.com」で！ペニスを引っ張りながら、心の琴線に触れるのを楽しみたいですか？それなら、エロティックなビジュアル ノベルをいくつか試してみる必要があります。",
        "description_fr": "ErogeDownload.com! Vous cherchez à faire vibrer votre cœur pendant que vous tirez sur votre bite ? Ensuite, vous devez essayer certains des romans visuels érotiques disponibles.",
        "description_pt": "ErogeDownload.com! Quer puxar as cordas do seu coração enquanto você puxa seu pau? Então você precisa experimentar alguns dos romances visuais eróticos de",
        "description_hi": "ErogeDownload.com! क्या आप अपने डिक को खींचते समय अपने दिल की धड़कनों को झकझोरना चाहते हैं? फिर आपको कुछ कामुक दृश्य उपन्यासों को आज़माने की ज़रूरत है",
        "description_ar": "ErogeDownload.com! هل تتطلع إلى شد أوتار قلبك أثناء شد قضيبك؟ إذًا أنت بحاجة إلى تجربة بعض الروايات المرئية المثيرة",
        "description_de": "ErogeDownload.com! Möchtest du, dass deine Herzen berührt werden, während du an deinem Schwanz herumziehst? Dann müssen Sie einige der erotischen Bildromane von ov ausprobieren",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "ed945fd5",
        "name": "MyHentaiComics - Hentai Comics | Porn Comics",
        "url": "https://myhentaicomics.com",
        "category": "Hentai Streaming",
        "description": "Discover MyHentaiComics - Hentai Comics | Porn Comics - A high quality portal for your favorite content.",
        "description_es": "Descubra MyHentaiComics - Cómics Hentai | Porn Comics: un portal de alta calidad para tu contenido favorito.",
        "description_jp": "Discover MyHentaiComics - エロ漫画 |ポルノ コミック - お気に入りのコンテンツの高品質ポータル。",
        "description_fr": "Découvrez MyHentaiComics - Bandes dessinées Hentai | Porn Comics - Un portail de haute qualité pour votre contenu préféré.",
        "description_pt": "Descubra MyHentaiComics - Quadrinhos Hentai | Porn Comics - Um portal de alta qualidade para seu conteúdo favorito.",
        "description_hi": "MyHentaiComics खोजें - हेनतई कॉमिक्स | पोर्न कॉमिक्स - आपकी पसंदीदा सामग्री के लिए एक उच्च गुणवत्ता वाला पोर्टल।",
        "description_ar": "اكتشف MyHentaiComics - هنتاي كاريكاتير | كاريكاتير الإباحية - بوابة عالية الجودة للمحتوى المفضل لديك.",
        "description_de": "Entdecken Sie MyHentaiComics - Hentai-Comics | Porn Comics – Ein hochwertiges Portal für Ihre Lieblingsinhalte.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "0c41918f",
        "name": "Favorite site for doujinshi reading? - Forums - My",
        "url": "https://myanimelist.net/forum?topicid=1419373",
        "category": "Anime Streaming",
        "description": "Read the topic about Favorite site for doujinshi reading? on MyAnimeList, and join in the discussion on the largest online anime and manga database in",
        "description_es": "Lea el tema sobre ¿Sitio favorito para leer doujinshi? en MyAnimeList y únete a la discusión en la base de datos de anime y manga en línea más grande del mundo.",
        "description_jp": "に関するトピックを読む 同人誌を読むのにお気に入りのサイトはありますか？ MyAnimeList で、最大のオンライン アニメとマンガのデータベースに関するディスカッションに参加してください。",
        "description_fr": "Lire le sujet Site préféré pour la lecture de doujinshi ? sur MyAnimeList et rejoignez la discussion sur la plus grande base de données d'anime et de manga en ligne au monde.",
        "description_pt": "Leia o tópico sobre Site favorito para leitura de doujinshi? no MyAnimeList e participe da discussão no maior banco de dados online de anime e mangá do mundo.",
        "description_hi": "डौजिंशी पढ़ने के लिए पसंदीदा साइट के बारे में विषय पढ़ें? MyAnimeList पर, और सबसे बड़े ऑनलाइन एनीमे और मंगा डेटाबेस पर चर्चा में शामिल हों",
        "description_ar": "اقرأ الموضوع عن الموقع المفضل لقراءة الدوجينشي؟ على MyAnimeList، وانضم إلى المناقشة حول أكبر قاعدة بيانات للأنمي والمانغا على الإنترنت في",
        "description_de": "Lesen Sie das Thema „Lieblingsseite zum Lesen von Doujinshi?“ auf MyAnimeList und beteiligen Sie sich an der Diskussion über die größte Online-Anime- und Manga-Datenbank in",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "8f153f7e",
        "name": "Anime Hentai No Censure Porn Videos | Pornhub.com",
        "url": "https://www.pornhub.com/video/search?search=anime+hentai+no+censure",
        "category": "Anime Streaming",
        "description": "Discover Anime Hentai No Censure Porn Videos | Pornhub.com - A high quality portal for your favorite content.",
        "description_es": "Descubre vídeos porno anime hentai sin censura | Pornhub.com: un portal de alta calidad para tu contenido favorito.",
        "description_jp": "アニメ ヘンタイ 無検閲のポルノ ビデオを発見 | Pornhub.com - お気に入りのコンテンツのための高品質ポータル。",
        "description_fr": "Découvrez les vidéos porno Anime Hentai No Censure | Pornhub.com - Un portail de haute qualité pour votre contenu préféré.",
        "description_pt": "Descubra vídeos pornôs de Anime Hentai No Censure | Pornhub.com – Um portal de alta qualidade para o seu conteúdo favorito.",
        "description_hi": "डिस्कवर एनीमे हेनतई नो सेंसर पोर्न वीडियो | पोर्नहब.कॉम - आपकी पसंदीदा सामग्री के लिए एक उच्च गुणवत्ता वाला पोर्टल।",
        "description_ar": "اكتشف مقاطع الفيديو الإباحية Anime Hentai بدون رقابة | Pornhub.com - بوابة عالية الجودة للمحتوى المفضل لديك.",
        "description_de": "Entdecken Sie Anime-Hentai-Pornovideos ohne Kritik | Pornhub.com – Ein hochwertiges Portal für Ihre Lieblingsinhalte.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "60a6484d",
        "name": "Hentai Uncensored Movies - iXXX.com",
        "url": "https://www.ixxx.com/c/hentai-uncensored",
        "category": "Hentai Streaming",
        "description": "Discover Hentai Uncensored Movies - iXXX.com - A high quality portal for your favorite content.",
        "description_es": "Descubra películas hentai sin censura - iXXX.com: un portal de alta calidad para su contenido favorito.",
        "description_jp": "変態無修正映画を発見 - iXXX.com - お気に入りのコンテンツの高品質ポータル。",
        "description_fr": "Découvrez des films hentai non censurés - iXXX.com - Un portail de haute qualité pour votre contenu préféré.",
        "description_pt": "Descubra filmes Hentai sem censura - iXXX.com - Um portal de alta qualidade para seu conteúdo favorito.",
        "description_hi": "हेनतई बिना सेंसर वाली फिल्में खोजें - iXXX.com - आपकी पसंदीदा सामग्री के लिए एक उच्च गुणवत्ता वाला पोर्टल।",
        "description_ar": "اكتشف أفلام هنتاي غير الخاضعة للرقابة - iXXX.com - بوابة عالية الجودة للمحتوى المفضل لديك.",
        "description_de": "Entdecken Sie unzensierte Hentai-Filme – iXXX.com – Ein hochwertiges Portal für Ihre Lieblingsinhalte.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "523788a9",
        "name": "Massive Adult Visual Novel Tier List",
        "url": "https://www.youtube.com/watch?v=1459v6QmwGA",
        "category": "Anime Streaming",
        "description": "Enjoy the videos and music you love, upload original content, and share it all with friends, family, and the world on YouTube.",
        "description_es": "Disfruta de los vídeos y la música que te encantan, sube contenido original y compártelo todo con amigos, familiares y el mundo en YouTube.",
        "description_jp": "YouTube でお気に入りの動画や音楽を楽しみ、オリジナルのコンテンツをアップロードして友だちや家族、世界中の人たちと共有しましょう。",
        "description_fr": "Profitez des vidéos et de la musique que vous aimez, téléchargez du contenu original et partagez le tout avec vos amis, votre famille et le monde entier sur YouTube.",
        "description_pt": "Aproveite os vídeos e músicas que você adora, carregue conteúdo original e compartilhe tudo com amigos, familiares e com o mundo no YouTube.",
        "description_hi": "अपने पसंदीदा वीडियो और संगीत का आनंद लें, मूल सामग्री अपलोड करें और इसे YouTube पर दोस्तों, परिवार और दुनिया के साथ साझा करें।",
        "description_ar": "استمتع بمقاطع الفيديو والموسيقى التي تحبها، وقم بتحميل المحتوى الأصلي، وشاركه كله مع الأصدقاء والعائلة والعالم على YouTube.",
        "description_de": "Genießen Sie die Videos und Musik, die Sie lieben, laden Sie Originalinhalte hoch und teilen Sie alles mit Freunden, Familie und der Welt auf YouTube.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "dd0db49e",
        "name": "Uncensored Hentai on Oppai.stream",
        "url": "https://oppai.stream/category/uncensored",
        "category": "Anime Streaming",
        "description": "Uncensored Hentai or Uncensored Anime is Anime or Hentai in which nothing is hidden, you can see pussy and dick clearly with no pixels obstructing it.",
        "description_es": "Hentai sin censura o anime sin censura es anime o hentai en el que no hay nada oculto, puedes ver el coño y la polla claramente sin píxeles que lo obstruyan.",
        "description_jp": "無修正エロアニメまたは無修正アニメは、何も隠されておらず、ピクセルを遮るものもなくマンコとペニスがはっきりと見えるアニメまたはエロアニメです。",
        "description_fr": "Hentai non censuré ou Anime non censuré est un Anime ou Hentai dans lequel rien n'est caché, vous pouvez voir clairement la chatte et la bite sans qu'aucun pixel ne l'obstrue.",
        "description_pt": "Hentai sem censura ou Anime sem censura é Anime ou Hentai em que nada está escondido, você pode ver a buceta e o pau claramente, sem nenhum pixel obstruindo-os.",
        "description_hi": "अनसेंसर्ड हेंताई या अनसेंसर्ड एनीमे वह एनीमे या हेंताई है जिसमें कुछ भी छिपा नहीं है, आप बिल्ली और डिक को बिना किसी बाधा के स्पष्ट रूप से देख सकते हैं।",
        "description_ar": "الهنتاي غير الخاضع للرقابة أو الأنمي غير الخاضع للرقابة هو أنيمي أو هنتاي لا يوجد فيه أي شيء مخفي، يمكنك رؤية المهبل والقضيب بوضوح دون أي بكسل يعوقه.",
        "description_de": "Uncensored Hentai oder Uncensored Anime ist Anime oder Hentai, in dem nichts verborgen ist. Man kann Muschi und Schwanz deutlich sehen, ohne dass Pixel sie behindern.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "4eb4872c",
        "name": "Free Hentai Stream Watch Hentai Porn Videos | Unce",
        "url": "https://watch.freehentaistream.com/page/5",
        "category": "Anime Streaming",
        "description": "Watch Hentai at Free Hentai Stream for All Uncensored Hentai Streaming Videos. On our Hentai Tube we share 1080p HD Free Hentai Porn and Hentai Anime!",
        "description_es": "Mire hentai en transmisión hentai gratuita para todos los videos de transmisión hentai sin censura. ¡En nuestro tubo Hentai compartimos porno hentai y anime hentai gratis en alta definición de 1080p!",
        "description_jp": "すべての無修正エロアニメ ストリーミング ビデオについては、無料のエロアニメ ストリームでエロアニメをご覧ください。私たちの変態チューブでは、1080p HDの無料変態ポルノと変態アニメを共有しています！",
        "description_fr": "Regardez Hentai sur Free Hentai Stream pour toutes les vidéos en streaming Hentai non censurées. Sur notre tube Hentai, nous partageons du porno Hentai gratuit et des anime Hentai HD 1080p !",
        "description_pt": "Assista Hentai no Free Hentai Stream para todos os vídeos Hentai sem censura. Em nosso Hentai Tube compartilhamos 1080p HD Free Hentai Porn e Hentai Anime!",
        "description_hi": "सभी बिना सेंसर वाले हेंताई स्ट्रीमिंग वीडियो के लिए मुफ्त हेंताई स्ट्रीम पर हेंताई देखें। हमारे हेनतई ट्यूब पर हम 1080p एचडी मुफ्त हेनतई पोर्न और हेनतई एनीमे साझा करते हैं!",
        "description_ar": "شاهد هنتاي في Free Hentai Stream لجميع مقاطع فيديو هنتاي المتدفقة غير الخاضعة للرقابة. على أنبوب هنتاي الخاص بنا، نشارك 1080p HD Free Hentai Porn وHentai Anime!",
        "description_de": "Sehen Sie sich Hentai im kostenlosen Hentai-Stream für alle unzensierten Hentai-Streaming-Videos an. Auf unserer Hentai-Tube teilen wir kostenlose 1080p-HD-Hentai-Pornos und Hentai-Anime!",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "0937f81a",
        "name": "Leading Doujinshi Sites for Online Access | BookSu",
        "url": "https://booksummaryclub.com/leading-doujinshi-sites-for-online-access",
        "category": "Manga & Doujinshi",
        "description": "Leading Doujinshi Sites for Online Access",
        "description_es": "Sitios líderes de Doujinshi para acceso en línea",
        "description_jp": "オンラインアクセスのための大手同人誌サイト",
        "description_fr": "Principaux sites Doujinshi pour l'accès en ligne",
        "description_pt": "Principais sites Doujinshi para acesso online",
        "description_hi": "ऑनलाइन पहुंच के लिए अग्रणी डौजिंशी साइटें",
        "description_ar": "مواقع Doujinshi الرائدة للوصول عبر الإنترنت",
        "description_de": "Führende Doujinshi-Sites für den Online-Zugriff",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "2e38b875",
        "name": "BooruPlus & 46+ Hentai Porn Sites Like Booru.plus",
        "url": "https://theporndude.com/8961/booruplus",
        "category": "Hentai Streaming",
        "description": "Booru.plus is one of those adult sites where the focus ain’t immediately clear, not unless you’re already familiar with the terminology. Even if you k",
        "description_es": "Booru.plus es uno de esos sitios para adultos cuyo enfoque no queda claro de inmediato, a menos que ya estés familiarizado con la terminología. Incluso si sabes",
        "description_jp": "Booru.plus は、専門用語に慣れていないと、何を重点にしているのかがすぐにはわかりにくいアダルト サイトの 1 つです。たとえあなたがkしたとしても",
        "description_fr": "Booru.plus est l’un de ces sites pour adultes dont l’objectif n’est pas immédiatement clair, à moins que vous ne connaissiez déjà la terminologie. Même si tu k",
        "description_pt": "Booru.plus é um daqueles sites adultos onde o foco não é imediatamente claro, a menos que você já esteja familiarizado com a terminologia. Mesmo se você k",
        "description_hi": "Booru.plus उन वयस्क साइटों में से एक है जहां फोकस तुरंत स्पष्ट नहीं होता है, जब तक कि आप पहले से ही शब्दावली से परिचित न हों। भले ही आप के",
        "description_ar": "Booru.plus هو أحد مواقع البالغين التي لا يكون التركيز فيها واضحًا على الفور، إلا إذا كنت على دراية بالمصطلحات. حتى لو كنت ك",
        "description_de": "Booru.plus ist eine dieser Websites für Erwachsene, bei denen der Fokus nicht sofort klar ist, es sei denn, Sie sind bereits mit der Terminologie vertraut. Auch wenn du k",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "1a760787",
        "name": "best manga doujin hentai sites - WebNovel",
        "url": "https://www.webnovel.com/ask/t3982971265749042",
        "category": "Hentai Streaming",
        "description": "I can't recommend such sites as they often contain inappropriate and potentially illegal content.",
        "description_es": "No puedo recomendar dichos sitios porque a menudo contienen contenido inapropiado y potencialmente ilegal.",
        "description_jp": "このようなサイトには不適切なコンテンツや違法の可能性のあるコンテンツが含まれていることが多いため、お勧めできません。",
        "description_fr": "Je ne peux pas recommander de tels sites car ils contiennent souvent du contenu inapproprié et potentiellement illégal.",
        "description_pt": "Não posso recomendar esses sites, pois geralmente contêm conteúdo impróprio e potencialmente ilegal.",
        "description_hi": "मैं ऐसी साइटों की अनुशंसा नहीं कर सकता क्योंकि उनमें अक्सर अनुपयुक्त और संभावित रूप से अवैध सामग्री होती है।",
        "description_ar": "لا يمكنني أن أوصي بمثل هذه المواقع لأنها غالبًا ما تحتوي على محتوى غير لائق وربما غير قانوني.",
        "description_de": "Ich kann solche Seiten nicht empfehlen, da sie oft unangemessene und möglicherweise illegale Inhalte enthalten.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "5fc7ee0e",
        "name": "Free Porn Games & Sex Games » Visual Novel - Adult",
        "url": "https://adultgamesworld.com/tag/visual-novel",
        "category": "Hentai Streaming",
        "description": "Discover Free Porn Games & Sex Games » Visual Novel - Adultgamesworld - A high quality portal for your favorite content.",
        "description_es": "Descubre juegos porno y juegos sexuales gratis »Novela visual - Adultgamesworld - Un portal de alta calidad para tu contenido favorito.",
        "description_jp": "無料のポルノ ゲームとセックス ゲームを発見する » ビジュアル ノベル - Adultgamesworld - お気に入りのコンテンツの高品質ポータル。",
        "description_fr": "Découvrez des jeux porno et sexuels gratuits » Roman visuel - Adultgamesworld - Un portail de haute qualité pour votre contenu préféré.",
        "description_pt": "Descubra jogos pornôs e jogos sexuais gratuitos »Visual Novel - Adultgamesworld - Um portal de alta qualidade para seu conteúdo favorito.",
        "description_hi": "मुफ़्त पोर्न गेम्स और सेक्स गेम्स खोजें » दृश्य उपन्यास - एडल्टगेम्सवर्ल्ड - आपकी पसंदीदा सामग्री के लिए एक उच्च गुणवत्ता वाला पोर्टल।",
        "description_ar": "اكتشف الألعاب الإباحية المجانية والألعاب الجنسية »Visual Novel - Adultgamesworld - بوابة عالية الجودة للمحتوى المفضل لديك.",
        "description_de": "Entdecken Sie kostenlose Porno- und Sexspiele » Visual Novel - Adultgamesworld - Ein hochwertiges Portal für Ihre Lieblingsinhalte.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "96fad3b3",
        "name": "Top hentai games tagged eroge available for downlo",
        "url": "https://erogames.com/en/hentai-games/type-download/tag-eroge",
        "category": "Hentai Streaming",
        "description": "Find hentai games tagged eroge like Warlord by Chance, Daisuke X Girls, A.S.S: Aether Shades & Shadows, Treasure of a Blizzard available for download ",
        "description_es": "Encuentra juegos hentai etiquetados como eroge como Warlord by Chance, Daisuke X Girls, A.S.S: Aether Shades & Shadows, Treasure of a Blizzard disponibles para descargar",
        "description_jp": "Warlord by Chance、Daisu X Girls、A.S.S: Aether Shades & Shadows、Treasure of a Blizzard などのエロゲタグが付いたエロゲーがダウンロード可能です",
        "description_fr": "Trouvez des jeux hentai étiquetés eroge comme Warlord by Chance, Daisuke X Girls, A.S.S: Aether Shades & Shadows, Treasure of a Blizzard disponibles en téléchargement",
        "description_pt": "Encontre jogos hentai marcados como eroge como Warlord by Chance, Daisuke X Girls, A.S.S: Aether Shades & Shadows, Treasure of a Blizzard disponíveis para download",
        "description_hi": "वारलॉर्ड बाय चांस, डाइसुके एक्स गर्ल्स, ए.एस.एस: एथर शेड्स एंड शैडोज़, ट्रेजर ऑफ ए ब्लिज़र्ड जैसे इरोज टैग किए गए हेनतई गेम डाउनलोड के लिए उपलब्ध हैं।",
        "description_ar": "ابحث عن ألعاب الهنتاي الموسومة بـ eroge مثل Warlord by Chance وDaisuke X Girls وA.S.S: Aether Shades & Shadows وTreasure of a Blizzard المتاحة للتنزيل",
        "description_de": "Finden Sie Hentai-Spiele mit dem Tag „Eroge“ wie „Warlord by Chance“, „Daisuke X Girls“, „A.S.S: Aether Shades & Shadows“ und „Treasure of a Blizzard“, die zum Download verfügbar sind",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "0d7e7be9",
        "name": "list-of-boorus/booru.org.md at master · red-tails/",
        "url": "https://github.com/red-tails/list-of-boorus/blob/master/booru.org.md",
        "category": "Image Boards (Boorus)",
        "description": "List of booru imageboards. Contribute to red-tails/list-of-boorus development by creating an account on GitHub.",
        "description_es": "Lista de tableros de imágenes booru. Contribuya al desarrollo de colas rojas/lista de boorus creando una cuenta en GitHub.",
        "description_jp": "ブール画像掲示板の一覧。 GitHub でアカウントを作成して、red-tails/list-of-boorus の開発に貢献してください。",
        "description_fr": "Liste des tableaux d'images Booru. Contribuez au développement de red-tails/list-of-boorus en créant un compte sur GitHub.",
        "description_pt": "Lista de painéis de imagens booru. Contribua para o desenvolvimento de red-tails/list-of-boorus criando uma conta no GitHub.",
        "description_hi": "बूरू इमेजबोर्ड की सूची. GitHub पर एक खाता बनाकर रेड-टेल्स/लिस्ट-ऑफ-बूरस विकास में योगदान करें।",
        "description_ar": "قائمة لوحات الصور booru. ساهم في تطوير red-tails/list-of-boorus عن طريق إنشاء حساب على GitHub.",
        "description_de": "Liste der Booru-Imageboards. Tragen Sie zur Red-Tails/List-of-Boorus-Entwicklung bei, indem Sie ein Konto auf GitHub erstellen.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "d77448df",
        "name": "13 Best Unblocked Porn Games",
        "url": "https://shevibe.com/blogs/best-adult-sites/unblocked-porn-games",
        "category": "Hentai Streaming",
        "description": "As the ultimate authority on adult gaming, I've scoured the landscape to uncover the 13 best unblocked porn games that deliver jaw-dropping immersion,",
        "description_es": "Como máxima autoridad en juegos para adultos, he recorrido el panorama para descubrir los 13 mejores juegos porno desbloqueados que ofrecen una inmersión asombrosa.",
        "description_jp": "アダルト ゲームの究極の権威として、私は驚くほどの没入感を提供する、ブロックされていない最高のポルノ ゲーム 13 作品を発見するために世界を調査しました。",
        "description_fr": "En tant qu'autorité ultime en matière de jeux pour adultes, j'ai parcouru le paysage pour découvrir les 13 meilleurs jeux porno débloqués qui offrent une immersion à couper le souffle,",
        "description_pt": "Como autoridade máxima em jogos para adultos, vasculhei o cenário para descobrir os 13 melhores jogos pornográficos desbloqueados que proporcionam uma imersão de cair o queixo,",
        "description_hi": "वयस्क गेमिंग पर अंतिम प्राधिकारी के रूप में, मैंने 13 सर्वश्रेष्ठ अनब्लॉक किए गए पोर्न गेम को उजागर करने के लिए परिदृश्य को खंगाला है जो आश्चर्यजनक तल्लीनता प्रदान करते हैं,",
        "description_ar": "باعتباري المرجع المطلق في مجال ألعاب البالغين، قمت بالتجول في المشهد للكشف عن أفضل 13 لعبة إباحية غير محظورة والتي توفر انغماسًا مذهلاً،",
        "description_de": "Als ultimative Autorität in Sachen Spiele für Erwachsene habe ich die Landschaft durchforstet, um die 13 besten entsperrten Pornospiele zu entdecken, die ein atemberaubendes Eintauchen ermöglichen.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "a11d7f18",
        "name": "high_res - Anime and Hentai pictures - Hentai Boor",
        "url": "https://booru.scoreland.name/post/list/high_res/1",
        "category": "Anime Streaming",
        "description": "Booru.eu is a anime and hentai images board.",
        "description_es": "Booru.eu es un foro de imágenes de anime y hentai.",
        "description_jp": "Booru.eu はアニメとエロアニメの画像掲示板です。",
        "description_fr": "Booru.eu est un forum d'images d'anime et hentai.",
        "description_pt": "Booru.eu é um painel de imagens de anime e hentai.",
        "description_hi": "Booru.eu एक एनीमे और हेनतई इमेज बोर्ड है।",
        "description_ar": "Booru.eu هي لوحة صور أنيمي وهنتاي.",
        "description_de": "Booru.eu ist ein Anime- und Hentai-Bilderforum.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "86fc3104",
        "name": "Top rated games tagged Hentai - itch.io",
        "url": "https://itch.io/games/top-rated/tag-hentai",
        "category": "Hentai Streaming",
        "description": "Find games tagged Hentai like !Î© Factorial Omega: My Dystopian Robot Girlfriend, Harem Hotel, Goddesses' Whim, Starmaker Story, ðFive Nights at Fu",
        "description_es": "Encuentra juegos etiquetados como Hentai como !Î© Factorial Omega: Mi novia robot distópica, Harem Hotel, Goddesses' Whim, Starmaker Story, ðFive Nights at Fu",
        "description_jp": "!Î© Factorial Omega: My Dystopian Robot Girlfriend、Harem Hotel、Goddesses' Whim、Starmaker Story、ðFive Nights at Fu のような変態タグのゲームを見つけてください",
        "description_fr": "Trouvez des jeux étiquetés Hentai comme !Î© Factorial Omega: My Dystopian Robot Girlfriend, Harem Hotel, Goddesses' Whim, Starmaker Story, ðFive Nights at Fu",
        "description_pt": "Encontre jogos marcados como Hentai como !Î© Factorial Omega: My Dystopian Robot Girlfriend, Harem Hotel, Goddesses' Whim, Starmaker Story, ðFive Nights at Fu",
        "description_hi": "हेनतई जैसे टैग वाले गेम ढूंढें! © फैक्टोरियल ओमेगा: माई डायस्टोपियन रोबोट गर्लफ्रेंड, हरम होटल, गॉडेसेस व्हिम, स्टारमेकर स्टोरी, ðफाइव नाइट्स एट फू",
        "description_ar": "ابحث عن الألعاب الموسومة بـ Hentai مثل!Î© Factorial Omega: My Dystopian Robot Girlfriend، Harem Hotel، Goddesses' Whim، Starmaker Story، ðFive Nights at Fu",
        "description_de": "Finden Sie Spiele mit dem Tag „Hentai“ wie !Î© Factorial Omega: My Dystopian Robot Girlfriend, Harem Hotel, Goddesses' Whim, Starmaker Story, ðFive Nights at Fu",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "224d826b",
        "name": "Can anyone suggest me some sites where I can downl",
        "url": "https://9gag.com/gag/arVXzq0",
        "category": "Downloads & Torrents",
        "description": "239 points • 15 comments - Your daily dose of funny memes, reaction meme pictures, GIFs and videos. We deliver hundreds of new memes daily and much mo",
        "description_es": "239 puntos • 15 comentarios: tu dosis diaria de memes divertidos, imágenes de memes de reacción, GIF y videos. Entregamos cientos de memes nuevos diariamente y mucho más.",
        "description_jp": "239 ポイント • コメント 15 件 - 面白いミーム、リアクション ミームの写真、GIF、ビデオを毎日お届けします。私たちは毎日何百もの新しいミームを配信しており、",
        "description_fr": "239 points • 15 commentaires - Votre dose quotidienne de mèmes amusants, d'images de mèmes de réaction, de GIF et de vidéos. Nous livrons quotidiennement des centaines de nouveaux mèmes et bien plus encore.",
        "description_pt": "239 pontos • 15 comentários - Sua dose diária de memes engraçados, fotos de memes de reação, GIFs e vídeos. Entregamos centenas de novos memes diariamente e muito mais",
        "description_hi": "239 अंक • 15 टिप्पणियाँ - मज़ेदार मीम्स, प्रतिक्रिया मीम चित्र, जीआईएफ और वीडियो की आपकी दैनिक खुराक। हम प्रतिदिन सैकड़ों नए मीम्स वितरित करते हैं और बहुत से क्षण आते हैं",
        "description_ar": "239 نقطة • 15 تعليقًا - جرعتك اليومية من الميمات المضحكة، وصور الميمات التفاعلية، وملفات GIF ومقاطع الفيديو. نحن نقدم مئات الميمات الجديدة يوميًا وأكثر من ذلك بكثير",
        "description_de": "239 Punkte • 15 Kommentare – Ihre tägliche Dosis an lustigen Memes, Reaktionsmeme-Bildern, GIFs und Videos. Wir liefern täglich Hunderte neuer Memes und vieles mehr",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "2d487b6b",
        "name": "Eroge Download - Page 2 of 142 - English visual no",
        "url": "https://erogedownload.com/page/2",
        "category": "Games & Visual Novels",
        "description": "English visual novel downloads",
        "description_es": "Descargas de novelas visuales en inglés.",
        "description_jp": "英語のビジュアルノベルのダウンロード",
        "description_fr": "Téléchargements de romans visuels en anglais",
        "description_pt": "Downloads de novelas visuais em inglês",
        "description_hi": "अंग्रेजी दृश्य उपन्यास डाउनलोड",
        "description_ar": "تحميل روايات مرئية انجليزية",
        "description_de": "Englische Visual Novel-Downloads",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "006edf3b",
        "name": "nhentai : Free Hentai Manga, Doujinshi and Comics ",
        "url": "https://nhentai.to",
        "category": "Hentai Streaming",
        "description": "nhentai is a free hentai manga and doujinshi reader with over 610,000 galleries to read and download free hentai manga and doujinshi via nhentai.net O",
        "description_es": "nhentai es un lector gratuito de manga hentai y doujinshi con más de 610.000 galerías para leer y descargar manga hentai y doujinshi gratis a través de nhentai.net O",
        "description_jp": "nhentai は、610,000 を超えるギャラリーを備えた無料のエロマンガと同人誌リーダーです。nhentai.net 経由で無料のエロマンガや同人誌を読んだりダウンロードしたりできます。",
        "description_fr": "nhentai est un lecteur gratuit de mangas et de doujinshi hentai avec plus de 610 000 galeries pour lire et télécharger gratuitement des mangas et des doujinshi hentai via nhentai.net O",
        "description_pt": "nhentai é um leitor gratuito de mangá e doujinshi hentai com mais de 610.000 galerias para ler e baixar mangá e doujinshi hentai gratuitos via nhentai.net O",
        "description_hi": "हेनतई एक निःशुल्क हेनतई मंगा और डौजिंशी रीडर है जिसमें nhendai.net के माध्यम से मुफ्त हेनतई मंगा और डौजिंशी को पढ़ने और डाउनलोड करने के लिए 610,000 से अधिक गैलरी हैं।",
        "description_ar": "nhentai هو قارئ هنتاي مانغا ودوجينشي مجاني يضم أكثر من 610.000 معرض لقراءة وتنزيل هنتاي مانغا ودوجينشي مجانًا عبر nhentai.net O",
        "description_de": "nhentai ist ein kostenloser Hentai-Manga- und Doujinshi-Reader mit über 610.000 Galerien zum Lesen und Herunterladen von kostenlosen Hentai-Manga und Doujinshi über nhentai.net O",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "8ce53c53",
        "name": "Free Comics .XXX - hentai, manga, 3d, cartoon porn",
        "url": "https://www.freecomics.xxx",
        "category": "Hentai Streaming",
        "description": "Watch and download free porn comics online. Enjoy your favorite comic books (western, hentai, cartoon, 3d) with weekly updates.",
        "description_es": "Mira y descarga cómics porno gratis online. Disfruta de tus cómics favoritos (occidental, hentai, dibujos animados, 3d) con actualizaciones semanales.",
        "description_jp": "無料のエロ漫画をオンラインで視聴してダウンロードします。毎週更新されるお気に入りのコミック (洋画、エロアニメ、漫画、3D) をお楽しみください。",
        "description_fr": "Regardez et téléchargez des bandes dessinées pornographiques gratuites en ligne. Profitez de vos bandes dessinées préférées (western, hentai, dessin animé, 3D) avec des mises à jour hebdomadaires.",
        "description_pt": "Assista e baixe quadrinhos pornôs gratuitos online. Aproveite suas histórias em quadrinhos favoritas (faroeste, hentai, desenho animado, 3D) com atualizações semanais.",
        "description_hi": "निःशुल्क अश्लील कॉमिक्स ऑनलाइन देखें और डाउनलोड करें। साप्ताहिक अपडेट के साथ अपनी पसंदीदा कॉमिक पुस्तकों (पश्चिमी, हेनतई, कार्टून, 3डी) का आनंद लें।",
        "description_ar": "مشاهدة وتحميل القصص المصورة الإباحية المجانية على الإنترنت. استمتع بكتبك المصورة المفضلة (الغربية، والهنتاي، والكرتون، وثلاثية الأبعاد) مع التحديثات الأسبوعية.",
        "description_de": "Schauen Sie sich kostenlose Porno-Comics online an und laden Sie sie herunter. Genießen Sie Ihre Lieblingscomics (Western, Hentai, Cartoon, 3D) mit wöchentlichen Updates.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "08312fa3",
        "name": "uncensored-hentai videos - XVIDEOS.COM",
        "url": "https://www.xvideos.com/tags/uncensored-hentai",
        "category": "Hentai Streaming",
        "description": "XVIDEOS uncensored-hentai videos, free",
        "description_es": "XVIDEOS videos sin censura-hentai, gratis",
        "description_jp": "XVIDEOS無修正エロ動画、無料",
        "description_fr": "Vidéos XVideos-hentai non censurées, gratuites",
        "description_pt": "XVIDEOS vídeos hentai sem censura, grátis",
        "description_hi": "XVIDEOS बिना सेंसर-हेनतई वीडियो, मुफ़्त",
        "description_ar": "XVIDEOS مقاطع فيديو هنتاي غير خاضعة للرقابة، مجانًا",
        "description_de": "XVIDEOS unzensierte Hentai-Videos, kostenlos",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "8fff98ba",
        "name": "Free Download Eroge Visual Novel Japanese (RAW) an",
        "url": "https://www.ryuugames.com/free-download-eroge-visual-novels",
        "category": "Games & Visual Novels",
        "description": "Ryuugames - One Stop Free Download Visual Novels Eroge Japanese (RAW) and English Translation with Direct Link (Mega, Onedrive, Googledrive)",
        "description_es": "Ryuugames: descarga gratuita integral de novelas visuales Eroge en japonés (RAW) y traducción al inglés con enlace directo (Mega, Onedrive, Googledrive)",
        "description_jp": "Ryuugames - ワンストップでビジュアルノベルエロゲを無料ダウンロード 日本語 (RAW) と英語翻訳 (直接リンク付き) (Mega、Onedrive、Googledrive)",
        "description_fr": "Ryuugames - One Stop Téléchargement gratuit de romans visuels Eroge, traduction japonaise (RAW) et anglaise avec lien direct (Mega, Onedrive, Googledrive)",
        "description_pt": "Ryuugames - One Stop Download grátis de romances visuais Eroge Tradução em japonês (RAW) e inglês com link direto (Mega, Onedrive, Googledrive)",
        "description_hi": "रयुगगेम्स - वन स्टॉप फ्री डाउनलोड विज़ुअल नॉवेल्स इरोज जापानी (रॉ) और अंग्रेजी अनुवाद सीधे लिंक के साथ (मेगा, वनड्राइव, गूगलड्राइव)",
        "description_ar": "Ryuugames - محطة واحدة مجانية للتنزيل المجاني للروايات المرئية Eroge باللغة اليابانية (RAW) والترجمة الإنجليزية مع رابط مباشر (Mega وOnedrive وGoogledrive)",
        "description_de": "Ryuugames – One Stop Kostenloser Download von Visual Novels Eroge Japanisch (RAW) und Englischübersetzung mit direktem Link (Mega, Onedrive, Googledrive)",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "8e1ed606",
        "name": "Ryuugames: Free Download Visual Novel Hentai Games",
        "url": "https://www.ryuugames.com",
        "category": "Hentai Streaming",
        "description": "Free Download Visual Novel Eroge Japanese (RAW) and English Translation. One Stop to find hentai games with direct link download",
        "description_es": "Descarga gratuita de Visual Novel Eroge japonés (RAW) y traducción al inglés. One Stop para encontrar juegos hentai con descarga de enlace directo",
        "description_jp": "ビジュアルノベルエロゲ日本語（RAW）と英語翻訳を無料でダウンロード。直接リンクでダウンロードできるエロゲームをワンストップで見つけられます",
        "description_fr": "Téléchargement gratuit du roman visuel Eroge en japonais (RAW) et traduction en anglais. One Stop pour trouver des jeux hentai avec téléchargement par lien direct",
        "description_pt": "Download grátis Visual Novel Eroge Tradução em japonês (RAW) e inglês. One Stop para encontrar jogos hentai com download de link direto",
        "description_hi": "विजुअल नॉवेल इरोज जापानी (रॉ) और अंग्रेजी अनुवाद मुफ्त डाउनलोड करें। सीधे लिंक डाउनलोड के साथ हेनतई गेम खोजने के लिए वन स्टॉप",
        "description_ar": "تنزيل مجاني للرواية المرئية Eroge باللغة اليابانية (RAW) والترجمة الإنجليزية. محطة واحدة للعثور على ألعاب الهنتاي مع تنزيل الرابط المباشر",
        "description_de": "Kostenloser Download von Visual Novel Eroge in Japanisch (RAW) und Englisch. One Stop, um Hentai-Spiele mit direktem Link-Download zu finden",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "2ef8f16b",
        "name": "Play Visual Novel Sex Games Online - Nutaku",
        "url": "https://www.nutaku.net/games/visual-novel/tag/platform/os/dev/pub/lang/filter/price/features/status/ranking",
        "category": "Games & Visual Novels",
        "description": "Browse the best Visual Novel sex games on Nutaku.net. Play them on your phone or your in your browser.",
        "description_es": "Explora los mejores juegos sexuales de novela visual en Nutaku.net. Reprodúcelos en tu teléfono o en tu navegador.",
        "description_jp": "Nutaku.net で最高のビジュアルノベルセックスゲームを閲覧してください。携帯電話またはブラウザで再生してください。",
        "description_fr": "Parcourez les meilleurs jeux sexuels Visual Novel sur Nutaku.net. Jouez-les sur votre téléphone ou dans votre navigateur.",
        "description_pt": "Procure os melhores jogos sexuais de Visual Novel em Nutaku.net. Jogue-os no seu telefone ou no seu navegador.",
        "description_hi": "Nutaku.net पर सर्वश्रेष्ठ विज़ुअल नॉवेल सेक्स गेम ब्राउज़ करें। उन्हें अपने फ़ोन पर या अपने ब्राउज़र में चलाएँ।",
        "description_ar": "تصفح أفضل ألعاب الجنس للروايات المرئية على Nutaku.net. العبها على هاتفك أو في متصفحك.",
        "description_de": "Durchsuchen Sie die besten Visual Novel-Sexspiele auf Nutaku.net. Spielen Sie sie auf Ihrem Telefon oder in Ihrem Browser ab.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "d6018c4b",
        "name": "Page 3 of 142 - English visual novel downloads - E",
        "url": "https://erogedownload.com/page/3",
        "category": "Games & Visual Novels",
        "description": "English visual novel downloads",
        "description_es": "Descargas de novelas visuales en inglés.",
        "description_jp": "英語のビジュアルノベルのダウンロード",
        "description_fr": "Téléchargements de romans visuels en anglais",
        "description_pt": "Downloads de novelas visuais em inglês",
        "description_hi": "अंग्रेजी दृश्य उपन्यास डाउनलोड",
        "description_ar": "تحميل روايات مرئية انجليزية",
        "description_de": "Englische Visual Novel-Downloads",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "cff598ca",
        "name": "Hentai Uncensored porn videos | free ❤️ vids @ Tia",
        "url": "https://www.tiava.com/category/hentai-uncensored",
        "category": "Hentai Streaming",
        "description": "Discover Hentai Uncensored porn videos | free ❤️ vids @ Tiava - A high quality portal for your favorite content.",
        "description_es": "Descubre vídeos porno Hentai Sin Censura | free ❤️ vids @ Tiava: un portal de alta calidad para tu contenido favorito.",
        "description_jp": "変態無修正ポルノビデオを発見 |無料 ❤️ 動画 @ Tiava - お気に入りのコンテンツの高品質ポータル。",
        "description_fr": "Découvrez les vidéos porno Hentai Non censurée | vidéos ❤️ gratuites @ Tiava - Un portail de haute qualité pour votre contenu préféré.",
        "description_pt": "Descubra vídeos pornôs Hentai sem censura | vídeos ❤️ gratuitos @ Tiava - Um portal de alta qualidade para seu conteúdo favorito.",
        "description_hi": "डिस्कवर हेनतई बिना सेंसर किए हुए अश्लील वीडियो | मुफ़्त ❤️ vids @ Tiava - आपकी पसंदीदा सामग्री के लिए एक उच्च गुणवत्ता वाला पोर्टल।",
        "description_ar": "اكتشف مقاطع الفيديو الإباحية هنتاي غير الخاضعة للرقابة | مقاطع فيديو مجانية @ Tiava - بوابة عالية الجودة للمحتوى المفضل لديك.",
        "description_de": "Entdecken Sie unzensierte Hentai-Pornovideos | kostenlose ❤️ Videos @ Tiava – Ein hochwertiges Portal für Ihre Lieblingsinhalte.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "59e624aa",
        "name": "Best Porn Games & Hentai Games for Adult Players -",
        "url": "https://playmeow.com/boy-r18",
        "category": "Hentai Streaming",
        "description": "Discover Best Porn Games & Hentai Games for Adult Players - Playmeow - A high quality portal for your favorite content.",
        "description_es": "Descubre los mejores juegos porno y juegos hentai para jugadores adultos: Playmeow: un portal de alta calidad para tu contenido favorito.",
        "description_jp": "アダルトプレイヤー向けの最高のポルノゲームと変態ゲームを発見 - Playmeow - お気に入りのコンテンツのための高品質ポータル。",
        "description_fr": "Découvrez les meilleurs jeux porno et jeux hentai pour les joueurs adultes - Playmeow - Un portail de haute qualité pour votre contenu préféré.",
        "description_pt": "Descubra os melhores jogos pornôs e jogos Hentai para jogadores adultos - Playmeow - Um portal de alta qualidade para seu conteúdo favorito.",
        "description_hi": "वयस्क खिलाड़ियों के लिए सर्वश्रेष्ठ पोर्न गेम और हेनतई गेम खोजें - Playmeow - आपकी पसंदीदा सामग्री के लिए एक उच्च गुणवत्ता वाला पोर्टल।",
        "description_ar": "اكتشف أفضل الألعاب الإباحية وألعاب الهنتاي للاعبين البالغين - Playmeow - بوابة عالية الجودة للمحتوى المفضل لديك.",
        "description_de": "Entdecken Sie die besten Pornospiele und Hentai-Spiele für erwachsene Spieler – Playmeow – ein hochwertiges Portal für Ihre Lieblingsinhalte.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "aa687b90",
        "name": "HentaiVox - Free Hentai Manga, Doujin and Comic Po",
        "url": "https://hentaivox.com",
        "category": "Hentai Streaming",
        "description": "HentaiVox has the largest content of free hentai manga, doujin and comic porn xxx. Updated in real time, with more than 300 000 contents, there is all",
        "description_es": "HentaiVox tiene el mayor contenido de hentai manga, doujin y cómic porno xxx gratis. Actualizado en tiempo real, con más de 300.000 contenidos, está todo",
        "description_jp": "HentaiVox には、無料のエロ漫画、同人、コミックポルノ xxx の最大のコンテンツがあります。リアルタイムに更新され、30万以上のコンテンツがあり、すべてが揃っています",
        "description_fr": "HentaiVox a le plus grand contenu de mangas hentai gratuits, de doujin et de porno comique xxx. Mis à jour en temps réel, avec plus de 300 000 contenus, il y a tout",
        "description_pt": "HentaiVox tem o maior conteúdo de mangá hentai gratuito, doujin e pornografia em quadrinhos xxx. Atualizado em tempo real, com mais de 300 mil conteúdos, está tudo",
        "description_hi": "HentaiVox में मुफ्त हेनतई मंगा, डोजिन और कॉमिक पोर्न xxx की सबसे बड़ी सामग्री है। वास्तविक समय में अद्यतन, 300,000 से अधिक सामग्री के साथ, सब कुछ है",
        "description_ar": "يحتوي HentaiVox على أكبر محتوى من مانغا هنتاي ودوجين وإباحية هزلية xxx مجانًا. يتم تحديثه في الوقت الفعلي، مع أكثر من 300000 محتوى، ويوجد كل شيء",
        "description_de": "HentaiVox bietet den größten Inhalt an kostenlosen Hentai-Manga-, Doujin- und Comic-Pornos. In Echtzeit aktualisiert, mit mehr als 300.000 Inhalten ist alles dabei",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "3a3f86c4",
        "name": "Top 6 MORE Websites to Watch Anime LEGALLY AND ...",
        "url": "https://www.youtube.com/watch?v=xJgevYILY1g",
        "category": "Anime Streaming",
        "description": "Enjoy the videos and music you love, upload original content, and share it all with friends, family, and the world on YouTube.",
        "description_es": "Disfruta de los vídeos y la música que te encantan, sube contenido original y compártelo todo con amigos, familiares y el mundo en YouTube.",
        "description_jp": "YouTube でお気に入りの動画や音楽を楽しみ、オリジナルのコンテンツをアップロードして友だちや家族、世界中の人たちと共有しましょう。",
        "description_fr": "Profitez des vidéos et de la musique que vous aimez, téléchargez du contenu original et partagez le tout avec vos amis, votre famille et le monde entier sur YouTube.",
        "description_pt": "Aproveite os vídeos e músicas que você adora, carregue conteúdo original e compartilhe tudo com amigos, familiares e com o mundo no YouTube.",
        "description_hi": "अपने पसंदीदा वीडियो और संगीत का आनंद लें, मूल सामग्री अपलोड करें और इसे YouTube पर दोस्तों, परिवार और दुनिया के साथ साझा करें।",
        "description_ar": "استمتع بمقاطع الفيديو والموسيقى التي تحبها، وقم بتحميل المحتوى الأصلي، وشاركه كله مع الأصدقاء والعائلة والعالم على YouTube.",
        "description_de": "Genießen Sie die Videos und Musik, die Sie lieben, laden Sie Originalinhalte hoch und teilen Sie alles mit Freunden, Familie und der Welt auf YouTube.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "41cf7243",
        "name": "OnlyHGames - Free Sex Games - The Porn Dude",
        "url": "https://theporndude.com/3844/onlyhgames",
        "category": "Hentai Streaming",
        "description": "OnlyHGames.com is a hentai game download site providing hundreds of free PC and Android sex games. The site features games in a variety of languages, ",
        "description_es": "OnlyHGames.com es un sitio de descarga de juegos hentai que ofrece cientos de juegos sexuales gratuitos para PC y Android. El sitio presenta juegos en una variedad de idiomas,",
        "description_jp": "OnlyHGames.com は、何百もの無料の PC および Android セックス ゲームを提供するエロゲーム ダウンロード サイトです。このサイトにはさまざまな言語でゲームが掲載されていますが、",
        "description_fr": "OnlyHGames.com est un site de téléchargement de jeux hentai proposant des centaines de jeux sexuels gratuits sur PC et Android. Le site propose des jeux dans une variété de langues,",
        "description_pt": "OnlyHGames.com é um site de download de jogos hentai que oferece centenas de jogos sexuais gratuitos para PC e Android. O site apresenta jogos em vários idiomas,",
        "description_hi": "ओनलीएचगेम्स.कॉम एक हेनतई गेम डाउनलोड साइट है जो सैकड़ों मुफ्त पीसी और एंड्रॉइड सेक्स गेम उपलब्ध कराती है। साइट विभिन्न भाषाओं में गेम उपलब्ध कराती है,",
        "description_ar": "OnlyHGames.com هو موقع تنزيل ألعاب هنتاي يوفر المئات من الألعاب الجنسية المجانية للكمبيوتر الشخصي وAndroid. يحتوي الموقع على ألعاب بعدة لغات،",
        "description_de": "OnlyHGames.com ist eine Website zum Herunterladen von Hentai-Spielen, die Hunderte kostenloser Sexspiele für PC und Android bietet. Die Website bietet Spiele in verschiedenen Sprachen,",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "cc658ee8",
        "name": "[2025] 10 Best Free Dubbed Anime Websites - iMyFon",
        "url": "https://filme.imyfone.com/ai-tips/best-free-dubbed-anime-websites",
        "category": "Anime Streaming",
        "description": "We've gathered 10 free dubbed anime websites for you! If you're wondering which anime site with the most english dubs, you will also find the answer h",
        "description_es": "¡Hemos reunido 10 sitios web de anime doblados gratuitos para ti! Si te preguntas qué sitio de anime tiene más doblajes en inglés, también encontrarás la respuesta h",
        "description_jp": "無料で吹き替えできるアニメサイトを10個集めました！英語の吹き替えが最も多いアニメ サイトはどこかと疑問に思っている場合は、その答えも見つかります。",
        "description_fr": "Nous avons rassemblé pour vous 10 sites Web d’anime doublés gratuits ! Si vous vous demandez quel site d'anime propose le plus de doublages en anglais, vous trouverez également la réponse h",
        "description_pt": "Reunimos 10 sites de animes dublados gratuitos para você! Se você está se perguntando qual site de anime com mais dublagens em inglês, você também encontrará a resposta h",
        "description_hi": "हमने आपके लिए 10 निःशुल्क डब एनीमे वेबसाइटें एकत्रित की हैं! यदि आप सोच रहे हैं कि सबसे अधिक अंग्रेजी डब वाली एनीमे साइट कौन सी है, तो आपको इसका उत्तर भी मिलेगा",
        "description_ar": "لقد جمعنا لك 10 مواقع أنمي مدبلجة مجانية! إذا كنت تتساءل عن موقع الأنمي الذي يحتوي على أكبر عدد من الدبلجة الإنجليزية، فستجد أيضًا الإجابة ح",
        "description_de": "Wir haben 10 kostenlose synchronisierte Anime-Websites für Sie zusammengestellt! Wenn Sie sich fragen, welche Anime-Site die meisten englischen Dubs hat, finden Sie auch die Antwort h",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "e7e82b6a",
        "name": "How to Guide for Finding Doujinshi",
        "url": "https://www.youtube.com/watch?v=aKsVJPdQtpw",
        "category": "Anime Streaming",
        "description": "Enjoy the videos and music you love, upload original content, and share it all with friends, family, and the world on YouTube.",
        "description_es": "Disfruta de los vídeos y la música que te encantan, sube contenido original y compártelo todo con amigos, familiares y el mundo en YouTube.",
        "description_jp": "YouTube でお気に入りの動画や音楽を楽しみ、オリジナルのコンテンツをアップロードして友だちや家族、世界中の人たちと共有しましょう。",
        "description_fr": "Profitez des vidéos et de la musique que vous aimez, téléchargez du contenu original et partagez le tout avec vos amis, votre famille et le monde entier sur YouTube.",
        "description_pt": "Aproveite os vídeos e músicas que você adora, carregue conteúdo original e compartilhe tudo com amigos, familiares e com o mundo no YouTube.",
        "description_hi": "अपने पसंदीदा वीडियो और संगीत का आनंद लें, मूल सामग्री अपलोड करें और इसे YouTube पर दोस्तों, परिवार और दुनिया के साथ साझा करें।",
        "description_ar": "استمتع بمقاطع الفيديو والموسيقى التي تحبها، وقم بتحميل المحتوى الأصلي، وشاركه كله مع الأصدقاء والعائلة والعالم على YouTube.",
        "description_de": "Genießen Sie die Videos und Musik, die Sie lieben, laden Sie Originalinhalte hoch und teilen Sie alles mit Freunden, Familie und der Welt auf YouTube.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "b1d41bc3",
        "name": "Top Visual Novel games tagged Adult - itch.io",
        "url": "https://itch.io/games/genre-visual-novel/tag-adult",
        "category": "Hentai Streaming",
        "description": "Find Visual Novel games tagged Adult like The BloodRiver Saga: Retransmitter, My New Paranormal Life, Shadow Island, Path of Desire: Cursed Chakra, Ch",
        "description_es": "Encuentra juegos de novela visual etiquetados para adultos como The BloodRiver Saga: Retransmitter, My New Paranormal Life, Shadow Island, Path of Desire: Cursed Chakra, Ch",
        "description_jp": "The BloodRiver Saga: Retransmitter、My New Paranormal Life、Shadow Island、Path of Desire: Cursed Chakra、Ch などのアダルトタグが付けられたビジュアル ノベル ゲームを見つけます",
        "description_fr": "Trouvez des jeux de roman visuel étiquetés pour adultes comme The BloodRiver Saga: Retransmitter, My New Paranormal Life, Shadow Island, Path of Desire: Cursed Chakra, Ch",
        "description_pt": "Encontre jogos de Visual Novel marcados como Adulto como The BloodRiver Saga: Retransmitter, My New Paranormal Life, Shadow Island, Path of Desire: Cursed Chakra, Ch",
        "description_hi": "द ब्लडरिवर सागा: रिट्रांसमीटर, माई न्यू पैरानॉर्मल लाइफ, शैडो आइलैंड, पाथ ऑफ डिज़ायर: कर्स्ड चक्र, च जैसे वयस्क टैग वाले दृश्य उपन्यास गेम खोजें",
        "description_ar": "ابحث عن ألعاب Visual Novel الموسومة بـ Adult مثل The BloodRiver Saga: Retransmitter، My New Paranormal Life، Shadow Island، Path of Desire: Cursed Chakra، Ch",
        "description_de": "Finden Sie Visual Novel-Spiele mit dem Tag „Erwachsene“ wie The BloodRiver Saga: Retransmitter, My New Paranormal Life, Shadow Island, Path of Desire: Cursed Chakra, Kap",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "30d0c78e",
        "name": "hentai porn and anime sex games | page 2",
        "url": "https://www.funny-games.biz/hentai-minigames-2.html",
        "category": "Anime Streaming",
        "description": "Hot anime sex games and hentai games, uncensored and free to play in your browser. Unlock sexy hentai animations in these fun to play games.\n",
        "description_es": "Juegos sexuales de anime y juegos hentai calientes, sin censura y gratuitos para jugar en tu navegador. Desbloquea animaciones hentai sexys en estos juegos divertidos.",
        "description_jp": "人気のアニメ セックス ゲームやエロゲーム、無修正でブラウザで無料でプレイできます。これらの楽しいゲームでセクシーなエロアニメーションのロックを解除してください。",
        "description_fr": "Jeux de sexe animés chauds et jeux hentai, non censurés et gratuits à jouer dans votre navigateur. Débloquez des animations hentai sexy dans ces jeux amusants.",
        "description_pt": "Jogos sexuais de anime e jogos hentai quentes, sem censura e gratuitos para jogar no seu navegador. Desbloqueie animações hentai sensuais nestes jogos divertidos.",
        "description_hi": "हॉट एनीमे सेक्स गेम और हेनतई गेम, बिना सेंसर किए और आपके ब्राउज़र में खेलने के लिए निःशुल्क। इन मज़ेदार गेमों में सेक्सी हेनतई एनिमेशन अनलॉक करें।",
        "description_ar": "ألعاب الجنس الأنيمي الساخنة وألعاب الهنتاي، غير خاضعة للرقابة ومجانية للعب في متصفحك. افتح الرسوم المتحركة الهنتاي المثيرة في هذه الألعاب الممتعة.",
        "description_de": "Heiße Anime-Sexspiele und Hentai-Spiele, unzensiert und kostenlos in Ihrem Browser spielbar. Schalte in diesen unterhaltsamen Spielen sexy Hentai-Animationen frei.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "bd3fb168",
        "name": "Hentai Manga Sites - Hentai Comics & Doujinshi - R",
        "url": "https://theporndude.com/hentai-manga-sites",
        "category": "Hentai Streaming",
        "description": "Read and download free hentai manga comics online from the world’s top adult artists. Explore 18+ parody comics, wild anime-inspired doujinshi, and",
        "description_es": "Lea y descargue cómics manga hentai gratuitos en línea de los mejores artistas para adultos del mundo. Explora más de 18 cómics de parodia, doujinshi salvajes inspirados en anime y",
        "description_jp": "世界トップのアダルトアーティストによる無料のエロマンガコミックをオンラインで読んだりダウンロードしたりできます。 18 歳以上のパロディ コミック、ワイルドなアニメにインスピレーションを得た同人誌、",
        "description_fr": "Lisez et téléchargez gratuitement des bandes dessinées manga hentai en ligne des meilleurs artistes adultes du monde. Explorez plus de 18 bandes dessinées parodiques, des doujinshi sauvages inspirés des dessins animés et",
        "description_pt": "Leia e baixe quadrinhos hentai mangá online gratuitos dos principais artistas adultos do mundo. Explore mais de 18 quadrinhos de paródia, doujinshi selvagem inspirado em anime e",
        "description_hi": "दुनिया के शीर्ष वयस्क कलाकारों की मुफ्त हेनतई मंगा कॉमिक्स ऑनलाइन पढ़ें और डाउनलोड करें। 18+ पैरोडी कॉमिक्स, वाइल्ड एनीमे-प्रेरित डौजिंशी और का अन्वेषण करें",
        "description_ar": "اقرأ وقم بتنزيل قصص هنتاي مانغا الهزلية المجانية عبر الإنترنت من أفضل الفنانين البالغين في العالم. استكشف أكثر من 18 كاريكاتيرًا ساخرًا وقصص الدوجينشي المستوحاة من الرسوم المتحركة الجامحة، و",
        "description_de": "Lesen und laden Sie kostenlose Hentai-Manga-Comics online von den weltbesten erwachsenen Künstlern herunter. Entdecken Sie über 18 Parodie-Comics, wilde Anime-inspirierte Doujinshi und",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "855b353e",
        "name": "Watch Anime Online | Anime-Planet",
        "url": "https://www.anime-planet.com/anime/watch-online/dubbed",
        "category": "Anime Streaming",
        "description": "Discover Watch Anime Online | Anime-Planet - A high quality portal for your favorite content.",
        "description_es": "Descubre Ver anime en línea | Anime-Planet: un portal de alta calidad para tu contenido favorito.",
        "description_jp": "オンラインでアニメを見る | 発見Anime-Planet - お気に入りのコンテンツのための高品質ポータル。",
        "description_fr": "Découvrez Regarder des anime en ligne | Anime-Planet - Un portail de haute qualité pour votre contenu préféré.",
        "description_pt": "Descubra Assistir Anime Online | Anime-Planet - Um portal de alta qualidade para seus conteúdos favoritos.",
        "description_hi": "डिस्कवर वॉच एनीमे ऑनलाइन | एनीमे-प्लैनेट - आपकी पसंदीदा सामग्री के लिए एक उच्च गुणवत्ता वाला पोर्टल।",
        "description_ar": "اكتشف مشاهدة الانمي اون لاين | Anime-Planet - بوابة عالية الجودة للمحتوى المفضل لديك.",
        "description_de": "Entdecken Sie Anime online ansehen | Anime-Planet – Ein hochwertiges Portal für Ihre Lieblingsinhalte.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "18cad32e",
        "name": "Page 32 of 142 - English visual novel downloads",
        "url": "https://erogedownload.com/page/32",
        "category": "Games & Visual Novels",
        "description": "English visual novel downloads",
        "description_es": "Descargas de novelas visuales en inglés.",
        "description_jp": "英語のビジュアルノベルのダウンロード",
        "description_fr": "Téléchargements de romans visuels en anglais",
        "description_pt": "Downloads de novelas visuais em inglês",
        "description_hi": "अंग्रेजी दृश्य उपन्यास डाउनलोड",
        "description_ar": "تحميل روايات مرئية انجليزية",
        "description_de": "Englische Visual Novel-Downloads",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "7394b81a",
        "name": "Please tell me, list of anime hentai games",
        "url": "https://f95zone.to/threads/please-tell-me-list-of-anime-hentai-games.112013",
        "category": "Anime Streaming",
        "description": "Please let me know if there is one, I'd like to try it thanks..",
        "description_es": "Por favor avíseme si hay uno, me gustaría probarlo gracias.",
        "description_jp": "もしあれば教えてください、試してみたいのですが、ありがとうございます。",
        "description_fr": "S'il vous plaît laissez-moi savoir s'il y en a un, j'aimerais l'essayer merci.",
        "description_pt": "Por favor, deixe-me saber se existe um, gostaria de tentar, obrigado.",
        "description_hi": "कृपया मुझे बताएं कि क्या कोई है, मैं इसे आज़माना चाहूंगा, धन्यवाद..",
        "description_ar": "من فضلك أخبرني إذا كان هناك واحد، أود تجربته وشكرا..",
        "description_de": "Bitte lassen Sie mich wissen, ob es eines gibt. Ich würde es gerne ausprobieren, danke.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "320c4729",
        "name": "Top 30+ Hentai games - SteamPeek",
        "url": "https://steampeek.hu?tagid=831137",
        "category": "Hentai Streaming",
        "description": "Check out games like DEEP SPACE WAIFU, Mirror, NEKOPARA Vol. 1, Hentai Vs Furries, NEKOPARA Vol. 3, Swaying Girl and more!",
        "description_es": "Mira juegos como DEEP SPACE WAIFU, Mirror, NEKOPARA Vol. 1, Hentai contra Furries, NEKOPARA vol. 3, ¡Chica balanceándose y más!",
        "description_jp": "DEEP SPACE WAIFU、Mirror、NEKOPARA Vol. などのゲームをチェックしてください。 1、変態VSケモノ、ネコぱらVol. 3、揺れる少女など！",
        "description_fr": "Découvrez des jeux comme DEEP SPACE WAIFU, Mirror, NEKOPARA Vol. 1, Hentai contre Furries, NEKOPARA Vol. 3, Swinging Girl et plus encore !",
        "description_pt": "Confira jogos como DEEP SPACE WAIFU, Mirror, NEKOPARA Vol. 1, Hentai Vs Furries, NEKOPARA Vol. 3, Garota Balançando e muito mais!",
        "description_hi": "डीप स्पेस वेफू, मिरर, नेकोपारा वॉल्यूम जैसे गेम देखें। 1, हेनतई बनाम फ्यूरीज़, नेकोपारा वॉल्यूम। 3, लहराती हुई लड़की और भी बहुत कुछ!",
        "description_ar": "تحقق من الألعاب مثل DEEP SPACE WAIFU وMirror وNEKOPARA Vol. 1، هنتاي مقابل فروي، NEKOPARA المجلد. 3، الفتاة المتمايلة وأكثر!",
        "description_de": "Schauen Sie sich Spiele wie DEEP SPACE WAIFU, Mirror und NEKOPARA Vol. an. 1, Hentai Vs Furries, NEKOPARA Vol. 3, Swaying Girl und mehr!",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "8d038983",
        "name": "Hentai Streaming Sites - Watch Hentai Videos Onlin",
        "url": "https://theporndude.com/hentai-streaming-sites",
        "category": "Anime Streaming",
        "description": "Stream Free HD hentai videos on the most popular hentai tubes online. Watch and download uncensored 720p/1080p (3D) hentai movies in Japanese or",
        "description_es": "Transmita videos hentai HD gratuitos en los tubos hentai más populares en línea. Mira y descarga películas hentai sin censura de 720p/1080p (3D) en japonés o",
        "description_jp": "最も人気のあるエロアニメ チューブで無料の HD エロアニメ ビデオをオンラインでストリーミングしましょう。日本語または無修正の 720p/1080p (3D) エロアニメ映画を視聴してダウンロードする",
        "description_fr": "Diffusez des vidéos hentai HD gratuites sur les tubes hentai les plus populaires en ligne. Regardez et téléchargez des films hentai 720p/1080p (3D) non censurés en japonais ou",
        "description_pt": "Transmita vídeos hentai HD gratuitos nos tubos hentai mais populares online. Assista e baixe filmes hentai 720p/1080p (3D) sem censura em japonês ou",
        "description_hi": "ऑनलाइन सबसे लोकप्रिय हेनतई ट्यूबों पर मुफ्त एचडी हेनतई वीडियो स्ट्रीम करें। जापानी में बिना सेंसर वाली 720पी/1080पी (3डी) हेनतई फिल्में देखें और डाउनलोड करें",
        "description_ar": "قم ببث مقاطع فيديو هنتاي عالية الدقة مجانًا على قنوات الهنتاي الأكثر شهرة عبر الإنترنت. شاهد وقم بتنزيل أفلام الهنتاي غير الخاضعة للرقابة بدقة 720p/1080p (ثلاثية الأبعاد) باللغة اليابانية أو",
        "description_de": "Streamen Sie kostenlose HD-Hentai-Videos auf den beliebtesten Hentai-Röhren online. Sehen Sie sich unzensierte 720p/1080p (3D) Hentai-Filme auf Japanisch an und laden Sie sie herunter",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "4dde5fa5",
        "name": "BOORU XXX - Anime and Hentai | Porn imageboard",
        "url": "https://booru.xxx",
        "category": "Anime Streaming",
        "description": "BOORU XXX is hentai and safe image resource available! Many best images for you to search and view, and it is all free!",
        "description_es": "¡BOORU XXX es un recurso de imágenes hentai y seguro disponible! Muchas de las mejores imágenes para que las busques y las veas, ¡y todo es gratis!",
        "description_jp": "BOORU XXX はエロくて安全な画像リソースを利用できます!検索して閲覧できる最高の画像が多数あり、すべて無料です。",
        "description_fr": "BOORU XXX est une ressource d'images hentai et sûre disponible ! De nombreuses meilleures images à rechercher et à visualiser, et tout est gratuit !",
        "description_pt": "BOORU XXX é um recurso de imagem hentai e seguro disponível! Muitas das melhores imagens para você pesquisar e visualizar, e é tudo grátis!",
        "description_hi": "बूरू XXX हेनतई और सुरक्षित छवि संसाधन उपलब्ध है! आपके खोजने और देखने के लिए कई बेहतरीन छवियां, और यह सब मुफ़्त है!",
        "description_ar": "BOORU XXX هو مصدر صور هنتاي وآمن متاح! العديد من أفضل الصور التي يمكنك البحث عنها وعرضها، وكلها مجانية!",
        "description_de": "BOORU XXX ist eine Hentai- und sichere Bildressource! Viele der besten Bilder zum Suchen und Ansehen, und das alles kostenlos!",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "4ca9ea0d",
        "name": "Hentai Booru - Anime and Hentai pictures",
        "url": "https://booru.eu",
        "category": "Anime Streaming",
        "description": "Booru.eu is a anime and hentai images board.",
        "description_es": "Booru.eu es un foro de imágenes de anime y hentai.",
        "description_jp": "Booru.eu はアニメとエロアニメの画像掲示板です。",
        "description_fr": "Booru.eu est un forum d'images d'anime et hentai.",
        "description_pt": "Booru.eu é um painel de imagens de anime e hentai.",
        "description_hi": "Booru.eu एक एनीमे और हेनतई इमेज बोर्ड है।",
        "description_ar": "Booru.eu هي لوحة صور أنيمي وهنتاي.",
        "description_de": "Booru.eu ist ein Anime- und Hentai-Bilderforum.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "f6fbb98e",
        "name": "Games - Free Sex Games, Online Porn Games, Hentai ",
        "url": "https://sandbox.gamecore.com",
        "category": "Hentai Streaming",
        "description": "Games - Adult Games. Free Sex Games, Online Porn Games, Hentai Games, XXX Games. Full Sex Games - Free Porn Games",
        "description_es": "Juegos - Juegos para adultos. Juegos de sexo gratis, juegos porno online, juegos hentai, juegos XXX. Juegos Sexuales Completos - Juegos Porno Gratis",
        "description_jp": "ゲーム - アダルト ゲーム。無料のセックス ゲーム、オンライン ポルノ ゲーム、変態ゲーム、XXX ゲーム。フルセックスゲーム - 無料ポルノゲーム",
        "description_fr": "Jeux - Jeux pour adultes. Jeux de sexe gratuits, jeux porno en ligne, jeux Hentai, jeux XXX. Jeux de sexe complets - Jeux porno gratuits",
        "description_pt": "Jogos - Jogos para adultos. Jogos sexuais grátis, jogos pornográficos online, jogos Hentai, jogos XXX. Jogos Sexuais Completos - Jogos Pornográficos Gratuitos",
        "description_hi": "खेल - वयस्क खेल. नि:शुल्क सेक्स गेम्स, ऑनलाइन पोर्न गेम्स, हेनतई गेम्स, XXX गेम्स। पूर्ण सेक्स खेल - मुफ्त अश्लील खेल",
        "description_ar": "العاب - العاب الكبار. ألعاب جنسية مجانية، ألعاب إباحية عبر الإنترنت، ألعاب هنتاي، ألعاب XXX. ألعاب الجنس الكامل - ألعاب إباحية مجانية",
        "description_de": "Spiele - Spiele für Erwachsene. Kostenlose Sexspiele, Online-Pornospiele, Hentai-Spiele, XXX-Spiele. Vollständige Sexspiele – kostenlose Pornospiele",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "82d56286",
        "name": "Hentai Bros - Your Home for New Hentai Streaming F",
        "url": "https://hentaibros.net",
        "category": "Anime Streaming",
        "description": "Hentaibros.net is a free hentai anime streaming site. We are the best place to stream new hentai anime online.",
        "description_es": "Hentaibros.net es un sitio gratuito de transmisión de anime hentai. Somos el mejor lugar para transmitir nuevos anime hentai en línea.",
        "description_jp": "Hentaibros.net は無料のエロアニメ ストリーミング サイトです。私たちは新しいエロアニメをオンラインでストリーミングするのに最適な場所です。",
        "description_fr": "Hentaibros.net est un site de streaming d’anime hentai gratuit. Nous sommes le meilleur endroit pour diffuser de nouveaux anime hentai en ligne.",
        "description_pt": "Hentaibros.net é um site de streaming de anime hentai gratuito. Somos o melhor lugar para transmitir novos animes hentai online.",
        "description_hi": "Hentaibros.net एक मुफ़्त हेनतई एनीमे स्ट्रीमिंग साइट है। हम नई हेनतई एनीमे को ऑनलाइन स्ट्रीम करने के लिए सबसे अच्छी जगह हैं।",
        "description_ar": "Hentaibros.net هو موقع مجاني لبث الأنمي الهنتاي. نحن أفضل مكان لبث الرسوم المتحركة الهنتاي الجديدة عبر الإنترنت.",
        "description_de": "Hentaibros.net ist eine kostenlose Hentai-Anime-Streaming-Seite. Wir sind der beste Ort, um neue Hentai-Anime online zu streamen.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "2b2fb152",
        "name": "Hentai Uncensored Porn (219482) - FUQ.com",
        "url": "https://www.fuq.com/category/hentai-uncensored",
        "category": "Hentai Streaming",
        "description": "Discover Hentai Uncensored Porn (219482) - FUQ.com - A high quality portal for your favorite content.",
        "description_es": "Descubre porno hentai sin censura (219482) - FUQ.com - Un portal de alta calidad para tu contenido favorito.",
        "description_jp": "変態無修正ポルノを発見 (219482) - FUQ.com - お気に入りのコンテンツのための高品質ポータル。",
        "description_fr": "Découvrez le porno hentai non censuré (219482) - FUQ.com - Un portail de haute qualité pour votre contenu préféré.",
        "description_pt": "Descubra Hentai Uncensored Porn (219482) - FUQ.com - Um portal de alta qualidade para seu conteúdo favorito.",
        "description_hi": "डिस्कवर हेंताई अनसेंसर्ड पोर्न (219482) - FUQ.com - आपकी पसंदीदा सामग्री के लिए एक उच्च गुणवत्ता वाला पोर्टल।",
        "description_ar": "اكتشف هنتاي الإباحية غير الخاضعة للرقابة (219482) - FUQ.com - بوابة عالية الجودة للمحتوى المفضل لديك.",
        "description_de": "Entdecken Sie Hentai Uncensored Porn (219482) – FUQ.com – Ein hochwertiges Portal für Ihre Lieblingsinhalte.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "a8bd779d",
        "name": "Giniro",
        "url": "https://erogedownload.com/downloads/giniro",
        "category": "Games & Visual Novels",
        "description": "Giniro is a beautifully crafted fantasy tale comprised of four chapters. It is a bittersweet story of the legendary Silver Thread which is fabled to g",
        "description_es": "Giniro es un cuento de fantasía bellamente elaborado que consta de cuatro capítulos. Es una historia agridulce del legendario hilo de plata que cuenta con la leyenda de g",
        "description_jp": "『銀色』は 4 つの章からなる美しく作られたファンタジー物語です。それは、伝説の銀の糸のほろ苦い物語です。",
        "description_fr": "Giniro est un conte fantastique magnifiquement conçu composé de quatre chapitres. C'est une histoire douce-amère du légendaire Fil d'Argent qui est légendaire pour g",
        "description_pt": "Giniro é um conto de fantasia lindamente elaborado composto por quatro capítulos. É uma história agridoce do lendário Silver Thread, que é lendário",
        "description_hi": "गिनिरो एक खूबसूरती से गढ़ी गई काल्पनिक कहानी है जिसमें चार अध्याय हैं। यह पौराणिक सिल्वर थ्रेड की एक खट्टी-मीठी कहानी है जो कि प्रसिद्ध है",
        "description_ar": "جينيرو هي قصة خيالية مصنوعة بشكل جميل وتتكون من أربعة فصول. إنها قصة حلوة ومرّة للخيط الفضي الأسطوري الذي يُحكى عن ز",
        "description_de": "Giniro ist eine wunderschön gestaltete Fantasy-Geschichte, die aus vier Kapiteln besteht. Es ist eine bittersüße Geschichte des legendären Silberfadens, der der Legende nach g",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "d7352df9",
        "name": "Recommended Free Hentai & Adult Games | EROLABS",
        "url": "https://www.ero-labs.com/en/games.html",
        "category": "Hentai Streaming",
        "description": "The sexiest uncensored porn games are at EROLABS! Available for both iOS/Android! Most popular hentai games and yaoi games! Limited only by your imagi",
        "description_es": "¡Los juegos porno sin censura más sexys están en EROLABS! ¡Disponible tanto para iOS como para Android! ¡Los juegos hentai y yaoi más populares! Limitado sólo por tu imagen.",
        "description_jp": "最もセクシーな無修正ポルノゲームはEROLABSにあります! iOS/Android両対応！最も人気のあるエロゲームとやおいゲーム!あなたのイマジネーションによってのみ制限されます",
        "description_fr": "Les jeux porno non censurés les plus sexy sont chez EROLABS ! Disponible pour iOS/Android ! Jeux hentai et jeux yaoi les plus populaires ! Limité uniquement par votre imagi",
        "description_pt": "Os jogos pornôs sem censura mais sexy estão no EROLABS! Disponível para iOS/Android! Jogos hentai e jogos yaoi mais populares! Limitado apenas pela sua imagem",
        "description_hi": "सबसे कामुक बिना सेंसर वाले अश्लील गेम EROLABS पर हैं! आईओएस/एंड्रॉइड दोनों के लिए उपलब्ध! सबसे लोकप्रिय हेनतई खेल और याओई खेल! केवल आपकी कल्पना तक सीमित",
        "description_ar": "الألعاب الإباحية الأكثر جاذبية غير الخاضعة للرقابة موجودة في EROLABS! متاح لكل من iOS/Android! ألعاب الهنتاي وألعاب الياوي الأكثر شعبية! محدودة فقط من خلال خيالك",
        "description_de": "Die heißesten unzensierten Pornospiele gibt es bei EROLABS! Verfügbar für iOS/Android! Die beliebtesten Hentai- und Yaoi-Spiele! Nur durch Ihre Vorstellungskraft begrenzt",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "ac74cf9a",
        "name": "Recommending - Top Corruption Games Ranked – My Pe",
        "url": "https://f95zone.to/threads/top-corruption-games-ranked-my-personal-favorites-and-recommendations.238423",
        "category": "Hentai Streaming",
        "description": "Hello everyone! In this post, I will list all the games I really enjoyed and evaluate them based on specific criteria. I’m creating this list both to ",
        "description_es": "¡Hola a todos! En esta publicación, enumeraré todos los juegos que realmente disfruté y los evaluaré según criterios específicos. Estoy creando esta lista tanto para",
        "description_jp": "こんにちは、みんな！この記事では、私が本当に楽しかったゲームをすべてリストし、特定の基準に基づいて評価します。私がこのリストを作成しているのは、次の両方の目的です。",
        "description_fr": "Bonjour à tous! Dans cet article, je vais lister tous les jeux que j'ai vraiment appréciés et les évaluer en fonction de critères spécifiques. Je crée cette liste à la fois pour",
        "description_pt": "Olá pessoal! Neste post vou listar todos os jogos que realmente gostei e avaliá-los com base em critérios específicos. Estou criando esta lista tanto para",
        "description_hi": "सभी को नमस्कार! इस पोस्ट में, मैं उन सभी खेलों की सूची बनाऊंगा जिनका मैंने वास्तव में आनंद लिया और विशिष्ट मानदंडों के आधार पर उनका मूल्यांकन करूंगा। मैं यह सूची दोनों के लिए बना रहा हूं",
        "description_ar": "أهلا بالجميع! في هذا المنشور، سأقوم بإدراج جميع الألعاب التي استمتعت بها حقًا وأقوم بتقييمها بناءً على معايير محددة. أقوم بإنشاء هذه القائمة لكليهما",
        "description_de": "Hallo zusammen! In diesem Beitrag werde ich alle Spiele auflisten, die mir wirklich Spaß gemacht haben, und sie anhand bestimmter Kriterien bewerten. Ich erstelle diese Liste, um beides zu tun",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "07e276c0",
        "name": "Top games tagged Eroge - itch.io",
        "url": "https://itch.io/games/tag-eroge",
        "category": "Games & Visual Novels",
        "description": "Find games tagged Eroge like The BloodRiver Saga: Retransmitter, My New Paranormal Life, Path of Desire: Cursed Chakra, Champion of Realms (18+), Scho",
        "description_es": "Encuentra juegos etiquetados Eroge como The BloodRiver Saga: Retransmitter, My New Paranormal Life, Path of Desire: Cursed Chakra, Champion of Realms (18+), Scho",
        "description_jp": "The BloodRiver Saga: Retransmitter、My New Paranormal Life、Path of Desire: Cursed Chakra、Champion of Realms (18+)、Scho などのエロゲのタグが付けられたゲームを見つけます",
        "description_fr": "Trouvez des jeux étiquetés Eroge comme The BloodRiver Saga: Retransmitter, My New Paranormal Life, Path of Desire: Cursed Chakra, Champion of Realms (18+), Scho",
        "description_pt": "Encontre jogos marcados com Eroge como The BloodRiver Saga: Retransmitter, My New Paranormal Life, Path of Desire: Cursed Chakra, Champion of Realms (18+), Scho",
        "description_hi": "द ब्लडरिवर सागा: रिट्रांसमीटर, माई न्यू पैरानॉर्मल लाइफ, पाथ ऑफ डिज़ायर: कर्स्ड चक्र, चैंपियन ऑफ रियलम्स (18+), स्को जैसे इरोज टैग किए गए गेम ढूंढें",
        "description_ar": "ابحث عن الألعاب الموسومة Eroge مثل The BloodRiver Saga: Retransmitter، My New Paranormal Life، Path of Desire: Cursed Chakra، Champion of Realms (18+)، Scho",
        "description_de": "Finden Sie Spiele mit den Tags Eroge wie The BloodRiver Saga: Retransmitter, My New Paranormal Life, Path of Desire: Cursed Chakra, Champion of Realms (18+), Scho",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "d80ba3bb",
        "name": "Eroge Download - Visual Novel Porn Games - BestPor",
        "url": "https://bestporngames.com/play/eroge-download",
        "category": "Hentai Streaming",
        "description": "ErogeDownload.com just might be your new favorite hentai game site. This site houses a catalog with thousands of premium hentai games and visual novel",
        "description_es": "ErogeDownload.com podría ser tu nuevo sitio favorito de juegos hentai. Este sitio alberga un catálogo con miles de juegos hentai y novelas visuales premium.",
        "description_jp": "EroticgeDownload.com はあなたの新しいお気に入りのエロゲーム サイトになるかもしれません。このサイトには、何千ものプレミアム エロゲームとビジュアル ノベルのカタログが掲載されています",
        "description_fr": "ErogeDownload.com pourrait bien être votre nouveau site de jeux hentai préféré. Ce site héberge un catalogue avec des milliers de jeux hentai et de romans visuels premium",
        "description_pt": "ErogeDownload.com pode ser o seu novo site de jogos hentai favorito. Este site abriga um catálogo com milhares de jogos hentai premium e novelas visuais",
        "description_hi": "ErogeDownload.com आपकी नई पसंदीदा हेनतई गेम साइट हो सकती है। इस साइट में हजारों प्रीमियम हेनतई गेम्स और दृश्य उपन्यासों की एक सूची है",
        "description_ar": "قد يكون موقع ErogeDownload.com هو موقع ألعاب الهنتاي الجديد المفضل لديك. يضم هذا الموقع كتالوجًا يضم الآلاف من ألعاب الهنتاي المتميزة والروايات المرئية",
        "description_de": "ErogeDownload.com könnte Ihre neue Lieblings-Hentai-Spieleseite sein. Diese Website enthält einen Katalog mit Tausenden von Premium-Hentai-Spielen und Visual Novels",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "375df3ac",
        "name": "Uncensored Hentai - Watch Free Uncensored Hentai",
        "url": "https://uncensoredhentai.xxx",
        "category": "Anime Streaming",
        "description": "Watch and download Uncensored Hentai - Watch Free Uncensored Hentai - Watch Free Uncensored hentai online plus Free download on mobile devices.",
        "description_es": "Mire y descargue Hentai sin censura - Ver hentai sin censura gratis - Vea hentai sin censura gratis en línea y descarga gratuita en dispositivos móviles.",
        "description_jp": "無修正エロアニメを見てダウンロード - 無料で無修正エロアニメを視聴 - オンラインで無料の無修正エロアニメを視聴プラス モバイルデバイスに無料でダウンロード。",
        "description_fr": "Regardez et téléchargez du Hentai non censuré - Regardez du Hentai non censuré gratuit - Regardez du hentai non censuré gratuit en ligne et téléchargez gratuitement sur les appareils mobiles.",
        "description_pt": "Assistir e baixar Hentai sem censura - Assistir Hentai sem censura grátis - Assistir hentai sem censura online grátis e download gratuito em dispositivos móveis.",
        "description_hi": "अनसेंसर्ड हेनतई देखें और डाउनलोड करें - मुफ्त बिना सेंसर वाली हेनतई देखें - मुफ्त बिना सेंसर वाली हेनतई ऑनलाइन देखें और मोबाइल उपकरणों पर मुफ्त डाउनलोड करें।",
        "description_ar": "مشاهدة وتنزيل هنتاي غير خاضعة للرقابة - مشاهدة هنتاي مجانية غير خاضعة للرقابة - مشاهدة هنتاي مجانية غير خاضعة للرقابة عبر الإنترنت بالإضافة إلى التنزيل المجاني على الأجهزة المحمولة.",
        "description_de": "Sehen Sie sich Uncensored Hentai an und laden Sie es herunter – Sehen Sie sich Free Uncensored Hentai an – Sehen Sie sich Free Uncensored Hentai online an und laden Sie es kostenlos auf Mobilgeräten herunter.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "8ef12266",
        "name": "Watch Hentai - Free Hentai Stream, English Subbed,",
        "url": "https://watchhentai.net",
        "category": "Anime Streaming",
        "description": "Watch hentai online and free download hd. stream online, daily releases uncensored, english subbed and dubbed, anime hentai porn in 720p and 1080p.",
        "description_es": "Mira hentai en línea y descarga gratis en alta definición. Transmite en línea, lanzamientos diarios sin censura, subtitulado y doblado en inglés, porno anime hentai en 720p y 1080p.",
        "description_jp": "オンラインでエロアニメを見て、HDを無料でダウンロードしてください。オンラインでストリーミング、毎日無修正、英語字幕と吹き替え、720p と 1080p のアニメ ヘンタイ ポルノをリリースします。",
        "description_fr": "Regardez du hentai en ligne et téléchargez gratuitement en HD. diffusez en ligne, des sorties quotidiennes non censurées, sous-titrées et doublées en anglais, du porno hentai animé en 720p et 1080p.",
        "description_pt": "Assistir hentai online e baixar grátis em HD. transmitir online, lançamentos diários sem censura, legendado e dublado em inglês, anime hentai pornô em 720p e 1080p.",
        "description_hi": "हेनतई ऑनलाइन देखें और मुफ्त डाउनलोड एचडी। ऑनलाइन स्ट्रीम करें, बिना सेंसर किए दैनिक रिलीज़, अंग्रेजी सबबेड और डब, एनीमे हेनतई पोर्न 720p और 1080p में।",
        "description_ar": "مشاهدة الهنتاي على الإنترنت وتنزيل مجاني عالي الدقة. دفق عبر الإنترنت، إصدارات يومية غير خاضعة للرقابة، مترجمة ومدبلجة باللغة الإنجليزية، أنيمي هنتاي الإباحية في 720p و 1080p.",
        "description_de": "Schauen Sie sich Hentai online an und laden Sie es kostenlos in HD herunter. Online-Streaming, tägliche Veröffentlichungen unzensiert, englische Untertitel und Synchronisation, Anime-Hentai-Pornos in 720p und 1080p.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "f00ab8c2",
        "name": "Hentai Games Download list | Page 2 - HSuki",
        "url": "https://www.h-suki.com/en/games?tagsin%5B%5D=52&pagenb=2",
        "category": "Hentai Streaming",
        "description": "Browse all hentai games available to download. Active filters:  Tags added | Scat",
        "description_es": "Explora todos los juegos hentai disponibles para descargar. Filtros activos: Etiquetas agregadas | Largarse",
        "description_jp": "ダウンロード可能なすべてのエロゲームを閲覧してください。アクティブなフィルター: タグが追加されました |スキャット",
        "description_fr": "Parcourez tous les jeux hentai disponibles en téléchargement. Filtres actifs : balises ajoutées | Scat",
        "description_pt": "Navegue por todos os jogos hentai disponíveis para download. Filtros ativos: Tags adicionadas | Scat",
        "description_hi": "डाउनलोड करने के लिए उपलब्ध सभी हेनतई गेम ब्राउज़ करें। सक्रिय फ़िल्टर: टैग जोड़े गए | गोबर",
        "description_ar": "تصفح جميع ألعاب الهنتاي المتاحة للتنزيل. المرشحات النشطة: تمت إضافة العلامات | طرد",
        "description_de": "Durchsuchen Sie alle zum Download verfügbaren Hentai-Spiele. Aktive Filter: Tags hinzugefügt | Scat",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "e3b16094",
        "name": "Steam's Best Hentai and Porn Games Ranked: 2026's ",
        "url": "https://punshome.com/steams-best-hentai-and-porn-games-ranked-2026s-best-list",
        "category": "Hentai Streaming",
        "description": "Discover the most popular porn games of 2026! From Steam bestsellers to hidden gems on Mopoga, we review the top-rated adult titles for every taste.",
        "description_es": "¡Descubre los juegos porno más populares de 2026! Desde los más vendidos de Steam hasta las joyas ocultas de Mopoga, revisamos los títulos para adultos mejor valorados para todos los gustos.",
        "description_jp": "2026 年に最も人気のあるポルノ ゲームを発見してください! Steam のベストセラーから Mopoga の隠れた名作まで、あらゆる好みに合わせて最高評価のアダルト タイトルをレビューします。",
        "description_fr": "Découvrez les jeux porno les plus populaires de 2026 ! Des best-sellers Steam aux joyaux cachés sur Mopoga, nous passons en revue les titres pour adultes les mieux notés pour tous les goûts.",
        "description_pt": "Descubra os jogos pornográficos mais populares de 2026! Dos best-sellers do Steam às joias escondidas no Mopoga, analisamos os títulos adultos mais bem avaliados para todos os gostos.",
        "description_hi": "2026 के सबसे लोकप्रिय पोर्न गेम्स की खोज करें! स्टीम बेस्टसेलर से लेकर मोपोगा पर छिपे हुए रत्नों तक, हम हर स्वाद के लिए शीर्ष रेटेड वयस्क शीर्षकों की समीक्षा करते हैं।",
        "description_ar": "اكتشف الألعاب الإباحية الأكثر شعبية لعام 2026! بدءًا من الكتب الأكثر مبيعًا على Steam ووصولاً إلى الجواهر المخفية على Mopoga، نقوم بمراجعة أفضل الألعاب للبالغين التي تناسب جميع الأذواق.",
        "description_de": "Entdecken Sie die beliebtesten Pornospiele des Jahres 2026! Von Steam-Bestsellern bis hin zu versteckten Schätzen auf Mopoga – wir bewerten die am besten bewerteten Erwachsenentitel für jeden Geschmack.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "7e7a4d57",
        "name": "Reddit Hentai & 661+ Reddit NSFW List Like R/Henta",
        "url": "https://theporndude.com/112/hentai",
        "category": "Hentai Streaming",
        "description": "r/Hentai! Looking to get your hot hentai fix without having to pay for a membership or deal with a ton of ads? Then hop over to Reddit.com/r/hentai to",
        "description_es": "r/Hentai! ¿Buscas obtener tu dosis de hentai caliente sin tener que pagar una membresía o lidiar con un montón de anuncios? Luego salta a Reddit.com/r/hentai para",
        "description_jp": "r/ヘンタイ！メンバーシップ料金を支払ったり、大量の広告に対処したりせずに、ホットなエロアニメ修正を入手したいですか?次に、Reddit.com/r/hentai に移動して、",
        "description_fr": "r/Hentaï ! Vous cherchez à obtenir votre solution hentai chaude sans avoir à payer un abonnement ou à gérer une tonne de publicités ? Rendez-vous ensuite sur Reddit.com/r/hentai pour",
        "description_pt": "r/Hentai! Quer obter sua dose de hentai quente sem ter que pagar por uma assinatura ou lidar com uma tonelada de anúncios? Então vá para Reddit.com/r/hentai para",
        "description_hi": "आर/हेनतई! क्या आप सदस्यता के लिए भुगतान किए बिना या ढेर सारे विज्ञापनों से निपटे बिना अपनी हॉट हेनतई फिक्स प्राप्त करना चाहते हैं? फिर Reddit.com/r/hendai पर जाएँ",
        "description_ar": "ص / هنتاي! هل تتطلع إلى الحصول على الهنتاي المثير الخاص بك دون الحاجة إلى الدفع مقابل العضوية أو التعامل مع عدد كبير من الإعلانات؟ ثم انتقل إلى Reddit.com/r/hentai",
        "description_de": "r/Hentai! Möchten Sie Ihren heißen Hentai-Kick bekommen, ohne für eine Mitgliedschaft bezahlen oder sich mit einer Menge Werbung herumschlagen zu müssen? Dann besuchen Sie Reddit.com/r/hentai",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "214f6723",
        "name": "Watch Dubbed Anime Online: Best Sites, Downloads .",
        "url": "https://videoconverter.wondershare.com/ai-video-enhancer-tips/dubbed-anime-sites.html",
        "category": "Anime Streaming",
        "description": "Check the best dubbed anime sites. These platforms can help you stream or even download engish dubbed animes for free in 2026.",
        "description_es": "Consulta los sitios de anime mejor doblados. Estas plataformas pueden ayudarte a transmitir o incluso descargar animes doblados en inglés de forma gratuita en 2026.",
        "description_jp": "最高の吹き替えアニメサイトをチェックしてください。これらのプラットフォームは、2026 年に英語吹き替えアニメを無料でストリーミングまたはダウンロードするのに役立ちます。",
        "description_fr": "Consultez les meilleurs sites d’anime doublés. Ces plateformes peuvent vous aider à diffuser ou même à télécharger gratuitement des animes doublés en anglais en 2026.",
        "description_pt": "Confira os melhores sites de animes dublados. Essas plataformas podem ajudá-lo a transmitir ou até mesmo baixar animes dublados em inglês gratuitamente em 2026.",
        "description_hi": "सर्वश्रेष्ठ डब की गई एनीमे साइटें जांचें। ये प्लेटफ़ॉर्म आपको 2026 में अंग्रेजी डब एनीमे को मुफ्त में स्ट्रीम करने या डाउनलोड करने में भी मदद कर सकते हैं।",
        "description_ar": "تعرف على أفضل مواقع الأنمي المدبلجة. يمكن أن تساعدك هذه المنصات على بث أو حتى تنزيل الرسوم المتحركة المدبلجة مجانًا في عام 2026.",
        "description_de": "Schauen Sie sich die besten synchronisierten Anime-Sites an. Diese Plattformen können Ihnen im Jahr 2026 dabei helfen, englisch synchronisierte Animes kostenlos zu streamen oder sogar herunterzuladen.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "b3cd279b",
        "name": "Translated Hentai Manga Porn Videos | Pornhub.com",
        "url": "https://www.pornhub.com/video/search?search=translated+hentai+manga",
        "category": "Hentai Streaming",
        "description": "Discover Translated Hentai Manga Porn Videos | Pornhub.com - A high quality portal for your favorite content.",
        "description_es": "Descubra vídeos porno hentai manga traducidos | Pornhub.com: un portal de alta calidad para tu contenido favorito.",
        "description_jp": "翻訳された変態マンガのポルノビデオを発見 | Pornhub.com - お気に入りのコンテンツのための高品質ポータル。",
        "description_fr": "Découvrez des vidéos porno traduites Hentai Manga | Pornhub.com - Un portail de haute qualité pour votre contenu préféré.",
        "description_pt": "Descubra vídeos pornôs de Hentai Manga traduzidos | Pornhub.com – Um portal de alta qualidade para o seu conteúdo favorito.",
        "description_hi": "अनूदित हेनतई मंगा अश्लील वीडियो खोजें | पोर्नहब.कॉम - आपकी पसंदीदा सामग्री के लिए एक उच्च गुणवत्ता वाला पोर्टल।",
        "description_ar": "اكتشف مقاطع الفيديو الإباحية المانغا الهنتاي المترجمة | Pornhub.com - بوابة عالية الجودة للمحتوى المفضل لديك.",
        "description_de": "Entdecken Sie übersetzte Hentai-Manga-Pornovideos | Pornhub.com – Ein hochwertiges Portal für Ihre Lieblingsinhalte.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "e181c630",
        "name": "A curated list of worldwide legal anime streaming.",
        "url": "https://github.com/otakulogy/anime-streaming",
        "category": "Anime Streaming",
        "description": "📺 A curated list of worldwide legal anime streaming. - otakulogy/anime-streaming",
        "description_es": "📺 Una lista seleccionada de transmisión de anime legal en todo el mundo. - otakulogía/transmisión de anime",
        "description_jp": "📺 世界中の合法的なアニメストリーミングの厳選リスト。 - オタク学/アニメストリーミング",
        "description_fr": "📺 Une liste organisée de streaming d'anime légal dans le monde entier. - otakulogie/anime-streaming",
        "description_pt": "📺 Uma lista com curadoria de streaming legal de anime em todo o mundo. - otakulogia/streaming de anime",
        "description_hi": "📺 दुनिया भर में कानूनी एनीमे स्ट्रीमिंग की एक क्यूरेटेड सूची। - ओटाकुलोजी/एनीमे-स्ट्रीमिंग",
        "description_ar": "📺 قائمة منسقة لبث الأنمي القانوني في جميع أنحاء العالم. - علم الأذن / تدفق الأنمي",
        "description_de": "📺 Eine kuratierte Liste weltweiter legaler Anime-Streams. - Otakulogie/Anime-Streaming",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "191f8464",
        "name": "Hentai online for everyone on AniHentai - Videos i",
        "url": "https://anihentai.com",
        "category": "Hentai Streaming",
        "description": "Discover the ecstasy of hentai online, where barriers fade away 【Enter here】 Start your journey of unparalleled excitement and satisfaction 🔥",
        "description_es": "Descubre el éxtasis del hentai online, donde las barreras se desvanecen 【Entra aquí】 Comienza tu viaje de emoción y satisfacción incomparable 🔥",
        "description_jp": "障壁が消えていく、オンラインでエロアニメのエクスタシーを発見してください 【ここからエントリーしてください】 比類のない興奮と満足の旅を始めましょう 🔥",
        "description_fr": "Découvrez l'extase du hentai en ligne, où les barrières disparaissent 【Entrez ici】 Commencez votre voyage d'excitation et de satisfaction sans précédent 🔥",
        "description_pt": "Descubra o êxtase do hentai online, onde as barreiras desaparecem 【Entre aqui】 Comece sua jornada de excitação e satisfação incomparáveis ​​🔥",
        "description_hi": "हेनतई के आनंद को ऑनलाइन खोजें, जहां बाधाएं दूर हो जाती हैं 【यहां प्रवेश करें】 अद्वितीय उत्साह और संतुष्टि की अपनी यात्रा शुरू करें 🔥",
        "description_ar": "اكتشف نشوة الهنتاي عبر الإنترنت، حيث تتلاشى الحواجز 【ادخل هنا】 ابدأ رحلتك من الإثارة والرضا الذي لا مثيل له 🔥",
        "description_de": "Entdecken Sie die Ekstase von Hentai online, wo Barrieren verschwinden. 【Hier eintreten】 Beginnen Sie Ihre Reise der unvergleichlichen Spannung und Zufriedenheit 🔥",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "3cb5cfcf",
        "name": "VisualNovel - ANDROID APK ADULT GAMES",
        "url": "https://androidadult.com/tag/visualnovel",
        "category": "Hentai Streaming",
        "description": "Discover VisualNovel - ANDROID APK ADULT GAMES - A high quality portal for your favorite content.",
        "description_es": "Descubre VisualNovel - JUEGOS PARA ADULTOS ANDROID APK - Un portal de alta calidad para tu contenido favorito.",
        "description_jp": "VisualNovel - ANDROID APK ADULT GAMES - お気に入りのコンテンツの高品質ポータルを発見してください。",
        "description_fr": "Découvrez VisualNovel - ANDROID APK JEUX POUR ADULTES - Un portail de haute qualité pour votre contenu préféré.",
        "description_pt": "Descubra VisualNovel - ANDROID APK JOGOS ADULTOS - Um portal de alta qualidade para seus conteúdos favoritos.",
        "description_hi": "विज़ुअलनोवेल खोजें - एंड्रॉइड एपीके एडल्ट गेम्स - आपकी पसंदीदा सामग्री के लिए एक उच्च गुणवत्ता वाला पोर्टल।",
        "description_ar": "اكتشف VisualNovel - ANDROID APK ADULT GAMES - بوابة عالية الجودة للمحتوى المفضل لديك.",
        "description_de": "Entdecken Sie VisualNovel – ANDROID APK-SPIELE FÜR ERWACHSENE – Ein hochwertiges Portal für Ihre Lieblingsinhalte.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "b20da94e",
        "name": "Eroge Download - Page 20 of 142 - English visual n",
        "url": "https://erogedownload.com/page/20",
        "category": "Games & Visual Novels",
        "description": "English visual novel downloads",
        "description_es": "Descargas de novelas visuales en inglés.",
        "description_jp": "英語のビジュアルノベルのダウンロード",
        "description_fr": "Téléchargements de romans visuels en anglais",
        "description_pt": "Downloads de novelas visuais em inglês",
        "description_hi": "अंग्रेजी दृश्य उपन्यास डाउनलोड",
        "description_ar": "تحميل روايات مرئية انجليزية",
        "description_de": "Englische Visual Novel-Downloads",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "b202741f",
        "name": "Top Hentai Games on Steam",
        "url": "https://steam250.com/tag/hentai",
        "category": "Hentai Streaming",
        "description": "Helping you find good games on Steam: impartial games rankings compiled from Steam gamer reviews.",
        "description_es": "Ayudándote a encontrar buenos juegos en Steam: clasificaciones de juegos imparciales compiladas a partir de reseñas de jugadores de Steam.",
        "description_jp": "Steam で良いゲームを見つけるのに役立ちます: Steam ゲーマーのレビューから編集された公平なゲーム ランキング。",
        "description_fr": "Vous aider à trouver de bons jeux sur Steam : classements de jeux impartiaux compilés à partir des avis des joueurs Steam.",
        "description_pt": "Ajudando você a encontrar bons jogos no Steam: classificações imparciais de jogos compiladas a partir de análises de jogadores do Steam.",
        "description_hi": "स्टीम पर अच्छे गेम ढूंढने में आपकी सहायता करना: स्टीम गेमर समीक्षाओं से संकलित निष्पक्ष गेम रैंकिंग।",
        "description_ar": "مساعدتك في العثور على ألعاب جيدة على Steam: تصنيفات محايدة للألعاب تم تجميعها من تقييمات ألعاب Steam.",
        "description_de": "Wir helfen Ihnen dabei, gute Spiele auf Steam zu finden: unparteiische Spiele-Ranglisten, zusammengestellt aus Steam-Spielerbewertungen.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "8e8a1d23",
        "name": "Top HTML5 games tagged Hentai",
        "url": "https://itch.io/games/html5/tag-hentai",
        "category": "Hentai Streaming",
        "description": "Find HTML5 games tagged Hentai like My New Paranormal Life, !Î© Factorial Omega: My Dystopian Robot Girlfriend, My X Bounty, SAKI'S SLUTTY STRIPTEASE ",
        "description_es": "Encuentra juegos HTML5 etiquetados Hentai como My New Paranormal Life, !Î© Factorial Omega: My Dystopian Robot Girlfriend, My X Bounty, SAKI'S SLUTTY STRIPTEASE",
        "description_jp": "My New Paranormal Life、!Î© Factorial Omega: My Dystopian Robot Girlfriend、My X Bounty、SAKI'S SLUTTY STRIPTEASE など、ヘンタイのタグが付いた HTML5 ゲームを見つけます。",
        "description_fr": "Trouvez des jeux HTML5 étiquetés Hentai comme My New Paranormal Life, !Î© Factorial Omega: My Dystopian Robot Girlfriend, My X Bounty, SAKI'S SLUTTY STRIPTEASE",
        "description_pt": "Encontre jogos HTML5 marcados como Hentai como My New Paranormal Life, !Î© Factorial Omega: My Dystopian Robot Girlfriend, My X Bounty, SAKI'S SLUTTY STRIPTEASE",
        "description_hi": "माई न्यू पैरानॉर्मल लाइफ, !Î© फैक्टोरियल ओमेगा: माई डायस्टोपियन रोबोट गर्लफ्रेंड, माई एक्स बाउंटी, साकीज़ स्लट्टी स्ट्रिपटीज़ जैसे हेनतई टैग वाले HTML5 गेम खोजें",
        "description_ar": "ابحث عن ألعاب HTML5 الموسومة بـ Hentai مثل My New Paranormal Life، !Î© Factorial Omega: My Dystopian Robot Girlfriend، My X Bounty، SAKI'S SLUTTY STRIPTEASE",
        "description_de": "Finden Sie HTML5-Spiele mit den Tags „Hentai“ wie „My New Paranormal Life“, „!Î© Factorial Omega: My Dystopian Robot Girlfriend“, „My X Bounty“ und „SAKI'S SLUTTY STRIPTEASE“.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "546600ed",
        "name": "FAQ - Eroge Download",
        "url": "https://erogedownload.com/faq",
        "category": "Games & Visual Novels",
        "description": "Installing DAEMON Tools Mounting CD images with DAEMON Tools Installing Japanese support (XP Vista 7) Game-specific installation instructions/Error fi",
        "description_es": "Instalación de DAEMON Tools Montaje de imágenes de CD con DAEMON Tools Instalación de soporte japonés (XP Vista 7) Instrucciones de instalación específicas del juego/Error fi",
        "description_jp": "DAEMON Tools のインストール DAEMON Tools を使用した CD イメージのマウント 日本語サポートのインストール (XP Vista 7) ゲーム固有のインストール手順/エラー fi",
        "description_fr": "Installation de DAEMON Tools Montage d'images de CD avec DAEMON Tools Installation du support japonais (XP Vista 7) Instructions d'installation spécifiques au jeu/Fi d'erreur",
        "description_pt": "Instalando o DAEMON Tools Montando imagens de CD com o DAEMON Tools Instalando o suporte em japonês (XP Vista 7) Instruções de instalação específicas do jogo/Erro fi",
        "description_hi": "डेमॉन टूल्स इंस्टॉल करना डेमॉन टूल्स के साथ सीडी इमेज माउंट करना जापानी सपोर्ट इंस्टॉल करना (एक्सपी विस्टा 7) गेम-विशिष्ट इंस्टॉलेशन निर्देश/त्रुटि फाई",
        "description_ar": "تثبيت DAEMON Tools تثبيت صور القرص المضغوط باستخدام DAEMON Tools تثبيت الدعم الياباني (XP Vista 7) تعليمات التثبيت الخاصة باللعبة/خطأ في",
        "description_de": "DAEMON Tools installieren CD-Images mit DAEMON Tools mounten Japanische Unterstützung installieren (XP Vista 7) Spielspezifische Installationsanweisungen/Fehlermeldungen",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "332c484d",
        "name": "AnimeKai - Watch Free Anime Online, Stream Subbed ",
        "url": "https://anikai.to",
        "category": "Anime Streaming",
        "description": "AnimeKai is the best website to watch anime online for free, watch anime with DUB, SUB in HD. WATCH NOW! No Ads GUARANTEED!",
        "description_es": "AnimeKai es el mejor sitio web para ver anime online gratis, mira anime con DUB, SUB en HD. ¡MIRA AHORA! ¡Sin anuncios GARANTIZADOS!",
        "description_jp": "AnimeKai は、オンラインでアニメを無料で視聴したり、HD の DUB、SUB でアニメを視聴したりするのに最適なウェブサイトです。今すぐ見てください！広告は一切保証されません!",
        "description_fr": "AnimeKai est le meilleur site Web pour regarder des anime en ligne gratuitement, regarder des anime avec DUB, SUB en HD. REGARDEZ MAINTENANT ! Aucune publicité GARANTIE !",
        "description_pt": "AnimeKai é o melhor site para assistir anime online gratuitamente, assistir anime com DUB, SUB em HD. ASSISTA AGORA! Nenhum anúncio GARANTIDO!",
        "description_hi": "एनीमेकाई मुफ्त में ऑनलाइन एनीमे देखने के लिए सबसे अच्छी वेबसाइट है, एनीमे को एचडी में डब, सब के साथ देखें। अब देखिए! कोई विज्ञापन गारंटी नहीं!",
        "description_ar": "AnimeKai هو أفضل موقع لمشاهدة الرسوم المتحركة عبر الإنترنت مجانًا، شاهد الرسوم المتحركة مع DUB، SUB بدقة عالية. شاهد الآن! لا إعلانات مضمونة!",
        "description_de": "AnimeKai ist die beste Website, um Anime kostenlos online anzusehen, Anime mit DUB, SUB in HD. JETZT ANSEHEN! Keine Werbung GARANTIERT!",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "94437b72",
        "name": "Free Hentai Uncensored Tube | Big Tits Porn & Way ",
        "url": "https://www.melonstube.com/category/hentai-uncensored",
        "category": "Hentai Streaming",
        "description": "Discover Free Hentai Uncensored Tube | Big Tits Porn & Way More! - A high quality portal for your favorite content.",
        "description_es": "Descubra el tubo hentai gratuito sin censura | ¡Porno de tetas grandes y mucho más! - Un portal de alta calidad para tu contenido favorito.",
        "description_jp": "無料のエロアニメ無修正チューブを発見 |巨乳ポルノとその他多数! - お気に入りのコンテンツのための高品質ポータル。",
        "description_fr": "Découvrez le tube Hentai gratuit non censuré | Porno à gros seins et bien plus encore ! - Un portail de haute qualité pour votre contenu préféré.",
        "description_pt": "Descubra tubo Hentai sem censura grátis | Pornô de peitos grandes e muito mais! - Um portal de alta qualidade para o seu conteúdo favorito.",
        "description_hi": "मुफ़्त हेनतई बिना सेंसर वाली ट्यूब खोजें | बड़े स्तन अश्लील और बहुत कुछ! - आपकी पसंदीदा सामग्री के लिए एक उच्च गुणवत्ता वाला पोर्टल।",
        "description_ar": "اكتشف أنبوب هنتاي المجاني غير الخاضع للرقابة | إباحية بزاز كبيرة والمزيد! - بوابة عالية الجودة للمحتوى المفضل لديك.",
        "description_de": "Entdecken Sie die kostenlose unzensierte Hentai-Tube | Pornos mit großen Titten und noch viel mehr! - Ein hochwertiges Portal für Ihre Lieblingsinhalte.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "a397b912",
        "name": "Booru & 51+ Hentai Porn Sites Sites like",
        "url": "https://hentaisites.com/hentai-porn-sites/booru",
        "category": "Hentai Streaming",
        "description": "Booru.org/top presents imageboards and lets you create your own and share them with the community. All of it is free, and you sure need to check out t",
        "description_es": "Booru.org/top presenta tableros de imágenes y te permite crear los tuyos propios y compartirlos con la comunidad. Todo es gratis y seguro que debes comprobarlo.",
        "description_jp": "Booru.org/top にはイメージボードが用意されており、独自のイメージボードを作成してコミュニティと共有できます。すべて無料ですので、ぜひチェックしてみてください",
        "description_fr": "Booru.org/top présente des tableaux d'images et vous permet de créer les vôtres et de les partager avec la communauté. Tout cela est gratuit et vous devez absolument y jeter un coup d'œil.",
        "description_pt": "Booru.org/top apresenta imageboards e permite criar os seus próprios e compartilhá-los com a comunidade. Tudo isso é gratuito e você com certeza precisa conferir",
        "description_hi": "Booru.org/top इमेजबोर्ड प्रस्तुत करता है और आपको अपना खुद का इमेजबोर्ड बनाने और उन्हें समुदाय के साथ साझा करने की सुविधा देता है। यह सब मुफ़्त है, और आपको निश्चित रूप से इसे जांचना होगा",
        "description_ar": "يقدم Booru.org/top لوحات الصور ويتيح لك إنشاء لوحات الصور الخاصة بك ومشاركتها مع المجتمع. كل ذلك مجاني، ومن المؤكد أنك بحاجة إلى التحقق من ذلك",
        "description_de": "Booru.org/top präsentiert Imageboards und ermöglicht es Ihnen, eigene zu erstellen und diese mit der Community zu teilen. Alles ist kostenlos und Sie müssen es unbedingt ausprobieren",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "1fa28091",
        "name": "List of eroge - Wikipedia",
        "url": "https://en.wikipedia.org/wiki/List_of_eroge",
        "category": "Games & Visual Novels",
        "description": "Discover List of eroge - Wikipedia - A high quality portal for your favorite content.",
        "description_es": "Descubre la Lista de eroge - Wikipedia - Un portal de alta calidad para tu contenido favorito.",
        "description_jp": "エロゲのリストを発見 - Wikipedia - お気に入りのコンテンツのための高品質ポータル。",
        "description_fr": "Découvrez la liste des eroge - Wikipédia - Un portail de haute qualité pour votre contenu préféré.",
        "description_pt": "Descubra a lista de eroge - Wikipedia - Um portal de alta qualidade para seu conteúdo favorito.",
        "description_hi": "इरोज की सूची खोजें - विकिपीडिया - आपकी पसंदीदा सामग्री के लिए एक उच्च गुणवत्ता वाला पोर्टल।",
        "description_ar": "اكتشف قائمة eroge - ويكيبيديا - بوابة عالية الجودة للمحتوى المفضل لديك.",
        "description_de": "Entdecken Sie die Eroge-Liste – Wikipedia – Ein hochwertiges Portal für Ihre Lieblingsinhalte.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "84519b47",
        "name": "HentaiRead & 24+ Hentai Manga Sites Like Hentairea",
        "url": "https://theporndude.com/6159/hentairead",
        "category": "Hentai Streaming",
        "description": "HentaiRead.Com is a fantastic smut website that’s filled to the brim with free high-quality hentai mangas, both new and old. These comics are",
        "description_es": "HentaiRead.Com es un fantástico sitio web obsceno que está repleto de mangas hentai gratuitos de alta calidad, tanto nuevos como antiguos. Estos cómics son",
        "description_jp": "HentaiRead.Com は、新しいものから古いものまで、無料の高品質なエロ漫画が満載の素晴らしいエロ ウェブサイトです。これらの漫画は、",
        "description_fr": "HentaiRead.Com est un fantastique site Web pornographique qui regorge de mangas hentai gratuits de haute qualité, nouveaux et anciens. Ces bandes dessinées sont",
        "description_pt": "HentaiRead.Com é um site fantástico e obsceno, repleto de mangás hentai gratuitos de alta qualidade, novos e antigos. Esses quadrinhos são",
        "description_hi": "HentaiRead.Com एक शानदार अश्लील वेबसाइट है जो मुफ्त उच्च गुणवत्ता वाले नए और पुराने दोनों तरह के हेनतई मंगाओं से भरी हुई है। ये कॉमिक्स हैं",
        "description_ar": "HentaiRead.Com هو موقع ويب رائع مليء بالمانغا الهنتاي المجانية عالية الجودة، الجديدة والقديمة. هذه القصص المصورة هي",
        "description_de": "HentaiRead.Com ist eine fantastische Schmutzwebsite, die randvoll mit kostenlosen, hochwertigen Hentai-Mangas, sowohl neuen als auch alten, ist. Diese Comics sind",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "9c4b2ca8",
        "name": "TheBestHentai.com - Best Hentai & Porn Games List",
        "url": "https://thebesthentai.com",
        "category": "Hentai Streaming",
        "description": "Hey, dude! Welcome to the site with the best, and most importantly, 100% free porn games! Does the word “hentai” mean something to you? Today it’s one",
        "description_es": "¡Oye, amigo! ¡Bienvenido al sitio con los mejores, y lo más importante, juegos porno 100% gratuitos! ¿La palabra “hentai” significa algo para ti? hoy es uno",
        "description_jp": "おい、おい！最高の、そして最も重要なことに、100% 無料のポルノ ゲームを備えたサイトへようこそ!あなたにとって「ヘンタイ」という言葉には何か意味がありますか？今日はその一つです",
        "description_fr": "Hé, mec ! Bienvenue sur le site proposant les meilleurs jeux porno, et surtout, 100% gratuits ! Le mot « hentai » vous dit quelque chose ? Aujourd'hui c'en est un",
        "description_pt": "Ei, cara! Bem-vindo ao site com os melhores e, o mais importante, jogos pornográficos 100% gratuitos! A palavra “hentai” significa algo para você? Hoje é um",
        "description_hi": "अरे यार! सर्वोत्तम, और सबसे महत्वपूर्ण, 100% मुफ्त पोर्न गेम वाली साइट पर आपका स्वागत है! क्या \"हेनतई\" शब्द का आपके लिए कोई मतलब है? आज यह एक है",
        "description_ar": "يا صاح! مرحبًا بك في موقع أفضل الألعاب الإباحية المجانية والأهم من ذلك بنسبة 100%! هل تعني كلمة \"هنتاي\" شيئاً بالنسبة لك؟ اليوم هو واحد",
        "description_de": "Hey, Alter! Willkommen auf der Seite mit den besten und vor allem 100 % kostenlosen Pornospielen! Sagt Ihnen das Wort „Hentai“ etwas? Heute ist es einer",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "007124f3",
        "name": "Visual Novel Adult Games | FAP-Nation",
        "url": "https://fap-nation.com/tag/visual-novel",
        "category": "Hentai Streaming",
        "description": "Visual Novel Adult Games on FAP-Nation. Browse our vast collection of Sex Games and Adult Visual Novels. Download for free the best Visual Novel Adult",
        "description_es": "Juegos de novelas visuales para adultos en FAP-Nation. Explora nuestra amplia colección de juegos sexuales y novelas visuales para adultos. Descarga gratis la mejor Novela Visual para Adultos",
        "description_jp": "FAP-Nation のビジュアルノベル アダルト ゲーム。セックス ゲームとアダルト ビジュアル ノベルの膨大なコレクションをご覧ください。最高のアダルトビジュアルノベルを無料でダウンロード",
        "description_fr": "Jeux visuels pour adultes sur FAP-Nation. Parcourez notre vaste collection de jeux sexuels et de romans visuels pour adultes. Téléchargez gratuitement le meilleur Visual Novel Adulte",
        "description_pt": "Jogos para adultos de romance visual na FAP-Nation. Navegue pela nossa vasta coleção de jogos sexuais e romances visuais para adultos. Baixe gratuitamente o melhor Visual Novel Adulto",
        "description_hi": "एफएपी-नेशन पर दृश्य उपन्यास वयस्क खेल। सेक्स गेम्स और वयस्क दृश्य उपन्यासों के हमारे विशाल संग्रह को ब्राउज़ करें। सर्वश्रेष्ठ दृश्य उपन्यास वयस्क को निःशुल्क डाउनलोड करें",
        "description_ar": "ألعاب الرواية المرئية للبالغين على FAP-Nation. تصفح مجموعتنا الواسعة من الألعاب الجنسية والروايات المرئية للبالغين. قم بتنزيل أفضل رواية مرئية للكبار مجانًا",
        "description_de": "Visual Novel-Spiele für Erwachsene auf FAP-Nation. Stöbern Sie in unserer umfangreichen Sammlung von Sexspielen und Bildromanen für Erwachsene. Laden Sie kostenlos den besten Visual Novel Adult herunter",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "358ff949",
        "name": "Eroge! H mo Game mo Kaihatsu Zanmai Episode 2 Raw",
        "url": "https://muchohentai.com/avH6Dh/17616",
        "category": "Hentai Streaming",
        "description": "発売日：111125",
        "description_es": "Fecha de lanzamiento: 111125",
        "description_jp": "発売日：111125",
        "description_fr": "Date de sortie : 111125",
        "description_pt": "Data de lançamento: 111125",
        "description_hi": "रिलीज़ दिनांक: 111125",
        "description_ar": "تاريخ الإصدار: 111125",
        "description_de": "Erscheinungsdatum: 111125",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "95fb6ffd",
        "name": "Sign In",
        "url": "https://store.steampowered.com/bundle/27353/Best_Adult_Visual_Novels",
        "category": "Hentai Streaming",
        "description": "Discover Sign In - A high quality portal for your favorite content.",
        "description_es": "Descubrir Iniciar sesión: un portal de alta calidad para su contenido favorito.",
        "description_jp": "Discover Sign In - お気に入りのコンテンツのための高品質ポータル。",
        "description_fr": "Découvrez Connectez-vous - Un portail de haute qualité pour votre contenu préféré.",
        "description_pt": "Discover Sign In - Um portal de alta qualidade para seu conteúdo favorito.",
        "description_hi": "डिस्कवर साइन इन - आपकी पसंदीदा सामग्री के लिए एक उच्च गुणवत्ता वाला पोर्टल।",
        "description_ar": "اكتشاف تسجيل الدخول - بوابة عالية الجودة للمحتوى المفضل لديك.",
        "description_de": "Entdecken Sie „Anmelden“ – ein hochwertiges Portal für Ihre Lieblingsinhalte.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "ccabb0af",
        "name": "Hentai20.io - Read Webtoon 18+",
        "url": "https://hentai20.io",
        "category": "Hentai Streaming",
        "description": "Read hentai manga, hentai comics, hentai manhwa online without annoying ads",
        "description_es": "Lea manga hentai, cómics hentai, manhwa hentai en línea sin anuncios molestos",
        "description_jp": "迷惑な広告なしでエロ漫画、エロ漫画、エロ漫画をオンラインで読む",
        "description_fr": "Lisez des mangas hentai, des bandes dessinées hentai, des manhwa hentai en ligne sans publicités ennuyeuses",
        "description_pt": "Leia mangá hentai, quadrinhos hentai, manhwa hentai online sem anúncios irritantes",
        "description_hi": "कष्टप्रद विज्ञापनों के बिना हेनतई मंगा, हेनतई कॉमिक्स, हेनतई मैनहवा ऑनलाइन पढ़ें",
        "description_ar": "اقرأ مانغا هنتاي، كاريكاتير هنتاي، مانهوا هنتاي على الإنترنت دون إعلانات مزعجة",
        "description_de": "Lesen Sie Hentai-Manga, Hentai-Comics und Hentai-Manhwa online ohne lästige Werbung",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "be5f001a",
        "name": "Hentai Haven | Watch Free HD Hentai Online, Englis",
        "url": "https://hentaihaven.xxx",
        "category": "Anime Streaming",
        "description": "Watch the best hentai online free in HD on Hentai Haven. Stream uncensored, English subbed episodes in 720p/1080p. New releases every day.",
        "description_es": "Mira el mejor hentai online gratis en HD en Hentai Haven. Transmita episodios subtitulados en inglés y sin censura en 720p/1080p. Nuevos lanzamientos todos los días.",
        "description_jp": "Hentai Haven で最高のエロアニメを HD でオンラインで無料でご覧ください。無修正の英語字幕付きエピソードを 720p/1080p でストリーミングします。毎日新しいリリースがリリースされます。",
        "description_fr": "Regardez le meilleur hentai en ligne gratuitement en HD sur Hentai Haven. Diffusez des épisodes non censurés sous-titrés en anglais en 720p/1080p. Des nouveautés chaque jour.",
        "description_pt": "Assista ao melhor hentai online gratuitamente em HD no Hentai Haven. Transmita episódios legendados em inglês sem censura em 720p/1080p. Novos lançamentos todos os dias.",
        "description_hi": "हेनतई हेवन पर एचडी में सर्वश्रेष्ठ हेनतई ऑनलाइन मुफ़्त देखें। 720p/1080p में बिना सेंसर, अंग्रेजी सब्ड एपिसोड स्ट्रीम करें। हर दिन नई रिलीज़.",
        "description_ar": "شاهد أفضل الهنتاي على الإنترنت مجانًا بدقة عالية على Hentai Haven. يمكنك بث حلقات مترجمة باللغة الإنجليزية غير خاضعة للرقابة بدقة 720 بكسل/1080 بكسل. الإصدارات الجديدة كل يوم.",
        "description_de": "Sehen Sie sich die besten Hentai kostenlos online in HD auf Hentai Haven an. Streamen Sie unzensierte Episoden mit englischen Untertiteln in 720p/1080p. Jeden Tag neue Veröffentlichungen.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "f3f19505",
        "name": "Hentai Games Download list | HSuki",
        "url": "https://www.h-suki.com/en/games",
        "category": "Hentai Streaming",
        "description": "Browse all hentai games available to download.",
        "description_es": "Explora todos los juegos hentai disponibles para descargar.",
        "description_jp": "ダウンロード可能なすべてのエロゲームを閲覧してください。",
        "description_fr": "Parcourez tous les jeux hentai disponibles en téléchargement.",
        "description_pt": "Navegue por todos os jogos hentai disponíveis para download.",
        "description_hi": "डाउनलोड करने के लिए उपलब्ध सभी हेनतई गेम ब्राउज़ करें।",
        "description_ar": "تصفح جميع ألعاب الهنتاي المتاحة للتنزيل.",
        "description_de": "Durchsuchen Sie alle zum Download verfügbaren Hentai-Spiele.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "d585f035",
        "name": "Best Uncensored Hentai Reddit - AliExpress",
        "url": "https://www.aliexpress.com/w/wholesale-best-uncensored-hentai-reddit.html",
        "category": "Hentai Streaming",
        "description": "Discover where to find the best uncensored hentai on Reddit, including top subreddits, access tips, and user insights for a safe and compliant experie",
        "description_es": "Descubra dónde encontrar el mejor hentai sin censura en Reddit, incluidos los principales subreddits, consejos de acceso e información del usuario para una experiencia segura y que cumpla con las normas.",
        "description_jp": "トップのサブレディット、アクセスのヒント、安全でコンプライアンスに準拠したエクスペリエンスのためのユーザー インサイトなど、Reddit で最高の無修正エロアニメを見つける場所を見つけてください。",
        "description_fr": "Découvrez où trouver le meilleur hentai non censuré sur Reddit, y compris les meilleurs subreddits, des conseils d'accès et des informations sur les utilisateurs pour une expérience sûre et conforme.",
        "description_pt": "Descubra onde encontrar o melhor hentai sem censura no Reddit, incluindo os principais subreddits, dicas de acesso e informações do usuário para uma experiência segura e compatível",
        "description_hi": "जानें कि Reddit पर सर्वश्रेष्ठ बिना सेंसर वाली हेनतई कहां मिलेगी, जिसमें एक सुरक्षित और अनुपालन अनुभव के लिए शीर्ष सबरेडिट, एक्सेस युक्तियाँ और उपयोगकर्ता अंतर्दृष्टि शामिल हैं।",
        "description_ar": "اكتشف مكان العثور على أفضل الهنتاي غير الخاضعة للرقابة على Reddit، بما في ذلك أفضل المنتديات الفرعية ونصائح الوصول ورؤى المستخدم لتجربة آمنة ومتوافقة",
        "description_de": "Entdecken Sie, wo Sie auf Reddit das beste unzensierte Hentai finden, einschließlich der besten Subreddits, Zugriffstipps und Benutzereinblicke für ein sicheres und gesetzeskonformes Erlebnis",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "13c364bd",
        "name": "【RAW】 - MuchoHentai",
        "url": "https://muchohentai.com/series/raw",
        "category": "Hentai Streaming",
        "description": "Discover 【RAW】 - MuchoHentai - A high quality portal for your favorite content.",
        "description_es": "Descubre 【RAW】 - MuchoHentai - Un portal de alta calidad para tu contenido favorito.",
        "description_jp": "Discover 【RAW】 - MuchoHentai - お気に入りのコンテンツのための高品質ポータル。",
        "description_fr": "Découvrez 【RAW】 - MuchoHentai - Un portail de haute qualité pour votre contenu préféré.",
        "description_pt": "Descubra 【RAW】 - MuchoHentai - Um portal de alta qualidade para seu conteúdo favorito.",
        "description_hi": "डिस्कवर 【RAW】 - मुचोहेंटाई - आपकी पसंदीदा सामग्री के लिए एक उच्च गुणवत्ता वाला पोर्टल।",
        "description_ar": "اكتشف 【RAW】 - MuchoHentai - بوابة عالية الجودة للمحتوى المفضل لديك.",
        "description_de": "Entdecken Sie „RAW“ – MuchoHentai – ein hochwertiges Portal für Ihre Lieblingsinhalte.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "69648221",
        "name": "Im having dificulty to download games in parts - E",
        "url": "https://erogegames.com/forums/topic/5657-im-having-dificulty-to-download-games-in-parts",
        "category": "Games & Visual Novels",
        "description": "When i download a game separately, i need to dowload all the parts before i play? Because i dowloded 2 parts of a game and when i try to extract file ",
        "description_es": "Cuando descargo un juego por separado, ¿tengo que descargar todas las partes antes de jugar? Porque descargué 2 partes de un juego y cuando intento extraer el archivo",
        "description_jp": "ゲームを個別にダウンロードする場合、プレイする前にすべての部分をダウンロードする必要がありますか?ゲームの 2 つの部分をダウンロードしたため、ファイルを抽出しようとすると",
        "description_fr": "Lorsque je télécharge un jeu séparément, dois-je télécharger toutes les parties avant de jouer ? Parce que j'ai téléchargé 2 parties d'un jeu et quand j'essaye d'extraire le fichier",
        "description_pt": "Quando baixo um jogo separadamente, preciso baixar todas as partes antes de jogar? Porque baixei 2 partes de um jogo e quando tento extrair o arquivo",
        "description_hi": "जब मैं कोई गेम अलग से डाउनलोड करता हूं, तो मुझे खेलने से पहले सभी हिस्सों को डाउनलोड करना पड़ता है? क्योंकि मैंने एक गेम के 2 भागों को डाउनलोड किया है और जब मैं फ़ाइल निकालने का प्रयास करता हूं",
        "description_ar": "عندما أقوم بتنزيل لعبة بشكل منفصل، أحتاج إلى تنزيل جميع الأجزاء قبل اللعب؟ لأنني قمت بتوزيع جزأين من اللعبة وعندما أحاول استخراج الملف",
        "description_de": "Wenn ich ein Spiel separat herunterlade, muss ich dann alle Teile herunterladen, bevor ich spiele? Weil ich zwei Teile eines Spiels heruntergeladen habe und versuche, die Datei zu extrahieren",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "0805299e",
        "name": "Best Hentai Sites - Free Uncensored Hentai & Anime",
        "url": "https://hentaisites.com",
        "category": "Anime Streaming",
        "description": "Porn Dude lists the world's best hentai sites of 2023. Watch free hentai videos, anime sex movies and premium HD hentai porn on the most popular henta",
        "description_es": "Porn Dude enumera los mejores sitios hentai del mundo de 2023. Mira videos hentai gratis, películas de sexo de anime y porno hentai premium en HD en el henta más popular.",
        "description_jp": "Porn Dude は、2023 年の世界最高のエロアニメ サイトをリストします。最も人気のあるヘンタで無料のエロアニメ ビデオ、アニメ セックス ムービー、プレミアム HD エロアニメ ポルノをご覧ください",
        "description_fr": "Porn Dude répertorie les meilleurs sites hentai au monde de 2023. Regardez des vidéos hentai gratuites, des films de sexe animés et du porno hentai HD premium sur le henta le plus populaire.",
        "description_pt": "Porn Dude lista os melhores sites hentai do mundo em 2023. Assista a vídeos hentai gratuitos, filmes de sexo de anime e pornografia hentai HD premium no hentai mais popular",
        "description_hi": "पोर्न ड्यूड ने 2023 की दुनिया की सर्वश्रेष्ठ हेनतई साइटों की सूची बनाई है। सबसे लोकप्रिय हेनतई पर मुफ्त हेनतई वीडियो, एनीमे सेक्स फिल्में और प्रीमियम एचडी हेनतई पोर्न देखें।",
        "description_ar": "يسرد موقع Porn Dude أفضل مواقع الهنتاي في العالم لعام 2023. شاهد مقاطع فيديو الهنتاي المجانية وأفلام الجنس الأنمي وإباحية الهنتاي عالية الدقة على مواقع الهنتاي الأكثر شهرة",
        "description_de": "Porn Dude listet die weltbesten Hentai-Seiten des Jahres 2023 auf. Sehen Sie sich kostenlose Hentai-Videos, Anime-Sexfilme und Premium-HD-Hentai-Pornos auf den beliebtesten Henta-Seiten an",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "974d04e9",
        "name": "Itch.io NSFW & 94+ Free Sex Games Like Itch.io",
        "url": "https://theporndude.com/5995/itch",
        "category": "Hentai Streaming",
        "description": "Believe it or not, Itch.io has a ton of free NSFW games for the gamers out there who also happen to be perverts. I know, I know--it’s a pretty big",
        "description_es": "Lo creas o no, Itch.io tiene un montón de juegos NSFW gratuitos para los jugadores que también son pervertidos. Lo sé, lo sé... es un tamaño bastante grande.",
        "description_jp": "信じられないかもしれませんが、Itch.io には変態ゲーマー向けの無料の NSFW ゲームが大量にあります。わかってる、わかってる――それはかなり大きなことだ",
        "description_fr": "Croyez-le ou non, Itch.io propose une tonne de jeux NSFW gratuits pour les joueurs qui sont également des pervers. Je sais, je sais, c'est un assez gros",
        "description_pt": "Acredite ou não, o Itch.io tem vários jogos NSFW gratuitos para os jogadores que também são pervertidos. Eu sei, eu sei - é muito grande",
        "description_hi": "मानो या न मानो, Itch.io के पास उन गेमर्स के लिए ढेर सारे मुफ्त NSFW गेम हैं जो विकृत भी होते हैं। मैं जानता हूं, मैं जानता हूं--यह बहुत बड़ा है",
        "description_ar": "صدق أو لا تصدق، لدى Itch.io عدد كبير من ألعاب NSFW المجانية للاعبين الذين يصادف أنهم منحرفون أيضًا. أعلم، أعلم - إنها كبيرة جدًا",
        "description_de": "Ob Sie es glauben oder nicht, Itch.io hat eine Menge kostenloser NSFW-Spiele für die Gamer da draußen, die zufällig auch Perverse sind. Ich weiß, ich weiß – es ist ziemlich groß",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "95b29b4b",
        "name": "Aniwatch | Watch Anime Online with English Sub and",
        "url": "https://animewatchtv.su",
        "category": "Anime Streaming",
        "description": "Watch anime online in English subbed and dubbed format on Aniwatch. Stream or download TV series and movies for free in HD quality.",
        "description_es": "Mira anime online en formato doblado y subtitulado en inglés en Aniwatch. Transmita o descargue series de TV y películas gratis en calidad HD.",
        "description_jp": "Aniwatch で英語字幕および吹き替え形式でアニメをオンラインで視聴しましょう。 TV シリーズや映画を HD 品質で無料でストリーミングまたはダウンロードできます。",
        "description_fr": "Regardez des anime en ligne au format sous-titré et doublé en anglais sur Aniwatch. Diffusez ou téléchargez gratuitement des séries télévisées et des films en qualité HD.",
        "description_pt": "Assista anime online em formato legendado e dublado em inglês no Aniwatch. Transmita ou baixe séries de TV e filmes gratuitamente em qualidade HD.",
        "description_hi": "एनिवॉच पर एनीमे को अंग्रेजी सबबेड और डब प्रारूप में ऑनलाइन देखें। एचडी गुणवत्ता में टीवी श्रृंखला और फिल्में निःशुल्क स्ट्रीम या डाउनलोड करें।",
        "description_ar": "شاهد الأنمي عبر الإنترنت بتنسيق باللغة الإنجليزية ومدبلج ومدبلج على Aniwatch. قم ببث أو تنزيل المسلسلات التلفزيونية والأفلام مجانًا بجودة HD.",
        "description_de": "Sehen Sie sich Anime online im englischen Untertitel- und Synchronisationsformat auf Aniwatch an. Streamen oder laden Sie Fernsehserien und Filme kostenlos in HD-Qualität herunter.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "74f7930f",
        "name": "Adult Visual Novel Porn Videos | Pornhub.com",
        "url": "https://www.pornhub.com/video/search?search=adult+visual+novel",
        "category": "Hentai Streaming",
        "description": "Discover Adult Visual Novel Porn Videos | Pornhub.com - A high quality portal for your favorite content.",
        "description_es": "Descubra vídeos porno de novelas visuales para adultos | Pornhub.com: un portal de alta calidad para tu contenido favorito.",
        "description_jp": "アダルト ビジュアル ノベル ポルノ ビデオを発見 | Pornhub.com - お気に入りのコンテンツのための高品質ポータル。",
        "description_fr": "Découvrez des vidéos pornos de romans visuels pour adultes | Pornhub.com - Un portail de haute qualité pour votre contenu préféré.",
        "description_pt": "Descubra vídeos pornôs de romances visuais adultos | Pornhub.com – Um portal de alta qualidade para o seu conteúdo favorito.",
        "description_hi": "वयस्क दृश्य उपन्यास अश्लील वीडियो खोजें | पोर्नहब.कॉम - आपकी पसंदीदा सामग्री के लिए एक उच्च गुणवत्ता वाला पोर्टल।",
        "description_ar": "اكتشف مقاطع الفيديو الإباحية للروايات المرئية للبالغين | Pornhub.com - بوابة عالية الجودة للمحتوى المفضل لديك.",
        "description_de": "Entdecken Sie Visual Novel-Pornovideos für Erwachsene | Pornhub.com – Ein hochwertiges Portal für Ihre Lieblingsinhalte.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "dc07c3e5",
        "name": "Xbooru / hentai",
        "url": "https://xbooru.com/index.php?page=post&s=list&tags=hentai",
        "category": "Hentai Streaming",
        "description": "Xbooru - X marks the spot",
        "description_es": "Xbooru - X marca el lugar",
        "description_jp": "Xbooru - X はスポットをマークします",
        "description_fr": "Xbooru - X marque l'endroit",
        "description_pt": "Xbooru - X marca o local",
        "description_hi": "एक्सबोरू - एक्स स्थान को चिह्नित करता है",
        "description_ar": "Xbooru - X يمثل المكان",
        "description_de": "Xbooru – X markiert die Stelle",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "5bcbfe39",
        "name": "3Hentai - Free Hentai Manga & Doujins XXX",
        "url": "https://3hentai.net",
        "category": "Hentai Streaming",
        "description": "3Hentai is the ultimate, best and daily updated hentai source material you will ever find. Over 550 000 hentai through 13 000 series. Enjoy doujin and",
        "description_es": "3Hentai es el material fuente hentai definitivo, mejor y actualizado diariamente que jamás encontrarás. Más de 550.000 hentai en 13.000 series. Disfruta del doujin y",
        "description_jp": "3Hentai は、あなたがこれまでに見つけることのできない究極、最高の、毎日更新されるエロアニメのソース素材です。 13,000 シリーズを通じて 550,000 を超えるエロアニメ。同人を楽しんだり、",
        "description_fr": "3Hentai est le matériel source hentai ultime, le meilleur et mis à jour quotidiennement que vous puissiez trouver. Plus de 550 000 hentai à travers 13 000 séries. Profitez du doujin et",
        "description_pt": "3Hentai é o material de origem hentai definitivo, melhor e atualizado diariamente que você encontrará. Mais de 550.000 hentai em 13.000 séries. Aproveite doujin e",
        "description_hi": "3हेंताई परम, सर्वश्रेष्ठ और दैनिक अद्यतन हेनतई स्रोत सामग्री है जो आपको कभी भी मिलेगी। 13,000 श्रृंखलाओं के माध्यम से 550,000 से अधिक हेनतई। डौजिन और का आनंद लें",
        "description_ar": "3Hentai هو مصدر الهنتاي النهائي والأفضل والمحدث يوميًا الذي ستجده على الإطلاق. أكثر من 550000 هنتاي من خلال 13000 سلسلة. استمتع بالدوجين و",
        "description_de": "3Hentai ist das ultimative, beste und täglich aktualisierte Hentai-Quellenmaterial, das Sie jemals finden werden. Über 550.000 Hentai in 13.000 Serien. Genießen Sie Doujin und",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "922206c5",
        "name": "Genre list: Download adult games and animations on",
        "url": "https://www.dlsite.com/pro-touch/genre/list?locale=en_US",
        "category": "Hentai Streaming",
        "description": "\"DLsite H Games\" is a download shop for H games and animations. You can immediately download and enjoy products you like! New items appear every day s",
        "description_es": "\"DLsite H Games\" es una tienda de descargas de animaciones y juegos H. ¡Puedes descargar y disfrutar inmediatamente los productos que te gustan! Nuevos elementos aparecen todos los días.",
        "description_jp": "「DLsite H Games」はHなゲーム・アニメのダウンロードショップ。お気に入りの作品はすぐダウンロードできてすぐ楽しめる！毎日新しいアイテムが登場します",
        "description_fr": "\"DLsite H Games\" est une boutique de téléchargement de jeux et d'animations H. Vous pouvez immédiatement télécharger et profiter des produits que vous aimez ! De nouveaux éléments apparaissent chaque jour",
        "description_pt": "\"DLsite H Games\" é uma loja de download de jogos e animações H. Você pode baixar imediatamente e desfrutar dos produtos que você gosta! Novos itens aparecem todos os dias",
        "description_hi": "\"डीएलसाइट एच गेम्स\" एच गेम्स और एनिमेशन के लिए एक डाउनलोड शॉप है। आप तुरंत डाउनलोड कर सकते हैं और अपने पसंदीदा उत्पादों का आनंद ले सकते हैं! हर दिन नए आइटम दिखाई देते हैं",
        "description_ar": "\"DLsite H Games\" هو متجر تنزيل لألعاب H والرسوم المتحركة. يمكنك تنزيل المنتجات التي تعجبك والاستمتاع بها على الفور! تظهر عناصر جديدة كل يوم",
        "description_de": "„DLsite H Games“ ist ein Downloadshop für H-Spiele und Animationen. Sie können die Produkte, die Ihnen gefallen, sofort herunterladen und genießen! Jeden Tag erscheinen neue Artikel",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "8c72da19",
        "name": "Best Doujinshi Websites - TikTok",
        "url": "https://www.tiktok.com/discover/best-doujinshi-websites",
        "category": "Manga & Doujinshi",
        "description": "Discover Best Doujinshi Websites - TikTok - A high quality portal for your favorite content.",
        "description_es": "Descubra los mejores sitios web de Doujinshi: TikTok: un portal de alta calidad para su contenido favorito.",
        "description_jp": "最高の同人誌ウェブサイトを発見 - TikTok - お気に入りのコンテンツを探せる高品質ポータル。",
        "description_fr": "Découvrez les meilleurs sites Web Doujinshi - TikTok - Un portail de haute qualité pour votre contenu préféré.",
        "description_pt": "Descubra os melhores sites de Doujinshi - TikTok - Um portal de alta qualidade para seu conteúdo favorito.",
        "description_hi": "सर्वश्रेष्ठ डौजिंशी वेबसाइट खोजें - टिकटॉक - आपकी पसंदीदा सामग्री के लिए एक उच्च गुणवत्ता वाला पोर्टल।",
        "description_ar": "اكتشف أفضل مواقع Doujinshi - TikTok - بوابة عالية الجودة للمحتوى المفضل لديك.",
        "description_de": "Entdecken Sie die besten Doujinshi-Websites – TikTok – Ein hochwertiges Portal für Ihre Lieblingsinhalte.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-29"
    },
    {
        "id": "d25aa932",
        "name": "Hentai Haven | Free Hentai Streaming - Watch Top H",
        "url": "https://hentaihaven.co",
        "category": "Anime Streaming",
        "description": "Explore Hentai Haven for the best free hentai streaming online. Enjoy high-quality, uncensored hentai videos across all genres. Watch your favorite he",
        "description_es": "Explora Hentai Haven para obtener la mejor transmisión hentai gratuita en línea. Disfruta de vídeos hentai sin censura de alta calidad de todos los géneros. Mira tu favorito él",
        "description_jp": "最高の無料エロアニメ ストリーミングをオンラインで入手するには、Hentai Haven を探索してください。あらゆるジャンルの高画質無修正エロ動画をお楽しみください。あなたのお気に入りの彼を見てください",
        "description_fr": "Explorez Hentai Haven pour le meilleur streaming hentai gratuit en ligne. Profitez de vidéos hentai de haute qualité et non censurées dans tous les genres. Regardez votre favori, il",
        "description_pt": "Explore Hentai Haven para obter o melhor streaming gratuito de hentai online. Desfrute de vídeos hentai de alta qualidade e sem censura em todos os gêneros. Assista ao seu favorito ele",
        "description_hi": "सर्वश्रेष्ठ मुफ्त हेनतई स्ट्रीमिंग ऑनलाइन के लिए हेनतई हेवन का अन्वेषण करें। सभी शैलियों में उच्च-गुणवत्ता, बिना सेंसर वाले हेनतई वीडियो का आनंद लें। अपने पसंदीदा को देखो वह",
        "description_ar": "استكشف Hentai Haven للحصول على أفضل بث مجاني للهنتاي عبر الإنترنت. استمتع بمقاطع فيديو هنتاي عالية الجودة وغير خاضعة للرقابة عبر جميع الأنواع. مشاهدة المفضلة لديك هو",
        "description_de": "Entdecken Sie Hentai Haven für das beste kostenlose Hentai-Streaming online. Genießen Sie hochwertige, unzensierte Hentai-Videos aller Genres. Beobachten Sie Ihren Lieblings-Er",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-30"
    },
    {
        "id": "79f8acef",
        "name": "Uncensored Hentai",
        "url": "https://uncensoredhentai.xxx/genres/uncensored",
        "category": "Hentai Streaming",
        "description": "Watch free uncensored hentai videos online in 720p and 1080p. Regular update with the latest HD Hentai, Uncensored Hentai and More",
        "description_es": "Mira vídeos hentai gratuitos sin censura online en 720p y 1080p. Actualización periódica con lo último en HD Hentai, Hentai sin censura y más",
        "description_jp": "720p および 1080p の無修正エロビデオをオンラインで無料でご覧ください。最新のHDエロアニメ、無修正エロアニメなどを定期的に更新",
        "description_fr": "Regardez des vidéos hentai gratuites et non censurées en ligne en 720p et 1080p. Mise à jour régulière avec les derniers HD Hentai, Uncensored Hentai et plus",
        "description_pt": "Assista a vídeos hentai gratuitos e sem censura online em 720p e 1080p. Atualização regular com o mais recente HD Hentai, Hentai sem censura e muito mais",
        "description_hi": "720p और 1080p में निःशुल्क बिना सेंसर वाले हेनतई वीडियो ऑनलाइन देखें। नवीनतम एचडी हेनतई, बिना सेंसर वाली हेनतई और अधिक के साथ नियमित अपडेट",
        "description_ar": "شاهد مقاطع فيديو هنتاي مجانية غير خاضعة للرقابة عبر الإنترنت بدقة 720 بكسل و1080 بكسل. تحديث منتظم بأحدث أفلام الهنتاي عالية الدقة والهنتاي غير الخاضعة للرقابة والمزيد",
        "description_de": "Sehen Sie sich kostenlose, unzensierte Hentai-Videos online in 720p und 1080p an. Regelmäßige Updates mit den neuesten HD-Hentai, unzensierten Hentai und mehr",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-30"
    },
    {
        "id": "b0280d41",
        "name": "Best Porn Games, Hentai Games & XXX Adult Sex Game",
        "url": "https://theporndude.com/best-porn-games",
        "category": "Hentai Streaming",
        "description": "Play free porn games on your PC or mobile. Find the best sex, flash and hentai games for adults online. Go on an erotic adventure in an interactive",
        "description_es": "Juega juegos porno gratis en tu PC o móvil. Encuentra los mejores juegos sexuales, flash y hentai para adultos online. Embárcate en una aventura erótica en un entorno interactivo.",
        "description_jp": "PCまたはモバイルで無料のポルノゲームをプレイしてください。成人向けの最高のセックス、フラッシュ、エロゲームをオンラインで見つけてください。インタラクティブなエロティックな冒険に出かけましょう",
        "description_fr": "Jouez à des jeux porno gratuits sur votre PC ou mobile. Trouvez les meilleurs jeux de sexe, flash et hentai pour adultes en ligne. Partez pour une aventure érotique dans un environnement interactif",
        "description_pt": "Jogue jogos pornográficos gratuitos no seu PC ou celular. Encontre os melhores jogos de sexo, flash e hentai para adultos online. Embarque em uma aventura erótica de forma interativa",
        "description_hi": "अपने पीसी या मोबाइल पर मुफ्त पोर्न गेम खेलें। वयस्कों के लिए ऑनलाइन सर्वोत्तम सेक्स, फ़्लैश और हेनतई गेम ढूंढें। एक इंटरैक्टिव में कामुक साहसिक यात्रा पर जाएं",
        "description_ar": "العب ألعابًا إباحية مجانية على جهاز الكمبيوتر أو الهاتف المحمول. اعثر على أفضل ألعاب الجنس والفلاش والهنتاي للبالغين عبر الإنترنت. الذهاب في مغامرة مثيرة في تفاعلية",
        "description_de": "Spielen Sie kostenlose Pornospiele auf Ihrem PC oder Handy. Finden Sie online die besten Sex-, Flash- und Hentai-Spiele für Erwachsene. Begeben Sie sich interaktiv auf ein erotisches Abenteuer",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-30"
    },
    {
        "id": "754ea70f",
        "name": "Free Hentai Video Stream - Watch online Hentai Por",
        "url": "https://animeidhentai.com/portal",
        "category": "Anime Streaming",
        "description": "Watch free hentai video online from your mobile phone, tablet, desktop in 720p and 1080p. Regular update with the latest HD releases. Check best video",
        "description_es": "Mira videos hentai gratis en línea desde tu teléfono móvil, tableta, computadora de escritorio en 720p y 1080p. Actualización periódica con los últimos lanzamientos en HD. Comprueba el mejor vídeo",
        "description_jp": "携帯電話、タブレット、デスクトップから 720p および 1080p で無料のエロ動画をオンラインでご覧ください。最新の HD リリースによる定期的なアップデート。最高のビデオをチェック",
        "description_fr": "Regardez des vidéos hentai gratuites en ligne depuis votre téléphone mobile, tablette, ordinateur de bureau en 720p et 1080p. Mise à jour régulière avec les dernières versions HD. Vérifiez la meilleure vidéo",
        "description_pt": "Assista a vídeos hentai gratuitos online em seu celular, tablet, desktop em 720p e 1080p. Atualização regular com os últimos lançamentos em HD. Confira o melhor vídeo",
        "description_hi": "अपने मोबाइल फोन, टैबलेट, डेस्कटॉप से ​​720p और 1080p में मुफ्त हेनतई वीडियो ऑनलाइन देखें। नवीनतम एचडी रिलीज़ के साथ नियमित अपडेट। सर्वोत्तम वीडियो देखें",
        "description_ar": "شاهد فيديو هنتاي مجاني عبر الإنترنت من هاتفك المحمول أو جهازك اللوحي أو سطح المكتب بدقة 720 بكسل و1080 بكسل. تحديث منتظم بأحدث الإصدارات عالية الدقة. تحقق من أفضل فيديو",
        "description_de": "Sehen Sie sich kostenlose Hentai-Videos online von Ihrem Mobiltelefon, Tablet oder Desktop in 720p und 1080p an. Regelmäßiges Update mit den neuesten HD-Versionen. Schauen Sie sich das beste Video an",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-30"
    },
    {
        "id": "7f23e382",
        "name": "Hentai Uncensored English Subtitles Decensored Sen",
        "url": "https://www.tnaflix.com/search?what=hentai+uncensored+english+subtitles+decensored",
        "category": "Hentai Streaming",
        "description": "Unlock hentai uncensored english subtitles decensored gems at TNAFLIX.COM! Epic anime orgies, raw action, perfect subs. Ultimate hentai uncensored eng",
        "description_es": "¡Desbloquea hentai sin censura con subtítulos en inglés y gemas censuradas en TNAFLIX.COM! Orgías anime épicas, acción cruda, subs perfectos. Último hentai sin censura eng",
        "description_jp": "TNAFLIX.COM で、エロアニメの無修正英語字幕、無修正の宝石のロックを解除してください!壮大なアニメ乱交パーティー、生々しいアクション、完璧な字幕。究極のエロアニメ無修正英語",
        "description_fr": "Débloquez des joyaux décensurés de sous-titres anglais hentai non censurés sur TNAFLIX.COM ! Orgies animées épiques, action brute, sous-marins parfaits. Hentai ultime non censuré eng",
        "description_pt": "Desbloqueie legendas em inglês sem censura hentai joias censuradas em TNAFLIX.COM! Orgias épicas de anime, ação crua, substituições perfeitas. Ultimate hentai sem censura eng",
        "description_hi": "TNAFLIX.COM पर हेनतई बिना सेंसर अंग्रेजी उपशीर्षक डीसेंसर्ड रत्न अनलॉक करें! महाकाव्य एनीमे तांडव, कच्ची कार्रवाई, उत्तम उप। परम हेनतई बिना सेंसर किया हुआ अंग्रेजी",
        "description_ar": "افتح الترجمات الإنجليزية غير الخاضعة للرقابة والجواهر غير الخاضعة للرقابة على TNAFLIX.COM! طقوس العربدة الملحمية في الأنمي، والحركة الخام، والغواصات المثالية. في نهاية المطاف هنتاي غير خاضعة للرقابة المهندس",
        "description_de": "Schalten Sie Hentai-Juwelen mit unzensierten englischen Untertiteln und dezensierten Juwelen bei TNAFLIX.COM frei! Epische Anime-Orgien, rohe Action, perfekte Subs. Ultimatives Hentai unzensiert eng",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-30"
    },
    {
        "id": "a13c2aa9",
        "name": "Watch Popular Anime With Same-Day Release As Japan",
        "url": "https://www.mewatch.sg/series/anime",
        "category": "Anime Streaming",
        "description": "Anime series from Japan, Korea and China. Free on mewatch, with English subtitles. ",
        "description_es": "Series de anime de Japón, Corea y China. Gratis en mewatch, con subtítulos en inglés.",
        "description_jp": "日本、韓国、中国のアニメシリーズ。 mewatch で無料、英語字幕付き。",
        "description_fr": "Série animée du Japon, de Corée et de Chine. Gratuit sur Mewatch, avec sous-titres anglais.",
        "description_pt": "Série de anime do Japão, Coréia e China. Gratuito no mewatch, com legendas em inglês.",
        "description_hi": "जापान, कोरिया और चीन से एनीमे श्रृंखला। अंग्रेजी उपशीर्षक के साथ, मेवॉच पर निःशुल्क।",
        "description_ar": "مسلسلات أنمي من اليابان وكوريا والصين. مجانًا على mewatch، مع ترجمة باللغة الإنجليزية.",
        "description_de": "Anime-Serien aus Japan, Korea und China. Kostenlos auf mewatch, mit englischen Untertiteln.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-30"
    },
    {
        "id": "c0bca2ac",
        "name": "Top 7 Visual Novels I Played In 2025 (So Far)",
        "url": "https://www.youtube.com/watch?v=dyljVhBSipo",
        "category": "Anime Streaming",
        "description": "Enjoy the videos and music you love, upload original content, and share it all with friends, family, and the world on YouTube.",
        "description_es": "Disfruta de los vídeos y la música que te encantan, sube contenido original y compártelo todo con amigos, familiares y el mundo en YouTube.",
        "description_jp": "YouTube でお気に入りの動画や音楽を楽しみ、オリジナルのコンテンツをアップロードして友だちや家族、世界中の人たちと共有しましょう。",
        "description_fr": "Profitez des vidéos et de la musique que vous aimez, téléchargez du contenu original et partagez-le avec vos amis, votre famille et le monde entier sur YouTube.",
        "description_pt": "Aproveite os vídeos e as músicas que você adora, carregue conteúdo original e compartilhe tudo com amigos, familiares e o mundo no YouTube.",
        "description_hi": "अपने पसंदीदा वीडियो और संगीत का आनंद लें, मूल सामग्री अपलोड करें और इसे YouTube पर दोस्तों, परिवार और दुनिया के साथ साझा करें।",
        "description_ar": "استمتع بمقاطع الفيديو والموسيقى التي تحبها، وقم بتحميل المحتوى الأصلي، وشاركه كله مع الأصدقاء والعائلة والعالم على YouTube.",
        "description_de": "Genießen Sie die Videos und Musik, die Sie lieben, laden Sie Originalinhalte hoch und teilen Sie alles mit Freunden, Familie und der Welt auf YouTube.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-30"
    },
    {
        "id": "62960434",
        "name": "Hanime.tv & 44+ Hentai Streaming Sites Like ... - ",
        "url": "https://theporndude.com/1498/hanime",
        "category": "Anime Streaming",
        "description": "Hanime.tv! There are millions of hentai fans all over the world. In order to accommodate the overwhelming numbers of people who love to fap it to Japa",
        "description_es": "Hanime.tv! Hay millones de fanáticos del hentai en todo el mundo. Para dar cabida a la abrumadora cantidad de personas a las que les encanta disfrutar de Japa.",
        "description_jp": "ハニメ.tv！世界中には何百万人ものエロアニメファンがいます。日本でオナニーするのが大好きな圧倒的な数の人々に対応するために",
        "description_fr": "Hanime.tv! Il y a des millions de fans de hentai partout dans le monde. Afin de répondre aux besoins du nombre écrasant de personnes qui aiment baiser au Japon",
        "description_pt": "Hanime.tv! Existem milhões de fãs de hentai em todo o mundo. A fim de acomodar o grande número de pessoas que adoram viajar para o Japa",
        "description_hi": "Hanime.tv! पूरी दुनिया में हेनतई के लाखों प्रशंसक हैं। उन लोगों की भारी संख्या को समायोजित करने के लिए जो इसे जापान में फैप करना पसंद करते हैं",
        "description_ar": "هانمي.تي في! هناك الملايين من محبي الهنتاي في جميع أنحاء العالم. من أجل استيعاب الأعداد الهائلة من الأشخاص الذين يحبون نقلها إلى جابا",
        "description_de": "Hanime.tv! Es gibt Millionen Hentai-Fans auf der ganzen Welt. Um der überwältigenden Zahl von Menschen gerecht zu werden, die es lieben, sich an Japa zu wenden",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-30"
    },
    {
        "id": "989114b0",
        "name": "Hentai - Internet Archive",
        "url": "https://archive.org/details/hentaiarchive",
        "category": "Hentai Streaming",
        "description": "Discover Hentai - Internet Archive - A high quality portal for your favorite content.",
        "description_es": "Descubre Hentai - Internet Archive - Un portal de alta calidad para tu contenido favorito.",
        "description_jp": "Discover Hentai - Internet Archive - お気に入りのコンテンツのための高品質ポータル。",
        "description_fr": "Découvrez Hentai - Internet Archive - Un portail de haute qualité pour votre contenu préféré.",
        "description_pt": "Descubra Hentai - Internet Archive - Um portal de alta qualidade para seu conteúdo favorito.",
        "description_hi": "डिस्कवर हेनतई - इंटरनेट आर्काइव - आपकी पसंदीदा सामग्री के लिए एक उच्च गुणवत्ता वाला पोर्टल।",
        "description_ar": "اكتشف هنتاي - أرشيف الإنترنت - بوابة عالية الجودة للمحتوى المفضل لديك.",
        "description_de": "Entdecken Sie Hentai – Internet Archive – Ein hochwertiges Portal für Ihre Lieblingsinhalte.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-30"
    },
    {
        "id": "50cb9ec6",
        "name": "The Best Uncensored Hentai Sites - HentaiZilla",
        "url": "https://hentaizilla.com/uncensored-hentai",
        "category": "Hentai Streaming",
        "description": "Welcome to HentaiZilla! Find your favorite Uncensored Hentai and enjoy yourself. (＾▽＾)",
        "description_es": "¡Bienvenido a HentaiZilla! Encuentra tu Hentai sin censura favorito y diviértete. (＾▽＾)",
        "description_jp": "ヘンタイジラへようこそ！お気に入りの無修正エロアニメを見つけて楽しんでください。 (＾▽＾)",
        "description_fr": "Bienvenue sur HentaiZilla ! Trouvez votre Hentai non censuré préféré et amusez-vous. (＾▽＾)",
        "description_pt": "Bem-vindo ao HentaiZilla! Encontre o seu Hentai sem censura favorito e divirta-se. (＾▽＾)",
        "description_hi": "हेंटाईज़िला में आपका स्वागत है! अपनी पसंदीदा अनसेंसर्ड हेनतई ढूंढें और आनंद लें। (＾▽＾)",
        "description_ar": "مرحبا بكم في هنتايزيلا! ابحث عن الهنتاي غير الخاضع للرقابة المفضل لديك واستمتع بوقتك. (＾▽＾)",
        "description_de": "Willkommen bei HentaiZilla! Finden Sie Ihr unzensiertes Lieblings-Hentai und genießen Sie es. (＾▽＾)",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-30"
    },
    {
        "id": "6776fe2c",
        "name": "My Top 100 Adult Visual Novels : Tales of Love, Lu",
        "url": "https://f95zone.to/threads/my-top-100-adult-visual-novels-tales-of-love-lust-and-intrigue.228293",
        "category": "Hentai Streaming",
        "description": "My Top 100 Adult Visual Novels: Immersive Storytelling, Moral Dilemmas, and Complex Relationships\n\nWelcome to my curated list of the top 100 adult vis",
        "description_es": "Mis 100 mejores novelas visuales para adultos: narración inmersiva, dilemas morales y relaciones complejas\n\nBienvenido a mi lista seleccionada de las 100 mejores visitas para adultos.",
        "description_jp": "私のアダルト ビジュアル ノベル トップ 100: 没入型ストーリーテリング、道徳的ジレンマ、複雑な関係\n\n私が厳選した成人ビザのトップ 100 リストへようこそ",
        "description_fr": "Mon top 100 des romans visuels pour adultes : narration immersive, dilemmes moraux et relations complexes\n\nBienvenue sur ma liste organisée des 100 meilleures vis adultes",
        "description_pt": "Meus 100 melhores romances visuais para adultos: narrativa envolvente, dilemas morais e relacionamentos complexos\n\nBem-vindo à minha lista selecionada dos 100 melhores visitantes adultos",
        "description_hi": "मेरे शीर्ष 100 वयस्क दृश्य उपन्यास: गहन कहानी, नैतिक दुविधाएं, और जटिल रिश्ते\n\nशीर्ष 100 वयस्कों की मेरी क्यूरेटेड सूची में आपका स्वागत है",
        "description_ar": "أفضل 100 رواية بصرية للبالغين: رواية قصص غامرة، ومعضلات أخلاقية، وعلاقات معقدة\n\nمرحبًا بكم في قائمتي المنسقة لأفضل 100 شخص بالغ",
        "description_de": "Meine Top 100 Visual Novels für Erwachsene: Eindringliches Geschichtenerzählen, moralische Dilemmata und komplexe Beziehungen\n\nWillkommen auf meiner kuratierten Liste der 100 besten Erwachsenenbesucher",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-30"
    },
    {
        "id": "ec225f40",
        "name": "E-Hentai Forums - EHWiki",
        "url": "https://ehwiki.org/wiki/E-Hentai_Forums",
        "category": "Hentai Streaming",
        "description": "Discover E-Hentai Forums - EHWiki - A high quality portal for your favorite content.",
        "description_es": "Descubra los foros de E-Hentai - EHWiki - Un portal de alta calidad para su contenido favorito.",
        "description_jp": "E-Hentai フォーラム - EHWiki - お気に入りのコンテンツのための高品質ポータルを発見してください。",
        "description_fr": "Découvrez les forums E-Hentai - EHWiki - Un portail de haute qualité pour votre contenu préféré.",
        "description_pt": "Descubra os Fóruns E-Hentai - EHWiki - Um portal de alta qualidade para o seu conteúdo favorito.",
        "description_hi": "ई-हेनतई फ़ोरम खोजें - ईएचविकी - आपकी पसंदीदा सामग्री के लिए एक उच्च गुणवत्ता वाला पोर्टल।",
        "description_ar": "اكتشف منتديات E-Hentai - EHWiki - بوابة عالية الجودة للمحتوى المفضل لديك.",
        "description_de": "Entdecken Sie E-Hentai-Foren – EHWiki – ein hochwertiges Portal für Ihre Lieblingsinhalte.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-30"
    },
    {
        "id": "f1030824",
        "name": "Manhwa Raw & 19+ Manhwa Hentai Sites Like Manhwa-r",
        "url": "https://theporndude.com/8325/manhwaraw",
        "category": "Hentai Streaming",
        "description": "When we think of cartoon porn, our minds are usually drawn to the wild lands of Japan. After all, this country gave us the gift of Anime and, more",
        "description_es": "Cuando pensamos en dibujos animados porno, nuestras mentes generalmente se sienten atraídas por las tierras salvajes de Japón. Después de todo, este país nos regaló el Anime y, más",
        "description_jp": "漫画ポルノについて考えるとき、私たちの心は通常、日本の荒野に引き寄せられます。結局のところ、この国は私たちにアニメなどの贈り物を与えてくれました。",
        "description_fr": "Lorsque nous pensons au dessin animé porno, nos esprits sont généralement attirés par les terres sauvages du Japon. Après tout, ce pays nous a fait cadeau de l’Anime et, plus encore",
        "description_pt": "Quando pensamos em pornografia de desenhos animados, nossas mentes geralmente são atraídas para as terras selvagens do Japão. Afinal, este país nos deu o presente do Anime e, mais",
        "description_hi": "जब हम कार्टून पोर्न के बारे में सोचते हैं, तो हमारा दिमाग आमतौर पर जापान की जंगली भूमि की ओर आकर्षित हो जाता है। आख़िरकार, इस देश ने हमें एनीमे और उससे भी अधिक का उपहार दिया है",
        "description_ar": "عندما نفكر في الرسوم المتحركة الإباحية، عادة ما تنجذب أذهاننا إلى الأراضي البرية في اليابان. بعد كل شيء، لقد منحنا هذا البلد هدية الأنمي وأكثر من ذلك",
        "description_de": "Wenn wir an Cartoon-Pornos denken, denken wir meist an die wilden Länder Japans. Schließlich hat uns dieses Land Anime und noch mehr geschenkt",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-30"
    },
    {
        "id": "4907d46b",
        "name": "Uncensored Hentai English Dub Porn Videos | Pornhu",
        "url": "https://www.pornhub.com/video/search?search=uncensored+hentai+english+dub",
        "category": "Hentai Streaming",
        "description": "Watch Uncensored Hentai English Dub porn videos for free, here on Pornhub.com. Discover the growing collection of high quality Most Relevant XXX movie",
        "description_es": "Mira videos porno Hentai English Dub sin censura gratis, aquí en Pornhub.com. Descubra la creciente colección de películas XXX más relevantes de alta calidad",
        "description_jp": "無修正 変態 英語 吹き替え ポルノ ビデオを無料で、ここ Pornhub.com でご覧ください。増え続ける高品質の最も関連性の高い XXX 映画のコレクションを発見してください",
        "description_fr": "Regardez des vidéos porno non censurées Hentai English Dub gratuitement, ici sur Pornhub.com. Découvrez la collection croissante de films XXX les plus pertinents de haute qualité",
        "description_pt": "Assista vídeos pornôs Hentai English Dub sem censura de graça, aqui no Pornhub.com. Descubra a crescente coleção de filmes XXX mais relevantes de alta qualidade",
        "description_hi": "बिना सेंसर किए हुए हेंताई अंग्रेजी डब अश्लील वीडियो यहां मुफ्त में देखें, यहां पोर्नहब.कॉम पर। उच्च गुणवत्ता वाली सर्वाधिक प्रासंगिक XXX मूवी के बढ़ते संग्रह की खोज करें",
        "description_ar": "شاهد مقاطع الفيديو الإباحية Hentai English Dub غير الخاضعة للرقابة مجانًا، هنا على Pornhub.com. اكتشف المجموعة المتزايدة من أفلام XXX ذات الجودة العالية",
        "description_de": "Sehen Sie sich hier auf Pornhub.com kostenlos unzensierte Hentai English Dub-Pornovideos an. Entdecken Sie die wachsende Sammlung hochwertiger, relevantester XXX-Filme",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-30"
    },
    {
        "id": "c4c4216a",
        "name": "Full Color Hentai Manga - The Best Selected Adult ",
        "url": "https://hentailor.com",
        "category": "Hentai Streaming",
        "description": "The Best Color Hentai Manga, updated daily. All Adult Comics Carefully Selected by the site owner. Full-color, Premium, Mobile-friendly.",
        "description_es": "El mejor manga hentai en color, actualizado diariamente. Todos los cómics para adultos seleccionados cuidadosamente por el propietario del sitio. A todo color, Premium y compatible con dispositivos móviles.",
        "description_jp": "最高のカラーエロマンガを毎日更新。サイト管理人が厳選した成年コミックばかり。フルカラー、プレミアム、モバイル対応。",
        "description_fr": "Le meilleur manga Hentai couleur, mis à jour quotidiennement. Toutes les bandes dessinées pour adultes soigneusement sélectionnées par le propriétaire du site. En couleur, Premium, adapté aux mobiles.",
        "description_pt": "O melhor mangá Color Hentai, atualizado diariamente. Todos os quadrinhos adultos cuidadosamente selecionados pelo proprietário do site. Colorido, Premium, compatível com dispositivos móveis.",
        "description_hi": "सर्वश्रेष्ठ रंग हेनतई मंगा, प्रतिदिन अद्यतन किया जाता है। सभी वयस्क कॉमिक्स साइट स्वामी द्वारा सावधानीपूर्वक चुनी गई हैं। पूर्ण रंग, प्रीमियम, मोबाइल-अनुकूल।",
        "description_ar": "أفضل مانغا هنتاي الملونة، يتم تحديثها يوميًا. تم اختيار جميع القصص المصورة للبالغين بعناية من قبل مالك الموقع. ألوان كاملة، مميزة، مناسبة للهواتف المحمولة.",
        "description_de": "Der beste farbige Hentai-Manga, täglich aktualisiert. Alle Comics für Erwachsene wurden vom Websitebesitzer sorgfältig ausgewählt. Vollfarbig, Premium, mobilfreundlich.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-30"
    },
    {
        "id": "ad450236",
        "name": "Best Hentai Streaming Sites: Top Online Hentai Vid",
        "url": "https://theporndude.vip/hentai-streaming-sites",
        "category": "Anime Streaming",
        "description": "Explore the finest 2024 Hentai Streaming Sites offering diverse, uncensored HD content and offline downloads.",
        "description_es": "Explore los mejores sitios de transmisión de hentai de 2024 que ofrecen contenido HD diverso y sin censura y descargas sin conexión.",
        "description_jp": "多様な無修正 HD コンテンツとオフライン ダウンロードを提供する、2024 年の最高のエロアニメ ストリーミング サイトを探索してください。",
        "description_fr": "Explorez les meilleurs sites de streaming Hentai 2024 proposant un contenu HD diversifié et non censuré et des téléchargements hors ligne.",
        "description_pt": "Explore os melhores sites de streaming Hentai de 2024, oferecendo conteúdo HD diversificado e sem censura e downloads offline.",
        "description_hi": "विविध, बिना सेंसर वाली एचडी सामग्री और ऑफ़लाइन डाउनलोड की पेशकश करने वाली बेहतरीन 2024 हेनतई स्ट्रीमिंग साइटों का अन्वेषण करें।",
        "description_ar": "استكشف أفضل مواقع بث هنتاي لعام 2024 التي تقدم محتوى عالي الدقة متنوعًا وغير خاضع للرقابة وتنزيلات دون اتصال بالإنترنت.",
        "description_de": "Entdecken Sie die besten Hentai-Streaming-Sites des Jahres 2024, die vielfältige, unzensierte HD-Inhalte und Offline-Downloads bieten.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-30"
    },
    {
        "id": "52486707",
        "name": "Hentai Translated Uncensored Porn Videos | Pornhub",
        "url": "https://www.pornhub.com/video/search?search=hentai+translated+uncensored",
        "category": "Hentai Streaming",
        "description": "Watch Hentai Translated Uncensored porn videos for free, here on Pornhub.com. Discover the growing collection of high quality Most Relevant XXX movies",
        "description_es": "Mira videos porno hentai traducidos sin censura gratis, aquí en Pornhub.com. Descubra la creciente colección de películas XXX más relevantes de alta calidad",
        "description_jp": "変態翻訳 無修正 ポルノ ビデオを無料で、ここ Pornhub.com でご覧ください。増え続ける高品質の最も関連性の高い XXX 映画のコレクションを発見してください",
        "description_fr": "Regardez des vidéos porno Hentai Translated Uncensored gratuitement, ici sur Pornhub.com. Découvrez la collection croissante de films XXX les plus pertinents de haute qualité",
        "description_pt": "Assista vídeos pornôs Hentai Translated Uncensored de graça, aqui no Pornhub.com. Descubra a crescente coleção de filmes XXX mais relevantes de alta qualidade",
        "description_hi": "यहां पोर्नहब.कॉम पर हेनतई अनुवादित बिना सेंसर किए हुए अश्लील वीडियो मुफ्त में देखें। उच्च गुणवत्ता वाली सर्वाधिक प्रासंगिक XXX फिल्मों के बढ़ते संग्रह की खोज करें",
        "description_ar": "شاهد مقاطع الفيديو الإباحية هنتاي المترجمة غير الخاضعة للرقابة مجانًا، هنا على Pornhub.com. اكتشف المجموعة المتزايدة من أفلام XXX ذات الجودة العالية",
        "description_de": "Sehen Sie sich hier auf Pornhub.com kostenlos Hentai Translated Uncensored-Pornovideos an. Entdecken Sie die wachsende Sammlung hochwertiger, relevantester XXX-Filme",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-30"
    },
    {
        "id": "95ca748e",
        "name": "'hentai uncensored english sub' Search - XNXX.COM",
        "url": "https://www.xnxx.com/search/hentai+uncensored+english+sub",
        "category": "Hentai Streaming",
        "description": "XNXX.COM 'hentai uncensored english sub' Search, free sex videos",
        "description_es": "XNXX.COM Búsqueda 'hentai sub ingles sin censura', vídeos de sexo gratis",
        "description_jp": "XNXX.COM 'hentai 無修正 英語サブ' 検索、無料のセックス ビデオ",
        "description_fr": "XNXX.COM 'hentai sous-anglais non censuré' Recherche, vidéos de sexe gratuites",
        "description_pt": "XNXX.COM 'hentai sub inglês sem censura' Pesquisa, vídeos de sexo grátis",
        "description_hi": "XNXX.COM 'हेनतई अनसेंसर्ड इंग्लिश सब' सर्च, मुफ्त सेक्स वीडियो",
        "description_ar": "XNXX.COM 'هنتاي غير خاضعة للرقابة الإنجليزية الفرعية' بحث، مقاطع فيديو جنسية مجانية",
        "description_de": "XNXX.COM 'hentai uncensored english sub' Suche, kostenlose Sexvideos",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-30"
    },
    {
        "id": "7914514e",
        "name": "HentaiZilla: The Best Hentai Sites",
        "url": "https://hentaizilla.com",
        "category": "Hentai Streaming",
        "description": "HentaiZilla provides you with the best hentai sites on the internet. From tentacle to ahegao to your favorite cartoons. You want it, we've got it!",
        "description_es": "HentaiZilla te ofrece los mejores sitios hentai de Internet. Desde tentáculo hasta ahegao y tus dibujos animados favoritos. ¡Lo quieres, lo tenemos!",
        "description_jp": "HentaiZilla はインターネット上で最高のエロサイトを提供します。触手からアヘ顔、お気に入りの漫画まで。あなたが欲しいなら、私たちはそれを持っています！",
        "description_fr": "HentaiZilla vous propose les meilleurs sites hentai sur Internet. Du tentacule à l'ahegao en passant par vos dessins animés préférés. Vous le voulez, nous l'avons !",
        "description_pt": "HentaiZilla oferece os melhores sites hentai da internet. Do tentáculo ao ahegao aos seus desenhos animados favoritos. Você quer, nós conseguimos!",
        "description_hi": "HentaiZilla आपको इंटरनेट पर सर्वोत्तम hentai साइटें प्रदान करता है। टेंटेकल से लेकर अहेगाओ तक आपके पसंदीदा कार्टून तक। आप इसे चाहते हैं, हमें यह मिल गया है!",
        "description_ar": "توفر لك HentaiZilla أفضل مواقع الهنتاي على الإنترنت. من اللامسة إلى ahegao إلى الرسوم المتحركة المفضلة لديك. تريد ذلك، لقد حصلنا عليه!",
        "description_de": "HentaiZilla bietet Ihnen die besten Hentai-Seiten im Internet. Von Tentakel über Ahegao bis hin zu Ihren Lieblingscartoons. Sie wollen es, wir haben es!",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-30"
    },
    {
        "id": "95c6d8fb",
        "name": "Best New Anime to Watch (Spring Season 2026)",
        "url": "https://www.ign.com/articles/best-new-anime-to-watch-spring-2026",
        "category": "Anime Streaming",
        "description": "Highlights from the Spring 2026 anime season. ",
        "description_es": "Lo más destacado de la temporada de anime Primavera de 2026.",
        "description_jp": "2026年春アニメシーズンのハイライト。",
        "description_fr": "Faits saillants de la saison d’anime du printemps 2026.",
        "description_pt": "Destaques da temporada de anime Primavera de 2026.",
        "description_hi": "स्प्रिंग 2026 एनीमे सीज़न की मुख्य विशेषताएं।",
        "description_ar": "أبرز أحداث موسم الأنمي ربيع 2026.",
        "description_de": "Highlights aus der Anime-Saison Frühjahr 2026.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-30"
    },
    {
        "id": "9fb13a35",
        "name": "RawDEX Read Manhwa Raw Online",
        "url": "https://rawdex.net",
        "category": "Manga & Doujinshi",
        "description": "Read manga, manhwa and webtoon raws online for free on RawDEX. Explore the latest Korean and Japanese raw chapters with daily updates and high-quality",
        "description_es": "Lea raws manga, manhwa y webtoon en línea de forma gratuita en RawDEX. Explore los últimos capítulos sin procesar coreanos y japoneses con actualizaciones diarias y alta calidad.",
        "description_jp": "RawDEX でオンラインでマンガ、漫画、ウェブトゥーンを無料で読んでください。毎日の更新と高品質の最新の韓国語と日本語の生の章を探索してください",
        "description_fr": "Lisez gratuitement les mangas, manhwa et webtoon raws en ligne sur RawDEX. Explorez les derniers chapitres bruts coréens et japonais avec des mises à jour quotidiennes et de haute qualité",
        "description_pt": "Leia raws de manhwa, manhwa e webtoon online gratuitamente no RawDEX. Explore os últimos capítulos brutos em coreano e japonês com atualizações diárias e alta qualidade",
        "description_hi": "मंगा, मैनहवा और वेबटून रॉज़ को रॉडेक्स पर निःशुल्क ऑनलाइन पढ़ें। दैनिक अपडेट और उच्च गुणवत्ता के साथ नवीनतम कोरियाई और जापानी कच्चे अध्यायों का अन्वेषण करें",
        "description_ar": "اقرأ المانجا والمانهوا والويبتون الخام عبر الإنترنت مجانًا على RawDEX. استكشف أحدث الفصول الخام الكورية واليابانية مع التحديثات اليومية والجودة العالية",
        "description_de": "Lesen Sie Manga-, Manhwa- und Webtoon-Rohbücher kostenlos online auf RawDEX. Entdecken Sie die neuesten koreanischen und japanischen Rohkapitel mit täglichen Updates und hoher Qualität",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-30"
    },
    {
        "id": "cb0518fc",
        "name": "2026 in anime - Wikipedia",
        "url": "https://en.wikipedia.org/wiki/2026_in_anime",
        "category": "Anime Streaming",
        "description": "Discover 2026 in anime - Wikipedia - A high quality portal for your favorite content.",
        "description_es": "Descubre 2026 en anime - Wikipedia - Un portal de alta calidad para tu contenido favorito.",
        "description_jp": "アニメで 2026 年を知る - Wikipedia - お気に入りのコンテンツのための高品質ポータル。",
        "description_fr": "Découvrez 2026 en anime - Wikipédia - Un portail de haute qualité pour votre contenu préféré.",
        "description_pt": "Descubra 2026 em anime - Wikipedia - Um portal de alta qualidade para seus conteúdos favoritos.",
        "description_hi": "एनीमे में 2026 खोजें - विकिपीडिया - आपकी पसंदीदा सामग्री के लिए एक उच्च गुणवत्ता वाला पोर्टल।",
        "description_ar": "اكتشف 2026 في الأنمي - ويكيبيديا - بوابة عالية الجودة للمحتوى المفضل لديك.",
        "description_de": "Entdecken Sie 2026 im Anime – Wikipedia – Ein hochwertiges Portal für Ihre Lieblingsinhalte.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-30"
    },
    {
        "id": "7caf8703",
        "name": "The Best Hentai Site (50 - ) - Forums - MyAnimeLis",
        "url": "https://myanimelist.net/forum?topicid=359195&show=50",
        "category": "Anime Streaming",
        "description": "Read the topic about The Best Hentai Site on MyAnimeList, and join in the discussion on the largest online anime and manga database in the world! Join",
        "description_es": "Lea el tema sobre El mejor sitio hentai en MyAnimeList y únase a la discusión sobre la base de datos de anime y manga en línea más grande del mundo. Unirse",
        "description_jp": "MyAnimeList で最高のエロアニメ サイトに関するトピックを読んで、世界最大のオンライン アニメとマンガのデータベースでのディスカッションに参加しましょう!参加する",
        "description_fr": "Lisez le sujet sur le meilleur site Hentai sur MyAnimeList et rejoignez la discussion sur la plus grande base de données d'anime et de manga en ligne au monde ! Rejoindre",
        "description_pt": "Leia o tópico sobre O Melhor Site Hentai no MyAnimeList e participe da discussão no maior banco de dados online de anime e mangá do mundo! Juntar",
        "description_hi": "MyAnimeList पर सर्वश्रेष्ठ हेनतई साइट के बारे में विषय पढ़ें, और दुनिया के सबसे बड़े ऑनलाइन एनीमे और मंगा डेटाबेस पर चर्चा में शामिल हों! जोड़ना",
        "description_ar": "اقرأ موضوع أفضل موقع هنتاي على MyAnimeList، وانضم إلى المناقشة حول أكبر قاعدة بيانات للأنمي والمانغا على الإنترنت في العالم! ينضم",
        "description_de": "Lesen Sie das Thema „Die beste Hentai-Site“ auf MyAnimeList und beteiligen Sie sich an der Diskussion über die größte Online-Anime- und Manga-Datenbank der Welt! Verbinden",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-30"
    },
    {
        "id": "c8b3cac2",
        "name": "Simply Hentai & 24+ Hentai Manga Sites Like Simply",
        "url": "https://theporndude.com/1160/simply-hentai",
        "category": "Hentai Streaming",
        "description": "Simply-Hentai.com is a one stop shop for all your hentai needs. In addition to videos, Simply Hentai also has huge categories of manga comics and GIFs",
        "description_es": "Simply-Hentai.com es una ventanilla única para todas sus necesidades hentai. Además de vídeos, Simply Hentai también cuenta con enormes categorías de cómics manga y GIF.",
        "description_jp": "Simply-Hentai.com は、エロアニメのあらゆるニーズに応えるワンストップ ショップです。 Simply Hentai にはビデオに加えて、漫画コミックや GIF の巨大なカテゴリもあります。",
        "description_fr": "Simply-Hentai.com est un guichet unique pour tous vos besoins hentai. En plus des vidéos, Simply Hentai propose également d'énormes catégories de mangas et de GIF.",
        "description_pt": "Simply-Hentai.com é um balcão único para todas as suas necessidades hentai. Além de vídeos, Simply Hentai também possui grandes categorias de quadrinhos mangá e GIFs",
        "description_hi": "Simple-Hentai.com आपकी सभी हेनतई आवश्यकताओं के लिए वन-स्टॉप शॉप है। वीडियो के अलावा, सिंपली हेंटाई में मंगा कॉमिक्स और जीआईएफ की विशाल श्रेणियां भी हैं",
        "description_ar": "يعد موقع Simply-Hentai.com متجرًا شاملاً لجميع احتياجات الهنتاي الخاصة بك. بالإضافة إلى مقاطع الفيديو، يتوفر لدى Simply Hentai أيضًا فئات ضخمة من قصص المانغا المصورة وصور GIF",
        "description_de": "Simply-Hentai.com ist ein One-Stop-Shop für alle Ihre Hentai-Bedürfnisse. Neben Videos bietet Simply Hentai auch riesige Kategorien an Manga-Comics und GIFs",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-30"
    },
    {
        "id": "839f5a2a",
        "name": "hstream.moe: Watch Highest Quality Hentai in 4k, 1",
        "url": "https://hstream.moe",
        "category": "Anime Streaming",
        "description": "The best free 4k hentai site you will ever need online! Free 1080p hentai downloads and 4k hentai streams!",
        "description_es": "¡El mejor sitio hentai 4k gratuito que jamás necesitarás en línea! ¡Descargas hentai de 1080p gratuitas y transmisiones hentai de 4k!",
        "description_jp": "オンラインで必要となる最高の無料 4K エロアニメ サイト!無料の 1080p エロアニメのダウンロードと 4k エロアニメ ストリーム!",
        "description_fr": "Le meilleur site hentai 4K gratuit dont vous aurez besoin en ligne ! Téléchargements hentai 1080p gratuits et flux hentai 4k !",
        "description_pt": "O melhor site hentai 4k gratuito que você precisará online! Downloads gratuitos de hentai em 1080p e transmissões de hentai em 4k!",
        "description_hi": "सबसे अच्छी मुफ्त 4k हेनतई साइट जिसकी आपको कभी भी ऑनलाइन आवश्यकता होगी! मुफ़्त 1080p हेनतई डाउनलोड और 4k हेनतई स्ट्रीम!",
        "description_ar": "أفضل موقع هنتاي مجاني بدقة 4K ستحتاج إليه عبر الإنترنت! تنزيلات هنتاي مجانية بدقة 1080 بكسل وتدفقات هنتاي بدقة 4K!",
        "description_de": "Die beste kostenlose 4K-Hentai-Seite, die Sie jemals online brauchen werden! Kostenlose 1080p-Hentai-Downloads und 4K-Hentai-Streams!",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-30"
    },
    {
        "id": "85097b33",
        "name": "Porn Comics, Hentai Manga, Retro Sex XXX Rule 34 A",
        "url": "https://allporncomic.com",
        "category": "Hentai Streaming",
        "description": "Read and Download Porn Comics Comix, Hentai manga, sex comic, retro porn adult comics, Rule 34 HD porn comics and more XXX comics for free!",
        "description_es": "Lea y descargue Comix de cómics porno, manga hentai, cómic sexual, cómics porno retro para adultos, cómics porno Rule 34 HD y más cómics XXX gratis.",
        "description_jp": "ポルノ コミック コミックス、エロ漫画、セックス コミック、レトロ ポルノ アダルト コミック、ルール 34 HD ポルノ コミックなど、XXX コミックを無料で読んでダウンロードできます。",
        "description_fr": "Lisez et téléchargez des bandes dessinées porno Comix, des mangas Hentai, des bandes dessinées sexuelles, des bandes dessinées porno rétro pour adultes, des bandes dessinées porno HD Rule 34 et plus de bandes dessinées XXX gratuitement !",
        "description_pt": "Leia e baixe Porn Comics Comix, mangá Hentai, quadrinhos de sexo, quadrinhos adultos pornôs retrô, quadrinhos pornôs HD Rule 34 e mais quadrinhos XXX gratuitamente!",
        "description_hi": "पोर्न कॉमिक्स कॉमिक्स, हेनतई मंगा, सेक्स कॉमिक, रेट्रो पोर्न वयस्क कॉमिक्स, नियम 34 एचडी पोर्न कॉमिक्स और अधिक XXX कॉमिक्स मुफ्त में पढ़ें और डाउनलोड करें!",
        "description_ar": "قراءة وتنزيل Porn Comics Comix، هنتاي مانغا، كوميدي جنسي، كاريكاتير إباحي قديم للبالغين، القاعدة 34 كاريكاتير إباحي عالي الدقة والمزيد من XXX كاريكاتير مجانًا!",
        "description_de": "Lesen und laden Sie Porno-Comics Comix, Hentai-Manga, Sex-Comics, Retro-Porno-Comics für Erwachsene, Rule 34 HD-Porno-Comics und weitere XXX-Comics kostenlos herunter!",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-30"
    },
    {
        "id": "5550b264",
        "name": "Multporn: Porn Comics, Hentai Manga, Porn Videos",
        "url": "https://multporn.net",
        "category": "Hentai Streaming",
        "description": "On this site we post daily updates on Porn Comics and add to our already huge collection. We also have Manga, Videos, Pictures and even a Humor sectio",
        "description_es": "En este sitio publicamos actualizaciones diarias sobre cómics porno y las agregamos a nuestra ya enorme colección. También tenemos Manga, Vídeos, Imágenes e incluso una sección de Humor.",
        "description_jp": "このサイトでは、ポルノ漫画に関する最新情報を毎日投稿し、すでに膨大なコレクションに追加しています。マンガ、ビデオ、写真、さらにはユーモアセクションもあります",
        "description_fr": "Sur ce site, nous publions des mises à jour quotidiennes sur Porn Comics et ajoutons à notre collection déjà énorme. Nous avons aussi des Mangas, des Vidéos, des Images et même une section Humour.",
        "description_pt": "Neste site publicamos atualizações diárias sobre Porn Comics e aumentamos nossa já enorme coleção. Também temos Mangá, Vídeos, Fotos e até uma seção de Humor",
        "description_hi": "इस साइट पर हम पोर्न कॉमिक्स पर दैनिक अपडेट पोस्ट करते हैं और अपने पहले से ही विशाल संग्रह में इजाफा करते हैं। हमारे पास मंगा, वीडियो, चित्र और यहां तक ​​कि एक हास्य अनुभाग भी है",
        "description_ar": "ننشر على هذا الموقع تحديثات يومية عن Porn Comics ونضيفها إلى مجموعتنا الضخمة بالفعل. لدينا أيضًا قسم المانغا ومقاطع الفيديو والصور وحتى قسم الفكاهة",
        "description_de": "Auf dieser Website veröffentlichen wir täglich Updates zu Porno-Comics und erweitern unsere bereits riesige Sammlung. Wir haben auch Manga, Videos, Bilder und sogar einen Humor-Bereich",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-30"
    },
    {
        "id": "d238ef2e",
        "name": "Hentai Discord Servers - Find Hentai Communities |",
        "url": "https://discordservers.com/search/hentai",
        "category": "Hentai Streaming",
        "description": "Discover the best Hentai Discord servers. Browse and join active hentai communities, chat rooms, and groups on Discord.",
        "description_es": "Descubre los mejores servidores Hentai Discord. Explora y únete a comunidades hentai activas, salas de chat y grupos en Discord.",
        "description_jp": "最高の変態 Discord サーバーを発見してください。 Discord でアクティブなエロ コミュニティ、チャット ルーム、グループを参照して参加しましょう。",
        "description_fr": "Découvrez les meilleurs serveurs Hentai Discord. Parcourez et rejoignez des communautés hentai actives, des salons de discussion et des groupes sur Discord.",
        "description_pt": "Descubra os melhores servidores Hentai Discord. Navegue e participe de comunidades hentai ativas, salas de bate-papo e grupos no Discord.",
        "description_hi": "सर्वोत्तम हेनतई डिस्कॉर्ड सर्वर खोजें। डिस्कॉर्ड पर सक्रिय हेनतई समुदायों, चैट रूम और समूहों को ब्राउज़ करें और उनसे जुड़ें।",
        "description_ar": "اكتشف أفضل خوادم Hentai Discord. تصفح وانضم إلى مجتمعات الهنتاي النشطة وغرف الدردشة والمجموعات على Discord.",
        "description_de": "Entdecken Sie die besten Hentai Discord-Server. Durchsuchen Sie aktive Hentai-Communitys, Chatrooms und Gruppen auf Discord und treten Sie ihnen bei.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-30"
    },
    {
        "id": "63963cbc",
        "name": "Anime Sharing & 27+ Porn Forums Like Anime-sharing",
        "url": "https://theporndude.com/5855/animesharing",
        "category": "Anime Streaming",
        "description": "Who’s up for AnimeSharing? Don’t answer that. I can already tell from the fedora, neckbeard and stale aroma of virginity that you are. Well, put the",
        "description_es": "¿Quién se apunta a AnimeSharing? No respondas eso. Ya puedo decir por el sombrero de fieltro, la barba al cuello y el rancio aroma de virginidad que eres. Bueno, pon el",
        "description_jp": "AnimeSharing に興味のある人は誰ですか?それには答えないでください。フェドーラ帽、首ひげ、そして処女の古びた香りから、あなたがそれであることがすでにわかります。さて、それを入れてください",
        "description_fr": "Qui est partant pour AnimeSharing ? Ne répondez pas à cela. Je peux déjà dire au fedora, à la barbe et à l'arôme fade de la virginité que vous l'êtes. Eh bien, mets le",
        "description_pt": "Quem está interessado no AnimeSharing? Não responda isso. Já posso dizer pelo chapéu, pela barba e pelo aroma rançoso da virgindade que você é. Bem, coloque o",
        "description_hi": "एनीमेशेयरिंग के लिए कौन तैयार है? इसका उत्तर मत दो. मैं पहले से ही फेडोरा, गर्दन की दाढ़ी और कौमार्य की बासी सुगंध से बता सकता हूं कि आप कौन हैं। अच्छा, डालो",
        "description_ar": "من هو المناسب لمشاركة الأنمي؟ لا تجيب على ذلك. أستطيع أن أقول بالفعل من فيدورا، ولحية العنق، ورائحة العذرية التي لا معنى لها، أنك أنت. حسنا، ضع",
        "description_de": "Wer hat Lust auf AnimeSharing? Beantworte das nicht. An dem Fedora, dem Nackenbart und dem abgestandenen Duft der Jungfräulichkeit kann ich bereits erkennen, dass du bist. Nun, setzen Sie das",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-30"
    },
    {
        "id": "73299371",
        "name": "Spring 2026 Anime & Where to Watch Them Online Leg",
        "url": "https://yattatachi.com/watch-spring-2026-anime",
        "category": "Anime Streaming",
        "description": "A list of the Spring 2026 Anime & where you can stream them online legally",
        "description_es": "Una lista del anime de primavera de 2026 y dónde puedes transmitirlos en línea legalmente",
        "description_jp": "2026 年春アニメのリストとオンラインで合法的にストリーミングできる場所",
        "description_fr": "Une liste des anime du printemps 2026 et où vous pouvez les diffuser en ligne légalement",
        "description_pt": "Uma lista dos animes da primavera de 2026 e onde você pode transmiti-los online legalmente",
        "description_hi": "स्प्रिंग 2026 एनीमे की एक सूची और जहां आप उन्हें कानूनी रूप से ऑनलाइन स्ट्रीम कर सकते हैं",
        "description_ar": "قائمة بأنمي ربيع 2026 وحيث يمكنك بثها عبر الإنترنت بشكل قانوني",
        "description_de": "Eine Liste der Frühjahrs-Anime 2026 und wo Sie sie legal online streamen können",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-30"
    },
    {
        "id": "321118d0",
        "name": "recommendtions for hentai streaming sites | F95zon",
        "url": "https://f95zone.to/threads/recommendtions-for-hentai-streaming-sites.27189",
        "category": "Anime Streaming",
        "description": "hi Im looking for a good hentai streaming sites I hope someone can give some tnx",
        "description_es": "Hola, estoy buscando buenos sitios de transmisión de hentai. Espero que alguien pueda darme algo de información.",
        "description_jp": "こんにちは、良いエロ動画ストリーミング サイトを探しています。誰かが tnx を提供してくれることを願っています",
        "description_fr": "salut, je recherche de bons sites de streaming hentai, j'espère que quelqu'un pourra donner un peu de tnx",
        "description_pt": "oi, estou procurando bons sites de streaming de hentai, espero que alguém possa dar algum tnx",
        "description_hi": "नमस्ते, मैं अच्छी हेनतई स्ट्रीमिंग साइटों की तलाश में हूं, मुझे आशा है कि कोई कुछ टीएनएक्स दे सकता है",
        "description_ar": "مرحبًا، أنا أبحث عن مواقع بث هنتاي جيدة وآمل أن يتمكن شخص ما من تقديم بعض tnx",
        "description_de": "Hallo, ich bin auf der Suche nach einer guten Hentai-Streaming-Seite. Ich hoffe, jemand kann mir etwas sagen",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-30"
    },
    {
        "id": "b1c903fa",
        "name": "Complete list with all the hentai of the English s",
        "url": "https://www.hentais.tube/hentai-list/4",
        "category": "Hentai Streaming",
        "description": "Complete list with all the hentais registered to watch online or download, Page 4",
        "description_es": "Lista completa con todos los hentai registrados para ver online o descargar, Página 4",
        "description_jp": "オンラインで視聴またはダウンロードするために登録されているすべてのエロアニメの完全なリスト、ページ 4",
        "description_fr": "Liste complète avec tous les hentais inscrits pour regarder en ligne ou télécharger, Page 4",
        "description_pt": "Lista completa com todos os hentais cadastrados para assistir online ou baixar, Página 4",
        "description_hi": "ऑनलाइन देखने या डाउनलोड करने के लिए पंजीकृत सभी हेंताई की पूरी सूची, पृष्ठ 4",
        "description_ar": "قائمة كاملة بجميع الهنتاي المسجلين للمشاهدة عبر الإنترنت أو التنزيل، الصفحة 4",
        "description_de": "Vollständige Liste mit allen Hentais, die zum Online-Anschauen oder Herunterladen registriert sind, Seite 4",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-30"
    },
    {
        "id": "a7d0180b",
        "name": "Full list with all hentai anime - Page 2",
        "url": "https://www.hentaitube.online/hentai-list/2",
        "category": "Anime Streaming",
        "description": "Check here the list with all the hentai anime available to watch online or download. Browse behind the initial covers and letters, Page 2",
        "description_es": "Consulta aquí el listado con todos los anime hentai disponibles para ver online o descargar. Explore detrás de las portadas y letras iniciales, Página 2",
        "description_jp": "オンラインで視聴またはダウンロードできるすべてのエロアニメのリストをここでチェックしてください。最初の表紙と文字の裏を参照、2 ページ",
        "description_fr": "Consultez ici la liste de tous les anime hentai disponibles à regarder en ligne ou à télécharger. Parcourez derrière les couvertures et les lettres initiales, page 2",
        "description_pt": "Confira aqui a lista com todos os animes hentai disponíveis para assistir online ou baixar. Navegue por trás das capas e letras iniciais, página 2",
        "description_hi": "ऑनलाइन देखने या डाउनलोड करने के लिए उपलब्ध सभी हेनतई एनीमे की सूची यहां देखें। आरंभिक कवर और अक्षरों के पीछे ब्राउज़ करें, पृष्ठ 2",
        "description_ar": "تحقق هنا من القائمة التي تحتوي على جميع الرسوم المتحركة الهنتاي المتاحة للمشاهدة عبر الإنترنت أو التنزيل. تصفح خلف الأغلفة والرسائل الأولية، الصفحة 2",
        "description_de": "Sehen Sie sich hier die Liste aller Hentai-Anime an, die Sie online ansehen oder herunterladen können. Blättern Sie hinter den ersten Umschlägen und Buchstaben, Seite 2",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-30"
    },
    {
        "id": "3fa5abd1",
        "name": "Top Hentai Discord Servers",
        "url": "https://discadia.com?q=hentai",
        "category": "Hentai Streaming",
        "description": "Discover Top Hentai Discord Servers - A high quality portal for your favorite content.",
        "description_es": "Descubra los mejores servidores Hentai Discord: un portal de alta calidad para su contenido favorito.",
        "description_jp": "トップヘンタイ Discord サーバーを発見 - お気に入りのコンテンツのための高品質ポータル。",
        "description_fr": "Découvrez les meilleurs serveurs Hentai Discord - Un portail de haute qualité pour votre contenu préféré.",
        "description_pt": "Descubra os melhores servidores Hentai Discord - Um portal de alta qualidade para seu conteúdo favorito.",
        "description_hi": "शीर्ष हेनतई डिस्कॉर्ड सर्वर खोजें - आपकी पसंदीदा सामग्री के लिए एक उच्च गुणवत्ता वाला पोर्टल।",
        "description_ar": "اكتشف أفضل خوادم Hentai Discord - بوابة عالية الجودة للمحتوى المفضل لديك.",
        "description_de": "Entdecken Sie die besten Hentai-Discord-Server – ein hochwertiges Portal für Ihre Lieblingsinhalte.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-30"
    },
    {
        "id": "0c36b185",
        "name": "Top Hentai Forums - Best Online Communities for He",
        "url": "https://ispyhentai.com/hentai-forums",
        "category": "Hentai Streaming",
        "description": "Find the best hentai forums for sharing anime porn, rare doujins, hentai manga, and community discussions. Active, international, and handpicked.",
        "description_es": "Encuentra los mejores foros hentai para compartir porno anime, doujins raros, manga hentai y debates comunitarios. Activo, internacional y cuidadosamente seleccionado.",
        "description_jp": "アニメポルノ、レアな同人誌、エロ漫画、コミュニティディスカッションを共有するための最高のエロアニメフォーラムを見つけてください。アクティブで、インターナショナルで、厳選されたものです。",
        "description_fr": "Trouvez les meilleurs forums hentai pour partager du porno anime, des doujins rares, des mangas hentai et des discussions communautaires. Actif, international et trié sur le volet.",
        "description_pt": "Encontre os melhores fóruns hentai para compartilhar pornografia de anime, doujins raros, mangá hentai e discussões da comunidade. Ativo, internacional e escolhido a dedo.",
        "description_hi": "एनीमे पोर्न, दुर्लभ डोजिन, हेनतई मंगा और सामुदायिक चर्चाएँ साझा करने के लिए सर्वोत्तम हेनतई मंच खोजें। सक्रिय, अंतर्राष्ट्रीय और चयनित।",
        "description_ar": "ابحث عن أفضل منتديات الهنتاي لمشاركة إباحيات الأنمي والدوجين النادرة ومانجا الهنتاي ومناقشات المجتمع. نشطة، دولية، ومنتقاة بعناية.",
        "description_de": "Finden Sie die besten Hentai-Foren zum Teilen von Anime-Pornos, seltenen Doujins, Hentai-Manga und Community-Diskussionen. Aktiv, international und handverlesen.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-30"
    },
    {
        "id": "1104bf4e",
        "name": "Uncensored Hentai Porn Videos - Pornhub",
        "url": "https://www.pornhub.com/video/search?search=uncensored+hentai",
        "category": "Hentai Streaming",
        "description": "Watch uncensored hentai porn videos in HD on Pornhub. Enjoy explicit anime sex scenes with no censorship, plus a huge selection of free uncensored hen",
        "description_es": "Mira videos porno hentai sin censura en HD en Pornhub. Disfruta de escenas de sexo anime explícitas sin censura, además de una gran selección de despedidas de soltera gratuitas sin censura.",
        "description_jp": "Pornhub で HD の無修正エロビデオ ポルノビデオをご覧ください。検閲なしで露骨なアニメのセックスシーンに加え、無料の無修正ヘンの膨大なセレクションをお楽しみください",
        "description_fr": "Regardez des vidéos porno hentai non censurées en HD sur Pornhub. Profitez de scènes de sexe animées explicites sans censure, ainsi que d'une vaste sélection de poules gratuites et non censurées.",
        "description_pt": "Assista a vídeos pornôs hentai sem censura em HD no Pornhub. Desfrute de cenas de sexo explícitas de anime sem censura, além de uma grande seleção de galinhas gratuitas e sem censura",
        "description_hi": "पोर्नहब पर एचडी में बिना सेंसर वाले हेनतई अश्लील वीडियो देखें। बिना किसी सेंसरशिप के स्पष्ट एनीमे सेक्स दृश्यों का आनंद लें, साथ ही मुफ्त बिना सेंसर वाले मुर्गियों के विशाल चयन का आनंद लें",
        "description_ar": "شاهد مقاطع الفيديو الإباحية الهنتاي غير الخاضعة للرقابة بدقة عالية على Pornhub. استمتع بمشاهد الأنيمي الجنسية الصريحة دون أي رقابة، بالإضافة إلى مجموعة كبيرة من الدجاجات المجانية غير الخاضعة للرقابة",
        "description_de": "Sehen Sie sich unzensierte Hentai-Pornovideos in HD auf Pornhub an. Genießen Sie explizite Anime-Sexszenen ohne Zensur sowie eine riesige Auswahl an kostenlosen, unzensierten Hühnern",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-30"
    },
    {
        "id": "bc5772a2",
        "name": "Content | AllPornComix Forum",
        "url": "https://forum.allporncomix.com/categories/content.1",
        "category": "Hentai Streaming",
        "description": "A place to share your comics / mangas and other adult content",
        "description_es": "Un lugar para compartir tus cómics/mangas y otro contenido para adultos.",
        "description_jp": "漫画やマンガ、その他のアダルト コンテンツを共有する場所",
        "description_fr": "Un endroit pour partager vos BD/mangas et autres contenus pour adultes",
        "description_pt": "Um lugar para compartilhar seus quadrinhos/mangás e outros conteúdos adultos",
        "description_hi": "आपकी कॉमिक्स/मंगास और अन्य वयस्क सामग्री साझा करने का स्थान",
        "description_ar": "مكان لمشاركة القصص المصورة/المانجا والمحتويات الأخرى الخاصة بالبالغين",
        "description_de": "Ein Ort, an dem Sie Ihre Comics/Mangas und andere Inhalte für Erwachsene teilen können",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-30"
    },
    {
        "id": "8b9dfcd3",
        "name": "The Definitive Guide on How to Watch RAW Anime (wi",
        "url": "https://medium.com/@jouzujuls/the-definitive-guide-on-how-to-watch-raw-anime-with-japanese-subs-f0bf443a5513",
        "category": "Anime Streaming",
        "description": "The Definitive Guide on How to Watch RAW Anime (with Japanese Subs) Anybody learning Japanese who likes anime will be hard-pressed to find an actual g",
        "description_es": "La guía definitiva sobre cómo ver anime RAW (con subtítulos japoneses) Cualquiera que esté aprendiendo japonés y a quien le guste el anime tendrá dificultades para encontrar un programa real.",
        "description_jp": "RAWアニメ（日本語字幕付き）の視聴方法に関する決定版ガイド アニメが好きで日本語を勉強している人なら、実際のアニメを見つけるのは難しいでしょう。",
        "description_fr": "Le guide définitif sur la façon de regarder des anime RAW (avec sous-marins japonais) Quiconque apprend le japonais et aime les anime aura du mal à trouver un véritable g",
        "description_pt": "O guia definitivo sobre como assistir anime RAW (com legendas em japonês) Qualquer pessoa que esteja aprendendo japonês e goste de anime terá dificuldade em encontrar um jogo de verdade.",
        "description_hi": "रॉ एनीमे कैसे देखें (जापानी सब्सक्रिप्शन के साथ) पर निश्चित गाइड जापानी भाषा सीखने वाला कोई भी व्यक्ति जो एनीमे पसंद करता है उसे वास्तविक जी खोजने में कठिनाई होगी",
        "description_ar": "الدليل النهائي حول كيفية مشاهدة الرسوم المتحركة الخام (مع الغواصات اليابانية) أي شخص يتعلم اللغة اليابانية ويحب الرسوم المتحركة سيتعرض لضغوط شديدة للعثور على شخصية حقيقية",
        "description_de": "Der ultimative Leitfaden zum Ansehen von RAW-Anime (mit japanischen Untertiteln) Jeder, der Japanisch lernt und Anime mag, wird kaum einen echten G finden",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-30"
    },
    {
        "id": "ff0679f3",
        "name": "18PornComic: Read Hentai - Porncomic online for fr",
        "url": "https://18porncomic.com",
        "category": "Hentai Streaming",
        "description": "18PornComic. Welcome to 18PornComic.com, this site was made for porn comics (hentai, cartoon, manhwa porn, pornhwa, manhwa hentai, manga porn, porncom",
        "description_es": "18PornComic. Bienvenido a 18PornComic.com, este sitio fue hecho para cómics porno (hentai, dibujos animados, porno manhwa, pornhwa, manhwa hentai, porno manga, porncom",
        "description_jp": "18ポルノコミック。 18PornComic.com へようこそ。このサイトはポルノ漫画 (エロアニメ、漫画、漫画ポルノ、ポルノワ、漫画エロアニメ、漫画ポルノ、ポルノコム) のために作られました。",
        "description_fr": "18PornComic. Bienvenue sur 18PornComic.com, ce site a été conçu pour les bandes dessinées pornographiques (hentai, dessin animé, manhwa porn, pornhwa, manhwa hentai, manga porno, porncom",
        "description_pt": "18PornComic. Bem-vindo ao 18PornComic.com, este site foi feito para quadrinhos pornográficos (hentai, desenho animado, manhwa porn, pornhwa, manhwa hentai, mangá porn, porncom",
        "description_hi": "18पोर्नकॉमिक. 18PornComic.com में आपका स्वागत है, यह साइट पोर्न कॉमिक्स (हेनतई, कार्टून, मैनहवा पोर्न, पोर्नहवा, मैनहवा हेनतई, मंगा पोर्न, पोर्नकॉम) के लिए बनाई गई थी",
        "description_ar": "18 الإباحية المصورة. مرحبًا بك في 18PornComic.com، تم إنشاء هذا الموقع للقصص المصورة الإباحية (هنتاي، كارتون، مانهوا إباحي، بورنهوا، مانهوا هنتاي، مانغا إباحية، إباحية)",
        "description_de": "18PornComic. Willkommen bei 18PornComic.com, diese Seite wurde für Porno-Comics erstellt (Hentai, Cartoon, Manhwa-Porno, Pornhwa, Manhwa-Hentai, Manga-Porno, Porncom).",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-30"
    },
    {
        "id": "a2adb7d9",
        "name": "StepMILF 01 UNCENSORED HENTAI English Dubbed - Tna",
        "url": "https://www.tnaflix.com/cartoon-porn/StepMILF-01-UNCENSORED-HENTAI-English-Dubbed/video11579898",
        "category": "Hentai Streaming",
        "description": "TNAFLIX 'StepMILF 01  UNCENSORED HENTAI English Dubbed'",
        "description_es": "TNAFLIX 'StepMILF 01 HENTAI SIN CENSURA Doblado en inglés'",
        "description_jp": "TNAFLIX「StepMILF 01 無修正エロアニメ英語吹き替え」",
        "description_fr": "TNAFLIX 'StepMILF 01 HENTAI NON CENSURÉ doublé en anglais'",
        "description_pt": "TNAFLIX 'StepMILF 01 HENTAI SEM CENSURA Inglês Dublado'",
        "description_hi": "TNAFLIX 'स्टेपमिल्फ़ 01 बिना सेंसर वाली हेनतई अंग्रेजी डब'",
        "description_ar": "TNAFLIX 'StepMILF 01 غير خاضعة للرقابة هنتاي الإنجليزية يطلق عليها اسم'",
        "description_de": "TNAFLIX 'StepMILF 01 UNZENSIERTER HENTAI, Englisch synchronisiert'",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-30"
    },
    {
        "id": "393e5ac8",
        "name": "Hentai Archives | Hentai Comics Free",
        "url": "https://hentaicomicsfree.com/category/hentai",
        "category": "Hentai Streaming",
        "description": "Hentai, FreeHere you'll find comics, magazines, and hentai, in high quality, guaranteeing your total enjoyment, and the best part is it's all free.",
        "description_es": "Hentai, GratisAquí encontrarás cómics, revistas y hentai, en alta calidad, garantizando tu total disfrute, y lo mejor es que todo es gratis.",
        "description_jp": "変態、無料ここでは、高品質の漫画、雑誌、変態が見つかり、完全に楽しめることが保証されています。そして最も良い点は、すべて無料であることです。",
        "description_fr": "Hentai, gratuitIci, vous trouverez des bandes dessinées, des magazines et du hentai, de haute qualité, garantissant votre plaisir total, et le meilleur, c'est que tout est gratuit.",
        "description_pt": "Hentai, GrátisAqui você encontra quadrinhos, revistas e hentai, em alta qualidade, garantindo sua diversão total, e o melhor é que é tudo grátis.",
        "description_hi": "हेनतई, मुफ़्तयहां आपको उच्च गुणवत्ता में कॉमिक्स, पत्रिकाएं और हेनतई मिलेंगी, जो आपके संपूर्ण आनंद की गारंटी देती हैं, और सबसे अच्छी बात यह है कि यह सब मुफ़्त है।",
        "description_ar": "Hentai, Free ستجد هنا رسومًا هزلية ومجلات وهنتاي بجودة عالية، مما يضمن استمتاعك الكامل، وأفضل ما في الأمر هو أن كل ذلك مجاني.",
        "description_de": "Error 500 (Server Error)!!1500.That’s an error.There was an error. Please try again later.That’s all we know.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-30"
    },
    {
        "id": "34577a12",
        "name": "New Anime to Watch | Spring 2026",
        "url": "https://www.youtube.com/watch?v=KRh12VmjGrE",
        "category": "Anime Streaming",
        "description": "Enjoy the videos and music you love, upload original content, and share it all with friends, family, and the world on YouTube.",
        "description_es": "Disfruta de los vídeos y la música que te encantan, sube contenido original y compártelo todo con amigos, familiares y el mundo en YouTube.",
        "description_jp": "YouTube でお気に入りの動画や音楽を楽しみ、オリジナルのコンテンツをアップロードして友だちや家族、世界中の人たちと共有しましょう。",
        "description_fr": "Profitez des vidéos et de la musique que vous aimez, téléchargez du contenu original et partagez-le avec vos amis, votre famille et le monde entier sur YouTube.",
        "description_pt": "Aproveite os vídeos e as músicas que você adora, carregue conteúdo original e compartilhe tudo com amigos, familiares e o mundo no YouTube.",
        "description_hi": "अपने पसंदीदा वीडियो और संगीत का आनंद लें, मूल सामग्री अपलोड करें और इसे YouTube पर दोस्तों, परिवार और दुनिया के साथ साझा करें।",
        "description_ar": "استمتع بمقاطع الفيديو والموسيقى التي تحبها، وقم بتحميل المحتوى الأصلي، وشاركه كله مع الأصدقاء والعائلة والعالم على YouTube.",
        "description_de": "Genießen Sie die Videos und Musik, die Sie lieben, laden Sie Originalinhalte hoch und teilen Sie alles mit Freunden, Familie und der Welt auf YouTube.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-30"
    },
    {
        "id": "ec1532db",
        "name": "Crunchyroll Spring 2026 Anime Season Lineup Announ",
        "url": "https://www.crunchyroll.com/news/seasonal-lineup/2026/3/24/spring-anime-2026-crunchyroll",
        "category": "Anime Streaming",
        "description": "Stay on top of anime news and updates straight out of Japan with Crunchyroll News. From breaking stories to evergreen content, get all your anime and ",
        "description_es": "Mantente al tanto de las noticias y actualizaciones del anime directamente desde Japón con Crunchyroll News. Desde historias de última hora hasta contenido imperecedero, obtén todo tu anime y",
        "description_jp": "Crunchyroll News を利用して、日本から直接アニメのニュースや最新情報を入手してください。最新のニュースから永遠のコンテンツまで、すべてのアニメを入手し、",
        "description_fr": "Restez au courant de l'actualité et des mises à jour sur les anime en provenance directe du Japon avec Crunchyroll News. Des dernières histoires au contenu permanent, obtenez tous vos anime et",
        "description_pt": "Fique por dentro das notícias e atualizações de anime direto do Japão com o Crunchyroll News. De histórias de última hora a conteúdo perene, obtenha todos os seus animes e",
        "description_hi": "Crunchyroll News के साथ सीधे जापान से एनीमे समाचार और अपडेट के शीर्ष पर रहें। ब्रेकिंग स्टोरीज़ से लेकर सदाबहार सामग्री तक, अपने सभी एनीमे और प्राप्त करें",
        "description_ar": "ابق على اطلاع بأخبار وتحديثات الأنمي مباشرة من اليابان مع أخبار Crunchyroll. بدءًا من القصص العاجلة وحتى المحتوى الدائم، احصل على جميع الرسوم المتحركة و",
        "description_de": "Bleiben Sie mit Crunchyroll News über Anime-Neuigkeiten und Updates direkt aus Japan auf dem Laufenden. Holen Sie sich alle Ihre Animes und",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-30"
    },
    {
        "id": "52863e29",
        "name": "Hentaigasm: Watch Free Hentai Online With English ",
        "url": "https://hentaigasm.tv",
        "category": "Anime Streaming",
        "description": "Watch and download Hentaigasm – Watch Free Hentai Online With English Subtitle - Watch Hentai Anime Episodes On Hentaigasm Free, English Hentai, Henta",
        "description_es": "Mira y descarga Hentaigasm – Mira Hentai gratis en línea con subtítulos en inglés - Mira episodios de anime Hentai en Hentaigasm gratis, Hentai en inglés, Henta",
        "description_jp": "ヘンタイガズムを見てダウンロード – 英語字幕付きで無料のヘンタイをオンラインで見る - ヘンタイガスムのヘンタイアニメエピソードを無料で視聴し、英語のヘンタイ、ヘンタ",
        "description_fr": "Regardez et téléchargez Hentaigasm - Regardez du Hentai gratuit en ligne avec sous-titres anglais - Regardez des épisodes d'anime Hentai sur Hentaigasm gratuitement, Hentai anglais, Henta",
        "description_pt": "Assistir e baixar Hentaigasm – Assistir Hentai grátis online com legenda em inglês - Assistir episódios de anime Hentai em Hentaigasm grátis, Inglês Hentai, Henta",
        "description_hi": "Hentaigasm देखें और डाउनलोड करें - अंग्रेजी उपशीर्षक के साथ मुफ्त Hentai ऑनलाइन देखें - Hentaigasm पर मुफ्त में Hentai एनीमे एपिसोड देखें, अंग्रेजी Hentai, Henta",
        "description_ar": "شاهد وتنزيل Hentaigasm - شاهد هنتاي مجانًا عبر الإنترنت مع ترجمة باللغة الإنجليزية - شاهد حلقات هنتاي أنمي على Hentaigasm مجانًا، هنتاي الإنجليزية، هنتا",
        "description_de": "Hentaigasm ansehen und herunterladen – Kostenloses Hentai online mit englischen Untertiteln ansehen – Hentai-Anime-Episoden auf Hentaigasm Free, English Hentai, Henta ansehen",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-30"
    },
    {
        "id": "4429f274",
        "name": "Top Visual Novel NSFW games - itch.io",
        "url": "https://itch.io/games/genre-visual-novel/nsfw",
        "category": "Games & Visual Novels",
        "description": "Find Visual Novel NSFW games like The BloodRiver Saga: Retransmitter, The Headmaster, Artifice, Path of Desire: Cursed Chakra, Shadow Island on itch.i",
        "description_es": "Encuentra juegos NSFW de novela visual como The BloodRiver Saga: Retransmitter, The Headmaster, Artifice, Path of Desire: Cursed Chakra, Shadow Island en itch.i",
        "description_jp": "The BloodRiver Saga: Retransmitter、The Headmaster、Artifice、Path of Desire: Cursed Chakra、Shadow Island などのビジュアル ノベル NSFW ゲームを itch.i で見つけてください。",
        "description_fr": "Trouvez des jeux Visual Novel NSFW comme The BloodRiver Saga: Retransmitter, The Headmaster, Artifice, Path of Desire: Cursed Chakra, Shadow Island sur itch.i",
        "description_pt": "Encontre jogos Visual Novel NSFW como The BloodRiver Saga: Retransmitter, The Headmaster, Artifice, Path of Desire: Cursed Chakra, Shadow Island em itch.i",
        "description_hi": "द ब्लडरिवर सागा: रिट्रांसमीटर, द हेडमास्टर, आर्टिफिस, पाथ ऑफ डिज़ायर: कर्स्ड चक्र, शैडो आइलैंड जैसे विज़ुअल नॉवेल एनएसएफडब्ल्यू गेम्स itch.i पर खोजें।",
        "description_ar": "ابحث عن ألعاب Visual Novel NSFW مثل The BloodRiver Saga: Retransmitter وThe Headmaster وArtifice وPath of Desire: Cursed Chakra وShadow Island على موقع itch.i",
        "description_de": "Finden Sie Visual Novel NSFW-Spiele wie The BloodRiver Saga: Retransmitter, The Headmaster, Artifice, Path of Desire: Cursed Chakra, Shadow Island auf itch.i",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-30"
    },
    {
        "id": "790488d4",
        "name": "hentai | FreeOnes Forum",
        "url": "https://www.freeones.com/forums/tags/hentai",
        "category": "Hentai Streaming",
        "description": "Discover hentai | FreeOnes Forum - A high quality portal for your favorite content.",
        "description_es": "Descubre hentai | FreeOnes Forum: un portal de alta calidad para su contenido favorito.",
        "description_jp": "エロアニメを発見 | FreeOnes フォーラム - お気に入りのコンテンツのための高品質ポータル。",
        "description_fr": "Découvrez le hentai | Forum FreeOnes - Un portail de haute qualité pour votre contenu préféré.",
        "description_pt": "Descubra hentai | Fórum FreeOnes - Um portal de alta qualidade para seu conteúdo favorito.",
        "description_hi": "हेनतई की खोज करें | फ्रीवन्स फोरम - आपकी पसंदीदा सामग्री के लिए एक उच्च गुणवत्ता वाला पोर्टल।",
        "description_ar": "اكتشف الهنتاي | منتدى FreeOnes - بوابة عالية الجودة للمحتوى المفضل لديك.",
        "description_de": "Entdecken Sie Hentai | FreeOnes Forum – Ein hochwertiges Portal für Ihre Lieblingsinhalte.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-30"
    },
    {
        "id": "19eddbf9",
        "name": "Anime Without Subtitles - Listening - WaniKani Com",
        "url": "https://community.wanikani.com/t/anime-without-subtitles/58990",
        "category": "Anime Streaming",
        "description": "I want to keep improving my listening ability, but I need help finding places where I can watch anime without subtitles. I know there’s Netflix and Cr",
        "description_es": "Quiero seguir mejorando mi capacidad auditiva, pero necesito ayuda para encontrar lugares donde pueda ver anime sin subtítulos. Sé que hay Netflix y Cr",
        "description_jp": "リスニング能力を向上させ続けたいのですが、字幕なしでアニメを視聴できる場所を見つけるのに助けが必要です。 Netflix と Cr があることは知っています",
        "description_fr": "Je veux continuer à améliorer ma capacité d'écoute, mais j'ai besoin d'aide pour trouver des endroits où je peux regarder des anime sans sous-titres. Je sais qu'il y a Netflix et Cr",
        "description_pt": "Quero continuar melhorando minha capacidade auditiva, mas preciso de ajuda para encontrar lugares onde possa assistir animes sem legendas. Eu sei que existe Netflix e Cr",
        "description_hi": "मैं अपनी सुनने की क्षमता में सुधार जारी रखना चाहता हूं, लेकिन मुझे ऐसी जगहें ढूंढने में मदद चाहिए जहां मैं बिना उपशीर्षक के एनीमे देख सकूं। मुझे पता है कि नेटफ्लिक्स और सीआर हैं",
        "description_ar": "أريد الاستمرار في تحسين قدرتي على الاستماع، ولكني بحاجة إلى مساعدة في العثور على أماكن يمكنني من خلالها مشاهدة الرسوم المتحركة بدون ترجمة. أعلم أن هناك Netflix وCr",
        "description_de": "Ich möchte mein Hörverständnis weiter verbessern, brauche aber Hilfe bei der Suche nach Orten, an denen ich Anime ohne Untertitel ansehen kann. Ich weiß, dass es Netflix und Cr gibt",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-30"
    },
    {
        "id": "38ce93e0",
        "name": "New anime in 2026: the biggest upcoming and ongoin",
        "url": "https://www.gamesradar.com/new-anime-release-dates-upcoming-schedule",
        "category": "Anime Streaming",
        "description": "All the 2026 new anime you need to know about, including release dates for the upcoming winter season on Crunchyroll, Prime Video, and Netflix",
        "description_es": "Todo el nuevo anime de 2026 que necesitas saber, incluidas las fechas de lanzamiento de la próxima temporada de invierno en Crunchyroll, Prime Video y Netflix.",
        "description_jp": "Crunchyroll、Prime Video、Netflix での次の冬シーズンのリリース日を含む、知っておくべき 2026 年の新作アニメのすべて",
        "description_fr": "Tous les nouveaux anime 2026 que vous devez savoir, y compris les dates de sortie de la prochaine saison hivernale sur Crunchyroll, Prime Video et Netflix",
        "description_pt": "Todos os novos animes de 2026 que você precisa saber, incluindo datas de lançamento para a próxima temporada de inverno no Crunchyroll, Prime Video e Netflix",
        "description_hi": "क्रंच्यरोल, प्राइम वीडियो और नेटफ्लिक्स पर आगामी शीतकालीन सीज़न की रिलीज़ तिथियों सहित सभी 2026 नए एनीमे के बारे में आपको जानना आवश्यक है",
        "description_ar": "جميع الرسوم المتحركة الجديدة لعام 2026 التي تحتاج إلى معرفتها، بما في ذلك تواريخ إصدار موسم الشتاء القادم على Crunchyroll وPrime Video وNetflix",
        "description_de": "Alle neuen Animes aus dem Jahr 2026, über die Sie wissen müssen, einschließlich der Veröffentlichungstermine für die kommende Wintersaison auf Crunchyroll, Prime Video und Netflix",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-30"
    },
    {
        "id": "52fcff95",
        "name": "Sites tagged hentai - Neocities",
        "url": "https://neocities.org/browse?tag=hentai",
        "category": "Hentai Streaming",
        "description": "Browse Neocities websites tagged hentai.",
        "description_es": "Explora sitios web de Neocities etiquetados como hentai.",
        "description_jp": "エロアニメのタグが付いた Neocities の Web サイトを閲覧します。",
        "description_fr": "Parcourez les sites Web de Neocities marqués hentai.",
        "description_pt": "Navegue pelos sites da Neocities marcados com hentai.",
        "description_hi": "हेनतई टैग की गई नियोसिटीज़ वेबसाइटें ब्राउज़ करें।",
        "description_ar": "تصفح مواقع Neocity التي تحمل علامة الهنتاي.",
        "description_de": "Durchsuchen Sie Neocities-Websites mit dem Tag „Hentai“.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-30"
    },
    {
        "id": "7aec20b3",
        "name": "Steam Curator: Adult Visual Novels!",
        "url": "https://store.steampowered.com/curator/44295384-Adult-Visual-Novels?snr=1_1050_curatorsreviewing_",
        "category": "Hentai Streaming",
        "description": "Dedicated to the best Adult Visual Novels (AVN for short) games available, prioritizing Ren'py based engine and wellwriten stories with context over t",
        "description_es": "Dedicado a los mejores juegos de novelas visuales para adultos (AVN para abreviar) disponibles, priorizando el motor basado en Ren'py y las historias bien escritas con contexto sobre t.",
        "description_jp": "入手可能な最高のアダルト ビジュアル ノベル (略して AVN) ゲームに特化しており、Ren'py ベースのエンジンとコンテキストを備えたよく書かれたストーリーを優先しています。",
        "description_fr": "Dédié aux meilleurs jeux de romans visuels pour adultes (AVN en abrégé) disponibles, en donnant la priorité au moteur basé sur Ren'py et aux histoires bien écrites avec un contexte sur t",
        "description_pt": "Dedicado aos melhores jogos Adult Visual Novels (AVN, para abreviar) disponíveis, priorizando o mecanismo baseado em Ren'py e histórias bem escritas com contexto em vez de t",
        "description_hi": "उपलब्ध सर्वोत्तम वयस्क दृश्य उपन्यास (संक्षेप में एवीएन) खेलों के लिए समर्पित, रेनपी आधारित इंजन और संदर्भ के साथ अच्छी तरह से लिखी गई कहानियों को प्राथमिकता देना।",
        "description_ar": "مخصصة لأفضل ألعاب الروايات المرئية للبالغين (AVN للاختصار) المتاحة، مع إعطاء الأولوية للمحرك القائم على Ren'py والقصص المكتوبة جيدًا مع السياق على مدار الوقت.",
        "description_de": "Widmet sich den besten verfügbaren Adult Visual Novels-Spielen (kurz AVN), wobei der auf Ren'py basierenden Engine und gut geschriebenen Geschichten mit Kontext Vorrang vor t eingeräumt wird",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-30"
    },
    {
        "id": "6c6c863d",
        "name": "7 Best Free Websites to Download Raw Anime Videos",
        "url": "https://moviemaker.minitool.com/moviemaker/raw-anime.html",
        "category": "Anime Streaming",
        "description": "Where can I watch and download raw anime episodes? Here are the 7 best free websites available for downloading download unsubbed anime.",
        "description_es": "¿Dónde puedo ver y descargar episodios de anime sin editar? Aquí están los 7 mejores sitios web gratuitos disponibles para descargar anime sin subscribir.",
        "description_jp": "RAW アニメエピソードをどこで視聴およびダウンロードできますか?ここでは、字幕なしのアニメをダウンロードできる最高の無料ウェブサイトを 7 つ紹介します。",
        "description_fr": "Où puis-je regarder et télécharger des épisodes d’anime bruts ? Voici les 7 meilleurs sites Web gratuits disponibles pour télécharger des anime sans sous-titres.",
        "description_pt": "Onde posso assistir e baixar episódios de anime brutos? Aqui estão os 7 melhores sites gratuitos disponíveis para download de anime não legendado.",
        "description_hi": "मैं रॉ एनीमे एपिसोड कहां देख और डाउनलोड कर सकता हूं? डाउनलोड अनसबब्ड एनीमे डाउनलोड करने के लिए यहां 7 सर्वश्रेष्ठ मुफ्त वेबसाइटें उपलब्ध हैं।",
        "description_ar": "أين يمكنني مشاهدة وتحميل حلقات الأنمي الخام؟ فيما يلي أفضل 7 مواقع مجانية متاحة لتنزيل الأنمي غير المرتبط به.",
        "description_de": "Wo kann ich rohe Anime-Episoden ansehen und herunterladen? Hier sind die 7 besten kostenlosen Websites zum Herunterladen von „Download Unsubbed Anime“.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-30"
    },
    {
        "id": "5798edc4",
        "name": "List of hentai websites - Grokipedia",
        "url": "https://grokipedia.com/page/List_of_hentai_websites",
        "category": "Hentai Streaming",
        "description": "Hentai, a genre of explicit anime and manga originating from Japan that depicts sexual themes and acts, has led to the development of numerous dedicat",
        "description_es": "Hentai, un género de anime y manga explícito originario de Japón que representa temas y actos sexuales, ha llevado al desarrollo de numerosos trabajos dedicados.",
        "description_jp": "ヘンタイは、性的なテーマや行為を描写する日本発の露骨なアニメやマンガのジャンルであり、数多くの献身的な作品の開発につながりました。",
        "description_fr": "Hentai, un genre d'anime et de manga explicite originaire du Japon qui dépeint des thèmes et des actes sexuels, a conduit au développement de nombreux films dédiés.",
        "description_pt": "Hentai, um gênero de anime e mangá explícito originário do Japão que retrata temas e atos sexuais, levou ao desenvolvimento de numerosos trabalhos dedicados.",
        "description_hi": "हेनतई, जापान से उत्पन्न स्पष्ट एनीमे और मंगा की एक शैली जो यौन विषयों और कृत्यों को दर्शाती है, ने कई समर्पितों के विकास को जन्म दिया है",
        "description_ar": "الهنتاي هو نوع من الرسوم المتحركة والمانغا الصريحة التي نشأت في اليابان والتي تصور موضوعات وأفعالًا جنسية، وقد أدى إلى تطوير العديد من العروض المخصصة",
        "description_de": "Hentai, ein aus Japan stammendes explizites Anime- und Manga-Genre, das sexuelle Themen und Handlungen darstellt, hat zur Entwicklung zahlreicher Widder geführt",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-30"
    },
    {
        "id": "7302c18f",
        "name": "MyHentaiGallery - Hentai Comics | Porn Comics Page",
        "url": "https://myhentaigallery.com",
        "category": "Hentai Streaming",
        "description": "Hentai comics, porn comics, hentai porn comic page 1! Hentai comics about furry, futanari, gay, lesbian, breast expansion, gender bender, body swap, p",
        "description_es": "Cómics hentai, cómics porno, cómic porno hentai página 1! Cómics hentai sobre peludos, futanari, gays, lesbianas, expansión de senos, cambios de género, intercambio de cuerpos, p",
        "description_jp": "エロ漫画、エロ漫画、エロ同人誌の1ページ目！毛皮、フタナリ、ゲイ、レズビアン、胸の拡張、ジェンダーベンダー、ボディスワップ、Pに関するエロ漫画",
        "description_fr": "Bandes dessinées hentai, bandes dessinées porno, page de bande dessinée porno hentai 1 ! Bandes dessinées hentai sur le poilu, le futanari, les gays, les lesbiennes, l'expansion mammaire, le Gender Bender, l'échange de corps, p",
        "description_pt": "Quadrinhos hentai, quadrinhos pornôs, quadrinhos pornôs hentai página 1! Quadrinhos hentai sobre peludos, futanari, gay, lésbica, expansão de seios, dobrador de gênero, troca de corpo, p",
        "description_hi": "हेनतई कॉमिक्स, पोर्न कॉमिक्स, हेनतई पोर्न कॉमिक पेज 1! रोयेंदार, फुटनारी, समलैंगिक, लेस्बियन, स्तन विस्तार, लिंग को मोड़ने वाला, शरीर की अदला-बदली, पी के बारे में हेनतई कॉमिक्स",
        "description_ar": "كاريكاتير هنتاي, كاريكاتير إباحي, صفحة هنتاي الإباحية المصورة 1! هنتاي كاريكاتير حول فروي، فوتاناري، مثلي الجنس، مثلية، توسيع الثدي، بندر بين الجنسين، مبادلة الجسم، ص",
        "description_de": "Hentai-Comics, Porno-Comics, Hentai-Porno-Comic Seite 1! Hentai-Comics über Pelz, Futanari, Schwul, Lesbisch, Brustvergrößerung, Gender Bender, Körpertausch, S",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-30"
    },
    {
        "id": "c3153661",
        "name": "Most views - Watch Free Hentai Video Streams Onlin",
        "url": "https://hanime.red/most-views",
        "category": "Anime Streaming",
        "description": "Discover Most views - Watch Free Hentai Video Streams Online in 720p, 1080p HD - hanime - A high quality portal for your favorite content.",
        "description_es": "Descubra la mayoría de las vistas: vea transmisiones de videos hentai gratuitas en línea en 720p, 1080p HD - hanime: un portal de alta calidad para su contenido favorito.",
        "description_jp": "ほとんどのビューを発見 - 720p、1080p HD で無料のエロアニメ ビデオ ストリームをオンラインで視聴 - hanime - お気に入りのコンテンツの高品質ポータル。",
        "description_fr": "Découvrez la plupart des vues - Regardez des flux vidéo Hentai gratuits en ligne en HD 720p, 1080p - hanime - Un portail de haute qualité pour votre contenu préféré.",
        "description_pt": "Descubra a maioria das visualizações - Assista a transmissões de vídeo Hentai gratuitas online em 720p, 1080p HD - hanime - Um portal de alta qualidade para seu conteúdo favorito.",
        "description_hi": "सर्वाधिक बार देखे जाने की खोज करें - 720p, 1080p HD में मुफ्त हेनतई वीडियो स्ट्रीम ऑनलाइन देखें - hanime - आपकी पसंदीदा सामग्री के लिए एक उच्च गुणवत्ता वाला पोर्टल।",
        "description_ar": "اكتشف معظم المشاهدات - شاهد تدفقات فيديو هنتاي المجانية عبر الإنترنت بدقة 720 بكسل و1080 بكسل عالية الدقة - hanime - بوابة عالية الجودة للمحتوى المفضل لديك.",
        "description_de": "Entdecken Sie die meisten Aufrufe – Sehen Sie sich kostenlose Hentai-Videostreams online in 720p, 1080p HD an – Hanime – Ein hochwertiges Portal für Ihre Lieblingsinhalte.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-30"
    },
    {
        "id": "171c05a3",
        "name": "hentaidesi.com - Manhwa Hentai & Manga Hentai – Re",
        "url": "https://hentaidesi.com",
        "category": "Hentai Streaming",
        "description": "About Hentaidesi – Your Online Library for Manga, Manhwa & Webtoons Hentaidesi is an online reading platform created for fans of manga, manhwa, and we",
        "description_es": "Acerca de Hentaidesi: su biblioteca en línea para manga, manhwa y webtoons Hentaidesi es una plataforma de lectura en línea creada para fanáticos del manga, manhwa y nosotros.",
        "description_jp": "ヘンタイデシについて – マンガ、マンファ、ウェブトゥーンのオンライン ライブラリ ヘンタイデシは、マンガ、マンガ、そして私たちのファンのために作られたオンライン読書プラットフォームです。",
        "description_fr": "À propos de Hentaidesi – Votre bibliothèque en ligne de mangas, manhwa et Webtoons Hentaidesi est une plateforme de lecture en ligne créée pour les fans de mangas, de manhwa et nous",
        "description_pt": "Sobre Hentaidesi – Sua biblioteca online de mangá, manhwa e webtoons Hentaidesi é uma plataforma de leitura online criada para fãs de mangá, manhwa e nós",
        "description_hi": "हेंटाइडेसी के बारे में - मंगा, मैनहवा और वेबटून के लिए आपकी ऑनलाइन लाइब्रेरी हेंटाइडेसी एक ऑनलाइन रीडिंग प्लेटफॉर्म है जो मंगा, मैनहवा और हम के प्रशंसकों के लिए बनाया गया है।",
        "description_ar": "حول Hentaidesi - مكتبتك على الإنترنت للمانغا ومانهوا وويبتونز Hentaidesi هي عبارة عن منصة قراءة عبر الإنترنت تم إنشاؤها لمحبي المانجا والمانهوا ونحن",
        "description_de": "Über Hentaidesi – Ihre Online-Bibliothek für Manga, Manhwa und Webtoons Hentaidesi ist eine Online-Leseplattform für Fans von Manga, Manhwa und uns",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-30"
    },
    {
        "id": "93834a8b",
        "name": "10 Most Anticipated Anime of Spring 2026",
        "url": "https://guides.justwatch.com/us/most-anticipated-anime-spring-2026",
        "category": "Anime Streaming",
        "description": "The spring is upon us, and with it comes a new season of anime, but out of the dozens of new and returning anime this season, here are the ten you nee",
        "description_es": "La primavera ya está aquí y con ella llega una nueva temporada de anime, pero de las docenas de animes nuevos y recurrentes de esta temporada, aquí tienes los diez que necesitas.",
        "description_jp": "春がやって来て、アニメの新シーズンが始まりますが、今シーズンの数十の新作アニメと再登場アニメの中から、あなたに必要な 10 作品をご紹介します",
        "description_fr": "Le printemps est à nos portes, et avec lui une nouvelle saison d'anime, mais parmi les dizaines d'animes nouveaux et récurrents cette saison, voici les dix dont vous avez besoin.",
        "description_pt": "A primavera está chegando e com ela vem uma nova temporada de anime, mas entre as dezenas de animes novos e antigos desta temporada, aqui estão os dez que você precisa",
        "description_hi": "वसंत हम पर है, और इसके साथ एनीमे का एक नया सीज़न आता है, लेकिन इस सीज़न में दर्जनों नए और लौटने वाले एनीमे में से, यहां दस हैं जो आपको चाहिए",
        "description_ar": "لقد حل الربيع ومعه موسم جديد من الأنمي، ولكن من بين العشرات من الأنمي الجديدة والعائدة هذا الموسم، إليك العشرة التي تحتاجها",
        "description_de": "Der Frühling steht vor der Tür und mit ihm kommt eine neue Anime-Saison, aber von den Dutzenden neuer und wiederkehrender Animes in dieser Staffel sind hier die zehn, die Sie brauchen",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-30"
    },
    {
        "id": "32f0765c",
        "name": "ALL HENTAI FLASH GAMES",
        "url": "https://h-flash.com/all",
        "category": "Hentai Streaming",
        "description": "all adult hentai flash games list page 1",
        "description_es": "Lista de todos los juegos flash hentai para adultos página 1",
        "description_jp": "すべてのアダルト エロフラッシュ ゲーム リスト ページ 1",
        "description_fr": "liste de tous les jeux flash hentai pour adultes page 1",
        "description_pt": "lista de todos os jogos em flash hentai para adultos, página 1",
        "description_hi": "सभी वयस्क हेनतई फ़्लैश खेल सूची पृष्ठ 1",
        "description_ar": "جميع قائمة ألعاب فلاش هنتاي الكبار صفحة 1",
        "description_de": "Liste aller Hentai-Flash-Spiele für Erwachsene, Seite 1",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-30"
    },
    {
        "id": "77d9b74b",
        "name": "Hentaied Forum",
        "url": "https://forum.hentaied.com",
        "category": "Hentai Streaming",
        "description": "Community platform by XenForo®",
        "description_es": "Plataforma comunitaria de XenForo®",
        "description_jp": "XenForo®によるコミュニティプラットフォーム",
        "description_fr": "Plateforme communautaire par XenForo®",
        "description_pt": "Plataforma comunitária da XenForo®",
        "description_hi": "XenForo® द्वारा सामुदायिक मंच",
        "description_ar": "منصة مجتمعية من XenForo®",
        "description_de": "Community-Plattform von XenForo®",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-30"
    },
    {
        "id": "83b78fd6",
        "name": "HD Porn Comics | Sex Comics | Adult Comics | Henta",
        "url": "https://hdporncomics.com",
        "category": "Hentai Streaming",
        "description": "Best Free Porn Comics, HD porn Comics, Sex Comics, Hentai Comics. You will find the largest collection of porn comics in hd quality. New comics are po",
        "description_es": "Los mejores cómics porno gratis, cómics porno HD, cómics sexuales, cómics hentai. Encontrarás la mayor colección de cómics porno en calidad HD. Nuevos cómics son po",
        "description_jp": "最高の無料ポルノ漫画、HDポルノ漫画、セックス漫画、エロ漫画。 HD品質のポルノコミックの最大のコレクションが見つかります。新しい漫画がポ",
        "description_fr": "Meilleures bandes dessinées porno gratuites, bandes dessinées porno HD, bandes dessinées sexuelles, bandes dessinées Hentai. Vous trouverez la plus grande collection de bandes dessinées pornographiques en qualité HD. Les nouvelles bandes dessinées sont po",
        "description_pt": "Melhores quadrinhos pornôs gratuitos, quadrinhos pornôs HD, quadrinhos sexuais, quadrinhos hentai. Você encontrará a maior coleção de quadrinhos pornográficos em qualidade HD. Novos quadrinhos são po",
        "description_hi": "सर्वश्रेष्ठ मुफ्त पोर्न कॉमिक्स, एचडी पोर्न कॉमिक्स, सेक्स कॉमिक्स, हेनतई कॉमिक्स। आपको एचडी गुणवत्ता में पोर्न कॉमिक्स का सबसे बड़ा संग्रह मिलेगा। नई कॉमिक्स पो हैं",
        "description_ar": "أفضل كاريكاتير إباحي مجاني، كاريكاتير إباحي عالي الدقة، كاريكاتير جنسي، كاريكاتير هنتاي. ستجد أكبر مجموعة من القصص المصورة الإباحية بجودة عالية الدقة. كاريكاتير جديد بو",
        "description_de": "Beste kostenlose Porno-Comics, HD-Porno-Comics, Sex-Comics, Hentai-Comics. Hier finden Sie die größte Sammlung von Porno-Comics in HD-Qualität. Neue Comics sind da",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-30"
    },
    {
        "id": "8edeb6db",
        "name": "Watch Free Hentai Video Streams Online in 720p, 10",
        "url": "https://hanime.tv/playlists/uvgxrilhvdxjqoesrzlv",
        "category": "Anime Streaming",
        "description": "Watch hentai online free download HD on mobile phone tablet laptop desktop.  Stream online, regularly released uncensored, subbed, in 720p and 1080p!",
        "description_es": "Mire hentai en línea, descarga gratuita en HD en el teléfono móvil, tableta, computadora portátil y de escritorio.  ¡Transmita en línea, publicado regularmente sin censura, subtitulado, en 720p y 1080p!",
        "description_jp": "携帯電話、タブレット、ラップトップ、デスクトップで HD を無料でダウンロードしてエロアニメをオンラインで視聴してください。  オンラインでストリーミングし、720p および 1080p で無修正、字幕付きを定期的にリリースします。",
        "description_fr": "Regardez hentai en ligne en téléchargement gratuit en HD sur un téléphone portable, une tablette, un ordinateur portable.  Diffusez en ligne, régulièrement diffusé non censuré, sous-titré, en 720p et 1080p !",
        "description_pt": "Assista hentai online download gratuito em HD no desktop do laptop do tablet do celular.  Transmita online, lançado regularmente sem censura, legendado, em 720p e 1080p!",
        "description_hi": "मोबाइल फोन टैबलेट लैपटॉप डेस्कटॉप पर हेनतई ऑनलाइन मुफ्त डाउनलोड एचडी देखें।  ऑनलाइन स्ट्रीम करें, नियमित रूप से बिना सेंसर किए, सबबेड, 720पी और 1080पी में रिलीज़ करें!",
        "description_ar": "شاهد الهنتاي عبر الإنترنت وتنزيل مجاني عالي الدقة على الهاتف المحمول والكمبيوتر اللوحي والكمبيوتر المحمول وسطح المكتب.  يمكنك البث عبر الإنترنت، ويتم إصداره بانتظام دون رقابة، ومترجم، بدقة 720 بكسل و1080 بكسل!",
        "description_de": "Schauen Sie sich Hentai online kostenlos als HD-Download auf dem Desktop Ihres Mobiltelefons, Tablets oder Laptops an.  Online streamen, regelmäßig unzensiert veröffentlicht, mit Untertiteln, in 720p und 1080p!",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-30"
    },
    {
        "id": "c7241cf6",
        "name": "Hentai Genres - Free Hentai Stream Watch Hentai Po",
        "url": "https://watch.freehentaistream.com/genres",
        "category": "Anime Streaming",
        "description": "All Hentai Genres sorted Alphabetically or by Popularity! Find genres like Uncensored Hentai, Loli Hentai, Futanari Hentai, Yaoi, Yuri and more!",
        "description_es": "¡Todos los géneros hentai ordenados alfabéticamente o por popularidad! ¡Encuentra géneros como Hentai sin censura, Loli Hentai, Futanari Hentai, Yaoi, Yuri y más!",
        "description_jp": "すべての変態ジャンルをアルファベット順または人気順に並べ替えます。無修正変態、ロリ変態、ふたなり変態、やおい、百合などのジャンルを見つけてください!",
        "description_fr": "Tous les genres Hentai triés par ordre alphabétique ou par popularité ! Trouvez des genres comme Uncensored Hentai, Loli Hentai, Futanari Hentai, Yaoi, Yuri et plus encore !",
        "description_pt": "Todos os gêneros Hentai classificados em ordem alfabética ou por popularidade! Encontre gêneros como Uncensored Hentai, Loli Hentai, Futanari Hentai, Yaoi, Yuri e muito mais!",
        "description_hi": "सभी हेनतई शैलियाँ वर्णानुक्रम में या लोकप्रियता के आधार पर क्रमबद्ध हैं! अनसेंसर्ड हेनतई, लोली हेनतई, फ़ुतनारी हेनतई, याओई, यूरी और अधिक जैसी शैलियाँ खोजें!",
        "description_ar": "جميع أنواع الهنتاي مرتبة أبجديًا أو حسب الشعبية! ابحث عن أنواع مثل Uncentric Hentai وLoli Hentai وFutanari Hentai وYaoi وYuri والمزيد!",
        "description_de": "Alle Hentai-Genres alphabetisch oder nach Beliebtheit sortiert! Finden Sie Genres wie Uncensored Hentai, Loli Hentai, Futanari Hentai, Yaoi, Yuri und mehr!",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-30"
    },
    {
        "id": "7669bfc4",
        "name": "BEST Anime of Spring 2026",
        "url": "https://www.youtube.com/watch?v=lmDSoS5gybY",
        "category": "Anime Streaming",
        "description": "Enjoy the videos and music you love, upload original content, and share it all with friends, family, and the world on YouTube.",
        "description_es": "Disfruta de los vídeos y la música que te encantan, sube contenido original y compártelo todo con amigos, familiares y el mundo en YouTube.",
        "description_jp": "YouTube でお気に入りの動画や音楽を楽しみ、オリジナルのコンテンツをアップロードして友だちや家族、世界中の人たちと共有しましょう。",
        "description_fr": "Profitez des vidéos et de la musique que vous aimez, téléchargez du contenu original et partagez-le avec vos amis, votre famille et le monde entier sur YouTube.",
        "description_pt": "Aproveite os vídeos e as músicas que você adora, carregue conteúdo original e compartilhe tudo com amigos, familiares e o mundo no YouTube.",
        "description_hi": "अपने पसंदीदा वीडियो और संगीत का आनंद लें, मूल सामग्री अपलोड करें और इसे YouTube पर दोस्तों, परिवार और दुनिया के साथ साझा करें।",
        "description_ar": "استمتع بمقاطع الفيديو والموسيقى التي تحبها، وقم بتحميل المحتوى الأصلي، وشاركه كله مع الأصدقاء والعائلة والعالم على YouTube.",
        "description_de": "Genießen Sie die Videos und Musik, die Sie lieben, laden Sie Originalinhalte hoch und teilen Sie alles mit Freunden, Familie und der Welt auf YouTube.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-30"
    },
    {
        "id": "147ede07",
        "name": "High Resolution - 4K, Full HD, HD games - Porn Gam",
        "url": "https://gamcore.com/high_resolution",
        "category": "Hentai Streaming",
        "description": "High Resolution Sex Games - X-Change Sleepover, Invulnerable, Nightmare Knight: Sacred Maiden & Fallen Magic, D'Legacy, My Girlfriend's New Kink",
        "description_es": "Juegos sexuales de alta resolución: Fiesta de pijamas X-Change, Invulnerable, Nightmare Knight: Sacred Maiden & Fallen Magic, D'Legacy, My Girlfriend's New Kink",
        "description_jp": "高解像度のセックス ゲーム - X-Change Sleepover、Invulnerable、Nightmare Knight: Sacred Maiden & Fallen Magic、D'Legacy、My Girlfriend's New Kink",
        "description_fr": "Jeux sexuels haute résolution - Soirée pyjama X-Change, Invulnérable, Nightmare Knight: Sacred Maiden & Fallen Magic, D'Legacy, My Girlfriend's New Kink",
        "description_pt": "Jogos Sexuais de Alta Resolução - X-Change Sleepover, Invulnerable, Nightmare Knight: Sacred Maiden & Fallen Magic, D'Legacy, My Girlfriend's New Kink",
        "description_hi": "हाई रेजोल्यूशन सेक्स गेम्स - एक्स-चेंज स्लीपओवर, इनवलनरेबल, नाइटमेयर नाइट: सेक्रेड मेडेन एंड फॉलन मैजिक, डी'लिगेसी, माई गर्लफ्रेंड्स न्यू किंक",
        "description_ar": "ألعاب جنسية عالية الدقة - X-Change Sleepover، Invulnerable، Nightmare Knight: Sacred Maiden & Fallen Magic، D'Legacy، My Girlfriend's New Kink",
        "description_de": "Hochauflösende Sexspiele – X-Change Sleepover, Invulnerable, Nightmare Knight: Sacred Maiden & Fallen Magic, D'Legacy, My Girlfriend's New Kink",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-30"
    },
    {
        "id": "8f6c2907",
        "name": "Top NSFW games tagged Anime - itch.io",
        "url": "https://itch.io/games/nsfw/tag-anime",
        "category": "Anime Streaming",
        "description": "Find NSFW games tagged Anime like The BloodRiver Saga: Retransmitter, Path of Desire: Cursed Chakra, Ilias: Appetite for Glory (0.12 UDPATE!!!), Echoe",
        "description_es": "Encuentra juegos NSFW etiquetados Anime como The BloodRiver Saga: Retransmitter, Path of Desire: Cursed Chakra, Ilias: Appetite for Glory (0.12 UDPATE!!!), Echoe",
        "description_jp": "The BloodRiver Saga: Retransmitter、Path of Desire: Cursed Chakra、Ilias: Appetite for Glory (0.12 UDPATE!!!)、Echoe などのアニメタグが付けられた NSFW ゲームを見つけます",
        "description_fr": "Trouvez des jeux NSFW étiquetés Anime comme The BloodRiver Saga: Retransmitter, Path of Desire: Cursed Chakra, Ilias: Appetite for Glory (0.12 UDPATE !!!), Echoe",
        "description_pt": "Encontre jogos NSFW marcados como Anime como The BloodRiver Saga: Retransmitter, Path of Desire: Cursed Chakra, Ilias: Appetite for Glory (0.12 UDPATE!!!), Echoe",
        "description_hi": "द ब्लडरिवर सागा: रिट्रांसमीटर, पाथ ऑफ डिज़ायर: कर्स्ड चक्र, इलियास: एपेटाइट फॉर ग्लोरी (0.12 यूडीपीएटी!!!), इको जैसे एनीमे टैग किए गए एनएसएफडब्ल्यू गेम ढूंढें।",
        "description_ar": "ابحث عن ألعاب NSFW الموسومة بـ Anime مثل The BloodRiver Saga: Retransmitter، Path of Desire: Cursed Chakra، Ilias: Appetite for Glory (0.12 UDPATE!!!)، Echoe",
        "description_de": "Finden Sie NSFW-Spiele mit den Tags Anime wie The BloodRiver Saga: Retransmitter, Path of Desire: Cursed Chakra, Ilias: Appetite for Glory (0,12 UDPATE!!!), Echoe",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-31"
    },
    {
        "id": "a5ce8d31",
        "name": "male: furry - E-Hentai Galleries",
        "url": "https://e-hentai.org/tag/male:+furry?prev=1833112",
        "category": "Hentai Streaming",
        "description": "Showing search results for male: furry - just some of the over a million absolutely free hentai galleries available.",
        "description_es": "Mostrando resultados de búsqueda para hombre: peludo: solo algunas de las más de un millón de galerías hentai disponibles absolutamente gratuitas.",
        "description_jp": "男性: 毛皮のような検索結果を表示しています - 利用可能な 100 万を超える完全に無料のエロアニメ ギャラリーのほんの一部です。",
        "description_fr": "Affichage des résultats de recherche pour mâle : poilu - quelques-unes des plus d'un million de galeries hentai absolument gratuites disponibles.",
        "description_pt": "Mostrando resultados de pesquisa para masculino: peludo - apenas algumas das mais de um milhão de galerias hentai totalmente gratuitas disponíveis.",
        "description_hi": "पुरुष के लिए खोज परिणाम दिखाए जा रहे हैं: प्यारे - दस लाख से अधिक बिल्कुल मुफ्त उपलब्ध हेनतई गैलरी में से कुछ।",
        "description_ar": "عرض نتائج البحث عن ذكر: فروي - فقط بعض من أكثر من مليون معرض هنتاي مجاني تمامًا متاح.",
        "description_de": "Suchergebnisse für „männlich: pelzig“ werden angezeigt – nur einige der über eine Million verfügbaren, absolut kostenlosen Hentai-Galerien.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-31"
    },
    {
        "id": "43610dce",
        "name": "hentai - Fenoxo Forums",
        "url": "https://forum.fenoxo.com/tags/hentai",
        "category": "Hentai Streaming",
        "description": "Discover hentai - Fenoxo Forums - A high quality portal for your favorite content.",
        "description_es": "Descubre hentai - Foros Fenoxo - Un portal de alta calidad para tu contenido favorito.",
        "description_jp": "エロアニメを発見 - Fenoxo フォーラム - お気に入りのコンテンツのための高品質ポータル。",
        "description_fr": "Découvrez hentai - Forums Fenoxo - Un portail de haute qualité pour votre contenu préféré.",
        "description_pt": "Descubra hentai - Fóruns Fenoxo - Um portal de alta qualidade para seus conteúdos favoritos.",
        "description_hi": "हेनतई खोजें - फेनोक्सो फ़ोरम - आपकी पसंदीदा सामग्री के लिए एक उच्च गुणवत्ता वाला पोर्टल।",
        "description_ar": "اكتشف الهنتاي - منتديات Fenoxo - بوابة عالية الجودة للمحتوى المفضل لديك.",
        "description_de": "Error 500 (Server Error)!!1500.That’s an error.There was an error. Please try again later.That’s all we know.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-31"
    },
    {
        "id": "ff379c18",
        "name": "Tenkafuma! (天下布魔) | Official site | iOS / Android ",
        "url": "https://tenkafuma.com",
        "category": "Games & Visual Novels",
        "description": "As Caesar, the strongest archdemon in all the land, wage war and assert dominance across the demon world, human world, and even that of the heavens! G",
        "description_es": "Como César, el archidemonio más fuerte de toda la tierra, libra la guerra y afirma tu dominio en el mundo de los demonios, el mundo humano e incluso el de los cielos. GRAMO",
        "description_jp": "全土最強の大悪魔シーザーとして戦争を繰り広げ、魔界、人間界、さらには天界までを制覇せよ！ G",
        "description_fr": "En tant que César, l'archidémon le plus puissant de tout le pays, faites la guerre et affirmez votre domination sur le monde des démons, le monde des humains et même celui des cieux ! G",
        "description_pt": "Como César, o arquidemônio mais forte de toda a terra, trave a guerra e afirme o domínio em todo o mundo demoníaco, no mundo humano e até mesmo no dos céus! G",
        "description_hi": "सीज़र के रूप में, पूरे देश में सबसे शक्तिशाली धनुर्धर, युद्ध छेड़ता है और दानव दुनिया, मानव दुनिया और यहां तक ​​कि स्वर्ग पर भी प्रभुत्व जमाता है! जी",
        "description_ar": "بصفته قيصر، أقوى شيطان في كل الأرض، يشن الحرب ويؤكد هيمنته على عالم الشياطين، وعالم البشر، وحتى عالم السماوات! ز",
        "description_de": "Führe als Cäsar, der stärkste Erzdämon im ganzen Land, Krieg und erobere die Herrschaft über die Dämonenwelt, die Menschenwelt und sogar die des Himmels! G",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-31"
    },
    {
        "id": "2c9f11ed",
        "name": "Mio Hentai | Free Anime Porn Videos, Cartoon, Mang",
        "url": "https://miohentai.com",
        "category": "Anime Streaming",
        "description": "We are the best Hentai tube site in our niche. We have the greatest videos quality. We are streaming fast for free, what do you need more!",
        "description_es": "Somos el mejor sitio de tubos hentai en nuestro nicho. Tenemos la mayor calidad de videos. Estamos transmitiendo rápido gratis, ¡qué necesitas más!",
        "description_jp": "私たちはニッチな分野で最高の変態チューブ サイトです。私たちは最高のビデオ品質を持っています。無料で高速ストリーミングしています。これ以上何が必要ですか!",
        "description_fr": "Nous sommes le meilleur site de tubes Hentai dans notre niche. Nous avons la meilleure qualité de vidéos. Nous diffusons rapidement et gratuitement, de quoi avez-vous besoin de plus !",
        "description_pt": "Somos o melhor site de tubo Hentai em nosso nicho. Temos a melhor qualidade de vídeos. Estamos transmitindo rápido e de graça, o que você precisa mais!",
        "description_hi": "हम अपने क्षेत्र में सर्वश्रेष्ठ हेनतई ट्यूब साइट हैं। हमारे पास बेहतरीन वीडियो गुणवत्ता है। हम मुफ़्त में तेज़ स्ट्रीमिंग कर रहे हैं, आपको और क्या चाहिए!",
        "description_ar": "نحن أفضل موقع أنبوب هنتاي في مجال تخصصنا. لدينا أعلى جودة لمقاطع الفيديو. نحن نبث بسرعة مجانًا، ماذا تحتاج أكثر!",
        "description_de": "Wir sind die beste Hentai-Tube-Seite in unserer Nische. Wir haben die beste Videoqualität. Wir streamen schnell und kostenlos, was braucht man mehr!",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-31"
    },
    {
        "id": "e41e4bc0",
        "name": "NSFW GAMES - Collection by ImEstxbxn - Itch.io",
        "url": "https://itch.io/c/5025099/nsfw-games",
        "category": "Games & Visual Novels",
        "description": "Discover NSFW GAMES - Collection by ImEstxbxn - Itch.io - A high quality portal for your favorite content.",
        "description_es": "Descubra NSFW GAMES - Colección de ImEstxbxn - Itch.io - Un portal de alta calidad para su contenido favorito.",
        "description_jp": "NSFW GAMES を発見してください - ImEstxbxn によるコレクション - Itch.io - お気に入りのコンテンツのための高品質ポータル。",
        "description_fr": "Découvrez NSFW GAMES - Collection par ImEstxbxn - Itch.io - Un portail de haute qualité pour votre contenu préféré.",
        "description_pt": "Descubra NSFW GAMES - Coleção de ImEstxbxn - Itch.io - Um portal de alta qualidade para seu conteúdo favorito.",
        "description_hi": "Error 500 (Server Error)!!1500.That’s an error.There was an error. Please try again later.That’s all we know.",
        "description_ar": "اكتشف NSFW GAMES - مجموعة ImEstxbxn - Itch.io - بوابة عالية الجودة للمحتوى المفضل لديك.",
        "description_de": "Entdecken Sie NSFW GAMES – Sammlung von ImEstxbxn – Itch.io – Ein hochwertiges Portal für Ihre Lieblingsinhalte.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-31"
    },
    {
        "id": "b3d384d9",
        "name": "What is the best doujin site ? | Page 2 | Unoffici",
        "url": "https://ulmf.org/threads/what-is-the-best-doujin-site.5405/page-2",
        "category": "Manga & Doujinshi",
        "description": "Re: What is the best doujin site ?\r\n\r\nI think now it is: e-hentai.org",
        "description_es": "Re: ¿Cuál es el mejor sitio de doujin?\r\n\r\nCreo que ahora es: e-hentai.org",
        "description_jp": "Re:最強の同人サイトはどこですか？\r\n\r\n今は e-hentai.org だと思います。",
        "description_fr": "Re : Quel est le meilleur site de doujin ?\r\n\r\nJe pense que maintenant c'est : e-hentai.org",
        "description_pt": "Re: Qual é o melhor site doujin?\r\n\r\nAcho que agora é: e-hentai.org",
        "description_hi": "पुनः: सबसे अच्छी डौजिन साइट कौन सी है?\r\n\r\nमुझे लगता है कि अब यह है: e-hendai.org",
        "description_ar": "رد: ما هو أفضل موقع دوجين ؟\r\n\r\nأعتقد أنه الآن: e-hentai.org",
        "description_de": "Betreff: Was ist die beste Doujin-Site?\r\n\r\nIch denke, jetzt ist es: e-hentai.org",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-31"
    },
    {
        "id": "d9fe6c65",
        "name": "Public Hentai & 113+ Reddit Hentai List Sites like",
        "url": "https://hentaisites.com/reddit-hentai-list/public-hentai",
        "category": "Hentai Streaming",
        "description": "At https://www.reddit.com/r/PublicHentai/ watch public hentai xxx porn videos, photos, and gifs on Reddit.com\" content=\"R/Public Hentai by https://www",
        "description_es": "En https://www.reddit.com/r/PublicHentai/ mira videos porno hentai xxx, fotos y gifs en Reddit.com\" content=\"R/Public Hentai por https://www",
        "description_jp": "https://www.reddit.com/r/PublicHentai/ で、Reddit.com でパブリック エロアニメ xxx のポルノ ビデオ、写真、GIF をご覧ください。\" content=\"R/Public Hentai by https://www",
        "description_fr": "Sur https://www.reddit.com/r/PublicHentai/, regardez des vidéos, des photos et des gifs porno hentai xxx publics sur Reddit.com\" content=\"R/Public Hentai par https://www.",
        "description_pt": "Em https://www.reddit.com/r/PublicHentai/ assista a vídeos, fotos e gifs pornôs hentai xxx públicos no Reddit.com\" content=\"R/Public Hentai por https://www",
        "description_hi": "https://www.reddit.com/r/PublicHentai/ पर Reddit.com पर सार्वजनिक हेनतई xxx अश्लील वीडियो, फ़ोटो और gifs देखें\" content=\"R/Public Hentai https://www द्वारा",
        "description_ar": "على https://www.reddit.com/r/PublicHentai/ شاهد مقاطع الفيديو والصور والصور المتحركة الإباحية العامة من هنتاي xxx على Reddit.com\" content=\"R/Public Hentai بواسطة https://www",
        "description_de": "Sehen Sie sich unter https://www.reddit.com/r/PublicHentai/ öffentliche Hentai-xxx-Pornovideos, Fotos und GIFs auf Reddit.com an. content=\"R/Public Hentai von https://www",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-31"
    },
    {
        "id": "cf2e80f8",
        "name": "All +18 Translated Visual Novels / Eroge / Hentai ",
        "url": "https://backloggd.com/u/Zanes/list/all-18-translated-visual-novels--eroge--hentai?page=2",
        "category": "Hentai Streaming",
        "description": "some titles are missing from the database so there is actually more translated vns",
        "description_es": "Faltan algunos títulos en la base de datos, por lo que en realidad hay más vns traducidos.",
        "description_jp": "いくつかのタイトルがデータベースから欠落しているため、実際にはさらに翻訳された vns が存在します",
        "description_fr": "certains titres manquent dans la base de données, il y a donc plus de VNS traduits",
        "description_pt": "alguns títulos estão faltando no banco de dados, então há mais vns traduzidos",
        "description_hi": "कुछ शीर्षक डेटाबेस से गायब हैं इसलिए वास्तव में अधिक अनुवादित वीएनएस हैं",
        "description_ar": "بعض العناوين مفقودة من قاعدة البيانات، لذا يوجد بالفعل المزيد من vns المترجمة",
        "description_de": "Einige Titel fehlen in der Datenbank, sodass tatsächlich mehr übersetzte Titel vorhanden sind",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-31"
    },
    {
        "id": "7bdbb25a",
        "name": "Danbooru & 46+ Hentai Porn Sites Like Danbooru.don",
        "url": "https://theporndude.com/2786/danbooru",
        "category": "Hentai Streaming",
        "description": "Danbooru.donmai.us, also referred to as Danbooru, is the original Booru image site that has since spawned dozens of imitators offering up all kinds of",
        "description_es": "Danbooru.donmai.us, también conocido como Danbooru, es el sitio de imágenes Booru original que desde entonces ha generado docenas de imitadores que ofrecen todo tipo de",
        "description_jp": "Danbooru.donmai.us (Danbooru とも呼ばれる) は、オリジナルの Booru 画像サイトであり、それ以来、あらゆる種類の画像を提供する数十の模倣サイトを生み出してきました。",
        "description_fr": "Danbooru.donmai.us, également appelé Danbooru, est le site d'images original de Booru qui a depuis engendré des dizaines d'imitateurs proposant toutes sortes de",
        "description_pt": "Danbooru.donmai.us, também conhecido como Danbooru, é o site de imagens Booru original que desde então gerou dezenas de imitadores oferecendo todos os tipos de",
        "description_hi": "Danbooru.donmai.us, जिसे Danbooru भी कहा जाता है, मूल Booru छवि साइट है जिसने तब से दर्जनों नकल करने वालों को जन्म दिया है जो सभी प्रकार की पेशकश करते हैं",
        "description_ar": "Danbooru.donmai.us، والذي يشار إليه أيضًا باسم Danbooru، هو موقع صور Booru الأصلي الذي أنتج منذ ذلك الحين العشرات من المقلدين الذين يقدمون جميع أنواع الصور",
        "description_de": "Danbooru.donmai.us, auch Danbooru genannt, ist die ursprüngliche Booru-Bilderseite, die seitdem Dutzende Nachahmer hervorgebracht hat, die alle Arten von Bildern anbieten",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-31"
    },
    {
        "id": "d5e70ce8",
        "name": "traditional_media - Anime and Hentai pictures - He",
        "url": "https://booru.eu/post/list/traditional_media/1",
        "category": "Anime Streaming",
        "description": "Booru.eu is a anime and hentai images board.",
        "description_es": "Booru.eu es un foro de imágenes de anime y hentai.",
        "description_jp": "Booru.eu はアニメとエロアニメの画像掲示板です。",
        "description_fr": "Booru.eu est un forum d'images d'anime et hentai.",
        "description_pt": "Booru.eu é um painel de imagens de anime e hentai.",
        "description_hi": "Booru.eu एक एनीमे और हेनतई इमेज बोर्ड है।",
        "description_ar": "Booru.eu هي لوحة صور أنيمي وهنتاي.",
        "description_de": "Booru.eu ist ein Anime- und Hentai-Bilderforum.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-31"
    },
    {
        "id": "96687a30",
        "name": "The 8 Best Doujinshi Sites That Still Support Crea",
        "url": "https://bookriot.com/best-doujinshi-sites",
        "category": "Manga & Doujinshi",
        "description": "Love doujinshi? Find new titles to read on the best doujinshi sites that support creators. Bookmark these now!",
        "description_es": "¿Te encantan los doujinshi? Encuentre nuevos títulos para leer en los mejores sitios de doujinshi que apoyan a los creadores. ¡Márcalos como favoritos ahora!",
        "description_jp": "同人誌は好きですか？クリエイターをサポートする最高の同人誌サイトで、読みたい新しいタイトルを見つけてください。今すぐブックマークしてください!",
        "description_fr": "Vous aimez les dōjinshi ? Trouvez de nouveaux titres à lire sur les meilleurs sites de doujinshi qui soutiennent les créateurs. Ajoutez-les à vos favoris maintenant !",
        "description_pt": "Ama doujinshi? Encontre novos títulos para ler nos melhores sites de doujinshi que apoiam os criadores. Marque-os agora!",
        "description_hi": "दुजिंशी से प्यार है? रचनाकारों का समर्थन करने वाली सर्वोत्तम डौजिंशी साइटों पर पढ़ने के लिए नए शीर्षक खोजें। इन्हें अभी बुकमार्क करें!",
        "description_ar": "أحب دوجينشي؟ ابحث عن عناوين جديدة لقراءتها على أفضل مواقع doujinshi التي تدعم المبدعين. المرجعية هذه الآن!",
        "description_de": "Du liebst Doujinshi? Finden Sie neue Titel zum Lesen auf den besten Doujinshi-Websites, die YouTuber unterstützen. Setzen Sie jetzt ein Lesezeichen darauf!",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-31"
    },
    {
        "id": "99973bbf",
        "name": "The Best Doujinshi Sites | BookSummaryClub",
        "url": "https://booksummaryclub.com/the-best-doujinshi-sites",
        "category": "Manga & Doujinshi",
        "description": "Explore diverse doujinshi genres and discover where to legally read and buy these unique Japanese fanworks online. Support creators today!",
        "description_es": "Explora diversos géneros de doujinshi y descubre dónde leer y comprar legalmente en línea estas obras de fans japonesas únicas. ¡Apoya a los creadores hoy!",
        "description_jp": "多様な同人誌ジャンルを探索し、これらのユニークな日本のファン作品をオンラインで合法的に読んだり購入したりできる場所を見つけてください。今すぐクリエイターをサポートしましょう！",
        "description_fr": "Explorez divers genres de doujinshi et découvrez où lire et acheter légalement ces œuvres de fan japonaises uniques en ligne. Soutenez les créateurs dès aujourd'hui !",
        "description_pt": "Explore diversos gêneros de doujinshi e descubra onde ler e comprar legalmente essas obras de fãs japonesas exclusivas online. Apoie os criadores hoje!",
        "description_hi": "विविध डौजिंशी शैलियों का अन्वेषण करें और जानें कि इन अद्वितीय जापानी फैनवर्क्स को कानूनी रूप से कहां पढ़ा और ऑनलाइन खरीदा जा सकता है। आज रचनाकारों का समर्थन करें!",
        "description_ar": "استكشف أنواع الدوجينشي المتنوعة واكتشف الأماكن التي يمكنك من خلالها قراءة وشراء أعمال المعجبين اليابانية الفريدة عبر الإنترنت بشكل قانوني. دعم المبدعين اليوم!",
        "description_de": "Entdecken Sie verschiedene Doujinshi-Genres und finden Sie heraus, wo Sie diese einzigartigen japanischen Fanwerke legal online lesen und kaufen können. Unterstützen Sie noch heute YouTuber!",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-31"
    },
    {
        "id": "4e1fade7",
        "name": "Ecchi & 661+ Reddit NSFW List Like R/Ecchi - The P",
        "url": "https://theporndude.com/5025/ecchi",
        "category": "Hentai Streaming",
        "description": "Reddit.com/r/ecchi is a sub dedicated to people who are fans of solo anime babes who are in skimpy clothes or who are completely nude as they show off",
        "description_es": "Reddit.com/r/ecchi es un sub dedicado a las personas que son fanáticas de las chicas anime solitarias que usan poca ropa o que están completamente desnudas mientras se lucen.",
        "description_jp": "Reddit.com/r/ecchi は、露出度の高い服を着たり、全裸で見せびらかしたりするソロアニメ美女のファンの人たちに捧げられたサブです。",
        "description_fr": "Reddit.com/r/ecchi est un sous-marin dédié aux personnes fans de filles d'anime solo qui portent des vêtements étriqués ou qui sont complètement nues lorsqu'elles s'exhibent.",
        "description_pt": "Reddit.com/r/ecchi é um sub dedicado a pessoas que são fãs de garotas solo de anime que usam roupas minúsculas ou que estão completamente nuas enquanto se exibem",
        "description_hi": "Reddit.com/r/ecchi उन लोगों को समर्पित एक उप है जो एकल एनिमी लड़कियों के प्रशंसक हैं जो छोटे कपड़े पहनती हैं या जो दिखावा करते समय पूरी तरह से नग्न होती हैं",
        "description_ar": "Reddit.com/r/ecchi هو موقع فرعي مخصص للأشخاص الذين يعشقون أطفال الرسوم المتحركة المنفردين الذين يرتدون ملابس ضيقة أو الذين يكونون عراة تمامًا أثناء التباهي",
        "description_de": "Reddit.com/r/ecchi ist ein Sub, der sich an Leute richtet, die Fans von Solo-Anime-Babes sind, die knappe Kleidung tragen oder völlig nackt angeben, wenn sie angeben",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-31"
    },
    {
        "id": "ac354ce4",
        "name": "Free Hentai Stream Watch Hentai Porn Videos - Page",
        "url": "https://watch.freehentaistream.com/page/10",
        "category": "Anime Streaming",
        "description": "Watch Hentai at Free Hentai Stream for All Uncensored Hentai Streaming Videos. On our Hentai Tube we share 1080p HD Free Hentai Porn and Hentai Anime!",
        "description_es": "Mire hentai en transmisión hentai gratuita para todos los videos de transmisión hentai sin censura. ¡En nuestro tubo Hentai compartimos porno hentai y anime hentai gratis en alta definición de 1080p!",
        "description_jp": "すべての無修正エロアニメ ストリーミング ビデオについては、無料のエロアニメ ストリームでエロアニメをご覧ください。私たちの変態チューブでは、1080p HDの無料変態ポルノと変態アニメを共有しています！",
        "description_fr": "Regardez Hentai sur Free Hentai Stream pour toutes les vidéos en streaming Hentai non censurées. Sur notre tube Hentai, nous partageons du porno Hentai gratuit et des anime Hentai HD 1080p !",
        "description_pt": "Assista Hentai no Free Hentai Stream para todos os vídeos Hentai sem censura. Em nosso Hentai Tube compartilhamos 1080p HD Free Hentai Porn e Hentai Anime!",
        "description_hi": "सभी बिना सेंसर वाले हेंताई स्ट्रीमिंग वीडियो के लिए मुफ्त हेंताई स्ट्रीम पर हेंताई देखें। हमारे हेनतई ट्यूब पर हम 1080p एचडी मुफ्त हेनतई पोर्न और हेनतई एनीमे साझा करते हैं!",
        "description_ar": "شاهد هنتاي في Free Hentai Stream لجميع مقاطع فيديو هنتاي المتدفقة غير الخاضعة للرقابة. على أنبوب هنتاي الخاص بنا، نشارك 1080p HD Free Hentai Porn وHentai Anime!",
        "description_de": "Sehen Sie sich Hentai im kostenlosen Hentai-Stream für alle unzensierten Hentai-Streaming-Videos an. Auf unserer Hentai-Tube teilen wir kostenlose 1080p-HD-Hentai-Pornos und Hentai-Anime!",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-31"
    },
    {
        "id": "be2773a2",
        "name": "Anime and Hentai pictures - Hentai Booru",
        "url": "https://booru.eu/post/list/288",
        "category": "Anime Streaming",
        "description": "Booru.eu is a anime and hentai images board.",
        "description_es": "Booru.eu es un foro de imágenes de anime y hentai.",
        "description_jp": "Booru.eu はアニメとエロアニメの画像掲示板です。",
        "description_fr": "Booru.eu est un forum d'images d'anime et hentai.",
        "description_pt": "Booru.eu é um painel de imagens de anime e hentai.",
        "description_hi": "Booru.eu एक एनीमे और हेनतई इमेज बोर्ड है।",
        "description_ar": "Booru.eu هي لوحة صور أنيمي وهنتاي.",
        "description_de": "Booru.eu ist ein Anime- und Hentai-Bilderforum.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-31"
    },
    {
        "id": "738cf2ea",
        "name": "The Ultimate Battle Fuck/Sex Fight Collection (Eng",
        "url": "https://f95zone.to/threads/the-ultimate-battle-fuck-sex-fight-collection-english-translated.133539/page-8",
        "category": "Manga & Doujinshi",
        "description": "Thank you very much for your detailed reply.  It disappoints me greatly to hear the MUGEN archive decided to go and pull a Pornhub.  It's things like ",
        "description_es": "Muchas gracias por su respuesta detallada.  Me decepciona mucho saber que el archivo MUGEN decidió sacar un Pornhub.  son cosas como",
        "description_jp": "詳細なご回答をいただきまして誠にありがとうございます。  MUGEN アーカイブが Pornhub を削除することを決定したと聞いて、私は非常に失望しました。  それは次のようなものです",
        "description_fr": "Merci beaucoup pour votre réponse détaillée.  Cela me déçoit énormément d'entendre que les archives MUGEN ont décidé de créer un Pornhub.  Ce sont des choses comme",
        "description_pt": "Muito obrigado pela sua resposta detalhada.  Me decepcionou muito saber que o arquivo MUGEN decidiu abrir um Pornhub.  São coisas como",
        "description_hi": "आपके विस्तृत उत्तर के लिए बहुत बहुत धन्यवाद.  यह सुनकर मुझे बहुत निराशा हुई कि मुगेन आर्काइव ने जाकर पोर्नहब को हटाने का फैसला किया।  यह जैसी चीजें हैं",
        "description_ar": "شكرا جزيلا على ردكم التفصيلي.  أشعر بخيبة أمل كبيرة عندما أسمع أن أرشيف MUGEN قرر الذهاب وسحب موقع Pornhub.  إنها أشياء مثل",
        "description_de": "Vielen Dank für Ihre ausführliche Antwort.  Es enttäuscht mich sehr zu hören, dass das MUGEN-Archiv beschlossen hat, einen Pornhub zu entfernen.  Es sind Dinge wie",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-31"
    },
    {
        "id": "909f7e15",
        "name": "Top games for Android tagged Hentai - itch.io",
        "url": "https://itch.io/games/platform-android/tag-hentai",
        "category": "Hentai Streaming",
        "description": "Find games for Android tagged Hentai like The BloodRiver Saga: Retransmitter, The Headmaster, City of Secrets, Path of Desire: Cursed Chakra, Ilias: A",
        "description_es": "Encuentra juegos para Android etiquetados Hentai como The BloodRiver Saga: Retransmitter, The Headmaster, City of Secrets, Path of Desire: Cursed Chakra, Ilias: A",
        "description_jp": "The BloodRiver Saga: Retransmitter、The Headmaster、City of Secrets、Path of Desire: Cursed Chakra、Ilias: A など、ヘンタイのタグが付いた Android 用ゲームを見つけてください",
        "description_fr": "Trouvez des jeux pour Android étiquetés Hentai comme The BloodRiver Saga: Retransmitter, The Headmaster, City of Secrets, Path of Desire: Cursed Chakra, Ilias: A",
        "description_pt": "Encontre jogos para Android marcados com Hentai como The BloodRiver Saga: Retransmitter, The Headmaster, City of Secrets, Path of Desire: Cursed Chakra, Ilias: A",
        "description_hi": "एंड्रॉइड के लिए हेंटाई टैग वाले गेम ढूंढें जैसे द ब्लडरिवर सागा: रिट्रांसमीटर, द हेडमास्टर, सिटी ऑफ सीक्रेट्स, पाथ ऑफ डिज़ायर: कर्स्ड चक्र, इलियास: ए",
        "description_ar": "ابحث عن ألعاب Android الموسومة بـ Hentai مثل The BloodRiver Saga: Retransmitter، The Headmaster، City of Secrets، Path of Desire: Cursed Chakra، Ilias: A",
        "description_de": "Finden Sie Spiele für Android mit dem Tag „Hentai“ wie The BloodRiver Saga: Retransmitter, The Headmaster, City of Secrets, Path of Desire: Cursed Chakra, Ilias: A",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-31"
    },
    {
        "id": "94bacc3e",
        "name": "Best Sites to Read Doujinshi Online for Free - Das",
        "url": "https://dashtoon.com/blog/read-doujinshi-online-free",
        "category": "Manga & Doujinshi",
        "description": "Explore top sites to read doujinshi for free, like Pixiv, Mangadex, and Dashtoon, while supporting creators and enjoying fan-made works legally and ea",
        "description_es": "Explora los mejores sitios para leer doujinshi de forma gratuita, como Pixiv, Mangadex y Dashtoon, mientras apoyas a los creadores y disfrutas de trabajos creados por fans de forma legal y fácil.",
        "description_jp": "Pixiv、マンガデックス、ダッシュトゥーンなどの同人誌を無料で読むトップ サイトを探索しながら、クリエイターをサポートし、ファンメイドの作品を​​合法的に楽しみましょう",
        "description_fr": "Explorez les meilleurs sites pour lire des doujinshi gratuitement, comme Pixiv, Mangadex et Dashtoon, tout en soutenant les créateurs et en profitant des œuvres créées par des fans légalement et gratuitement.",
        "description_pt": "Explore os principais sites para ler doujinshi gratuitamente, como Pixiv, Mangadex e Dashtoon, enquanto apoia criadores e desfruta de obras feitas por fãs de forma legal e gratuita.",
        "description_hi": "दोजिंशी को मुफ़्त में पढ़ने के लिए पिक्सिव, मैंगाडेक्स और डैशटून जैसी शीर्ष साइटों का अन्वेषण करें, जबकि रचनाकारों का समर्थन करें और कानूनी रूप से और ईए प्रशंसक-निर्मित कार्यों का आनंद लें।",
        "description_ar": "استكشف أفضل المواقع لقراءة doujinshi مجانًا، مثل Pixiv وMangadex وDashtoon، مع دعم المبدعين والاستمتاع بالأعمال التي يصنعها المعجبون بشكل قانوني وسهل الاستخدام.",
        "description_de": "Entdecken Sie Top-Websites, auf denen Sie Doujinshi kostenlos lesen können, wie Pixiv, Mangadex und Dashtoon, und unterstützen Sie gleichzeitig die Urheber und genießen Sie von Fans erstellte Werke legal und kostenlos",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-31"
    },
    {
        "id": "8f237384",
        "name": "rubbed raw | Page: 1 - Anime Art & Hentai Gallery ",
        "url": "https://gelbooru.com/index.php?page=post&s=list&tags=rubbed_raw",
        "category": "Anime Streaming",
        "description": "Browse millions of anime, manga, videos, rubbed raw hentai, and video game themed images on Gelbooru. Discover art with detailed tags. Contains explic",
        "description_es": "Explore millones de anime, manga, videos, hentai crudo frotado e imágenes con temas de videojuegos en Gelbooru. Descubre arte con etiquetas detalladas. Contiene explícito",
        "description_jp": "Gelbooru で何百万ものアニメ、マンガ、ビデオ、生のエロアニメ、ビデオゲームをテーマにした画像を閲覧してください。詳細なタグでアートを発見します。明示的な内容が含まれています",
        "description_fr": "Parcourez des millions d’images sur le thème des anime, des mangas, des vidéos, des hentai bruts frottés et des images de jeux vidéo sur Gelbooru. Découvrez l'art avec des balises détaillées. Contient des explications",
        "description_pt": "Navegue por milhões de animes, mangás, vídeos, hentai cru e imagens temáticas de videogame no Gelbooru. Descubra arte com tags detalhadas. Contém explícito",
        "description_hi": "गेलबोरू पर लाखों एनीमे, मंगा, वीडियो, रब्ड रॉ हेनतई और वीडियो गेम थीम वाली छवियां ब्राउज़ करें। विस्तृत टैग के साथ कला की खोज करें। व्याख्या शामिल है",
        "description_ar": "تصفح ملايين الصور المتحركة والمانغا ومقاطع الفيديو والهنتاي الخام والصور التي تحمل سمات ألعاب الفيديو على Gelbooru. اكتشف الفن باستخدام العلامات التفصيلية. يحتوي على شرح",
        "description_de": "Durchsuchen Sie Millionen von Anime-, Manga-, Video-, Rubbed-Raw-Hentai- und Videospiel-Themenbildern auf Gelbooru. Entdecken Sie Kunst mit detaillierten Tags. Enthält explizite Informationen",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-31"
    },
    {
        "id": "e934f02a",
        "name": "Top Manga - Top Doujinshi - MyAnimeList.net",
        "url": "https://myanimelist.net/topmanga.php?type=doujin",
        "category": "Anime Streaming",
        "description": "Browse the highest-ranked doujin on MyAnimeList, the internet's largest manga database.",
        "description_es": "Explore los doujin mejor clasificados en MyAnimeList, la base de datos de manga más grande de Internet.",
        "description_jp": "インターネット最大のマンガ データベースである MyAnimeList で最高ランクの同人誌を閲覧します。",
        "description_fr": "Parcourez les doujin les mieux classés sur MyAnimeList, la plus grande base de données de mangas sur Internet.",
        "description_pt": "Navegue pelo doujin com melhor classificação no MyAnimeList, o maior banco de dados de mangá da Internet.",
        "description_hi": "इंटरनेट के सबसे बड़े मंगा डेटाबेस MyAnimeList पर सर्वोच्च रैंक वाले डौजिन को ब्राउज़ करें।",
        "description_ar": "تصفح الدوجين الأعلى تصنيفًا على MyAnimeList، أكبر قاعدة بيانات للمانجا على الإنترنت.",
        "description_de": "Durchsuchen Sie die bestbewerteten Doujin auf MyAnimeList, der größten Manga-Datenbank im Internet.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-31"
    },
    {
        "id": "f4f33a01",
        "name": "japanese_language - Anime and Hentai pictures",
        "url": "https://www.booru.scoreland.name/post/list/japanese_language/1",
        "category": "Anime Streaming",
        "description": "Booru.eu is a anime and hentai images board.",
        "description_es": "Booru.eu es un foro de imágenes de anime y hentai.",
        "description_jp": "Booru.eu はアニメとエロアニメの画像掲示板です。",
        "description_fr": "Booru.eu est un forum d'images d'anime et hentai.",
        "description_pt": "Booru.eu é um painel de imagens de anime e hentai.",
        "description_hi": "Booru.eu एक एनीमे और हेनतई इमेज बोर्ड है।",
        "description_ar": "Booru.eu هي لوحة صور أنيمي وهنتاي.",
        "description_de": "Booru.eu ist ein Anime- und Hentai-Bilderforum.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-31"
    },
    {
        "id": "61e0b326",
        "name": "english_ - Anime and Hentai | Porn imageboard - BO",
        "url": "https://booru.xxx/index.php?q=%2Fpost%2Flist%2Fenglish_%2F1",
        "category": "Anime Streaming",
        "description": "Watch  erotic pleasure on Erotic Art",
        "description_es": "Ver placer erótico en Arte Erótico",
        "description_jp": "Erotic Art でエロティックな喜びを見る",
        "description_fr": "Regardez le plaisir érotique sur Erotic Art",
        "description_pt": "Assista ao prazer erótico em Arte Erótica",
        "description_hi": "कामुक कला पर कामुक आनंद देखें",
        "description_ar": "شاهد المتعة المثيرة على Erotic Art",
        "description_de": "Sehen Sie sich erotisches Vergnügen auf der Seite „Erotische Kunst“ an",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-31"
    },
    {
        "id": "6aaa782b",
        "name": "H-Games - WoH Board: Anime & Hentai Forum",
        "url": "https://board.world-of-hentai.to/forums/h-games.24",
        "category": "Anime Streaming",
        "description": "Alles zu Hentai Games",
        "description_es": "Todo sobre los juegos hentai.",
        "description_jp": "エロゲームに関するすべて",
        "description_fr": "Tout sur les jeux hentai",
        "description_pt": "Tudo sobre jogos hentai",
        "description_hi": "हेनतई खेल के बारे में सब कुछ",
        "description_ar": "كل شيء عن ألعاب الهنتاي",
        "description_de": "Alles zu Hentai Games",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-31"
    },
    {
        "id": "cfab805c",
        "name": "Hentoid Android App – Offline Manga & Doujinshi Re",
        "url": "https://hentoid.com",
        "category": "Manga & Doujinshi",
        "description": "Hentoid is a powerful Android manga reader that lets you download, organize, and read doujinshi offline with advanced library management features. #He",
        "description_es": "Hentoid es un potente lector de manga para Android que te permite descargar, organizar y leer doujinshi sin conexión con funciones avanzadas de administración de biblioteca. #Él",
        "description_jp": "Hentoid は強力な Android マンガ リーダーで、高度なライブラリ管理機能を使用して同人誌をダウンロード、整理し、オフラインで読むことができます。 ＃彼",
        "description_fr": "Hentoid est un puissant lecteur de mangas Android qui vous permet de télécharger, d'organiser et de lire des doujinshi hors ligne grâce à des fonctionnalités avancées de gestion de bibliothèque. #Il",
        "description_pt": "Hentoid é um poderoso leitor de mangá para Android que permite baixar, organizar e ler doujinshi offline com recursos avançados de gerenciamento de biblioteca. #Ele",
        "description_hi": "हेंटोइड एक शक्तिशाली एंड्रॉइड मंगा रीडर है जो आपको उन्नत लाइब्रेरी प्रबंधन सुविधाओं के साथ डौजिंशी को ऑफ़लाइन डाउनलोड करने, व्यवस्थित करने और पढ़ने की सुविधा देता है। #वह",
        "description_ar": "Hentoid هو قارئ مانغا قوي لنظام Android يتيح لك تنزيل doujinshi وتنظيمه وقراءته دون الاتصال بالإنترنت باستخدام ميزات إدارة المكتبة المتقدمة. #هو",
        "description_de": "Hentoid ist ein leistungsstarker Android-Manga-Reader, mit dem Sie Doujinshi mit erweiterten Bibliotheksverwaltungsfunktionen offline herunterladen, organisieren und lesen können. #Er",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-31"
    },
    {
        "id": "b1bdb062",
        "name": "Forums - ErogeGames",
        "url": "https://erogegames.com/forums",
        "category": "Games & Visual Novels",
        "description": "Discover Forums - ErogeGames - A high quality portal for your favorite content.",
        "description_es": "Descubre Foros - ErogeGames - Un portal de alta calidad para tu contenido favorito.",
        "description_jp": "フォーラムを発見 - エロゲゲーム - お気に入りのコンテンツのための高品質ポータル。",
        "description_fr": "Découvrez les forums - ErogeGames - Un portail de haute qualité pour votre contenu préféré.",
        "description_pt": "Descubra Fóruns - ErogeGames - Um portal de alta qualidade para seus conteúdos favoritos.",
        "description_hi": "फ़ोरम खोजें - ErogeGames - आपकी पसंदीदा सामग्री के लिए एक उच्च गुणवत्ता वाला पोर्टल।",
        "description_ar": "اكتشف المنتديات - ErogeGames - بوابة عالية الجودة للمحتوى المفضل لديك.",
        "description_de": "Entdecken Sie Foren – ErogeGames – Ein hochwertiges Portal für Ihre Lieblingsinhalte.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-31"
    },
    {
        "id": "cdcc50b2",
        "name": "Great Visual Novel | GVN",
        "url": "https://greatvisualnovel.up.railway.app",
        "category": "Games & Visual Novels",
        "description": "A visual novel database where you will get the latest information of all kind of visual novels.",
        "description_es": "Una base de datos de novelas visuales donde obtendrá la información más reciente de todo tipo de novelas visuales.",
        "description_jp": "あらゆる種類のビジュアルノベルの最新情​​報が得られるビジュアルノベルデータベース。",
        "description_fr": "Une base de données de romans visuels où vous obtiendrez les dernières informations sur toutes sortes de romans visuels.",
        "description_pt": "Um banco de dados de romances visuais onde você obterá as informações mais recentes de todos os tipos de romances visuais.",
        "description_hi": "एक दृश्य उपन्यास डेटाबेस जहां आपको सभी प्रकार के दृश्य उपन्यासों की नवीनतम जानकारी मिलेगी।",
        "description_ar": "قاعدة بيانات للروايات المرئية حيث يمكنك الحصول على أحدث المعلومات لجميع أنواع الروايات المرئية.",
        "description_de": "Eine Visual Novel-Datenbank, in der Sie die neuesten Informationen zu allen Arten von Visual Novels erhalten.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-31"
    },
    {
        "id": "23937bbc",
        "name": "The Top 7 Best Subreddits for Hentai - Doujins.com",
        "url": "https://doujins.com/blog/the-top-7-best-subreddits-for-hentai-432?x=19",
        "category": "Hentai Streaming",
        "description": "Fap to english hentai manga, doujins, and CGsets from your favorite artists, featuring your favorite anime series, for free.",
        "description_es": "Pase a manga hentai en inglés, doujins y CGsets de sus artistas favoritos, con sus series de anime favoritas, de forma gratuita.",
        "description_jp": "お気に入りのアニメ シリーズをフィーチャーした、お気に入りのアーティストのエロ漫画、同人誌、CG セットを無料で英語で読みましょう。",
        "description_fr": "Fap aux mangas hentai anglais, aux doujins et aux CGsets de vos artistes préférés, mettant en vedette votre série animée préférée, gratuitement.",
        "description_pt": "Fap para mangás hentai ingleses, doujins e CGsets de seus artistas favoritos, apresentando suas séries de anime favoritas, gratuitamente.",
        "description_hi": "अपने पसंदीदा कलाकारों से अंग्रेजी हेनतई मंगा, डोजिन और सीजीसेट पर फैप करें, जिसमें आपकी पसंदीदा एनीमे श्रृंखला मुफ्त में उपलब्ध है।",
        "description_ar": "استمتع بمشاهدة مانغا الهنتاي الإنجليزية والدوجين ومجموعات CG من الفنانين المفضلين لديك، والتي تعرض مسلسلات الأنيمي المفضلة لديك مجانًا.",
        "description_de": "Wechseln Sie kostenlos zu englischen Hentai-Manga, Doujins und CGsets Ihrer Lieblingskünstler mit Ihrer Lieblings-Animeserie.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-31"
    },
    {
        "id": "028733d3",
        "name": "New releases | Translated games - HSuki",
        "url": "https://www.h-suki.com/en/home/newreleases?select=nonjp",
        "category": "Games & Visual Novels",
        "description": "New hentai games translated in english released in the last two months",
        "description_es": "Nuevos juegos hentai traducidos al inglés lanzados en los últimos dos meses",
        "description_jp": "過去 2 か月以内に英語に翻訳された新しいエロゲームがリリースされました",
        "description_fr": "Nouveaux jeux hentai traduits en anglais sortis au cours des deux derniers mois",
        "description_pt": "Novos jogos hentai traduzidos para inglês lançados nos últimos dois meses",
        "description_hi": "पिछले दो महीनों में अंग्रेजी में अनुवादित नए हेनतई गेम जारी किए गए",
        "description_ar": "ألعاب هنتاي جديدة مترجمة باللغة الإنجليزية تم إصدارها في الشهرين الماضيين",
        "description_de": "In den letzten zwei Monaten wurden neue ins Englische übersetzte Hentai-Spiele veröffentlicht",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-31"
    },
    {
        "id": "fe945615",
        "name": "Raw hentai videos, GIFs, and images | Rule 34 App",
        "url": "https://r34.app/posts/e621.net?tags=raw",
        "category": "Hentai Streaming",
        "description": "Stream and download Raw Hentai porn videos, GIFs and images, from e621.net. Free anime hentai here on R34 App",
        "description_es": "Transmita y descargue videos, GIF e imágenes porno hentai crudos desde e621.net. Anime hentai gratis aquí en la aplicación R34",
        "description_jp": "e621.net から Raw Hentai ポルノビデオ、GIF、画像をストリーミングおよびダウンロードします。 R34 アプリの無料アニメエロアニメ",
        "description_fr": "Diffusez et téléchargez des vidéos porno, des GIF et des images Raw Hentai sur e621.net. Anime hentai gratuit ici sur l'application R34",
        "description_pt": "Transmita e baixe vídeos pornôs Raw Hentai, GIFs e imagens, em e621.net. Anime hentai grátis aqui no aplicativo R34",
        "description_hi": "e621.net से रॉ हेनतई अश्लील वीडियो, जीआईएफ और छवियां स्ट्रीम और डाउनलोड करें। यहां R34 ऐप पर निःशुल्क एनीमे हेनतई",
        "description_ar": "يمكنك بث وتنزيل مقاطع الفيديو الإباحية Raw Hentai وملفات GIF والصور من e621.net. هنتاي أنيمي مجاني هنا على تطبيق R34",
        "description_de": "Streamen und laden Sie Raw-Hentai-Pornovideos, GIFs und Bilder von e621.net herunter. Kostenloses Anime-Hentai hier in der R34-App",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-31"
    },
    {
        "id": "fa436db3",
        "name": "Ohentai.org | HD Hentai Video Streams Online",
        "url": "https://ohentai.org",
        "category": "Anime Streaming",
        "description": "Watch and download free hd hentai video streams in 720p/1080p quality. This site is mobile compatible and works with iPhone/iPad/Android devices.",
        "description_es": "Mire y descargue transmisiones de video hentai en alta definición gratuitas en calidad 720p/1080p. Este sitio es compatible con dispositivos móviles y funciona con dispositivos iPhone/iPad/Android.",
        "description_jp": "720p/1080p 品質の無料の HD エロビデオ ストリームを視聴してダウンロードします。このサイトはモバイル対応で、iPhone/iPad/Android デバイスで動作します。",
        "description_fr": "Regardez et téléchargez gratuitement des flux vidéo HD hentai en qualité 720p/1080p. Ce site est compatible mobile et fonctionne avec les appareils iPhone/iPad/Android.",
        "description_pt": "Assista e baixe streams de vídeo HD hentai gratuitos em qualidade 720p / 1080p. Este site é compatível com dispositivos móveis e funciona com dispositivos iPhone/iPad/Android.",
        "description_hi": "720p/1080p गुणवत्ता में मुफ्त एचडी हेनतई वीडियो स्ट्रीम देखें और डाउनलोड करें। यह साइट मोबाइल संगत है और iPhone/iPad/Android उपकरणों के साथ काम करती है।",
        "description_ar": "شاهد وقم بتنزيل مقاطع فيديو هنتاي عالية الدقة مجانًا بجودة 720 بكسل / 1080 بكسل. هذا الموقع متوافق مع الأجهزة المحمولة ويعمل مع أجهزة iPhone/iPad/Android.",
        "description_de": "Sehen Sie sich kostenlose HD-Hentai-Videostreams in 720p/1080p-Qualität an und laden Sie sie herunter. Diese Website ist mobilkompatibel und funktioniert mit iPhone/iPad/Android-Geräten.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-31"
    },
    {
        "id": "8c61ad8d",
        "name": "English Games | H-Game18",
        "url": "https://h-game18.xyz/category/games/language/english",
        "category": "Games & Visual Novels",
        "description": "Download free adult H-games and visual novels. PC & Android supported. English & Vietnamese patches available.",
        "description_es": "Descargue juegos H y novelas visuales para adultos gratis. Compatible con PC y Android. Parches en inglés y vietnamita disponibles.",
        "description_jp": "アダルト H ゲームやビジュアルノベルを無料でダウンロード。 PCとAndroidをサポート。英語とベトナム語のパッチが利用可能です。",
        "description_fr": "Téléchargez gratuitement des jeux H et des romans visuels pour adultes. PC et Android pris en charge. Patchs anglais et vietnamien disponibles.",
        "description_pt": "Baixe jogos H e romances visuais gratuitos para adultos. Compatível com PC e Android. Patches em inglês e vietnamita disponíveis.",
        "description_hi": "निःशुल्क वयस्क एच-गेम और दृश्य उपन्यास डाउनलोड करें। पीसी और एंड्रॉइड समर्थित। अंग्रेजी और वियतनामी पैच उपलब्ध हैं।",
        "description_ar": "قم بتنزيل ألعاب H والروايات المرئية مجانًا للبالغين. دعم أجهزة الكمبيوتر الشخصية وأندرويد. تتوفر تصحيحات باللغة الإنجليزية والفيتنامية.",
        "description_de": "Laden Sie kostenlose H-Games und Bildromane für Erwachsene herunter. PC und Android werden unterstützt. Englische und vietnamesische Patches verfügbar.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-31"
    },
    {
        "id": "07704196",
        "name": "translated | Page: 3 - Anime Art & Hentai Gallery ",
        "url": "https://gelbooru.com/index.php?page=post&s=list&tags=translated&pid=84",
        "category": "Anime Streaming",
        "description": "Browse millions of anime, manga, videos, translated hentai, and video game themed images on Gelbooru. Discover art with detailed tags. Contains explic",
        "description_es": "Explora millones de anime, manga, vídeos, hentai traducidos e imágenes con temas de videojuegos en Gelbooru. Descubre arte con etiquetas detalladas. Contiene explícito",
        "description_jp": "Gelbooru で何百万ものアニメ、マンガ、ビデオ、翻訳されたエロアニメ、ビデオ ゲームをテーマにした画像を閲覧してください。詳細なタグでアートを発見します。明示的な内容が含まれています",
        "description_fr": "Parcourez des millions d’images sur le thème des anime, des mangas, des vidéos, des hentai traduits et des images de jeux vidéo sur Gelbooru. Découvrez l'art avec des balises détaillées. Contient des explications",
        "description_pt": "Navegue por milhões de animes, mangás, vídeos, hentai traduzidos e imagens temáticas de videogame no Gelbooru. Descubra arte com tags detalhadas. Contém explícito",
        "description_hi": "गेलबोरू पर लाखों एनीमे, मंगा, वीडियो, अनुवादित हेनतई और वीडियो गेम थीम वाली छवियां ब्राउज़ करें। विस्तृत टैग के साथ कला की खोज करें। व्याख्या शामिल है",
        "description_ar": "تصفح ملايين الصور المتحركة والمانجا ومقاطع الفيديو والهنتاي المترجمة وصور ألعاب الفيديو على Gelbooru. اكتشف الفن باستخدام العلامات التفصيلية. يحتوي على شرح",
        "description_de": "Durchsuchen Sie Millionen von Anime-, Manga-, Video-, übersetzten Hentai- und Videospiel-Themenbildern auf Gelbooru. Entdecken Sie Kunst mit detaillierten Tags. Enthält explizite Informationen",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-31"
    },
    {
        "id": "65dce52d",
        "name": "daimus raw | Page: 1 | Gelbooru - Anime Art & Hent",
        "url": "https://gelbooru.com/index.php?page=post&s=list&tags=daimus_raw",
        "category": "Anime Streaming",
        "description": "Browse millions of anime, manga, videos, daimus raw hentai, and video game themed images on Gelbooru. Discover art with detailed tags. Contains explic",
        "description_es": "Explore millones de anime, manga, videos, daimus raw hentai e imágenes con temas de videojuegos en Gelbooru. Descubre arte con etiquetas detalladas. Contiene explícito",
        "description_jp": "Gelbooru で何百万ものアニメ、マンガ、ビデオ、daimus raw エロアニメ、ビデオ ゲームをテーマにした画像を閲覧してください。詳細なタグでアートを発見します。明示的な内容が含まれています",
        "description_fr": "Parcourez des millions d’images sur le thème des anime, mangas, vidéos, daimus raw hentai et jeux vidéo sur Gelbooru. Découvrez l'art avec des balises détaillées. Contient des explications",
        "description_pt": "Navegue por milhões de animes, mangás, vídeos, daimus raw hentai e imagens temáticas de videogame no Gelbooru. Descubra arte com tags detalhadas. Contém explícito",
        "description_hi": "गेलबोरू पर लाखों एनीमे, मंगा, वीडियो, डेमस रॉ हेनतई और वीडियो गेम थीम वाली छवियां ब्राउज़ करें। विस्तृत टैग के साथ कला की खोज करें। व्याख्या शामिल है",
        "description_ar": "تصفح ملايين الصور المتحركة والمانغا ومقاطع الفيديو وdaimus Raw hentai والصور التي تحمل سمات ألعاب الفيديو على Gelbooru. اكتشف الفن باستخدام العلامات التفصيلية. يحتوي على شرح",
        "description_de": "Durchsuchen Sie Millionen von Bildern zum Thema Anime, Manga, Videos, Daimus Raw Hentai und Videospiele auf Gelbooru. Entdecken Sie Kunst mit detaillierten Tags. Enthält explizite Informationen",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-31"
    },
    {
        "id": "8f7e2a24",
        "name": "Where do you find doujinshi's? Did I even spell it",
        "url": "https://www.tumblr.com/lostcauses-noregrets/626650401367867392/where-do-you-find-doujinshis-did-i-even-spell-it",
        "category": "Manga & Doujinshi",
        "description": "Where do you find doujinshi’s? Did I even spell it right ._.\n\nYou did indeed spell it right Anon! I’m not sure if you’re looking for doujinshi that yo",
        "description_es": "¿Dónde encuentras los doujinshi? ¿Lo escribí bien?\n\n¡De hecho lo escribiste bien Anon! No estoy seguro si estás buscando doujinshi que yo",
        "description_jp": "同人誌はどこで見つけますか？スペルは正しかったでしょうか。_.\n\n確かに正しく綴りましたね、アノン！同人誌を探しているのか分かりませんが、",
        "description_fr": "Où trouve-t-on des doujinshi ? Est-ce que je l'ai même épelé correctement ._.\n\nTu l'as effectivement bien épelé Anon ! Je ne sais pas si tu cherches un doujinshi, yo",
        "description_pt": "Onde você encontra doujinshi? Eu escrevi certo ._.\n\nVocê realmente escreveu certo, Anon! Não tenho certeza se você está procurando por doujinshi que você",
        "description_hi": "आप डौजिंशी कहाँ पाते हैं? क्या मैंने भी इसे सही लिखा है._?\n\nआपने वास्तव में इसे सही लिखा है एनोन! मुझे यकीन नहीं है कि आप दुजिंशी की तलाश में हैं या नहीं",
        "description_ar": "أين تجد دوجينشي؟ هل حتى تهجئتها بشكل صحيح ._.\n\nلقد أخطأت في تهجئتها حقًا يا أنون! لست متأكدًا مما إذا كنت تبحث عن doujinshi أم لا",
        "description_de": "Wo findet man Doujinshis? Habe ich es überhaupt richtig geschrieben?\n\nDu hast es tatsächlich richtig geschrieben, Anon! Ich bin mir nicht sicher, ob Sie auf der Suche nach Doujinshi sind",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-31"
    },
    {
        "id": "1e784a14",
        "name": "Visual Novels - Linear Long Story Sex Games - Gamc",
        "url": "https://gamcore.com/visual_novels",
        "category": "Games & Visual Novels",
        "description": "Sex Games with Visual Novels - Truecalling, My Sister & I, Victoria in Big City, War Demon Kirstin, Sissified Husband of Evelyn, Falling Undercover: N",
        "description_es": "Juegos sexuales con novelas visuales: Truecalling, My Sister & I, Victoria in Big City, War Demon Kirstin, Sissified Husband of Evelyn, Falling Undercover: N",
        "description_jp": "ビジュアルノベル付きセックスゲーム - Truecalling、My Sister & I、Victoria in Big City、War Demon Kirstin、Sissified Daughter of Evelyn、Falling Undercover: N",
        "description_fr": "Jeux sexuels avec des romans visuels - Truecalling, My Sister & I, Victoria in Big City, War Demon Kirstin, Sissified Husband of Evelyn, Falling Undercover : N",
        "description_pt": "Jogos sexuais com romances visuais - Truecalling, My Sister & I, Victoria in Big City, War Demon Kirstin, Sissified Husband of Evelyn, Falling Undercover: N",
        "description_hi": "दृश्य उपन्यासों के साथ सेक्स गेम्स - ट्रू कॉलिंग, माई सिस्टर एंड आई, विक्टोरिया इन बिग सिटी, वॉर डेमन कर्स्टिन, सिसिफाइड हसबैंड ऑफ एवलिन, फॉलिंग अंडरकवर: एन",
        "description_ar": "ألعاب جنسية مع روايات مرئية - Truecalling، أنا وأختي، فيكتوريا في المدينة الكبيرة، شيطان الحرب كيرستين، زوج إيفلين المخنث، السقوط السري: N",
        "description_de": "Sexspiele mit Visual Novels – Truecalling, My Sister & I, Victoria in Big City, War Demon Kirstin, Sissified Husband of Evelyn, Falling Undercover: N",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-31"
    },
    {
        "id": "3263c040",
        "name": "Visual Novel Porn Games to Play Now (2026) - Steam",
        "url": "https://steamygamer.com/porn-games/visual-novel",
        "category": "Hentai Streaming",
        "description": "A list of the best visual novel porn games available on PC, Mac, Android and iOS! Including FREE sex games that you can download and play right away!",
        "description_es": "¡Una lista de los mejores juegos porno de novelas visuales disponibles para PC, Mac, Android e iOS! ¡Incluyendo juegos sexuales GRATIS que puedes descargar y jugar de inmediato!",
        "description_jp": "PC、Mac、Android、iOS で利用できる最高のビジュアルノベル ポルノ ゲームのリスト!ダウンロードしてすぐにプレイできる無料のセックス ゲームが含まれています。",
        "description_fr": "Une liste des meilleurs jeux pornographiques de roman visuel disponibles sur PC, Mac, Android et iOS ! Y compris des jeux sexuels GRATUITS que vous pouvez télécharger et jouer immédiatement !",
        "description_pt": "Uma lista dos melhores jogos pornográficos de novelas visuais disponíveis para PC, Mac, Android e iOS! Incluindo jogos sexuais GRATUITOS que você pode baixar e jogar imediatamente!",
        "description_hi": "पीसी, मैक, एंड्रॉइड और आईओएस पर उपलब्ध सर्वोत्तम दृश्य उपन्यास पोर्न गेम की एक सूची! इसमें मुफ़्त सेक्स गेम शामिल हैं जिन्हें आप तुरंत डाउनलोड कर सकते हैं और खेल सकते हैं!",
        "description_ar": "قائمة بأفضل الألعاب الإباحية المرئية المتوفرة على أجهزة الكمبيوتر الشخصية وأجهزة Mac وAndroid وiOS! بما في ذلك ألعاب الجنس المجانية التي يمكنك تنزيلها ولعبها على الفور!",
        "description_de": "Eine Liste der besten Visual Novel-Pornospiele, die auf PC, Mac, Android und iOS verfügbar sind! Einschließlich KOSTENLOSER Sexspiele, die Sie sofort herunterladen und spielen können!",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-31"
    },
    {
        "id": "5c2044e8",
        "name": "THE HORNIEST GACHA GAMES RANKED - YouTube",
        "url": "https://www.youtube.com/watch?v=xHAOnk26TKw",
        "category": "Anime Streaming",
        "description": "Enjoy the videos and music you love, upload original content, and share it all with friends, family, and the world on YouTube.",
        "description_es": "Disfruta de los vídeos y la música que te encantan, sube contenido original y compártelo todo con amigos, familiares y el mundo en YouTube.",
        "description_jp": "YouTube でお気に入りの動画や音楽を楽しみ、オリジナルのコンテンツをアップロードして友だちや家族、世界中の人たちと共有しましょう。",
        "description_fr": "Profitez des vidéos et de la musique que vous aimez, téléchargez du contenu original et partagez-le avec vos amis, votre famille et le monde entier sur YouTube.",
        "description_pt": "Aproveite os vídeos e músicas que você adora, carregue conteúdo original e compartilhe tudo com amigos, familiares e com o mundo no YouTube.",
        "description_hi": "अपने पसंदीदा वीडियो और संगीत का आनंद लें, मूल सामग्री अपलोड करें और इसे YouTube पर दोस्तों, परिवार और दुनिया के साथ साझा करें।",
        "description_ar": "استمتع بمقاطع الفيديو والموسيقى التي تحبها، وقم بتحميل المحتوى الأصلي، وشاركه كله مع الأصدقاء والعائلة والعالم على YouTube.",
        "description_de": "Genießen Sie die Videos und Musik, die Sie lieben, laden Sie Originalinhalte hoch und teilen Sie alles mit Freunden, Familie und der Welt auf YouTube.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-31"
    },
    {
        "id": "30ddfa17",
        "name": "Free Hentai Stream Watch Hentai Porn Videos | Unce",
        "url": "https://watch.freehentaistream.com",
        "category": "Anime Streaming",
        "description": "Watch Hentai at Free Hentai Stream for All Uncensored Hentai Streaming Videos. On our Hentai Tube we share 1080p HD Free Hentai Porn and Hentai Anime!",
        "description_es": "Mire hentai en transmisión hentai gratuita para todos los videos de transmisión hentai sin censura. ¡En nuestro tubo Hentai compartimos porno hentai y anime hentai gratis en alta definición de 1080p!",
        "description_jp": "すべての無修正エロアニメ ストリーミング ビデオについては、無料のエロアニメ ストリームでエロアニメをご覧ください。私たちの変態チューブでは、1080p HDの無料変態ポルノと変態アニメを共有しています！",
        "description_fr": "Regardez Hentai sur Free Hentai Stream pour toutes les vidéos en streaming Hentai non censurées. Sur notre tube Hentai, nous partageons du porno Hentai gratuit et des anime Hentai HD 1080p !",
        "description_pt": "Assista Hentai no Free Hentai Stream para todos os vídeos Hentai sem censura. Em nosso Hentai Tube compartilhamos 1080p HD Free Hentai Porn e Hentai Anime!",
        "description_hi": "सभी बिना सेंसर वाले हेंताई स्ट्रीमिंग वीडियो के लिए मुफ्त हेंताई स्ट्रीम पर हेंताई देखें। हमारे हेनतई ट्यूब पर हम 1080p एचडी मुफ्त हेनतई पोर्न और हेनतई एनीमे साझा करते हैं!",
        "description_ar": "شاهد هنتاي في Free Hentai Stream لجميع مقاطع فيديو هنتاي المتدفقة غير الخاضعة للرقابة. على أنبوب هنتاي الخاص بنا، نشارك 1080p HD Free Hentai Porn وHentai Anime!",
        "description_de": "Sehen Sie sich Hentai im kostenlosen Hentai-Stream für alle unzensierten Hentai-Streaming-Videos an. Auf unserer Hentai-Tube teilen wir kostenlose 1080p-HD-Hentai-Pornos und Hentai-Anime!",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-31"
    },
    {
        "id": "a0c70313",
        "name": "Top 18 Best Anime GACHA Games for Android & iOS 20",
        "url": "https://www.youtube.com/watch?v=eytPe_j5C34",
        "category": "Anime Streaming",
        "description": "Enjoy the videos and music you love, upload original content, and share it all with friends, family, and the world on YouTube.",
        "description_es": "Disfruta de los vídeos y la música que te encantan, sube contenido original y compártelo todo con amigos, familiares y el mundo en YouTube.",
        "description_jp": "YouTube でお気に入りの動画や音楽を楽しみ、オリジナルのコンテンツをアップロードして友だちや家族、世界中の人たちと共有しましょう。",
        "description_fr": "Profitez des vidéos et de la musique que vous aimez, téléchargez du contenu original et partagez-le avec vos amis, votre famille et le monde entier sur YouTube.",
        "description_pt": "Aproveite os vídeos e músicas que você adora, carregue conteúdo original e compartilhe tudo com amigos, familiares e com o mundo no YouTube.",
        "description_hi": "अपने पसंदीदा वीडियो और संगीत का आनंद लें, मूल सामग्री अपलोड करें और इसे YouTube पर दोस्तों, परिवार और दुनिया के साथ साझा करें।",
        "description_ar": "استمتع بمقاطع الفيديو والموسيقى التي تحبها، وقم بتحميل المحتوى الأصلي، وشاركه كله مع الأصدقاء والعائلة والعالم على YouTube.",
        "description_de": "Genießen Sie die Videos und Musik, die Sie lieben, laden Sie Originalinhalte hoch und teilen Sie alles mit Freunden, Familie und der Welt auf YouTube.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-31"
    },
    {
        "id": "ec49058a",
        "name": "Where to Read Manga for Free Online",
        "url": "https://www.ign.com/articles/best-free-manga-sites-and-apps",
        "category": "Manga & Doujinshi",
        "description": "Want to get into manga without spending money?",
        "description_es": "¿Quieres iniciarte en el manga sin gastar dinero?",
        "description_jp": "お金をかけずに漫画を楽しみたいですか？",
        "description_fr": "Envie de vous lancer dans le manga sans dépenser d'argent ?",
        "description_pt": "Quer entrar no mangá sem gastar dinheiro?",
        "description_hi": "क्या आप पैसे खर्च किए बिना मंगा में आना चाहते हैं?",
        "description_ar": "هل تريد الدخول في عالم المانجا دون إنفاق المال؟",
        "description_de": "Möchten Sie in den Manga einsteigen, ohne Geld auszugeben?",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-31"
    },
    {
        "id": "e495c042",
        "name": "Aniwave - Watch Anime Online Free HD Streaming",
        "url": "https://aniwaves.ru",
        "category": "Anime Streaming",
        "description": "Aniwave - Watch anime online free in HD with sub & dub. Fast streaming servers, clean interface, no sign-up required and daily updates. WATCH NOW!",
        "description_es": "Aniwave: mira anime en línea gratis en HD con sub y dub. Servidores de transmisión rápidos, interfaz limpia, no es necesario registrarse y actualizaciones diarias. ¡MIRA AHORA!",
        "description_jp": "アニウェーブ - 字幕と吹き替え付きの HD でアニメをオンラインで無料視聴します。高速ストリーミングサーバー、クリーンなインターフェース、サインアップ不要、毎日の更新。今すぐ見てください！",
        "description_fr": "Aniwave - Regardez des anime en ligne gratuitement en HD avec sous et doublage. Serveurs de streaming rapides, interface claire, aucune inscription requise et mises à jour quotidiennes. REGARDEZ MAINTENANT !",
        "description_pt": "Aniwave - Assista anime online gratuitamente em HD com sub e dub. Servidores de streaming rápidos, interface limpa, sem necessidade de inscrição e atualizações diárias. ASSISTA AGORA!",
        "description_hi": "एनिवेव - सब और डब के साथ एचडी में एनीमे ऑनलाइन मुफ़्त देखें। तेज़ स्ट्रीमिंग सर्वर, साफ़ इंटरफ़ेस, कोई साइन-अप आवश्यक नहीं और दैनिक अपडेट। अब देखिए!",
        "description_ar": "Aniwave - مشاهدة الانمي اون لاين مجانا بجودة HD مع الترجمة والدبلجة. خوادم بث سريعة وواجهة نظيفة ولا يلزم الاشتراك وتحديثات يومية. شاهد الآن!",
        "description_de": "Aniwave – Anime kostenlos online in HD mit Sub und Dub ansehen. Schnelle Streaming-Server, saubere Benutzeroberfläche, keine Anmeldung erforderlich und tägliche Updates. JETZT ANSEHEN!",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-31"
    },
    {
        "id": "84a48086",
        "name": "English Works Search results | DLsite Doujin - For",
        "url": "https://www.dlsite.com/ecchi-eng/translation",
        "category": "Hentai Streaming",
        "description": "\"DLsite Doujin R18\" is a download shop for doujinshi, doujin games, doujin voice works and ASMR content. You can immediately download and enjoy produc",
        "description_es": "\"DLsite Doujin R18\" es una tienda de descargas de doujinshi, juegos de doujin, trabajos de voz de doujin y contenido ASMR. Puedes descargar y disfrutar inmediatamente la producción.",
        "description_jp": "「DLsite 同人 R18」は同人誌・同人ゲーム・同人音声・ASMRのダウンロードショップ。すぐにダウンロードして製品をお楽しみいただけます",
        "description_fr": "\"DLsite Doujin R18\" est une boutique de téléchargement de doujinshi, de jeux de doujin, d'œuvres vocales de doujin et de contenu ASMR. Vous pouvez immédiatement télécharger et profiter du produit",
        "description_pt": "\"DLsite Doujin R18\" é uma loja de download de doujinshi, jogos doujin, obras de voz doujin e conteúdo ASMR. Você pode baixar imediatamente e desfrutar do produto",
        "description_hi": "\"DLsite Doujin R18\" doujinshi, doujin गेम्स, doujin वॉयस वर्क्स और ASMR सामग्री के लिए एक डाउनलोड शॉप है। आप तुरंत डाउनलोड कर सकते हैं और उत्पाद का आनंद ले सकते हैं",
        "description_ar": "\"DLsite Doujin R18\" هو متجر تنزيل لألعاب doujinshi وألعاب doujin وأعمال doujin الصوتية ومحتوى ASMR. يمكنك تنزيل المنتج والاستمتاع به على الفور",
        "description_de": "„DLsite Doujin R18“ ist ein Download-Shop für Doujinshi, Doujin-Spiele, Doujin-Sprachwerke und ASMR-Inhalte. Sie können die Produkte sofort herunterladen und genießen",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-31"
    },
    {
        "id": "4d7ea5c3",
        "name": "Free Anime Websites Without Ads to Watch Anime Onl",
        "url": "https://www.videoproc.com/resource/free-anime-sites-no-ads.htm",
        "category": "Anime Streaming",
        "description": "Find some free anime websites without ads to let you watch anime online with no interruption. Immerse yourself solely in the story and characters.",
        "description_es": "Encuentre algunos sitios web de anime gratuitos y sin anuncios que le permitan ver anime en línea sin interrupciones. Sumérgete únicamente en la historia y los personajes.",
        "description_jp": "中断することなくオンラインでアニメを視聴できるように、広告なしの無料アニメ ウェブサイトをいくつか見つけてください。ストーリーとキャラクターだけに没頭してください。",
        "description_fr": "Trouvez des sites Web d'anime gratuits et sans publicité pour vous permettre de regarder des anime en ligne sans interruption. Plongez-vous uniquement dans l'histoire et les personnages.",
        "description_pt": "Encontre alguns sites de anime gratuitos sem anúncios para permitir que você assista anime online sem interrupção. Mergulhe apenas na história e nos personagens.",
        "description_hi": "बिना किसी रुकावट के ऑनलाइन एनीमे देखने की सुविधा देने के लिए बिना विज्ञापन वाली कुछ मुफ्त एनीमे वेबसाइटें खोजें। अपने आप को पूरी तरह से कहानी और पात्रों में डुबो दें।",
        "description_ar": "ابحث عن بعض مواقع الأنمي المجانية بدون إعلانات لتتيح لك مشاهدة الأنمي عبر الإنترنت دون انقطاع. انغمس فقط في القصة والشخصيات.",
        "description_de": "Finden Sie einige kostenlose Anime-Websites ohne Werbung, damit Sie Anime ohne Unterbrechung online ansehen können. Tauchen Sie ausschließlich in die Geschichte und die Charaktere ein.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-31"
    },
    {
        "id": "25388f97",
        "name": "english translation | Page: 1 | Gelbooru - Anime A",
        "url": "https://gelbooru.com/index.php?page=post&s=list&tags=english_translation",
        "category": "Anime Streaming",
        "description": "Browse millions of anime, manga, videos, english translation hentai, and video game themed images on Gelbooru. Discover art with detailed tags. Contai",
        "description_es": "Explora millones de anime, manga, vídeos, hentai traducidos al inglés e imágenes con temas de videojuegos en Gelbooru. Descubre arte con etiquetas detalladas. Contai",
        "description_jp": "Gelbooru で何百万ものアニメ、マンガ、ビデオ、英語翻訳エロアニメ、ビデオ ゲームをテーマにした画像を閲覧してください。詳細なタグでアートを発見します。コンタイ",
        "description_fr": "Parcourez des millions d’images sur le thème des anime, des mangas, des vidéos, des traductions en anglais hentai et des jeux vidéo sur Gelbooru. Découvrez l'art avec des balises détaillées. Contai",
        "description_pt": "Navegue por milhões de animes, mangás, vídeos, tradução para o inglês hentai e imagens temáticas de videogame no Gelbooru. Descubra arte com tags detalhadas. Contai",
        "description_hi": "गेलबोरू पर लाखों एनीमे, मंगा, वीडियो, अंग्रेजी अनुवाद हेनतई और वीडियो गेम थीम वाली छवियां ब्राउज़ करें। विस्तृत टैग के साथ कला की खोज करें। कोंताई",
        "description_ar": "تصفح ملايين الصور المتحركة والمانجا ومقاطع الفيديو والهنتاي المترجمة باللغة الإنجليزية والصور التي تحمل سمات ألعاب الفيديو على Gelbooru. اكتشف الفن باستخدام العلامات التفصيلية. كونتاي",
        "description_de": "Durchsuchen Sie Millionen von Bildern zum Thema Anime, Manga, Videos, Hentai in englischer Sprache und Videospiele auf Gelbooru. Entdecken Sie Kunst mit detaillierten Tags. Inhalt:",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-31"
    },
    {
        "id": "b8e4cc4a",
        "name": "Adult Visual Novels, Hentai Story Sex Games | Porn",
        "url": "https://porngameshub.com/visual-novels",
        "category": "Hentai Streaming",
        "description": "Discover Adult Visual Novels, Hentai Story Sex Games | PornGamesHub - A high quality portal for your favorite content.",
        "description_es": "Descubre novelas visuales para adultos y juegos sexuales de historias hentai | PornGamesHub: un portal de alta calidad para tu contenido favorito.",
        "description_jp": "アダルト ビジュアル ノベル、ヘンタイ ストーリー セックス ゲームを発見 | PornGamesHub - お気に入りのコンテンツのための高品質ポータル。",
        "description_fr": "Découvrez des romans visuels pour adultes, des jeux sexuels Hentai Story | PornGamesHub - Un portail de haute qualité pour votre contenu préféré.",
        "description_pt": "Descubra romances visuais para adultos, jogos sexuais de histórias Hentai | PornGamesHub – Um portal de alta qualidade para o seu conteúdo favorito.",
        "description_hi": "वयस्क दृश्य उपन्यास, हेनतई कहानी सेक्स गेम्स खोजें | पोर्नगेम्सहब - आपकी पसंदीदा सामग्री के लिए एक उच्च गुणवत्ता वाला पोर्टल।",
        "description_ar": "اكتشف الروايات المرئية للبالغين، وألعاب الجنس قصة هنتاي | PornGamesHub - بوابة عالية الجودة للمحتوى المفضل لديك.",
        "description_de": "Entdecken Sie visuelle Romane für Erwachsene und Sexspiele mit Hentai-Geschichten | PornGamesHub – Ein hochwertiges Portal für Ihre Lieblingsinhalte.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-31"
    },
    {
        "id": "97564be4",
        "name": "Your favourite Hentai game | F95zone | Comics | Mo",
        "url": "https://f95zone.to/threads/your-favourite-hentai-game.146189",
        "category": "Hentai Streaming",
        "description": "If you can only pick one game which game would you pick as your favourite hentai and or porn game of all time? I guess I'll pick mine thus far it's Ma",
        "description_es": "Si solo pudieras elegir un juego, ¿cuál elegirías como tu juego hentai o porno favorito de todos los tiempos? Supongo que elegiré el mío hasta ahora, es mamá.",
        "description_jp": "ゲームを 1 つだけ選ぶことができるとしたら、これまでで一番好きなエロゲームやポルノ ゲームとしてどのゲームを選びますか?今のところ私のものを選ぶと思います、それはママです",
        "description_fr": "Si vous ne pouviez choisir qu'un seul jeu, quel jeu choisiriez-vous comme jeu hentai et/ou porno préféré de tous les temps ? Je suppose que je vais choisir le mien jusqu'à présent, c'est maman",
        "description_pt": "Se você pudesse escolher apenas um jogo, qual jogo você escolheria como seu jogo hentai e/ou pornô favorito de todos os tempos? Acho que vou escolher o meu até agora, é a mãe",
        "description_hi": "यदि आप केवल एक गेम चुन सकते हैं तो आप अपने सर्वकालिक पसंदीदा हेनतई या पोर्न गेम के रूप में कौन सा गेम चुनेंगे? मुझे लगता है कि मैं अपना चुन लूंगा, अब तक यह मां है",
        "description_ar": "إذا كان بإمكانك اختيار لعبة واحدة فقط، فما هي اللعبة التي ستختارها لتكون لعبة الهنتاي و/أو الإباحية المفضلة لديك على الإطلاق؟ أعتقد أنني سأختار ما يناسبني حتى الآن، فهو أمي",
        "description_de": "Wenn Sie nur ein Spiel auswählen könnten, welches Spiel würden Sie als Ihr liebstes Hentai- und/oder Pornospiel aller Zeiten auswählen? Ich schätze, ich werde meines auswählen, bis jetzt ist es Ma",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-31"
    },
    {
        "id": "d9ddcce9",
        "name": "Over 45 Minutes of Visual Novel English Fan Transl",
        "url": "https://www.youtube.com/watch?v=XOQ5mChroJw",
        "category": "Anime Streaming",
        "description": "Enjoy the videos and music you love, upload original content, and share it all with friends, family, and the world on YouTube.",
        "description_es": "Disfruta de los vídeos y la música que te encantan, sube contenido original y compártelo todo con amigos, familiares y el mundo en YouTube.",
        "description_jp": "YouTube でお気に入りの動画や音楽を楽しみ、オリジナルのコンテンツをアップロードして友だちや家族、世界中の人たちと共有しましょう。",
        "description_fr": "Profitez des vidéos et de la musique que vous aimez, téléchargez du contenu original et partagez-le avec vos amis, votre famille et le monde entier sur YouTube.",
        "description_pt": "Aproveite os vídeos e músicas que você adora, carregue conteúdo original e compartilhe tudo com amigos, familiares e com o mundo no YouTube.",
        "description_hi": "अपने पसंदीदा वीडियो और संगीत का आनंद लें, मूल सामग्री अपलोड करें और इसे YouTube पर दोस्तों, परिवार और दुनिया के साथ साझा करें।",
        "description_ar": "استمتع بمقاطع الفيديو والموسيقى التي تحبها، وقم بتحميل المحتوى الأصلي، وشاركه كله مع الأصدقاء والعائلة والعالم على YouTube.",
        "description_de": "Genießen Sie die Videos und Musik, die Sie lieben, laden Sie Originalinhalte hoch und teilen Sie alles mit Freunden, Familie und der Welt auf YouTube.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-31"
    },
    {
        "id": "9ca50b11",
        "name": "Nsfw Games Android: Most popular Android Games",
        "url": "https://gameforge.com/en-US/gmag/nsfw-games-android",
        "category": "Games & Visual Novels",
        "description": "All Nsfw games for Android by popularity. Find the best Android Nsfw games in our list.",
        "description_es": "Todos los juegos Nsfw para Android por popularidad. Encuentra los mejores juegos de Android Nsfw en nuestra lista.",
        "description_jp": "Android 用のすべての NSFW ゲームを人気順に並べています。私たちのリストから最高の Android Nsfw ゲームを見つけてください。",
        "description_fr": "Tous les jeux Nsfw pour Android par popularité. Trouvez les meilleurs jeux Android Nsfw dans notre liste.",
        "description_pt": "Todos os jogos Nsfw para Android por popularidade. Encontre os melhores jogos Nsfw para Android em nossa lista.",
        "description_hi": "लोकप्रियता के आधार पर Android के लिए सभी Nsfw गेम। हमारी सूची में सर्वश्रेष्ठ एंड्रॉइड एनएसएफडब्ल्यू गेम ढूंढें।",
        "description_ar": "جميع ألعاب Nsfw للأندرويد حسب الشهرة. ابحث عن أفضل ألعاب Android Nsfw في قائمتنا.",
        "description_de": "Alle Nsfw-Spiele für Android nach Beliebtheit. Finden Sie die besten Android Nsfw-Spiele in unserer Liste.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-31"
    },
    {
        "id": "81ceef2b",
        "name": "6 EVEN MORE Free Legal Anime Streaming Sites! - Wa",
        "url": "https://www.youtube.com/watch?v=0YDxH0sRQg4&vl=en",
        "category": "Anime Streaming",
        "description": "Enjoy the videos and music you love, upload original content, and share it all with friends, family, and the world on YouTube.",
        "description_es": "Disfruta de los vídeos y la música que te encantan, sube contenido original y compártelo todo con amigos, familiares y el mundo en YouTube.",
        "description_jp": "YouTube でお気に入りの動画や音楽を楽しみ、オリジナルのコンテンツをアップロードして友だちや家族、世界中の人たちと共有しましょう。",
        "description_fr": "Profitez des vidéos et de la musique que vous aimez, téléchargez du contenu original et partagez-le avec vos amis, votre famille et le monde entier sur YouTube.",
        "description_pt": "Aproveite os vídeos e músicas que você adora, carregue conteúdo original e compartilhe tudo com amigos, familiares e com o mundo no YouTube.",
        "description_hi": "अपने पसंदीदा वीडियो और संगीत का आनंद लें, मूल सामग्री अपलोड करें और इसे YouTube पर दोस्तों, परिवार और दुनिया के साथ साझा करें।",
        "description_ar": "استمتع بمقاطع الفيديو والموسيقى التي تحبها، وقم بتحميل المحتوى الأصلي، وشاركه كله مع الأصدقاء والعائلة والعالم على YouTube.",
        "description_de": "Genießen Sie die Videos und Musik, die Sie lieben, laden Sie Originalinhalte hoch und teilen Sie alles mit Freunden, Familie und der Welt auf YouTube.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-31"
    },
    {
        "id": "a7744f20",
        "name": "Free Anime Websites Without Ads - Complete Streami",
        "url": "https://repairit.wondershare.com/video-repair/anime-websites-without-ads.html",
        "category": "Anime Streaming",
        "description": "Discover the best anime websites without ads in 2026. Our comprehensive guide covers free anime sites without ads, premium platforms, and safe streami",
        "description_es": "Descubra los mejores sitios web de anime sin anuncios en 2026. Nuestra guía completa cubre sitios de anime gratuitos sin anuncios, plataformas premium y transmisiones seguras.",
        "description_jp": "2026 年に広告なしで最高のアニメ ウェブサイトを見つけてください。当社の包括的なガイドでは、広告なしの無料アニメ サイト、プレミアム プラットフォーム、安全なストリーミングをカバーしています。",
        "description_fr": "Découvrez les meilleurs sites Web d'anime sans publicité en 2026. Notre guide complet couvre les sites d'anime gratuits sans publicité, les plateformes premium et le streaming sécurisé.",
        "description_pt": "Descubra os melhores sites de anime sem anúncios em 2026. Nosso guia completo cobre sites de anime gratuitos sem anúncios, plataformas premium e streams segurosi",
        "description_hi": "2026 में विज्ञापनों के बिना सर्वश्रेष्ठ एनीमे वेबसाइटों की खोज करें। हमारा व्यापक गाइड विज्ञापनों के बिना मुफ्त एनीमे साइटों, प्रीमियम प्लेटफार्मों और सुरक्षित स्ट्रीमिंग को कवर करता है।",
        "description_ar": "اكتشف أفضل مواقع الأنمي بدون إعلانات لعام 2026. يغطي دليلنا الشامل مواقع الأنمي المجانية بدون إعلانات ومنصات متميزة وبث آمن.",
        "description_de": "Entdecken Sie die besten Anime-Websites ohne Werbung im Jahr 2026. Unser umfassender Leitfaden deckt kostenlose Anime-Websites ohne Werbung, Premium-Plattformen und sichere Streams ab",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-05-31"
    },
    {
        "id": "79a9d87d",
        "name": "red-tails/list-of-boorus: List of booru imageboard",
        "url": "https://github.com/red-tails/list-of-boorus",
        "category": "Image Boards (Boorus)",
        "description": "List of booru imageboards. Contribute to red-tails/list-of-boorus development by creating an account on GitHub.",
        "description_es": "Lista de tableros de imágenes booru. Contribuya al desarrollo de colas rojas/lista de boorus creando una cuenta en GitHub.",
        "description_jp": "ブール画像掲示板の一覧。 Contribute to red-tails/list-of-boorus development by creating an account on GitHub.",
        "description_fr": "Liste des tableaux d'images Booru. Contribuez au développement de red-tails/list-of-boorus en créant un compte sur GitHub.",
        "description_pt": "Lista de painéis de imagens booru. Contribua para o desenvolvimento de red-tails/list-of-boorus criando uma conta no GitHub.",
        "description_hi": "बूरू इमेजबोर्ड की सूची. GitHub पर एक खाता बनाकर रेड-टेल्स/लिस्ट-ऑफ-बूरस विकास में योगदान करें।",
        "description_ar": "قائمة لوحات الصور booru. ساهم في تطوير red-tails/list-of-boorus عن طريق إنشاء حساب على GitHub.",
        "description_de": "Liste der Booru-Imageboards. Tragen Sie zur Red-Tails/List-of-Boorus-Entwicklung bei, indem Sie ein Konto auf GitHub erstellen.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-06-01"
    },
    {
        "id": "5937362b",
        "name": "Hentai Directory - Categorized as \"Serialized\"",
        "url": "https://hentai2read.com/hentai-list/category/serialized/c/last-added",
        "category": "Hentai Streaming",
        "description": "Hentai List - Categorized as \"Serialized\" - Sorted By Newest - Page 1 Free on Hentai2Read.com",
        "description_es": "Lista Hentai - Categorizada como \"Serializada\" - Ordenada por más reciente - Página 1 Gratis en Hentai2Read.com",
        "description_jp": "変態リスト - 「連載中」に分類 - 新しい順に並べ替え - ページ 1 Free on Hentai2Read.com",
        "description_fr": "Liste Hentai - Classé comme \"Sérialisé\" - Trié par le plus récent - Page 1 Gratuit sur Hentai2Read.com",
        "description_pt": "Lista Hentai - Categorizada como \"Serializada\" - Classificada pelos mais recentes - Página 1 Grátis em Hentai2Read.com",
        "description_hi": "हेनतई सूची - \"क्रमबद्ध\" के रूप में वर्गीकृत - नवीनतम के अनुसार क्रमबद्ध - पृष्ठ 1 Hentai2Read.com पर निःशुल्क",
        "description_ar": "قائمة الهنتاي - مصنفة على أنها \"متسلسلة\" - مرتبة حسب الأحدث - الصفحة 1 مجانًا على Hentai2Read.com",
        "description_de": "Hentai-Liste – Kategorisiert als „Serialisiert“ – Sortiert nach Neuestem – Seite 1 Kostenlos auf Hentai2Read.com",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-06-01"
    },
    {
        "id": "a96df4ef",
        "name": "Top Rated Hentai Manga and Doujinshi Sites - The P",
        "url": "https://theporndude.vip/hentai-manga-sites",
        "category": "Hentai Streaming",
        "description": "Who says manga is for kids? These hentai and doujinshi sites are strictly for adults, with nasty comic book sex and rule 34 parodies featuring your…",
        "description_es": "¿Quién dice que el manga es para niños? Estos sitios hentai y doujinshi son estrictamente para adultos, con sexo desagradable en cómics y parodias de la regla 34 en las que aparecen...",
        "description_jp": "マンガは子供向けだなんて誰が言ったの?これらのエロアニメおよび同人誌サイトは完全に成人向けであり、厄介な漫画本のセックスとルール 34 のパロディがフィーチャーされています…",
        "description_fr": "Qui a dit que les mangas étaient pour les enfants ? Ces sites hentai et doujinshi sont strictement réservés aux adultes, avec du sexe de bande dessinée méchant et des parodies de la règle 34 mettant en vedette votre…",
        "description_pt": "Quem disse que mangá é para crianças? Esses sites hentai e doujinshi são estritamente para adultos, com sexo desagradável em quadrinhos e paródias da regra 34 apresentando seu…",
        "description_hi": "कौन कहता है मंगा बच्चों के लिए है? ये हेनतई और दुजिंशी साइटें पूरी तरह से वयस्कों के लिए हैं, जिनमें घटिया कॉमिक बुक सेक्स और नियम 34 पैरोडी शामिल हैं...",
        "description_ar": "من قال أن المانجا مخصصة للأطفال؟ مواقع الهنتاي والدوجينشي هذه مخصصة للبالغين فقط، وتحتوي على قصص جنسية سيئة في الكتب المصورة ومحاكاة ساخرة للقاعدة 34 تظهر شخصيتك...",
        "description_de": "Wer sagt, dass Mangas für Kinder sind? Diese Hentai- und Doujinshi-Seiten sind ausschließlich für Erwachsene, mit fiesem Comic-Sex und Regel-34-Parodien mit deinen…",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-06-01"
    },
    {
        "id": "b13828dc",
        "name": "Directory",
        "url": "http://www.hentairider.com/directory",
        "category": "Hentai Streaming",
        "description": "12 Directory hentai images - Directory hentai images and pics",
        "description_es": "12 Directorio de imágenes hentai - Directorio de imágenes y fotografías hentai",
        "description_jp": "12 ディレクトリエロ画像 - ディレクトリエロ画像と写真",
        "description_fr": "12 Répertoire images hentai - Répertoire images et photos hentai",
        "description_pt": "12 Diretório de imagens hentai - Diretório de imagens e fotos hentai",
        "description_hi": "12 निर्देशिका हेनतई छवियाँ - निर्देशिका हेनतई छवियाँ और तस्वीरें",
        "description_ar": "12 دليل صور هنتاي - دليل صور وصور هنتاي",
        "description_de": "12 Verzeichnis-Hentai-Bilder – Verzeichnis-Hentai-Bilder und Bilder",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-06-01"
    },
    {
        "id": "73e9ceae",
        "name": "Categorized as \"Netorare\" - Sorted By Last Updated",
        "url": "https://hentai2read.com/hentai-list/category/netorare/w/last-updated",
        "category": "Hentai Streaming",
        "description": "Hentai List - Categorized as \"Netorare\" - Sorted By Last Updated - Page 1 Free on Hentai2Read.com",
        "description_es": "Lista Hentai - Categorizada como \"Netorare\" - Ordenada por última actualización - Página 1 Gratis en Hentai2Read.com",
        "description_jp": "変態リスト - 「ネトラレ」として分類 - 最終更新順で並べ替え - ページ 1 Free on Hentai2Read.com",
        "description_fr": "Liste Hentai - Classé comme \"Netorare\" - Trié par dernière mise à jour - Page 1 Gratuit sur Hentai2Read.com",
        "description_pt": "Lista Hentai - Categorizada como \"Netorare\" - Classificada pela última atualização - Página 1 Grátis em Hentai2Read.com",
        "description_hi": "हेनतई सूची - \"नेटोरारे\" के रूप में वर्गीकृत - अंतिम अद्यतन के अनुसार क्रमबद्ध - पृष्ठ 1 Hentai2Read.com पर निःशुल्क",
        "description_ar": "قائمة الهنتاي - مصنفة كـ \"Netorare\" - مرتبة حسب آخر تحديث - الصفحة 1 مجانًا على Hentai2Read.com",
        "description_de": "Hentai-Liste – kategorisiert als „Netorare“ – sortiert nach letzter Aktualisierung – Seite 1 kostenlos auf Hentai2Read.com",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-06-01"
    },
    {
        "id": "e760b847",
        "name": "Which are the popular NSFW manga sites? - WebNovel",
        "url": "https://m.webnovel.com/ask/q4031547597197753",
        "category": "Manga & Doujinshi",
        "description": "Some of the well-known NSFW manga sites include Mangadex and Fakku, but please note that accessing such content may be against the law or violate site",
        "description_es": "Algunos de los sitios de manga NSFW más conocidos incluyen Mangadex y Fakku, pero tenga en cuenta que acceder a dicho contenido puede ser ilegal o violar el sitio.",
        "description_jp": "有名な NSFW マンガ サイトには、mangadex や Fakku などがありますが、そのようなコンテンツにアクセスすると法律に違反したり、サイトに違反する可能性があることに注意してください。",
        "description_fr": "Certains des sites de mangas NSFW bien connus incluent Mangadex et Fakku, mais veuillez noter que l'accès à ce contenu peut être contraire à la loi ou violer le site.",
        "description_pt": "Alguns dos sites de mangá NSFW mais conhecidos incluem Mangadex e Fakku, mas observe que o acesso a esse conteúdo pode ser contra a lei ou violar o site.",
        "description_hi": "कुछ प्रसिद्ध एनएसएफडब्ल्यू मंगा साइटों में मैंगाडेक्स और फक्कू शामिल हैं, लेकिन कृपया ध्यान दें कि ऐसी सामग्री तक पहुंच कानून के खिलाफ हो सकती है या साइट का उल्लंघन हो सकती है।",
        "description_ar": "بعض مواقع مانغا NSFW المعروفة تشمل Mangadex وFakku، ولكن يرجى ملاحظة أن الوصول إلى هذا المحتوى قد يكون مخالفًا للقانون أو ينتهك الموقع",
        "description_de": "Zu den bekannten NSFW-Manga-Websites gehören Mangadex und Fakku. Bitte beachten Sie jedoch, dass der Zugriff auf solche Inhalte möglicherweise gegen das Gesetz verstößt oder gegen die Website verstößt",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-06-01"
    },
    {
        "id": "ffcb27cb",
        "name": "Best anime shows: 32 fantastic anime series and wh",
        "url": "https://www.techradar.com/best/best-anime",
        "category": "Anime Streaming",
        "description": "The best anime shows to watch on Netflix, Hulu, Crunchyroll, and more in 2025.",
        "description_es": "Los mejores programas de anime para ver en Netflix, Hulu, Crunchyroll y más en 2025.",
        "description_jp": "2025 年に Netflix、Hulu、Crunchyroll などで視聴するのに最適なアニメ番組。",
        "description_fr": "Les meilleures émissions d’anime à regarder sur Netflix, Hulu, Crunchyroll et plus en 2025.",
        "description_pt": "Os melhores programas de anime para assistir no Netflix, Hulu, Crunchyroll e muito mais em 2025.",
        "description_hi": "2025 में नेटफ्लिक्स, हुलु, क्रंच्यरोल और अन्य पर देखने के लिए सर्वश्रेष्ठ एनीमे शो।",
        "description_ar": "أفضل عروض الأنمي التي يمكنك مشاهدتها على Netflix وHulu وCrunchyroll والمزيد في عام 2025.",
        "description_de": "Die besten Anime-Shows, die Sie 2025 auf Netflix, Hulu, Crunchyroll und mehr sehen können.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-06-01"
    },
    {
        "id": "2144bd34",
        "name": "Eroge / Hentai games - MobyGames",
        "url": "https://www.mobygames.com/group/2508/eroge-hentai-games",
        "category": "Hentai Streaming",
        "description": "This group may include any game with significant amounts of nudity and/or explicit sex scenes that was either made in Japan or clearly imitates the Ja",
        "description_es": "Este grupo puede incluir cualquier juego con cantidades significativas de desnudez y/o escenas de sexo explícitas que se hayan hecho en Japón o que imiten claramente el juego japonés.",
        "description_jp": "このグループには、大量のヌードや露骨なセックス シーンを含む、日本で作成されたゲーム、または明らかに日本を模倣したゲームが含まれる場合があります。",
        "description_fr": "Ce groupe peut inclure tout jeu comportant une quantité importante de nudité et/ou des scènes de sexe explicites qui a été réalisé au Japon ou qui imite clairement le Japon.",
        "description_pt": "Este grupo pode incluir qualquer jogo com quantidades significativas de cenas de nudez e/ou sexo explícito que tenha sido feito no Japão ou que imite claramente o jogo Ja.",
        "description_hi": "इस समूह में पर्याप्त मात्रा में नग्नता और/या स्पष्ट यौन दृश्यों वाला कोई भी गेम शामिल हो सकता है जो या तो जापान में बनाया गया हो या स्पष्ट रूप से जापान की नकल करता हो।",
        "description_ar": "قد تتضمن هذه المجموعة أي لعبة تحتوي على قدر كبير من العري و/أو مشاهد جنسية صريحة تم إنتاجها في اليابان أو تحاكي بشكل واضح لعبة Ja.",
        "description_de": "Zu dieser Gruppe kann jedes Spiel mit einem erheblichen Anteil an Nacktheit und/oder expliziten Sexszenen gehören, das entweder in Japan hergestellt wurde oder das Japan eindeutig imitiert",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-06-01"
    },
    {
        "id": "5bd4c301",
        "name": "Most Popular Anime Shows and Movies - Crunchyroll",
        "url": "https://www.crunchyroll.com/videos/popular",
        "category": "Anime Streaming",
        "description": "Discover Most Popular Anime Shows and Movies - Crunchyroll - A high quality portal for your favorite content.",
        "description_es": "Descubra las películas y programas de anime más populares: Crunchyroll: un portal de alta calidad para su contenido favorito.",
        "description_jp": "最も人気のあるアニメ番組や映画を発見 - Crunchyroll - お気に入りのコンテンツの高品質ポータル。",
        "description_fr": "Découvrez les émissions et films d'animation les plus populaires - Crunchyroll - Un portail de haute qualité pour votre contenu préféré.",
        "description_pt": "Descubra os programas e filmes de anime mais populares - Crunchyroll - Um portal de alta qualidade para seu conteúdo favorito.",
        "description_hi": "सबसे लोकप्रिय एनीमे शो और फिल्में खोजें - क्रंच्यरोल - आपकी पसंदीदा सामग्री के लिए एक उच्च गुणवत्ता वाला पोर्टल।",
        "description_ar": "اكتشف عروض وأفلام الأنمي الأكثر شهرة - Crunchyroll - بوابة عالية الجودة للمحتوى المفضل لديك.",
        "description_de": "Entdecken Sie die beliebtesten Anime-Shows und Filme – Crunchyroll – Ein hochwertiges Portal für Ihre Lieblingsinhalte.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-06-01"
    },
    {
        "id": "55643d9c",
        "name": "Eroge Games PC: Most popular PC Games - Gameforge.",
        "url": "https://gameforge.com/en-US/gmag/eroge-games-pc",
        "category": "Games & Visual Novels",
        "description": "All Eroge games for PC by popularity. Find the best PC Eroge games in our list.",
        "description_es": "Todos los juegos de Eroge para PC por popularidad. Encuentra los mejores juegos de PC Eroge en nuestra lista.",
        "description_jp": "PC用エロゲを人気順にまとめました。リストから最高の PC エロゲ ゲームを見つけてください。",
        "description_fr": "Tous les jeux Eroge pour PC par popularité. Trouvez les meilleurs jeux PC Eroge dans notre liste.",
        "description_pt": "Todos os jogos Eroge para PC por popularidade. Encontre os melhores jogos para PC Eroge em nossa lista.",
        "description_hi": "लोकप्रियता के आधार पर पीसी के लिए सभी इरोज गेम। हमारी सूची में सर्वश्रेष्ठ पीसी इरोज गेम ढूंढें।",
        "description_ar": "جميع ألعاب Eroge للكمبيوتر الشخصي حسب الشعبية. ابحث عن أفضل ألعاب الكمبيوتر الشخصي Eroge في قائمتنا.",
        "description_de": "Alle Eroge-Spiele für PC nach Beliebtheit. Finden Sie die besten PC-Eroge-Spiele in unserer Liste.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-06-01"
    },
    {
        "id": "e9311e56",
        "name": "Which are the best raw manga sites? - WebNovel",
        "url": "https://m.webnovel.com/ask/q4031552498896921",
        "category": "Manga & Doujinshi",
        "description": "Some popular raw manga sites include MangaSee and MangaRaw. But be cautious as some of these might not be legal.",
        "description_es": "Algunos sitios populares de manga en bruto incluyen MangaSee y MangaRaw. Pero tenga cuidado, ya que algunos de ellos podrían no ser legales.",
        "description_jp": "人気のある Raw マンガ サイトには、mangaSee や MangaRaw などがあります。ただし、中には違法なものもあるので注意してください。",
        "description_fr": "Certains sites de mangas bruts populaires incluent MangaSee et MangaRaw. Mais soyez prudent car certains d’entre eux pourraient ne pas être légaux.",
        "description_pt": "Alguns sites populares de mangá bruto incluem MangaSee e MangaRaw. Mas tenha cuidado, pois alguns deles podem não ser legais.",
        "description_hi": "कुछ लोकप्रिय कच्ची मंगा साइटों में MangaSee और MangaRaw शामिल हैं। लेकिन सावधान रहें क्योंकि इनमें से कुछ कानूनी नहीं हो सकते हैं।",
        "description_ar": "تتضمن بعض مواقع المانجا الخام الشهيرة MangaSee و MangaRaw. لكن كن حذرًا لأن بعضًا منها قد لا يكون قانونيًا.",
        "description_de": "Zu den beliebten Roh-Manga-Seiten gehören MangaSee und MangaRaw. Seien Sie jedoch vorsichtig, da einige davon möglicherweise nicht legal sind.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-06-01"
    },
    {
        "id": "6a2ca73b",
        "name": "group:soft forum - E-Hentai Galleries",
        "url": "https://e-hentai.org/tag/group:soft+forum",
        "category": "Hentai Streaming",
        "description": "Showing search results for group:soft forum - just some of the over a million absolutely free hentai galleries available.",
        "description_es": "Mostrando resultados de búsqueda para grupo:foro suave: solo algunas de las más de un millón de galerías hentai disponibles absolutamente gratuitas.",
        "description_jp": "group:soft フォーラム の検索結果を表示しています - 利用可能な 100 万を超える完全に無料のエロアニメ ギャラリーのほんの一部です。",
        "description_fr": "Affichage des résultats de recherche pour group:soft forum - quelques-unes des plus d'un million de galeries hentai absolument gratuites disponibles.",
        "description_pt": "Mostrando resultados de pesquisa para group:soft forum - apenas algumas das mais de um milhão de galerias hentai totalmente gratuitas disponíveis.",
        "description_hi": "समूह के लिए खोज परिणाम दिखा रहा है: सॉफ्ट फ़ोरम - दस लाख से अधिक बिल्कुल मुफ्त उपलब्ध हेनतई गैलरी में से कुछ।",
        "description_ar": "عرض نتائج البحث عن المجموعة: المنتدى الناعم - فقط بعض من أكثر من مليون معرض هنتاي مجاني تمامًا متاح.",
        "description_de": "Suchergebnisse für „group:soft forum“ werden angezeigt – nur einige der über eine Million verfügbaren, absolut kostenlosen Hentai-Galerien.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-06-01"
    },
    {
        "id": "17cdff8a",
        "name": "HentaiFox: Massive Directory for Hentai Manga",
        "url": "https://pornsites.xxx/reviews/hentaifox",
        "category": "Hentai Streaming",
        "description": "Stream free porn featuring thick Instagram baddies at BaddieHub. Watch exclusive amateur sex tapes, massive booties, and extreme BBC action.",
        "description_es": "Transmite porno gratis con gordos malos de Instagram en BaddieHub. Mira cintas de sexo amateur exclusivas, traseros enormes y acción extrema de la BBC.",
        "description_jp": "BaddieHub で、インスタグラムの悪役をフィーチャーした無料のポルノをストリーミングしましょう。独占的なアマチュア セックス テープ、巨大なブーツ、過激な BBC アクションをご覧ください。",
        "description_fr": "Diffusez du porno gratuit mettant en vedette d'épais méchants d'Instagram sur BaddieHub. Regardez des cassettes de sexe amateur exclusives, des bottillons massifs et une action extrême de la BBC.",
        "description_pt": "Transmita pornografia gratuita com bandidos grossos do Instagram no BaddieHub. Assista a fitas de sexo amador exclusivas, bundas enormes e ação extrema da BBC.",
        "description_hi": "BaddieHub पर मोटी इंस्टाग्राम खलनायकों की विशेषता वाली मुफ्त पोर्न स्ट्रीम करें। विशेष शौकिया सेक्स टेप, विशाल बूटियाँ और चरम बीबीसी कार्रवाई देखें।",
        "description_ar": "قم ببث إباحية مجانية تضم أشرارًا كثيفين على Instagram في BaddieHub. شاهد الأشرطة الجنسية الحصرية للهواة، والجوارب الضخمة، وأحداث بي بي سي المتطرفة.",
        "description_de": "Streamen Sie kostenlose Pornos mit dicken Instagram-Bösewichten bei BaddieHub. Sehen Sie sich exklusive Amateur-Sextapes, riesige Hintern und extreme BBC-Action an.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-06-01"
    },
    {
        "id": "726ce38b",
        "name": "HentaiGeek: Unveiling the Best Hentai Sites Review",
        "url": "https://hentaigeek.com",
        "category": "Hentai Streaming",
        "description": "Dive into the world of Hentai with HentaiGeek. Discover top-notch hentai sites, enjoy uncensored hentai content, and join our growing community of hen",
        "description_es": "Sumérgete en el mundo del Hentai con HentaiGeek. Descubra sitios hentai de primer nivel, disfrute de contenido hentai sin censura y únase a nuestra creciente comunidad de gallinas.",
        "description_jp": "HentaiGeek で変態の世界に飛び込みましょう。一流のエロアニメ サイトを発見し、無修正のエロアニメ コンテンツを楽しみ、成長を続けるヘンタイのコミュニティに参加しましょう",
        "description_fr": "Plongez dans le monde du Hentai avec HentaiGeek. Découvrez des sites hentai de premier ordre, profitez du contenu hentai non censuré et rejoignez notre communauté grandissante de poules.",
        "description_pt": "Mergulhe no mundo Hentai com HentaiGeek. Descubra sites hentai de primeira linha, desfrute de conteúdo hentai sem censura e junte-se à nossa crescente comunidade de hentai",
        "description_hi": "HentaiGeek के साथ Hentai की दुनिया में उतरें। शीर्ष पायदान की हेनतई साइटों की खोज करें, बिना सेंसर वाली हेनतई सामग्री का आनंद लें, और मुर्गी के हमारे बढ़ते समुदाय में शामिल हों",
        "description_ar": "انغمس في عالم الهنتاي مع HentaiGeek. اكتشف أفضل مواقع الهنتاي، واستمتع بمحتوى الهنتاي غير الخاضع للرقابة، وانضم إلى مجتمعنا المتنامي من الهنتاي",
        "description_de": "Tauchen Sie mit HentaiGeek in die Welt von Hentai ein. Entdecken Sie erstklassige Hentai-Seiten, genießen Sie unzensierte Hentai-Inhalte und treten Sie unserer wachsenden Hentai-Community bei",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-06-01"
    },
    {
        "id": "646236f6",
        "name": "Categorized as \"Incest\" - Sorted By Name (A-Z)",
        "url": "https://hentai2read.com/hentai-list/category/incest/all/name-az/70",
        "category": "Hentai Streaming",
        "description": "Hentai List - Categorized as \"Incest\" - Sorted By Name (A-Z) - Page 70 Free on Hentai2Read.com",
        "description_es": "Lista Hentai - Categorizada como \"Incesto\" - Ordenada por nombre (A-Z) - Página 70 Gratis en Hentai2Read.com",
        "description_jp": "ヘンタイ リスト - 「近親相姦」として分類 - 名前 (A-Z) で並べ替え - ページ 70 Free on Hentai2Read.com",
        "description_fr": "Liste Hentai - Catégorisée comme \"Inceste\" - Triée par nom (A-Z) - Page 70 Gratuit sur Hentai2Read.com",
        "description_pt": "Lista Hentai - Categorizada como \"Incesto\" - Classificada por nome (AZ) - Página 70 Grátis em Hentai2Read.com",
        "description_hi": "हेनतई सूची - \"अनाचार\" के रूप में वर्गीकृत - नाम के अनुसार क्रमबद्ध (ए-जेड) - पृष्ठ 70 Hentai2Read.com पर निःशुल्क",
        "description_ar": "قائمة الهنتاي - مصنفة على أنها \"زنا المحارم\" - مرتبة حسب الاسم (من الألف إلى الياء) - صفحة 70 مجانًا على Hentai2Read.com",
        "description_de": "Hentai-Liste – Kategorisiert als „Inzest“ – Sortiert nach Namen (A-Z) – Seite 70 Kostenlos auf Hentai2Read.com",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-06-01"
    },
    {
        "id": "01a12429",
        "name": "Hentai Directory and Search Engine",
        "url": "http://www.hentaidirectory.org/directory",
        "category": "Hentai Streaming",
        "description": "Hentai Directory and Search Engine",
        "description_es": "Directorio Hentai y motor de búsqueda",
        "description_jp": "変態ディレクトリと検索エンジン",
        "description_fr": "Annuaire Hentai et moteur de recherche",
        "description_pt": "Diretório Hentai e mecanismo de pesquisa",
        "description_hi": "हेनतई निर्देशिका और खोज इंजन",
        "description_ar": "دليل هنتاي ومحرك البحث",
        "description_de": "Hentai-Verzeichnis und Suchmaschine",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-06-01"
    },
    {
        "id": "7e02fef1",
        "name": "List of hentai image boards around the net - Downl",
        "url": "https://erogegames.com/forums/topic/4401-list-of-hentai-image-boards-around-the-net",
        "category": "Hentai Streaming",
        "description": "Hiya guys, this is my first post ever on this site (though I've been lurking around for some time now). like the title said, I would like to compile a",
        "description_es": "Hola chicos, esta es mi primera publicación en este sitio (aunque he estado merodeando por algún tiempo). como dice el título, me gustaría compilar un",
        "description_jp": "こんにちは皆さん、これがこのサイトへの私の最初の投稿です（とはいえ、私はしばらくの間潜んでいました）。タイトルの通り、まとめたいと思います",
        "description_fr": "Salut les gars, c'est mon tout premier message sur ce site (même si je traîne depuis un certain temps maintenant). comme le titre le dit, j'aimerais compiler un",
        "description_pt": "Olá pessoal, este é meu primeiro post neste site (embora já esteja por aí há algum tempo). como o título diz, gostaria de compilar um",
        "description_hi": "नमस्ते दोस्तों, यह इस साइट पर मेरी अब तक की पहली पोस्ट है (हालाँकि मैं पिछले कुछ समय से इधर-उधर छिप रहा हूँ)। जैसा कि शीर्षक में कहा गया है, मैं एक संकलन करना चाहूँगा",
        "description_ar": "مرحبًا يا شباب، هذه هي مشاركتي الأولى على هذا الموقع (على الرغم من أنني كنت أتربص بها منذ بعض الوقت). كما قال العنوان، وأود أن تجميع",
        "description_de": "Hallo Leute, das ist mein erster Beitrag überhaupt auf dieser Seite (obwohl ich schon seit einiger Zeit hier herumlungere). Wie der Titel schon sagt, möchte ich eine kompilieren",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-06-01"
    },
    {
        "id": "d5755fe0",
        "name": "Top games for Android tagged Eroge - itch.io",
        "url": "https://itch.io/games/platform-android/tag-eroge",
        "category": "Games & Visual Novels",
        "description": "Find games for Android tagged Eroge like Special Harem Class (NSFW 18+), The BloodRiver Saga: Retransmitter, City of Secrets, Echoes of Allure, Dawn o",
        "description_es": "Encuentra juegos para Android etiquetados Eroge como Special Harem Class (NSFW 18+), The BloodRiver Saga: Retransmitter, City of Secrets, Echoes of Allure, Dawn o",
        "description_jp": "特別ハーレムクラス (NSFW 18+)、The BloodRiver Saga: Retransmitter、City of Secrets、Echoes of Allure、Dawn o などのエロゲのタグが付いた Android 用ゲームを検索します",
        "description_fr": "Trouvez des jeux pour Android étiquetés Eroge comme Special Harem Class (NSFW 18+), The BloodRiver Saga: Retransmitter, City of Secrets, Echoes of Allure, Dawn o",
        "description_pt": "Encontre jogos para Android marcados com Eroge como Special Harem Class (NSFW 18+), The BloodRiver Saga: Retransmitter, City of Secrets, Echoes of Allure, Dawn o",
        "description_hi": "एंड्रॉइड के लिए इरोज टैग वाले गेम ढूंढें जैसे स्पेशल हरम क्लास (एनएसएफडब्ल्यू 18+), द ब्लडरिवर सागा: रिट्रांसमीटर, सिटी ऑफ सीक्रेट्स, इकोज ऑफ एल्योर, डॉन ओ",
        "description_ar": "ابحث عن ألعاب Android الموسومة بـ Eroge مثل Special Harem Class (NSFW 18+)، The BloodRiver Saga: Retransmitter، City of Secrets، Echoes of Allure، Dawn o",
        "description_de": "Finden Sie Spiele für Android mit dem Tag Eroge wie Special Harem Class (NSFW 18+), The BloodRiver Saga: Retransmitter, City of Secrets, Echoes of Allure, Dawn o.ä",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-06-01"
    },
    {
        "id": "dbb1f432",
        "name": "Doujinshi Manga | Anime-Planet",
        "url": "https://www.anime-planet.com/manga/tags/doujinshi",
        "category": "Anime Streaming",
        "description": "Complete list of doujinshi manga. Doujin are a popular type of independently produced and distributed magazine, generally made in small print runs and",
        "description_es": "Lista completa de manga doujinshi. Los doujin son un tipo popular de revista producida y distribuida de forma independiente, generalmente realizada en tiradas pequeñas y",
        "description_jp": "同人誌漫画の全リスト。同人誌は、独立して制作および配布される人気のあるタイプの雑誌であり、通常は少部数で作られ、",
        "description_fr": "Liste complète des mangas doujinshi. Les Doujin sont un type populaire de magazine produit et distribué de manière indépendante, généralement réalisé en petits tirages et",
        "description_pt": "Lista completa de mangás doujinshi. Doujin é um tipo popular de revista produzida e distribuída de forma independente, geralmente feita em pequenas tiragens e",
        "description_hi": "डौजिंशी मंगा की पूरी सूची। डौजिन एक लोकप्रिय प्रकार की स्वतंत्र रूप से निर्मित और वितरित पत्रिका है, जो आम तौर पर छोटे प्रिंट रन में बनाई जाती है",
        "description_ar": "القائمة الكاملة لمانجا دوجينشي. Doujin هي نوع شائع من المجلات التي يتم إنتاجها وتوزيعها بشكل مستقل، ويتم إنتاجها عمومًا بكميات صغيرة من المطبوعات",
        "description_de": "Vollständige Liste der Doujinshi-Manga. Doujin sind eine beliebte Art unabhängig produzierter und vertriebener Zeitschriften, die im Allgemeinen in kleinen Auflagen hergestellt werden",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-06-01"
    },
    {
        "id": "5f99784b",
        "name": "Home - Hentairead.io - Read Free Hentai Manga - He",
        "url": "https://hentairead.io",
        "category": "Hentai Streaming",
        "description": "Hentairead.io - Read Free Hentai Manga - Hentai Manhwa - Manhua Online",
        "description_es": "Hentairead.io - Leer manga Hentai gratis - Hentai Manhwa - Manhua Online",
        "description_jp": "Hentairead.io - 無料のエロ漫画を読む - ヘンタイ漫画 - Manhua Online",
        "description_fr": "Hentairead.io - Lire des mangas Hentai gratuits - Hentai Manhwa - Manhua en ligne",
        "description_pt": "Hentairead.io - Leia Manga Hentai Grátis - Hentai Manhwa - Manhua Online",
        "description_hi": "Hentairead.io - निःशुल्क हेनतई मंगा पढ़ें - हेनतई मनहवा - मनहुआ ऑनलाइन",
        "description_ar": "Hentairead.io - قراءة مانغا هنتاي المجانية - هنتاي مانهوا - مانهوا على الإنترنت",
        "description_de": "Hentairead.io – Kostenlose Hentai-Manga lesen – Hentai Manhwa – Manhua Online",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-06-01"
    },
    {
        "id": "ebb49f68",
        "name": "Want to Get Into Anime? These 6 Streaming Services",
        "url": "https://www.esquire.com/entertainment/tv/a70436324/best-anime-streaming-services",
        "category": "Anime Streaming",
        "description": "The anime streaming wars are on. Here's what each platform offers for you. ",
        "description_es": "Las guerras de transmisión de anime están en marcha. Esto es lo que cada plataforma ofrece para usted.",
        "description_jp": "アニメストリーミング戦争が始まっています。各プラットフォームが提供するものは次のとおりです。",
        "description_fr": "La guerre du streaming d’anime est lancée. Voici ce que chaque plateforme vous propose.",
        "description_pt": "As guerras de streaming de anime começaram. Aqui está o que cada plataforma oferece para você.",
        "description_hi": "एनीमे स्ट्रीमिंग युद्ध जारी हैं। यहां बताया गया है कि प्रत्येक प्लेटफ़ॉर्म आपके लिए क्या पेशकश करता है।",
        "description_ar": "حروب الأنمي المتدفقة مستمرة. إليك ما تقدمه لك كل منصة.",
        "description_de": "Die Anime-Streaming-Kriege sind eröffnet. Hier erfahren Sie, was jede Plattform für Sie bietet.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-06-01"
    },
    {
        "id": "e9449830",
        "name": "Overbooru | The Largest Booru Directory",
        "url": "https://booru.neocities.org",
        "category": "Image Boards (Boorus)",
        "description": "Discover Overbooru | The Largest Booru Directory - A high quality portal for your favorite content.",
        "description_es": "Descubre Overbooru | El directorio Booru más grande: un portal de alta calidad para su contenido favorito.",
        "description_jp": "オーバーブールを発見 |最大の Booru ディレクトリ - お気に入りのコンテンツの高品質ポータル。",
        "description_fr": "Découvrez Overbooru | Le plus grand répertoire Booru - Un portail de haute qualité pour votre contenu préféré.",
        "description_pt": "Descubra Overbooru | O Maior Diretório Booru - Um portal de alta qualidade para seu conteúdo favorito.",
        "description_hi": "ओवरबुरु की खोज करें | सबसे बड़ी बूरू निर्देशिका - आपकी पसंदीदा सामग्री के लिए एक उच्च गुणवत्ता वाला पोर्टल।",
        "description_ar": "اكتشف أوفربورو | أكبر دليل Booru - بوابة عالية الجودة للمحتوى المفضل لديك.",
        "description_de": "Entdecken Sie Overbooru | Das größte Booru-Verzeichnis – Ein hochwertiges Portal für Ihre Lieblingsinhalte.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-06-01"
    },
    {
        "id": "0afd08ec",
        "name": "Hentai games - Collection by Gamingbrandon - Itch.",
        "url": "https://itch.io/c/3812034/hentai-games",
        "category": "Hentai Streaming",
        "description": "Discover Hentai games - Collection by Gamingbrandon - Itch.io - A high quality portal for your favorite content.",
        "description_es": "Descubre juegos Hentai - Colección de Gamingbrandon - Itch.io - Un portal de alta calidad para tu contenido favorito.",
        "description_jp": "変態ゲームを発見 - Gamingbrandon によるコレクション - Itch.io - お気に入りのコンテンツのための高品質ポータル。",
        "description_fr": "Découvrez les jeux Hentai - Collection par Gamingbrandon - Itch.io - Un portail de haute qualité pour votre contenu préféré.",
        "description_pt": "Descubra jogos Hentai - Coleção de Gamingbrandon - Itch.io - Um portal de alta qualidade para seu conteúdo favorito.",
        "description_hi": "हेनतई गेम्स खोजें - गेमिंगब्रांडन द्वारा संग्रह - Itch.io - आपकी पसंदीदा सामग्री के लिए एक उच्च गुणवत्ता वाला पोर्टल।",
        "description_ar": "اكتشف ألعاب هنتاي - مجموعة من Gamingbrandon - Itch.io - بوابة عالية الجودة للمحتوى المفضل لديك.",
        "description_de": "Entdecken Sie Hentai-Spiele – Sammlung von Gamingbrandon – Itch.io – Ein hochwertiges Portal für Ihre Lieblingsinhalte.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-06-01"
    },
    {
        "id": "f4f80692",
        "name": "Hentai Stream & 44+ Hentai Streaming Sites Like He",
        "url": "https://theporndude.com/351/hentaistream",
        "category": "Anime Streaming",
        "description": "HentaiStream.com is home to a huge and growing collection of XXX hentai videos, with nearly three thousand full episodes from over a thousand differen",
        "description_es": "HentaiStream.com es el hogar de una enorme y creciente colección de videos hentai XXX, con casi tres mil episodios completos de más de mil diferentes.",
        "description_jp": "HentaiStream.com には、1,000 を超えるさまざまな作品から約 3,000 の完全なエピソードが含まれる、XXX エロアニメ ビデオの巨大かつ成長を続けるコレクションの本拠地です。",
        "description_fr": "HentaiStream.com héberge une collection énorme et croissante de vidéos hentai XXX, avec près de trois mille épisodes complets parmi plus d'un millier d'épisodes différents.",
        "description_pt": "HentaiStream.com é o lar de uma enorme e crescente coleção de vídeos hentai XXX, com quase três mil episódios completos de mais de mil diferentes.",
        "description_hi": "HentaiStream.com XXX हेनतई वीडियो के एक विशाल और बढ़ते संग्रह का घर है, जिसमें एक हजार से अधिक विभिन्न प्रकार के लगभग तीन हजार पूर्ण एपिसोड हैं",
        "description_ar": "يعد موقع HentaiStream.com موطنًا لمجموعة ضخمة ومتنامية من مقاطع فيديو هنتاي XXX، مع ما يقرب من ثلاثة آلاف حلقة كاملة من أكثر من ألف حلقة مختلفة.",
        "description_de": "HentaiStream.com beherbergt eine riesige und wachsende Sammlung von XXX-Hentai-Videos mit fast dreitausend vollständigen Episoden aus über tausend verschiedenen",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-06-01"
    },
    {
        "id": "ef32e11e",
        "name": "Where To Find Obscure Raw Manga You've Never Heard",
        "url": "https://www.youtube.com/watch?v=GZ-nqPBXScU",
        "category": "Anime Streaming",
        "description": "Enjoy the videos and music you love, upload original content, and share it all with friends, family, and the world on YouTube.",
        "description_es": "Disfruta de los vídeos y la música que te encantan, sube contenido original y compártelo todo con amigos, familiares y el mundo en YouTube.",
        "description_jp": "YouTube でお気に入りの動画や音楽を楽しみ、オリジナルのコンテンツをアップロードして友だちや家族、世界中の人たちと共有しましょう。",
        "description_fr": "Profitez des vidéos et de la musique que vous aimez, téléchargez du contenu original et partagez-le avec vos amis, votre famille et le monde entier sur YouTube.",
        "description_pt": "Aproveite os vídeos e as músicas que você adora, carregue conteúdo original e compartilhe tudo com amigos, familiares e o mundo no YouTube.",
        "description_hi": "अपने पसंदीदा वीडियो और संगीत का आनंद लें, मूल सामग्री अपलोड करें और इसे YouTube पर दोस्तों, परिवार और दुनिया के साथ साझा करें।",
        "description_ar": "استمتع بمقاطع الفيديو والموسيقى التي تحبها، وقم بتحميل المحتوى الأصلي، وشاركه كله مع الأصدقاء والعائلة والعالم على YouTube.",
        "description_de": "Genießen Sie die Videos und Musik, die Sie lieben, laden Sie Originalinhalte hoch und teilen Sie alles mit Freunden, Familie und der Welt auf YouTube.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-06-01"
    },
    {
        "id": "7860810f",
        "name": "Top 9 BEST Places to Stream Anime (FREE and Paid) ",
        "url": "https://www.youtube.com/watch?v=gNJxhEzfVXQ",
        "category": "Anime Streaming",
        "description": "Enjoy the videos and music you love, upload original content, and share it all with friends, family, and the world on YouTube.",
        "description_es": "Disfruta de los vídeos y la música que te encantan, sube contenido original y compártelo todo con amigos, familiares y el mundo en YouTube.",
        "description_jp": "YouTube でお気に入りの動画や音楽を楽しみ、オリジナルのコンテンツをアップロードして友だちや家族、世界中の人たちと共有しましょう。",
        "description_fr": "Profitez des vidéos et de la musique que vous aimez, téléchargez du contenu original et partagez-le avec vos amis, votre famille et le monde entier sur YouTube.",
        "description_pt": "Aproveite os vídeos e as músicas que você adora, carregue conteúdo original e compartilhe tudo com amigos, familiares e o mundo no YouTube.",
        "description_hi": "अपने पसंदीदा वीडियो और संगीत का आनंद लें, मूल सामग्री अपलोड करें और इसे YouTube पर दोस्तों, परिवार और दुनिया के साथ साझा करें।",
        "description_ar": "استمتع بمقاطع الفيديو والموسيقى التي تحبها، وقم بتحميل المحتوى الأصلي، وشاركه كله مع الأصدقاء والعائلة والعالم على YouTube.",
        "description_de": "Genießen Sie die Videos und Musik, die Sie lieben, laden Sie Originalinhalte hoch und teilen Sie alles mit Freunden, Familie und der Welt auf YouTube.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-06-01"
    },
    {
        "id": "52c4a8a1",
        "name": "Which site do u use for raw scan? - FanVerse",
        "url": "https://www.fanverse.org/threads/which-site-do-u-use-for-raw-scan.1344939",
        "category": "Manga & Doujinshi",
        "description": "I was using mangareader before but its like a month It doesnt load, any other?",
        "description_es": "Estaba usando mangareader antes pero lleva como un mes. No carga, ¿algún otro?",
        "description_jp": "以前はmangareaderを使用していましたが、1か月ほど読み込まれません。他に何かありますか？",
        "description_fr": "J'utilisais mangareader avant mais cela fait environ un mois. Il ne se charge pas, aucun autre ?",
        "description_pt": "Eu estava usando o mangareader antes, mas já faz um mês que não carrega, algum outro?",
        "description_hi": "मैं पहले मैंगारीडर का उपयोग कर रहा था लेकिन यह एक महीने की तरह लोड नहीं होता है, कोई अन्य?",
        "description_ar": "كنت أستخدم برنامج mangareader من قبل ولكن لم يتم تحميله لمدة شهر، هل هناك أي برنامج آخر؟",
        "description_de": "Ich habe vorher Mangareader verwendet, aber es dauert ungefähr einen Monat. Es wird nicht geladen, irgendein anderes?",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-06-01"
    },
    {
        "id": "4c691016",
        "name": "HENTAI STREAMING SITES - HentaiGeek",
        "url": "https://hentaigeek.com/category/hentai-streaming-sites",
        "category": "Anime Streaming",
        "description": "At HentaiGeek.com, we bring the world of hentai streaming to your fingertips. Our platform is a haven for enthusiasts of this unique form of adult ent",
        "description_es": "En HentaiGeek.com, ponemos el mundo del streaming hentai a tu alcance. Nuestra plataforma es un paraíso para los entusiastas de esta forma única de atención para adultos.",
        "description_jp": "HentaiGeek.com では、変態ストリーミングの世界をすぐにお届けします。私たちのプラットフォームは、このユニークな形式の成人向けコンテンツの愛好家にとって天国です。",
        "description_fr": "Chez HentaiGeek.com, nous mettons le monde du streaming hentai à portée de main. Notre plateforme est un paradis pour les passionnés de cette forme unique d'ent adulte.",
        "description_pt": "No HentaiGeek.com, trazemos o mundo do streaming hentai ao seu alcance. Nossa plataforma é um paraíso para os entusiastas desta forma única de entretenimento adulto",
        "description_hi": "HentaiGeek.com पर, हम हेनतई स्ट्रीमिंग की दुनिया को आपकी उंगलियों पर लाते हैं। हमारा मंच वयस्क मनोरंजन के इस अनूठे रूप के उत्साही लोगों के लिए स्वर्ग है",
        "description_ar": "في HentaiGeek.com، نجعل عالم بث الهنتاي في متناول يدك. منصتنا هي ملاذ لعشاق هذا الشكل الفريد من نوعه للبالغين",
        "description_de": "Bei HentaiGeek.com bringen wir Ihnen die Welt des Hentai-Streamings näher. Unsere Plattform ist ein Paradies für Liebhaber dieser einzigartigen Form der Erwachsenenentfaltung",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-06-01"
    },
    {
        "id": "912f2b43",
        "name": "HentaiFox & 24+ Hentai Manga Sites Like Hentaifox.",
        "url": "https://theporndude.com/1952/hentaifox",
        "category": "Hentai Streaming",
        "description": "HentaiFox.com! Hentai Fox fans do not fuck around when it comes to their preferred type of porn. They often combine the obsessive enthusiasm of a Trek",
        "description_es": "HentaiFox.com! Los fanáticos de Hentai Fox no se andan con rodeos cuando se trata de su tipo de porno preferido. A menudo combinan el entusiasmo obsesivo de un Trek",
        "description_jp": "変態フォックス.com!変態フォックスのファンは、自分の好みのタイプのポルノに関しては何も考えません。多くの場合、トレッキングの熱狂的な情熱が組み合わされます。",
        "description_fr": "HentaiFox.com ! Les fans de Hentai Fox ne plaisantent pas lorsqu'il s'agit de leur type de porno préféré. Ils combinent souvent l'enthousiasme obsessionnel d'un Trek",
        "description_pt": "HentaiFox. com! Os fãs do Hentai Fox não brincam quando se trata de seu tipo preferido de pornografia. Eles muitas vezes combinam o entusiasmo obsessivo de um Trek",
        "description_hi": "HentaiFox.com! हेनतई फॉक्स के प्रशंसक जब अपने पसंदीदा प्रकार के पोर्न की बात करते हैं तो वे घबराते नहीं हैं। वे अक्सर ट्रेक के जुनूनी उत्साह को जोड़ते हैं",
        "description_ar": "هنتاي فوكس! لا يعبث معجبو Hentai Fox عندما يتعلق الأمر بنوع الإباحية المفضل لديهم. غالبًا ما يجمعون بين الحماس المهووس للرحلة",
        "description_de": "HentaiFox.com! Hentai-Fox-Fans streiten nicht herum, wenn es um ihre bevorzugte Art von Porno geht. Sie vereinen oft die obsessive Begeisterung eines Treks",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-06-01"
    },
    {
        "id": "a3e0e99b",
        "name": "I Tested TOP Anime Streaming Site in 2026 — Here's",
        "url": "https://www.youtube.com/watch?v=CJTE6t2SWfE",
        "category": "Anime Streaming",
        "description": "Enjoy the videos and music you love, upload original content, and share it all with friends, family, and the world on YouTube.",
        "description_es": "Disfruta de los vídeos y la música que te encantan, sube contenido original y compártelo todo con amigos, familiares y el mundo en YouTube.",
        "description_jp": "YouTube でお気に入りの動画や音楽を楽しみ、オリジナルのコンテンツをアップロードして友だちや家族、世界中の人たちと共有しましょう。",
        "description_fr": "Profitez des vidéos et de la musique que vous aimez, téléchargez du contenu original et partagez-le avec vos amis, votre famille et le monde entier sur YouTube.",
        "description_pt": "Aproveite os vídeos e as músicas que você adora, carregue conteúdo original e compartilhe tudo com amigos, familiares e o mundo no YouTube.",
        "description_hi": "अपने पसंदीदा वीडियो और संगीत का आनंद लें, मूल सामग्री अपलोड करें और इसे YouTube पर दोस्तों, परिवार और दुनिया के साथ साझा करें।",
        "description_ar": "استمتع بمقاطع الفيديو والموسيقى التي تحبها، وقم بتحميل المحتوى الأصلي، وشاركه كله مع الأصدقاء والعائلة والعالم على YouTube.",
        "description_de": "Genießen Sie die Videos und Musik, die Sie lieben, laden Sie Originalinhalte hoch und teilen Sie alles mit Freunden, Familie und der Welt auf YouTube.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-06-01"
    },
    {
        "id": "58610cab",
        "name": "Eroge Adult Games | FAP-Nation",
        "url": "https://fap-nation.com/tag/eroge",
        "category": "Hentai Streaming",
        "description": "Eroge Adult Games on FAP-Nation. Browse our vast collection of Sex Games and Adult Visual Novels. Download for free the best Eroge Adult Games for PC ",
        "description_es": "Juegos para adultos Eroge en FAP-Nation. Explora nuestra amplia colección de juegos sexuales y novelas visuales para adultos. Descarga gratis los mejores juegos de Eroge para adultos para PC",
        "description_jp": "FAP-Nation のエロゲ アダルト ゲーム。セックス ゲームとアダルト ビジュアル ノベルの膨大なコレクションをご覧ください。 PC 用の最高のエロゲ アダルト ゲームを無料でダウンロード",
        "description_fr": "Jeux pour adultes Eroge sur FAP-Nation. Parcourez notre vaste collection de jeux sexuels et de romans visuels pour adultes. Téléchargez gratuitement les meilleurs jeux pour adultes Eroge pour PC",
        "description_pt": "Jogos para adultos Eroge na FAP-Nation. Navegue pela nossa vasta coleção de jogos sexuais e romances visuais para adultos. Baixe gratuitamente os melhores Jogos Adultos Eroge para PC",
        "description_hi": "एफएपी-नेशन पर इरोज एडल्ट गेम्स। सेक्स गेम्स और वयस्क दृश्य उपन्यासों के हमारे विशाल संग्रह को ब्राउज़ करें। पीसी के लिए सर्वश्रेष्ठ इरोज एडल्ट गेम्स मुफ्त में डाउनलोड करें",
        "description_ar": "ألعاب Eroge للبالغين على FAP-Nation. تصفح مجموعتنا الواسعة من الألعاب الجنسية والروايات المرئية للبالغين. قم بتنزيل أفضل ألعاب Eroge Adult للكمبيوتر الشخصي مجانًا",
        "description_de": "Eroge-Spiele für Erwachsene auf FAP-Nation. Stöbern Sie in unserer umfangreichen Sammlung von Sexspielen und Bildromanen für Erwachsene. Laden Sie kostenlos die besten Eroge-Erwachsenenspiele für den PC herunter",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-06-01"
    },
    {
        "id": "1f9697c6",
        "name": "raw Archives - HentaiWorld",
        "url": "https://hentaiworld.tv/hentai-videos/tag/raw",
        "category": "Hentai Streaming",
        "description": "- HentaiWorld. Find your favorite hentai videos. Watch the best hentai videos on HentaiWorld.",
        "description_es": "- HentaiMundo. Encuentra tus videos hentai favoritos. Mira los mejores videos hentai en HentaiWorld.",
        "description_jp": "- ヘンタイワールド。お気に入りのエロ動画を見つけてください。 HentaiWorld で最高のエロ動画をご覧ください。",
        "description_fr": "- HentaiWorld. Trouvez vos vidéos hentai préférées. Regardez les meilleures vidéos hentai sur HentaiWorld.",
        "description_pt": "- HentaiWorld. Encontre seus vídeos hentai favoritos. Assista aos melhores vídeos hentai no HentaiWorld.",
        "description_hi": "- हेनतईवर्ल्ड। अपने पसंदीदा हेनतई वीडियो ढूंढें। HentaiWorld पर सर्वश्रेष्ठ हेनतई वीडियो देखें।",
        "description_ar": "- عالم هنتاي. ابحث عن مقاطع فيديو الهنتاي المفضلة لديك. شاهد أفضل مقاطع فيديو الهنتاي على HentaiWorld.",
        "description_de": "- HentaiWorld. Finden Sie Ihre Lieblings-Hentai-Videos. Sehen Sie sich die besten Hentai-Videos auf HentaiWorld an.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-06-01"
    },
    {
        "id": "63d8d5ba",
        "name": "Raw Hentai Video Stream | Ohentai.org",
        "url": "https://ohentai.org/tagsearch.php?tag=Raw&sort=most_viewed",
        "category": "Anime Streaming",
        "description": "Watch and download Raw hentai video streams in 720p/1080p HD quality. This site is mobile compatible and works with iPhone/iPad/Android devices.",
        "description_es": "Mire y descargue transmisiones de video hentai sin procesar en calidad HD de 720p/1080p. Este sitio es compatible con dispositivos móviles y funciona con dispositivos iPhone/iPad/Android.",
        "description_jp": "Raw エロアニメ ビデオ ストリームを 720p/1080p HD 品質で視聴してダウンロードします。このサイトはモバイル対応で、iPhone/iPad/Android デバイスで動作します。",
        "description_fr": "Regardez et téléchargez des flux vidéo bruts hentai en qualité HD 720p/1080p. Ce site est compatible mobile et fonctionne avec les appareils iPhone/iPad/Android.",
        "description_pt": "Assista e baixe streams de vídeo Raw hentai em qualidade HD 720p / 1080p. Este site é compatível com dispositivos móveis e funciona com dispositivos iPhone/iPad/Android.",
        "description_hi": "720p/1080p HD गुणवत्ता में रॉ हेनतई वीडियो स्ट्रीम देखें और डाउनलोड करें। यह साइट मोबाइल संगत है और iPhone/iPad/Android उपकरणों के साथ काम करती है।",
        "description_ar": "شاهد وقم بتنزيل مقاطع فيديو Raw hentai بجودة HD 720p/1080p. هذا الموقع متوافق مع الأجهزة المحمولة ويعمل مع أجهزة iPhone/iPad/Android.",
        "description_de": "Sehen Sie sich Raw-Hentai-Videostreams in 720p/1080p HD-Qualität an und laden Sie sie herunter. Diese Website ist mobilkompatibel und funktioniert mit iPhone/iPad/Android-Geräten.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-06-01"
    },
    {
        "id": "2359ec50",
        "name": "The best hentai you have read - Forums - MyAnimeLi",
        "url": "https://myanimelist.net/forum?topicid=1829891",
        "category": "Anime Streaming",
        "description": "Read the topic about The best hentai you have read on MyAnimeList, and join in the discussion on the largest online anime and manga database in the wo",
        "description_es": "Lea el tema sobre El mejor hentai que haya leído en MyAnimeList y únase a la discusión en la base de datos de anime y manga en línea más grande del mundo.",
        "description_jp": "MyAnimeList で読んだ最高のエロアニメに関するトピックを読み、世界最大のオンライン アニメとマンガのデータベースでのディスカッションに参加してください。",
        "description_fr": "Lisez le sujet sur Le meilleur hentai que vous avez lu sur MyAnimeList et rejoignez la discussion sur la plus grande base de données d'anime et de manga en ligne au monde.",
        "description_pt": "Leia o tópico sobre O melhor hentai que você leu no MyAnimeList e participe da discussão no maior banco de dados online de anime e mangá do mundo.",
        "description_hi": "MyAnimeList पर आपके द्वारा पढ़ी गई सबसे अच्छी हेनतई के बारे में विषय पढ़ें, और दुनिया के सबसे बड़े ऑनलाइन एनीमे और मंगा डेटाबेस पर चर्चा में शामिल हों",
        "description_ar": "اقرأ موضوع أفضل هنتاي قرأته على MyAnimeList، وانضم إلى المناقشة حول أكبر قاعدة بيانات للأنمي والمانغا على الإنترنت في العالم.",
        "description_de": "Lesen Sie das Thema „Das beste Hentai, das Sie je gelesen haben“ auf MyAnimeList und beteiligen Sie sich an der Diskussion über die größte Online-Anime- und Manga-Datenbank der Welt",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-06-01"
    },
    {
        "id": "a1bf60b5",
        "name": "Hentai and Manga | Page 3 | AllPornComix Forum",
        "url": "https://forum.allporncomix.com/forums/hentai-and-manga.14/page-3",
        "category": "Hentai Streaming",
        "description": "Japanese hentai manga. Usually read from right to left.",
        "description_es": "Manga hentai japonés. Generalmente se lee de derecha a izquierda.",
        "description_jp": "日本のエロ漫画。通常は右から左に読みます。",
        "description_fr": "Manga hentai japonais. Se lit généralement de droite à gauche.",
        "description_pt": "Mangá hentai japonês. Geralmente lido da direita para a esquerda.",
        "description_hi": "जापानी हेनतई मंगा. आमतौर पर दाएँ से बाएँ पढ़ा जाता है।",
        "description_ar": "مانغا هنتاي اليابانية. عادة ما تقرأ من اليمين إلى اليسار.",
        "description_de": "Japanischer Hentai-Manga. Normalerweise wird von rechts nach links gelesen.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-06-01"
    },
    {
        "id": "5c0b8bf3",
        "name": "raw (日本語) - Hitomi.la",
        "url": "https://hitomi.la/tag/raw-japanese.html",
        "category": "Communities & Forums",
        "description": "Hitomi.la is the best source of free hentai doujinshi, manga, artist CG, and anime.",
        "description_es": "Hitomi.la es la mejor fuente de hentai doujinshi, manga, artista CG y anime gratuitos.",
        "description_jp": "hitomi.la は無料のエロ同人誌、マンガ、アーティスト CG、アニメの最高のソースです。",
        "description_fr": "Hitomi.la est la meilleure source de doujinshi hentai gratuits, de mangas, d'artistes CG et d'anime.",
        "description_pt": "Hitomi.la é a melhor fonte de hentai doujinshi, mangá, artista CG e anime gratuitos.",
        "description_hi": "हिटोमी.ला मुफ्त हेनतई डौजिंशी, मंगा, कलाकार सीजी और एनीमे का सबसे अच्छा स्रोत है।",
        "description_ar": "Hitomi.la هو أفضل مصدر للهنتاي doujinshi والمانجا والفنان CG والأنيمي مجانًا.",
        "description_de": "Hitomi.la ist die beste Quelle für kostenloses Hentai-Doujinshi, Manga, Künstler-CG und Anime.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-06-01"
    },
    {
        "id": "0682708f",
        "name": "Hentai Pulse » The Best Hentai Streaming Site",
        "url": "https://hentaipulse.com",
        "category": "Anime Streaming",
        "description": "The Best Hentai Streaming Site",
        "description_es": "El mejor sitio de transmisión de hentai",
        "description_jp": "最高のエロアニメストリーミングサイト",
        "description_fr": "Le meilleur site de streaming hentai",
        "description_pt": "O melhor site de streaming Hentai",
        "description_hi": "सर्वश्रेष्ठ हेनतई स्ट्रीमिंग साइट",
        "description_ar": "أفضل موقع لبث الهنتاي",
        "description_de": "Die beste Hentai-Streaming-Site",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-06-01"
    },
    {
        "id": "aede3106",
        "name": "The Best Anime Streaming Services in 2026",
        "url": "https://www.ign.com/articles/best-anime-streaming-sites-and-apps",
        "category": "Anime Streaming",
        "description": "Here are the best places to stream anime right now.",
        "description_es": "Estos son los mejores lugares para transmitir anime en este momento.",
        "description_jp": "現在アニメをストリーミングするのに最適な場所は次のとおりです。",
        "description_fr": "Voici les meilleurs endroits pour diffuser des anime en ce moment.",
        "description_pt": "Aqui estão os melhores lugares para transmitir anime agora.",
        "description_hi": "अभी एनीमे स्ट्रीम करने के लिए सबसे अच्छी जगहें यहां दी गई हैं।",
        "description_ar": "إليك أفضل الأماكن لبث الأنمي الآن.",
        "description_de": "Hier sind die derzeit besten Orte zum Streamen von Anime.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-06-01"
    },
    {
        "id": "59a0fa36",
        "name": "Eroge Master List - Downloads - ErogeGames",
        "url": "https://erogegames.com/forums/topic/259-eroge-master-list",
        "category": "Games & Visual Novels",
        "description": "NOTE: This list is out-dated. There is an up-to-date list at the top of the page for English and Japanese releases. Every download on this page is in ",
        "description_es": "NOTA: Esta lista está desactualizada. Hay una lista actualizada en la parte superior de la página para las versiones en inglés y japonés. Cada descarga en esta página está en",
        "description_jp": "注: このリストは古いものです。ページの上部に英語と日本語のリリースの最新リストがあります。このページのすべてのダウンロードは",
        "description_fr": "REMARQUE : Cette liste est obsolète. Il y a une liste à jour en haut de la page pour les versions anglaises et japonaises. Chaque téléchargement sur cette page est en",
        "description_pt": "NOTA: Esta lista está desatualizada. Há uma lista atualizada no topo da página para lançamentos em inglês e japonês. Cada download nesta página está em",
        "description_hi": "नोट: यह सूची पुरानी है. अंग्रेजी और जापानी रिलीज़ के लिए पृष्ठ के शीर्ष पर एक अद्यतन सूची है। इस पृष्ठ पर प्रत्येक डाउनलोड मौजूद है",
        "description_ar": "ملاحظة: هذه القائمة قديمة. توجد قائمة محدثة في أعلى الصفحة للإصدارات الإنجليزية واليابانية. كل تنزيل على هذه الصفحة موجود",
        "description_de": "HINWEIS: Diese Liste ist veraltet. Oben auf der Seite finden Sie eine aktuelle Liste der englischen und japanischen Veröffentlichungen. Jeder Download auf dieser Seite ist verfügbar",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-06-01"
    },
    {
        "id": "41f2cc2c",
        "name": "Read Raw's Manga Online At MangaPlaza",
        "url": "https://mangaplaza.com/author/8372",
        "category": "Manga & Doujinshi",
        "description": "Enjoy reading Raw's manga, including \"Teach Me, Dude\",at MangaPlaza, where all manga is officially licensed and quality translated.",
        "description_es": "Disfrute leyendo el manga de Raw, incluido \"Teach Me, Dude\", en MangaPlaza, donde todo el manga tiene licencia oficial y traducción de calidad.",
        "description_jp": "すべてのマンガが正式にライセンスを取得し、高品質に翻訳されているマンガプラザで、「おしえて、おい」を含む、Raw のマンガをお楽しみください。",
        "description_fr": "Profitez de la lecture des mangas de Raw, y compris « Teach Me, Dude », sur MangaPlaza, où tous les mangas sont sous licence officielle et traduits de qualité.",
        "description_pt": "Aproveite a leitura dos mangás do Raw, incluindo \"Teach Me, Dude\", no MangaPlaza, onde todos os mangás são oficialmente licenciados e traduzidos com qualidade.",
        "description_hi": "मंगाप्लाज़ा में \"टीच मी, ड्यूड\" सहित रॉ के मंगा को पढ़ने का आनंद लें, जहां सभी मंगा को आधिकारिक तौर पर लाइसेंस प्राप्त है और गुणवत्तापूर्ण अनुवाद किया गया है।",
        "description_ar": "استمتع بقراءة مانغا Raw، بما في ذلك \"Teach Me, Dude\"، في MangaPlaza، حيث جميع المانغا مرخصة رسميًا ومترجمة بجودة عالية.",
        "description_de": "Viel Spaß beim Lesen der Raw-Manga, einschließlich „Teach Me, Dude“, bei MangaPlaza, wo alle Mangas offiziell lizenziert und hochwertig übersetzt sind.",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-06-01"
    },
    {
        "id": "55436997",
        "name": "Hentai Play - Watch Hentai Online",
        "url": "https://hentaiplay.net",
        "category": "Anime Streaming",
        "description": "Watch Hentai Online for Free, We have thousands of hentai videos available to watch or download. New Hentai, English Subbed and Uncensored. Hentaiplay",
        "description_es": "Mire hentai en línea gratis. Tenemos miles de videos hentai disponibles para mirar o descargar. Nuevo Hentai, subtitulado en inglés y sin censura. hentaiplay",
        "description_jp": "オンラインでエロアニメを無料で視聴しましょう。視聴またはダウンロードできる何千ものエロ動画があります。新しいエロアニメ、英語字幕付き、無修正。ヘンタイプレイ",
        "description_fr": "Regardez Hentai en ligne gratuitement, nous avons des milliers de vidéos hentai disponibles à regarder ou à télécharger. Nouveau Hentai, anglais sous-titré et non censuré. Jeu hentai",
        "description_pt": "Assista Hentai Online gratuitamente. Temos milhares de vídeos hentai disponíveis para assistir ou baixar. Novo Hentai, legendado em inglês e sem censura. Hentaiplay",
        "description_hi": "हेनतई को मुफ्त में ऑनलाइन देखें, हमारे पास देखने या डाउनलोड करने के लिए हजारों हेनतई वीडियो उपलब्ध हैं। न्यू हेंताई, इंग्लिश सबबेड और अनसेंसर्ड। हेनतईप्ले",
        "description_ar": "شاهد هنتاي على الإنترنت مجانًا، لدينا الآلاف من مقاطع فيديو الهنتاي المتاحة للمشاهدة أو التنزيل. هنتاي جديدة، الإنجليزية Subbed وغير خاضعة للرقابة. هنتايبلاي",
        "description_de": "Schauen Sie sich Hentai kostenlos online an. Wir haben Tausende von Hentai-Videos zum Ansehen oder Herunterladen. Neues Hentai, Englisch untertitelt und unzensiert. Hentaiplay",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-06-01"
    },
    {
        "id": "e82c987e",
        "name": "Best hentai image gallery sites? - Forums - MyAnim",
        "url": "https://myanimelist.net/forum?topicid=1394726",
        "category": "Anime Streaming",
        "description": "Read the topic about Best hentai image gallery sites? on MyAnimeList, and join in the discussion on the largest online anime and manga database in the",
        "description_es": "¿Leer el tema sobre los mejores sitios de galerías de imágenes hentai? en MyAnimeList y únete a la discusión en la base de datos de anime y manga en línea más grande del mundo.",
        "description_jp": "最高のエロ画像ギャラリー サイトに関するトピックを読んでください? MyAnimeList で、世界最大のオンライン アニメとマンガのデータベースに関するディスカッションに参加してください。",
        "description_fr": "Lire le sujet sur les meilleurs sites de galeries d'images hentai ? sur MyAnimeList et rejoignez la discussion sur la plus grande base de données d'anime et de manga en ligne du monde.",
        "description_pt": "Leia o tópico sobre os melhores sites de galeria de imagens hentai? no MyAnimeList e participe da discussão no maior banco de dados online de anime e mangá do",
        "description_hi": "सर्वश्रेष्ठ हेनतई छवि गैलरी साइटों के बारे में विषय पढ़ें? MyAnimeList पर, और सबसे बड़े ऑनलाइन एनीमे और मंगा डेटाबेस पर चर्चा में शामिल हों",
        "description_ar": "اقرأ موضوع أفضل مواقع معرض صور الهنتاي؟ على MyAnimeList، وانضم إلى المناقشة حول أكبر قاعدة بيانات للأنمي والمانغا على الإنترنت في العالم",
        "description_de": "Lesen Sie das Thema über die besten Hentai-Bildergalerieseiten? auf MyAnimeList und beteiligen Sie sich an der Diskussion über die größte Online-Anime- und Manga-Datenbank der Welt",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-06-01"
    },
    {
        "id": "dac62249",
        "name": "What's your best hentai manga website ? - Forums -",
        "url": "https://myanimelist.net/forum?topicid=1566745",
        "category": "Anime Streaming",
        "description": "Read the topic about What's your best hentai manga website ? on MyAnimeList, and join in the discussion on the largest online anime and manga database",
        "description_es": "Lea el tema sobre ¿Cuál es su mejor sitio web de manga hentai? en MyAnimeList y únete a la discusión en la base de datos de anime y manga en línea más grande",
        "description_jp": "あなたの最高のエロ漫画サイトは何ですか? に関するトピックを読んでください。 MyAnimeList で、最大のオンライン アニメとマンガのデータベースでのディスカッションに参加してください",
        "description_fr": "Lire le sujet Quel est votre meilleur site de manga hentai ? sur MyAnimeList et rejoignez la discussion sur la plus grande base de données d'anime et de manga en ligne",
        "description_pt": "Leia o tópico sobre Qual é o seu melhor site de mangá hentai? no MyAnimeList e participe da discussão no maior banco de dados online de anime e mangá",
        "description_hi": "आपकी सबसे अच्छी हेनतई मंगा वेबसाइट कौन सी है? के बारे में विषय पढ़ें। MyAnimeList पर, और सबसे बड़े ऑनलाइन एनीमे और मंगा डेटाबेस पर चर्चा में शामिल हों",
        "description_ar": "اقرأ موضوع ما هو أفضل موقع هنتاي مانغا لديك؟ على MyAnimeList، وانضم إلى المناقشة حول أكبر قاعدة بيانات للأنمي والمانغا على الإنترنت",
        "description_de": "Lesen Sie das Thema „Was ist Ihre beste Hentai-Manga-Website?“ auf MyAnimeList und beteiligen Sie sich an der Diskussion über die größte Online-Anime- und Manga-Datenbank",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-06-01"
    },
    {
        "id": "8204ffcc",
        "name": "Parent directory anime. Free Hentai Porn Videos",
        "url": "https://www2.cleanadulthost.com/fetish/hentainiches/a/free-anime-sex/parent-directory-anime.html",
        "category": "Anime Streaming",
        "description": "Anime Porn and Hentai. Parent directory anime, Magical shopping arcade hentai",
        "description_es": "Porno anime y hentai. Directorio de padres anime, Galería comercial mágica hentai",
        "description_jp": "アニメポルノと変態。親ディレクトリ アニメ、マジカル ショッピング アーケード エロアニメ",
        "description_fr": "Anime porno et Hentai. Annuaire parent anime, Galerie marchande magique hentai",
        "description_pt": "Anime pornô e Hentai. Diretório pai anime, galeria comercial mágica hentai",
        "description_hi": "एनीमे पोर्न और हेनतई। मूल निर्देशिका एनीमे, जादुई शॉपिंग आर्केड हेनतई",
        "description_ar": "أنيمي الإباحية والهنتاي. دليل الوالدين أنيمي، ممر التسوق السحري هنتاي",
        "description_de": "Anime-Porno und Hentai. Übergeordnetes Verzeichnis Anime, Magische Einkaufspassage Hentai",
        "tags": [
            "Scouted",
            "Active",
            "New"
        ],
        "rating": 0,
        "addedAt": "2026-06-01"
    }
];

const ALL_CATEGORIES = [...new Set(sitesData.map(site => site.category))].sort();
const ALL_TAGS = [...new Set(sitesData.flatMap(site => site.tags))].sort();
