'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, BookOpen, DollarSign, Award, Activity } from 'lucide-react';

const weeklyData = [
  { day: 'Mon', students: 120, exams: 45, revenue: 85000 },
  { day: 'Tue', students: 145, exams: 52, revenue: 120000 },
  { day: 'Wed', students: 162, exams: 58, revenue: 95000 },
  { day: 'Thu', students: 138, exams: 48, revenue: 110000 },
  { day: 'Fri', students: 155, exams: 55, revenue: 140000 },
  { day: 'Sat', students: 198, exams: 72, revenue: 165000 },
  { day: 'Sun', students: 88, exams: 32, revenue: 45000 },
];

const subjectData = [
  { name: 'Mathematics', score: 72, students: 340 },
  { name: 'English', score: 68, students: 310 },
  { name: 'Physics', score: 55, students: 280 },
  { name: 'Chemistry', score: 61, students: 265 },
  { name: 'Biology', score: 74, students: 295 },
  { name: 'Economics', score: 70, students: 220 },
];

const examTypeData = [
  { name: 'WAEC', value: 35 },
  { name: 'NECO', value: 25 },
  { name: 'JAMB', value: 20 },
  { name: 'SAT', value: 12 },
  { name: 'School', value: 8 },
];

const COLORS = ['#f8b426', '#4064b2', '#22c55e', '#ef4444', '#a855f7'];

const statsCards = [
  { title: 'Active Students', value: '12,450', change: '+12%', icon: Users, color: 'text-blue-400' },
  { title: 'Exams Taken', value: '48,230', change: '+18%', icon: BookOpen, color: 'text-green-400' },
  { title: 'Revenue (NGN)', value: '₦8.2M', change: '+15%', icon: DollarSign, color: 'text-gold-400' },
  { title: 'Avg Readiness', value: '68%', change: '+5%', icon: Award, color: 'text-purple-400' },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Analytics</h1>
        <div className="flex gap-2">
          <select className="bg-navy-800 border border-navy-700 text-navy-200 text-sm px-3 py-2 rounded-lg">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last quarter</option>
          </select>
          <button className="bg-navy-800 border border-navy-700 text-navy-200 px-4 py-2 rounded-lg text-sm hover:bg-navy-700">Export</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {statsCards.map((stat) => (
          <Card key={stat.title} className="bg-navy-800 border-navy-700">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-navy-300">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <p className="text-xs text-green-400 mt-1">{stat.change} from last period</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-navy-800 border-navy-700">
          <CardHeader><CardTitle className="text-white">Daily Activity</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={weeklyData}>
                <defs>
                  <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#f8b426" stopOpacity={0.3}/><stop offset="95%" stopColor="#f8b426" stopOpacity={0}/></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e3a5f" />
                <XAxis dataKey="day" stroke="#4a6fa5" tick={{ fill: '#8da2d1' }} />
                <YAxis stroke="#4a6fa5" tick={{ fill: '#8da2d1' }} />
                <Tooltip contentStyle={{ backgroundColor: '#0a1f4a', border: '1px solid #1e3a5f', borderRadius: '8px', color: '#fff' }} />
                <Area type="monotone" dataKey="students" stroke="#f8b426" fillOpacity={1} fill="url(#colorStudents)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-navy-800 border-navy-700">
          <CardHeader><CardTitle className="text-white">Revenue Trend</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e3a5f" />
                <XAxis dataKey="day" stroke="#4a6fa5" tick={{ fill: '#8da2d1' }} />
                <YAxis stroke="#4a6fa5" tick={{ fill: '#8da2d1' }} />
                <Tooltip contentStyle={{ backgroundColor: '#0a1f4a', border: '1px solid #1e3a5f', borderRadius: '8px', color: '#fff' }} />
                <Line type="monotone" dataKey="revenue" stroke="#22c55e" strokeWidth={2} dot={{ fill: '#22c55e' }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-navy-800 border-navy-700">
          <CardHeader><CardTitle className="text-white">Subject Performance</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={subjectData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#1e3a5f" />
                <XAxis type="number" domain={[0, 100]} stroke="#4a6fa5" tick={{ fill: '#8da2d1' }} />
                <YAxis type="category" dataKey="name" stroke="#4a6fa5" tick={{ fill: '#8da2d1' }} width={80} />
                <Tooltip contentStyle={{ backgroundColor: '#0a1f4a', border: '1px solid #1e3a5f', borderRadius: '8px', color: '#fff' }} />
                <Bar dataKey="score" fill="#f8b426" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-navy-800 border-navy-700">
          <CardHeader><CardTitle className="text-white">Exam Type Distribution</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={examTypeData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={3} dataKey="value">
                  {examTypeData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0a1f4a', border: '1px solid #1e3a5f', borderRadius: '8px', color: '#fff' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {examTypeData.map((item, i) => (
                <div key={item.name} className="flex items-center gap-2 text-xs">
                  <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                  <span className="text-navy-300">{item.name} ({item.value}%)</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-navy-800 border-navy-700">
          <CardHeader><CardTitle className="text-white">Key Metrics</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: 'Avg Session Duration', value: '34 min', change: '+8%', color: 'green' },
              { label: 'Completion Rate', value: '78%', change: '+3%', color: 'green' },
              { label: 'Question Accuracy', value: '65%', change: '-2%', color: 'red' },
              { label: 'Daily Active Users', value: '3,245', change: '+12%', color: 'green' },
              { label: 'Subscription Churn', value: '3.2%', change: '-0.5%', color: 'green' },
              { label: 'Avg Score', value: '62%', change: '+4%', color: 'green' },
            ].map((m) => (
              <div key={m.label} className="flex items-center justify-between py-2 border-b border-navy-700 last:border-0">
                <span className="text-sm text-navy-300">{m.label}</span>
                <div className="text-right">
                  <span className="text-white font-medium">{m.value}</span>
                  <span className={`text-xs ml-2 ${m.color === 'green' ? 'text-green-400' : 'text-red-400'}`}>{m.change}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
