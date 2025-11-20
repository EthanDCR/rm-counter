-- Create users table to track different users
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create daily_stats table to track all counters per day per user
CREATE TABLE daily_stats (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  sales INTEGER DEFAULT 0,
  drop_price INTEGER DEFAULT 0,
  transitions INTEGER DEFAULT 0,
  pitched INTEGER DEFAULT 0,
  interactions INTEGER DEFAULT 0,
  doors_knocked INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, date)
);

-- Create index for faster queries by user and date
CREATE INDEX idx_daily_stats_user_date ON daily_stats(user_id, date);

-- Create index for date range queries
CREATE INDEX idx_daily_stats_date ON daily_stats(date);
