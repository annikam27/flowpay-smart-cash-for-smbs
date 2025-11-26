import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface OnboardingContextType {
  isOnboardingComplete: boolean;
  setOnboardingComplete: (complete: boolean) => void;
  shouldShowOnboarding: boolean;
  setShouldShowOnboarding: (show: boolean) => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(() => {
    const saved = localStorage.getItem("flowpay_onboarding_complete");
    return saved === "true";
  });
  
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(!isOnboardingComplete);

  const setOnboardingComplete = (complete: boolean) => {
    setIsOnboardingComplete(complete);
    localStorage.setItem("flowpay_onboarding_complete", complete.toString());
    if (complete) {
      setShouldShowOnboarding(false);
    }
  };

  return (
    <OnboardingContext.Provider
      value={{
        isOnboardingComplete,
        setOnboardingComplete,
        shouldShowOnboarding,
        setShouldShowOnboarding,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
}
