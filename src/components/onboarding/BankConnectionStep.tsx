import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, CheckCircle2, Building2, Clock } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface BankConnectionStepProps {
  onNext: (data: any) => void;
  onBack: () => void;
  initialData: any;
}

export function BankConnectionStep({ onNext, onBack, initialData }: BankConnectionStepProps) {
  const [showPlaidModal, setShowPlaidModal] = useState(false);
  const [showManualModal, setShowManualModal] = useState(false);
  const [bankConnected, setBankConnected] = useState(initialData.bankConnected || false);
  const [bankAccount, setBankAccount] = useState(initialData.bankAccount);
  const { toast } = useToast();

  const handlePlaidConnect = () => {
    // Simulate Plaid connection
    setTimeout(() => {
      const mockAccount = {
        name: "Business Checking",
        last4: "1234",
        balance: 32400,
      };
      setBankAccount(mockAccount);
      setBankConnected(true);
      setShowPlaidModal(false);
      toast({
        title: "Bank connected successfully!",
        description: "Your account has been linked securely.",
      });
    }, 1500);
  };

  const handleSkip = () => {
    onNext({ bankConnected: false });
  };

  const handleContinue = () => {
    onNext({ bankConnected, bankAccount });
  };

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold mb-2">Connect your bank account</h2>
        <p className="text-muted-foreground">Securely link your business checking account</p>
      </div>

      {/* Why Connect */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-4">Why connect your bank?</h3>
          <div className="space-y-3">
            {[
              "Automatic balance sync",
              "Real-time cash flow tracking",
              "Accurate forecasting",
              "Faster payment verification",
            ].map((benefit, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm text-muted-foreground">{benefit}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="w-4 h-4" />
            <span>Your data is encrypted and never shared</span>
          </div>
        </CardContent>
      </Card>

      {/* Security Badges */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <Badge variant="outline" className="px-4 py-2">
          <Shield className="w-4 h-4 mr-2" />
          256-bit Encryption
        </Badge>
        <Badge variant="outline" className="px-4 py-2">
          SOC 2 Certified
        </Badge>
        <Badge variant="outline" className="px-4 py-2">
          Read-only Access
        </Badge>
      </div>

      {/* Connection Options */}
      {!bankConnected ? (
        <div className="space-y-4">
          {/* Plaid Option */}
          <Card className="cursor-pointer hover:border-primary transition-colors" onClick={() => setShowPlaidModal(true)}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold">Connect with Plaid</h3>
                    <Badge>Recommended</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">Connect to 11,000+ banks</p>
                  <p className="text-sm text-muted-foreground">Instant setup in 60 seconds</p>
                </div>
                <Building2 className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          {/* Manual Option */}
          <Card className="cursor-pointer hover:border-muted-foreground/50 transition-colors" onClick={() => setShowManualModal(true)}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">Manual Entry</h3>
                  <p className="text-sm text-muted-foreground mb-2">Enter bank details manually</p>
                  <p className="text-sm text-muted-foreground">Takes longer, requires verification</p>
                </div>
                <Clock className="w-8 h-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          {/* Skip Option */}
          <div className="text-center">
            <button className="text-sm text-muted-foreground hover:text-foreground transition-colors" onClick={handleSkip}>
              I'll do this later
            </button>
            <p className="text-xs text-muted-foreground mt-1">Limited features without bank connection</p>
          </div>
        </div>
      ) : (
        /* Connected Account */
        <Card className="border-primary">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold">Bank Connected</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-1">
                  {bankAccount?.name} (...{bankAccount?.last4})
                </p>
                <p className="text-lg font-semibold mb-1">${bankAccount?.balance.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Last synced: Just now</p>
              </div>
              <Building2 className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={handleContinue}>Continue →</Button>
      </div>

      {/* Plaid Modal */}
      <Dialog open={showPlaidModal} onOpenChange={setShowPlaidModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Connect Your Bank</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              In a production app, this would open the Plaid Link interface to securely connect your bank.
            </p>
            <div className="space-y-2">
              <Label>Search for your bank</Label>
              <Input placeholder="e.g., Chase, Bank of America..." />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowPlaidModal(false)}>
                Cancel
              </Button>
              <Button onClick={handlePlaidConnect}>Connect Bank</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Manual Modal */}
      <Dialog open={showManualModal} onOpenChange={setShowManualModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Manual Bank Entry</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Bank Name</Label>
              <Input placeholder="e.g., Chase" />
            </div>
            <div className="space-y-2">
              <Label>Account Holder Name</Label>
              <Input placeholder="Business name" />
            </div>
            <div className="space-y-2">
              <Label>Routing Number</Label>
              <Input placeholder="9 digits" maxLength={9} />
            </div>
            <div className="space-y-2">
              <Label>Account Number</Label>
              <Input type="password" placeholder="Account number" />
            </div>
            <p className="text-xs text-muted-foreground">
              We'll verify with micro-deposits within 1-2 business days
            </p>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowManualModal(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowManualModal(false)}>Add Account</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
