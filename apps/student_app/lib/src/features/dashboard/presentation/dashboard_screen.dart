import 'package:flutter/material.dart';
import 'package:percent_indicator/percent_indicator.dart';
import 'package:fl_chart/fl_chart.dart';
import '../../../core/theme/app_theme.dart';

class DashboardScreen extends StatelessWidget {
  const DashboardScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final bgColor = isDark ? AppTheme.navy950 : AppTheme.navy50;
    final cardBg = isDark ? AppTheme.navy800 : Colors.white;

    return Scaffold(
      backgroundColor: bgColor,
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Header
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('Hello, Joshua', style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: isDark ? Colors.white : AppTheme.navy900)),
                      Text('Ready to study?', style: TextStyle(color: isDark ? AppTheme.navy300 : AppTheme.navy500)),
                    ],
                  ),
                  Row(children: [
                    IconButton(
                      icon: Icon(Icons.notifications_outlined, color: isDark ? AppTheme.navy300 : AppTheme.navy500),
                      onPressed: () {},
                    ),
                    const CircleAvatar(radius: 20, backgroundColor: AppTheme.gold500, child: Text('J', style: TextStyle(color: AppTheme.navy950, fontWeight: FontWeight.bold))),
                  ]),
                ],
              ),
              const SizedBox(height: 20),

              // Streak & Countdown Row
              Row(children: [
                Expanded(
                  child: _DashboardCard(
                    child: Row(children: [
                      CircularPercentIndicator(
                        radius: 28, lineWidth: 5, percent: 0.65,
                        progressColor: AppTheme.gold500,
                        backgroundColor: isDark ? AppTheme.navy700 : AppTheme.navy100,
                        center: const Icon(Icons.local_fire_department, color: AppTheme.gold500, size: 20),
                      ),
                      const SizedBox(width: 12),
                      Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                        Text('5 Day Streak', style: TextStyle(fontWeight: FontWeight.w600, fontSize: 15, color: isDark ? Colors.white : AppTheme.navy900)),
                        Text('Best: 12 days', style: TextStyle(fontSize: 12, color: isDark ? AppTheme.navy400 : AppTheme.navy500)),
                      ]),
                    ]),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: _DashboardCard(
                    child: Row(children: [
                      CircularPercentIndicator(
                        radius: 28, lineWidth: 5, percent: 0.45,
                        progressColor: Colors.red.shade400,
                        backgroundColor: isDark ? AppTheme.navy700 : AppTheme.navy100,
                        center: const Icon(Icons.access_time, color: Colors.red, size: 20),
                      ),
                      const SizedBox(width: 12),
                      Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                        Text('WAEC', style: TextStyle(fontWeight: FontWeight.w600, fontSize: 15, color: isDark ? Colors.white : AppTheme.navy900)),
                        Text('67 days left', style: TextStyle(fontSize: 12, color: isDark ? AppTheme.navy400 : AppTheme.navy500)),
                      ]),
                    ]),
                  ),
                ),
              ]),
              const SizedBox(height: 16),

              // Readiness Score
              _DashboardCard(
                child: Column(children: [
                  Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
                    Text('Readiness Score', style: TextStyle(fontWeight: FontWeight.w600, fontSize: 16, color: isDark ? Colors.white : AppTheme.navy900)),
                    Text('72/100', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16, color: AppTheme.gold500)),
                  ]),
                  const SizedBox(height: 12),
                  LinearPercentIndicator(
                    percent: 0.72,
                    lineHeight: 10,
                    barRadius: const Radius.circular(5),
                    progressColor: AppTheme.gold500,
                    backgroundColor: isDark ? AppTheme.navy700 : AppTheme.navy100,
                  ),
                ]),
              ),
              const SizedBox(height: 20),

              // Subject Performance Section
              Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
                Text('Subject Performance', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w600, color: isDark ? Colors.white : AppTheme.navy900)),
                TextButton(onPressed: () {}, child: const Text('See All', style: TextStyle(color: AppTheme.gold500))),
              ]),
              const SizedBox(height: 8),

              SizedBox(
                height: 200,
                child: _DashboardCard(
                  child: BarChart(
                    BarChartData(
                      alignment: BarChartAlignment.spaceAround,
                      maxY: 100,
                      barGroups: [
                        _barGroup('Math', 85),
                        _barGroup('English', 72),
                        _barGroup('Physics', 58),
                        _barGroup('Chem', 65),
                        _barGroup('Bio', 78),
                      ],
                      titlesData: FlTitlesData(
                        leftTitles: AxisTitles(sideTitles: SideTitles(showTitles: false)),
                        topTitles: AxisTitles(sideTitles: SideTitles(showTitles: false)),
                        rightTitles: AxisTitles(sideTitles: SideTitles(showTitles: false)),
                        bottomTitles: AxisTitles(
                          sideTitles: SideTitles(
                            showTitles: true,
                            getTitlesWidget: (value, meta) {
                              const labels = ['Math', 'Eng', 'Phy', 'Chem', 'Bio'];
                              return Padding(
                                padding: const EdgeInsets.only(top: 8),
                                child: Text(labels[value.toInt()], style: TextStyle(fontSize: 11, color: isDark ? AppTheme.navy300 : AppTheme.navy500)),
                              );
                            },
                          ),
                        ),
                      ),
                      borderData: FlBorderData(show: false),
                      gridData: FlGridData(show: false),
                      barTouchData: BarTouchData(enabled: false),
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 20),

              // Quick Actions
              Text('Quick Study', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w600, color: isDark ? Colors.white : AppTheme.navy900)),
              const SizedBox(height: 12),
              Row(children: [
                _ActionChip(icon: Icons.quiz_outlined, label: 'Practice'),
                const SizedBox(width: 8),
                _ActionChip(icon: Icons.auto_awesome, label: 'AI Tutor'),
                const SizedBox(width: 8),
                _ActionChip(icon: Icons.bookmark_outline, label: 'Mistakes'),
                const SizedBox(width: 8),
                _ActionChip(icon: Icons.emoji_events_outlined, label: 'Challenge'),
              ]),
              const SizedBox(height: 20),

              // Recent Tests
              Text('Recent Tests', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w600, color: isDark ? Colors.white : AppTheme.navy900)),
              const SizedBox(height: 12),
              ...List.generate(3, (i) => _TestResultCard(
                subject: ['Mathematics', 'English Language', 'Physics'][i],
                score: [85, 72, 58],
                total: 100,
                date: ['Today', 'Yesterday', '2 days ago'][i],
              )),
            ],
          ),
        ),
      ),
      bottomNavigationBar: _BottomNavBar(),
    );
  }

  BarChartGroupData _barGroup(String label, double value) {
    return BarChartGroupData(x: 0, barRods: [
      BarChartRodData(toY: value, color: AppTheme.gold500, width: 16, borderRadius: const BorderRadius.vertical(top: Radius.circular(4))),
    ]);
  }
}

