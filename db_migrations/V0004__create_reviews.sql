CREATE TABLE IF NOT EXISTS reviews (
  id SERIAL PRIMARY KEY,
  parent_name TEXT NOT NULL,
  child_name TEXT,
  rating INTEGER NOT NULL DEFAULT 5,
  text TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_reviews_status ON reviews(status);