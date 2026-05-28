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
    }
];

const ALL_CATEGORIES = [...new Set(sitesData.map(site => site.category))].sort();
const ALL_TAGS = [...new Set(sitesData.flatMap(site => site.tags))].sort();
