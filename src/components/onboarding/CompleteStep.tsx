import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Edit, BookOpen, Video, MessageCircle, Calendar, Sparkles } from "lucide-react";

interface CompleteStepProps {
  onNext: (data: any) => void;
  onBack: () => void;
  data: any;
}

export function CompleteStep({ onNext, onBack, data }: CompleteStepProps) {
  const [startTour, setStartTour] = useState(false);

  const handleFinish = () => {
    onNext({ tourCompleted: startTour });
  };

  return (
    <div className="max-w-3xl mx-auto animate-fade-in text-center">
      {/* Success Animation */}
      <div className="mb-8">
        <div className="w-24 h-24 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6 animate-scale-in">
          <CheckCircle2 className="w-12 h-12 text-primary" />
        </div>
        <h1 className="text-4xl font-bold mb-2">You're all set! 🎉</h1>
        <p className="text-xl text-muted-foreground">Your FlowPay account is ready to use</p>
      </div>

      {/* Setup Summary */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-semibold text-left">Your Business</h3>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Edit className="w-4 h-4" />
              </Button>
            </div>
            <div className="text-left space-y-1 text-sm text-muted-foreground">
              <p>{data.businessName || "Not set"}</p>
              <p>{data.industry || "Industry not selected"}</p>
              {data.bankConnected && (
                <p className="flex items-center gap-2 text-primary">
                  <CheckCircle2 className="w-4 h-4" />
                  Bank Connected
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-semibold text-left">Your Buffer</h3>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Edit className="w-4 h-4" />
              </Button>
            </div>
            <div className="text-left space-y-1">
              <p className="text-2xl font-bold text-primary">${data.bufferAmount?.toLocaleString() || "5,000"}</p>
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                Currently maintained
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-semibold text-left">Your Vendors</h3>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Edit className="w-4 h-4" />
              </Button>
            </div>
            <div className="text-left space-y-1 text-sm">
              <p className="font-semibold">
                {data.vendors?.length || 0} vendor{data.vendors?.length !== 1 ? "s" : ""} added
              </p>
              {data.vendors?.[0] && <p className="text-muted-foreground">{data.vendors[0].name}</p>}
              {data.vendors?.length > 1 && <p className="text-muted-foreground">and {data.vendors.length - 1} more</p>}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h3 className="font-semibold text-left mb-3">What's Next</h3>
            <div className="space-y-2 text-left text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded border border-border" />
                <span>Schedule your first payment</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded border border-border" />
                <span>Explore cash flow forecast</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded border border-border" />
                <span>Connect accounting software</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tour Option */}
      <Card className="mb-8 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-semibold mb-2">Take a 2-minute tour?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                We'll show you around the key features and help you get started
              </p>
              <div className="flex gap-2">
                <Button onClick={() => setStartTour(true)}>Start Tour</Button>
                <Button variant="outline" onClick={() => setStartTour(false)}>
                  Skip Tour
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resources */}
      <div className="grid md:grid-cols-4 gap-3 mb-8">
        <Card className="hover-scale cursor-pointer">
          <CardContent className="pt-6 text-center">
            <BookOpen className="w-6 h-6 mx-auto mb-2 text-primary" />
            <p className="text-sm font-medium">Help Center</p>
          </CardContent>
        </Card>
        <Card className="hover-scale cursor-pointer">
          <CardContent className="pt-6 text-center">
            <Video className="w-6 h-6 mx-auto mb-2 text-primary" />
            <p className="text-sm font-medium">Video Tutorials</p>
          </CardContent>
        </Card>
        <Card className="hover-scale cursor-pointer">
          <CardContent className="pt-6 text-center">
            <MessageCircle className="w-6 h-6 mx-auto mb-2 text-primary" />
            <p className="text-sm font-medium">Contact Support</p>
          </CardContent>
        </Card>
        <Card className="hover-scale cursor-pointer">
          <CardContent className="pt-6 text-center">
            <Calendar className="w-6 h-6 mx-auto mb-2 text-primary" />
            <p className="text-sm font-medium">Book a Demo</p>
          </CardContent>
        </Card>
      </div>

      {/* Action */}
      <Button size="lg" onClick={handleFinish} className="px-12">
        Go to Dashboard →
      </Button>
    </div>
  );
}
