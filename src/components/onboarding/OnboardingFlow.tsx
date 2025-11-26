import { useState, useEffect } from "react";
import { WelcomeStep } from "./WelcomeStep";
import { BusinessProfileStep } from "./BusinessProfileStep";
import { BankConnectionStep } from "./BankConnectionStep";
import { BufferSetupStep } from "./BufferSetupStep";
import { VendorStep } from "./VendorStep";
import { CompleteStep } from "./CompleteStep";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const STEP_NAMES = [
  "Welcome",
  "Profile",
  "Banking",
  "Buffer",
  "Vendors",
  "Complete"
];

interface OnboardingData {
  businessName: string;
  industry: string;
  businessSize: string;
  monthlyRevenue: string;
  monthlyExpenses: string;
  useCases: string[];
  bankConnected: boolean;
  bankAccount?: {
    name: string;
    last4: string;
    balance: number;
  };
  bufferAmount: number;
  vendors: Array<{
    name: string;
    description: string;
    amount: number;
    frequency: string;
    paymentMethod: string;
  }>;
  tourCompleted: boolean;
}

interface OnboardingFlowProps {
  onComplete: (data: OnboardingData) => void;
  onSkip: () => void;
}

export function OnboardingFlow({ onComplete, onSkip }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    businessName: "",
    industry: "",
    businessSize: "",
    monthlyRevenue: "",
    monthlyExpenses: "",
    useCases: [],
    bankConnected: false,
    bufferAmount: 5000,
    vendors: [],
    tourCompleted: false,
  });

  // Load saved progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("flowpay_onboarding");
    if (saved) {
      const { step, data } = JSON.parse(saved);
      setCurrentStep(step);
      setOnboardingData(data);
    }
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem(
      "flowpay_onboarding",
      JSON.stringify({ step: currentStep, data: onboardingData })
    );
  }, [currentStep, onboardingData]);

  const handleNext = (stepData: Partial<OnboardingData>) => {
    const updatedData = { ...onboardingData, ...stepData };
    setOnboardingData(updatedData);
    
    if (currentStep === STEP_NAMES.length - 1) {
      localStorage.removeItem("flowpay_onboarding");
      onComplete(updatedData);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkipOnboarding = () => {
    localStorage.removeItem("flowpay_onboarding");
    onSkip();
  };

  const progressPercentage = ((currentStep + 1) / STEP_NAMES.length) * 100;

  return (
    <div className="fixed inset-0 bg-background z-50 overflow-y-auto">
      {/* Header with Progress */}
      <div className="border-b border-border bg-card">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Step {currentStep + 1} of {STEP_NAMES.length}
              </span>
            </div>
            {currentStep > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSkipOnboarding}
                className="text-muted-foreground"
              >
                Skip for now
              </Button>
            )}
          </div>
          
          <Progress value={progressPercentage} className="h-2" />
          
          <div className="flex justify-between mt-3">
            {STEP_NAMES.map((name, index) => (
              <div
                key={name}
                className={`flex items-center gap-2 ${
                  index <= currentStep
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    index < currentStep
                      ? "bg-primary"
                      : index === currentStep
                      ? "bg-primary animate-pulse"
                      : "bg-muted"
                  }`}
                />
                <span className="text-xs hidden sm:inline">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {currentStep === 0 && <WelcomeStep onNext={handleNext} />}
        {currentStep === 1 && (
          <BusinessProfileStep
            onNext={handleNext}
            onBack={handleBack}
            initialData={onboardingData}
          />
        )}
        {currentStep === 2 && (
          <BankConnectionStep
            onNext={handleNext}
            onBack={handleBack}
            initialData={onboardingData}
          />
        )}
        {currentStep === 3 && (
          <BufferSetupStep
            onNext={handleNext}
            onBack={handleBack}
            initialData={onboardingData}
          />
        )}
        {currentStep === 4 && (
          <VendorStep
            onNext={handleNext}
            onBack={handleBack}
            initialData={onboardingData}
          />
        )}
        {currentStep === 5 && (
          <CompleteStep
            onNext={handleNext}
            onBack={handleBack}
            data={onboardingData}
          />
        )}
      </div>
    </div>
  );
}
