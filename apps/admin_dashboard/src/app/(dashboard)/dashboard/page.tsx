'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, BookOpen, DollarSign, TrendingUp, Activity, Award } from 'lucide-react';

const stats = [
  { title: 'Total Students', value: '12,450', change: '+12%', icon: Users, color: 'text-blue-400' },
  { title: 'Active Examinations', value: '48', change: '+4', icon: BookOpen, color: 'text-green-400' },
  { title: 'Revenue (NGN)', value: '₦2.4M', change: '+18%', icon: DollarSign, color: 'text-gold-400' },
  { title: 'Readiness Score', value: '74%', change: '+5%', icon: Activity, color: 'text-purple-400' },
];

const recentActivities = [
  { user: 'John Doe', action: 'Completed WAEC Mathematics', time: '5 min ago' },
  { user: 'Jane Smith', action: 'Subscribed to Annual plan', time: '12 min ago' },
  { user: 'School Admin', action: 'Created 50 new questions', time: '1 hour ago' },
  { user: 'Teacher', action: 'Assigned test to SS3 class', time: '2 hours ago' },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-navy-300 text-sm">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-navy-800 border-navy-700">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-navy-300">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <p className="text-xs text-green-400 mt-1">{stat.change} from last month</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-navy-800 border-navy-700">
          <CardHeader>
            <CardTitle className="text-white">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, i) => (
                <div key={i} className="flex items-center justify-between border-b border-navy-700 pb-3 last:border-0">
                  <div>
                    <p className="text-sm text-white font-medium">{activity.user}</p>
                    <p className="text-xs text-navy-400">{activity.action}</p>
                  </div>
                  <span className="text-xs text-navy-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-navy-800 border-navy-700">
          <CardHeader>
            <CardTitle className="text-white">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {['Create Question', 'Add Student', 'Manage Exams', 'View Reports', 'Send Notification', 'Backup Data'].map((action) => (
                <button key={action} className="p-3 bg-navy-700 rounded-lg text-sm text-navy-200 hover:bg-navy-600 hover:text-white transition-colors text-left">
                  {action}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
