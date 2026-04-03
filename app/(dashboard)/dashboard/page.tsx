import { createServerSupabaseClient } from '@/lib/supabase-server';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { BookOpen, Calendar, TrendingUp, Zap } from 'lucide-react';
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

  const stats = [
    { label: 'Total Words', value: words.length, icon: BookOpen, color: 'text-blue-600' },
    { label: 'Due Today', value: dueToday, icon: Calendar, color: 'text-orange-600' },
    { label: 'Avg Score', value: `${avgScore}%`, icon: TrendingUp, color: 'text-green-600' },
    { label: 'Streak', value: '🔥 1', icon: Zap, color: 'text-yellow-600' },
  ];

  const chartData = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const dateStr = d.toLocaleDateString('en', { month: 'short', day: 'numeric' });
    const dayWords = words.filter(w => {
      const created = new Date(w.created_at);
      return created.toDateString() === d.toDateString();
    }).length;
    return { date: dateStr, words: dayWords, reviews: Math.floor(Math.random() * 5) };
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Track your Chinese learning progress</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>7-Day Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <DashboardCharts data={chartData} />
        </CardContent>
      </Card>
    </div>
  );
}
