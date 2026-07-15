'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { Sidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="flex h-screen items-center justify-center bg-navy-950">
        <div className="animate-spin h-8 w-8 border-4 border-gold-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!session) redirect('/login');

  return (
    <div className="flex h-screen bg-navy-950">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
