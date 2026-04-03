'use client';
import { Word } from '@/types';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Volume2, Trash2, Edit, Clock } from 'lucide-react';

interface WordCardProps {
  word: Word;
  onDelete?: (id: string) => void;
  onEdit?: (word: Word) => void;
}

export default function WordCard({ word, onDelete, onEdit }: WordCardProps) {
  const speakWord = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word.word);
      utterance.lang = 'zh-CN';
      window.speechSynthesis.speak(utterance);
    }
  };

  const isDue = new Date(word.next_review) <= new Date();

  return (
    <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-3xl font-bold text-primary leading-tight">{word.word}</span>
              {isDue && (
                <Badge variant="destructive" className="text-[10px] font-semibold rounded-full px-2">
                  <Clock className="h-2.5 w-2.5 mr-0.5" />Due
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground text-sm mt-0.5">{word.pinyin}</p>
          </div>
          <div className="flex items-center gap-1.5 ml-2 shrink-0">
            <button
              onClick={speakWord}
              className="w-8 h-8 rounded-xl bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors"
            >
              <Volume2 className="h-4 w-4 text-primary" />
            </button>
          </div>
        </div>

        <p className="font-semibold text-foreground text-sm">{word.meaning}</p>
        {word.example && (
          <p className="text-xs text-muted-foreground mt-1.5 italic bg-muted rounded-lg px-2.5 py-1.5">
            {word.example}
          </p>
        )}
        {word.note && (
          <p className="text-xs text-muted-foreground mt-1.5">📝 {word.note}</p>
        )}
      </div>

      <div className="border-t border-border px-4 py-2.5 flex items-center justify-between bg-muted/30">
        <span className="text-xs text-muted-foreground">Rep ×{word.repetitions}</span>
        <div className="flex gap-1.5">
          {onEdit && (
            <Button variant="ghost" size="sm" onClick={() => onEdit(word)} className="h-7 px-2.5 text-xs rounded-lg">
              <Edit className="h-3 w-3 mr-1" />Edit
            </Button>
          )}
          {onDelete && (
            <Button variant="ghost" size="sm" onClick={() => onDelete(word.id)} className="h-7 px-2.5 text-xs rounded-lg text-destructive hover:text-destructive hover:bg-destructive/10">
              <Trash2 className="h-3 w-3 mr-1" />Delete
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
