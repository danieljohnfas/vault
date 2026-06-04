module.exports = async function isSiteLive(url) {
  try {
    const res = await fetch(url, { 
      method: 'GET',
      headers: { 
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8'
      },
      // 30 seconds timeout as requested
      signal: AbortSignal.timeout(30000) 
    });
    
    // Check for Cloudflare / anti-bot challenges
    // Cloudflare challenges often return 403 Forbidden or 503 Service Unavailable,
    // but they include specific headers or keywords in the body.
    const serverHeader = (res.headers.get('server') || '').toLowerCase();
    const isCloudflareServer = serverHeader.includes('cloudflare') || serverHeader.includes('ddos-guard');
    
    // If it's a 4xx or 5xx, but it's Cloudflare or another known WAF, we consider it alive, just protected.
    if (!res.ok && res.status >= 400) {
      if (isCloudflareServer && (res.status === 403 || res.status === 503)) {
        return true;
      }
      // Otherwise, it's a genuine error (404, 500, etc.)
      return false;
    }
    
    const text = await res.text();
    const t = text.toLowerCase();
    
    // If we get an OK response but the body mentions Cloudflare challenge, it's alive.
    if (t.includes('cloudflare') && (t.includes('just a moment') || t.includes('please wait'))) {
      return true;
    }

    // Heuristics for dead or parked sites
    if (text.length < 500) return false; // Too small to be a real site
    
    const parkedPhrases = [
      'buy this domain', 
      'domain is for sale', 
      'sedo parking', 
      'hugedomains', 
      'this domain is parked', 
      'domain parked', 
      'related searches', 
      'buy domain',
      'domain names for sale'
    ];
    
    if (parkedPhrases.some(p => t.includes(p))) return false;
    
    return true; // Passed all checks
  } catch (err) {
    // Catch timeouts, DNS resolution failures, network errors
    return false;
  }
};
