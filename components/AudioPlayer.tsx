'use client';
import { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Play, Pause } from 'lucide-react';

interface AudioPlayerProps {
  src: string;
}

export default function AudioPlayer({ src }: AudioPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = typeof window !== 'undefined' ? new Audio(src) : null;
    audioRef.current = audio;
    if (audio) {
      audio.onended = () => setPlaying(false);
    }
    return () => {
      audio?.pause();
      audioRef.current = null;
    };
  }, [src]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      audio.play();
    }
    setPlaying(!playing);
  };

  return (
    <Button variant="ghost" size="sm" onClick={toggle}>
      {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
    </Button>
  );
}
