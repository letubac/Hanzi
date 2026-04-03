import { createClient } from './supabase';
import { RealtimeChannel } from '@supabase/supabase-js';
import { Word } from '@/types';

export function subscribeToWords(
  userId: string,
  onInsert: (word: Partial<Word>) => void,
  onUpdate: (word: Partial<Word>) => void,
  onDelete: (word: Partial<Word>) => void
): RealtimeChannel {
  const supabase = createClient();
  
  return supabase
    .channel('words-changes')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'words', filter: `user_id=eq.${userId}` },
      (payload) => onInsert(payload.new)
    )
    .on(
      'postgres_changes',
      { event: 'UPDATE', schema: 'public', table: 'words', filter: `user_id=eq.${userId}` },
      (payload) => onUpdate(payload.new)
    )
    .on(
      'postgres_changes',
      { event: 'DELETE', schema: 'public', table: 'words', filter: `user_id=eq.${userId}` },
      (payload) => onDelete(payload.old)
    )
    .subscribe();
}
