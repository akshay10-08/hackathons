"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun, Zap, Search } from "lucide-react";
import { useEffect, useState } from "react";

export function Navbar({ searchQuery, onSearchChange }: { searchQuery?: string, onSearchChange?: (q: string) => void }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <nav className="border-b-4 border-black dark:border-white/20 bg-cream dark:bg-dark-bg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 sm:h-20 items-center gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="bg-neo-yellow text-black p-1.5 sm:p-2 border-[3px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <Zap size={20} strokeWidth={2.5} />
            </div>
            <span className="font-black text-lg sm:text-2xl tracking-tighter uppercase hidden sm:block text-black dark:text-white">
              AllHacks
            </span>
          </Link>
          
          {/* Search */}
          { onSearchChange && (
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-black/40 dark:text-white/40" />
                <input
                  type="text"
                  placeholder="Search hackathons..."
                  value={searchQuery || ""}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-cream dark:bg-dark-bg text-black dark:text-white border-[3px] border-black dark:border-white/20 font-bold text-sm placeholder:text-black/30 dark:placeholder:text-white/30 placeholder:font-medium focus:outline-none focus:ring-0 focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:focus:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] focus:-translate-y-0.5 transition-all"
                />
              </div>
            </div>
          )}
          
          {/* Actions */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
              className="p-2 border-[3px] border-black dark:border-white/20 bg-cream dark:bg-dark-bg text-black dark:text-white hover:bg-neo-pink hover:text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 transition-all cursor-pointer"
              aria-label="Toggle theme"
            >
              {mounted ? (
                resolvedTheme === 'dark' ? <Sun size={18} strokeWidth={2.5} /> : <Moon size={18} strokeWidth={2.5} />
              ) : (
                <div className="w-[18px] h-[18px]" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
