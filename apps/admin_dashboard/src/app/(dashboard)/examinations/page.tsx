'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Plus, BookOpen, CheckCircle, XCircle, Clock, Filter } from 'lucide-react';

const examinations = [
  { id: '1', name: 'WAEC 2026', body: 'WAEC', year: 2026, questions: 2450, attempts: 12450, avgScore: 62, status: 'Active' },
  { id: '2', name: 'NECO 2026', body: 'NECO', year: 2026, questions: 2100, attempts: 8920, avgScore: 58, status: 'Active' },
  { id: '3', name: 'JAMB 2026', body: 'JAMB', year: 2026, questions: 1800, attempts: 15600, avgScore: 55, status: 'Active' },
  { id: '4', name: 'WAEC GCE 2025', body: 'WAEC GCE', year: 2025, questions: 1200, attempts: 3240, avgScore: 65, status: 'Archived' },
  { id: '5', name: 'SAT 2026', body: 'SAT', year: 2026, questions: 980, attempts: 2100, avgScore: 71, status: 'Active' },
  { id: '6', name: 'Post-UTME 2025', body: 'Post-UTME', year: 2025, questions: 650, attempts: 5600, avgScore: 48, status: 'Archived' },
];

export default function ExaminationsPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = examinations.filter(e => {
    const matchesSearch = e.name.toLowerCase().includes(search.toLowerCase()) || e.body.toLowerCase().includes(search.toLowerCase());
    if (filter === 'all') return matchesSearch;
    return matchesSearch && e.status.toLowerCase() === filter;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Examinations</h1>
        <button className="flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-navy-950 px-4 py-2 rounded-lg font-medium transition-colors">
          <Plus className="h-4 w-4" />
          Create Examination
        </button>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-navy-400" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search examinations..." className="w-full bg-navy-800 border border-navy-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-navy-400 focus:outline-none focus:ring-2 focus:ring-gold-500" />
        </div>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}
          className="bg-navy-800 border border-navy-700 text-navy-200 px-3 py-2 rounded-lg text-sm">
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((exam) => (
          <Card key={exam.id} className="bg-navy-800 border-navy-700 hover:border-gold-500/30 transition-all">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-navy-700 rounded-lg flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-gold-400" />
                  </div>
                  <div>
                    <CardTitle className="text-white text-base">{exam.name}</CardTitle>
                    <p className="text-navy-400 text-xs">{exam.body}</p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded ${exam.status === 'Active' ? 'bg-green-900/40 text-green-400' : 'bg-gray-700 text-gray-400'}`}>{exam.status}</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-navy-900 rounded-lg p-2.5 text-center">
                  <p className="text-navy-400 text-xs">Questions</p>
                  <p className="text-white font-semibold">{exam.questions.toLocaleString()}</p>
                </div>
                <div className="bg-navy-900 rounded-lg p-2.5 text-center">
                  <p className="text-navy-400 text-xs">Attempts</p>
                  <p className="text-white font-semibold">{exam.attempts.toLocaleString()}</p>
                </div>
                <div className="bg-navy-900 rounded-lg p-2.5 text-center">
                  <p className="text-navy-400 text-xs">Avg Score</p>
                  <p className={`font-semibold ${exam.avgScore >= 60 ? 'text-green-400' : exam.avgScore >= 50 ? 'text-gold-400' : 'text-red-400'}`}>{exam.avgScore}%</p>
                </div>
                <div className="bg-navy-900 rounded-lg p-2.5 text-center">
                  <p className="text-navy-400 text-xs">Year</p>
                  <p className="text-white font-semibold">{exam.year}</p>
                </div>
              </div>
              <div className="flex gap-2 mt-3 pt-3 border-t border-navy-700">
                <button className="text-xs text-navy-300 hover:text-gold-400">Edit</button>
                <button className="text-xs text-navy-300 hover:text-gold-400">Questions</button>
                <button className="text-xs text-navy-300 hover:text-gold-400">Reports</button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
