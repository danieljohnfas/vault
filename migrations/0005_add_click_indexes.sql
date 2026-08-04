-- Add performance indexes on clicks columns for trending/ad queries
CREATE INDEX IF NOT EXISTS idx_sites_clicks ON sites(clicks DESC);
CREATE INDEX IF NOT EXISTS idx_amazon_ads_clicks ON amazon_ads(clicks DESC);
CREATE INDEX IF NOT EXISTS idx_sites_category ON sites(category);
CREATE INDEX IF NOT EXISTS idx_amazon_ads_status ON amazon_ads(status);
