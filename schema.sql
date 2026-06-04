DROP TABLE IF EXISTS sites;
CREATE TABLE sites (
  id TEXT PRIMARY KEY,
  category TEXT NOT NULL,
  url TEXT NOT NULL,
  rating REAL,
  added_at TEXT,
  data_json TEXT NOT NULL
);
CREATE INDEX idx_category ON sites(category);
