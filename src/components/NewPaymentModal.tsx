import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { format } from 'date-fns';
import {
  Calendar as CalendarIcon,
  Check,
  ChevronsUpDown,
  Building2,
  Zap,
  Globe,
  FileText,
  AlertCircle,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

const MOCK_VENDORS = [
  { id: '1', name: 'Web Designer Tom', lastPayment: 2400 },
  { id: '2', name: 'AWS', lastPayment: 890 },
  { id: '3', name: 'Office Supplies Co', lastPayment: 245 },
  { id: '4', name: 'Marketing Agency', lastPayment: 5000 },
  { id: '5', name: 'Software Licenses', lastPayment: 1200 },
];

const PAYMENT_METHODS = [
  { id: 'ach', name: 'ACH', fee: 0, duration: '2-3 days', icon: Building2 },
  { id: 'same-day-ach', name: 'Same-Day ACH', fee: 3, duration: 'same day', icon: Zap },
  { id: 'wire', name: 'Wire Transfer', fee: 15, duration: 'same day', icon: Zap },
  { id: 'international', name: 'International', fee: 0, feePercent: 1, duration: '1-2 days', icon: Globe },
];

const AVAILABLE_CASH = 8400;
const BUFFER_TARGET = 5000;

const formSchema = z.object({
  vendorId: z.string().min(1, 'Please select a vendor'),
  amount: z.number().min(0.01, 'Amount must be at least $0.01').max(100000, 'Amount cannot exceed $100,000'),
  paymentMethod: z.string().min(1, 'Please select a payment method'),
  scheduleType: z.enum(['now', 'later']),
  scheduledDate: z.date().optional(),
  description: z.string().optional(),
  useFlowCredit: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

interface NewPaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewPaymentModal({ open, onOpenChange }: NewPaymentModalProps) {
  const [step, setStep] = useState(1);
  const [vendorOpen, setVendorOpen] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vendorId: '',
      amount: 0,
      paymentMethod: 'ach',
      scheduleType: 'now',
      description: '',
      useFlowCredit: false,
    },
  });

  const watchAmount = form.watch('amount');
  const watchPaymentMethod = form.watch('paymentMethod');
  const watchVendorId = form.watch('vendorId');

  const selectedVendor = MOCK_VENDORS.find(v => v.id === watchVendorId);
  const selectedMethod = PAYMENT_METHODS.find(m => m.id === watchPaymentMethod);

  const calculateFee = () => {
    if (!selectedMethod) return 0;
    if (selectedMethod.feePercent) {
      return (watchAmount * selectedMethod.feePercent) / 100;
    }
    return selectedMethod.fee;
  };

  const totalCost = watchAmount + calculateFee();
  const cashAfterPayment = AVAILABLE_CASH - totalCost;
  const bufferAfterPayment = Math.max(0, cashAfterPayment - BUFFER_TARGET);
  const isInsufficientFunds = cashAfterPayment < BUFFER_TARGET;
  const shortfall = isInsufficientFunds ? BUFFER_TARGET - cashAfterPayment : 0;

  const onSubmit = async (data: FormValues) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: 'Payment scheduled successfully',
        description: `Payment of $${data.amount.toLocaleString()} to ${selectedVendor?.name} has been scheduled.`,
      });
      
      onOpenChange(false);
      form.reset();
      setStep(1);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to schedule payment. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleNext = async () => {
    const isValid = await form.trigger(['vendorId', 'amount', 'paymentMethod']);
    if (isValid) {
      setStep(2);
    }
  };

  const handleClose = () => {
    const isDirty = form.formState.isDirty;
    if (isDirty) {
      const confirm = window.confirm('You have unsaved changes. Are you sure you want to close?');
      if (!confirm) return;
    }
    onOpenChange(false);
    form.reset();
    setStep(1);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Schedule Payment</DialogTitle>
          <DialogDescription>
            {step === 1 && 'Enter payment details'}
            {step === 2 && 'Review and confirm payment'}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {step === 1 && (
              <div className="space-y-6">
                {/* Vendor Selection */}
                <FormField
                  control={form.control}
                  name="vendorId"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Vendor *</FormLabel>
                      <Popover open={vendorOpen} onOpenChange={setVendorOpen}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                'w-full justify-between',
                                !field.value && 'text-muted-foreground'
                              )}
                            >
                              {field.value
                                ? (() => {
                                    const vendor = MOCK_VENDORS.find(v => v.id === field.value);
                                    return vendor ? (
                                      <span className="flex items-center justify-between w-full">
                                        <span>{vendor.name}</span>
                                        <span className="text-muted-foreground text-sm">
                                          Last: ${vendor.lastPayment.toLocaleString()}
                                        </span>
                                      </span>
                                    ) : 'Select vendor';
                                  })()
                                : 'Select vendor'}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput placeholder="Search vendors..." />
                            <CommandList>
                              <CommandEmpty>No vendor found.</CommandEmpty>
                              <CommandGroup>
                                {MOCK_VENDORS.map((vendor) => (
                                  <CommandItem
                                    key={vendor.id}
                                    value={vendor.name}
                                    onSelect={() => {
                                      form.setValue('vendorId', vendor.id);
                                      setVendorOpen(false);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        'mr-2 h-4 w-4',
                                        vendor.id === field.value ? 'opacity-100' : 'opacity-0'
                                      )}
                                    />
                                    <div className="flex items-center justify-between w-full">
                                      <span>{vendor.name}</span>
                                      <span className="text-muted-foreground text-sm">
                                        ${vendor.lastPayment.toLocaleString()}
                                      </span>
                                    </div>
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Amount */}
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount *</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-lg">
                            $
                          </span>
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            className="pl-8 text-2xl font-semibold h-14"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                            onBlur={(e) => {
                              const value = parseFloat(e.target.value);
                              if (!isNaN(value)) {
                                field.onChange(parseFloat(value.toFixed(2)));
                              }
                            }}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                      {watchAmount > AVAILABLE_CASH && (
                        <p className="text-sm text-destructive flex items-center gap-2 mt-2">
                          <AlertCircle className="h-4 w-4" />
                          Amount exceeds available cash (${AVAILABLE_CASH.toLocaleString()})
                        </p>
                      )}
                    </FormItem>
                  )}
                />

                {/* Cash Flow Check */}
                {watchAmount > 0 && (
                  <div className={cn(
                    'p-4 rounded-lg border-2',
                    isInsufficientFunds ? 'bg-yellow-500/10 border-yellow-500/20' : 'bg-success/10 border-success/20'
                  )}>
                    <div className="flex items-start gap-3">
                      {isInsufficientFunds ? (
                        <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                      ) : (
                        <CheckCircle className="h-5 w-5 text-success mt-0.5" />
                      )}
                      <div className="flex-1 space-y-2">
                        <p className={cn(
                          'font-semibold',
                          isInsufficientFunds ? 'text-yellow-700 dark:text-yellow-400' : 'text-success'
                        )}>
                          {isInsufficientFunds ? 'Insufficient funds' : 'Funds available'}
                        </p>
                        <div className="text-sm space-y-1">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Current available:</span>
                            <span className="font-medium">${AVAILABLE_CASH.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">After this payment:</span>
                            <span className="font-medium">${cashAfterPayment.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Buffer status:</span>
                            <span className={cn(
                              'font-medium flex items-center gap-1',
                              bufferAfterPayment >= 0 ? 'text-success' : 'text-destructive'
                            )}>
                              {bufferAfterPayment >= 0 ? (
                                <>
                                  <Check className="h-3 w-3" />
                                  Maintained at ${BUFFER_TARGET.toLocaleString()}
                                </>
                              ) : (
                                <>
                                  <AlertCircle className="h-3 w-3" />
                                  Below target by ${Math.abs(bufferAfterPayment).toLocaleString()}
                                </>
                              )}
                            </span>
                          </div>
                        </div>

                        {isInsufficientFunds && (
                          <div className="mt-4 p-3 bg-background rounded-md border">
                            <FormField
                              control={form.control}
                              name="useFlowCredit"
                              render={({ field }) => (
                                <FormItem className="flex items-start space-x-3 space-y-0">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                    />
                                  </FormControl>
                                  <div className="space-y-1 leading-none">
                                    <FormLabel className="font-medium">
                                      Use FlowCredit
                                    </FormLabel>
                                    <p className="text-sm text-muted-foreground">
                                      Borrow ${shortfall.toLocaleString()} for 7 days at ${(shortfall * 0.0025).toFixed(2)} fee
                                    </p>
                                  </div>
                                </FormItem>
                              )}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Payment Method */}
                <FormField
                  control={form.control}
                  name="paymentMethod"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Payment Method *</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="grid grid-cols-2 gap-4"
                        >
                          {PAYMENT_METHODS.map((method) => {
                            const Icon = method.icon;
                            return (
                              <div key={method.id}>
                                <RadioGroupItem
                                  value={method.id}
                                  id={method.id}
                                  className="peer sr-only"
                                />
                                <label
                                  htmlFor={method.id}
                                  className="flex flex-col items-start justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all"
                                >
                                  <div className="flex items-center gap-2 mb-2">
                                    <Icon className="h-5 w-5" />
                                    <span className="font-semibold">{method.name}</span>
                                  </div>
                                  <div className="text-sm space-y-1">
                                    <div className="text-muted-foreground">
                                      {method.feePercent ? `${method.feePercent}% fee` : method.fee === 0 ? 'Free' : `$${method.fee} fee`}
                                    </div>
                                    <div className="text-muted-foreground">{method.duration}</div>
                                  </div>
                                </label>
                              </div>
                            );
                          })}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Schedule */}
                <FormField
                  control={form.control}
                  name="scheduleType"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Schedule</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="now" id="now" />
                            <label htmlFor="now" className="cursor-pointer">Pay now</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="later" id="later" />
                            <label htmlFor="later" className="cursor-pointer">Schedule for later</label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />

                {form.watch('scheduleType') === 'later' && (
                  <FormField
                    control={form.control}
                    name="scheduledDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Scheduled Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  'w-full pl-3 text-left font-normal',
                                  !field.value && 'text-muted-foreground'
                                )}
                              >
                                {field.value ? (
                                  format(field.value, 'PPP')
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date()}
                              initialFocus
                              className="pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                        {field.value && (
                          <p className="text-sm text-muted-foreground">
                            Payment will execute on {format(field.value, 'PPP')}
                          </p>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {/* Description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Invoice #1234, Web design services..."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="bg-muted/50 rounded-lg p-6 space-y-4">
                  <h3 className="font-semibold text-lg">Payment Summary</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Vendor</span>
                      <span className="font-medium">{selectedVendor?.name}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Amount</span>
                      <span className="font-medium text-lg">${watchAmount.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Payment Method</span>
                      <Badge variant="outline">{selectedMethod?.name}</Badge>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Fee</span>
                      <span className="font-medium">${calculateFee().toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between pt-3 border-t">
                      <span className="font-semibold">Total Cost</span>
                      <span className="font-semibold text-lg">${totalCost.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Scheduled</span>
                      <span className="font-medium">
                        {form.watch('scheduleType') === 'now' 
                          ? 'Immediately' 
                          : form.watch('scheduledDate') 
                            ? format(form.watch('scheduledDate')!, 'PPP')
                            : 'Not set'}
                      </span>
                    </div>
                    
                    <div className="flex items-start justify-between pt-3 border-t">
                      <span className="text-muted-foreground">Payment will arrive</span>
                      <span className="font-medium text-right">
                        {selectedMethod?.duration}
                      </span>
                    </div>

                    {form.watch('description') && (
                      <div className="pt-3 border-t">
                        <div className="flex items-start gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground mt-1" />
                          <div>
                            <p className="text-sm font-medium">Description</p>
                            <p className="text-sm text-muted-foreground">{form.watch('description')}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {form.watch('useFlowCredit') && (
                  <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-semibold text-primary">FlowCredit Enabled</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Borrowing ${shortfall.toLocaleString()} for 7 days at ${(shortfall * 0.0025).toFixed(2)} fee
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            <DialogFooter className="gap-2">
              {step === 1 && (
                <>
                  <Button type="button" variant="outline" onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button type="button" onClick={handleNext}>
                    Continue
                  </Button>
                </>
              )}
              {step === 2 && (
                <>
                  <Button type="button" variant="outline" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? 'Scheduling...' : 'Schedule Payment'}
                  </Button>
                </>
              )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
