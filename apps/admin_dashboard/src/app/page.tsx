'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'loading') return;
    if (session) router.push('/dashboard');
    else router.push('/login');
  }, [session, status, router]);

  return (
    <div className="flex h-screen items-center justify-center bg-navy-950">
      <div className="text-center">
        <div className="animate-spin h-10 w-10 border-4 border-gold-500 border-t-transparent rounded-full mx-auto mb-4" />
        <p className="text-navy-200">Loading PrepArena...</p>
      </div>
    </div>
  );
}
