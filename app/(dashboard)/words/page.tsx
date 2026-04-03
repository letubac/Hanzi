'use client';
import { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRealtimeWords } from '@/hooks/useRealtimeWords';
import { createClient } from '@/lib/supabase';
import WordCard from '@/components/WordCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Loader2, X, BookOpen } from 'lucide-react';
import { Word } from '@/types';

async function fetchWords(): Promise<Word[]> {
  const res = await fetch('/api/words');
  if (!res.ok) throw new Error('Failed to fetch words');
  return res.json();
}

export default function WordsPage() {
  const queryClient = useQueryClient();
  const [userId, setUserId] = useState<string | undefined>();
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ word: '', pinyin: '', meaning: '', example: '', note: '' });
  const [editingWord, setEditingWord] = useState<Word | null>(null);
  const [filterDue, setFilterDue] = useState(false);

  useEffect(() => {
    const client = createClient();
    client.auth.getUser().then(({ data }) => setUserId(data.user?.id));
  }, []);

  useRealtimeWords(userId);

  const { data: words = [], isLoading } = useQuery({
    queryKey: ['words'],
    queryFn: fetchWords,
  });

  const addMutation = useMutation({
    mutationFn: async (data: typeof form) => {
      const res = await fetch('/api/words', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to add word');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['words'] });
      setForm({ word: '', pinyin: '', meaning: '', example: '', note: '' });
      setShowForm(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Word> }) => {
      const res = await fetch(`/api/words/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to update word');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['words'] });
      setEditingWord(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/words/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete word');
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['words'] }),
  });

  const filtered = words.filter(w => {
    const q = search.toLowerCase();
    const matchSearch = !q || w.word.includes(q) || w.pinyin.toLowerCase().includes(q) || w.meaning.toLowerCase().includes(q);
    const matchDue = !filterDue || new Date(w.next_review) <= new Date();
    return matchSearch && matchDue;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingWord) {
      updateMutation.mutate({ id: editingWord.id, data: form });
    } else {
      addMutation.mutate(form);
    }
  };

  const handleEdit = (word: Word) => {
    setEditingWord(word);
    setForm({ word: word.word, pinyin: word.pinyin, meaning: word.meaning, example: word.example || '', note: word.note || '' });
    setShowForm(true);
  };

  return (
    <div className="space-y-5 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Vocabulary</h1>
          <p className="text-muted-foreground text-sm">{words.length} words saved</p>
        </div>
        <button
          onClick={() => { setShowForm(!showForm); setEditingWord(null); setForm({ word: '', pinyin: '', meaning: '', example: '', note: '' }); }}
          className="flex items-center gap-1.5 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-2xl px-4 py-2.5 text-sm transition-colors shadow-sm"
        >
          <Plus className="h-4 w-4" /> Add Word
        </button>
      </div>

      {/* Add/Edit form */}
      {showForm && (
        <div className="bg-card rounded-2xl border border-border shadow-sm p-5">
          <h2 className="font-bold mb-4">{editingWord ? 'Edit Word' : 'Add New Word'}</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input placeholder="Chinese word (e.g. 你好)" value={form.word} onChange={e => setForm(f => ({...f, word: e.target.value}))} required className="rounded-xl" />
            <Input placeholder="Pinyin (e.g. nǐ hǎo)" value={form.pinyin} onChange={e => setForm(f => ({...f, pinyin: e.target.value}))} required className="rounded-xl" />
            <Input placeholder="Meaning (e.g. Hello)" value={form.meaning} onChange={e => setForm(f => ({...f, meaning: e.target.value}))} required className="rounded-xl" />
            <Input placeholder="Example sentence (optional)" value={form.example} onChange={e => setForm(f => ({...f, example: e.target.value}))} className="rounded-xl" />
            <Input placeholder="Note (optional)" value={form.note} onChange={e => setForm(f => ({...f, note: e.target.value}))} className="sm:col-span-2 rounded-xl" />
            <div className="sm:col-span-2 flex gap-2">
              <Button type="submit" disabled={addMutation.isPending || updateMutation.isPending} className="rounded-xl">
                {(addMutation.isPending || updateMutation.isPending) && <Loader2 className="h-4 w-4 animate-spin mr-1" />}
                {editingWord ? 'Update' : 'Add Word'}
              </Button>
              <Button type="button" variant="outline" onClick={() => setShowForm(false)} className="rounded-xl">Cancel</Button>
            </div>
          </form>
        </div>
      )}

      {/* Search + filter */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search words..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9 rounded-xl"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2">
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
        </div>
        <button
          onClick={() => setFilterDue(!filterDue)}
          className={`px-3.5 py-2 rounded-xl text-sm font-semibold border transition-colors ${
            filterDue
              ? 'bg-primary text-primary-foreground border-primary'
              : 'bg-card text-foreground border-border hover:bg-muted'
          }`}
        >
          Due Today
        </button>
      </div>

      {/* Words list */}
      {isLoading ? (
        <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <BookOpen className="h-12 w-12 mx-auto mb-3 opacity-30" />
          <p className="font-medium">{words.length === 0 ? 'No words yet' : 'No matching words'}</p>
          <p className="text-sm mt-1">{words.length === 0 ? 'Add your first word to get started!' : 'Try a different search.'}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filtered.map(word => (
            <WordCard key={word.id} word={word} onDelete={(id) => deleteMutation.mutate(id)} onEdit={handleEdit} />
          ))}
        </div>
      )}
    </div>
  );
}
