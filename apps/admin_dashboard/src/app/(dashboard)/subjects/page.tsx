'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Plus, Book, Layers, Edit, Trash2, ChevronDown, ChevronRight } from 'lucide-react';

const subjects = [
  {
    name: 'Mathematics', code: 'MATH', topics: ['Algebra', 'Geometry', 'Trigonometry', 'Calculus', 'Statistics'],
  },
  {
    name: 'English Language', code: 'ENG', topics: ['Comprehension', 'Grammar', 'Essay Writing', 'Oral English', 'Literature'],
  },
  {
    name: 'Physics', code: 'PHY', topics: ['Mechanics', 'Thermodynamics', 'Waves & Optics', 'Electromagnetism', 'Modern Physics'],
  },
  {
    name: 'Chemistry', code: 'CHEM', topics: ['Atomic Structure', 'Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry', 'Analytical Chemistry'],
  },
  {
    name: 'Biology', code: 'BIO', topics: ['Cell Biology', 'Genetics', 'Ecology', 'Human Physiology', 'Plant Biology'],
  },
  {
    name: 'Economics', code: 'ECO', topics: ['Microeconomics', 'Macroeconomics', 'Development Economics', 'International Trade', 'Public Finance'],
  },
];

export default function SubjectsPage() {
  const [expanded, setExpanded] = useState<string[]>([]);
  const [search, setSearch] = useState('');

  const toggleExpand = (name: string) => {
    setExpanded(prev => prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]);
  };

  const filtered = subjects.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.code.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Subjects & Topics</h1>
        <button className="flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-navy-950 px-4 py-2 rounded-lg font-medium transition-colors">
          <Plus className="h-4 w-4" />
          Add Subject
        </button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-navy-400" />
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Search subjects..." className="w-full bg-navy-800 border border-navy-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-navy-400 focus:outline-none focus:ring-2 focus:ring-gold-500" />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map((subject) => {
          const isExpanded = expanded.includes(subject.name);
          return (
            <Card key={subject.name} className="bg-navy-800 border-navy-700">
              <CardContent className="p-0">
                <div className="p-5 flex items-center justify-between cursor-pointer hover:bg-navy-700/30 transition-colors"
                  onClick={() => toggleExpand(subject.name)}>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-navy-700 rounded-lg flex items-center justify-center">
                      <Book className="h-5 w-5 text-gold-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{subject.name}</h3>
                      <p className="text-navy-400 text-xs">{subject.code} · {subject.topics.length} topics</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-1.5 text-navy-400 hover:text-gold-400" onClick={(e) => { e.stopPropagation(); }}>
                      <Edit className="h-3.5 w-3.5" />
                    </button>
                    {isExpanded ? <ChevronDown className="h-4 w-4 text-navy-400" /> : <ChevronRight className="h-4 w-4 text-navy-400" />}
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-5 pb-4 border-t border-navy-700 pt-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-navy-400 font-medium">Topics</span>
                      <button className="text-xs text-gold-400 hover:text-gold-300 flex items-center gap-1">
                        <Plus className="h-3 w-3" /> Add Topic
                      </button>
                    </div>
                    <div className="space-y-1">
                      {subject.topics.map((topic) => (
                        <div key={topic} className="flex items-center justify-between px-3 py-2 bg-navy-900 rounded-lg">
                          <div className="flex items-center gap-2">
                            <Layers className="h-3 w-3 text-navy-400" />
                            <span className="text-sm text-navy-200">{topic}</span>
                          </div>
                          <div className="flex gap-1.5">
                            <button className="p-1 text-navy-500 hover:text-gold-400"><Edit className="h-3 w-3" /></button>
                            <button className="p-1 text-navy-500 hover:text-red-400"><Trash2 className="h-3 w-3" /></button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
