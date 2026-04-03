'use client';
import { useState } from 'react';
import { Word } from '@/types';
import { Volume2, RotateCcw, ChevronDown } from 'lucide-react';
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
    <div className="w-full max-w-md mx-auto space-y-4">
      {/* Card */}
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
          <div
            className="w-full rounded-3xl shadow-lg overflow-hidden"
            style={{ backfaceVisibility: 'hidden', background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)' }}
          >
            <div className="p-8 text-center min-h-[240px] flex flex-col items-center justify-center relative">
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/2" />
              <p className="text-7xl font-bold text-white relative z-10 mb-2">{word.word}</p>
              <p className="text-white/80 text-lg relative z-10">{word.pinyin}</p>
              <button
                onClick={speakWord}
                className="mt-4 flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white rounded-full px-4 py-1.5 text-sm transition-colors relative z-10"
              >
                <Volume2 className="h-4 w-4" /> Listen
              </button>
              <div className="flex items-center gap-1 mt-6 text-white/60 text-sm relative z-10">
                <ChevronDown className="h-4 w-4" />
                <span>Tap to reveal</span>
              </div>
            </div>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 rounded-3xl shadow-lg bg-card"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <div className="p-8 text-center min-h-[240px] flex flex-col items-center justify-center">
              <p className="text-4xl font-bold text-primary mb-1">{word.word}</p>
              <p className="text-muted-foreground mb-4">{word.pinyin}</p>
              <div className="w-12 h-0.5 bg-border mb-4 rounded" />
              <p className="text-xl font-semibold text-foreground">{word.meaning}</p>
              {word.example && (
                <p className="text-sm text-muted-foreground mt-3 italic bg-muted rounded-xl px-4 py-2">
                  {word.example}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Rating buttons */}
      {isFlipped && (
        <div className="space-y-3">
          <p className="text-center text-sm text-muted-foreground font-medium">How well did you know this?</p>
          <div className="grid grid-cols-4 gap-2">
            {[
              { label: 'Again', quality: 0, style: 'bg-red-500 hover:bg-red-600 text-white', icon: <RotateCcw className="h-3.5 w-3.5" /> },
              { label: 'Hard', quality: 1, style: 'bg-orange-100 hover:bg-orange-200 text-orange-700 border border-orange-200' },
              { label: 'Good', quality: 3, style: 'bg-emerald-500 hover:bg-emerald-600 text-white' },
              { label: 'Easy', quality: 5, style: 'bg-blue-500 hover:bg-blue-600 text-white' },
            ].map(({ label, quality, style, icon }) => (
              <button
                key={label}
                onClick={() => { setIsFlipped(false); onRate(quality); }}
                className={`flex items-center justify-center gap-1 rounded-2xl py-3 text-sm font-semibold transition-colors ${style}`}
              >
                {icon}
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
