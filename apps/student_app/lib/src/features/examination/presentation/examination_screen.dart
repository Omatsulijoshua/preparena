import 'dart:async';
import 'package:flutter/material.dart';
import '../../../core/theme/app_theme.dart';

class ExaminationScreen extends StatefulWidget {
  final String examinationId;
  const ExaminationScreen({super.key, required this.examinationId});

  @override
  State<ExaminationScreen> createState() => _ExaminationScreenState();
}

class _ExaminationScreenState extends State<ExaminationScreen> with WidgetsBindingObserver {
  int _currentQuestionIndex = 0;
  int _timeRemaining = 7200;
  Timer? _timer;
  bool _isPaused = false;
  bool _showPalette = false;
  final Map<int, String?> _answers = {};
  final Set<int> _flaggedQuestions = {};
  final Set<int> _answeredQuestions = {};

  final List<Map<String, dynamic>> _questions = List.generate(50, (i) => ({
    'id': 'q$i',
    'number': i + 1,
    'text': 'Question ${i + 1}: What is the value of x in the equation 2x + 5 = 15?',
    'options': {'A': 'x = 3', 'B': 'x = 5', 'C': 'x = 7', 'D': 'x = 10'},
    'marks': 2,
  }));

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addObserver(this);
    _startTimer();
  }

  @override
  void dispose() {
    _timer?.cancel();
    WidgetsBinding.instance.removeObserver(this);
    super.dispose();
  }

  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    if (state == AppLifecycleState.paused) _pauseTimer();
  }

  void _startTimer() {
    _timer = Timer.periodic(const Duration(seconds: 1), (timer) {
      if (!_isPaused && _timeRemaining > 0) {
        setState(() => _timeRemaining--);
      } else if (_timeRemaining == 0) {
        _timer?.cancel();
        _autoSubmit();
      }
    });
  }

  void _pauseTimer() => setState(() => _isPaused = true);
  void _resumeTimer() => setState(() => _isPaused = false);

  void _autoSubmit() {
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (ctx) => AlertDialog(
        title: const Text('Time Up!'),
        content: const Text('Your examination time has expired. Your answers will be submitted automatically.'),
        actions: [TextButton(onPressed: () => Navigator.pop(ctx), child: const Text('View Results'))],
      ),
    );
  }

  String _formatTime(int seconds) {
    final h = seconds ~/ 3600;
    final m = (seconds % 3600) ~/ 60;
    final s = seconds % 60;
    return '${h.toString().padLeft(2, '0')}:${m.toString().padLeft(2, '0')}:${s.toString().padLeft(2, '0')}';
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final question = _questions[_currentQuestionIndex];
    final answeredCount = _answeredQuestions.length;
    final totalQuestions = _questions.length;

    return Scaffold(
      backgroundColor: isDark ? AppTheme.navy950 : AppTheme.navy50,
      appBar: AppBar(
        title: Text('WAEC Mathematics ${_formatTime(_timeRemaining)}', style: const TextStyle(fontSize: 14)),
        centerTitle: true,
        actions: [
          Container(
            margin: const EdgeInsets.only(right: 12),
            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
            decoration: BoxDecoration(
              color: _timeRemaining < 300 ? Colors.red.shade900 : (isDark ? AppTheme.navy700 : AppTheme.navy100),
              borderRadius: BorderRadius.circular(8),
            ),
            child: Row(mainAxisSize: MainAxisSize.min, children: [
              Icon(Icons.access_time, size: 16, color: _timeRemaining < 300 ? Colors.red : (isDark ? AppTheme.navy300 : AppTheme.navy500)),
              const SizedBox(width: 4),
              Text(_formatTime(_timeRemaining), style: TextStyle(
                fontSize: 14, fontWeight: FontWeight.bold,
                color: _timeRemaining < 300 ? Colors.red : (isDark ? Colors.white : AppTheme.navy900),
              )),
            ]),
          ),
          IconButton(
            icon: Icon(_showPalette ? Icons.close : Icons.grid_view, size: 20),
            onPressed: () => setState(() => _showPalette = !_showPalette),
          ),
        ],
      ),
      body: _showPalette ? _buildQuestionPalette(isDark) : _buildQuestionView(question, isDark, answeredCount, totalQuestions),
      bottomNavigationBar: _showPalette ? null : _buildBottomNav(isDark),
    );
  }

  Widget _buildQuestionView(Map<String, dynamic> question, bool isDark, int answered, int total) {
    return Column(
      children: [
        // Progress bar
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
          child: Column(children: [
            Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
              Text('Question ${question['number']} of $total', style: TextStyle(color: isDark ? AppTheme.navy300 : AppTheme.navy500, fontSize: 13)),
              Text('${question['marks']} marks', style: TextStyle(color: AppTheme.gold500, fontSize: 13, fontWeight: FontWeight.w600)),
            ]),
            const SizedBox(height: 6),
            ClipRRect(
              borderRadius: BorderRadius.circular(3),
              child: LinearProgressIndicator(
                value: (answered) / total,
                backgroundColor: isDark ? AppTheme.navy700 : AppTheme.navy100,
                valueColor: AlwaysStoppedAnimation(AppTheme.gold500),
                minHeight: 4,
              ),
            ),
          ]),
        ),

        // Question text
        Expanded(
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Container(
                  width: double.infinity,
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: isDark ? AppTheme.navy800 : Colors.white,
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(color: isDark ? AppTheme.navy700 : AppTheme.navy100),
                  ),
                  child: Text(question['text'], style: TextStyle(fontSize: 16, height: 1.5, color: isDark ? Colors.white : AppTheme.navy900)),
                ),
                const SizedBox(height: 16),

                // Options
                ...(question['options'] as Map<String, dynamic>).entries.map((entry) {
                  final isSelected = _answers[_currentQuestionIndex] == entry.key;
                  return GestureDetector(
                    onTap: () {
                      setState(() {
                        _answers[_currentQuestionIndex] = entry.key;
                        _answeredQuestions.add(_currentQuestionIndex);
                      });
                    },
                    child: Container(
                      width: double.infinity,
                      margin: const EdgeInsets.only(bottom: 10),
                      padding: const EdgeInsets.all(14),
                      decoration: BoxDecoration(
                        color: isSelected ? AppTheme.gold500.withOpacity(0.15) : (isDark ? AppTheme.navy800 : Colors.white),
                        borderRadius: BorderRadius.circular(10),
                        border: Border.all(
                          color: isSelected ? AppTheme.gold500 : (isDark ? AppTheme.navy700 : AppTheme.navy100),
                          width: isSelected ? 2 : 1,
                        ),
                      ),
                      child: Row(children: [
                        Container(
                          width: 28, height: 28,
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            color: isSelected ? AppTheme.gold500 : (isDark ? AppTheme.navy700 : AppTheme.navy100),
                          ),
                          child: Center(child: Text(entry.key, style: TextStyle(
                            fontWeight: FontWeight.bold, fontSize: 13,
                            color: isSelected ? AppTheme.navy950 : (isDark ? AppTheme.navy300 : AppTheme.navy500),
                          ))),
                        ),
                        const SizedBox(width: 12),
                        Expanded(child: Text(entry.value, style: TextStyle(fontSize: 15, color: isDark ? Colors.white : AppTheme.navy900))),
                      ]),
                    ),
                  );
                }),

                // Flag button
                GestureDetector(
                  onTap: () {
                    setState(() {
                      if (_flaggedQuestions.contains(_currentQuestionIndex)) {
                        _flaggedQuestions.remove(_currentQuestionIndex);
                      } else {
                        _flaggedQuestions.add(_currentQuestionIndex);
                      }
                    });
                  },
                  child: Container(
                    padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 16),
                    child: Row(children: [
                      Icon(
                        _flaggedQuestions.contains(_currentQuestionIndex) ? Icons.flag : Icons.flag_outlined,
                        color: _flaggedQuestions.contains(_currentQuestionIndex) ? Colors.orange : (isDark ? AppTheme.navy400 : AppTheme.navy500),
                        size: 20,
                      ),
                      const SizedBox(width: 8),
                      Text(
                        _flaggedQuestions.contains(_currentQuestionIndex) ? 'Flagged for review' : 'Flag for review',
                        style: TextStyle(color: isDark ? AppTheme.navy400 : AppTheme.navy500),
                      ),
                    ]),
                  ),
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildQuestionPalette(bool isDark) {
    return Padding(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(children: [
            _LegendItem(color: AppTheme.gold500, label: 'Answered', isDark: isDark),
            const SizedBox(width: 16),
            _LegendItem(color: Colors.orange, label: 'Flagged', isDark: isDark),
            const SizedBox(width: 16),
            _LegendItem(color: isDark ? AppTheme.navy700 : AppTheme.navy200, label: 'Unanswered', isDark: isDark),
          ]),
          const SizedBox(height: 16),
          Expanded(
            child: GridView.builder(
              gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(crossAxisCount: 5, crossAxisSpacing: 8, mainAxisSpacing: 8, childAspectRatio: 1),
              itemCount: _questions.length,
              itemBuilder: (context, i) {
                final isAnswered = _answeredQuestions.contains(i);
                final isFlagged = _flaggedQuestions.contains(i);
                final isCurrent = i == _currentQuestionIndex;

                return GestureDetector(
                  onTap: () {
                    setState(() {
                      _currentQuestionIndex = i;
                      _showPalette = false;
                    });
                  },
                  child: Container(
                    decoration: BoxDecoration(
                      color: isAnswered ? AppTheme.gold500 : (isDark ? AppTheme.navy800 : Colors.white),
                      borderRadius: BorderRadius.circular(8),
                      border: Border.all(
                        color: isCurrent ? AppTheme.gold500 : (isDark ? AppTheme.navy700 : AppTheme.navy200),
                        width: isCurrent ? 2 : 1,
                      ),
                    ),
                    child: Stack(children: [
                      Center(child: Text('${i + 1}', style: TextStyle(
                        fontWeight: FontWeight.w600,
                        fontSize: 14,
                        color: isAnswered ? AppTheme.navy950 : (isDark ? AppTheme.navy300 : AppTheme.navy500),
                      ))),
                      if (isFlagged)
                        Positioned(top: 2, right: 2, child: Icon(Icons.flag, size: 12, color: Colors.orange)),
                    ]),
                  ),
                );
              },
            ),
          ),
          const SizedBox(height: 16),
          SizedBox(
            width: double.infinity,
            child: ElevatedButton(
              onPressed: _showSubmitConfirmation,
              child: Text('Submit Examination (${_answeredQuestions.length}/$_questions.length)'),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildBottomNav(bool isDark) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      decoration: BoxDecoration(
        color: isDark ? AppTheme.navy900 : Colors.white,
        border: Border(top: BorderSide(color: isDark ? AppTheme.navy800 : AppTheme.navy100)),
      ),
      child: Row(children: [
        IconButton(
          icon: const Icon(Icons.chevron_left),
          onPressed: _currentQuestionIndex > 0 ? () => setState(() => _currentQuestionIndex--) : null,
          color: isDark ? AppTheme.navy300 : AppTheme.navy500,
        ),
        const Spacer(),
        TextButton.icon(
          onPressed: _showSubmitConfirmation,
          icon: const Icon(Icons.check_circle, size: 18),
          label: Text('Submit (${_answeredQuestions.length})'),
          style: TextButton.styleFrom(foregroundColor: Colors.red.shade400),
        ),
        const Spacer(),
        IconButton(
          icon: const Icon(Icons.chevron_right),
          onPressed: _currentQuestionIndex < _questions.length - 1 ? () => setState(() => _currentQuestionIndex++) : null,
          color: isDark ? AppTheme.navy300 : AppTheme.navy500,
        ),
      ]),
    );
  }

  void _showSubmitConfirmation() {
    final unanswered = _questions.length - _answeredQuestions.length;
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Submit Examination'),
        content: Text('You have answered $_answeredQuestions.length of $_questions.length questions. $unanswered questions are unanswered. Do you want to submit?'),
        actions: [
          TextButton(onPressed: () => Navigator.pop(ctx), child: const Text('Review')),
          ElevatedButton(
            onPressed: () {
              Navigator.pop(ctx);
              _timer?.cancel();
              showDialog(
                context: context,
                barrierDismissible: false,
                builder: (ctx2) => AlertDialog(
                  title: const Text('Examination Submitted'),
                  content: const Text('Your answers have been submitted successfully.'),
                  actions: [TextButton(onPressed: () => Navigator.pop(ctx2), child: const Text('View Results'))],
                ),
              );
            },
            child: const Text('Submit'),
          ),
        ],
      ),
    );
  }
}

class _LegendItem extends StatelessWidget {
  final Color color;
  final String label;
  final bool isDark;
  const _LegendItem({required this.color, required this.label, required this.isDark});

  @override
  Widget build(BuildContext context) {
    return Row(mainAxisSize: MainAxisSize.min, children: [
      Container(width: 12, height: 12, decoration: BoxDecoration(color: color, borderRadius: BorderRadius.circular(3))),
      const SizedBox(width: 4),
      Text(label, style: TextStyle(fontSize: 12, color: isDark ? AppTheme.navy300 : AppTheme.navy500)),
    ]);
  }
}
