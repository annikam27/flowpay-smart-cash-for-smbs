import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2, Plus, Trash2, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VendorStepProps {
  onNext: (data: any) => void;
  onBack: () => void;
  initialData: any;
}

const COMMON_VENDORS = [
  { name: "AWS", logo: "☁️", category: "Cloud Services" },
  { name: "Google Workspace", logo: "📧", category: "Software" },
  { name: "Microsoft 365", logo: "📊", category: "Software" },
  { name: "Stripe", logo: "💳", category: "Payments" },
  { name: "Adobe", logo: "🎨", category: "Design Tools" },
  { name: "Slack", logo: "💬", category: "Communication" },
];

export function VendorStep({ onNext, onBack, initialData }: VendorStepProps) {
  const [vendors, setVendors] = useState(initialData.vendors || []);
  const [showForm, setShowForm] = useState(vendors.length === 0);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    amount: "",
    frequency: "",
    paymentMethod: "ach",
  });
  const { toast } = useToast();

  const addVendor = () => {
    if (!formData.name || !formData.paymentMethod) {
      toast({
        title: "Missing information",
        description: "Please fill in the vendor name and payment method",
        variant: "destructive",
      });
      return;
    }

    const newVendor = {
      ...formData,
      amount: Number(formData.amount) || 0,
      id: Date.now(),
    };
    setVendors([...vendors, newVendor]);
    setFormData({
      name: "",
      description: "",
      amount: "",
      frequency: "",
      paymentMethod: "ach",
    });
    setShowForm(false);
    toast({
      title: `${newVendor.name} added!`,
      description: "Vendor successfully added to your account",
    });
  };

  const removeVendor = (id: number) => {
    setVendors(vendors.filter((v: any) => v.id !== id));
  };

  const selectCommonVendor = (vendor: any) => {
    setFormData({
      ...formData,
      name: vendor.name,
      description: vendor.category,
    });
    setShowForm(true);
  };

  const handleSkip = () => {
    if (vendors.length === 0) {
      toast({
        title: "Skip vendor setup?",
        description: "You can add vendors later, but it helps with forecasting",
      });
    }
    onNext({ vendors });
  };

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold mb-2">Add your first vendor</h2>
        <p className="text-muted-foreground">Who do you pay regularly?</p>
      </div>

      {/* Benefits */}
      <Card className="mb-6 bg-muted/50">
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-3">Why add vendors?</h3>
          <div className="space-y-2">
            {[
              "Schedule payments quickly",
              "Track spending by vendor",
              "Get payment reminders",
              "See vendor history at a glance",
            ].map((benefit, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">{benefit}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Common Vendors */}
      {!showForm && vendors.length === 0 && (
        <div className="mb-6">
          <Label className="mb-3 block">Or select a common vendor:</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {COMMON_VENDORS.map((vendor) => (
              <Card
                key={vendor.name}
                className="cursor-pointer hover:border-primary transition-all hover-scale"
                onClick={() => selectCommonVendor(vendor)}
              >
                <CardContent className="pt-6 text-center">
                  <div className="text-3xl mb-2">{vendor.logo}</div>
                  <div className="font-medium text-sm">{vendor.name}</div>
                  <div className="text-xs text-muted-foreground">{vendor.category}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Existing Vendors */}
      {vendors.length > 0 && (
        <div className="mb-6 space-y-3">
          <Label>Added vendors ({vendors.length})</Label>
          {vendors.map((vendor: any) => (
            <Card key={vendor.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold">{vendor.name}</h3>
                    {vendor.description && <p className="text-sm text-muted-foreground">{vendor.description}</p>}
                    <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                      {vendor.amount > 0 && <span>${vendor.amount.toLocaleString()}</span>}
                      {vendor.frequency && <span>{vendor.frequency}</span>}
                      <span className="capitalize">{vendor.paymentMethod}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeVendor(vendor.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Vendor Form */}
      {showForm ? (
        <Card className="mb-6">
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="vendorName">Vendor Name *</Label>
              <Input
                id="vendorName"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Web Designer, AWS, Office Depot"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">What do they provide?</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="e.g., Web design, Cloud hosting"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Typical payment amount</Label>
              <Input
                id="amount"
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                placeholder="0"
              />
              <p className="text-xs text-muted-foreground">Rough estimate is fine</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="frequency">Payment frequency</Label>
              <Select value={formData.frequency} onValueChange={(value) => setFormData({ ...formData, frequency: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="How often?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="one-time">One-time</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="annually">Annually</SelectItem>
                  <SelectItem value="varies">Varies</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Payment Method *</Label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: "ach", label: "ACH Transfer", fee: "Free" },
                  { value: "wire", label: "Wire Transfer", fee: "$15" },
                  { value: "international", label: "International", fee: "0.5%" },
                  { value: "check", label: "Check", fee: "$1.50" },
                ].map((method) => (
                  <Card
                    key={method.value}
                    className={`cursor-pointer transition-all ${
                      formData.paymentMethod === method.value ? "border-primary bg-primary/5" : "hover:border-muted-foreground/50"
                    }`}
                    onClick={() => setFormData({ ...formData, paymentMethod: method.value })}
                  >
                    <CardContent className="p-3">
                      <div className="font-medium text-sm">{method.label}</div>
                      <div className="text-xs text-muted-foreground">{method.fee}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowForm(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={addVendor} className="flex-1">
                <Plus className="w-4 h-4 mr-2" />
                Add Vendor
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Button variant="outline" onClick={() => setShowForm(true)} className="w-full mb-6">
          <Plus className="w-4 h-4 mr-2" />
          Add {vendors.length > 0 ? "Another" : "First"} Vendor
        </Button>
      )}

      {/* Skip Option */}
      {vendors.length === 0 && !showForm && (
        <div className="text-center mb-6">
          <button className="text-sm text-muted-foreground hover:text-foreground transition-colors" onClick={handleSkip}>
            I'll add vendors later
          </button>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={() => onNext({ vendors })} disabled={vendors.length === 0 && showForm}>
          Continue →
        </Button>
      </div>
    </div>
  );
}
