export interface Word {
  id: string;
  user_id: string;
  word: string;
  pinyin: string;
  meaning: string;
  example?: string;
  note?: string;
  ease_factor: number;
  interval: number;
  repetitions: number;
  next_review: string;
  created_at: string;
}

export interface AudioRecord {
  id: string;
  user_id: string;
  word_id: string;
  audio_url: string;
  score: number;
  feedback: string;
  created_at: string;
}

export interface Sentence {
  id: string;
  user_id: string;
  sentence: string;
  pinyin: string;
  meaning: string;
  note?: string;
  created_at: string;
}

export interface DashboardStats {
  totalWords: number;
  dueToday: number;
  accuracyRate: number;
  streak: number;
}
