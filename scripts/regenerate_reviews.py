import urllib.request
import json
import random
import sys

introTemplates = [
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
]

middleTemplates = [
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
]

endTemplates = [
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
]

proTemplates = {
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
}

conTemplates = [
    "May contain intrusive ads for non-premium users",
    "Library size is smaller than some mega-sites",
    "Interface feels slightly outdated on mobile",
    "Occasional slow loading times during peak hours",
    "Search functionality could be more robust",
    "Premium features require a paid subscription",
    "Filtering options are somewhat limited",
    "Can occasionally trigger aggressive captchas",
    "Requires registration to access full features"
]

translations = {
    "es": " Esta plataforma de {category} es muy recomendable por su enfoque en {tags}. Ofrece una gran experiencia para los usuarios.",
    "jp": " この{category}プラットフォームは、{tags}に重点を置いており、強くお勧めします。ユーザーに素晴らしい体験を提供します。",
    "fr": " Cette plateforme de {category} est fortement recommandée pour son accent sur {tags}. Elle offre une excellente expérience.",
    "pt": " Esta plataforma de {category} é altamente recomendada pelo seu foco em {tags}. Oferece uma ótima experiência aos usuários.",
    "hi": " यह {category} प्लेटफ़ॉर्म अपने {tags} पर ध्यान केंद्रित करने के लिए अत्यधिक अनुशंसित है। यह उपयोगकर्ताओं के लिए एक शानदार अनुभव प्रदान करता है।",
    "ar": " يوصى بشدة بمنصة {category} هذه لتركيزها على {tags}. إنها تقدم تجربة رائعة للمستخدمين.",
    "de": " Diese {category}-Plattform ist aufgrund ihres Fokus auf {tags} sehr zu empfehlen. Sie bietet eine großartige Benutzererfahrung."
}

def generate_procedural_content(site):
    tagsStr = "high-quality media"
    if site.get("tags") and len(site["tags"]) > 0:
        tagsStr = " and ".join(site["tags"])
    
    intro = random.choice(introTemplates).replace("{category}", site.get("category", "")).replace("{name}", site.get("name", ""))
    middle = random.choice(middleTemplates).replace("{tags}", tagsStr)
    end = random.choice(endTemplates)
    
    longReview = f"{intro}{middle}{end} {site.get('description', '')}"
    
    pros = []
    if site.get("tags"):
        for tag in site["tags"]:
            if tag in proTemplates and len(pros) < 3:
                pros.append(proTemplates[tag])
    
    if len(pros) < 3:
        pros.append(proTemplates["Default"])
        
    site["pros"] = list(dict.fromkeys(pros)) # Unique
    
    cons = []
    while len(cons) < 2:
        rc = random.choice(conTemplates)
        if rc not in cons:
            cons.append(rc)
    site["cons"] = cons
    
    site["longReview"] = longReview
    
    for lang in ["es", "jp", "fr", "pt", "hi", "ar", "de"]:
        shortDesc = site.get(f"description_{lang}", site.get("description", ""))
        localizedBoilerplate = translations[lang].replace("{category}", site.get("category", "")).replace("{tags}", tagsStr)
        site[f"longReview_{lang}"] = f"{shortDesc}{localizedBoilerplate}"

    return site

print("Fetching sites from API...")
req = urllib.request.Request(
    'https://hentaivault.me/api/sites?limit=5000', 
    headers={'User-Agent': 'Mozilla/5.0'}
)

try:
    with urllib.request.urlopen(req) as response:
        data = json.loads(response.read().decode())
        sites = data.get("sites", [])
except Exception as e:
    print(f"Error fetching API: {e}")
    sys.exit(1)

print(f"Fetched {len(sites)} sites. Generating SQL...")

with open("update_reviews.sql", "w", encoding="utf-8") as f:
    for site in sites:
        # Generate new procedural text
        updated_site = generate_procedural_content(site)
        
        # We need to escape single quotes in JSON string
        json_str = json.dumps(updated_site, ensure_ascii=False).replace("'", "''")
        
        # Write UPDATE statement
        sql = f"UPDATE sites SET data_json = '{json_str}' WHERE id = '{site['id']}';\n"
        f.write(sql)

print("Generated update_reviews.sql successfully.")
