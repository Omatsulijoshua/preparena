import 'package:flutter/material.dart';
import '../../../core/theme/app_theme.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _formKey = GlobalKey<FormState>();
  bool _obscurePassword = true;
  bool _isLoading = false;

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24),
          child: Form(
            key: _formKey,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                const SizedBox(height: 60),
                // Logo
                Center(
                  child: Container(
                    width: 72,
                    height: 72,
                    decoration: BoxDecoration(
                      color: AppTheme.gold500,
                      borderRadius: BorderRadius.circular(18),
                    ),
                    child: const Center(
                      child: Text('PA', style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold, color: AppTheme.navy950)),
                    ),
                  ),
                ),
                const SizedBox(height: 24),
                const Text('Welcome Back', style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold), textAlign: TextAlign.center),
                const SizedBox(height: 8),
                Text('Sign in to continue your learning journey', style: TextStyle(fontSize: 15, color: isDark ? AppTheme.navy300 : AppTheme.navy500), textAlign: TextAlign.center),
                const SizedBox(height: 40),

                TextFormField(
                  controller: _emailController,
                  keyboardType: TextInputType.emailAddress,
                  decoration: const InputDecoration(labelText: 'Email', prefixIcon: Icon(Icons.email_outlined)),
                  validator: (v) => v?.isEmpty ?? true ? 'Enter your email' : null,
                ),
                const SizedBox(height: 16),

                TextFormField(
                  controller: _passwordController,
                  obscureText: _obscurePassword,
                  decoration: InputDecoration(
                    labelText: 'Password',
                    prefixIcon: const Icon(Icons.lock_outline),
                    suffixIcon: IconButton(
                      icon: Icon(_obscurePassword ? Icons.visibility_off : Icons.visibility),
                      onPressed: () => setState(() => _obscurePassword = !_obscurePassword),
                    ),
                  ),
                  validator: (v) => v?.isEmpty ?? true ? 'Enter your password' : null,
                ),
                const SizedBox(height: 8),
                Align(
                  alignment: Alignment.centerRight,
                  child: TextButton(onPressed: () {}, child: const Text('Forgot password?', style: TextStyle(color: AppTheme.gold500))),
                ),
                const SizedBox(height: 16),

                ElevatedButton(
                  onPressed: _isLoading ? null : () {
                    if (_formKey.currentState?.validate() ?? false) {
                      setState(() => _isLoading = true);
                      // Auth logic here
                      Future.delayed(const Duration(seconds: 1), () {
                        setState(() => _isLoading = false);
                      });
                    }
                  },
                  child: _isLoading ? const SizedBox(height: 20, width: 20, child: CircularProgressIndicator(strokeWidth: 2, color: AppTheme.navy950)) : const Text('Sign In'),
                ),
                const SizedBox(height: 24),

                Row(children: [
                  const Expanded(child: Divider()),
                  Padding(padding: const EdgeInsets.symmetric(horizontal: 16), child: Text('or continue with', style: TextStyle(color: isDark ? AppTheme.navy400 : AppTheme.navy400))),
                  const Expanded(child: Divider()),
                ]),
                const SizedBox(height: 24),

                OutlinedButton.icon(
                  onPressed: () {},
                  icon: const Icon(Icons.g_mobiledata, size: 24),
                  label: const Text('Google'),
                  style: OutlinedButton.styleFrom(
                    padding: const EdgeInsets.symmetric(vertical: 14),
                    side: BorderSide(color: isDark ? AppTheme.navy600 : AppTheme.navy200),
                  ),
                ),
                const SizedBox(height: 12),

                OutlinedButton.icon(
                  onPressed: () {},
                  icon: const Icon(Icons.apple, size: 24),
                  label: const Text('Apple'),
                  style: OutlinedButton.styleFrom(
                    padding: const EdgeInsets.symmetric(vertical: 14),
                    side: BorderSide(color: isDark ? AppTheme.navy600 : AppTheme.navy200),
                  ),
                ),
                const SizedBox(height: 32),

                Row(mainAxisAlignment: MainAxisAlignment.center, children: [
                  Text("Don't have an account?", style: TextStyle(color: isDark ? AppTheme.navy400 : AppTheme.navy500)),
                  TextButton(onPressed: () {}, child: const Text('Sign Up', style: TextStyle(color: AppTheme.gold500, fontWeight: FontWeight.w600))),
                ]),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
