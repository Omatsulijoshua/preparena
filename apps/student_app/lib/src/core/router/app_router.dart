import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class AppRouter {
  static final GoRouter router = GoRouter(
    initialLocation: '/',
    routes: [
      GoRoute(
        path: '/',
        builder: (context, state) => const SplashScreen(),
      ),
      GoRoute(
        path: '/login',
        builder: (context, state) => const LoginScreen(),
      ),
      GoRoute(
        path: '/register',
        builder: (context, state) => const RegisterScreen(),
      ),
      GoRoute(
        path: '/onboarding',
        builder: (context, state) => const OnboardingScreen(),
      ),
      GoRoute(
        path: '/dashboard',
        builder: (context, state) => const DashboardScreen(),
      ),
      GoRoute(
        path: '/examination/:id',
        builder: (context, state) => ExaminationScreen(examinationId: state.pathParameters['id']!),
      ),
      GoRoute(
        path: '/practice/:subjectId',
        builder: (context, state) => PracticeScreen(subjectId: state.pathParameters['subjectId']!),
      ),
      GoRoute(
        path: '/results/:attemptId',
        builder: (context, state) => ResultsScreen(attemptId: state.pathParameters['attemptId']!),
      ),
      GoRoute(
        path: '/mistake-notebook',
        builder: (context, state) => const MistakeNotebookScreen(),
      ),
      GoRoute(
        path: '/study-plan',
        builder: (context, state) => const StudyPlanScreen(),
      ),
      GoRoute(
        path: '/flashcards',
        builder: (context, state) => const FlashcardsScreen(),
      ),
      GoRoute(
        path: '/profile',
        builder: (context, state) => const ProfileScreen(),
      ),
      GoRoute(
        path: '/subscription',
        builder: (context, state) => const SubscriptionScreen(),
      ),
      GoRoute(
        path: '/ai-tutor',
        builder: (context, state) => const AiTutorScreen(),
      ),
      GoRoute(
        path: '/leaderboard',
        builder: (context, state) => const LeaderboardScreen(),
      ),
    ],
  );
}

// Placeholder screens - these would be in their respective feature directories
class SplashScreen extends StatelessWidget {
  const SplashScreen({super.key});
  @override
  Widget build(BuildContext context) => Scaffold(body: Center(child: CircularProgressIndicator()));
}

class LoginScreen extends StatelessWidget {
  const LoginScreen({super.key});
  @override
  Widget build(BuildContext context) => Scaffold(body: Center(child: Text('Login')));
}

class RegisterScreen extends StatelessWidget {
  const RegisterScreen({super.key});
  @override
  Widget build(BuildContext context) => Scaffold(body: Center(child: Text('Register')));
}

class OnboardingScreen extends StatelessWidget {
  const OnboardingScreen({super.key});
  @override
  Widget build(BuildContext context) => Scaffold(body: Center(child: Text('Onboarding')));
}

class DashboardScreen extends StatelessWidget {
  const DashboardScreen({super.key});
  @override
  Widget build(BuildContext context) => Scaffold(body: Center(child: Text('Dashboard')));
}

class ExaminationScreen extends StatelessWidget {
  final String examinationId;
  const ExaminationScreen({super.key, required this.examinationId});
  @override
  Widget build(BuildContext context) => Scaffold(body: Center(child: Text('Examination: $examinationId')));
}

class PracticeScreen extends StatelessWidget {
  final String subjectId;
  const PracticeScreen({super.key, required this.subjectId});
  @override
  Widget build(BuildContext context) => Scaffold(body: Center(child: Text('Practice: $subjectId')));
}

class ResultsScreen extends StatelessWidget {
  final String attemptId;
  const ResultsScreen({super.key, required this.attemptId});
  @override
  Widget build(BuildContext context) => Scaffold(body: Center(child: Text('Results: $attemptId')));
}

class MistakeNotebookScreen extends StatelessWidget {
  const MistakeNotebookScreen({super.key});
  @override
  Widget build(BuildContext context) => Scaffold(body: Center(child: Text('Mistake Notebook')));
}

class StudyPlanScreen extends StatelessWidget {
  const StudyPlanScreen({super.key});
  @override
  Widget build(BuildContext context) => Scaffold(body: Center(child: Text('Study Plan')));
}

class FlashcardsScreen extends StatelessWidget {
  const FlashcardsScreen({super.key});
  @override
  Widget build(BuildContext context) => Scaffold(body: Center(child: Text('Flashcards')));
}

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});
  @override
  Widget build(BuildContext context) => Scaffold(body: Center(child: Text('Profile')));
}

class SubscriptionScreen extends StatelessWidget {
  const SubscriptionScreen({super.key});
  @override
  Widget build(BuildContext context) => Scaffold(body: Center(child: Text('Subscription')));
}

class AiTutorScreen extends StatelessWidget {
  const AiTutorScreen({super.key});
  @override
  Widget build(BuildContext context) => Scaffold(body: Center(child: Text('AI Tutor')));
}

class LeaderboardScreen extends StatelessWidget {
  const LeaderboardScreen({super.key});
  @override
  Widget build(BuildContext context) => Scaffold(body: Center(child: Text('Leaderboard')));
}
