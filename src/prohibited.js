/**
 * Content that must never be listed, crawled into the queue, or linked to.
 *
 * These terms indicate sexualised depictions of minors (real or drawn). Linking to
 * such material is illegal in many jurisdictions and gets a domain removed from
 * Google Search, so every ingestion path (Worker submit + cron, scout, daily-add)
 * rejects anything that matches, and the sitemap/review pages never expose it.
 *
 * Shared by the Worker (ESM import) and the Node pipeline scripts (require()).
 * The same list is enforced inside D1 by triggers (migrations/0006_*), which
 * scripts/ops/build-prohibited-triggers.js regenerates after any change here.
 *
 * Terms are plain lowercase substrings without quotes (they are inlined in SQL).
 */
export const PROHIBITED_TERMS = [
  'jailbait', 'jail-bait', 'jbcam', 'jbteen', 'jb-teen',
  'loli', 'shota', 'lolita',
  'underage', 'under-age', 'preteen', 'pre-teen', 'pthc', 'childporn', 'child-porn', 'child porn',
  'kiddie', 'toddler', 'schoolgirl-porn',
  'pedophil', 'paedophil', 'pedobear', 'child sex', 'kids porn', 'kid porn',
  // "family/teen nudism" galleries are a well-known CSAM front in adult directories
  'nudism', 'nudist', 'naturist', 'teen young', 'teen-young', 'young teen', 'young-teen',
  // child "model" studios and long-standing CSAM search keywords
  'candydoll', 'candy-doll', 'candy doll', 'nymphet', 'ls-models', 'lsmodels', 'ls-island',
  'hussyfan', 'ptsc', 'qqaazz', 'kinderporn', 'kinder porn',
];

export function isProhibited(...parts) {
  const text = parts.filter(Boolean).join(' ').toLowerCase();
  return PROHIBITED_TERMS.some(t => text.includes(t));
}
