'use client';

import { useSession } from 'next-auth/react';
import { Bell, Search, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export function Header() {
  const { theme, setTheme } = useTheme();
  const { data: session } = useSession();

  return (
    <header className="h-16 border-b border-navy-800 bg-navy-900 flex items-center justify-between px-6">
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-navy-400" />
          <input
            type="text"
            placeholder="Search students, questions, payments..."
            className="w-full bg-navy-800 border border-navy-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-navy-400 focus:outline-none focus:ring-2 focus:ring-gold-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2 text-navy-400 hover:text-white transition-colors"
        >
          {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>

        <button className="p-2 text-navy-400 hover:text-white transition-colors relative">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
        </button>
      </div>
    </header>
  );
}
