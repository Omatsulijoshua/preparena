'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
      callbackUrl: '/dashboard',
    });

    if (result?.error) {
      setError('Invalid email or password');
      setLoading(false);
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-navy-950 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">PrepArena</h1>
          <p className="text-gold-400 mt-1">Administration</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-navy-800 border border-navy-700 rounded-xl p-8 space-y-5">
          <h2 className="text-xl font-semibold text-white">Sign in</h2>

          {error && (
            <div className="bg-red-900/30 border border-red-800 text-red-300 text-sm p-3 rounded-lg">{error}</div>
          )}

          <div>
            <label className="block text-sm text-navy-300 mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-navy-900 border border-navy-600 rounded-lg px-4 py-2.5 text-white placeholder-navy-500 focus:outline-none focus:ring-2 focus:ring-gold-500"
              placeholder="admin@preparena.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-navy-300 mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-navy-900 border border-navy-600 rounded-lg px-4 py-2.5 text-white placeholder-navy-500 focus:outline-none focus:ring-2 focus:ring-gold-500"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold-500 hover:bg-gold-600 text-navy-950 font-semibold py-2.5 rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}
