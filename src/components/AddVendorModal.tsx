import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import {
  Building,
  Globe,
  FileText,
  X,
  Plus,
  CheckCircle,
  Clock,
} from 'lucide-react';

const vendorSchema = z.object({
  vendorName: z.string().trim().min(1, 'Vendor name is required').max(100),
  businessName: z.string().trim().max(100).optional(),
  email: z.string().trim().email('Invalid email address').max(255),
  phone: z.string().trim().min(10, 'Phone number must be at least 10 digits').max(20),
  address: z.string().trim().max(500).optional(),
  tags: z.array(z.string()).optional(),
  defaultPaymentAmount: z.string().optional(),
  paymentTerms: z.string().optional(),
  notes: z.string().trim().max(1000).optional(),
});

type VendorFormData = z.infer<typeof vendorSchema>;

interface PaymentMethod {
  id: string;
  type: 'ach' | 'international' | 'check';
  isDefault: boolean;
  data: any;
  verified?: boolean;
}

interface AddVendorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

const predefinedTags = ['Design', 'Development', 'Marketing', 'Contractor', 'Supplier', 'Service'];

const countries = [
  'United States', 'United Kingdom', 'Canada', 'Germany', 'France', 'Spain', 'Italy',
  'Netherlands', 'Belgium', 'Switzerland', 'Austria', 'Sweden', 'Norway', 'Denmark',
  'Finland', 'Ireland', 'Portugal', 'Poland', 'Czech Republic', 'Hungary', 'Greece',
  'Australia', 'New Zealand', 'Japan', 'Singapore', 'Hong Kong', 'India', 'China',
  'South Korea', 'Brazil', 'Mexico', 'Argentina', 'Chile', 'Colombia', 'Peru',
];

