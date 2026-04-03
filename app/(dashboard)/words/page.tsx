'use client';
import { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRealtimeWords } from '@/hooks/useRealtimeWords';
import { createClient } from '@/lib/supabase';
import WordCard from '@/components/WordCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Plus, Search, Loader2, X } from 'lucide-react';
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
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold">Vocabulary</h1>
          <p className="text-muted-foreground">{words.length} words saved</p>
        </div>
        <Button onClick={() => { setShowForm(!showForm); setEditingWord(null); setForm({ word: '', pinyin: '', meaning: '', example: '', note: '' }); }}>
          <Plus className="h-4 w-4 mr-1" /> Add Word
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingWord ? 'Edit Word' : 'Add New Word'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input placeholder="Chinese word (e.g. 你好)" value={form.word} onChange={e => setForm(f => ({...f, word: e.target.value}))} required />
              <Input placeholder="Pinyin (e.g. nǐ hǎo)" value={form.pinyin} onChange={e => setForm(f => ({...f, pinyin: e.target.value}))} required />
              <Input placeholder="Meaning (e.g. Hello)" value={form.meaning} onChange={e => setForm(f => ({...f, meaning: e.target.value}))} required />
              <Input placeholder="Example sentence (optional)" value={form.example} onChange={e => setForm(f => ({...f, example: e.target.value}))} />
              <Input placeholder="Note (optional)" value={form.note} onChange={e => setForm(f => ({...f, note: e.target.value}))} className="sm:col-span-2" />
              <div className="sm:col-span-2 flex gap-2">
                <Button type="submit" disabled={addMutation.isPending || updateMutation.isPending}>
                  {(addMutation.isPending || updateMutation.isPending) && <Loader2 className="h-4 w-4 animate-spin mr-1" />}
                  {editingWord ? 'Update' : 'Add Word'}
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search words..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
          {search && <button onClick={() => setSearch('')} className="absolute right-3 top-3"><X className="h-4 w-4 text-muted-foreground" /></button>}
        </div>
        <Button variant={filterDue ? 'default' : 'outline'} onClick={() => setFilterDue(!filterDue)}>
          Due Today
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          {words.length === 0 ? "No words yet. Add your first word!" : "No matching words found."}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(word => (
            <WordCard key={word.id} word={word} onDelete={(id) => deleteMutation.mutate(id)} onEdit={handleEdit} />
          ))}
        </div>
      )}
    </div>
  );
}
