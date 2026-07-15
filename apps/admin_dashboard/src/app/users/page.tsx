'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Search } from 'lucide-react';
import { useState } from 'react';

const users = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'STUDENT', status: 'Active', exams: 24, joined: 'Jan 2026' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'TEACHER', status: 'Active', exams: 156, joined: 'Mar 2025' },
  { id: '3', name: 'School Admin', email: 'admin@school.edu', role: 'SCHOOL_ADMIN', status: 'Active', exams: 89, joined: 'Dec 2025' },
  { id: '4', name: 'Parent User', email: 'parent@example.com', role: 'PARENT', status: 'Active', exams: 0, joined: 'Feb 2026' },
  { id: '5', name: 'Suspended User', email: 'suspended@example.com', role: 'STUDENT', status: 'Suspended', exams: 12, joined: 'Aug 2025' },
];

export default function UsersPage() {
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">User Management</h1>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-navy-400" />
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users..." className="w-full bg-navy-800 border border-navy-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-navy-400 focus:outline-none focus:ring-2 focus:ring-gold-500" />
      </div>

      <Card className="bg-navy-800 border-navy-700">
        <CardContent className="p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b border-navy-700">
                <th className="text-left text-navy-400 text-sm font-medium px-4 py-3">Name</th>
                <th className="text-left text-navy-400 text-sm font-medium px-4 py-3">Email</th>
                <th className="text-left text-navy-400 text-sm font-medium px-4 py-3">Role</th>
                <th className="text-left text-navy-400 text-sm font-medium px-4 py-3">Status</th>
                <th className="text-left text-navy-400 text-sm font-medium px-4 py-3">Exams</th>
                <th className="text-left text-navy-400 text-sm font-medium px-4 py-3">Joined</th>
                <th className="text-right text-navy-400 text-sm font-medium px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.filter(u => u.name.toLowerCase().includes(search.toLowerCase())).map((u) => (
                <tr key={u.id} className="border-b border-navy-700/50 hover:bg-navy-700/30">
                  <td className="px-4 py-3 text-white text-sm">{u.name}</td>
                  <td className="px-4 py-3 text-navy-300 text-sm">{u.email}</td>
                  <td className="px-4 py-3"><span className="text-xs bg-navy-700 text-navy-200 px-2 py-1 rounded">{u.role}</span></td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded ${u.status === 'Active' ? 'bg-green-900/40 text-green-400' : 'bg-red-900/40 text-red-400'}`}>{u.status}</span>
                  </td>
                  <td className="px-4 py-3 text-navy-300 text-sm">{u.exams}</td>
                  <td className="px-4 py-3 text-navy-400 text-sm">{u.joined}</td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-navy-400 hover:text-gold-400 text-sm">Manage</button>
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
