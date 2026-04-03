'use client';
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Flashcard from '@/components/Flashcard';
import { Loader2, CheckCircle2, Zap } from 'lucide-react';
import { Word } from '@/types';
import { sm2 } from '@/lib/spacedRepetition';

async function fetchDueWords(): Promise<Word[]> {
  const res = await fetch('/api/words');
  if (!res.ok) throw new Error('Failed to fetch words');
  const words: Word[] = await res.json();
  return words.filter(w => new Date(w.next_review) <= new Date());
}

export default function PracticePage() {
  const queryClient = useQueryClient();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sessionComplete, setSessionComplete] = useState(false);

  const { data: dueWords = [], isLoading } = useQuery({
    queryKey: ['due-words'],
    queryFn: fetchDueWords,
  });

  const reviewMutation = useMutation({
    mutationFn: async ({ id, quality, word }: { id: string; quality: number; word: Word }) => {
      const result = sm2(quality, word.repetitions, word.interval, word.ease_factor);
      const res = await fetch(`/api/words/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result),
      });
      if (!res.ok) throw new Error('Failed to update word');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['words'] });
      queryClient.invalidateQueries({ queryKey: ['due-words'] });
    },
  });

  const handleRate = async (quality: number) => {
    const word = dueWords[currentIndex];
    await reviewMutation.mutateAsync({ id: word.id, quality, word });
    
    if (currentIndex + 1 >= dueWords.length) {
      setSessionComplete(true);
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (dueWords.length === 0 || sessionComplete) {
    return (
      <div className="max-w-md mx-auto text-center py-16">
        <div className="w-24 h-24 rounded-3xl bg-emerald-100 flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="h-12 w-12 text-emerald-500" />
        </div>
        <h2 className="text-2xl font-bold mb-2">
          {sessionComplete ? '🎉 Session Complete!' : 'All Caught Up!'}
        </h2>
        <p className="text-muted-foreground mb-6">
          {dueWords.length === 0
            ? 'No cards due for review right now. Check back later!'
            : `Great work! You reviewed ${dueWords.length} card${dueWords.length !== 1 ? 's' : ''}.`}
        </p>
        <button
          onClick={() => { setCurrentIndex(0); setSessionComplete(false); queryClient.invalidateQueries({ queryKey: ['due-words'] }); }}
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-2xl px-6 py-3 transition-colors"
        >
          Check Again
        </button>
      </div>
    );
  }

  const progress = dueWords.length > 0 ? (currentIndex / dueWords.length) * 100 : 0;

  return (
    <div className="space-y-5 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Practice</h1>
          <p className="text-muted-foreground text-sm">Card {currentIndex + 1} of {dueWords.length}</p>
        </div>
        <div className="flex items-center gap-1.5 bg-amber-100 rounded-2xl px-3 py-1.5">
          <Zap className="h-4 w-4 text-amber-600" />
          <span className="text-amber-700 text-sm font-semibold">{dueWords.length} due</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
        <div
          className="h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #dc2626, #f59e0b)' }}
        />
      </div>

      <Flashcard word={dueWords[currentIndex]} onRate={handleRate} />
    </div>
  );
}
