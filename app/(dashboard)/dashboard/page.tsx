import { createServerSupabaseClient } from '@/lib/supabase-server';
import Link from 'next/link';
import { BookOpen, MessageSquare, Zap, TrendingUp, Calendar, Flame, Trophy } from 'lucide-react';
import DashboardCharts from './DashboardCharts';

export default async function DashboardPage() {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  const [wordsResult, audioResult] = await Promise.all([
    supabase.from('words').select('*').eq('user_id', user!.id),
    supabase.from('audio_records').select('score').eq('user_id', user!.id),
  ]);

  const words = wordsResult.data || [];
  const audioRecords = audioResult.data || [];

  const now = new Date();
  const dueToday = words.filter(w => new Date(w.next_review) <= now).length;
  const avgScore = audioRecords.length > 0
    ? Math.round(audioRecords.reduce((a: number, r: { score: number }) => a + (r.score || 0), 0) / audioRecords.length)
    : 0;

  const username = user!.email?.split('@')[0] ?? 'Learner';

  const chartData = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const dateStr = d.toLocaleDateString('en', { month: 'short', day: 'numeric' });
    const dayWords = words.filter(w => {
      const created = new Date(w.created_at);
      return created.toDateString() === d.toDateString();
    }).length;
    return { date: dateStr, words: dayWords, reviews: 0 };
  });

  const features = [
    {
      href: '/words',
      icon: BookOpen,
      label: 'Vocabulary',
      sub: `${words.length} words`,
      gradient: 'from-red-500 to-red-600',
      char: '词',
    },
    {
      href: '/sentences',
      icon: MessageSquare,
      label: 'Sentences',
      sub: 'Learn patterns',
      gradient: 'from-amber-500 to-orange-500',
      char: '句',
    },
    {
      href: '/practice',
      icon: Zap,
      label: 'Practice',
      sub: `${dueToday} cards due`,
      gradient: 'from-emerald-500 to-teal-600',
      char: '练',
    },
    {
      href: '/dashboard',
      icon: Trophy,
      label: 'Progress',
      sub: `${avgScore}% avg score`,
      gradient: 'from-violet-500 to-purple-600',
      char: '进',
    },
  ];

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Welcome banner */}
      <div className="relative rounded-3xl overflow-hidden shadow-lg" style={{ background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 60%, #7f1d1d 100%)' }}>
        <div className="absolute right-0 top-0 bottom-0 flex items-center pr-4 select-none pointer-events-none">
          <span className="text-white/10 font-bold" style={{ fontSize: '100px', lineHeight: 1 }}>学</span>
        </div>
        <div className="relative z-10 p-6">
          <p className="text-white/70 text-sm font-medium mb-1">Good day,</p>
          <h1 className="text-2xl font-bold text-white capitalize">{username} 👋</h1>
          <p className="text-white/80 text-sm mt-1">Keep up the great work!</p>
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-1.5 bg-white/15 rounded-2xl px-3 py-1.5">
              <Flame className="h-4 w-4 text-amber-300" />
              <span className="text-white text-sm font-semibold">1 day streak</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/15 rounded-2xl px-3 py-1.5">
              <TrendingUp className="h-4 w-4 text-green-300" />
              <span className="text-white text-sm font-semibold">{avgScore}% score</span>
            </div>
          </div>
        </div>
      </div>

      {/* Today's goal */}
      {dueToday > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 flex items-center justify-center">
              <Calendar className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-amber-900">Review due today</p>
              <p className="text-sm text-amber-700">{dueToday} cards waiting for you</p>
            </div>
          </div>
          <Link
            href="/practice"
            className="bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
          >
            Start →
          </Link>
        </div>
      )}

      {/* Feature cards */}
      <div>
        <h2 className="text-base font-bold text-foreground mb-3">Learning Modules</h2>
        <div className="grid grid-cols-2 gap-3">
          {features.map(({ href, icon: Icon, label, sub, gradient, char }) => (
            <Link
              key={label}
              href={href}
              className={`relative rounded-2xl p-4 bg-gradient-to-br ${gradient} text-white shadow-md overflow-hidden hover:scale-[1.02] transition-transform active:scale-[0.98]`}
            >
              <div className="absolute bottom-0 right-1 select-none pointer-events-none">
                <span className="text-white/15 font-bold" style={{ fontSize: '56px', lineHeight: 1 }}>{char}</span>
              </div>
              <div className="relative z-10">
                <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center mb-3">
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <p className="font-bold text-sm">{label}</p>
                <p className="text-white/75 text-xs mt-0.5">{sub}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { value: words.length, label: 'Total Words', color: 'text-red-600' },
          { value: dueToday, label: 'Due Today', color: 'text-amber-600' },
          { value: `${avgScore}%`, label: 'Avg Score', color: 'text-emerald-600' },
        ].map(({ value, label, color }) => (
          <div key={label} className="bg-card rounded-2xl p-3 text-center shadow-sm border border-border">
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* 7-day progress chart */}
      <div className="bg-card rounded-2xl p-4 shadow-sm border border-border">
        <h2 className="font-bold text-sm mb-4">7-Day Progress</h2>
        <DashboardCharts data={chartData} />
      </div>
    </div>
  );
}
