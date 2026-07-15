import 'package:flutter/material.dart';
import 'package:percent_indicator/percent_indicator.dart';
import '../../../core/theme/app_theme.dart';
import '../../../core/theme/theme_cubit.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      backgroundColor: isDark ? AppTheme.navy950 : AppTheme.navy50,
      appBar: AppBar(title: const Text('Profile')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          // Profile Header
          Center(child: Column(children: [
            Stack(children: [
              CircleAvatar(radius: 44, backgroundColor: AppTheme.gold500, child: Text('J', style: TextStyle(fontSize: 32, fontWeight: FontWeight.bold, color: AppTheme.navy950))),
              Positioned(bottom: 0, right: 0, child: Container(
                padding: const EdgeInsets.all(4),
                decoration: BoxDecoration(color: Colors.green, shape: BoxShape.circle, border: Border.all(color: isDark ? AppTheme.navy950 : Colors.white, width: 2)),
                child: const Icon(Icons.check, size: 14, color: Colors.white),
              )),
            ]),
            const SizedBox(height: 12),
            Text('Joshua', style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: isDark ? Colors.white : AppTheme.navy900)),
            Text('Premium Subscriber', style: TextStyle(color: AppTheme.gold500, fontWeight: FontWeight.w500)),
          ])),
          const SizedBox(height: 24),

          // Stats
          Row(children: [
            _ProfileStat(label: 'Streak', value: '5 days', icon: Icons.local_fire_department, isDark: isDark),
            const SizedBox(width: 12),
            _ProfileStat(label: 'Readiness', value: '72%', icon: Icons.trending_up, isDark: isDark),
            const SizedBox(width: 12),
            _ProfileStat(label: 'Rank', value: '#1,234', icon: Icons.emoji_events, isDark: isDark),
          ]),
          const SizedBox(height: 24),

          // Settings
          Text('Settings', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w600, color: isDark ? Colors.white : AppTheme.navy900)),
          const SizedBox(height: 12),

          _SettingsTile(icon: Icons.dark_mode, title: 'Dark Mode', trailing: Switch(
            value: isDark,
            activeColor: AppTheme.gold500,
            onChanged: (_) => context.read<ThemeCubit>().toggle(),
          ), isDark: isDark),
          _SettingsTile(icon: Icons.notifications_outlined, title: 'Notifications', trailing: Switch(value: true, activeColor: AppTheme.gold500, onChanged: (_) {}), isDark: isDark),
          _SettingsTile(icon: Icons.download_outlined, title: 'Offline Content', trailing: const Text('1.2 GB', style: TextStyle(color: AppTheme.gold500)), isDark: isDark),
          _SettingsTile(icon: Icons.language, title: 'Language', trailing: const Text('English', style: TextStyle(color: AppTheme.gold500)), isDark: isDark),
          _SettingsTile(icon: Icons.headphones, title: 'Voice Tutor', trailing: Switch(value: false, activeColor: AppTheme.gold500, onChanged: (_) {}), isDark: isDark),
          const Divider(height: 32),
          _SettingsTile(icon: Icons.info_outline, title: 'About', trailing: const Text('v1.0.0', style: TextStyle(color: AppTheme.navy400)), isDark: isDark),
          _SettingsTile(icon: Icons.logout, title: 'Sign Out', titleColor: Colors.red, isDark: isDark),

          const SizedBox(height: 32),
        ],
      ),
    );
  }
}

class _ProfileStat extends StatelessWidget {
  final String label, value;
  final IconData icon;
  final bool isDark;
  const _ProfileStat({required this.label, required this.value, required this.icon, required this.isDark});

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.all(14),
        decoration: BoxDecoration(
          color: isDark ? AppTheme.navy800 : Colors.white,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: isDark ? AppTheme.navy700 : AppTheme.navy100),
        ),
        child: Column(children: [
          Icon(icon, color: AppTheme.gold500, size: 22),
          const SizedBox(height: 6),
          Text(value, style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14, color: isDark ? Colors.white : AppTheme.navy900)),
          Text(label, style: TextStyle(fontSize: 11, color: isDark ? AppTheme.navy400 : AppTheme.navy500)),
        ]),
      ),
    );
  }
}

class _SettingsTile extends StatelessWidget {
  final IconData icon;
  final String title;
  final Widget? trailing;
  final Color? titleColor;
  final bool isDark;
  const _SettingsTile({required this.icon, required this.title, this.trailing, this.titleColor, required this.isDark});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 4),
      decoration: BoxDecoration(
        color: isDark ? AppTheme.navy800 : Colors.white,
        borderRadius: BorderRadius.circular(10),
      ),
      child: ListTile(
        leading: Icon(icon, color: titleColor ?? (isDark ? AppTheme.navy300 : AppTheme.navy500)),
        title: Text(title, style: TextStyle(color: titleColor ?? (isDark ? Colors.white : AppTheme.navy900))),
        trailing: trailing,
      ),
    );
  }
}
