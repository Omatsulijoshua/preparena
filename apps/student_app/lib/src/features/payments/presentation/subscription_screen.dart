import 'package:flutter/material.dart';
import 'package:percent_indicator/percent_indicator.dart';
import '../../../core/theme/app_theme.dart';

class SubscriptionScreen extends StatelessWidget {
  const SubscriptionScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      backgroundColor: isDark ? AppTheme.navy950 : AppTheme.navy50,
      appBar: AppBar(title: const Text('Subscription')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          // Current Plan
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              gradient: LinearGradient(colors: [AppTheme.gold500, AppTheme.gold600]),
              borderRadius: BorderRadius.circular(16),
            ),
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
                Text('Current Plan', style: TextStyle(color: Colors.white.withOpacity(0.9), fontSize: 14)),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                  decoration: BoxDecoration(color: Colors.white.withOpacity(0.2), borderRadius: BorderRadius.circular(20)),
                  child: const Text('ACTIVE', style: TextStyle(color: Colors.white, fontSize: 11, fontWeight: FontWeight.bold)),
                ),
              ]),
              const SizedBox(height: 12),
              const Text('Monthly Premium', style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: AppTheme.navy950)),
              const SizedBox(height: 4),
              Text('₦5,000/month · Renews Jul 14, 2026', style: TextStyle(color: AppTheme.navy950.withOpacity(0.7))),
              const SizedBox(height: 16),
              ClipRRect(
                borderRadius: BorderRadius.circular(4),
                child: LinearProgressIndicator(
                  value: 0.6,
                  backgroundColor: Colors.white.withOpacity(0.3),
                  valueColor: AlwaysStoppedAnimation(Colors.white),
                  minHeight: 6,
                ),
              ),
              const SizedBox(height: 6),
              Text('18 days remaining', style: TextStyle(color: Colors.white.withOpacity(0.8), fontSize: 13)),
            ]),
          ),
          const SizedBox(height: 24),

          Text('Choose a Plan', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w600, color: isDark ? Colors.white : AppTheme.navy900)),
          const SizedBox(height: 12),

          ...List.generate(4, (i) {
            final plans = [
              {'name': 'Weekly', 'price': '₦1,500', 'period': 'week', 'popular': false},
              {'name': 'Monthly', 'price': '₦5,000', 'period': 'month', 'popular': true},
              {'name': 'Annual', 'price': '₦45,000', 'period': 'year', 'popular': false, 'badge': 'Save 25%'},
              {'name': 'Family', 'price': '₦75,000', 'period': 'year', 'popular': false, 'badge': 'Up to 4 users'},
            ];
            final plan = plans[i];
            return Container(
              margin: const EdgeInsets.only(bottom: 10),
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: plan['popular'] == true ? AppTheme.gold500.withOpacity(0.1) : (isDark ? AppTheme.navy800 : Colors.white),
                borderRadius: BorderRadius.circular(14),
                border: Border.all(
                  color: plan['popular'] == true ? AppTheme.gold500 : (isDark ? AppTheme.navy700 : AppTheme.navy100),
                  width: plan['popular'] == true ? 2 : 1,
                ),
              ),
              child: Row(children: [
                Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                  Row(children: [
                    Text(plan['name'] as String, style: TextStyle(fontWeight: FontWeight.w600, fontSize: 16, color: isDark ? Colors.white : AppTheme.navy900)),
                    if (plan['badge'] != null) ...[
                      const SizedBox(width: 8),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                        decoration: BoxDecoration(color: AppTheme.gold500, borderRadius: BorderRadius.circular(10)),
                        child: Text(plan['badge'] as String, style: TextStyle(fontSize: 10, color: AppTheme.navy950, fontWeight: FontWeight.w600)),
                      ),
                    ],
                  ]),
                  Text('${plan['price']}/${plan['period']}', style: TextStyle(color: isDark ? AppTheme.navy300 : AppTheme.navy500, fontSize: 13)),
                ])),
                ElevatedButton(
                  onPressed: () {},
                  style: ElevatedButton.styleFrom(
                    padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
                    backgroundColor: plan['popular'] == true ? AppTheme.gold500 : (isDark ? AppTheme.navy700 : AppTheme.navy100),
                  ),
                  child: Text(plan['popular'] == true ? 'Current' : 'Subscribe', style: TextStyle(color: plan['popular'] == true ? AppTheme.navy950 : (isDark ? AppTheme.navy200 : AppTheme.navy600))),
                ),
              ]),
            );
          }),
        ],
      ),
    );
  }
}
