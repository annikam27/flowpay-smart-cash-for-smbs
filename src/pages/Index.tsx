import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, TrendingUp, Shield, Zap } from 'lucide-react';
import heroImage from '@/assets/hero-image.jpg';

const Index = () => {
  const benefits = [
    {
      icon: TrendingUp,
      title: 'AI-Powered Forecasting',
      description: 'Predict cash flow with 95% accuracy using advanced machine learning algorithms.',
    },
    {
      icon: Shield,
      title: 'Bank-Level Security',
      description: 'Your financial data is protected with enterprise-grade encryption and security.',
    },
    {
      icon: Zap,
      title: 'Real-Time Intelligence',
      description: 'Get instant insights and alerts about your cash flow status 24/7.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-primary">FlowPay</h1>
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost">Sign in</Button>
              </Link>
              <Link to="/signup">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  Never Run Out of Cash Again
                </h2>
                <p className="text-xl text-muted-foreground">
                  AI-Powered Cash Flow Intelligence for SMBs
                </p>
                <p className="text-lg text-foreground">
                  FlowPay helps small and medium businesses predict, manage, and optimize their cash
                  flow with real-time insights and AI-powered forecasting.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup">
                  <Button size="lg" className="w-full sm:w-auto shadow-elegant hover:shadow-elegant-lg transition-shadow">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Watch Demo
                </Button>
              </div>
              <div className="flex items-center space-x-8 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <span className="font-semibold text-foreground">5,000+</span>
                  <span className="ml-2">businesses trust FlowPay</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-hero opacity-20 blur-3xl"></div>
              <img
                src={heroImage}
                alt="Cash flow dashboard visualization"
                className="relative rounded-2xl shadow-elegant-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Everything you need for cash flow mastery
            </h2>
            <p className="text-xl text-muted-foreground">
              Powerful features designed for growing businesses
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className="bg-card p-8 rounded-xl shadow-elegant hover:shadow-elegant-lg transition-all hover:-translate-y-1 border border-border"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-primary rounded-2xl p-12 shadow-elegant-lg">
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to take control of your cash flow?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of SMBs already managing their finances smarter with FlowPay
            </p>
            <Link to="/signup">
              <Button size="lg" variant="secondary" className="shadow-lg">
                Start Your Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <p className="text-white/80 mt-4 text-sm">No credit card required • 14-day free trial</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-muted-foreground">
            <p>&copy; 2024 FlowPay. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
