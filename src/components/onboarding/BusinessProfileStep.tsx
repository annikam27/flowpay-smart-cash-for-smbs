import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface BusinessProfileStepProps {
  onNext: (data: any) => void;
  onBack: () => void;
  initialData: any;
}

const INDUSTRIES = [
  "Technology",
  "Professional Services",
  "Retail",
  "E-commerce",
  "Construction",
  "Healthcare",
  "Education",
  "Marketing",
  "Consulting",
  "Manufacturing",
  "Other",
];

const BUSINESS_SIZES = [
  { value: "solo", label: "Solo", description: "Just me" },
  { value: "small", label: "Small", description: "2-10 employees" },
  { value: "medium", label: "Medium", description: "11-50 employees" },
  { value: "large", label: "Large", description: "51+ employees" },
];

const USE_CASES = [
  "Pay vendors and contractors",
  "Manage payroll",
  "Track cash flow",
  "Forecast future cash needs",
  "Get working capital loans",
  "Generate financial reports",
];

export function BusinessProfileStep({ onNext, onBack, initialData }: BusinessProfileStepProps) {
  const [formData, setFormData] = useState({
    businessName: initialData.businessName || "",
    industry: initialData.industry || "",
    businessSize: initialData.businessSize || "",
    monthlyRevenue: initialData.monthlyRevenue || "",
    monthlyExpenses: initialData.monthlyExpenses || "",
    useCases: initialData.useCases || [],
  });

  const isValid = formData.businessName && formData.industry && formData.businessSize && formData.useCases.length > 0;

  const toggleUseCase = (useCase: string) => {
    setFormData((prev) => ({
      ...prev,
      useCases: prev.useCases.includes(useCase)
        ? prev.useCases.filter((uc) => uc !== useCase)
        : [...prev.useCases, useCase],
    }));
  };

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold mb-2">Tell us about your business</h2>
        <p className="text-muted-foreground">This helps us personalize your experience</p>
      </div>

      <Card>
        <CardContent className="pt-6 space-y-6">
          {/* Business Name */}
          <div className="space-y-2">
            <Label htmlFor="businessName">Business Name *</Label>
            <Input
              id="businessName"
              value={formData.businessName}
              onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
              placeholder="Acme Inc."
            />
            <p className="text-xs text-muted-foreground">This will appear on all your reports</p>
          </div>

          {/* Industry */}
          <div className="space-y-2">
            <Label htmlFor="industry">Industry *</Label>
            <Select value={formData.industry} onValueChange={(value) => setFormData({ ...formData, industry: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select your industry" />
              </SelectTrigger>
              <SelectContent>
                {INDUSTRIES.map((industry) => (
                  <SelectItem key={industry} value={industry}>
                    {industry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Business Size */}
          <div className="space-y-2">
            <Label>Business Size *</Label>
            <div className="grid grid-cols-2 gap-3">
              {BUSINESS_SIZES.map((size) => (
                <Card
                  key={size.value}
                  className={`cursor-pointer transition-all ${
                    formData.businessSize === size.value
                      ? "border-primary bg-primary/5"
                      : "hover:border-muted-foreground/50"
                  }`}
                  onClick={() => setFormData({ ...formData, businessSize: size.value })}
                >
                  <CardContent className="p-4">
                    <div className="font-medium">{size.label}</div>
                    <div className="text-sm text-muted-foreground">{size.description}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Monthly Revenue */}
          <div className="space-y-2">
            <Label htmlFor="revenue">Monthly Revenue (optional)</Label>
            <Select
              value={formData.monthlyRevenue}
              onValueChange={(value) => setFormData({ ...formData, monthlyRevenue: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="starting">Just starting out</SelectItem>
                <SelectItem value="0-10k">$0 - $10K</SelectItem>
                <SelectItem value="10k-50k">$10K - $50K</SelectItem>
                <SelectItem value="50k-100k">$50K - $100K</SelectItem>
                <SelectItem value="100k-500k">$100K - $500K</SelectItem>
                <SelectItem value="500k-1m">$500K - $1M</SelectItem>
                <SelectItem value="1m+">$1M+</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">This helps us set appropriate defaults. We'll never share this.</p>
          </div>

          {/* Monthly Expenses */}
          <div className="space-y-2">
            <Label htmlFor="expenses">Average Monthly Expenses (optional)</Label>
            <Select
              value={formData.monthlyExpenses}
              onValueChange={(value) => setFormData({ ...formData, monthlyExpenses: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-5k">$0 - $5K</SelectItem>
                <SelectItem value="5k-25k">$5K - $25K</SelectItem>
                <SelectItem value="25k-50k">$25K - $50K</SelectItem>
                <SelectItem value="50k-100k">$50K - $100K</SelectItem>
                <SelectItem value="100k+">$100K+</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">Rough estimate is fine</p>
          </div>

          {/* Use Cases */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label>Primary Use Case *</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="w-4 h-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">We use this to customize your dashboard and provide relevant insights</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <p className="text-sm text-muted-foreground">Select all that apply</p>
            <div className="space-y-3">
              {USE_CASES.map((useCase) => (
                <div key={useCase} className="flex items-center space-x-2">
                  <Checkbox
                    id={useCase}
                    checked={formData.useCases.includes(useCase)}
                    onCheckedChange={() => toggleUseCase(useCase)}
                  />
                  <label
                    htmlFor={useCase}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {useCase}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={() => onNext(formData)} disabled={!isValid}>
          Continue →
        </Button>
      </div>
    </div>
  );
}
