'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Plus, Filter } from 'lucide-react';

const questions = [
  { id: '1', text: 'What is the derivative of x²?', subject: 'Mathematics', type: 'OBJECTIVE', difficulty: 'EASY', status: 'Published' },
  { id: '2', text: 'Explain the theory of relativity', subject: 'Physics', type: 'THEORY', difficulty: 'HARD', status: 'Draft' },
  { id: '3', text: 'Balance the equation: H₂ + O₂ → H₂O', subject: 'Chemistry', type: 'PRACTICAL', difficulty: 'MEDIUM', status: 'Published' },
  { id: '4', text: 'What is the capital of Nigeria?', subject: 'Geography', type: 'OBJECTIVE', difficulty: 'EASY', status: 'Published' },
  { id: '5', text: 'Analyze the poem "The Pulley"', subject: 'English', type: 'ESSAY', difficulty: 'MEDIUM', status: 'Under Review' },
];

export default function QuestionsPage() {
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Questions</h1>
        <button className="flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-navy-950 px-4 py-2 rounded-lg font-medium transition-colors">
          <Plus className="h-4 w-4" />
          Add Question
        </button>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-navy-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search questions..."
            className="w-full bg-navy-800 border border-navy-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-navy-400 focus:outline-none focus:ring-2 focus:ring-gold-500"
          />
        </div>
        <button className="flex items-center gap-2 bg-navy-800 border border-navy-700 text-navy-200 px-4 py-2 rounded-lg hover:bg-navy-700 transition-colors">
          <Filter className="h-4 w-4" />
          Filters
        </button>
      </div>

      <Card className="bg-navy-800 border-navy-700">
        <CardContent className="p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b border-navy-700">
                <th className="text-left text-navy-400 text-sm font-medium px-4 py-3">Question</th>
                <th className="text-left text-navy-400 text-sm font-medium px-4 py-3">Subject</th>
                <th className="text-left text-navy-400 text-sm font-medium px-4 py-3">Type</th>
                <th className="text-left text-navy-400 text-sm font-medium px-4 py-3">Difficulty</th>
                <th className="text-left text-navy-400 text-sm font-medium px-4 py-3">Status</th>
                <th className="text-right text-navy-400 text-sm font-medium px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((q) => (
                <tr key={q.id} className="border-b border-navy-700/50 hover:bg-navy-700/30 transition-colors">
                  <td className="px-4 py-3 text-white text-sm truncate max-w-xs">{q.text}</td>
                  <td className="px-4 py-3 text-navy-300 text-sm">{q.subject}</td>
                  <td className="px-4 py-3"><span className="text-xs bg-navy-700 text-navy-200 px-2 py-1 rounded">{q.type}</span></td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded ${
                      q.difficulty === 'EASY' ? 'bg-green-900/40 text-green-400' :
                      q.difficulty === 'MEDIUM' ? 'bg-yellow-900/40 text-yellow-400' :
                      'bg-red-900/40 text-red-400'
                    }`}>{q.difficulty}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded ${
                      q.status === 'Published' ? 'bg-green-900/40 text-green-400' :
                      q.status === 'Draft' ? 'bg-gray-700 text-gray-300' :
                      'bg-blue-900/40 text-blue-400'
                    }`}>{q.status}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-navy-400 hover:text-gold-400 text-sm">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
