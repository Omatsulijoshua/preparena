import 'package:flutter/material.dart';
import 'package:percent_indicator/percent_indicator.dart';
import '../../../core/theme/app_theme.dart';

class ResultsScreen extends StatelessWidget {
  final String attemptId;
  const ResultsScreen({super.key, required this.attemptId});

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      backgroundColor: isDark ? AppTheme.navy950 : AppTheme.navy50,
      appBar: AppBar(title: const Text('Results')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            // Score Circle
            Container(
              padding: const EdgeInsets.all(32),
              decoration: BoxDecoration(
                color: isDark ? AppTheme.navy800 : Colors.white,
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: isDark ? AppTheme.navy700 : AppTheme.navy100),
              ),
              child: Column(children: [
                CircularPercentIndicator(
                  radius: 60, lineWidth: 12, percent: 0.72,
                  progressColor: AppTheme.gold500,
                  backgroundColor: isDark ? AppTheme.navy700 : AppTheme.navy100,
                  center: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
                    Text('72', style: TextStyle(fontSize: 36, fontWeight: FontWeight.bold, color: isDark ? Colors.white : AppTheme.navy900)),
                    Text('/ 100', style: TextStyle(fontSize: 14, color: isDark ? AppTheme.navy400 : AppTheme.navy500)),
                  ]),
                ),
                const SizedBox(height: 16),
                Text('B3 - Credit', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: AppTheme.gold500)),
                const SizedBox(height: 8),
                Text('You scored 72 out of 100 marks', style: TextStyle(color: isDark ? AppTheme.navy300 : AppTheme.navy500)),
              ]),
            ),
            const SizedBox(height: 16),

            // Stats Row
            Row(children: [
              _StatCard(label: 'Time Spent', value: '45:32', icon: Icons.access_time, isDark: isDark),
              const SizedBox(width: 12),
              _StatCard(label: 'Speed', value: '54s/q', icon: Icons.speed, isDark: isDark),
              const SizedBox(width: 12),
              _StatCard(label: 'Accuracy', value: '72%', icon: Icons.track_changes, isDark: isDark),
            ]),
            const SizedBox(height: 20),

            // Subject Breakdown
            Text('Subject Breakdown', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w600, color: isDark ? Colors.white : AppTheme.navy900)),
            const SizedBox(height: 12),
            ...List.generate(5, (i) {
              final subjects = ['Mathematics', 'English', 'Physics', 'Chemistry', 'Biology'];
              final scores = [85, 72, 58, 65, 78];
              return Container(
                margin: const EdgeInsets.only(bottom: 8),
                padding: const EdgeInsets.all(14),
                decoration: BoxDecoration(
                  color: isDark ? AppTheme.navy800 : Colors.white,
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: isDark ? AppTheme.navy700 : AppTheme.navy100),
                ),
                child: Row(children: [
                  Expanded(flex: 2, child: Text(subjects[i], style: TextStyle(color: isDark ? Colors.white : AppTheme.navy900))),
                  Expanded(
                    flex: 3,
                    child: LinearPercentIndicator(
                      percent: scores[i] / 100,
                      lineHeight: 8,
                      barRadius: const Radius.circular(4),
                      progressColor: scores[i] >= 70 ? Colors.green : (scores[i] >= 50 ? AppTheme.gold500 : Colors.red),
                      backgroundColor: isDark ? AppTheme.navy700 : AppTheme.navy100,
                    ),
                  ),
                  const SizedBox(width: 12),
                  Text('${scores[i]}%', style: TextStyle(fontWeight: FontWeight.bold, color: isDark ? Colors.white : AppTheme.navy900)),
                ]),
              );
            }),
            const SizedBox(height: 20),

            // Time Analysis
            Text('Time Analysis', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w600, color: isDark ? Colors.white : AppTheme.navy900)),
            const SizedBox(height: 12),
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: isDark ? AppTheme.navy800 : Colors.white,
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: isDark ? AppTheme.navy700 : AppTheme.navy100),
              ),
              child: Column(children: [
                _TimeMetric(label: 'Time Management Score', value: '78/100', color: AppTheme.gold500, isDark: isDark),
                const Divider(height: 24),
                _TimeMetric(label: 'Questions answered too quickly', value: '3', color: Colors.orange, isDark: isDark),
                const Divider(height: 24),
                _TimeMetric(label: 'Questions answered too slowly', value: '5', color: Colors.red, isDark: isDark),
              ]),
            ),
            const SizedBox(height: 20),

            // Recommendations
            Text('Recommendations', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w600, color: isDark ? Colors.white : AppTheme.navy900)),
            const SizedBox(height: 12),
            ...List.generate(3, (i) {
              final recs = [
                'Focus on improving your Physics score - review mechanics and thermodynamics',
                'Practice time management - try to spend less time on difficult questions',
                'Review Chemistry organic reactions - this was your weakest topic',
              ];
              return Container(
                margin: const EdgeInsets.only(bottom: 8),
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: AppTheme.gold500.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(10),
                  border: Border.all(color: AppTheme.gold500.withOpacity(0.2)),
                ),
                child: Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
                  Icon(Icons.lightbulb_outline, color: AppTheme.gold500, size: 18),
                  const SizedBox(width: 10),
                  Expanded(child: Text(recs[i], style: TextStyle(color: isDark ? AppTheme.navy200 : AppTheme.navy700, fontSize: 13))),
                ]),
              );
            }),
            const SizedBox(height: 24),

            SizedBox(
              width: double.infinity,
              child: ElevatedButton.icon(
                onPressed: () {},
                icon: const Icon(Icons.replay),
                label: const Text('Practice Weak Areas'),
              ),
            ),
            const SizedBox(height: 16),
          ],
        ),
      ),
    );
  }
}

class _StatCard extends StatelessWidget {
  final String label, value;
  final IconData icon;
  final bool isDark;
  const _StatCard({required this.label, required this.value, required this.icon, required this.isDark});

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
          Text(value, style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16, color: isDark ? Colors.white : AppTheme.navy900)),
          Text(label, style: TextStyle(fontSize: 11, color: isDark ? AppTheme.navy400 : AppTheme.navy500)),
        ]),
      ),
    );
  }
}

class _TimeMetric extends StatelessWidget {
  final String label, value;
  final Color color;
  final bool isDark;
  const _TimeMetric({required this.label, required this.value, required this.color, required this.isDark});

  @override
  Widget build(BuildContext context) {
    return Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
      Text(label, style: TextStyle(color: isDark ? AppTheme.navy300 : AppTheme.navy600)),
      Text(value, style: TextStyle(fontWeight: FontWeight.bold, color: color)),
    ]);
  }
}
