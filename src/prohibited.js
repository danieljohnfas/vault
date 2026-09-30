/**
 * Content that must never be listed, crawled into the queue, or linked to.
 *
 * These terms indicate sexualised depictions of minors (real or drawn). Linking to
 * such material is illegal in many jurisdictions and gets a domain removed from
 * Google Search, so every ingestion path (Worker submit + cron, scout, daily-add)
 * rejects anything that matches, and the sitemap/review pages never expose it.
 *
 * Shared by the Worker (ESM import) and the Node pipeline scripts (require()).
 */
export const PROHIBITED_TERMS = [
  'jailbait', 'jail-bait', 'jbcam', 'jbteen', 'jb-teen',
  'loli', 'shota', 'lolita',
  'underage', 'under-age', 'preteen', 'pre-teen', 'pthc', 'childporn', 'child-porn', 'child porn',
  'kiddie', 'toddler', 'minors', 'schoolgirl-porn',
];

export function isProhibited(...parts) {
  const text = parts.filter(Boolean).join(' ').toLowerCase();
  return PROHIBITED_TERMS.some(t => text.includes(t));
}
