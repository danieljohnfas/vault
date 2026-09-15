CREATE TABLE IF NOT EXISTS sites (
  id TEXT PRIMARY KEY,
  category TEXT NOT NULL,
  url TEXT NOT NULL,
  rating REAL,
  added_at TEXT,
  data_json TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS reviews (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  site_id TEXT NOT NULL,
  user_name TEXT,
  rating INTEGER NOT NULL,
  comment TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now')) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_category ON sites(category);
CREATE INDEX IF NOT EXISTS idx_rating ON sites(rating);
CREATE INDEX IF NOT EXISTS idx_added_at ON sites(added_at);
CREATE INDEX IF NOT EXISTS idx_reviews_site_id ON reviews(site_id);
CREATE TABLE IF NOT EXISTS queue (
  id TEXT PRIMARY KEY,
  url TEXT NOT NULL UNIQUE,
  category TEXT,
  name TEXT,
  status TEXT DEFAULT 'pending',
  claimed_at TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_queue_status ON queue(status);
