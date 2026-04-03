'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signOut } from '@/lib/auth';
import { Button } from './ui/button';
import { BookOpen, LogOut, Menu } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    router.push('/login');
  };

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl">
          <BookOpen className="h-6 w-6 text-primary" />
          <span>汉字学习</span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <Link href="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">Dashboard</Link>
          <Link href="/words" className="text-sm font-medium hover:text-primary transition-colors">Words</Link>
          <Link href="/sentences" className="text-sm font-medium hover:text-primary transition-colors">Sentences</Link>
          <Link href="/practice" className="text-sm font-medium hover:text-primary transition-colors">Practice</Link>
          <Button variant="ghost" size="sm" onClick={handleSignOut}>
            <LogOut className="h-4 w-4 mr-1" /> Sign Out
          </Button>
        </div>
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          <Menu className="h-5 w-5" />
        </Button>
      </div>
      {menuOpen && (
        <div className="md:hidden border-t p-4 flex flex-col gap-3">
          <Link href="/dashboard" className="text-sm font-medium" onClick={() => setMenuOpen(false)}>Dashboard</Link>
          <Link href="/words" className="text-sm font-medium" onClick={() => setMenuOpen(false)}>Words</Link>
          <Link href="/sentences" className="text-sm font-medium" onClick={() => setMenuOpen(false)}>Sentences</Link>
          <Link href="/practice" className="text-sm font-medium" onClick={() => setMenuOpen(false)}>Practice</Link>
          <Button variant="ghost" size="sm" onClick={handleSignOut} className="justify-start">
            <LogOut className="h-4 w-4 mr-1" /> Sign Out
          </Button>
        </div>
      )}
    </nav>
  );
}
