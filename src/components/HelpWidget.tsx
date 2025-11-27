import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  HelpCircle,
  BookOpen,
  Video,
  MessageCircle,
  LifeBuoy,
  X,
} from 'lucide-react';

export const HelpWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Help Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-40"
        size="icon"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <HelpCircle className="h-6 w-6" />
        )}
      </Button>

      {/* Help Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-30"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu Card */}
          <Card className="fixed bottom-24 right-6 w-80 shadow-xl z-40 animate-in slide-in-from-bottom-5">
            <div className="p-4">
              <h3 className="font-semibold text-foreground mb-3">Need help?</h3>

              <div className="space-y-2">
                <button
                  onClick={() => window.open('https://docs.flowpay.com', '_blank')}
                  className="w-full text-left p-3 hover:bg-muted rounded-lg flex items-center gap-3 transition-colors"
                >
                  <BookOpen className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium text-sm">Help Center</div>
                    <div className="text-xs text-muted-foreground">
                      Browse articles
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => window.open('https://flowpay.com/tutorials', '_blank')}
                  className="w-full text-left p-3 hover:bg-muted rounded-lg flex items-center gap-3 transition-colors"
                >
                  <Video className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium text-sm">Video Tutorials</div>
                    <div className="text-xs text-muted-foreground">
                      Watch how-tos
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => window.open('mailto:support@flowpay.com', '_blank')}
                  className="w-full text-left p-3 hover:bg-muted rounded-lg flex items-center gap-3 transition-colors"
                >
                  <MessageCircle className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium text-sm">Contact Support</div>
                    <div className="text-xs text-muted-foreground">
                      Get personalized help
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setIsOpen(false);
                    // Trigger onboarding tour
                  }}
                  className="w-full text-left p-3 hover:bg-muted rounded-lg flex items-center gap-3 transition-colors"
                >
                  <LifeBuoy className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium text-sm">Product Tour</div>
                    <div className="text-xs text-muted-foreground">
                      Replay walkthrough
                    </div>
                  </div>
                </button>
              </div>

              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground mb-2">
                  Current page help:
                </p>
                <a
                  href="#"
                  className="text-sm text-primary hover:underline"
                  onClick={(e) => {
                    e.preventDefault();
                    // Open contextual help
                  }}
                >
                  Learn about this page →
                </a>
              </div>
            </div>
          </Card>
        </>
      )}
    </>
  );
};
