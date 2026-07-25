const fs = require('fs');

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
    console.error("❌ Please set the GEMINI_API_KEY environment variable.");
    process.exit(1);
}

const DATA_FILE = './js/data.js';

// Helper to delay
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

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

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            safetySettings: [
                { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
                { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
                { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
                { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" }
            ],
            generationConfig: {
                temperature: 0.7,
                responseMimeType: "application/json"
            }
        })
    });

    if (!response.ok) {
        if (response.status === 429) {
            console.log("   ⚠️ Rate limited (429). Waiting 10s...");
            await sleep(10000);
            return generateEnrichment(site); // Retry once
        }
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
    let fileText = fs.readFileSync(DATA_FILE, 'utf8');
    let match = fileText.match(/const\s+sitesData\s*=\s*([\s\S]*?\]);/);
    let sites = JSON.parse(match[1].replace(/,\s*([\]}])/g, '$1'));
    
    let thinSites = sites.filter(s => !s.longReview);
    console.log(`📊 Found ${thinSites.length} entries missing longReview.`);

    // Let's do a batch of 50 for this run so it finishes in a reasonable timeframe (5-6 mins)
    const BATCH_SIZE = 50;
    thinSites = thinSites.slice(0, BATCH_SIZE);
    
    console.log(`🚀 Processing batch of ${thinSites.length} entries...`);

    let successCount = 0;
    
    for (let i = 0; i < thinSites.length; i++) {
        const site = thinSites[i];
        console.log(`[${i+1}/${thinSites.length}] ⏳ Processing: ${site.name}...`);
        
        try {
            const enriched = await generateEnrichment(site);
            
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
            
            // Write to file every 5 entries to save progress
            if (successCount % 5 === 0 || i === thinSites.length - 1) {
                const updatedJson = JSON.stringify(sites, null, 4);
                fileText = fileText.replace(/const\s+sitesData\s*=\s*[\s\S]*?\];/, `const sitesData = ${updatedJson};`);
                fs.writeFileSync(DATA_FILE, fileText, 'utf8');
                console.log(`   💾 Progress saved to disk!`);
            }
            
            // Sleep 4.5 seconds to respect 15 RPM free tier limit
            await sleep(4500);
            
        } catch (error) {
            console.error(`   ❌ Failed:`, error.message);
            // Sleep to cool down if error
            await sleep(5000);
        }
    }

    console.log(`\n🎉 Batch complete. Successfully enriched ${successCount} entries!`);
}

run();
