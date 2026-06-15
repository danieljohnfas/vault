CREATE TABLE IF NOT EXISTS sites (
  id TEXT PRIMARY KEY,
  category TEXT NOT NULL,
  url TEXT NOT NULL,
  rating REAL,
  added_at TEXT,
  data_json TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS reviews (
  id TEXT PRIMARY KEY,
  site_id TEXT NOT NULL,
  name TEXT,
  rating INTEGER NOT NULL,
  comment TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_category ON sites(category);
CREATE INDEX IF NOT EXISTS idx_name ON sites(name);
CREATE INDEX IF NOT EXISTS idx_reviews_site_id ON reviews(site_id);
