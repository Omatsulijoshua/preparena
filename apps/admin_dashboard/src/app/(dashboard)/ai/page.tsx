'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, Activity, DollarSign, Cpu, Zap, BarChart3 } from 'lucide-react';

const requestLogs = [
  { id: '1', user: 'John Doe', feature: 'QUESTION_EXPLANATION', provider: 'OpenAI', model: 'gpt-4o', tokens: 450, cost: 0.009, latency: 1240, cached: false, time: '2 min ago' },
  { id: '2', user: 'Jane Smith', feature: 'ESSAY_MARKING', provider: 'Anthropic', model: 'claude-3-sonnet', tokens: 1200, cost: 0.015, latency: 3200, cached: false, time: '5 min ago' },
  { id: '3', user: 'Student User', feature: 'STUDY_PLAN', provider: 'Google', model: 'gemini-pro', tokens: 800, cost: 0.004, latency: 1850, cached: true, time: '8 min ago' },
  { id: '4', user: 'Teacher', feature: 'QUESTION_GENERATION', provider: 'OpenAI', model: 'gpt-4o-mini', tokens: 350, cost: 0.002, latency: 980, cached: false, time: '12 min ago' },
  { id: '5', user: 'John Doe', feature: 'PERSONAL_TUTOR', provider: 'OpenAI', model: 'gpt-4o', tokens: 2100, cost: 0.042, latency: 4100, cached: false, time: '15 min ago' },
];

const providerStats = [
  { name: 'OpenAI', requests: 12450, cost: 124.50, tokens: 6200000, status: 'healthy', priority: 1 },
  { name: 'Anthropic', requests: 5620, cost: 84.30, tokens: 3100000, status: 'healthy', priority: 2 },
  { name: 'Google AI', requests: 2100, cost: 12.60, tokens: 1100000, status: 'healthy', priority: 3 },
];