export function AddVendorModal({ open, onOpenChange, onSuccess }: AddVendorModalProps) {
  const [activeTab, setActiveTab] = useState('basic');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [customTag, setCustomTag] = useState('');
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [showAddPaymentMethod, setShowAddPaymentMethod] = useState(false);
  const [newPaymentType, setNewPaymentType] = useState<'ach' | 'international' | 'check'>('ach');

  // ACH form state
  const [achForm, setAchForm] = useState({
    accountHolder: '',
    bankName: '',
    accountType: 'checking',
    routingNumber: '',
    accountNumber: '',
  });

  // International form state
  const [intlForm, setIntlForm] = useState({
    country: '',
    accountNumber: '',
    swiftCode: '',
    bankName: '',
  });

  // Check form state
  const [checkForm, setCheckForm] = useState({
    mailingAddress: '',
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<VendorFormData>({
    resolver: zodResolver(vendorSchema),
  });

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setValue('phone', formatted);
  };

  const handleAddTag = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      const newTags = [...selectedTags, tag];
      setSelectedTags(newTags);
      setValue('tags', newTags);
    }
  };

  const handleRemoveTag = (tag: string) => {
    const newTags = selectedTags.filter((t) => t !== tag);
    setSelectedTags(newTags);
    setValue('tags', newTags);
  };

  const handleAddCustomTag = () => {
    if (customTag.trim() && !selectedTags.includes(customTag.trim())) {
      handleAddTag(customTag.trim());
      setCustomTag('');
    }
  };

  const validateRoutingNumber = (routing: string) => {
    const numbers = routing.replace(/\D/g, '');
    return numbers.length === 9;
  };

  const handleAddPaymentMethod = () => {
    let newMethod: PaymentMethod | null = null;

    if (newPaymentType === 'ach') {
      if (!achForm.accountHolder || !achForm.bankName || !achForm.routingNumber || !achForm.accountNumber) {
        toast.error('Please fill all required ACH fields');
        return;
      }
      if (!validateRoutingNumber(achForm.routingNumber)) {
        toast.error('Routing number must be 9 digits');
        return;
      }
      newMethod = {
        id: Date.now().toString(),
        type: 'ach',
        isDefault: paymentMethods.length === 0,
        verified: false,
        data: { ...achForm },
      };
      setAchForm({
        accountHolder: '',
        bankName: '',
        accountType: 'checking',
        routingNumber: '',
        accountNumber: '',
      });
    } else if (newPaymentType === 'international') {
      if (!intlForm.country || !intlForm.accountNumber || !intlForm.swiftCode || !intlForm.bankName) {
        toast.error('Please fill all required international payment fields');
        return;
      }
      newMethod = {
        id: Date.now().toString(),
        type: 'international',
        isDefault: paymentMethods.length === 0,
        verified: true,
        data: { ...intlForm },
      };
      setIntlForm({
        country: '',
        accountNumber: '',
        swiftCode: '',
        bankName: '',
      });
    } else if (newPaymentType === 'check') {
      if (!checkForm.mailingAddress) {
        toast.error('Please provide a mailing address');
        return;
      }
      newMethod = {
        id: Date.now().toString(),
        type: 'check',
        isDefault: paymentMethods.length === 0,
        verified: true,
        data: { ...checkForm },
      };
      setCheckForm({ mailingAddress: '' });
    }

    if (newMethod) {
      setPaymentMethods([...paymentMethods, newMethod]);
      setShowAddPaymentMethod(false);
      toast.success('Payment method added');
    }
  };

  const handleRemovePaymentMethod = (id: string) => {
    setPaymentMethods(paymentMethods.filter((pm) => pm.id !== id));
  };

  const handleSetDefaultPaymentMethod = (id: string) => {
    setPaymentMethods(
      paymentMethods.map((pm) => ({
        ...pm,
        isDefault: pm.id === id,
      }))
    );
  };

  const handleVerifyAccount = (id: string) => {
    // Simulate verification
    setPaymentMethods(
      paymentMethods.map((pm) =>
        pm.id === id ? { ...pm, verified: true } : pm
      )
    );
    toast.success('Account verification initiated. This may take 1-2 business days.');
  };

  const onSubmit = (data: VendorFormData) => {
    if (paymentMethods.length === 0) {
      toast.error('Please add at least one payment method');
      setActiveTab('payment');
      return;
    }

    console.log('Vendor data:', {
      ...data,
      paymentMethods,
    });

    toast.success('Vendor added successfully!');
    
    // Reset form
    reset();
    setSelectedTags([]);
    setPaymentMethods([]);
    setActiveTab('basic');
    
    onSuccess?.();
    onOpenChange(false);
  };

  const handleCancel = () => {
    reset();
    setSelectedTags([]);
    setPaymentMethods([]);
    setActiveTab('basic');
    setShowAddPaymentMethod(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Vendor</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="payment">
                Payment Methods
                {paymentMethods.length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {paymentMethods.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="settings">Additional Settings</TabsTrigger>
            </TabsList>

            {/* Tab 1: Basic Information */}
            <TabsContent value="basic" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="vendorName">
                  Vendor Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="vendorName"
                  {...register('vendorName')}
                  placeholder="John Smith"
                  className={errors.vendorName ? 'border-destructive' : ''}
                />
                {errors.vendorName && (
                  <p className="text-sm text-destructive">{errors.vendorName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name (optional)</Label>
                <Input
                  id="businessName"
                  {...register('businessName')}
                  placeholder="Smith Design Studio"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    {...register('email')}
                    placeholder="john@example.com"
                    className={errors.email ? 'border-destructive' : ''}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">
                    Phone <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="phone"
                    {...register('phone')}
                    onChange={handlePhoneChange}
                    placeholder="(555) 123-4567"
                    maxLength={14}
                    className={errors.phone ? 'border-destructive' : ''}
                  />
                  {errors.phone && (
                    <p className="text-sm text-destructive">{errors.phone.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address (optional)</Label>
                <Textarea
                  id="address"
                  {...register('address')}
                  placeholder="123 Main St, City, State ZIP"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Tags</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {predefinedTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant={selectedTags.includes(tag) ? 'default' : 'outline'}
                      className="cursor-pointer"
                      onClick={() =>
                        selectedTags.includes(tag) ? handleRemoveTag(tag) : handleAddTag(tag)
                      }
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                {selectedTags.filter((tag) => !predefinedTags.includes(tag)).length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {selectedTags
                      .filter((tag) => !predefinedTags.includes(tag))
                      .map((tag) => (
                        <Badge key={tag} variant="secondary" className="gap-1">
                          {tag}
                          <X
                            className="h-3 w-3 cursor-pointer"
                            onClick={() => handleRemoveTag(tag)}
                          />
                        </Badge>
                      ))}
                  </div>
                )}
                <div className="flex gap-2">
                  <Input
                    placeholder="Add custom tag..."
                    value={customTag}
                    onChange={(e) => setCustomTag(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddCustomTag();
                      }
                    }}
                  />
                  <Button type="button" variant="outline" onClick={handleAddCustomTag}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Tab 2: Payment Methods */}
            <TabsContent value="payment" className="space-y-4 mt-4">
              {paymentMethods.length === 0 && !showAddPaymentMethod && (
                <div className="text-center py-8 border-2 border-dashed border-border rounded-lg">
                  <p className="text-muted-foreground mb-4">
                    No payment methods added yet. Add at least one to continue.
                  </p>
                  <Button type="button" onClick={() => setShowAddPaymentMethod(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Payment Method
                  </Button>
                </div>
              )}

              {paymentMethods.length > 0 && (
                <div className="space-y-3">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className="p-4 border rounded-lg bg-card space-y-3"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          {method.type === 'ach' && <Building className="h-5 w-5" />}
                          {method.type === 'international' && <Globe className="h-5 w-5" />}
                          {method.type === 'check' && <FileText className="h-5 w-5" />}
                          <div>
                            <div className="font-medium capitalize">{method.type}</div>
                            {method.type === 'ach' && (
                              <div className="text-sm text-muted-foreground">
                                {method.data.bankName} - {method.data.accountType}
                              </div>
                            )}
                            {method.type === 'international' && (
                              <div className="text-sm text-muted-foreground">
                                {method.data.country} - {method.data.bankName}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {method.verified ? (
                            <Badge variant="secondary" className="gap-1">
                              <CheckCircle className="h-3 w-3" />
                              Verified
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="gap-1">
                              <Clock className="h-3 w-3" />
                              Pending
                            </Badge>
                          )}
                          {method.isDefault && <Badge>Default</Badge>}
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemovePaymentMethod(method.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        {!method.isDefault && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => handleSetDefaultPaymentMethod(method.id)}
                          >
                            Set as Default
                          </Button>
                        )}
                        {method.type === 'ach' && !method.verified && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => handleVerifyAccount(method.id)}
                          >
                            Verify Account
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}

                  {!showAddPaymentMethod && (
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => setShowAddPaymentMethod(true)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Another Payment Method
                    </Button>
                  )}
                </div>
              )}

              {showAddPaymentMethod && (
                <div className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Select Payment Method Type</Label>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowAddPaymentMethod(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <RadioGroup
                    value={newPaymentType}
                    onValueChange={(value: any) => setNewPaymentType(value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="ach" id="ach" />
                      <Label htmlFor="ach" className="cursor-pointer">
                        Bank Account (ACH) - Free, 2-3 days
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="international" id="international" />
                      <Label htmlFor="international" className="cursor-pointer">
                        International - 0.5% fee, 1-2 days
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="check" id="check" />
                      <Label htmlFor="check" className="cursor-pointer">
                        Check - Mailed
                      </Label>
                    </div>
                  </RadioGroup>

                  {/* ACH Form */}
                  {newPaymentType === 'ach' && (
                    <div className="space-y-3 pt-3 border-t">
                      <div className="space-y-2">
                        <Label>Account Holder Name</Label>
                        <Input
                          value={achForm.accountHolder}
                          onChange={(e) =>
                            setAchForm({ ...achForm, accountHolder: e.target.value })
                          }
                          placeholder="John Smith"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Bank Name</Label>
                        <Input
                          value={achForm.bankName}
                          onChange={(e) => setAchForm({ ...achForm, bankName: e.target.value })}
                          placeholder="Chase Bank"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Account Type</Label>
                        <Select
                          value={achForm.accountType}
                          onValueChange={(value) =>
                            setAchForm({ ...achForm, accountType: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="checking">Checking</SelectItem>
                            <SelectItem value="savings">Savings</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label>Routing Number</Label>
                          <Input
                            value={achForm.routingNumber}
                            onChange={(e) => {
                              const value = e.target.value.replace(/\D/g, '');
                              if (value.length <= 9) {
                                setAchForm({ ...achForm, routingNumber: value });
                              }
                            }}
                            placeholder="123456789"
                            maxLength={9}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Account Number</Label>
                          <Input
                            type="password"
                            value={achForm.accountNumber}
                            onChange={(e) =>
                              setAchForm({ ...achForm, accountNumber: e.target.value })
                            }
                            placeholder="••••••••"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* International Form */}
                  {newPaymentType === 'international' && (
                    <div className="space-y-3 pt-3 border-t">
                      <div className="space-y-2">
                        <Label>Country</Label>
                        <Select
                          value={intlForm.country}
                          onValueChange={(value) => setIntlForm({ ...intlForm, country: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                          <SelectContent className="max-h-[200px]">
                            {countries.map((country) => (
                              <SelectItem key={country} value={country}>
                                {country}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Bank Name</Label>
                        <Input
                          value={intlForm.bankName}
                          onChange={(e) => setIntlForm({ ...intlForm, bankName: e.target.value })}
                          placeholder="Deutsche Bank"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>IBAN / Account Number</Label>
                        <Input
                          value={intlForm.accountNumber}
                          onChange={(e) =>
                            setIntlForm({ ...intlForm, accountNumber: e.target.value })
                          }
                          placeholder="GB29NWBK60161331926819"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>SWIFT/BIC Code</Label>
                        <Input
                          value={intlForm.swiftCode}
                          onChange={(e) =>
                            setIntlForm({ ...intlForm, swiftCode: e.target.value })
                          }
                          placeholder="DEUTDEFF"
                        />
                      </div>
                      <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                        💡 International transfers incur a 0.5% fee
                      </div>
                    </div>
                  )}

                  {/* Check Form */}
                  {newPaymentType === 'check' && (
                    <div className="space-y-3 pt-3 border-t">
                      <div className="space-y-2">
                        <Label>Mailing Address</Label>
                        <Textarea
                          value={checkForm.mailingAddress}
                          onChange={(e) =>
                            setCheckForm({ ...checkForm, mailingAddress: e.target.value })
                          }
                          placeholder="123 Main St, City, State ZIP"
                          rows={3}
                        />
                      </div>
                      <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                        📬 Check will be mailed to this address
                      </div>
                    </div>
                  )}

                  <Button
                    type="button"
                    onClick={handleAddPaymentMethod}
                    className="w-full"
                  >
                    Add Payment Method
                  </Button>
                </div>
              )}
            </TabsContent>

            {/* Tab 3: Additional Settings */}
            <TabsContent value="settings" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="defaultPaymentAmount">Default Payment Amount (optional)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                    $
                  </span>
                  <Input
                    id="defaultPaymentAmount"
                    type="number"
                    {...register('defaultPaymentAmount')}
                    placeholder="0.00"
                    className="pl-7"
                    step="0.01"
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  For recurring payments with this vendor
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="paymentTerms">Payment Terms (optional)</Label>
                <Select
                  value={watch('paymentTerms')}
                  onValueChange={(value) => setValue('paymentTerms', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment terms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="net15">Net 15</SelectItem>
                    <SelectItem value="net30">Net 30</SelectItem>
                    <SelectItem value="net60">Net 60</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Vendor typically expects payment within this timeframe
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes (optional)</Label>
                <Textarea
                  id="notes"
                  {...register('notes')}
                  placeholder="Internal notes about this vendor..."
                  rows={5}
                  maxLength={1000}
                />
                {errors.notes && (
                  <p className="text-sm text-destructive">{errors.notes.message}</p>
                )}
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit">Save Vendor</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
