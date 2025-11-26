import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import {
  User,
  Building2,
  Bell,
  Lock,
  CreditCard,
  Shield,
  Link2,
  Users,
  Settings as SettingsIcon,
  ShieldCheck,
  Upload,
  Download,
  Trash2,
  Eye,
  EyeOff,
  Copy,
  RefreshCw,
  Plus,
  X,
} from "lucide-react";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [showPassword, setShowPassword] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState({
    cashFlow: true,
    payments: true,
    vendors: true,
    system: true,
    reports: true,
  });
  const [pushEnabled, setPushEnabled] = useState(false);
  const [smsEnabled, setSmsEnabled] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [bufferAutoAdjust, setBufferAutoAdjust] = useState(false);
  const [bufferAutoCredit, setBufferAutoCredit] = useState(true);

  const handleSave = (section: string) => {
    toast({
      title: "Settings saved",
      description: `Your ${section} settings have been updated successfully.`,
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <div className="text-sm text-muted-foreground mb-2">Dashboard &gt; Settings</div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your account and preferences</p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-5 lg:grid-cols-10 gap-2 h-auto bg-muted/50 p-2">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden lg:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="company" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              <span className="hidden lg:inline">Company</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span className="hidden lg:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              <span className="hidden lg:inline">Security</span>
            </TabsTrigger>
            <TabsTrigger value="billing" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              <span className="hidden lg:inline">Billing</span>
            </TabsTrigger>
            <TabsTrigger value="buffer" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span className="hidden lg:inline">Buffer</span>
            </TabsTrigger>
            <TabsTrigger value="integrations" className="flex items-center gap-2">
              <Link2 className="h-4 w-4" />
              <span className="hidden lg:inline">Integrations</span>
            </TabsTrigger>
            <TabsTrigger value="team" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden lg:inline">Team</span>
            </TabsTrigger>
            <TabsTrigger value="api" className="flex items-center gap-2">
              <SettingsIcon className="h-4 w-4" />
              <span className="hidden lg:inline">API</span>
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" />
              <span className="hidden lg:inline">Privacy</span>
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: PROFILE */}
          <TabsContent value="profile" className="space-y-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Photo */}
                <div className="flex items-center gap-6">
                  <div className="h-20 w-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">
                    JD
                  </div>
                  <div>
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Change Photo
                    </Button>
                    <p className="text-xs text-muted-foreground mt-1">JPG or PNG, max 5MB</p>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input id="fullName" defaultValue="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input id="email" type="email" defaultValue="john@company.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="(555) 123-4567" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="jobTitle">Job Title</Label>
                    <Input id="jobTitle" placeholder="e.g., CEO, CFO, Founder" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Time Zone *</Label>
                    <Select defaultValue="pst">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pst">Pacific Time (PT)</SelectItem>
                        <SelectItem value="mst">Mountain Time (MT)</SelectItem>
                        <SelectItem value="cst">Central Time (CT)</SelectItem>
                        <SelectItem value="est">Eastern Time (ET)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select defaultValue="en-us">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en-us">English (US)</SelectItem>
                        <SelectItem value="en-uk">English (UK)</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline">Cancel</Button>
                  <Button onClick={() => handleSave("profile")}>Save Changes</Button>
                </div>
              </CardContent>
            </Card>

            {/* Display Preferences */}
            <Card>
              <CardHeader>
                <CardTitle>Display Preferences</CardTitle>
                <CardDescription>Customize how information is displayed</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Currency Display</Label>
                    <Select defaultValue="usd">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="usd">USD ($)</SelectItem>
                        <SelectItem value="eur">EUR (€)</SelectItem>
                        <SelectItem value="gbp">GBP (£)</SelectItem>
                        <SelectItem value="cad">CAD ($)</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      This doesn't change transaction currency, only display
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>Dashboard Density</Label>
                    <RadioGroup defaultValue="comfortable">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="compact" id="compact" />
                        <Label htmlFor="compact" className="font-normal">Compact</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="comfortable" id="comfortable" />
                        <Label htmlFor="comfortable" className="font-normal">Comfortable</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="spacious" id="spacious" />
                        <Label htmlFor="spacious" className="font-normal">Spacious</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Date Format</Label>
                  <RadioGroup defaultValue="us">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="us" id="us" />
                      <Label htmlFor="us" className="font-normal">MM/DD/YYYY (US format)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="intl" id="intl" />
                      <Label htmlFor="intl" className="font-normal">DD/MM/YYYY (International)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="iso" id="iso" />
                      <Label htmlFor="iso" className="font-normal">YYYY-MM-DD (ISO)</Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>

            {/* Communication Preferences */}
            <Card>
              <CardHeader>
                <CardTitle>Communication Preferences</CardTitle>
                <CardDescription>Manage email updates and newsletters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="product-updates">Product updates and tips</Label>
                      <p className="text-sm text-muted-foreground">Get the latest features and tips</p>
                    </div>
                    <Switch id="product-updates" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="newsletter">Monthly newsletter</Label>
                      <p className="text-sm text-muted-foreground">Industry insights and best practices</p>
                    </div>
                    <Switch id="newsletter" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="features">Feature announcements</Label>
                      <p className="text-sm text-muted-foreground">Be first to know about new features</p>
                    </div>
                    <Switch id="features" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="marketing">Promotional offers</Label>
                      <p className="text-sm text-muted-foreground">Special offers and promotions</p>
                    </div>
                    <Switch id="marketing" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Transactional emails (receipts, alerts) cannot be disabled
                </p>
                <Button onClick={() => handleSave("communication")}>Save Preferences</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 2: COMPANY */}
          <TabsContent value="company" className="space-y-6">
            {/* Business Information */}
            <Card>
              <CardHeader>
                <CardTitle>Business Information</CardTitle>
                <CardDescription>Your company details and tax information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name *</Label>
                    <Input id="companyName" defaultValue="Acme Corporation" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="legalName">Legal Business Name</Label>
                    <Input id="legalName" placeholder="If different from company name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry *</Label>
                    <Select defaultValue="technology">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="professional">Professional Services</SelectItem>
                        <SelectItem value="retail">Retail</SelectItem>
                        <SelectItem value="ecommerce">E-commerce</SelectItem>
                        <SelectItem value="construction">Construction</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="businessType">Business Type *</Label>
                    <Select defaultValue="llc">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="llc">LLC</SelectItem>
                        <SelectItem value="corporation">Corporation</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="sole">Sole Proprietorship</SelectItem>
                        <SelectItem value="nonprofit">Non-profit</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="taxId">Tax ID / EIN</Label>
                    <Input id="taxId" placeholder="XX-XXXXXXX" />
                    <p className="text-xs text-muted-foreground">For tax reporting and compliance</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="companySize">Company Size</Label>
                    <Select defaultValue="2-10">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2-10">2-10</SelectItem>
                        <SelectItem value="11-50">11-50</SelectItem>
                        <SelectItem value="51-200">51-200</SelectItem>
                        <SelectItem value="201+">201+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">Cancel</Button>
                  <Button onClick={() => handleSave("company")}>Save Changes</Button>
                </div>
              </CardContent>
            </Card>

            {/* Business Address */}
            <Card>
              <CardHeader>
                <CardTitle>Business Address</CardTitle>
                <CardDescription>Your primary business location</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="address1">Street Address</Label>
                    <Input id="address1" placeholder="123 Main Street" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address2">Address Line 2</Label>
                    <Input id="address2" placeholder="Suite, Floor, etc." />
                  </div>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State/Province</Label>
                      <Input id="state" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zip">ZIP/Postal Code</Label>
                      <Input id="zip" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Select defaultValue="us">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="ca">Canada</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="au">Australia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="billing" defaultChecked />
                    <Label htmlFor="billing" className="font-normal">
                      This is also my billing address
                    </Label>
                  </div>
                </div>
                <Button onClick={() => handleSave("address")}>Save Address</Button>
              </CardContent>
            </Card>

            {/* Business Details */}
            <Card>
              <CardHeader>
                <CardTitle>Business Details</CardTitle>
                <CardDescription>Additional information about your business</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" type="url" placeholder="https://company.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Tell us what your company does"
                    rows={4}
                  />
                  <p className="text-xs text-muted-foreground text-right">0/500</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fiscalYear">Fiscal Year Start</Label>
                  <Select defaultValue="january">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="january">January</SelectItem>
                      <SelectItem value="february">February</SelectItem>
                      <SelectItem value="march">March</SelectItem>
                      <SelectItem value="april">April</SelectItem>
                      <SelectItem value="may">May</SelectItem>
                      <SelectItem value="june">June</SelectItem>
                      <SelectItem value="july">July</SelectItem>
                      <SelectItem value="august">August</SelectItem>
                      <SelectItem value="september">September</SelectItem>
                      <SelectItem value="october">October</SelectItem>
                      <SelectItem value="november">November</SelectItem>
                      <SelectItem value="december">December</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={() => handleSave("details")}>Save Details</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 3: NOTIFICATIONS */}
          <TabsContent value="notifications" className="space-y-6">
            {/* Email Notifications */}
            <Card>
              <CardHeader>
                <CardTitle>Email Notifications</CardTitle>
                <CardDescription>Configure when you receive email alerts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label>Cash Flow Alerts</Label>
                      <Switch
                        checked={emailNotifications.cashFlow}
                        onCheckedChange={(checked) =>
                          setEmailNotifications({ ...emailNotifications, cashFlow: checked })
                        }
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Critical: Cash gap predicted, Buffer warnings, Early payment discounts
                    </p>
                  </div>

                  <Separator />

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label>Payment Notifications</Label>
                      <Switch
                        checked={emailNotifications.payments}
                        onCheckedChange={(checked) =>
                          setEmailNotifications({ ...emailNotifications, payments: checked })
                        }
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Payment scheduled, completed, failed, or due soon
                    </p>
                  </div>

                  <Separator />

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label>Vendor Updates</Label>
                      <Switch
                        checked={emailNotifications.vendors}
                        onCheckedChange={(checked) =>
                          setEmailNotifications({ ...emailNotifications, vendors: checked })
                        }
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      New vendor added, payment method changed, relationship milestones
                    </p>
                  </div>

                  <Separator />

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label>System Notifications</Label>
                      <Switch
                        checked={emailNotifications.system}
                        onCheckedChange={(checked) =>
                          setEmailNotifications({ ...emailNotifications, system: checked })
                        }
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Integration sync status, bank connection issues, security alerts
                    </p>
                  </div>

                  <Separator />

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label>Reports & Insights</Label>
                      <Switch
                        checked={emailNotifications.reports}
                        onCheckedChange={(checked) =>
                          setEmailNotifications({ ...emailNotifications, reports: checked })
                        }
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Weekly summary, monthly financial report, AI-generated insights
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Push Notifications */}
            <Card>
              <CardHeader>
                <CardTitle>Push Notifications</CardTitle>
                <CardDescription>Receive browser notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Works on desktop and mobile browsers
                    </p>
                  </div>
                  <Switch checked={pushEnabled} onCheckedChange={setPushEnabled} />
                </div>
                {pushEnabled && (
                  <div className="space-y-2 pl-4 border-l-2 border-border">
                    <p className="text-sm text-muted-foreground">
                      Push notifications enabled for critical alerts
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* SMS Notifications */}
            <Card>
              <CardHeader>
                <CardTitle>SMS Notifications</CardTitle>
                <CardDescription>Receive text message alerts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable SMS Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Requires phone number in Profile
                    </p>
                  </div>
                  <Switch checked={smsEnabled} onCheckedChange={setSmsEnabled} />
                </div>
                {smsEnabled && (
                  <div className="space-y-2 pl-4 border-l-2 border-border">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="sms-critical" defaultChecked />
                      <Label htmlFor="sms-critical" className="font-normal">
                        Critical cash flow alerts
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="sms-failures" defaultChecked />
                      <Label htmlFor="sms-failures" className="font-normal">
                        Payment failures
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="sms-security" defaultChecked />
                      <Label htmlFor="sms-security" className="font-normal">
                        Security alerts
                      </Label>
                    </div>
                    <p className="text-xs text-muted-foreground pt-2">
                      Standard message and data rates may apply. Text STOP to unsubscribe.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 4: SECURITY */}
          <TabsContent value="security" className="space-y-6">
            {/* Password */}
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>Change your account password</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showPassword ? "text" : "password"}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" />
                  <div className="text-sm space-y-1">
                    <p className="text-muted-foreground">Password requirements:</p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>At least 8 characters</li>
                      <li>Contains number</li>
                      <li>Contains uppercase letter</li>
                      <li>Contains special character</li>
                    </ul>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="logout" />
                  <Label htmlFor="logout" className="font-normal">
                    Logout all other sessions after password change
                  </Label>
                </div>
                <Button onClick={() => handleSave("password")}>Change Password</Button>
              </CardContent>
            </Card>

            {/* Two-Factor Authentication */}
            <Card>
              <CardHeader>
                <CardTitle>Two-Factor Authentication (2FA)</CardTitle>
                <CardDescription>Add an extra layer of security to your account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>2FA Status</Label>
                    <p className="text-sm text-muted-foreground">
                      {twoFactorEnabled ? "2FA is enabled" : "2FA is not enabled"}
                    </p>
                  </div>
                  {twoFactorEnabled ? (
                    <Badge variant="default" className="bg-green-500">Enabled</Badge>
                  ) : (
                    <Badge variant="destructive">Not enabled</Badge>
                  )}
                </div>
                {!twoFactorEnabled && (
                  <div className="space-y-4">
                    <Label>Choose 2FA Method</Label>
                    <RadioGroup defaultValue="app">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="app" id="2fa-app" />
                        <Label htmlFor="2fa-app" className="font-normal">
                          Authenticator App (recommended)
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="sms" id="2fa-sms" />
                        <Label htmlFor="2fa-sms" className="font-normal">
                          SMS Codes
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="email" id="2fa-email" />
                        <Label htmlFor="2fa-email" className="font-normal">
                          Email Codes
                        </Label>
                      </div>
                    </RadioGroup>
                    <Button onClick={() => setTwoFactorEnabled(true)}>
                      Enable Two-Factor Authentication
                    </Button>
                  </div>
                )}
                {twoFactorEnabled && (
                  <div className="space-y-2">
                    <Button variant="outline" onClick={() => setTwoFactorEnabled(false)}>
                      Disable 2FA
                    </Button>
                    <Button variant="outline">Generate New Backup Codes</Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Active Sessions */}
            <Card>
              <CardHeader>
                <CardTitle>Active Sessions</CardTitle>
                <CardDescription>Manage your logged-in devices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                        💻
                      </div>
                      <div>
                        <p className="font-medium">Chrome on Mac (Current)</p>
                        <p className="text-sm text-muted-foreground">San Francisco, CA • Active now</p>
                      </div>
                    </div>
                    <Badge>Current</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                        📱
                      </div>
                      <div>
                        <p className="font-medium">iPhone 15</p>
                        <p className="text-sm text-muted-foreground">San Francisco, CA • 2 hours ago</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Revoke</Button>
                  </div>
                  <Button variant="outline" className="w-full">Revoke All Other Sessions</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 5: BILLING */}
          <TabsContent value="billing" className="space-y-6">
            {/* Current Plan */}
            <Card>
              <CardHeader>
                <CardTitle>Current Plan</CardTitle>
                <CardDescription>Your subscription details and features</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-2xl font-bold">Professional</h3>
                    <p className="text-3xl font-bold mt-2">$99<span className="text-lg font-normal text-muted-foreground">/month</span></p>
                    <p className="text-sm text-muted-foreground mt-2">Next billing date: December 1, 2025</p>
                  </div>
                  <Button variant="outline">Change Plan</Button>
                </div>
                <Separator />
                <div className="space-y-2">
                  <h4 className="font-semibold">Plan Features</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-green-500/10 text-green-700 border-green-200">✓</Badge>
                      Unlimited vendors
                    </li>
                    <li className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-green-500/10 text-green-700 border-green-200">✓</Badge>
                      Unlimited payments
                    </li>
                    <li className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-green-500/10 text-green-700 border-green-200">✓</Badge>
                      Advanced cash flow forecasting
                    </li>
                    <li className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-green-500/10 text-green-700 border-green-200">✓</Badge>
                      FlowCredit up to $30K
                    </li>
                    <li className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-green-500/10 text-green-700 border-green-200">✓</Badge>
                      API access
                    </li>
                    <li className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-green-500/10 text-green-700 border-green-200">✓</Badge>
                      Priority support
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Manage your saved payment methods</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                      💳
                    </div>
                    <div>
                      <p className="font-medium">Visa ending in 1234</p>
                      <p className="text-sm text-muted-foreground">Expires 12/2027</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge>Primary</Badge>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Payment Method
                </Button>
              </CardContent>
            </Card>

            {/* Billing History */}
            <Card>
              <CardHeader>
                <CardTitle>Billing History</CardTitle>
                <CardDescription>View and download past invoices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { id: "INV-2025-011", date: "Nov 1, 2025", amount: "$99.00" },
                    { id: "INV-2025-010", date: "Oct 1, 2025", amount: "$99.00" },
                    { id: "INV-2025-009", date: "Sep 1, 2025", amount: "$99.00" },
                  ].map((invoice) => (
                    <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{invoice.id}</p>
                        <p className="text-sm text-muted-foreground">{invoice.date}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="font-semibold">{invoice.amount}</p>
                        <Badge variant="outline" className="bg-green-500/10 text-green-700 border-green-200">Paid</Badge>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 6: BUFFER SETTINGS */}
          <TabsContent value="buffer" className="space-y-6">
            {/* Buffer Configuration */}
            <Card>
              <CardHeader>
                <CardTitle>Buffer Configuration</CardTitle>
                <CardDescription>Set your cash buffer target and strategy</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="bufferAmount">Buffer Target Amount</Label>
                    <Input id="bufferAmount" type="number" defaultValue="5000" />
                    <p className="text-sm text-muted-foreground">
                      Current balance: $32,400 • Buffer: 15% of balance
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>Buffer Strategy</Label>
                    <RadioGroup defaultValue="moderate">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="conservative" id="conservative" />
                        <Label htmlFor="conservative" className="font-normal">
                          Conservative (25-30% of balance)
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="moderate" id="moderate" />
                        <Label htmlFor="moderate" className="font-normal">
                          Moderate (15-20% of balance)
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="aggressive" id="aggressive" />
                        <Label htmlFor="aggressive" className="font-normal">
                          Aggressive (5-10% of balance)
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Auto-Adjustment</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically adjust buffer based on spending patterns
                      </p>
                    </div>
                    <Switch
                      checked={bufferAutoAdjust}
                      onCheckedChange={setBufferAutoAdjust}
                    />
                  </div>
                </div>
                <Button onClick={() => handleSave("buffer")}>Update Buffer Settings</Button>
              </CardContent>
            </Card>

            {/* Buffer Alerts */}
            <Card>
              <CardHeader>
                <CardTitle>Buffer Alerts</CardTitle>
                <CardDescription>Configure buffer warning notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="warningThreshold">Warning Threshold</Label>
                    <Input
                      id="warningThreshold"
                      type="number"
                      defaultValue="1000"
                      placeholder="Alert when within $X of buffer"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="advanceNotice">Advance Notice</Label>
                    <Select defaultValue="3">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 day before</SelectItem>
                        <SelectItem value="3">3 days before</SelectItem>
                        <SelectItem value="5">5 days before</SelectItem>
                        <SelectItem value="7">7 days before</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  <div>
                    <Label className="mb-2 block">Alert Channels</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="buffer-email" defaultChecked />
                        <Label htmlFor="buffer-email" className="font-normal">Email</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="buffer-push" defaultChecked />
                        <Label htmlFor="buffer-push" className="font-normal">Push notification</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="buffer-sms" />
                        <Label htmlFor="buffer-sms" className="font-normal">SMS</Label>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Auto-use FlowCredit</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically activate FlowCredit if buffer is breached
                      </p>
                    </div>
                    <Switch
                      checked={bufferAutoCredit}
                      onCheckedChange={setBufferAutoCredit}
                    />
                  </div>
                </div>
                <Button onClick={() => handleSave("buffer-alerts")}>Save Alert Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 7: INTEGRATIONS */}
          <TabsContent value="integrations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Integrations</CardTitle>
                <CardDescription>Connected integrations: 3 • Available: 12</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  {[
                    { name: "Stripe", status: "Connected", sync: "2 min ago" },
                    { name: "QuickBooks", status: "Connected", sync: "1 hour ago" },
                    { name: "Plaid", status: "Connected", sync: "2 accounts" },
                  ].map((integration) => (
                    <div key={integration.name} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                          🔗
                        </div>
                        <div>
                          <p className="font-medium">{integration.name}</p>
                          <p className="text-sm text-muted-foreground">Last sync: {integration.sync}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-green-500/10 text-green-700 border-green-200">
                          {integration.status}
                        </Badge>
                        <Button variant="outline" size="sm">Manage</Button>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full">View All Integrations</Button>
              </CardContent>
            </Card>

            {/* Sync Preferences */}
            <Card>
              <CardHeader>
                <CardTitle>Sync Preferences</CardTitle>
                <CardDescription>Control how integrations sync data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Default Sync Frequency</Label>
                  <Select defaultValue="realtime">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="realtime">Real-time</SelectItem>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="manual">Manual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <Label>Sync on login</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Background sync</Label>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 8: TEAM */}
          <TabsContent value="team" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Team Members</CardTitle>
                <CardDescription>Manage who has access to your FlowPay account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  {[
                    { name: "John Doe (You)", email: "john@company.com", role: "Owner", status: "Active" },
                    { name: "Jane Smith", email: "jane@company.com", role: "Admin", status: "Active" },
                    { name: "Bob Wilson", email: "bob@company.com", role: "Member", status: "Invited" },
                  ].map((member) => (
                    <div key={member.email} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                          {member.name.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-muted-foreground">{member.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{member.role}</Badge>
                        <Badge variant={member.status === "Active" ? "default" : "secondary"}>
                          {member.status}
                        </Badge>
                        {member.role !== "Owner" && (
                          <>
                            <Button variant="outline" size="sm">Edit</Button>
                            <Button variant="outline" size="sm">
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Invite Team Member
                </Button>
              </CardContent>
            </Card>

            {/* Role Permissions */}
            <Card>
              <CardHeader>
                <CardTitle>Role Permissions</CardTitle>
                <CardDescription>What each role can do</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Permission</th>
                        <th className="text-center p-2">Owner</th>
                        <th className="text-center p-2">Admin</th>
                        <th className="text-center p-2">Member</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { name: "View dashboard", owner: true, admin: true, member: true },
                        { name: "Create payments", owner: true, admin: true, member: true },
                        { name: "Approve payments", owner: true, admin: true, member: false },
                        { name: "Manage vendors", owner: true, admin: true, member: true },
                        { name: "View reports", owner: true, admin: true, member: true },
                        { name: "Manage integrations", owner: true, admin: true, member: false },
                        { name: "Access billing", owner: true, admin: false, member: false },
                      ].map((permission) => (
                        <tr key={permission.name} className="border-b">
                          <td className="p-2">{permission.name}</td>
                          <td className="text-center p-2">{permission.owner ? "✓" : "✗"}</td>
                          <td className="text-center p-2">{permission.admin ? "✓" : "✗"}</td>
                          <td className="text-center p-2">{permission.member ? "✓" : "✗"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 9: API & WEBHOOKS */}
          <TabsContent value="api" className="space-y-6">
            {/* API Keys */}
            <Card>
              <CardHeader>
                <CardTitle>API Keys</CardTitle>
                <CardDescription>Manage your API access keys</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  {[
                    { name: "Production API Key", key: "pk_live_••••••••••••", created: "Nov 1, 2025", lastUsed: "2 hours ago" },
                    { name: "Test API Key", key: "pk_test_••••••••••••", created: "Nov 1, 2025", lastUsed: "Never" },
                  ].map((apiKey) => (
                    <div key={apiKey.key} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{apiKey.name}</p>
                        <p className="text-sm text-muted-foreground font-mono">{apiKey.key}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Created: {apiKey.created} • Last used: {apiKey.lastUsed}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Generate API Key
                </Button>
              </CardContent>
            </Card>

            {/* API Documentation */}
            <Card>
              <CardHeader>
                <CardTitle>API Documentation</CardTitle>
                <CardDescription>Resources to help you integrate</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  "API Reference",
                  "Quick Start Guide",
                  "Code Examples",
                  "Authentication Guide",
                  "Rate Limits",
                  "API Support",
                ].map((doc) => (
                  <Button key={doc} variant="outline" className="w-full justify-start">
                    📚 {doc}
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* API Usage */}
            <Card>
              <CardHeader>
                <CardTitle>API Usage</CardTitle>
                <CardDescription>Monitor your API consumption</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>API Calls This Month</span>
                    <span className="font-medium">1,247 / 10,000</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: "12.47%" }} />
                  </div>
                  <p className="text-xs text-muted-foreground">Resets: Dec 1, 2025</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 10: PRIVACY */}
          <TabsContent value="privacy" className="space-y-6">
            {/* Data & Privacy */}
            <Card>
              <CardHeader>
                <CardTitle>Data & Privacy</CardTitle>
                <CardDescription>Manage your data and privacy settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-4">Your Data</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Total data stored</p>
                      <p className="text-2xl font-bold">245 MB</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Transactions</p>
                      <p className="text-2xl font-bold">487</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Vendors</p>
                      <p className="text-2xl font-bold">12</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Linked accounts</p>
                      <p className="text-2xl font-bold">2</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Export Your Data</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Download all your data in JSON or CSV format
                    </p>
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Request Data Export
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">
                      We'll email you a download link within 24 hours
                    </p>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-semibold mb-2">Delete Your Data</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Permanently delete all your data from FlowPay
                    </p>
                    <Button variant="destructive">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Request Data Deletion
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">
                      ⚠ This cannot be undone
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Privacy Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
                <CardDescription>Control how your data is used</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Allow anonymized data usage</Label>
                    <p className="text-sm text-muted-foreground">
                      Help improve FlowPay with anonymized usage data
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Share usage analytics</Label>
                    <p className="text-sm text-muted-foreground">
                      Share anonymous analytics to improve features
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <p className="text-xs text-muted-foreground">
                  We never sell your personal or financial data
                </p>
              </CardContent>
            </Card>

            {/* Legal */}
            <Card>
              <CardHeader>
                <CardTitle>Legal</CardTitle>
                <CardDescription>Review our policies and agreements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  "Privacy Policy",
                  "Terms of Service",
                  "Cookie Policy",
                  "Data Processing Agreement",
                  "GDPR Information",
                  "CCPA Rights",
                ].map((doc) => (
                  <Button key={doc} variant="outline" className="w-full justify-start">
                    📄 {doc}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
