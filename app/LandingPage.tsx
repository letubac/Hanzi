'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import {
  BookOpen, MessageSquare, Star, CheckCircle, ChevronRight,
  Flame, Mic, BarChart3, Volume2,
} from 'lucide-react';

export default function LandingPage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('sc-visible');
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('[data-sc-reveal]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: '#070E1E' }}>

      {/* ────────────────────────── NAVBAR ────────────────────────── */}
      <header
        className="sticky top-0 z-50 backdrop-blur-lg"
        style={{ background: 'rgba(7,14,30,0.92)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 font-extrabold text-xl text-white">
            <span
              className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-base text-white"
              style={{ background: 'linear-gradient(135deg,#1E40AF,#0EA5E9)' }}
            >汉</span>
            SuperHanzi
          </Link>
          <nav className="hidden md:flex items-center gap-7 text-sm text-white/55">
            <a href="#for-you" className="hover:text-white transition-colors">About</a>
            <a href="#method"  className="hover:text-white transition-colors">Method</a>
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#testimonials" className="hover:text-white transition-colors">Reviews</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden sm:block text-sm text-white/65 hover:text-white px-4 py-2 rounded-xl transition-all"
              style={{ border: '1px solid rgba(255,255,255,0.15)' }}
            >Sign In</Link>
            <Link
              href="/register"
              className="text-sm font-bold px-5 py-2 rounded-xl text-white transition-all hover:opacity-90"
              style={{ background: 'linear-gradient(135deg,#1D4ED8,#0EA5E9)' }}
            >Get Started</Link>
          </div>
        </div>
      </header>

      {/* ────────────────────────── HERO ────────────────────────── */}
      <section className="relative overflow-hidden pt-14 pb-28 px-4">
        {/* Ambient glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-125 h-125 rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle,#1D4ED8,transparent 70%)', filter: 'blur(90px)' }} />
          <div className="absolute top-20 right-1/4 w-96 h-96 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle,#00C8D4,transparent 70%)', filter: 'blur(80px)' }} />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-full opacity-10"
            style={{ background: 'linear-gradient(90deg,transparent,#0EA5E9,transparent)' }} />
        </div>

        {/* Floating Chinese characters */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
          {['汉','字','语','学','中','文','词','句','音','读','声','写'].map((char, i) => (
            <span key={i} className="absolute font-black"
              style={{
                color: `rgba(14,165,233,${0.025 + (i % 3) * 0.015})`,
                fontSize: `${80 + (i % 4) * 45}px`,
                top: `${(i * 18 + 3) % 90}%`,
                left: `${(i * 24 + 5) % 92}%`,
                transform: `rotate(${(i % 2 === 0 ? 1 : -1) * (i * 7 % 20)}deg)`,
                animation: `scFloat${i % 3} ${6 + i % 4}s ease-in-out infinite`,
              }}>{char}</span>
          ))}
        </div>

        <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">

          {/* LEFT: copy */}
          <div>
            <div
              className="inline-flex items-center gap-2 text-cyan-300 text-xs font-bold px-3 py-1.5 rounded-full mb-7"
              style={{ background: 'rgba(0,200,212,0.08)', border: '1px solid rgba(0,200,212,0.25)' }}
            >
              <Flame className="h-3 w-3" style={{ color: '#F97316' }} />
              <span>The #1 Chinese Learning Super App</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
              The Chinese<br />Learning
              <span className="block mt-1" style={{
                background: 'linear-gradient(90deg,#60A5FA 0%,#0EA5E9 40%,#34D399 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>Super App</span>
            </h1>

            <p className="text-base font-semibold text-white/60 mb-3">Built by Educators. Powered by AI.</p>
            <p className="text-base text-white/40 leading-relaxed mb-9 max-w-md">
              The first Chinese learning app that combines an expert-designed learning path with AI technology,
              helping over 12 million learners go from zero to hero in Chinese.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-9">
              <Link
                href="/register"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-white text-base hover:opacity-90 hover:scale-105 transition-all"
                style={{ background: 'linear-gradient(135deg,#1D4ED8,#0EA5E9)', boxShadow: '0 0 45px rgba(29,78,216,0.45)' }}
              >
                Start Learning Free <ChevronRight className="h-5 w-5" />
              </Link>
              <Link
                href="/login"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-semibold text-white/70 hover:text-white transition-all"
                style={{ border: '1px solid rgba(255,255,255,0.15)' }}
              >
                Sign In
              </Link>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {['#1D4ED8','#2563EB','#0EA5E9','#06B6D4','#3B82F6'].map((c, i) => (
                  <div key={i} className="w-9 h-9 rounded-full border-2 flex items-center justify-center text-xs font-bold text-white"
                    style={{ background: c, borderColor: '#070E1E' }}>
                    {['李','王','张','陈','刘'][i]}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-0.5 mb-1">
                  {[1,2,3,4,5].map(s => <Star key={s} className="h-3 w-3 fill-current" style={{ color: '#FBBF24' }} />)}
                </div>
                <p className="text-white/35 text-xs">
                  Joined by <span className="text-white/65 font-bold">12M+</span> learners worldwide
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: phone mockup */}
          <div className="flex justify-center" data-sc-reveal data-sc-direction="right">
            <div className="relative w-72">
              {/* Phone body */}
              <div
                className="relative rounded-[3rem] overflow-hidden shadow-2xl"
                style={{
                  background: '#0B1935',
                  border: '2px solid rgba(14,165,233,0.25)',
                  boxShadow: '0 50px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(14,165,233,0.08), inset 0 1px 0 rgba(255,255,255,0.05)',
                }}
              >
                {/* Status bar */}
                <div className="flex items-center justify-between px-6 pt-4 pb-2 text-xs text-white/40">
                  <span>9:41</span>
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-2.5 rounded-sm relative" style={{ border: '1px solid rgba(255,255,255,0.3)' }}>
                      <div className="absolute inset-px left-px w-3/4 rounded-sm" style={{ background: '#22C55E' }} />
                    </div>
                  </div>
                </div>

                {/* App header */}
                <div className="flex items-center justify-between px-5 pb-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white"
                      style={{ background: 'linear-gradient(135deg,#1D4ED8,#0EA5E9)' }}>汉</span>
                    <span className="text-white text-xs font-bold">SuperHanzi</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs" style={{ color: '#F97316' }}>
                    <Flame className="h-3 w-3" /><span className="font-bold">7</span>
                  </div>
                </div>

                {/* Lesson path */}
                <div className="px-5 py-5 space-y-4" style={{ background: 'linear-gradient(180deg,#091629 0%,#0D2246 100%)', minHeight: '310px' }}>
                  <p className="text-white/30 text-[10px] text-center mb-3 uppercase tracking-widest">Level 1 · Lesson 3</p>

                  {[
                    { char: '定', label: '定级测试', sub: 'Placement test', done: true },
                    { char: '汉', label: '初识汉语', sub: 'First Chinese', done: true },
                    { char: '我', label: '介绍自己', sub: 'Introducing yourself', active: true },
                    { char: '询', label: '询问身份', sub: 'Asking about identity', done: false },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="relative shrink-0">
                        <div
                          className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-bold ${item.active ? 'scale-110' : ''}`}
                          style={{
                            background: item.active
                              ? 'linear-gradient(135deg,#1D4ED8,#0EA5E9)'
                              : item.done ? 'rgba(0,200,212,0.18)' : 'rgba(255,255,255,0.04)',
                            border: item.active ? 'none' : `1px solid ${item.done ? 'rgba(0,200,212,0.35)' : 'rgba(255,255,255,0.08)'}`,
                            boxShadow: item.active ? '0 0 20px rgba(29,78,216,0.6)' : 'none',
                            color: item.active ? '#fff' : item.done ? '#00C8D4' : 'rgba(255,255,255,0.25)',
                          }}
                        >{item.char}</div>
                        {item.done && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold text-white"
                            style={{ background: '#22C55E' }}>✓</div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className={`text-sm font-semibold truncate ${item.active ? 'text-white' : item.done ? 'text-white/50' : 'text-white/25'}`}>
                          {item.label}
                        </p>
                        {item.active
                          ? <p className="text-[10px] text-cyan-400">In progress → 12/20 min</p>
                          : <p className="text-[10px] text-white/25">{item.sub}</p>
                        }
                      </div>
                    </div>
                  ))}

                  {/* Progress bar */}
                  <div className="mt-2 p-3 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div className="flex justify-between text-[10px] text-white/35 mb-1.5">
                      <span>Today's Progress</span><span>60%</span>
                    </div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
                      <div className="h-full rounded-full" style={{ width: '60%', background: 'linear-gradient(90deg,#1D4ED8,#0EA5E9)' }} />
                    </div>
                  </div>
                </div>

                {/* Bottom tab bar */}
                <div className="flex justify-around py-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  {[['⭐','Stars'],['💬','Talk'],['📖','Lessons'],['📝','Notes'],['👤','Me']].map(([icon, name], i) => (
                    <button key={name} className={`flex flex-col items-center gap-0.5 text-[9px] ${i === 0 ? 'text-cyan-400' : 'text-white/25'}`}>
                      <span className="text-base leading-none">{icon}</span>
                      <span>{name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Floating badges */}
              <div
                className="absolute -left-10 top-1/4 rounded-2xl px-3 py-2 text-xs font-bold text-white"
                style={{ background: 'linear-gradient(135deg,#7C3AED,#4F46E5)', boxShadow: '0 12px 30px rgba(124,58,237,0.55)', zIndex: 10 }}
              >✨ AI Powered</div>
              <div
                className="absolute -right-10 bottom-1/3 rounded-2xl px-3 py-2 text-xs font-bold text-white"
                style={{ background: 'linear-gradient(135deg,#0EA5E9,#06B6D4)', boxShadow: '0 12px 30px rgba(14,165,233,0.55)', zIndex: 10 }}
              >HSK 1–6 ✓</div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────── STATS BAR ────────────────────────── */}
      <section className="py-12" style={{ background: 'rgba(13,22,45,0.7)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: '12M+', label: 'Active Learners' },
            { value: '500k+', label: 'Words Learned' },
            { value: '95%', label: 'Retention Rate' },
            { value: '4.9★', label: 'User Rating' },
          ].map(({ value, label }, i) => (
            <div key={label} className="text-center" data-sc-reveal data-sc-delay={String(i * 80)}>
              <p className="text-3xl sm:text-4xl font-black mb-1"
                style={{ background: 'linear-gradient(90deg,#60A5FA,#0EA5E9,#34D399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {value}
              </p>
              <p className="text-white/35 text-sm">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ────────────────────────── "IS FOR YOU IF…" ────────────────────────── */}
      <section id="for-you" className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-white text-center mb-4" data-sc-reveal>
            SuperHanzi is for you if …
          </h2>
          <p className="text-white/40 text-center mb-14 max-w-lg mx-auto text-base" data-sc-reveal>
            Whether you're a complete beginner or looking to break through a plateau, we have the right tools.
          </p>

          {/* 5-card grid — mirrors SuperChinese layout */}
          <div className="grid grid-cols-2 gap-4 md:gap-5" data-sc-reveal>
            {/* Row 1 */}
            <div className="rounded-3xl p-7 flex flex-col items-center text-center gap-4 hover:scale-[1.02] transition-transform"
              style={{ background: 'rgba(29,78,216,0.1)', border: '1px solid rgba(96,165,250,0.18)' }}>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                style={{ background: 'rgba(96,165,250,0.12)' }}>🚩</div>
              <p className="text-white/65 text-sm leading-relaxed">
                You've started many times, but you've quit and now you're looking for a way not to give up again.
              </p>
            </div>

            <div className="rounded-3xl p-7 flex flex-col items-center text-center gap-4 hover:scale-[1.02] transition-transform"
              style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(52,211,153,0.18)' }}>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                style={{ background: 'rgba(52,211,153,0.12)' }}>📊</div>
              <p className="text-white/65 text-sm leading-relaxed">
                You're stuck at a beginning level, finding it difficult to reach fluency.
              </p>
            </div>

            {/* Center card spans full width */}
            <div className="col-span-2 max-w-sm mx-auto w-full rounded-3xl p-8 flex flex-col items-center text-center gap-4 hover:scale-[1.02] transition-transform"
              style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(251,191,36,0.18)' }}>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                style={{ background: 'rgba(251,191,36,0.12)' }}>⏰</div>
              <p className="text-white/65 text-sm leading-relaxed">
                You have a busy schedule, but you're willing to set aside 10 minutes a day.
              </p>
            </div>

            {/* Row 2 */}
            <div className="rounded-3xl p-7 flex flex-col items-center text-center gap-4 hover:scale-[1.02] transition-transform"
              style={{ background: 'rgba(236,72,153,0.08)', border: '1px solid rgba(244,114,182,0.18)' }}>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                style={{ background: 'rgba(244,114,182,0.12)' }}>📚</div>
              <p className="text-white/65 text-sm leading-relaxed">
                You've tried traditional methods like textbooks and classes, and they don't work for you.
              </p>
            </div>

            <div className="rounded-3xl p-7 flex flex-col items-center text-center gap-4 hover:scale-[1.02] transition-transform"
              style={{ background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(167,139,250,0.18)' }}>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                style={{ background: 'rgba(167,139,250,0.12)' }}>🏆</div>
              <p className="text-white/65 text-sm leading-relaxed">
                You believe that you can conquer the most difficult language in the world by yourself.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────── THE METHOD ────────────────────────── */}
      <section id="method" className="py-24 px-4" style={{ background: 'rgba(10,18,38,0.6)' }}>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">

          <div data-sc-reveal data-sc-direction="left">
            <p className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-3">Structured Learning</p>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 leading-tight">
              The SuperHanzi Method
            </h2>
            <p className="text-white/55 font-semibold mb-4">Your Path to Fluent, Practical Mandarin</p>
            <p className="text-white/38 leading-relaxed mb-8">
              A structured, expert-designed curriculum that takes you from zero to HSK5 fluency with confidence.
              Each 10-minute lesson covers vocabulary, grammar, pronunciation, and real conversation — optimized for self-learners.
            </p>
            <ul className="space-y-3">
              {[
                'AI pronunciation scoring with instant tone feedback',
                'Spaced repetition optimised for long-term retention',
                'HSK 1–6 vocabulary lists built in',
                'Offline support — study anywhere, anytime',
                'Progress in just 10 minutes a day',
              ].map(item => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 shrink-0 mt-0.5 text-cyan-400" />
                  <span className="text-white/55 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div data-sc-reveal data-sc-direction="right">
            {/* Stats pills — like SuperChinese */}
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { label: '8 levels',                 color: '#FBBF24', bg: 'rgba(251,191,36,0.10)',  border: 'rgba(251,191,36,0.28)' },
                { label: '170+ real-world topics',   color: '#67E8F9', bg: 'rgba(103,232,249,0.10)', border: 'rgba(103,232,249,0.28)' },
                { label: '900+ bite-sized lessons',  color: '#F9A8D4', bg: 'rgba(249,168,212,0.10)', border: 'rgba(249,168,212,0.28)' },
                { label: 'Just 10 min per day',      color: '#86EFAC', bg: 'rgba(134,239,172,0.10)', border: 'rgba(134,239,172,0.28)' },
                { label: 'AI pronunciation',         color: '#A5F3FC', bg: 'rgba(165,243,252,0.10)', border: 'rgba(165,243,252,0.28)' },
                { label: 'HSK 1–6 vocabulary',       color: '#C4B5FD', bg: 'rgba(196,181,253,0.10)', border: 'rgba(196,181,253,0.28)' },
                { label: 'Offline mode',             color: '#FCA5A5', bg: 'rgba(252,165,165,0.10)', border: 'rgba(252,165,165,0.28)' },
                { label: 'For self-learners',        color: '#6EE7B7', bg: 'rgba(110,231,183,0.10)', border: 'rgba(110,231,183,0.28)' },
              ].map(({ label, color, bg, border }) => (
                <span key={label} className="px-4 py-2 rounded-2xl text-sm font-semibold"
                  style={{ color, background: bg, border: `1px solid ${border}` }}>
                  {label}
                </span>
              ))}
            </div>

            {/* Decorative Chinese card */}
            <div className="rounded-3xl p-7 text-center"
              style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="text-7xl font-black text-white mb-3"
                style={{ textShadow: '0 0 60px rgba(29,78,216,0.6), 0 0 120px rgba(14,165,233,0.25)' }}>中文</div>
              <p className="text-white/25 text-sm mb-4">zhōng wén · Chinese Language</p>
              <div className="grid grid-cols-3 gap-3">
                {[{ val: '词', label: 'Words' }, { val: '音', label: 'Tones' }, { val: '分', label: 'Score' }].map(({ val, label }) => (
                  <div key={label} className="rounded-2xl p-3" style={{ background: 'rgba(29,78,216,0.12)', border: '1px solid rgba(96,165,250,0.15)' }}>
                    <p className="text-xl font-bold text-blue-300">{val}</p>
                    <p className="text-white/30 text-xs mt-0.5">{label}</p>
                  </div>
                ))}
              </div>
              <div className="flex justify-center gap-0.5 mt-4">
                {[1,2,3,4,5].map(s => <Star key={s} className="h-4 w-4 fill-current" style={{ color: '#FBBF24' }} />)}
              </div>
              <p className="text-white/25 text-xs mt-1">4.9 out of 5.0 learner reviews</p>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────── CTA BANNER ────────────────────────── */}
      <section className="py-16 px-4"
        style={{ background: 'rgba(29,78,216,0.1)', borderTop: '1px solid rgba(96,165,250,0.1)', borderBottom: '1px solid rgba(96,165,250,0.1)' }}>
        <div className="max-w-3xl mx-auto text-center" data-sc-reveal>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
            Want to know your Chinese level?
          </h2>
          <p className="text-white/45 mb-8 text-base">Test your Chinese level for FREE. Start your personalised learning path today.</p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-2xl font-bold text-white text-base hover:opacity-90 hover:scale-105 transition-all"
            style={{ background: 'linear-gradient(135deg,#1D4ED8,#0EA5E9)', boxShadow: '0 0 55px rgba(29,78,216,0.5)' }}
          >
            Get Started Free <ChevronRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* ────────────────────────── FEATURES / DISCOVERY ────────────────────────── */}
      <section id="features" className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14" data-sc-reveal>
            <p className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-3">Everything You Need</p>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">Endless learning with SuperHanzi</h2>
            <p className="text-white/40 max-w-lg mx-auto">Sharpen your skills and expand your knowledge about Chinese language and culture.</p>
          </div>

          {/* 4 category icons — like SuperChinese's Discovery Channel */}
          <div className="flex justify-center gap-10 sm:gap-16 mb-16 flex-wrap">
            {[
              { icon: '拼', label: 'Pinyin\nGuide',              grad: 'linear-gradient(135deg,#F97316,#EF4444)', glow: 'rgba(249,115,22,0.45)' },
              { icon: '汉', label: 'Understanding\nChinese Hanzi', grad: 'linear-gradient(135deg,#7C3AED,#A855F7)', glow: 'rgba(124,58,237,0.45)' },
              { icon: 'A',  label: 'Essential HSK\nVocabulary',    grad: 'linear-gradient(135deg,#1D4ED8,#0EA5E9)', glow: 'rgba(29,78,216,0.45)' },
              { icon: '话', label: 'Everyday Chinese\nExpressions', grad: 'linear-gradient(135deg,#0D9488,#14B8A6)', glow: 'rgba(13,148,136,0.45)' },
            ].map(({ icon, label, grad, glow }, i) => (
              <div key={label} className="flex flex-col items-center gap-3 cursor-pointer group"
                data-sc-reveal data-sc-delay={String(i * 100)}>
                <div
                  className="w-20 h-20 rounded-[1.75rem] flex items-center justify-center text-2xl font-black text-white group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300"
                  style={{ background: grad, boxShadow: `0 12px 35px ${glow}` }}
                >{icon}</div>
                <p className="text-white/55 text-xs text-center font-medium leading-tight whitespace-pre-line group-hover:text-white/80 transition-colors">{label}</p>
              </div>
            ))}
          </div>

          {/* 4 feature cards grid */}
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              { icon: BookOpen,    title: 'Smart Vocabulary',   desc: 'Build your Chinese vocabulary with AI-powered spaced repetition that adapts to your learning pace.',     char: '词', color: '#60A5FA' },
              { icon: MessageSquare, title: 'Sentence Patterns', desc: 'Master grammar through real-world sentences and contextual examples used in everyday Chinese.',          char: '句', color: '#34D399' },
              { icon: Mic,         title: 'Pronunciation AI',   desc: 'Get instant feedback on your tones and pronunciation with our advanced speech recognition engine.',      char: '音', color: '#0EA5E9' },
              { icon: BarChart3,   title: 'Progress Tracking',  desc: 'Visualise your journey with detailed analytics, streaks, and personalised study plans.',                char: '进', color: '#A78BFA' },
            ].map(({ icon: Icon, title, desc, char, color }, i) => (
              <div
                key={title}
                className="relative rounded-3xl p-7 overflow-hidden group hover:scale-[1.015] transition-all duration-300 cursor-default"
                data-sc-reveal data-sc-delay={String(i * 80)}
                style={{ background: 'rgba(11,25,53,0.7)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                {/* Decorative big character */}
                <div className="absolute right-5 bottom-3 text-[88px] font-black pointer-events-none select-none"
                  style={{ color: `${color}10` }}>{char}</div>
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                    style={{ background: `${color}14`, border: `1px solid ${color}30` }}>
                    <Icon className="h-6 w-6" style={{ color }} />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
                  <p className="text-white/45 text-sm leading-relaxed">{desc}</p>
                </div>
                {/* Hover glow */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: `radial-gradient(circle at 50% 0%, ${color}08, transparent 65%)` }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────── DIALOGUE PREVIEW ────────────────────────── */}
      <section className="py-20 px-4" style={{ background: 'rgba(10,18,38,0.6)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14" data-sc-reveal>
            <p className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-3">Real Conversations</p>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">Learn through real dialogues</h2>
            <p className="text-white/40 max-w-lg mx-auto">Practice authentic Chinese conversations about everyday topics — from pets to travel to work.</p>
          </div>

          <div className="rounded-3xl overflow-hidden" data-sc-reveal
            style={{ background: 'rgba(9,18,38,0.85)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="grid md:grid-cols-3">

              {/* Topic sidebar */}
              <div className="p-6" style={{ borderRight: '1px solid rgba(255,255,255,0.06)' }}>
                <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest mb-4">Topics</p>
                <div className="space-y-1.5">
                  {[
                    { cn: '宠物', en: 'Pets',     active: true },
                    { cn: '家人', en: 'Family' },
                    { cn: '购物', en: 'Shopping' },
                    { cn: '旅游', en: 'Travel' },
                    { cn: '工作', en: 'Work' },
                    { cn: '天气', en: 'Weather' },
                  ].map(({ cn, en, active }) => (
                    <div
                      key={en}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all ${active ? 'text-white' : 'text-white/35 hover:text-white/60'}`}
                      style={{
                        background: active ? 'rgba(0,200,212,0.1)' : 'transparent',
                        border: active ? '1px solid rgba(0,200,212,0.22)' : '1px solid transparent',
                      }}
                    >
                      <span className="text-xl font-bold">{cn}</span>
                      <span className="text-sm">{en}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dialogue panel */}
              <div className="md:col-span-2 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="text-white font-black text-2xl mr-2">宠物</span>
                    <span className="text-white/35 text-sm">Pets</span>
                  </div>
                  <button
                    className="flex items-center gap-1.5 text-xs text-cyan-400 px-3 py-1.5 rounded-xl transition-colors hover:bg-cyan-400/10"
                    style={{ border: '1px solid rgba(0,200,212,0.25)' }}
                  >
                    <Volume2 className="h-3 w-3" /> Play
                  </button>
                </div>

                <div className="space-y-4 max-h-64 overflow-y-auto pr-2" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.1) transparent' }}>
                  {[
                    { pinyin: 'Zhè shì nǐ de xiǎo māo ma ?',      cn: '这是你的小猫吗？',   en: 'Is this your kitten?' },
                    { pinyin: 'Zhè shì wǒ de xiǎo māo .',          cn: '这是我的小猫。',     en: 'This is my kitten.' },
                    { pinyin: 'Nǐ de xiǎo māo hěn piàoliang .',    cn: '你的小猫很漂亮。',   en: 'Your kitten is very pretty.' },
                    { pinyin: 'Xièxie !',                           cn: '谢谢！',             en: 'Thanks!' },
                    { pinyin: 'Nǐ de xiǎo māo duō dà le ?',        cn: '你的小猫多大了？',   en: 'How old is your kitten?' },
                    { pinyin: 'Wǒ de xiǎo māo sān suì le .',       cn: '我的小猫三岁了。',   en: 'My kitten is 3 years old.' },
                  ].map((line, i) => (
                    <div key={i} className="pb-4" style={{ borderBottom: 'solid 1px rgba(255,255,255,0.04)' }}>
                      <p className="text-white/30 text-xs mb-1">{line.pinyin}</p>
                      <p className="text-white font-semibold">{line.cn}</p>
                      <p className="text-white/45 text-sm">{line.en}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────── HOW IT WORKS ────────────────────────── */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14" data-sc-reveal>
            <p className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-3">Simple Process</p>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">Start learning in minutes</h2>
            <p className="text-white/40 max-w-lg mx-auto">Get from zero to conversational Chinese in four simple steps.</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {[
              { num: '01', title: 'Create an account',  desc: 'Sign up for free in under 30 seconds. No credit card required.', icon: '👤' },
              { num: '02', title: 'Take a level test',  desc: 'Quick assessment places you at the right level — from beginner to HSK6.', icon: '🎯' },
              { num: '03', title: 'Practice daily',     desc: 'Review flashcards, record pronunciation, and chat with AI every day.', icon: '📅' },
              { num: '04', title: 'Track progress',     desc: 'Watch your scores climb and your Chinese confidence soar.', icon: '📈' },
            ].map(({ num, title, desc, icon }, i) => (
              <div
                key={num}
                className="flex gap-5 p-6 rounded-3xl hover:scale-[1.01] transition-all group"
                data-sc-reveal data-sc-delay={String(i * 100)}
                style={{ background: 'rgba(11,25,53,0.5)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div className="shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
                  style={{ background: 'rgba(29,78,216,0.18)', border: '1px solid rgba(96,165,250,0.22)' }}>
                  {icon}
                </div>
                <div>
                  <span className="text-xs font-bold text-blue-500/50 mb-1 block">{num}</span>
                  <h3 className="text-white font-bold mb-1">{title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────── TESTIMONIALS ────────────────────────── */}
      <section id="testimonials" className="py-24 px-4" style={{ background: 'rgba(10,18,38,0.6)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14" data-sc-reveal>
            <p className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-3">Learner Reviews</p>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">Loved by learners worldwide</h2>
            <p className="text-white/40">Join millions learning Chinese the SuperHanzi way.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { name: 'Sarah M.',   flag: '🇺🇸', country: 'United States',  text: "Out of all the Chinese learning apps I've used, this one is the best. I love how easy it is to learn characters without relying on pinyin too much.", date: '2025-04-28' },
              { name: 'Hana K.',    flag: '🇯🇵', country: 'Japan',            text: "After discovering this app, studying consistently every day has helped me improve much more than expensive one-on-one lessons ever did.", date: '2025-04-17' },
              { name: 'Việt Hà',   flag: '🇻🇳', country: 'Vietnam',          text: "The AI pronunciation correction feature is incredible! The app organizes lessons clearly by level with comprehensive vocabulary practice.", date: '2025-05-05' },
              { name: 'Carlos R.',  flag: '🇧🇷', country: 'Brazil',           text: "It checks whether your tones are correct and you end up progressing without even realizing it. Absolutely the best Chinese app.", date: '2025-03-08' },
              { name: 'Emma L.',    flag: '🇬🇧', country: 'United Kingdom',   text: "Incredible work has been put into this app. It took me so long to find one that reaches HSK5 and is actually enjoyable!", date: '2025-03-21' },
              { name: 'André F.',   flag: '🇫🇷', country: 'France',           text: "The AI tutor is very effective for practicing speaking. I've been using it alongside my in-person Chinese classes for a year.", date: '2025-01-07' },
            ].map(({ name, flag, country, text, date }, i) => (
              <div
                key={name}
                className="rounded-3xl p-6 hover:scale-[1.01] transition-transform"
                data-sc-reveal data-sc-delay={String((i % 3) * 80)}
                style={{ background: 'rgba(9,18,38,0.85)', border: '1px solid rgba(255,255,255,0.055)' }}
              >
                <div className="flex items-center gap-1 mb-3">
                  {[1,2,3,4,5].map(s => <Star key={s} className="h-3.5 w-3.5 fill-current" style={{ color: '#FBBF24' }} />)}
                </div>
                <p className="text-white/60 text-sm leading-relaxed mb-5">"{text}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/80 text-sm font-semibold">{name}</p>
                    <p className="text-white/28 text-xs">{flag} {country}</p>
                  </div>
                  <p className="text-white/18 text-xs">{date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────── FINAL CTA ────────────────────────── */}
      <section className="py-24 px-4">
        <div
          className="max-w-3xl mx-auto relative rounded-3xl overflow-hidden text-center p-14"
          data-sc-reveal
          style={{
            background: 'linear-gradient(135deg,#0F2D6B 0%,#0A1C46 50%,#070E1E 100%)',
            border: '1px solid rgba(96,165,250,0.2)',
          }}
        >
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at top, rgba(29,78,216,0.28) 0%, transparent 65%)' }} />
          <div className="relative z-10">
            <div className="text-5xl mb-6">🎓</div>
            <p className="text-blue-300 text-xs font-bold uppercase tracking-widest mb-4">Start Today</p>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Ready to speak Chinese?
            </h2>
            <p className="text-white/45 mb-8 max-w-md mx-auto">
              Join 12 million learners and start your Chinese journey for free. No credit card required.
            </p>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-2xl font-bold text-white text-base hover:opacity-90 hover:scale-105 transition-all"
              style={{ background: 'linear-gradient(135deg,#1D4ED8,#0EA5E9)', boxShadow: '0 0 60px rgba(29,78,216,0.55)' }}
            >
              Create Free Account <ChevronRight className="h-5 w-5" />
            </Link>
            <p className="text-white/25 text-sm mt-4">Free forever · No credit card · Start in 30 seconds</p>
          </div>
        </div>
      </section>

      {/* ────────────────────────── FOOTER ────────────────────────── */}
      <footer className="py-14 px-4" style={{ background: '#050B18', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">

            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2.5 font-black text-xl text-white mb-3">
                <span className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white"
                  style={{ background: 'linear-gradient(135deg,#1D4ED8,#0EA5E9)' }}>汉</span>
                SuperHanzi
              </div>
              <p className="text-white/28 text-sm leading-relaxed mb-5">
                SuperHanzi: Where self-learners achieve real Chinese fluency.
              </p>
              <div className="flex gap-2.5">
                {['IG','FB','IN','RD','X'].map(icon => (
                  <div key={icon}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold text-white/40 hover:text-white cursor-pointer transition-colors"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    {icon}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-white/50 text-xs font-bold uppercase tracking-wider mb-4">About Product</p>
              <ul className="space-y-2.5">
                {['SuperHanziApp', 'HSK Test Prep', 'Blog'].map(item => (
                  <li key={item}><a href="#" className="text-white/28 text-sm hover:text-white/65 transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-white/50 text-xs font-bold uppercase tracking-wider mb-4">Company</p>
              <ul className="space-y-2.5">
                {['About Us', 'Careers'].map(item => (
                  <li key={item}><a href="#" className="text-white/28 text-sm hover:text-white/65 transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-white/50 text-xs font-bold uppercase tracking-wider mb-4">Support</p>
              <ul className="space-y-2.5">
                {['Contact Us', 'Terms of Use', 'Privacy Policy'].map(item => (
                  <li key={item}><a href="#" className="text-white/28 text-sm hover:text-white/65 transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
            style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
            <p className="text-white/18 text-sm">© {new Date().getFullYear()} SuperHanzi · The Chinese Learning Super App</p>
            <div className="flex gap-5 text-sm text-white/25">
              <Link href="/login"    className="hover:text-white/55 transition-colors">Sign In</Link>
              <Link href="/register" className="hover:text-white/55 transition-colors">Register</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* ── Global animation styles ── */}
      <style>{`
        @keyframes scFloat0 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50%       { transform: translateY(-22px) rotate(4deg); }
        }
        @keyframes scFloat1 {
          0%, 100% { transform: translateY(0px) rotate(-4deg); }
          50%       { transform: translateY(-16px) rotate(2deg); }
        }
        @keyframes scFloat2 {
          0%, 100% { transform: translateY(0px) rotate(8deg); }
          50%       { transform: translateY(-26px) rotate(3deg); }
        }

        /* Scroll reveal — base state */
        [data-sc-reveal] {
          opacity: 0;
          transform: translateY(36px);
          transition: opacity 0.75s cubic-bezier(0.16,1,0.3,1),
                      transform 0.75s cubic-bezier(0.16,1,0.3,1);
        }
        [data-sc-reveal][data-sc-direction="left"]  { transform: translateX(-40px); }
        [data-sc-reveal][data-sc-direction="right"] { transform: translateX(40px); }

        /* Triggered state */
        [data-sc-reveal].sc-visible {
          opacity: 1;
          transform: translate(0, 0);
        }

        /* Stagger delays */
        [data-sc-reveal][data-sc-delay="80"]  { transition-delay: 0.08s; }
        [data-sc-reveal][data-sc-delay="100"] { transition-delay: 0.10s; }
        [data-sc-reveal][data-sc-delay="160"] { transition-delay: 0.16s; }
        [data-sc-reveal][data-sc-delay="200"] { transition-delay: 0.20s; }
        [data-sc-reveal][data-sc-delay="240"] { transition-delay: 0.24s; }
        [data-sc-reveal][data-sc-delay="300"] { transition-delay: 0.30s; }
        [data-sc-reveal][data-sc-delay="400"] { transition-delay: 0.40s; }
      `}</style>
    </div>
  );
}
