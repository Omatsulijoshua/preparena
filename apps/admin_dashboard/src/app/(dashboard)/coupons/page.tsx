'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Plus, Tag, Percent, Calendar, Copy, CheckCircle, XCircle } from 'lucide-react';

const coupons = [
  { id: '1', code: 'WELCOME50', type: 'Percentage', value: 50, uses: 45, maxUses: 100, plan: 'Any', expires: '2026-12-31', status: 'Active' },
  { id: '2', code: 'SAVE1000', type: 'Fixed', value: 1000, uses: 28, maxUses: 50, plan: 'Monthly', expires: '2026-09-30', status: 'Active' },
  { id: '3', code: 'STUDENT25', type: 'Percentage', value: 25, uses: 120, maxUses: null, plan: 'Annual', expires: null, status: 'Active' },
  { id: '4', code: 'SCHOOL2026', type: 'Fixed', value: 50000, uses: 5, maxUses: 20, plan: 'School', expires: '2026-06-30', status: 'Active' },
  { id: '5', code: 'EXPIRED20', type: 'Percentage', value: 20, uses: 200, maxUses: 200, plan: 'Any', expires: '2025-12-31', status: 'Expired' },
];

const vouchers = [
  { id: '1', code: 'LAGOS-GRAM-001', plan: 'School', duration: '365 days', uses: 0, maxUses: 500, school: 'Lagos Grammar School', status: 'Active' },
  { id: '2', code: 'PREMIER-2026', plan: 'School', duration: '365 days', uses: 150, maxUses: 300, school: 'Premier Intl College', status: 'Active' },
  { id: '3', code: 'ROYAL-ACAD-01', plan: 'Family', duration: '365 days', uses: 45, maxUses: 100, school: 'Royal Academy', status: 'Active' },
];

export default function CouponsPage() {
  const [tab, setTab] = useState<'coupons' | 'vouchers'>('coupons');
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Coupons & Vouchers</h1>
        <button className="flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-navy-950 px-4 py-2 rounded-lg font-medium transition-colors">
          <Plus className="h-4 w-4" />
          {tab === 'coupons' ? 'Create Coupon' : 'Generate Vouchers'}
        </button>
      </div>

      <div className="flex gap-2">
        <button onClick={() => setTab('coupons')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tab === 'coupons' ? 'bg-gold-500 text-navy-950' : 'bg-navy-800 text-navy-300 hover:text-white'}`}>Coupons</button>
        <button onClick={() => setTab('vouchers')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tab === 'vouchers' ? 'bg-gold-500 text-navy-950' : 'bg-navy-800 text-navy-300 hover:text-white'}`}>School Vouchers</button>
      </div>

      {tab === 'coupons' && (
        <>
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-navy-400" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search coupons..." className="w-full bg-navy-800 border border-navy-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-navy-400 focus:outline-none focus:ring-2 focus:ring-gold-500" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {coupons.filter(c => c.code.toLowerCase().includes(search.toLowerCase())).map((coupon) => (
              <Card key={coupon.id} className="bg-navy-800 border-navy-700 hover:border-gold-500/30 transition-all">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4 text-gold-400" />
                      <code className="text-lg font-bold text-white font-mono">{coupon.code}</code>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded ${coupon.status === 'Active' ? 'bg-green-900/40 text-green-400' : 'bg-red-900/40 text-red-400'}`}>{coupon.status}</span>
                  </div>
                  <div className="space-y-1.5 text-sm">
                    <div className="flex justify-between"><span className="text-navy-400">Type</span><span className="text-white">{coupon.type}</span></div>
                    <div className="flex justify-between"><span className="text-navy-400">Value</span><span className="text-gold-400 font-semibold">{coupon.type === 'Percentage' ? `${coupon.value}%` : `₦${coupon.value.toLocaleString()}`}</span></div>
                    <div className="flex justify-between"><span className="text-navy-400">Usage</span><span className="text-white">{coupon.uses}{coupon.maxUses ? ` / ${coupon.maxUses}` : ''}</span></div>
                    <div className="flex justify-between"><span className="text-navy-400">Plan</span><span className="text-white">{coupon.plan}</span></div>
                    {coupon.expires && <div className="flex justify-between"><span className="text-navy-400">Expires</span><span className="text-white text-xs"><Calendar className="h-3 w-3 inline mr-1" />{coupon.expires}</span></div>}
                  </div>
                  <div className="flex gap-2 mt-3 pt-3 border-t border-navy-700">
                    <button className="flex items-center gap-1 text-xs text-navy-300 hover:text-gold-400"><Copy className="h-3 w-3" /> Copy</button>
                    <button className="text-xs text-navy-300 hover:text-gold-400">Edit</button>
                    <button className="text-xs text-red-400 hover:text-red-300 ml-auto">Deactivate</button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}

      {tab === 'vouchers' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { label: 'Total Vouchers', value: '1,250', change: '+50 this month' },
              { label: 'Active Vouchers', value: '890', change: '71% utilization' },
              { label: 'Redeemed', value: '360', change: '29% redemption rate' },
              { label: 'Schools Using', value: '12', change: 'of 18 active schools' },
            ].map((s) => (
              <Card key={s.label} className="bg-navy-800 border-navy-700">
                <CardHeader className="pb-2"><CardTitle className="text-sm text-navy-400">{s.label}</CardTitle></CardHeader>
                <CardContent><div className="text-2xl font-bold text-white">{s.value}</div><p className="text-xs text-navy-400 mt-1">{s.change}</p></CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-navy-800 border-navy-700">
            <CardContent className="p-0">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-navy-700">
                    <th className="text-left text-navy-400 text-sm font-medium px-4 py-3">Code</th>
                    <th className="text-left text-navy-400 text-sm font-medium px-4 py-3">Plan</th>
                    <th className="text-left text-navy-400 text-sm font-medium px-4 py-3">Duration</th>
                    <th className="text-left text-navy-400 text-sm font-medium px-4 py-3">Usage</th>
                    <th className="text-left text-navy-400 text-sm font-medium px-4 py-3">School</th>
                    <th className="text-left text-navy-400 text-sm font-medium px-4 py-3">Status</th>
                    <th className="text-left text-navy-400 text-sm font-medium px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {vouchers.map((v) => (
                    <tr key={v.id} className="border-b border-navy-700/50 hover:bg-navy-700/30">
                      <td className="px-4 py-3"><code className="text-white font-mono text-sm">{v.code}</code></td>
                      <td className="px-4 py-3 text-navy-300 text-sm">{v.plan}</td>
                      <td className="px-4 py-3 text-navy-300 text-sm">{v.duration}</td>
                      <td className="px-4 py-3 text-navy-300 text-sm">{v.uses}{v.maxUses ? ` / ${v.maxUses}` : ''}</td>
                      <td className="px-4 py-3 text-navy-300 text-sm">{v.school}</td>
                      <td className="px-4 py-3"><span className="text-xs bg-green-900/40 text-green-400 px-2 py-0.5 rounded">{v.status}</span></td>
                      <td className="px-4 py-3"><button className="text-xs text-navy-400 hover:text-gold-400">Manage</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
