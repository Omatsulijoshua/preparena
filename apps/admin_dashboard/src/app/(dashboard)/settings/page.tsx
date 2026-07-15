'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Save, RotateCcw, Eye, EyeOff, Shield, Mail, Bell, Database, Lock, Palette } from 'lucide-react';

const settingsSections = [
  {
    id: 'general',
    title: 'General Settings',
    icon: Palette,
    fields: [
      { key: 'app_name', label: 'Application Name', value: 'PrepArena', type: 'text' },
      { key: 'support_email', label: 'Support Email', value: 'support@preparena.com', type: 'email' },
      { key: 'maintenance_mode', label: 'Maintenance Mode', value: 'false', type: 'toggle' },
    ],
  },
  {
    id: 'security',
    title: 'Security',
    icon: Shield,
    fields: [
      { key: 'max_login_attempts', label: 'Max Login Attempts', value: '5', type: 'number' },
      { key: 'session_timeout', label: 'Session Timeout (minutes)', value: '60', type: 'number' },
      { key: 'require_email_verification', label: 'Require Email Verification', value: 'true', type: 'toggle' },
      { key: 'two_factor_auth', label: 'Two-Factor Authentication', value: 'false', type: 'toggle' },
    ],
  },
  {
    id: 'email',
    title: 'Email Configuration',
    icon: Mail,
    fields: [
      { key: 'smtp_host', label: 'SMTP Host', value: 'smtp.sendgrid.net', type: 'text' },
      { key: 'smtp_port', label: 'SMTP Port', value: '587', type: 'number' },
      { key: 'smtp_user', label: 'SMTP Username', value: 'apikey', type: 'text' },
      { key: 'smtp_pass', label: 'SMTP Password', value: '••••••••', type: 'password' },
    ],
  },
  {
    id: 'storage',
    title: 'Storage & Backup',
    icon: Database,
    fields: [
      { key: 'backup_frequency', label: 'Backup Frequency', value: 'Daily', type: 'select', options: ['Hourly', 'Daily', 'Weekly'] },
      { key: 'retention_days', label: 'Retention Period (days)', value: '30', type: 'number' },
      { key: 'auto_backup', label: 'Automatic Backup', value: 'true', type: 'toggle' },
    ],
  },
  {
    id: 'notifications',
    title: 'Notifications',
    icon: Bell,
    fields: [
      { key: 'email_notifications', label: 'Email Notifications', value: 'true', type: 'toggle' },
      { key: 'push_notifications', label: 'Push Notifications', value: 'true', type: 'toggle' },
      { key: 'sms_notifications', label: 'SMS Notifications', value: 'false', type: 'toggle' },
    ],
  },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('general');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const currentSection = settingsSections.find(s => s.id === activeSection)!;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-navy-800 border border-navy-700 text-navy-200 px-4 py-2 rounded-lg hover:bg-navy-700 transition-colors">
            <RotateCcw className="h-4 w-4" />
            Reset
          </button>
          <button onClick={handleSave} className="flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-navy-950 px-4 py-2 rounded-lg font-medium transition-colors">
            <Save className="h-4 w-4" />
            {saved ? 'Saved!' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="flex gap-6">
        <div className="w-64 space-y-1 shrink-0">
          {settingsSections.map((section) => (
            <button key={section.id} onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors text-left ${activeSection === section.id ? 'bg-gold-500/10 text-gold-400 border border-gold-500/20' : 'text-navy-300 hover:text-white hover:bg-navy-800'}`}>
              <section.icon className="h-4 w-4" />
              {section.title}
            </button>
          ))}
        </div>

        <Card className="flex-1 bg-navy-800 border-navy-700">
          <CardHeader>
            <CardTitle className="text-white">{currentSection.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {currentSection.fields.map((field) => (
              <div key={field.key} className="flex items-center justify-between">
                <label className="text-sm text-navy-200">{field.label}</label>
                {field.type === 'toggle' ? (
                  <div className={`w-10 h-5 rounded-full transition-colors cursor-pointer ${field.value === 'true' ? 'bg-gold-500' : 'bg-navy-600'} relative`}>
                    <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${field.value === 'true' ? 'left-5' : 'left-0.5'}`} />
                  </div>
                ) : field.type === 'select' ? (
                  <select className="bg-navy-700 border border-navy-600 text-white text-sm px-3 py-1.5 rounded-lg w-48">
                    {field.options?.map(o => <option key={o} selected={o === field.value}>{o}</option>)}
                  </select>
                ) : (
                  <div className="relative w-48">
                    <input type={field.type} defaultValue={field.value}
                      className="w-full bg-navy-700 border border-navy-600 text-white text-sm px-3 py-1.5 rounded-lg pr-8 focus:outline-none focus:ring-1 focus:ring-gold-500" />
                    {field.type === 'password' && (
                      <EyeOff className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-navy-400 cursor-pointer" />
                    )}
                  </div>
                )}
              </div>
            ))}

            {activeSection === 'storage' && (
              <div className="pt-4 border-t border-navy-700">
                <button className="text-sm text-gold-400 hover:text-gold-300">Run Backup Now</button>
                <p className="text-xs text-navy-400 mt-1">Last backup: 12 hours ago</p>
              </div>
            )}

            {activeSection === 'general' && (
              <div className="pt-4 border-t border-navy-700">
                <button className="text-sm text-red-400 hover:text-red-300">Export All Data</button>
                <p className="text-xs text-navy-400 mt-1">Download a complete export of all platform data (JSON)</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
