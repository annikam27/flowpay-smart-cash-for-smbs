import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  CreditCard, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Shield,
  DollarSign,
  Calendar,
  Info
} from "lucide-react";
import { useState } from "react";

const FlowCredit = () => {
  const [calculatorAmount, setCalculatorAmount] = useState(5000);
  const [calculatorDays, setCalculatorDays] = useState([7]);

  const totalLimit = 30000;
  const inUse = 3000;
  const available = totalLimit - inUse;
  const utilizationPercent = (inUse / totalLimit) * 100;

  // Color based on utilization
  const getUtilizationColor = () => {
    if (utilizationPercent < 50) return "text-green-600";
    if (utilizationPercent < 80) return "text-yellow-600";
    return "text-red-600";
  };

  const getUtilizationBgColor = () => {
    if (utilizationPercent < 50) return "bg-green-600";
    if (utilizationPercent < 80) return "bg-yellow-600";
    return "bg-red-600";
  };

  // Calculator logic
  const days = calculatorDays[0];
  const flowCreditCost = (calculatorAmount * 0.10 * (days / 365)).toFixed(2);
  const creditCardCost = (calculatorAmount * 0.18 * (days / 365)).toFixed(2);
  const overdraftCost = (175).toFixed(2);
  const traditionalLOC = (calculatorAmount * 0.12 * (days / 365) + 50).toFixed(2);
  
  const alternatives = [
    { name: "Credit Card", cost: parseFloat(creditCardCost) },
    { name: "Overdraft", cost: parseFloat(overdraftCost) },
    { name: "Traditional LOC", cost: parseFloat(traditionalLOC) }
  ];
  const cheapestAlternative = Math.min(...alternatives.map(a => a.cost));
  const savings = (cheapestAlternative - parseFloat(flowCreditCost)).toFixed(2);

  return (
    <DashboardLayout>
      <div className="space-y-8 pb-8">
        {/* Hero Section */}
        <div className="text-center space-y-4 pt-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
            <TrendingUp className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI-Powered Credit Line</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight">FlowCredit</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your AI-powered working capital line
          </p>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Borrow money automatically when cash flow gaps appear. Pay it back from incoming revenue.
          </p>
        </div>

        {/* Credit Line Status - Large Card */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle>Credit Line Status</CardTitle>
            <CardDescription>Your working capital availability</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              {/* Circular Progress */}
              <div className="relative w-48 h-48 flex items-center justify-center">
                <svg className="w-48 h-48 transform -rotate-90">
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="none"
                    className="text-muted"
                  />
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 88}`}
                    strokeDashoffset={`${2 * Math.PI * 88 * (1 - (available / totalLimit))}`}
                    className={utilizationPercent < 50 ? "text-green-600" : utilizationPercent < 80 ? "text-yellow-600" : "text-red-600"}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`text-3xl font-bold ${getUtilizationColor()}`}>
                    {Math.round((available / totalLimit) * 100)}%
                  </span>
                  <span className="text-sm text-muted-foreground">Available</span>
                </div>
              </div>

              {/* Details */}
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Limit</p>
                    <p className="text-2xl font-bold">${totalLimit.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Available</p>
                    <p className="text-2xl font-bold text-green-600">${available.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">In Use</p>
                    <p className="text-2xl font-bold text-red-600">${inUse.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Interest Rate</p>
                    <p className="text-2xl font-bold">10% APR</p>
                  </div>
                </div>

                <div className="pt-4 space-y-2 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Your tier:</span>
                    <Badge variant="secondary">Professional</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Based on monthly revenue:</span>
                    <span className="font-medium">$100,000</span>
                  </div>
                  <Button variant="link" className="p-0 h-auto text-primary">
                    <Info className="h-4 w-4 mr-1" />
                    How is my limit calculated?
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Active Draws */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Active Draws
              </CardTitle>
              <CardDescription>Current borrowed amounts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-2xl font-bold">$3,000</p>
                      <p className="text-sm text-muted-foreground">Payroll bridge</p>
                    </div>
                    <Badge className="bg-green-600 hover:bg-green-700">Active</Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Date borrowed</p>
                      <p className="font-medium">Nov 15, 2025</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Days outstanding</p>
                      <p className="font-medium">5 days</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Interest accrued</p>
                      <p className="font-medium text-orange-600">$12.33</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Auto-repays</p>
                      <p className="font-medium">Nov 22</p>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full" size="sm">
                    Repay Early
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Repayment History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Repayment History
              </CardTitle>
              <CardDescription>Your credit line activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { amount: 2500, date: "Nov 10", duration: "3 days", interest: 5.48, status: "Repaid" },
                  { amount: 5000, date: "Oct 28", duration: "7 days", interest: 9.59, status: "Repaid" },
                  { amount: 1500, date: "Oct 15", duration: "2 days", interest: 1.64, status: "Repaid" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 border-b pb-3 last:border-0">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">${item.amount.toLocaleString()}</p>
                        <Badge variant="outline" className="text-xs">{item.status}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {item.date} · {item.duration} · ${item.interest} interest
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Comparison Calculator */}
        <Card>
          <CardHeader>
            <CardTitle>How much would you save?</CardTitle>
            <CardDescription>Compare FlowCredit to other financing options</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Amount needed</Label>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-medium">$</span>
                  <input
                    type="number"
                    value={calculatorAmount}
                    onChange={(e) => setCalculatorAmount(Number(e.target.value))}
                    className="flex-1 text-2xl font-bold bg-transparent border-b-2 border-input focus:border-primary outline-none"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Duration: {days} days</Label>
                <Slider
                  value={calculatorDays}
                  onValueChange={setCalculatorDays}
                  min={1}
                  max={30}
                  step={1}
                  className="pt-2"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 border-2 border-primary rounded-lg bg-primary/5">
                <p className="text-sm text-muted-foreground mb-1">FlowCredit</p>
                <p className="text-3xl font-bold text-primary">${flowCreditCost}</p>
                <Badge className="mt-2 bg-green-600 hover:bg-green-700">Lowest Cost</Badge>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Credit Card Cash Advance</p>
                <p className="text-3xl font-bold">${creditCardCost}</p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Bank Overdraft</p>
                <p className="text-3xl font-bold">${overdraftCost}</p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Traditional LOC</p>
                <p className="text-3xl font-bold">${traditionalLOC}</p>
                <p className="text-xs text-muted-foreground mt-1">+ monthly fee</p>
              </div>
            </div>

            <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <p className="text-lg font-semibold text-green-900 dark:text-green-100">
                Your savings: ${savings}
              </p>
              <p className="text-sm text-green-700 dark:text-green-300">
                Compared to the next best option
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          {/* How It Works */}
          <Card>
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
              <CardDescription>Simple, automatic, and transparent</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    <span className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-orange-600" />
                      AI detects cash gap
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    We predict shortfalls 2-4 weeks in advance using your payment patterns and upcoming obligations.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      Approve or auto-approve
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    You can set rules for automatic borrowing or manually approve each draw.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    <span className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      Money available instantly
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    Funds are deposited into your account the same day you need them.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>
                    <span className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-purple-600" />
                      Auto-repayment from revenue
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    As payments come in, we automatically repay your draw. No manual payments needed.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
              <CardDescription>Configure your FlowCredit preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="font-medium">Auto-approval rules</div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="auto-small" defaultChecked />
                    <Label htmlFor="auto-small" className="text-sm font-normal cursor-pointer">
                      Auto-approve draws under $5,000
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="auto-critical" defaultChecked />
                    <Label htmlFor="auto-critical" className="text-sm font-normal cursor-pointer">
                      Only for payroll and critical vendors
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="manual-all" />
                    <Label htmlFor="manual-all" className="text-sm font-normal cursor-pointer">
                      Require manual approval for all
                    </Label>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <div className="font-medium">Notifications</div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="notify-before" defaultChecked />
                    <Label htmlFor="notify-before" className="text-sm font-normal cursor-pointer">
                      Notify me before drawing
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="notify-repay" defaultChecked />
                    <Label htmlFor="notify-repay" className="text-sm font-normal cursor-pointer">
                      Send repayment confirmations
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="daily-updates" />
                    <Label htmlFor="daily-updates" className="text-sm font-normal cursor-pointer">
                      Daily balance updates
                    </Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Request Increase */}
        <Card className="border-2 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex-1 space-y-2">
                <h3 className="text-xl font-semibold">Need more capital?</h3>
                <p className="text-muted-foreground">
                  Based on your revenue and payment history, you may qualify for up to <span className="font-bold text-primary">$50,000</span>
                </p>
              </div>
              <Button size="lg" className="whitespace-nowrap">
                Request Limit Increase
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Security Badge & Testimonial */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <Shield className="h-12 w-12 text-primary" />
                <div>
                  <h4 className="font-semibold">Bank-level Security</h4>
                  <p className="text-sm text-muted-foreground">
                    256-bit encryption · SOC 2 compliant
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-primary/5">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <p className="text-sm italic">
                  "FlowCredit saved us $2,400 in overdraft fees last month. The AI predicted our cash gap perfectly."
                </p>
                <p className="text-sm font-medium">— Sarah Chen, CFO at TechStart Inc.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FlowCredit;