'use client';
import { useRecorder } from '@/hooks/useRecorder';
import { Button } from './ui/button';
import { Mic, MicOff, RotateCcw, Upload } from 'lucide-react';

interface RecorderProps {
  onUpload?: (blob: Blob, audioUrl: string) => void;
}

export default function Recorder({ onUpload }: RecorderProps) {
  const { isRecording, audioBlob, audioUrl, startRecording, stopRecording, resetRecording } = useRecorder();

  const handleUpload = () => {
    if (audioBlob && audioUrl && onUpload) {
      onUpload(audioBlob, audioUrl);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2 flex-wrap">
        {!isRecording ? (
          <Button variant="outline" size="sm" onClick={startRecording} disabled={!!audioBlob}>
            <Mic className="h-4 w-4 mr-1" /> Record
          </Button>
        ) : (
          <Button variant="destructive" size="sm" onClick={stopRecording}>
            <MicOff className="h-4 w-4 mr-1" /> Stop
          </Button>
        )}
        {audioBlob && (
          <>
            <Button variant="ghost" size="sm" onClick={resetRecording}>
              <RotateCcw className="h-4 w-4 mr-1" /> Reset
            </Button>
            {onUpload && (
              <Button size="sm" onClick={handleUpload}>
                <Upload className="h-4 w-4 mr-1" /> Upload
              </Button>
            )}
          </>
        )}
      </div>
      {audioUrl && (
        <audio controls src={audioUrl} className="w-full h-10">
          Your browser does not support audio.
        </audio>
      )}
    </div>
  );
}
