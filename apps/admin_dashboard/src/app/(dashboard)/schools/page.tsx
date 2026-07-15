'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Plus, School as SchoolIcon, MapPin, Globe, Users } from 'lucide-react';

const schools = [
  { id: '1', name: 'Lagos Grammar School', address: 'Lagos, Nigeria', domain: 'lagosgrammar.edu.ng', students: 450, status: 'Active', plan: 'SCHOOL' },
  { id: '2', name: 'Premier Intl College', address: 'Abuja, Nigeria', domain: 'premiercollege.edu.ng', students: 320, status: 'Active', plan: 'SCHOOL' },
  { id: '3', name: 'Royal Academy', address: 'Ibadan, Nigeria', domain: 'royalacademy.edu.ng', students: 280, status: 'Active', plan: 'SCHOOL' },
  { id: '4', name: 'Sunshine Schools', address: 'Port Harcourt, Nigeria', domain: null, students: 180, status: 'Inactive', plan: 'SCHOOL' },
];

export default function SchoolsPage() {
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Schools</h1>
        <button className="flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-navy-950 px-4 py-2 rounded-lg font-medium transition-colors">
          <Plus className="h-4 w-4" />
          Add School
        </button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-navy-400" />
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Search schools..." className="w-full bg-navy-800 border border-navy-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-navy-400 focus:outline-none focus:ring-2 focus:ring-gold-500" />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {schools.filter(s => s.name.toLowerCase().includes(search.toLowerCase())).map((school) => (
          <Card key={school.id} className="bg-navy-800 border-navy-700 hover:border-gold-500/30 transition-all">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 bg-navy-700 rounded-xl flex items-center justify-center">
                    <SchoolIcon className="h-6 w-6 text-gold-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{school.name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded ${school.status === 'Active' ? 'bg-green-900/40 text-green-400' : 'bg-gray-700 text-gray-400'}`}>{school.status}</span>
                  </div>
                </div>
                <span className="text-xs bg-navy-700 text-navy-300 px-2 py-1 rounded">{school.plan}</span>
              </div>
              <div className="space-y-2 text-sm text-navy-400">
                <div className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5" />{school.address}</div>
                {school.domain && <div className="flex items-center gap-2"><Globe className="h-3.5 w-3.5" />{school.domain}</div>}
                <div className="flex items-center gap-2"><Users className="h-3.5 w-3.5" />{school.students} students</div>
              </div>
              <div className="flex gap-2 mt-4 pt-3 border-t border-navy-700">
                <button className="text-xs text-navy-300 hover:text-gold-400 transition-colors">Manage</button>
                <button className="text-xs text-navy-300 hover:text-gold-400 transition-colors">Analytics</button>
                <button className="text-xs text-navy-300 hover:text-red-400 transition-colors ml-auto">Suspend</button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
