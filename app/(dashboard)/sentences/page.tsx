'use client';
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Plus, Loader2, Trash2, Volume2 } from 'lucide-react';
import { Sentence } from '@/types';

async function fetchSentences(): Promise<Sentence[]> {
  const res = await fetch('/api/sentences');
  if (!res.ok) throw new Error('Failed to fetch sentences');
  return res.json();
}

export default function SentencesPage() {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ sentence: '', pinyin: '', meaning: '', note: '' });

  const { data: sentences = [], isLoading } = useQuery({
    queryKey: ['sentences'],
    queryFn: fetchSentences,
  });

  const addMutation = useMutation({
    mutationFn: async (data: typeof form) => {
      const res = await fetch('/api/sentences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to add sentence');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sentences'] });
      setForm({ sentence: '', pinyin: '', meaning: '', note: '' });
      setShowForm(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/sentences/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete sentence');
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['sentences'] }),
  });

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'zh-CN';
      window.speechSynthesis.speak(u);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold">Sentences</h1>
          <p className="text-muted-foreground">{sentences.length} sentences saved</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="h-4 w-4 mr-1" /> Add Sentence
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader><CardTitle>Add New Sentence</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={(e) => { e.preventDefault(); addMutation.mutate(form); }} className="space-y-3">
              <Input placeholder="Chinese sentence" value={form.sentence} onChange={e => setForm(f => ({...f, sentence: e.target.value}))} required />
              <Input placeholder="Pinyin" value={form.pinyin} onChange={e => setForm(f => ({...f, pinyin: e.target.value}))} required />
              <Input placeholder="Meaning" value={form.meaning} onChange={e => setForm(f => ({...f, meaning: e.target.value}))} required />
              <Input placeholder="Note (optional)" value={form.note} onChange={e => setForm(f => ({...f, note: e.target.value}))} />
              <div className="flex gap-2">
                <Button type="submit" disabled={addMutation.isPending}>
                  {addMutation.isPending && <Loader2 className="h-4 w-4 animate-spin mr-1" />}
                  Add Sentence
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {isLoading ? (
        <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>
      ) : sentences.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">No sentences yet. Add your first sentence!</div>
      ) : (
        <div className="space-y-4">
          {sentences.map(s => (
            <Card key={s.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-2xl font-bold text-primary">{s.sentence}</p>
                    <p className="text-muted-foreground mt-1">{s.pinyin}</p>
                    <p className="font-medium mt-2">{s.meaning}</p>
                    {s.note && <p className="text-sm text-muted-foreground mt-1">📝 {s.note}</p>}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={() => speak(s.sentence)}>
                      <Volume2 className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="icon" onClick={() => deleteMutation.mutate(s.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
