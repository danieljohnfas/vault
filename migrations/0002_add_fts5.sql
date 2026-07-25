-- Create the FTS5 virtual table
CREATE VIRTUAL TABLE IF NOT EXISTS sites_fts USING fts5(id, name, description, category, content='sites', content_rowid='rowid');

-- Populate the FTS5 table with existing data
INSERT INTO sites_fts(rowid, id, name, description, category) 
SELECT rowid, id, json_extract(data_json, '$.name'), json_extract(data_json, '$.description'), category FROM sites;

-- Create triggers to keep FTS5 in sync with the sites table
CREATE TRIGGER IF NOT EXISTS sites_ai AFTER INSERT ON sites BEGIN
  INSERT INTO sites_fts(rowid, id, name, description, category) 
  VALUES (new.rowid, new.id, json_extract(new.data_json, '$.name'), json_extract(new.data_json, '$.description'), new.category);
END;

CREATE TRIGGER IF NOT EXISTS sites_ad AFTER DELETE ON sites BEGIN
  INSERT INTO sites_fts(sites_fts, rowid, id, name, description, category) 
  VALUES ('delete', old.rowid, old.id, json_extract(old.data_json, '$.name'), json_extract(old.data_json, '$.description'), old.category);
END;

CREATE TRIGGER IF NOT EXISTS sites_au AFTER UPDATE ON sites BEGIN
  INSERT INTO sites_fts(sites_fts, rowid, id, name, description, category) 
  VALUES ('delete', old.rowid, old.id, json_extract(old.data_json, '$.name'), json_extract(old.data_json, '$.description'), old.category);
  INSERT INTO sites_fts(rowid, id, name, description, category) 
  VALUES (new.rowid, new.id, json_extract(new.data_json, '$.name'), json_extract(new.data_json, '$.description'), new.category);
END;