class _DashboardCard extends StatelessWidget {
  final Widget child;
  const _DashboardCard({required this.child});

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: isDark ? AppTheme.navy800 : Colors.white,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: isDark ? AppTheme.navy700 : AppTheme.navy100),
      ),
      child: child,
    );
  }
}

class _ActionChip extends StatelessWidget {
  final IconData icon;
  final String label;
  const _ActionChip({required this.icon, required this.label});

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    return Expanded(
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 14),
        decoration: BoxDecoration(
          color: isDark ? AppTheme.navy800 : AppTheme.navy50,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: isDark ? AppTheme.navy700 : AppTheme.navy100),
        ),
        child: Column(children: [
          Icon(icon, color: AppTheme.gold500, size: 22),
          const SizedBox(height: 4),
          Text(label, style: TextStyle(fontSize: 11, color: isDark ? AppTheme.navy300 : AppTheme.navy600, fontWeight: FontWeight.w500)),
        ]),
      ),
    );
  }
}

class _TestResultCard extends StatelessWidget {
  final String subject;
  final int score;
  final int total;
  final String date;
  const _TestResultCard({required this.subject, required this.score, required this.total, required this.date});

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final pct = score / total;
    return Container(
      width: double.infinity,
      margin: const EdgeInsets.only(bottom: 8),
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: isDark ? AppTheme.navy800 : Colors.white,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: isDark ? AppTheme.navy700 : AppTheme.navy100),
      ),
      child: Row(children: [
        CircularPercentIndicator(
          radius: 22, lineWidth: 4, percent: pct,
          progressColor: pct >= 0.7 ? Colors.green : pct >= 0.5 ? AppTheme.gold500 : Colors.red,
          backgroundColor: isDark ? AppTheme.navy700 : AppTheme.navy100,
          center: Text('$score%', style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: isDark ? Colors.white : AppTheme.navy900)),
        ),
        const SizedBox(width: 12),
        Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Text(subject, style: TextStyle(fontWeight: FontWeight.w600, color: isDark ? Colors.white : AppTheme.navy900)),
          Text(date, style: TextStyle(fontSize: 12, color: isDark ? AppTheme.navy400 : AppTheme.navy500)),
        ])),
        Icon(Icons.chevron_right, color: isDark ? AppTheme.navy400 : AppTheme.navy300, size: 20),
      ]),
    );
  }
}

class _BottomNavBar extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return BottomNavigationBar(
      type: BottomNavigationBarType.fixed,
      backgroundColor: Theme.of(context).brightness == Brightness.dark ? AppTheme.navy900 : Colors.white,
      selectedItemColor: AppTheme.gold500,
      unselectedItemColor: Theme.of(context).brightness == Brightness.dark ? AppTheme.navy400 : AppTheme.navy500,
      items: const [
        BottomNavigationBarItem(icon: Icon(Icons.home), label: 'Home'),
        BottomNavigationBarItem(icon: Icon(Icons.book), label: 'Study'),
        BottomNavigationBarItem(icon: Icon(Icons.auto_awesome), label: 'AI'),
        BottomNavigationBarItem(icon: Icon(Icons.bar_chart), label: 'Analytics'),
        BottomNavigationBarItem(icon: Icon(Icons.person), label: 'Profile'),
      ],
    );
  }
}
