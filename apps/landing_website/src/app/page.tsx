import { CheckCircle, Brain, Trophy, Users, BookOpen, Zap, ChevronRight, Star, Shield, BarChart } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-navy-800 py-4 px-6">
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-gold-500 rounded-lg flex items-center justify-center"><span className="text-navy-950 font-bold">PA</span></div>
            <span className="text-xl font-bold">PrepArena</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-navy-300">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#exams" className="hover:text-white transition-colors">Examinations</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a>
          </div>
          <div className="flex items-center gap-3">
            <a href="https://app.preparena.com/login" className="text-navy-300 hover:text-white transition-colors">Sign in</a>
            <a href="https://app.preparena.com/register" className="bg-gold-500 hover:bg-gold-600 text-navy-950 px-5 py-2 rounded-lg font-semibold transition-colors">Get Started</a>
          </div>
        </nav>
      </header>

      <section className="max-w-7xl mx-auto px-6 pt-20 pb-16 text-center">
        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
          Ace Your{' '}
          <span className="text-gold-400">Examinations</span>
          <br />with AI-Powered Precision
        </h1>
        <p className="text-navy-300 text-xl max-w-2xl mx-auto mb-10">
          The smartest way to prepare for WAEC, NECO, JAMB, SAT, and school exams. Practice with intelligent tools, track your progress, and unlock your full potential.
        </p>
        <div className="flex items-center justify-center gap-4">
          <a href="https://app.preparena.com/register" className="bg-gold-500 hover:bg-gold-600 text-navy-950 px-8 py-3.5 rounded-xl font-semibold text-lg transition-colors flex items-center gap-2">
            Start Free Trial <ChevronRight className="h-5 w-5" />
          </a>
          <a href="#features" className="border border-navy-600 hover:border-navy-500 text-navy-200 px-8 py-3.5 rounded-xl font-semibold text-lg transition-colors">
            Learn More
          </a>
        </div>
      </section>

      <section id="features" className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-4">Why Students Love PrepArena</h2>
        <p className="text-navy-400 text-center mb-12 max-w-xl mx-auto">Everything you need to prepare for your examinations in one place</p>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Brain, title: 'AI Personal Tutor', desc: 'Get instant explanations and personalized study plans powered by advanced AI.' },
            { icon: BarChart, title: 'Performance Analytics', desc: 'Track your progress with detailed analytics across subjects, topics, and time.' },
            { icon: Trophy, title: 'Exam Simulation', desc: 'Practice with real past questions in timed conditions that mirror the actual exam.' },
            { icon: BookOpen, title: '40,000+ Questions', desc: 'Access thousands of curated questions across all major examination bodies.' },
            { icon: Shield, title: 'Mistake Notebook', desc: 'Automatically track and categorize your mistakes for targeted improvement.' },
            { icon: Zap, title: 'Offline Access', desc: 'Download questions and study anywhere, even without internet connection.' },
          ].map((f) => (
            <div key={f.title} className="bg-navy-800/50 border border-navy-700 rounded-xl p-6 hover:border-gold-500/30 transition-all">
              <f.icon className="h-10 w-10 text-gold-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-navy-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="exams" className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-4">Supported Examinations</h2>
        <p className="text-navy-400 text-center mb-12">Prepare for the most important examinations across West Africa and beyond</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['WAEC', 'NECO', 'JAMB', 'SAT', 'Post-UTME', 'WAEC GCE', 'NECO GCE', 'School Exams'].map((exam) => (
            <div key={exam} className="bg-navy-800/30 border border-navy-700 rounded-xl p-6 text-center hover:border-gold-500/30 transition-all">
              <p className="font-semibold text-lg">{exam}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="pricing" className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-4">Simple, Transparent Pricing</h2>
        <p className="text-navy-400 text-center mb-12">Choose the plan that fits your needs</p>
        <div className="grid md:grid-cols-4 gap-4">
          {[
            { name: 'Free', price: '₦0', period: 'forever', features: ['50 questions/month', 'Basic analytics', 'Practice mode'] },
            { name: 'Weekly', price: '₦1,500', period: 'week', features: ['Unlimited questions', 'All exam modes', 'AI explanations', 'Performance tracking'] },
            { name: 'Monthly', price: '₦5,000', period: 'month', features: ['Everything in Weekly', 'AI tutor access', 'Mistake notebook', 'Offline access', 'Priority support'], popular: true },
            { name: 'Annual', price: '₦45,000', period: 'year', features: ['Everything in Monthly', 'Family sharing (up to 4)', 'AI essay marking', 'Early feature access', 'Premium support'], badge: 'Best Value' },
          ].map((plan) => (
            <div key={plan.name} className={`rounded-xl p-6 border relative ${plan.popular ? 'bg-navy-800 border-gold-500' : 'bg-navy-800/50 border-navy-700'}`}>
              {(plan.popular || plan.badge) && (
                <span className={`absolute -top-2.5 left-1/2 -translate-x-1/2 text-xs px-3 py-1 rounded-full font-medium ${plan.popular ? 'bg-gold-500 text-navy-950' : 'bg-blue-500 text-white'}`}>
                  {plan.popular ? 'Most Popular' : plan.badge}
                </span>
              )}
              <h3 className="text-lg font-semibold mb-1">{plan.name}</h3>
              <p className="text-3xl font-bold mb-1">{plan.price}</p>
              <p className="text-navy-400 text-sm mb-6">per {plan.period}</p>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-navy-300">
                    <CheckCircle className="h-4 w-4 text-gold-400 mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <a href="https://app.preparena.com/register" className={`block text-center py-2.5 rounded-lg font-semibold transition-colors ${plan.popular ? 'bg-gold-500 hover:bg-gold-600 text-navy-950' : 'bg-navy-700 hover:bg-navy-600 text-navy-200'}`}>
                Get Started
              </a>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-navy-800 py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-navy-400 text-sm">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <div className="h-6 w-6 bg-gold-500 rounded flex items-center justify-center"><span className="text-navy-950 font-bold text-xs">PA</span></div>
            <span className="font-semibold text-white">PrepArena</span>
          </div>
          <p>&copy; 2026 PrepArena. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