export default function AiGatewayPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'providers' | 'logs'>('overview');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">AI Gateway</h1>
        <div className="flex gap-2">
          {(['overview', 'providers', 'logs'] as const).map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === tab ? 'bg-gold-500 text-navy-950' : 'bg-navy-800 text-navy-300 hover:text-white'}`}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'overview' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { title: 'Total Requests', value: '24,560', change: '+18%', icon: Activity, color: 'text-blue-400' },
              { title: 'Total Cost', value: '$342.80', change: '+12%', icon: DollarSign, color: 'text-green-400' },
              { title: 'Cache Hit Rate', value: '34%', change: '+5%', icon: Cpu, color: 'text-gold-400' },
              { title: 'Avg Latency', value: '1.8s', change: '-0.3s', icon: Zap, color: 'text-purple-400' },
            ].map((stat) => (
              <Card key={stat.title} className="bg-navy-800 border-navy-700">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-navy-300">{stat.title}</CardTitle>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <p className="text-xs text-green-400 mt-1">{stat.change}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-navy-800 border-navy-700">
            <CardHeader><CardTitle className="text-white">Feature Usage</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { feature: 'Question Explanation', pct: 32, color: 'bg-blue-500' },
                  { feature: 'Essay Marking', pct: 18, color: 'bg-green-500' },
                  { feature: 'Study Plan', pct: 15, color: 'bg-gold-500' },
                  { feature: 'AI Tutor', pct: 12, color: 'bg-purple-500' },
                  { feature: 'Flashcards', pct: 10, color: 'bg-pink-500' },
                  { feature: 'Question Gen', pct: 8, color: 'bg-indigo-500' },
                  { feature: 'Performance Analysis', pct: 3, color: 'bg-teal-500' },
                  { feature: 'Other', pct: 2, color: 'bg-gray-500' },
                ].map((f) => (
                  <div key={f.feature} className="bg-navy-900 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-navy-300">{f.feature}</span>
                      <span className="text-xs text-white font-medium">{f.pct}%</span>
                    </div>
                    <div className="h-1.5 bg-navy-700 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${f.color} transition-all`} style={{ width: `${f.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {activeTab === 'providers' && (
        <Card className="bg-navy-800 border-navy-700">
          <CardContent className="p-0">
            <table className="w-full">
              <thead>
                <tr className="border-b border-navy-700">
                  <th className="text-left text-navy-400 text-sm font-medium px-4 py-3">Provider</th>
                  <th className="text-left text-navy-400 text-sm font-medium px-4 py-3">Priority</th>
                  <th className="text-left text-navy-400 text-sm font-medium px-4 py-3">Status</th>
                  <th className="text-left text-navy-400 text-sm font-medium px-4 py-3">Requests</th>
                  <th className="text-left text-navy-400 text-sm font-medium px-4 py-3">Tokens</th>
                  <th className="text-left text-navy-400 text-sm font-medium px-4 py-3">Cost</th>
                  <th className="text-left text-navy-400 text-sm font-medium px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {providerStats.map((p) => (
                  <tr key={p.name} className="border-b border-navy-700/50 hover:bg-navy-700/30">
                    <td className="px-4 py-3 text-white font-medium">{p.name}</td>
                    <td className="px-4 py-3"><span className="text-xs bg-navy-700 text-navy-200 px-2 py-0.5 rounded">Priority {p.priority}</span></td>
                    <td className="px-4 py-3"><span className="text-xs bg-green-900/40 text-green-400 px-2 py-0.5 rounded capitalize">{p.status}</span></td>
                    <td className="px-4 py-3 text-navy-300">{p.requests.toLocaleString()}</td>
                    <td className="px-4 py-3 text-navy-300">{p.tokens}</td>
                    <td className="px-4 py-3 text-navy-300">${p.cost.toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <button className="text-xs text-navy-400 hover:text-gold-400">Configure</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      {activeTab === 'logs' && (
        <Card className="bg-navy-800 border-navy-700">
          <CardContent className="p-0">
            <table className="w-full">
              <thead>
                <tr className="border-b border-navy-700">
                  <th className="text-left text-navy-400 text-sm font-medium px-4 py-3">User</th>
                  <th className="text-left text-navy-400 text-sm font-medium px-4 py-3">Feature</th>
                  <th className="text-left text-navy-400 text-sm font-medium px-4 py-3">Provider</th>
                  <th className="text-left text-navy-400 text-sm font-medium px-4 py-3">Model</th>
                  <th className="text-left text-navy-400 text-sm font-medium px-4 py-3">Tokens</th>
                  <th className="text-left text-navy-400 text-sm font-medium px-4 py-3">Cost</th>
                  <th className="text-left text-navy-400 text-sm font-medium px-4 py-3">Latency</th>
                  <th className="text-left text-navy-400 text-sm font-medium px-4 py-3">Cached</th>
                  <th className="text-left text-navy-400 text-sm font-medium px-4 py-3">Time</th>
                </tr>
              </thead>
              <tbody>
                {requestLogs.map((log) => (
                  <tr key={log.id} className="border-b border-navy-700/50 hover:bg-navy-700/30">
                    <td className="px-4 py-3 text-white text-sm">{log.user}</td>
                    <td className="px-4 py-3 text-navy-300 text-xs">{log.feature.replace(/_/g, ' ')}</td>
                    <td className="px-4 py-3 text-navy-300 text-sm">{log.provider}</td>
                    <td className="px-4 py-3 text-navy-400 text-xs">{log.model}</td>
                    <td className="px-4 py-3 text-navy-300 text-sm">{log.tokens.toLocaleString()}</td>
                    <td className="px-4 py-3 text-navy-300 text-sm">${log.cost.toFixed(3)}</td>
                    <td className="px-4 py-3 text-navy-300 text-sm">{log.latency}ms</td>
                    <td className="px-4 py-3">{log.cached ? <span className="text-xs text-green-400">Yes</span> : <span className="text-xs text-navy-400">No</span>}</td>
                    <td className="px-4 py-3 text-navy-400 text-sm">{log.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
