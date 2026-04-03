'use client';
import { Word } from '@/types';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Volume2, Trash2, Edit } from 'lucide-react';

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
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-3xl font-bold text-primary">{word.word}</CardTitle>
            <p className="text-muted-foreground text-sm mt-1">{word.pinyin}</p>
          </div>
          <div className="flex flex-col items-end gap-1">
            {isDue && <Badge variant="destructive" className="text-xs">Due</Badge>}
            <Badge variant="outline" className="text-xs">×{word.repetitions}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="font-medium">{word.meaning}</p>
        {word.example && <p className="text-sm text-muted-foreground mt-2 italic">{word.example}</p>}
        {word.note && <p className="text-sm text-muted-foreground mt-1">📝 {word.note}</p>}
        <div className="flex gap-2 mt-4">
          <Button variant="outline" size="sm" onClick={speakWord}>
            <Volume2 className="h-4 w-4 mr-1" /> Play
          </Button>
          {onEdit && (
            <Button variant="outline" size="sm" onClick={() => onEdit(word)}>
              <Edit className="h-4 w-4 mr-1" /> Edit
            </Button>
          )}
          {onDelete && (
            <Button variant="destructive" size="sm" onClick={() => onDelete(word.id)}>
              <Trash2 className="h-4 w-4 mr-1" /> Delete
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
