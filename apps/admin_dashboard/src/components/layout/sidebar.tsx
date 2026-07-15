'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LayoutDashboard, BookOpen, Users, DollarSign, School, Bot, Settings, HelpCircle, GraduationCap } from 'lucide-react';

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/users', label: 'Users', icon: Users },
  { href: '/questions', label: 'Questions', icon: BookOpen },
  { href: '/schools', label: 'Schools', icon: School },
  { href: '/payments', label: 'Payments', icon: DollarSign },
  { href: '/analytics', label: 'Analytics', icon: GraduationCap },
  { href: '/ai', label: 'AI Gateway', icon: Bot },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-navy-900 border-r border-navy-800 flex flex-col">
      <div className="p-6 border-b border-navy-800">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="h-8 w-8 bg-gold-500 rounded-lg flex items-center justify-center">
            <span className="text-navy-950 font-bold text-sm">PA</span>
          </div>
          <div>
            <h1 className="text-white font-bold">PrepArena</h1>
            <p className="text-navy-400 text-xs">Admin Dashboard</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors',
                isActive
                  ? 'bg-gold-500/10 text-gold-400 border border-gold-500/20'
                  : 'text-navy-300 hover:text-white hover:bg-navy-800',
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-navy-800">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="h-8 w-8 bg-navy-700 rounded-full flex items-center justify-center">
            <span className="text-navy-300 text-sm font-medium">SA</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-medium truncate">Super Admin</p>
            <p className="text-navy-400 text-xs truncate">admin@preparena.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
