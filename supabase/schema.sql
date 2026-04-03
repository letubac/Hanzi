-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Words table
CREATE TABLE IF NOT EXISTS words (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  word TEXT NOT NULL,
  pinyin TEXT NOT NULL,
  meaning TEXT NOT NULL,
  example TEXT,
  note TEXT,
  ease_factor FLOAT DEFAULT 2.5,
  interval INTEGER DEFAULT 1,
  repetitions INTEGER DEFAULT 0,
  next_review TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE words ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can only access their own words"
  ON words FOR ALL
  USING (auth.uid() = user_id);

-- Sentences table
CREATE TABLE IF NOT EXISTS sentences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  sentence TEXT NOT NULL,
  pinyin TEXT NOT NULL,
  meaning TEXT NOT NULL,
  note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE sentences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can only access their own sentences"
  ON sentences FOR ALL
  USING (auth.uid() = user_id);

-- Audio records table
CREATE TABLE IF NOT EXISTS audio_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  word_id UUID REFERENCES words(id) ON DELETE CASCADE,
  audio_url TEXT NOT NULL,
  score FLOAT,
  feedback TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE audio_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can only access their own audio records"
  ON audio_records FOR ALL
  USING (auth.uid() = user_id);

-- Enable realtime for words table
ALTER PUBLICATION supabase_realtime ADD TABLE words;
