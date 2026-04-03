'use client';
import { useState } from 'react';
import { Word } from '@/types';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Volume2, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FlashcardProps {
  word: Word;
  onRate: (quality: number) => void;
}

export default function Flashcard({ word, onRate }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const speakWord = (e: React.MouseEvent) => {
    e.stopPropagation();
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word.word);
      utterance.lang = 'zh-CN';
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <div
        className="relative cursor-pointer"
        style={{ perspective: '1000px' }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div
          className={cn(
            "relative w-full transition-all duration-500",
            isFlipped ? "[transform:rotateY(180deg)]" : ""
          )}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Front */}
          <Card className="p-8 text-center min-h-[200px] flex flex-col items-center justify-center" style={{ backfaceVisibility: 'hidden' }}>
            <p className="text-6xl font-bold text-primary mb-3">{word.word}</p>
            <p className="text-xl text-muted-foreground">{word.pinyin}</p>
            <Button variant="ghost" size="sm" onClick={speakWord} className="mt-4">
              <Volume2 className="h-4 w-4 mr-1" /> Listen
            </Button>
            <p className="text-sm text-muted-foreground mt-4">Click to reveal</p>
          </Card>
          {/* Back */}
          <Card
            className="absolute inset-0 p-8 text-center flex flex-col items-center justify-center"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <p className="text-3xl font-bold text-primary mb-2">{word.word}</p>
            <p className="text-lg text-muted-foreground mb-3">{word.pinyin}</p>
            <p className="text-xl font-medium mb-2">{word.meaning}</p>
            {word.example && <p className="text-sm text-muted-foreground italic">{word.example}</p>}
          </Card>
        </div>
      </div>

      {isFlipped && (
        <div className="mt-6 flex gap-3 justify-center flex-wrap">
          <Button variant="destructive" onClick={() => { setIsFlipped(false); onRate(0); }}>
            <RotateCcw className="h-4 w-4 mr-1" /> Again
          </Button>
          <Button variant="outline" onClick={() => { setIsFlipped(false); onRate(1); }}>Hard</Button>
          <Button onClick={() => { setIsFlipped(false); onRate(3); }}>Good</Button>
          <Button variant="secondary" onClick={() => { setIsFlipped(false); onRate(5); }}>Easy</Button>
        </div>
      )}
    </div>
  );
}
