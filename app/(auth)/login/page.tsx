'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signIn } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const { error: authError } = await signIn(email, password);
    if (authError) {
      setError(authError.message);
      setLoading(false);
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #081628 0%, #0a2744 50%, #0f3460 100%)' }}
    >
      {/* Decorative background characters */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {['汉', '语', '学', '习', '中', '文', '字', '词'].map((char, i) => (
          <span
            key={i}
            className="absolute font-bold"
            style={{
              fontSize: `${80 + (i % 3) * 40}px`,
              top: `${(i * 17 + 5) % 90}%`,
              left: `${(i * 23 + 3) % 90}%`,
              transform: `rotate(${(i % 2 === 0 ? 1 : -1) * (i * 7 % 20)}deg)`,
              color: `rgba(0,200,212,${0.04 + (i % 3) * 0.02})`,
            }}
          >
            {char}
          </span>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-sm px-4">
        {/* Logo */}
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center w-20 h-20 rounded-3xl backdrop-blur-sm border border-white/20 mb-4"
            style={{ background: 'linear-gradient(135deg,#00C8D430,#0891B220)' }}
          >
            <span className="text-4xl font-bold text-white">汉</span>
          </div>
          <h1 className="text-3xl font-bold text-white">SuperHanzi</h1>
          <p className="text-white/60 mt-1 text-sm">The Chinese Learning Super App</p>
        </div>

        {/* Form card */}
        <div
          className="rounded-3xl p-6 shadow-2xl border border-white/10"
          style={{ background: 'rgba(15,37,64,0.85)', backdropFilter: 'blur(12px)' }}
        >
          <h2 className="text-xl font-bold text-center mb-1 text-white">Welcome Back!</h2>
          <p className="text-center text-sm text-white/50 mb-5">Sign in to continue your journey</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-900/40 text-red-300 text-sm p-3 rounded-xl border border-red-500/30">
                {error}
              </div>
            )}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-white/70">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="h-12 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-white/30 focus:border-cyan-400"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-white/70">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="h-12 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-white/30 focus:border-cyan-400"
              />
            </div>
            <Button
              type="submit"
              className="w-full h-12 rounded-xl text-base font-semibold mt-2 text-white border-0"
              disabled={loading}
              style={{ background: 'linear-gradient(135deg, #00C8D4, #0891B2)', boxShadow: '0 0 20px rgba(0,200,212,0.3)' }}
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : null}
              Sign In
            </Button>
          </form>

          <p className="text-center text-sm text-white/40 mt-4">
            New to SuperHanzi?{' '}
            <Link href="/register" className="text-cyan-400 font-semibold hover:text-cyan-300 transition-colors">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
