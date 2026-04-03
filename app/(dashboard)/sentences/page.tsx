'use client';
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Loader2, Trash2, Volume2, MessageSquare } from 'lucide-react';
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
    <div className="space-y-5 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Sentences</h1>
          <p className="text-muted-foreground text-sm">{sentences.length} sentences saved</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-1.5 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-2xl px-4 py-2.5 text-sm transition-colors shadow-sm"
        >
          <Plus className="h-4 w-4" /> Add Sentence
        </button>
      </div>

      {/* Add form */}
      {showForm && (
        <div className="bg-card rounded-2xl border border-border shadow-sm p-5">
          <h2 className="font-bold mb-4">Add New Sentence</h2>
          <form
            onSubmit={(e) => { e.preventDefault(); addMutation.mutate(form); }}
            className="space-y-3"
          >
            <Input placeholder="Chinese sentence" value={form.sentence} onChange={e => setForm(f => ({...f, sentence: e.target.value}))} required className="rounded-xl" />
            <Input placeholder="Pinyin" value={form.pinyin} onChange={e => setForm(f => ({...f, pinyin: e.target.value}))} required className="rounded-xl" />
            <Input placeholder="Meaning" value={form.meaning} onChange={e => setForm(f => ({...f, meaning: e.target.value}))} required className="rounded-xl" />
            <Input placeholder="Note (optional)" value={form.note} onChange={e => setForm(f => ({...f, note: e.target.value}))} className="rounded-xl" />
            <div className="flex gap-2">
              <Button type="submit" disabled={addMutation.isPending} className="rounded-xl">
                {addMutation.isPending && <Loader2 className="h-4 w-4 animate-spin mr-1" />}
                Add Sentence
              </Button>
              <Button type="button" variant="outline" onClick={() => setShowForm(false)} className="rounded-xl">Cancel</Button>
            </div>
          </form>
        </div>
      )}

      {/* List */}
      {isLoading ? (
        <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>
      ) : sentences.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-30" />
          <p className="font-medium">No sentences yet</p>
          <p className="text-sm mt-1">Add your first sentence to get started!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {sentences.map(s => (
            <div key={s.id} className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
              <div className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-2xl font-bold text-primary leading-tight">{s.sentence}</p>
                    <p className="text-muted-foreground text-sm mt-1">{s.pinyin}</p>
                    <p className="font-semibold text-sm mt-2">{s.meaning}</p>
                    {s.note && <p className="text-xs text-muted-foreground mt-1.5 bg-muted rounded-lg px-2.5 py-1.5">📝 {s.note}</p>}
                  </div>
                  <div className="flex flex-col gap-1.5 shrink-0">
                    <button
                      onClick={() => speak(s.sentence)}
                      className="w-9 h-9 rounded-xl bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors"
                    >
                      <Volume2 className="h-4 w-4 text-primary" />
                    </button>
                    <button
                      onClick={() => deleteMutation.mutate(s.id)}
                      className="w-9 h-9 rounded-xl bg-red-50 hover:bg-red-100 flex items-center justify-center transition-colors"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
