CREATE TABLE IF NOT EXISTS counselor_applications (
  id SERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  age TEXT,
  phone TEXT NOT NULL,
  email TEXT,
  about TEXT,
  experience TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);