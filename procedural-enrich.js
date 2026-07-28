const fs = require('fs');

const DATA_FILE = './js/data.js';
let fileText = fs.readFileSync(DATA_FILE, 'utf8');
let match = fileText.match(/const\s+sitesData\s*=\s*([\s\S]*?\]);/);
let sites = JSON.parse(match[1].replace(/,\s*([\]}])/g, '$1'));

const thinSites = sites.filter(s => !s.longReview);
console.log(`Found ${thinSites.length} entries missing longReview. Generating procedurally...`);

// --- Procedural Generation Dictionaries ---

const introTemplates = [
    "If you are looking for top-tier content in the {category} space, {name} is an excellent destination.",
    "{name} has quickly established itself as a reliable platform for {category} enthusiasts.",
    "Navigating the world of {category} can be overwhelming, but {name} makes it a seamless experience.",
    "For fans of {category}, {name} offers a robust and user-friendly platform that stands out from the crowd.",
    "When it comes to high-quality {category}, {name} is a site that definitely deserves your attention.",
    "Our latest evaluation of {name} confirms that it remains a premier hub for anyone interested in {category}.",
    "Delivering consistently strong content, {name} has built a solid reputation within the {category} community.",
    "{name} continually updates its catalog, making it a must-visit for avid consumers of {category}.",
    "Whether you're new to {category} or a seasoned veteran, {name} offers an impressive array of options.",
    "There's a good reason {name} ranks highly in our {category} index: it provides a highly polished experience."
];

const middleTemplates = [
    " The platform focuses heavily on {tags}, ensuring a tailored and highly specific experience.",
    " Users will particularly appreciate its clean layout and dedication to {tags} content.",
    " It differentiates itself from competitors by prioritizing {tags} alongside an accessible interface.",
    " With its growing library and emphasis on {tags}, it provides exactly what its target audience is looking for.",
    " The site's core strengths lie in its {tags} offerings, which are consistently updated and well-maintained.",
    " Notably, its extensive curation of {tags} means you spend less time searching and more time enjoying.",
    " The development team clearly understands its audience, evident from their seamless integration of {tags}.",
    " Few platforms manage to balance {tags} as effectively as this one does, maintaining high quality throughout.",
    " Expect a comprehensive dive into {tags}, backed by servers that handle heavy traffic gracefully.",
    " It’s rare to see such a dedicated approach to {tags}, making this a standout choice among alternatives."
];

const endTemplates = [
    " Overall, it earns a solid spot in our directory and is well worth exploring.",
    " Whether you're a casual browser or a dedicated fan, it provides a highly satisfying experience.",
    " We highly recommend bookmarking this platform for your future browsing needs.",
    " It remains one of our top recommendations for anyone interested in this specific niche.",
    " Give it a try if you want a reliable, straightforward platform without unnecessary bloat.",
    " Our review team gave it high marks for usability, making it a reliable daily driver.",
    " It's a fantastic addition to your bookmarks if you prioritize quality over sheer volume.",
    " Ultimately, this platform delivers on its promises and easily justifies its high rating.",
    " We suggest checking it out yourself to see why it continues to grow in popularity.",
    " A highly competent platform that sets the standard for others in this space."
];

const proTemplates = {
    "HD": "High-definition video quality with minimal compression",
    "Free": "Completely free to use without hidden fees",
    "Freemium": "Generous free tier with optional premium perks",
    "Paid": "Premium, ad-free experience for subscribers",
    "Doujin": "Massive, frequently updated doujinshi collection",
    "Manga": "Extensive manga library with high-res scans",
    "Streaming": "Fast, buffer-free streaming across regions",
    "Community": "Active, helpful community and comment sections",
    "Torrents": "Fast P2P downloads with strong seeders",
    "VR": "Immersive VR support and robust player",
    "Official": "Official, licensed content supporting creators",
    "Default": "Intuitive and easy-to-navigate interface"
};

const conTemplates = [
    "May contain intrusive ads for non-premium users",
    "Library size is smaller than some mega-sites",
    "Interface feels slightly outdated on mobile",
    "Occasional slow loading times during peak hours",
    "Search functionality could be more robust",
    "Premium features require a paid subscription",
    "Filtering options are somewhat limited",
    "Can occasionally trigger aggressive captchas",
    "Requires registration to access full features"
];

// --- Translation Dictionary for standard boilerplate ---
const translations = {
    es: " Esta plataforma de {category} es muy recomendable por su enfoque en {tags}. Ofrece una gran experiencia para los usuarios.",
    jp: " この{category}プラットフォームは、{tags}に重点を置いており、強くお勧めします。ユーザーに素晴らしい体験を提供します。",
    fr: " Cette plateforme de {category} est fortement recommandée pour son accent sur {tags}. Elle offre une excellente expérience.",
    pt: " Esta plataforma de {category} é altamente recomendada pelo seu foco em {tags}. Oferece uma ótima experiência aos usuários.",
    hi: " यह {category} प्लेटफ़ॉर्म अपने {tags} पर ध्यान केंद्रित करने के लिए अत्यधिक अनुशंसित है। यह उपयोगकर्ताओं के लिए एक शानदार अनुभव प्रदान करता है।",
    ar: " يوصى بشدة بمنصة {category} هذه لتركيزها على {tags}. إنها تقدم تجربة رائعة للمستخدمين.",
    de: " Diese {category}-Plattform ist aufgrund ihres Fokus auf {tags} sehr zu empfehlen. Sie bietet eine großartige Benutzererfahrung."
};

function getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

let successCount = 0;

for (let i = 0; i < sites.length; i++) {
    const site = sites[i];
    
    if (site.longReview && !process.argv.includes('--force')) continue;

    // 1. Generate English longReview
    const intro = getRandom(introTemplates).replace('{category}', site.category).replace('{name}', site.name);
    
    let tagsStr = "high-quality media";
    if (site.tags && site.tags.length > 0) {
        tagsStr = site.tags.join(' and ');
    }
    
    const middle = getRandom(middleTemplates).replace('{tags}', tagsStr);
    const end = getRandom(endTemplates);
    
    const longReview = `${intro}${middle}${end} ${site.description}`;
    
    // 2. Generate Pros
    const pros = [];
    if (site.tags) {
        for (const tag of site.tags) {
            if (proTemplates[tag] && pros.length < 3) {
                pros.push(proTemplates[tag]);
            }
        }
    }
    while (pros.length < 3) {
        pros.push(proTemplates["Default"]);
        break; 
    }
    site.pros = [...new Set(pros)];

    // 3. Generate Cons
    const cons = [];
    while (cons.length < 2) {
        const randomCon = getRandom(conTemplates);
        if (!cons.includes(randomCon)) cons.push(randomCon);
    }
    site.cons = cons;

    // 4. Generate Translations
    site.longReview = longReview;
    
    const langs = ['es', 'jp', 'fr', 'pt', 'hi', 'ar', 'de'];
    for (const lang of langs) {
        const shortDesc = site[`description_${lang}`] || site.description;
        const localizedBoilerplate = translations[lang].replace('{category}', site.category).replace('{tags}', tagsStr);
        site[`longReview_${lang}`] = `${shortDesc}${localizedBoilerplate}`;
    }

    successCount++;
}

// Write back to file
const updatedJson = JSON.stringify(sites, null, 4);
fileText = fileText.replace(/const\s+sitesData\s*=\s*[\s\S]*?\];/, `const sitesData = ${updatedJson};`);
fs.writeFileSync(DATA_FILE, fileText, 'utf8');

console.log(`\n🎉 Successfully generated unique procedural content for ${successCount} entries!`);
