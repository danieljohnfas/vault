-- ============================================================
-- HentaiVault D1 Cleanup — Purge ScoutV3 Junk Entries
-- Run: npx wrangler d1 execute hv-directory --remote --file=scripts/purge-junk.sql
-- ============================================================

-- 1. PDF / Document URLs
DELETE FROM sites WHERE url LIKE '%.pdf%';

-- 2. itch.io game pages (individual game pages, not the itch.io platform itself)
DELETE FROM sites WHERE url LIKE '%itch.io/%' AND url != 'https://itch.io/';

-- 3. Scribd documents
DELETE FROM sites WHERE url LIKE '%scribd.com/document/%';
DELETE FROM sites WHERE url LIKE '%scribd.com/doc/%';

-- 4. Non-adult / clearly wrong domains that got scraped
DELETE FROM sites WHERE url LIKE '%eneba.com%';
DELETE FROM sites WHERE url LIKE '%securities.dmm.com%';
DELETE FROM sites WHERE url LIKE '%steampowered.com/curator%';
DELETE FROM sites WHERE url LIKE '%zerotolerance.com/performance%';
DELETE FROM sites WHERE url LIKE '%animeonegai.com%';

-- 5. Anti-trafficking / legal statement pages (site IDs with these keywords)
DELETE FROM sites WHERE id LIKE '%anti_trafficking%';
DELETE FROM sites WHERE id LIKE '%trafficking%';

-- 6. Individual video URLs (not site homepages) — Brazilian porn video URLs
DELETE FROM sites WHERE url LIKE '%pornomineiro.com/videos/%';
DELETE FROM sites WHERE url LIKE '%pornomineiro.com/bucetas/%';

-- 7. Forum poll / thread pages that got mistaken for sites
DELETE FROM sites WHERE id LIKE '%new_poll%';
DELETE FROM sites WHERE id LIKE '%trope_power%';

-- 8. Any entry where added_at is NULL or invalid
DELETE FROM sites WHERE added_at IS NULL;
DELETE FROM sites WHERE added_at = 'Invalid Date';
DELETE FROM sites WHERE added_at = '';

-- 9. Zero-star entries tagged ScoutV3 with no real rating
DELETE FROM sites WHERE rating = 0 AND data_json LIKE '%"ScoutV3"%';

-- 10. Generic 0-star Scouted entries flagged as ScoutedActive
DELETE FROM sites WHERE rating = 0 AND data_json LIKE '%ScoutedActive%';

-- 11. Duplicate XNXX Live Cams via zline0 tracker — keep only one
DELETE FROM sites WHERE url LIKE '%zline0.com%' AND id NOT IN (
  SELECT id FROM sites WHERE url LIKE '%zline0.com%' ORDER BY added_at ASC LIMIT 1
);

-- 12. Any Steam curator pages (not actual sites)
DELETE FROM sites WHERE url LIKE '%store.steampowered.com/curator%';

-- 13. Individual content pages scraped as sites (name longer than 80 chars from ScoutV3)
DELETE FROM sites WHERE length(json_extract(data_json, '$.name')) > 80 AND data_json LIKE '%ScoutV3%';

-- Report final count
SELECT COUNT(*) as remaining_sites FROM sites;
