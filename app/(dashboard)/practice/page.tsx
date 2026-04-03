'use client';
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Flashcard from '@/components/Flashcard';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle2 } from 'lucide-react';
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
    return <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  if (dueWords.length === 0 || sessionComplete) {
    return (
      <div className="text-center py-20">
        <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">All Done! 🎉</h2>
        <p className="text-muted-foreground mb-6">
          {dueWords.length === 0 ? "No cards due for review right now." : `Great job! You reviewed ${dueWords.length} cards.`}
        </p>
        <Button onClick={() => { setCurrentIndex(0); setSessionComplete(false); queryClient.invalidateQueries({ queryKey: ['due-words'] }); }}>
          Check Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Practice</h1>
        <p className="text-muted-foreground">
          Card {currentIndex + 1} of {dueWords.length} due today
        </p>
      </div>
      
      <div className="w-full bg-muted rounded-full h-2 mb-6">
        <div
          className="bg-primary h-2 rounded-full transition-all"
          style={{ width: `${dueWords.length > 0 ? (currentIndex / dueWords.length) * 100 : 0}%` }}
        />
      </div>

      <Flashcard word={dueWords[currentIndex]} onRate={handleRate} />
    </div>
  );
}
