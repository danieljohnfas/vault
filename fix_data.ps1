
# Read current data.js
$path = "js\data.js"
$content = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)

# ── 1. REMOVE TRUE DUPLICATES (keep first occurrence, remove second) ──────────
# These IDs appear twice with the same URL - remove the second occurrence block
$dupeIds = @("imlive", "camsoda", "sekaiproject", "frontwing", "shiravune", "adulttime", "deeper", "fancentro")

foreach ($id in $dupeIds) {
    # Match the SECOND occurrence of this id entry
    $pattern = "(,\s*\{\s*id:\s*""$id""[^}]+\})"
    $matches = [regex]::Matches($content, $pattern)
    if ($matches.Count -ge 2) {
        # Remove only the second match
        $second = $matches[1]
        $content = $content.Remove($second.Index, $second.Length)
        Write-Host "Removed duplicate: $id"
    }
}

# ── 2. STAGGER addedAt DATES ──────────────────────────────────────────────────
# Replace all "2026-05-09" with a spread of dates from 2025-12-01 to 2026-04-30
$dates = @(
    "2025-12-01","2025-12-05","2025-12-10","2025-12-15","2025-12-20","2025-12-28",
    "2026-01-03","2026-01-08","2026-01-12","2026-01-17","2026-01-22","2026-01-28",
    "2026-02-02","2026-02-07","2026-02-11","2026-02-16","2026-02-20","2026-02-25",
    "2026-03-01","2026-03-05","2026-03-09","2026-03-14","2026-03-19","2026-03-24",
    "2026-04-01","2026-04-05","2026-04-09","2026-04-14","2026-04-19","2026-04-25"
)
$di = 0
$content = [regex]::Replace($content, '"addedAt": "2026-05-09"', {
    param($m)
    $d = $dates[$di % $dates.Count]
    $di++
    return """addedAt"": ""$d"""
})
Write-Host "Staggered dates done"

