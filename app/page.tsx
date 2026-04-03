import { createServerSupabaseClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { BookOpen, MessageSquare, Zap, Trophy, Star, CheckCircle, ChevronRight, Globe } from 'lucide-react';

export default async function Home() {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    redirect('/dashboard');
  }

  const features = [
    {
      icon: BookOpen,
      title: 'Smart Vocabulary',
      description: 'Build your Chinese vocabulary with AI-powered spaced repetition that adapts to your learning pace.',
      char: '词',
      color: '#00C8D4',
    },
    {
      icon: MessageSquare,
      title: 'Sentence Patterns',
      description: 'Master grammar through real-world sentences and contextual examples used in everyday Chinese.',
      char: '句',
      color: '#4FD1C5',
    },
    {
      icon: Zap,
      title: 'Pronunciation AI',
      description: 'Get instant feedback on your tones and pronunciation with our advanced speech recognition engine.',
      char: '音',
      color: '#22D3EE',
    },
    {
      icon: Trophy,
      title: 'Progress Tracking',
      description: 'Visualise your journey with detailed analytics, streaks, and personalised study plans.',
      char: '进',
      color: '#67E8F9',
    },
  ];

  const steps = [
    { num: '01', title: 'Create an account', desc: 'Sign up for free in under 30 seconds.' },
    { num: '02', title: 'Add your words', desc: 'Import vocabulary or start with our curated HSK lists.' },
    { num: '03', title: 'Practice daily', desc: 'Review flashcards and record your pronunciation each day.' },
    { num: '04', title: 'Track progress', desc: 'Watch your scores climb and your Chinese confidence soar.' },
  ];

  const stats = [
    { value: '10,000+', label: 'Active Learners' },
    { value: '500k+', label: 'Words Learned' },
    { value: '95%', label: 'Retention Rate' },
    { value: '4.9★', label: 'User Rating' },
  ];

  return (
    <div className="min-h-screen" style={{ background: '#081628' }}>

      {/* ───────── NAVBAR ───────── */}
      <header className="sticky top-0 z-50 border-b border-white/10 backdrop-blur-md" style={{ background: 'rgba(8,22,40,0.85)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white">
            <span className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-lg"
              style={{ background: 'linear-gradient(135deg,#00C8D4,#0891B2)' }}>
              汉
            </span>
            <span>SuperHanzi</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm text-white/70">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#how" className="hover:text-white transition-colors">How it works</a>
            <a href="#stats" className="hover:text-white transition-colors">Stats</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login" className="hidden sm:block text-sm text-white/80 hover:text-white px-4 py-2 rounded-xl border border-white/20 hover:border-white/40 transition-all">
              Sign In
            </Link>
            <Link href="/register"
              className="text-sm font-semibold px-4 py-2 rounded-xl text-white transition-all hover:opacity-90"
              style={{ background: 'linear-gradient(135deg,#00C8D4,#0891B2)' }}>
              Get Started Free
            </Link>
          </div>
        </div>
      </header>

      {/* ───────── HERO ───────── */}
      <section className="relative overflow-hidden pt-20 pb-28 px-4">
        {/* Decorative blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full opacity-20 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse,#00C8D4 0%,transparent 70%)', filter: 'blur(60px)' }} />
        {/* Floating Chinese characters */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
          {['汉','字','语','学','中','文','词','句','音','读'].map((char, i) => (
            <span key={i} className="absolute font-bold"
              style={{
                color: `rgba(0,200,212,${0.03 + (i % 4) * 0.02})`,
                fontSize: `${90 + (i % 3) * 50}px`,
                top: `${(i * 19 + 5) % 85}%`,
                left: `${(i * 27 + 4) % 88}%`,
                transform: `rotate(${(i % 2 === 0 ? 1 : -1) * (i * 8 % 18)}deg)`,
              }}>{char}</span>
          ))}
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-cyan-300 text-sm px-4 py-1.5 rounded-full mb-8 backdrop-blur-sm">
            <Globe className="h-3.5 w-3.5" />
            <span>The #1 Chinese Learning Super App</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6">
            Learn Chinese<br />
            <span style={{ background: 'linear-gradient(90deg,#00C8D4,#67E8F9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              the Super Way
            </span>
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
            Master Mandarin with AI-powered flashcards, pronunciation scoring, and spaced repetition — all in one beautifully designed app.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-bold text-white shadow-lg hover:opacity-90 transition-all"
              style={{ background: 'linear-gradient(135deg,#00C8D4,#0891B2)', boxShadow: '0 0 40px rgba(0,200,212,0.35)' }}>
              Start Learning Free
              <ChevronRight className="h-5 w-5" />
            </Link>
            <Link href="/login"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold text-white/80 border border-white/20 hover:border-white/40 hover:text-white transition-all backdrop-blur-sm">
              Sign In
            </Link>
          </div>

          {/* Social proof */}
          <div className="mt-12 flex items-center justify-center gap-2">
            <div className="flex -space-x-2">
              {['#00C8D4','#4FD1C5','#22D3EE','#67E8F9','#0891B2'].map((c, i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-[#081628] flex items-center justify-center text-xs font-bold text-white"
                  style={{ background: c }}>
                  {['李','王','张','陈','刘'][i]}
                </div>
              ))}
            </div>
            <p className="text-sm text-white/50 ml-2">
              Joined by <span className="text-white/80 font-semibold">10,000+</span> learners worldwide
            </p>
          </div>
        </div>

        {/* Preview card */}
        <div className="relative z-10 max-w-lg mx-auto mt-16">
          <div className="rounded-3xl p-6 border border-white/10 backdrop-blur-md shadow-2xl"
            style={{ background: 'rgba(15,37,64,0.8)' }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 rounded-full bg-red-400" />
              <div className="w-2 h-2 rounded-full bg-yellow-400" />
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span className="ml-2 text-white/40 text-xs">SuperHanzi — Flashcard</span>
            </div>
            <div className="text-center py-6">
              <p className="text-white/40 text-xs mb-2">What does this mean?</p>
              <p className="text-6xl font-bold text-white mb-2" style={{ textShadow: '0 0 30px rgba(0,200,212,0.5)' }}>学习</p>
              <p className="text-cyan-300 text-sm">xuéxí</p>
            </div>
            <div className="flex gap-3 mt-4">
              <button className="flex-1 py-3 rounded-2xl text-sm font-semibold text-white border border-white/20 hover:bg-white/10 transition-colors">
                Again
              </button>
              <button className="flex-1 py-3 rounded-2xl text-sm font-semibold text-white transition-colors"
                style={{ background: 'linear-gradient(135deg,#00C8D4,#0891B2)' }}>
                To learn ✓
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── STATS ───────── */}
      <section id="stats" className="py-16 border-y border-white/10" style={{ background: 'rgba(15,37,64,0.5)' }}>
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="text-3xl sm:text-4xl font-extrabold mb-1"
                style={{ background: 'linear-gradient(90deg,#00C8D4,#67E8F9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {value}
              </p>
              <p className="text-white/50 text-sm">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ───────── FEATURES ───────── */}
      <section id="features" className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-3">Everything you need</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Powerful features for<br />faster learning</h2>
            <p className="text-white/50 max-w-xl mx-auto">SuperHanzi combines the best learning science with modern technology to help you reach fluency faster than ever before.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {features.map(({ icon: Icon, title, description, char, color }) => (
              <div key={title}
                className="relative rounded-3xl p-6 border border-white/10 overflow-hidden group hover:border-cyan-500/30 transition-all"
                style={{ background: 'rgba(15,37,64,0.6)' }}>
                <div className="absolute right-4 bottom-2 select-none pointer-events-none text-[80px] font-bold leading-none"
                  style={{ color: `${color}18` }}>
                  {char}
                </div>
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                    style={{ background: `${color}22`, border: `1px solid ${color}44` }}>
                    <Icon className="h-6 w-6" style={{ color }} />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
                  <p className="text-white/55 text-sm leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── HOW IT WORKS ───────── */}
      <section id="how" className="py-24 px-4" style={{ background: 'rgba(15,37,64,0.4)' }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-3">Simple process</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">How it works</h2>
            <p className="text-white/50 max-w-xl mx-auto">Get from zero to conversational Chinese in four simple steps.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {steps.map(({ num, title, desc }) => (
              <div key={num} className="flex gap-5 p-6 rounded-3xl border border-white/10 hover:border-cyan-500/30 transition-all"
                style={{ background: 'rgba(15,37,64,0.6)' }}>
                <div className="shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-extrabold"
                  style={{ background: 'linear-gradient(135deg,#00C8D420,#0891B220)', border: '1px solid #00C8D440', color: '#00C8D4' }}>
                  {num}
                </div>
                <div>
                  <h3 className="text-white font-bold mb-1">{title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── WHY CHOOSE ───────── */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-3">Why SuperHanzi</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6 leading-tight">
              The smarter way<br />to learn Chinese
            </h2>
            <ul className="space-y-4">
              {[
                'AI pronunciation scoring with instant tone feedback',
                'Spaced repetition optimised for long-term retention',
                'HSK 1–6 vocabulary lists built in',
                'Offline support — study anywhere, anytime',
                'Dark-mode friendly interface built for focus',
              ].map(item => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 shrink-0 mt-0.5" style={{ color: '#00C8D4' }} />
                  <span className="text-white/70 text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl p-8 border border-white/10 text-center"
            style={{ background: 'rgba(15,37,64,0.6)' }}>
            <div className="text-8xl font-bold text-white mb-4" style={{ textShadow: '0 0 60px rgba(0,200,212,0.4)' }}>中文</div>
            <div className="grid grid-cols-3 gap-3 mt-6">
              {[
                { label: 'Words', val: '词' },
                { label: 'Tones', val: '声' },
                { label: 'Score', val: '分' },
              ].map(({ label, val }) => (
                <div key={label} className="rounded-2xl p-3 border border-white/10" style={{ background: 'rgba(0,200,212,0.08)' }}>
                  <p className="text-2xl font-bold text-cyan-300">{val}</p>
                  <p className="text-white/40 text-xs mt-1">{label}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center justify-center gap-1">
              {[1,2,3,4,5].map(s => <Star key={s} className="h-5 w-5 fill-current" style={{ color: '#F59E0B' }} />)}
            </div>
            <p className="text-white/50 text-sm mt-2">"SuperHanzi changed how I study Chinese!"</p>
          </div>
        </div>
      </section>

      {/* ───────── CTA ───────── */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto relative rounded-3xl overflow-hidden text-center p-12"
          style={{ background: 'linear-gradient(135deg,#0F4C6E 0%,#0A2744 50%,#071628 100%)', border: '1px solid rgba(0,200,212,0.25)' }}>
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at top,rgba(0,200,212,0.15) 0%,transparent 70%)' }} />
          <div className="relative z-10">
            <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-4">Start today</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Ready to speak Chinese?
            </h2>
            <p className="text-white/55 mb-8 max-w-md mx-auto">
              Join thousands of learners and start your Chinese journey for free. No credit card required.
            </p>
            <Link href="/register"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-2xl text-base font-bold text-white hover:opacity-90 transition-all shadow-lg"
              style={{ background: 'linear-gradient(135deg,#00C8D4,#0891B2)', boxShadow: '0 0 40px rgba(0,200,212,0.3)' }}>
              Create Free Account
              <ChevronRight className="h-5 w-5" />
            </Link>
            <p className="text-white/35 text-sm mt-4">Free forever · No credit card · Start in 30 seconds</p>
          </div>
        </div>
      </section>

      {/* ───────── FOOTER ───────── */}
      <footer className="border-t border-white/10 py-10 px-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-bold text-white">
            <span className="w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold"
              style={{ background: 'linear-gradient(135deg,#00C8D4,#0891B2)' }}>
              汉
            </span>
            SuperHanzi
          </div>
          <p className="text-white/30 text-sm text-center">
            © {new Date().getFullYear()} SuperHanzi · The Chinese Learning Super App
          </p>
          <div className="flex gap-4 text-sm text-white/40">
            <Link href="/login" className="hover:text-white/70 transition-colors">Sign In</Link>
            <Link href="/register" className="hover:text-white/70 transition-colors">Register</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
