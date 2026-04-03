'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signUp } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, CheckCircle2 } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error: authError } = await signUp(email, password);
    if (authError) {
      setError(authError.message);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
      setTimeout(() => router.push('/login'), 2000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 50%, #7f1d1d 100%)' }}>
      {/* Decorative background characters */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {['你', '好', '学', '中', '文', '汉', '语', '字'].map((char, i) => (
          <span
            key={i}
            className="absolute text-white/5 font-bold"
            style={{
              fontSize: `${80 + (i % 3) * 40}px`,
              top: `${(i * 17 + 5) % 90}%`,
              left: `${(i * 23 + 3) % 90}%`,
              transform: `rotate(${(i % 2 === 0 ? 1 : -1) * (i * 7 % 20)}deg)`,
            }}
          >
            {char}
          </span>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-sm px-4">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 mb-4">
            <span className="text-4xl font-bold text-white">汉</span>
          </div>
          <h1 className="text-3xl font-bold text-white">SuperHanzi</h1>
          <p className="text-white/70 mt-1 text-sm">The Chinese Learning Super App</p>
        </div>

        {/* Form card */}
        <div className="bg-white rounded-3xl p-6 shadow-2xl">
          {success ? (
            <div className="text-center py-4">
              <CheckCircle2 className="h-14 w-14 text-green-500 mx-auto mb-3" />
              <h2 className="text-xl font-bold mb-1">Account Created!</h2>
              <p className="text-muted-foreground text-sm">Check your email to confirm, then sign in.</p>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-bold text-center mb-1 text-foreground">Join SuperHanzi</h2>
              <p className="text-center text-sm text-muted-foreground mb-5">Start your Chinese learning journey</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl border border-red-100">
                    {error}
                  </div>
                )}
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700">Email</label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="h-12 rounded-xl border-gray-200 focus:border-primary"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700">Password</label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    minLength={6}
                    required
                    className="h-12 rounded-xl border-gray-200 focus:border-primary"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full h-12 rounded-xl text-base font-semibold mt-2"
                  disabled={loading}
                  style={{ background: 'linear-gradient(135deg, #dc2626, #b91c1c)' }}
                >
                  {loading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : null}
                  Create Account
                </Button>
              </form>

              <p className="text-center text-sm text-muted-foreground mt-4">
                Already have an account?{' '}
                <Link href="/login" className="text-primary font-semibold hover:underline">
                  Sign In
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