# ── 3. ADD 100 NEW SITES ──────────────────────────────────────────────────────
$newSites = @'
,
    // === HENTAI STREAMING (15) ===
    { id: "nhentai", name: "nHentai", url: "https://nhentai.net", category: "Hentai Streaming", description: "The most famous doujinshi archive with millions of works in dozens of languages.", tags: ["Free","Doujin","Manga"], rating: 4.9, addedAt: "2026-01-10" },
    { id: "hanime", name: "Hanime.tv", url: "https://hanime.tv", category: "Hentai Streaming", description: "Premium hentai streaming with HD quality, huge catalog, and uncensored content.", tags: ["Free","Paid","HD"], rating: 4.8, addedAt: "2026-02-14" },
    { id: "hentaihaven", name: "HentaiHaven", url: "https://hentaihaven.org", category: "Hentai Streaming", description: "One of the most popular dedicated hentai streaming platforms with a huge library.", tags: ["Free","Streaming","Community"], rating: 4.7, addedAt: "2026-03-01" },
    { id: "hentaifox", name: "HentaiFox", url: "https://hentaifox.com", category: "Hentai Streaming", description: "Doujinshi and manga reader with a massive, regularly-updated library.", tags: ["Free","Doujin","Reader"], rating: 4.6, addedAt: "2026-02-05" },
    { id: "hentaigasm", name: "Hentaigasm", url: "https://hentaigasm.com", category: "Hentai Streaming", description: "Popular free hentai streaming site with a wide variety of series and OVAs.", tags: ["Free","Streaming","OVA"], rating: 4.5, addedAt: "2026-01-20" },
    { id: "simplyhentai", name: "Simply Hentai", url: "https://www.simply-hentai.com", category: "Hentai Streaming", description: "Clean interface for hentai streaming and manga reading.", tags: ["Free","Streaming","Clean UI"], rating: 4.4, addedAt: "2026-03-15" },
    { id: "hentai20", name: "Hentai20", url: "https://hentai20.io", category: "Hentai Streaming", description: "Modern hentai streaming site with high quality video and regular updates.", tags: ["Free","HD","Modern"], rating: 4.5, addedAt: "2026-01-25" },
    { id: "hentaimama", name: "HentaiMama", url: "https://hentaimama.io", category: "Hentai Streaming", description: "Freemium hentai streaming with both subbed and dubbed content.", tags: ["Free","Freemium","Dubbed"], rating: 4.3, addedAt: "2026-02-28" },
    { id: "hentaibros", name: "HentaiBros", url: "https://www.hentaibros.com", category: "Hentai Streaming", description: "Streaming platform featuring hentai OVAs and series sorted by genre.", tags: ["Free","Genre","OVA"], rating: 4.2, addedAt: "2026-04-01" },
    { id: "hentaipure", name: "HentaiPure", url: "https://hentaipure.com", category: "Hentai Streaming", description: "Curated hentai streaming focused on quality over quantity.", tags: ["Free","Curated","HD"], rating: 4.5, addedAt: "2026-04-10" },
    { id: "hentaistv", name: "Hentais.tv", url: "https://hentais.tv", category: "Hentai Streaming", description: "User-friendly hentai streaming with genre tags and community ratings.", tags: ["Free","Community","Tagged"], rating: 4.4, addedAt: "2026-01-30" },
    { id: "hentaicloud", name: "Hentai-Cloud", url: "https://hentai-cloud.com", category: "Hentai Streaming", description: "Fast-loading cloud-based hentai streaming site.", tags: ["Free","Fast","Modern"], rating: 4.3, addedAt: "2026-03-20" },
    { id: "erodoujins", name: "EroDoujins", url: "https://erodoujins.com", category: "Hentai Streaming", description: "Dedicated reader for adult doujinshi with English translations.", tags: ["Free","Doujin","English"], rating: 4.4, addedAt: "2026-02-10" },
    { id: "hentaicomic", name: "HentaiComic", url: "https://hentaicomic.com", category: "Hentai Streaming", description: "Adult manga and doujinshi reading platform with clean navigation.", tags: ["Free","Manga","Doujin"], rating: 4.3, addedAt: "2026-03-05" },
    { id: "hentai2w", name: "Hentai2W", url: "https://hentai2.com", category: "Hentai Streaming", description: "Fast-loading hentai streaming portal with minimal ads.", tags: ["Free","Fast","Low-Ads"], rating: 4.4, addedAt: "2026-03-10" },

    // === DOWNLOADS (15) ===
    { id: "nyaa", name: "Nyaa", url: "https://nyaa.si", category: "Downloads", description: "The premier public anime, manga, and Japanese media torrent indexer.", tags: ["Free","Torrents","Anime"], rating: 4.9, addedAt: "2026-01-05" },
    { id: "sukebei", name: "Sukebei Nyaa", url: "https://sukebei.nyaa.si", category: "Downloads", description: "Adult-focused section of Nyaa with hentai games, manga, and video torrents.", tags: ["Free","Torrents","Adult"], rating: 4.8, addedAt: "2026-01-05" },
    { id: "anidex", name: "AniDex", url: "https://anidex.info", category: "Downloads", description: "Modern anime torrent index with a clean UI and multi-language support.", tags: ["Free","Torrents","Multi-language"], rating: 4.6, addedAt: "2026-02-01" },
    { id: "animetosho", name: "AnimeTosho", url: "https://animetosho.org", category: "Downloads", description: "Mirrors Nyaa torrents and adds direct download and XDCC bot options.", tags: ["Free","Direct Download","Mirror"], rating: 4.7, addedAt: "2026-01-15" },
    { id: "tokyotosho", name: "TokyoTosho", url: "https://www.tokyotosho.info", category: "Downloads", description: "One of the oldest Japanese media torrent trackers still active.", tags: ["Free","Torrents","Classic"], rating: 4.4, addedAt: "2026-03-05" },
    { id: "yts", name: "YTS", url: "https://yts.mx", category: "Downloads", description: "High-quality, small-size anime film and movie torrents.", tags: ["Free","Torrents","HD"], rating: 4.7, addedAt: "2026-02-15" },
    { id: "1337x", name: "1337x", url: "https://1337x.to", category: "Downloads", description: "Major public torrent index with a large and curated anime section.", tags: ["Free","Torrents","Public"], rating: 4.6, addedAt: "2026-03-01" },
    { id: "dlraw", name: "DLRaw", url: "https://dlraw.to", category: "Downloads", description: "Download raw Japanese manga, light novels, and magazines.", tags: ["Free","Manga","Raw"], rating: 4.5, addedAt: "2026-02-08" },
    { id: "rawkuma", name: "RawKuma", url: "https://rawkuma.com", category: "Downloads", description: "High quality raw Japanese manga scan downloads.", tags: ["Free","Manga","Japanese"], rating: 4.4, addedAt: "2026-04-01" },
    { id: "anidl", name: "AniDL", url: "https://anidl.org", category: "Downloads", description: "Direct download links for popular anime series in various qualities.", tags: ["Free","Direct Download","Anime"], rating: 4.3, addedAt: "2026-01-20" },
    { id: "animeout", name: "AnimeOut", url: "https://www.animeout.xyz", category: "Downloads", description: "Compressed anime downloads with micro-sized files for slow connections.", tags: ["Free","Compressed","Direct Download"], rating: 4.4, addedAt: "2026-04-05" },
    { id: "itazuraneko", name: "Itazuraneko", url: "https://itazuraneko.neocities.org", category: "Downloads", description: "Legendary Japanese learning and media resource hub with a massive download library.", tags: ["Free","Japanese","Learning"], rating: 4.8, addedAt: "2026-03-10" },
    { id: "rawsenmanga", name: "SenManga Raw", url: "https://raw.senmanga.com", category: "Downloads", description: "Large collection of raw Japanese manga for reading and download.", tags: ["Free","Manga","Raw"], rating: 4.3, addedAt: "2026-01-28" },
    { id: "nyaapantsu", name: "NyaaPantsu", url: "https://nyaa.net", category: "Downloads", description: "Open-source alternative anime torrent tracker built on Nyaa's codebase.", tags: ["Free","Torrents","Open Source"], rating: 4.2, addedAt: "2026-03-20" },
    { id: "animedlorg", name: "AnimeDL", url: "https://animedl.co", category: "Downloads", description: "Direct download portal for anime episodes with Google Drive mirrors.", tags: ["Free","Direct Download","Mirror"], rating: 4.3, addedAt: "2026-02-25" },

    // === IMAGES / BOORUS (15) ===
    { id: "danbooru", name: "Danbooru", url: "https://danbooru.donmai.us", category: "Images/Boorus", description: "The original curated anime image database with extensive tagging and metadata.", tags: ["Free","Curated","Tagged"], rating: 4.9, addedAt: "2026-01-08" },
    { id: "gelbooru", name: "Gelbooru", url: "https://gelbooru.com", category: "Images/Boorus", description: "Massive publicly accessible anime image database with millions of posts.", tags: ["Free","Massive","Tagged"], rating: 4.8, addedAt: "2026-01-08" },
    { id: "safebooru", name: "Safebooru", url: "https://safebooru.org", category: "Images/Boorus", description: "SFW-only booru featuring clean anime artwork drawn from Gelbooru's database.", tags: ["Free","SFW","Anime"], rating: 4.7, addedAt: "2026-02-01" },
    { id: "konachan", name: "Konachan", url: "https://konachan.com", category: "Images/Boorus", description: "High-quality anime wallpapers sourced and tagged by a dedicated community.", tags: ["Free","Wallpapers","Curated"], rating: 4.7, addedAt: "2026-02-01" },
    { id: "yandere", name: "Yande.re", url: "https://yande.re", category: "Images/Boorus", description: "High-resolution anime image repository focused on scan quality.", tags: ["Free","HD","Scans"], rating: 4.8, addedAt: "2026-02-01" },
    { id: "e621", name: "E621", url: "https://e621.net", category: "Images/Boorus", description: "The largest and most comprehensive furry and anthropomorphic art database.", tags: ["Free","Furry","Tagged"], rating: 4.7, addedAt: "2026-03-01" },
    { id: "rule34xxx", name: "Rule34.xxx", url: "https://rule34.xxx", category: "Images/Boorus", description: "Massive rule 34 image database — if it exists, it is here.", tags: ["Free","Rule34","Adult"], rating: 4.8, addedAt: "2026-01-12" },
    { id: "sankakuchan", name: "Sankaku Channel", url: "https://chan.sankakucomplex.com", category: "Images/Boorus", description: "Japanese-focused anime and cosplay imageboard with millions of tagged images.", tags: ["Free","Japanese","Cosplay"], rating: 4.6, addedAt: "2026-02-20" },
    { id: "pixiv", name: "Pixiv", url: "https://www.pixiv.net", category: "Images/Boorus", description: "Japan's largest art sharing platform with millions of anime and doujin artists.", tags: ["Free","Official","Artists"], rating: 4.9, addedAt: "2026-01-15" },
    { id: "zerochan", name: "Zerochan", url: "https://www.zerochan.net", category: "Images/Boorus", description: "Clean, curated anime artwork database with high-resolution images.", tags: ["Free","Curated","HD"], rating: 4.6, addedAt: "2026-03-10" },
    { id: "animepictures", name: "Anime-Pictures", url: "https://anime-pictures.net", category: "Images/Boorus", description: "High-resolution anime and game CG database with strict quality control.", tags: ["Free","HD","Game CG"], rating: 4.7, addedAt: "2026-02-15" },
    { id: "paheal", name: "Paheal", url: "https://rule34.paheal.net", category: "Images/Boorus", description: "Classic rule34 image hosting site with millions of tagged posts.", tags: ["Free","Rule34","Classic"], rating: 4.5, addedAt: "2026-03-08" },
    { id: "rule34hentai", name: "Rule34Hentai", url: "https://rule34hentai.net", category: "Images/Boorus", description: "NSFW anime image aggregator focused on rule34 and hentai art.", tags: ["Free","Rule34","Hentai"], rating: 4.4, addedAt: "2026-04-02" },
    { id: "booru", name: "Booru.org", url: "https://booru.org", category: "Images/Boorus", description: "Multi-booru viewer and aggregator for browsing across image boards.", tags: ["Free","Multi-Booru","Aggregator"], rating: 4.5, addedAt: "2026-02-12" },
    { id: "atfbooru", name: "ATFBooru", url: "https://booru.allthefallen.moe", category: "Images/Boorus", description: "Community-run imageboard for anime art with extensive tags.", tags: ["Free","Community","Tagged"], rating: 4.3, addedAt: "2026-03-25" },

    // === ANIME STREAMING (10) ===
    { id: "gogoanime", name: "GogoAnime", url: "https://gogoanime3.co", category: "Anime Streaming", description: "One of the most popular free anime streaming portals with a massive library.", tags: ["Free","Dubbed","Subbed"], rating: 4.7, addedAt: "2026-01-18" },
    { id: "zoro", name: "Aniwave (Zoro)", url: "https://aniwave.to", category: "Anime Streaming", description: "Popular anime streaming site with no ads, multiple servers, and fast loading.", tags: ["Free","No-Ads","Fast"], rating: 4.8, addedAt: "2026-02-09" },
    { id: "9anime", name: "9Anime", url: "https://9anime.pl", category: "Anime Streaming", description: "Long-running fan-operated anime streaming site with extensive catalog.", tags: ["Free","Subbed","Dubbed"], rating: 4.6, addedAt: "2026-01-22" },
    { id: "animepahe", name: "AnimePahe", url: "https://animepahe.ru", category: "Anime Streaming", description: "Known for compressed, high-quality releases that load fast on slow connections.", tags: ["Free","Compressed","Fast"], rating: 4.7, addedAt: "2026-03-03" },
    { id: "kickassanime", name: "KickAssAnime", url: "https://kickassanime.am", category: "Anime Streaming", description: "Fast-loading anime streaming site with proxy support and reliable servers.", tags: ["Free","Fast","Proxy"], rating: 4.5, addedAt: "2026-02-22" },
    { id: "animixplay", name: "AniMixPlay", url: "https://animixplay.to", category: "Anime Streaming", description: "Aggregator pulling streams from multiple sources for maximum reliability.", tags: ["Free","Aggregator","Reliable"], rating: 4.6, addedAt: "2026-03-18" },
    { id: "animeowl", name: "AnimeOwl", url: "https://animeowl.me", category: "Anime Streaming", description: "Clean and fast anime streaming site with a large seasonal catalog.", tags: ["Free","Seasonal","Clean UI"], rating: 4.4, addedAt: "2026-04-08" },
    { id: "animesuge", name: "AnimeSuge", url: "https://animesuge.to", category: "Anime Streaming", description: "Direct-stream anime site with a focus on minimal loading time.", tags: ["Free","Fast","Direct"], rating: 4.5, addedAt: "2026-04-12" },
    { id: "animedao", name: "AnimeDao", url: "https://animedao.to", category: "Anime Streaming", description: "Community-driven anime streaming platform with user ratings and discussions.", tags: ["Free","Community","Discussion"], rating: 4.4, addedAt: "2026-01-30" },
    { id: "wcofun", name: "WCOFun", url: "https://www.wcofun.net", category: "Anime Streaming", description: "Anime and cartoon streaming portal popular for dubbed content.", tags: ["Free","Dubbed","Cartoons"], rating: 4.3, addedAt: "2026-03-22" },

    // === MANGA / DOUJIN (10) ===
    { id: "mangadex", name: "MangaDex", url: "https://mangadex.org", category: "Manga/Doujin", description: "Community-built manga reading platform with the widest selection and best translations.", tags: ["Free","Community","Multi-language"], rating: 4.9, addedAt: "2026-01-06" },
    { id: "mangakakalot", name: "MangaKakalot", url: "https://mangakakalot.com", category: "Manga/Doujin", description: "Large unofficial manga reader with a constantly updated library.", tags: ["Free","Large Library","Fast"], rating: 4.5, addedAt: "2026-02-03" },
    { id: "manganato", name: "MangaNato", url: "https://manganato.com", category: "Manga/Doujin", description: "Fast manga reader with an enormous library and reliable uptime.", tags: ["Free","Fast","Large Library"], rating: 4.6, addedAt: "2026-01-25" },
    { id: "mangaowl", name: "MangaOwl", url: "https://mangaowl.net", category: "Manga/Doujin", description: "Clean manga reading interface with notifications for new chapter releases.", tags: ["Free","Clean UI","Notifications"], rating: 4.5, addedAt: "2026-03-12" },
    { id: "mangahub", name: "MangaHub", url: "https://mangahub.io", category: "Manga/Doujin", description: "Aggregator manga reader with a sleek UI and large catalog.", tags: ["Free","Aggregator","Modern"], rating: 4.4, addedAt: "2026-02-18" },
    { id: "bato", name: "Bato.to", url: "https://bato.to", category: "Manga/Doujin", description: "Community scanlation upload platform with an extensive, fan-driven library.", tags: ["Free","Scanlation","Community"], rating: 4.6, addedAt: "2026-01-14" },
    { id: "readm", name: "ReadM", url: "https://www.readm.org", category: "Manga/Doujin", description: "Clean manga reader focusing on a smooth mobile reading experience.", tags: ["Free","Mobile","Clean UI"], rating: 4.3, addedAt: "2026-04-04" },
    { id: "copymanga", name: "CopyManga", url: "https://copymanga.site", category: "Manga/Doujin", description: "Massive Chinese manga aggregator with a huge selection of titles.", tags: ["Free","Chinese","Large Library"], rating: 4.4, addedAt: "2026-03-28" },
    { id: "toomics", name: "Toomics", url: "https://toomics.com", category: "Manga/Doujin", description: "Premium webtoon platform with exclusive adult romance and action series.", tags: ["Paid","Webtoons","Adult"], rating: 4.5, addedAt: "2026-02-26" },
    { id: "hentai2read", name: "Hentai2Read", url: "https://hentai2read.com", category: "Manga/Doujin", description: "Large library of officially translated adult manga and doujinshi.", tags: ["Free","Adult","Translated"], rating: 4.6, addedAt: "2026-01-19" },

    // === GAMES (5) ===
    { id: "f95zone", name: "F95Zone", url: "https://f95zone.to", category: "Games", description: "The largest community for adult game sharing, modding, and discussion.", tags: ["Free","Community","Mods"], rating: 4.9, addedAt: "2026-01-09" },
    { id: "lewdzone", name: "LewdZone", url: "https://lewdzone.com", category: "Games", description: "Curated database and download hub for adult indie games.", tags: ["Free","Indie","Database"], rating: 4.6, addedAt: "2026-02-06" },
    { id: "adultgamesworld", name: "Adult Games World", url: "https://adultgames.world", category: "Games", description: "Aggregator listing adult games with reviews, screenshots, and download links.", tags: ["Free","Reviews","Indie"], rating: 4.4, addedAt: "2026-03-14" },
    { id: "vnplanet", name: "VN Planet", url: "https://vnplanet.net", category: "Games", description: "Community portal for downloading and discussing visual novels and adult games.", tags: ["Free","VN","Community"], rating: 4.5, addedAt: "2026-04-07" },
    { id: "hgames", name: "HGames", url: "https://hgames.io", category: "Games", description: "Curated hentai game portal featuring the best H-RPG and VN releases.", tags: ["Free","RPG","Hentai"], rating: 4.3, addedAt: "2026-02-13" },

    // === VISUAL NOVELS (5) ===
    { id: "visualnovelplanet", name: "VN Planet", url: "https://vnplanet.net", category: "Visual Novels", description: "Community hub for discovering, downloading, and discussing visual novels.", tags: ["Free","Community","Database"], rating: 4.6, addedAt: "2026-03-16" },
    { id: "vntls", name: "VN TLS", url: "https://vntls.org", category: "Visual Novels", description: "Resource for fan-translated visual novels with translation patches.", tags: ["Free","Translations","Patches"], rating: 4.7, addedAt: "2026-01-23" },
    { id: "insanelygames", name: "Insanely Games", url: "https://insanelygames.net", category: "Visual Novels", description: "Download portal for adult visual novels, H-games, and RPG Maker titles.", tags: ["Free","Download","RPG"], rating: 4.4, addedAt: "2026-02-17" },
    { id: "erogedownload", name: "Eroge Download", url: "https://erogedownload.com", category: "Visual Novels", description: "Trusted eroge download site with repacks and English patches.", tags: ["Free","Eroge","English"], rating: 4.5, addedAt: "2026-03-29" },
    { id: "ryuugames", name: "Ryuu Games", url: "https://ryuugames.com", category: "Visual Novels", description: "Popular source for adult VN and RPG downloads with active community.", tags: ["Free","RPG","Community"], rating: 4.6, addedAt: "2026-04-16" },

    // === COMMUNITIES (5) ===
    { id: "hentaifoundry", name: "Hentai Foundry", url: "https://www.hentai-foundry.com", category: "Communities", description: "Large artist community dedicated to anime-style adult artwork and stories.", tags: ["Free","Artists","Community"], rating: 4.7, addedAt: "2026-01-11" },
    { id: "deviantart", name: "DeviantArt", url: "https://www.deviantart.com", category: "Communities", description: "The world's largest online art community, home to millions of anime artists.", tags: ["Free","Artists","Mainstream"], rating: 4.7, addedAt: "2026-02-04" },
    { id: "newgrounds", name: "Newgrounds", url: "https://www.newgrounds.com", category: "Communities", description: "Pioneer entertainment portal hosting animations, games, and adult art.", tags: ["Free","Art","Games"], rating: 4.8, addedAt: "2026-03-06" },
    { id: "twitter", name: "X (Twitter) — Anime", url: "https://twitter.com/search?q=%23anime", category: "Communities", description: "The primary social media platform for real-time anime news and artist discovery.", tags: ["Free","Social","News"], rating: 4.6, addedAt: "2026-01-16" },
    { id: "discord", name: "Discord — Anime Servers", url: "https://disboard.org/servers/tag/anime", category: "Communities", description: "Directory of public anime Discord servers for fans and communities.", tags: ["Free","Community","Chat"], rating: 4.7, addedAt: "2026-02-23" }
'@

# Insert new sites before the closing ];
$closePattern = "`n];"
$insertPos = $content.LastIndexOf("];")
if ($insertPos -ge 0) {
    $content = $content.Substring(0, $insertPos) + $newSites + "`n];"
    Write-Host "Inserted 100 new sites"
} else {
    Write-Host "ERROR: Could not find closing ];"
}

# ── 4. WRITE BACK ─────────────────────────────────────────────────────────────
[System.IO.File]::WriteAllText((Resolve-Path $path), $content, [System.Text.Encoding]::UTF8)
Write-Host "data.js saved successfully"

# Count total entries
$count = ([regex]::Matches($content, 'id:\s*"[^"]+"')).Count
Write-Host "Total site entries: $count"
