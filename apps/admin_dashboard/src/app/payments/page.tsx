'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';

const payments = [
  { id: '1', user: 'John Doe', plan: 'MONTHLY', amount: '₦5,000', provider: 'Paystack', status: 'Verified', date: '2026-07-14' },
  { id: '2', user: 'Jane Smith', plan: 'ANNUAL', amount: '₦45,000', provider: 'Stripe', status: 'Verified', date: '2026-07-13' },
  { id: '3', user: 'Student User', plan: 'WEEKLY', amount: '₦1,500', provider: 'Flutterwave', status: 'Pending', date: '2026-07-12' },
  { id: '4', user: 'School Admin', plan: 'SCHOOL', amount: '₦500,000', provider: 'Bank Transfer', status: 'Pending', date: '2026-07-11' },
  { id: '5', user: 'Family User', plan: 'FAMILY', amount: '₦75,000', provider: 'Paystack', status: 'Verified', date: '2026-07-10' },
];

const revenueData = { total: '₦3,245,000', monthly: '₦845,000', activeSubs: '1,234', churnRate: '3.2%' };

export default function PaymentsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Payments & Revenue</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
