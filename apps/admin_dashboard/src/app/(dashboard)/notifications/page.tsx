'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, Send, Megaphone, Users as UsersIcon, School as SchoolIcon, MessageSquare, CheckCheck } from 'lucide-react';

const notifications = [
  { id: '1', title: 'New Student Registration', message: '250 new students registered in the last 24 hours', type: 'info', audience: 'All', time: '1 hour ago', read: false },
  { id: '2', title: 'Payment Received', message: '₦500,000 school subscription payment from Lagos Grammar School', type: 'success', audience: 'Finance', time: '3 hours ago', read: false },
  { id: '3', title: 'AI Usage Alert', message: 'AI gateway usage exceeded 80% of monthly quota', type: 'warning', audience: 'Admin', time: '5 hours ago', read: false },
  { id: '4', title: 'Exam Published', message: 'WAEC 2026 Mathematics examination has been published', type: 'info', audience: 'Content', time: '1 day ago', read: true },
  { id: '5', title: 'System Backup', message: 'Daily backup completed successfully - 2.4 GB', type: 'success', audience: 'Admin', time: '1 day ago', read: true },
  { id: '6', title: 'Subscription Expiring', message: '15 student subscriptions will expire in 3 days', type: 'warning', audience: 'Finance', time: '2 days ago', read: true },
];

export default function NotificationsPage() {
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? notifications : filter === 'unread' ? notifications.filter(n => !n.read) : notifications;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Notifications</h1>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-navy-800 border border-navy-700 text-navy-200 px-4 py-2 rounded-lg text-sm hover:bg-navy-700">
            <CheckCheck className="h-4 w-4" />
            Mark All Read
          </button>
          <button className="flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-navy-950 px-4 py-2 rounded-lg font-medium transition-colors">
            <Send className="h-4 w-4" />
            Send Notification
          </button>
        </div>
      </div>

      <div className="flex gap-2">
        {['all', 'unread', 'sent'].map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${filter === f ? 'bg-gold-500 text-navy-950' : 'bg-navy-800 text-navy-300 hover:text-white'}`}>{f}</button>
        ))}
      </div>

      <Card className="bg-navy-800 border-navy-700">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-white">Recent Notifications</CardTitle>
            <span className="text-xs text-navy-400">{notifications.filter(n => !n.read).length} unread</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-1">
          {filtered.map((n) => (
            <div key={n.id} className={`p-4 rounded-lg transition-colors ${!n.read ? 'bg-navy-700/50 border border-navy-600' : 'hover:bg-navy-700/30'}`}>
              <div className="flex items-start gap-3">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${
                  n.type === 'success' ? 'bg-green-900/40 text-green-400' :
                  n.type === 'warning' ? 'bg-yellow-900/40 text-yellow-400' :
                  'bg-blue-900/40 text-blue-400'
                }`}>
                  {n.type === 'success' ? <CheckCheck className="h-4 w-4" /> : n.type === 'warning' ? <Megaphone className="h-4 w-4" /> : <Bell className="h-4 w-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className={`text-sm ${!n.read ? 'text-white font-semibold' : 'text-navy-200'}`}>{n.title}</h4>
                    <span className="text-xs text-navy-500 shrink-0">{n.time}</span>
                  </div>
                  <p className="text-xs text-navy-400 mt-0.5">{n.message}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs bg-navy-700 text-navy-300 px-2 py-0.5 rounded">{n.audience}</span>
                    {!n.read && <span className="text-xs text-gold-400">New</span>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="bg-navy-800 border-navy-700">
        <CardHeader><CardTitle className="text-white">Quick Send</CardTitle></CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-3">
            {[
              { icon: UsersIcon, label: 'All Students', desc: 'Send to all active students' },
              { icon: SchoolIcon, label: 'By School', desc: 'Target specific schools' },
              { icon: MessageSquare, label: 'Custom', desc: 'Select individual users' },
            ].map((item) => (
              <button key={item.label} className="p-4 bg-navy-700/50 rounded-xl text-left hover:bg-navy-700 transition-colors border border-navy-600">
                <item.icon className="h-5 w-5 text-gold-400 mb-2" />
                <p className="text-white text-sm font-medium">{item.label}</p>
                <p className="text-navy-400 text-xs mt-0.5">{item.desc}</p>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
