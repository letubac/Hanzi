'use client';
import { useState } from 'react';
import { Button } from './ui/button';
import { Play, Pause } from 'lucide-react';

interface AudioPlayerProps {
  src: string;
}

export default function AudioPlayer({ src }: AudioPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const [audio] = useState(() => typeof window !== 'undefined' ? new Audio(src) : null);

  const toggle = () => {
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      audio.play();
    }
    setPlaying(!playing);
    audio.onended = () => setPlaying(false);
  };

  return (
    <Button variant="ghost" size="sm" onClick={toggle}>
      {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
    </Button>
  );
}
