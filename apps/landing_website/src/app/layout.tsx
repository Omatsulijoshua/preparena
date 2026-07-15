import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PrepArena - Ace Your WAEC, NECO, JAMB & SAT',
  description: 'The ultimate examination preparation platform for WAEC, NECO, JAMB, SAT, and more. Practice with AI-powered tools, track your progress, and boost your scores.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-navy-950 text-white">{children}</body>
    </html>
  );
}
