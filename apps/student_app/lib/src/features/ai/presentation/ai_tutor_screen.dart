import 'package:flutter/material.dart';
import '../../../core/theme/app_theme.dart';

class AiTutorScreen extends StatefulWidget {
  const AiTutorScreen({super.key});

  @override
  State<AiTutorScreen> createState() => _AiTutorScreenState();
}

class _AiTutorScreenState extends State<AiTutorScreen> {
  final _controller = TextEditingController();
  final List<Map<String, String>> _messages = [];
  bool _isLoading = false;

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      backgroundColor: isDark ? AppTheme.navy950 : AppTheme.navy50,
      appBar: AppBar(
        title: const Row(children: [
          Icon(Icons.auto_awesome, color: AppTheme.gold500, size: 20),
          SizedBox(width: 8),
          Text('AI Tutor'),
        ]),
      ),
      body: Column(
        children: [
          // Suggested prompts
          Container(
            padding: const EdgeInsets.all(12),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('Try asking:', style: TextStyle(color: isDark ? AppTheme.navy400 : AppTheme.navy500, fontSize: 13)),
                const SizedBox(height: 8),
                SingleChildScrollView(
                  scrollDirection: Axis.horizontal,
                  child: Row(children: [
                    _SuggestionChip(label: 'Explain quadratic equations', isDark: isDark),
                    const SizedBox(width: 8),
                    _SuggestionChip(label: 'Solve this math problem', isDark: isDark),
                    const SizedBox(width: 8),
                    _SuggestionChip(label: 'Create revision notes', isDark: isDark),
                  ]),
                ),
              ],
            ),
          ),

          // Messages
          Expanded(
            child: _messages.isEmpty
                ? Center(
                    child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
                      Icon(Icons.auto_awesome, size: 48, color: AppTheme.gold500.withOpacity(0.5)),
                      const SizedBox(height: 16),
                      Text('Ask me anything about your studies', style: TextStyle(color: isDark ? AppTheme.navy400 : AppTheme.navy500)),
                    ]),
                  )
                : ListView.builder(
                    padding: const EdgeInsets.symmetric(horizontal: 16),
                    itemCount: _messages.length,
                    itemBuilder: (context, i) {
                      final msg = _messages[i];
                      final isUser = msg['role'] == 'user';
                      return Align(
                        alignment: isUser ? Alignment.centerRight : Alignment.centerLeft,
                        child: Container(
                          margin: const EdgeInsets.only(bottom: 12),
                          padding: const EdgeInsets.all(14),
                          constraints: BoxConstraints(maxWidth: MediaQuery.of(context).size.width * 0.8),
                          decoration: BoxDecoration(
                            color: isUser ? AppTheme.gold500 : (isDark ? AppTheme.navy800 : Colors.white),
                            borderRadius: BorderRadius.circular(16).copyWith(
                              bottomRight: isUser ? const Radius.circular(4) : const Radius.circular(16),
                              bottomLeft: isUser ? const Radius.circular(16) : const Radius.circular(4),
                            ),
                          ),
                          child: Text(
                            msg['content']!,
                            style: TextStyle(color: isUser ? AppTheme.navy950 : (isDark ? Colors.white : AppTheme.navy900)),
                          ),
                        ),
                      );
                    },
                  ),
          ),

          // Input
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: isDark ? AppTheme.navy900 : Colors.white,
              border: Border(top: BorderSide(color: isDark ? AppTheme.navy800 : AppTheme.navy100)),
            ),
            child: Row(children: [
              Expanded(
                child: TextField(
                  controller: _controller,
                  decoration: InputDecoration(
                    hintText: 'Ask a question...',
                    filled: true,
                    fillColor: isDark ? AppTheme.navy800 : AppTheme.navy50,
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(12),
                      borderSide: BorderSide.none,
                    ),
                    contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                  ),
                  textInputAction: TextInputAction.send,
                  onSubmitted: (_) => _sendMessage(),
                ),
              ),
              const SizedBox(width: 8),
              GestureDetector(
                onTap: _sendMessage,
                child: Container(
                  width: 46, height: 46,
                  decoration: BoxDecoration(color: AppTheme.gold500, borderRadius: BorderRadius.circular(12)),
                  child: const Icon(Icons.send, color: AppTheme.navy950, size: 20),
                ),
              ),
            ]),
          ),
        ],
      ),
    );
  }

  void _sendMessage() {
    final text = _controller.text.trim();
    if (text.isEmpty || _isLoading) return;

    setState(() {
      _messages.add({'role': 'user', 'content': text});
      _isLoading = true;
    });
    _controller.clear();

    // Simulate AI response
    Future.delayed(const Duration(seconds: 1), () {
      if (mounted) {
        setState(() {
          _messages.add({
            'role': 'assistant',
            'content': 'That\'s a great question! Let me explain this concept to you in a simple way...\n\n'
                'The key idea here is to break the problem into smaller steps. First, identify what is being asked. '
                'Then, apply the relevant formulas or concepts you have learned.\n\n'
                'Would you like me to provide some practice questions on this topic?',
          });
          _isLoading = false;
        });
      }
    });
  }
}

class _SuggestionChip extends StatelessWidget {
  final String label;
  final bool isDark;
  const _SuggestionChip({required this.label, required this.isDark});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
      decoration: BoxDecoration(
        color: isDark ? AppTheme.navy800 : Colors.white,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: isDark ? AppTheme.navy700 : AppTheme.navy200),
      ),
      child: Text(label, style: TextStyle(fontSize: 13, color: isDark ? AppTheme.navy200 : AppTheme.navy600)),
    );
  }
}
