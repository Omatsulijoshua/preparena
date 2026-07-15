import 'package:flutter/material.dart';
import '../../../core/theme/app_theme.dart';

class StudyPlanScreen extends StatelessWidget {
  const StudyPlanScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      backgroundColor: isDark ? AppTheme.navy950 : AppTheme.navy50,
      appBar: AppBar(title: const Text('Study Plan')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              gradient: LinearGradient(colors: [AppTheme.navy700, AppTheme.navy900]),
              borderRadius: BorderRadius.circular(16),
            ),
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Text("Today's Plan", style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Colors.white)),
              const SizedBox(height: 4),
              Text('4 subjects - 3 hours 30 minutes', style: TextStyle(color: AppTheme.navy300)),
              const SizedBox(height: 16),
              LinearProgressIndicator(value: 0.35, backgroundColor: AppTheme.navy600, valueColor: AlwaysStoppedAnimation(AppTheme.gold500)),
              const SizedBox(height: 8),
              Text('35% completed', style: TextStyle(color: AppTheme.navy300, fontSize: 13)),
            ]),
          ),
          const SizedBox(height: 20),
          Text('Subjects', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w600, color: isDark ? Colors.white : AppTheme.navy900)),
          const SizedBox(height: 12),
          ...List.generate(4, (i) {
            final subjects = ['Mathematics', 'English Language', 'Physics', 'Chemistry'];
            final times = ['60 min', '45 min', '60 min', '45 min'];
            final progress = [0.8, 0.0, 0.0, 0.0];
            return Container(
              margin: const EdgeInsets.only(bottom: 10),
              padding: const EdgeInsets.all(14),
              decoration: BoxDecoration(
                color: isDark ? AppTheme.navy800 : Colors.white,
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: isDark ? AppTheme.navy700 : AppTheme.navy100),
              ),
              child: Column(children: [
                Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
                  Text(subjects[i], style: TextStyle(fontWeight: FontWeight.w600, color: isDark ? Colors.white : AppTheme.navy900)),
                  Text(times[i], style: TextStyle(color: AppTheme.gold500)),
                ]),
                const SizedBox(height: 8),
                ClipRRect(
                  borderRadius: BorderRadius.circular(4),
                  child: LinearProgressIndicator(
                    value: progress[i],
                    backgroundColor: isDark ? AppTheme.navy700 : AppTheme.navy100,
                    valueColor: AlwaysStoppedAnimation(progress[i] > 0 ? Colors.green : AppTheme.gold500),
                    minHeight: 6,
                  ),
                ),
              ]),
            );
          }),
          const SizedBox(height: 20),
          SizedBox(
            width: double.infinity,
            child: ElevatedButton.icon(
              onPressed: () {},
              icon: const Icon(Icons.auto_awesome),
              label: const Text('Generate New Plan with AI'),
            ),
          ),
        ],
      ),
    );
  }
}
