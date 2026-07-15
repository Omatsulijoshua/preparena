import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/components/layout/providers';

export const metadata: Metadata = {
  title: 'PrepArena Admin',
  description: 'PrepArena Administration Dashboard',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
