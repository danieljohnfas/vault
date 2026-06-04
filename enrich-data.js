const fs = require('fs');

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
    console.error("❌ Please set the GEMINI_API_KEY environment variable.");
    console.error("Example: set GEMINI_API_KEY=your_key && node enrich-data.js");
    process.exit(1);
}

const DATA_FILE = './js/data.js';

// Read the file and extract the JSON array
const fileText = fs.readFileSync(DATA_FILE, 'utf8');
const match = fileText.match(/const\s+sitesData\s*=\s*([\s\S]*?\]);/);
if (!match) {
    console.error("❌ Could not parse sitesData from js/data.js");
    process.exit(1);
}

// Parse the array safely
let sites;
try {
    // The array might have trailing commas, which JSON.parse hates.
    const jsonStr = match[1].replace(/,\s*([\]}])/g, '$1');
    sites = JSON.parse(jsonStr);
} catch (e) {
    console.error("❌ Failed to parse the extracted JSON data:", e.message);
    process.exit(1);
}

// Find all entries that lack a longReview
const thinSites = sites.filter(s => !s.longReview);
console.log(`📊 Found ${sites.length} total entries. ${thinSites.length} are missing a longReview.`);

if (thinSites.length === 0) {
    console.log("✅ All entries have a longReview. Nothing to do!");
    process.exit(0);
}

// We will process a batch of entries to prevent massive API overloads or costs in one go.
// Change BATCH_SIZE if you want to process more at once.
const BATCH_SIZE = 10;
const sitesToProcess = thinSites.slice(0, BATCH_SIZE);

console.log(`🚀 Processing batch of ${sitesToProcess.length} entries...`);

async function generateEnrichment(site) {
    const prompt = `
You are an expert adult directory and SEO content writer. I have a thin directory entry that needs a detailed review to rank well on Google.

Site Details:
- Name: ${site.name}
- Category: ${site.category}
- URL: ${site.url}
- Short Description: ${site.description}
- Tags: ${site.tags ? site.tags.join(', ') : 'None'}

Please return a JSON object with EXACTLY these keys:
- "longReview": A detailed, engaging 3-4 sentence review of the site. Mention what makes it unique in its category, its user experience, and who it's best for. Maintain a neutral but descriptive tone. (English)
- "pros": An array of 3 to 4 string bullet points highlighting the best features. (English)
- "cons": An array of 2 to 3 string bullet points highlighting the drawbacks. (English)
- "longReview_es": Spanish translation of longReview
- "longReview_jp": Japanese translation of longReview
- "longReview_fr": French translation of longReview
- "longReview_pt": Portuguese translation of longReview
- "longReview_hi": Hindi translation of longReview
- "longReview_ar": Arabic translation of longReview
- "longReview_de": German translation of longReview

Only output raw JSON. Do not include markdown formatting like \`\`\`json.
`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
                temperature: 0.7,
                responseMimeType: "application/json"
            }
        })
    });

    if (!response.ok) {
        const errText = await response.text();
        throw new Error(`API Error ${response.status}: ${errText}`);
    }

    const data = await response.json();
    const resultText = data.candidates[0].content.parts[0].text;
    
    try {
        return JSON.parse(resultText);
    } catch (e) {
        throw new Error("Failed to parse LLM JSON output.");
    }
}

async function run() {
    let successCount = 0;

    for (const site of sitesToProcess) {
        console.log(`⏳ Processing: ${site.name}...`);
        try {
            const enriched = await generateEnrichment(site);
            
            // Apply updates
            const siteIndex = sites.findIndex(s => s.id === site.id);
            sites[siteIndex] = {
                ...sites[siteIndex],
                longReview: enriched.longReview,
                pros: enriched.pros,
                cons: enriched.cons,
                longReview_es: enriched.longReview_es,
                longReview_jp: enriched.longReview_jp,
                longReview_fr: enriched.longReview_fr,
                longReview_pt: enriched.longReview_pt,
                longReview_hi: enriched.longReview_hi,
                longReview_ar: enriched.longReview_ar,
                longReview_de: enriched.longReview_de,
            };
            
            successCount++;
            console.log(`   ✅ Success`);
            
            // Wait 2 seconds between requests to avoid rate limits
            await new Promise(r => setTimeout(r, 2000));
            
        } catch (error) {
            console.error(`   ❌ Failed:`, error.message);
        }
    }

    if (successCount > 0) {
        // We write back the entire updated sites array to the file.
        // Format with 4 spaces to match original.
        const updatedJson = JSON.stringify(sites, null, 4);
        const newFileText = fileText.replace(/const\s+sitesData\s*=\s*[\s\S]*?\];/, `const sitesData = ${updatedJson};`);
        
        fs.writeFileSync(DATA_FILE, newFileText, 'utf8');
        console.log(`\n🎉 Successfully enriched ${successCount} entries and saved to ${DATA_FILE}.`);
        console.log(`Run the script again to process the next batch of ${BATCH_SIZE}!`);
    }
}

run();
