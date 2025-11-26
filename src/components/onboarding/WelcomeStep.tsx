import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, DollarSign, LineChart, CheckCircle2 } from "lucide-react";

interface WelcomeStepProps {
  onNext: (data: any) => void;
}

export function WelcomeStep({ onNext }: WelcomeStepProps) {
  return (
    <div className="max-w-3xl mx-auto text-center animate-fade-in">
      {/* Hero Section */}
      <div className="mb-12">
        <div className="mb-6">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary to-primary/60 rounded-full flex items-center justify-center mb-6">
            <DollarSign className="w-12 h-12 text-primary-foreground" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4">Welcome to FlowPay! 👋</h1>
        <p className="text-xl text-muted-foreground">
          Let's get you set up in just 5 minutes
        </p>
      </div>

      {/* What You'll Do */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <h2 className="text-lg font-semibold mb-4 text-left">What you'll do:</h2>
          <div className="space-y-3 text-left">
            {[
              "Complete your business profile",
              "Connect your bank account",
              "Set your cash buffer goal",
              "Add your first vendor",
              "See your cash flow forecast",
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Value Props */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <Card className="hover-scale">
          <CardContent className="pt-6 text-center">
            <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Calendar className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Never miss a payment</h3>
            <p className="text-sm text-muted-foreground">
              Automated scheduling and alerts
            </p>
          </CardContent>
        </Card>

        <Card className="hover-scale">
          <CardContent className="pt-6 text-center">
            <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <LineChart className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Know your cash position</h3>
            <p className="text-sm text-muted-foreground">
              Real-time forecasting powered by AI
            </p>
          </CardContent>
        </Card>

        <Card className="hover-scale">
          <CardContent className="pt-6 text-center">
            <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <DollarSign className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Get capital when needed</h3>
            <p className="text-sm text-muted-foreground">
              FlowCredit instantly covers cash gaps
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Action */}
      <div className="space-y-4">
        <Button size="lg" onClick={() => onNext({})} className="w-full sm:w-auto px-12">
          Let's Get Started →
        </Button>
        <div>
          <button
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => onNext({})}
          >
            I'll explore on my own
          </button>
        </div>
      </div>
    </div>
  );
}
