import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, CheckCircle2, TrendingUp } from "lucide-react";

interface BufferSetupStepProps {
  onNext: (data: any) => void;
  onBack: () => void;
  initialData: any;
}

const PRESET_BUFFERS = [
  { label: "Conservative", amount: 10000, percentage: 30, color: "bg-blue-500" },
  { label: "Moderate", amount: 5000, percentage: 15, color: "bg-primary", recommended: true },
  { label: "Aggressive", amount: 2000, percentage: 6, color: "bg-orange-500" },
];

export function BufferSetupStep({ onNext, onBack, initialData }: BufferSetupStepProps) {
  const currentBalance = initialData.bankAccount?.balance || 32400;
  const [bufferAmount, setBufferAmount] = useState(initialData.bufferAmount || 5000);
  const [customMode, setCustomMode] = useState(false);
  const [autoAlert, setAutoAlert] = useState(true);
  const [autoActivateCredit, setAutoActivateCredit] = useState(false);
  const [alertTiming, setAlertTiming] = useState("3");

  const bufferPercentage = (bufferAmount / currentBalance) * 100;
  const estimatedDays = Math.floor((bufferAmount / 1000) * 7); // Rough estimate

  const getBufferStatus = () => {
    if (bufferPercentage < 5) return { label: "Too low", color: "text-destructive" };
    if (bufferPercentage < 10) return { label: "Aggressive", color: "text-orange-500" };
    if (bufferPercentage <= 25) return { label: "Good", color: "text-primary" };
    return { label: "Very safe", color: "text-blue-500" };
  };

  const status = getBufferStatus();

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold mb-2">Set your safety buffer</h2>
        <p className="text-muted-foreground">How much cash do you want to keep on hand?</p>
      </div>

      {/* Educational Card */}
      <Card className="mb-6 bg-muted/50">
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-primary" />
            What's a cash buffer?
          </h3>
          <p className="text-sm text-muted-foreground mb-2">
            Your buffer is the minimum amount of cash you always want available.
          </p>
          <p className="text-sm text-muted-foreground">
            FlowPay will alert you if your balance approaches this amount.
          </p>
        </CardContent>
      </Card>

      {/* Recommendation */}
      {initialData.bankConnected && (
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-semibold mb-1">Based on your balance (${currentBalance.toLocaleString()}), we recommend:</h3>
                <p className="text-2xl font-bold text-primary mb-2">$5,000</p>
                <p className="text-sm text-muted-foreground">
                  This is 15% of your current balance, enough to cover ~1 week of typical expenses
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Buffer Selector */}
      {!customMode ? (
        <div className="space-y-4 mb-6">
          <Label>Choose your buffer level</Label>
          <div className="grid md:grid-cols-3 gap-4">
            {PRESET_BUFFERS.map((preset) => (
              <Card
                key={preset.label}
                className={`cursor-pointer transition-all ${
                  bufferAmount === preset.amount ? "border-primary bg-primary/5" : "hover:border-muted-foreground/50"
                }`}
                onClick={() => setBufferAmount(preset.amount)}
              >
                <CardContent className="pt-6 text-center">
                  {preset.recommended && (
                    <Badge className="mb-2" variant="default">
                      Recommended
                    </Badge>
                  )}
                  <div className="text-lg font-semibold mb-1">{preset.label}</div>
                  <div className="text-2xl font-bold mb-2">${preset.amount.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground mb-1">{preset.percentage}% of balance</div>
                  <div className="text-xs text-muted-foreground">
                    Covers ~{Math.floor((preset.amount / 1000) * 7)} days
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center">
            <button
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setCustomMode(true)}
            >
              Set custom amount
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4 mb-6">
          <Label>Custom buffer amount</Label>
          <div className="flex gap-4 items-center">
            <span className="text-sm text-muted-foreground">$500</span>
            <Slider
              value={[bufferAmount]}
              onValueChange={(value) => setBufferAmount(value[0])}
              min={500}
              max={50000}
              step={500}
              className="flex-1"
            />
            <span className="text-sm text-muted-foreground">$50k</span>
          </div>
          <div className="flex items-center gap-4">
            <Input
              type="number"
              value={bufferAmount}
              onChange={(e) => setBufferAmount(Number(e.target.value))}
              min={500}
              max={50000}
              className="w-32"
            />
            <div className="flex-1 text-sm text-muted-foreground">
              {bufferPercentage.toFixed(1)}% of balance • Covers ~{estimatedDays} days
            </div>
          </div>
          <button
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setCustomMode(false)}
          >
            ← Back to presets
          </button>
        </div>
      )}

      {/* Visual Gauge */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Buffer Level</span>
            <span className={`text-sm font-semibold ${status.color}`}>{status.label}</span>
          </div>
          <Progress value={Math.min(bufferPercentage, 100)} className="h-3 mb-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Buffer: ${bufferAmount.toLocaleString()}</span>
            <span>Balance: ${currentBalance.toLocaleString()}</span>
          </div>
        </CardContent>
      </Card>

      {/* Alert Settings */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <h3 className="font-semibold mb-4">Alert Settings</h3>
          
          <div className="flex items-start space-x-3">
            <Checkbox id="autoAlert" checked={autoAlert} onCheckedChange={(checked) => setAutoAlert(checked as boolean)} />
            <div className="flex-1">
              <label htmlFor="autoAlert" className="text-sm font-medium leading-none cursor-pointer">
                Alert me when balance approaches buffer
              </label>
            </div>
          </div>

          {autoAlert && (
            <div className="ml-7 space-y-2">
              <Label htmlFor="alertTiming" className="text-sm">Alert timing</Label>
              <Select value={alertTiming} onValueChange={setAlertTiming}>
                <SelectTrigger id="alertTiming">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 day before</SelectItem>
                  <SelectItem value="3">3 days before</SelectItem>
                  <SelectItem value="5">5 days before</SelectItem>
                  <SelectItem value="7">1 week before</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="flex items-start space-x-3">
            <Checkbox
              id="autoCredit"
              checked={autoActivateCredit}
              onCheckedChange={(checked) => setAutoActivateCredit(checked as boolean)}
            />
            <div className="flex-1">
              <label htmlFor="autoCredit" className="text-sm font-medium leading-none cursor-pointer">
                Auto-activate FlowCredit if balance drops below buffer
              </label>
              <p className="text-xs text-muted-foreground mt-1">
                Automatically use your credit line to maintain your buffer
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={() => onNext({ bufferAmount, autoAlert, autoActivateCredit, alertTiming })}>
          Set Buffer →
        </Button>
      </div>
    </div>
  );
}

function Badge({ children, className, variant }: { children: React.ReactNode; className?: string; variant?: string }) {
  return <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium bg-primary text-primary-foreground ${className}`}>{children}</span>;
}
