'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const revenueChart = [
  { month: 'Jan', revenue: 850000, subscriptions: 120 },
  { month: 'Feb', revenue: 920000, subscriptions: 135 },
  { month: 'Mar', revenue: 1100000, subscriptions: 158 },
  { month: 'Apr', revenue: 980000, subscriptions: 142 },
  { month: 'May', revenue: 1250000, subscriptions: 175 },
  { month: 'Jun', revenue: 1450000, subscriptions: 198 },
  { month: 'Jul', revenue: 1380000, subscriptions: 185 },
];

const payments = [
  { id: '1', user: 'John Doe', plan: 'MONTHLY', amount: '₦5,000', provider: 'Paystack', status: 'Verified', date: '2026-07-14' },
  { id: '2', user: 'Jane Smith', plan: 'ANNUAL', amount: '₦45,000', provider: 'Stripe', status: 'Verified', date: '2026-07-13' },
  { id: '3', user: 'Student User', plan: 'WEEKLY', amount: '₦1,500', provider: 'Flutterwave', status: 'Pending', date: '2026-07-12' },
  { id: '4', user: 'School Admin', plan: 'SCHOOL', amount: '₦500,000', provider: 'Bank Transfer', status: 'Pending', date: '2026-07-11' },
  { id: '5', user: 'Family User', plan: 'FAMILY', amount: '₦75,000', provider: 'Paystack', status: 'Verified', date: '2026-07-10' },
];

const revenueData = { total: '₦8,245,000', monthly: '₦1,380,000', activeSubs: '3,210', churnRate: '3.2%', avgRevenue: '₦430/user', pendingPayouts: '₦245,000' };

export default function PaymentsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Payments & Revenue</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {Object.entries(revenueData).map(([key, value]) => (
          <Card key={key} className="bg-navy-800 border-navy-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-navy-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-white">{value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-navy-800 border-navy-700">
        <CardHeader><CardTitle className="text-white">Revenue Overview</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={revenueChart}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e3a5f" />
              <XAxis dataKey="month" stroke="#4a6fa5" tick={{ fill: '#8da2d1' }} />
              <YAxis stroke="#4a6fa5" tick={{ fill: '#8da2d1' }} />
              <Tooltip contentStyle={{ backgroundColor: '#0a1f4a', border: '1px solid #1e3a5f', borderRadius: '8px', color: '#fff' }} />
              <Bar dataKey="revenue" fill="#f8b426" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="bg-navy-800 border-navy-700">
        <CardContent className="p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b border-navy-700">
                <th className="text-left text-navy-400 text-sm font-medium px-4 py-3">User</th>
                <th className="text-left text-navy-400 text-sm font-medium px-4 py-3">Plan</th>
                <th className="text-left text-navy-400 text-sm font-medium px-4 py-3">Amount</th>
                <th className="text-left text-navy-400 text-sm font-medium px-4 py-3">Provider</th>
                <th className="text-left text-navy-400 text-sm font-medium px-4 py-3">Status</th>
                <th className="text-left text-navy-400 text-sm font-medium px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id} className="border-b border-navy-700/50 hover:bg-navy-700/30">
                  <td className="px-4 py-3 text-white text-sm">{p.user}</td>
                  <td className="px-4 py-3 text-navy-300 text-sm">{p.plan}</td>
                  <td className="px-4 py-3 text-white text-sm font-medium">{p.amount}</td>
                  <td className="px-4 py-3 text-navy-300 text-sm">{p.provider}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded ${p.status === 'Verified' ? 'bg-green-900/40 text-green-400' : 'bg-yellow-900/40 text-yellow-400'}`}>{p.status}</span>
                  </td>
                  <td className="px-4 py-3 text-navy-400 text-sm">{p.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
