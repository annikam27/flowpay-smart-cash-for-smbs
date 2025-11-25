import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Search, CreditCard, Building2, Users, Landmark, Globe, CheckCircle2, Clock, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type IntegrationStatus = "connected" | "available";
type IntegrationCategory = "Payments" | "Accounting" | "Payroll" | "Banking";

interface Integration {
  id: string;
  name: string;
  category: IntegrationCategory;
  status: IntegrationStatus;
  description: string;
  features: string[];
  lastSynced?: string;
  accountsConnected?: number;
  icon: typeof CreditCard;
  color: string;
}

const mockIntegrations: Integration[] = [
  {
    id: "stripe",
    name: "Stripe",
    category: "Payments",
    status: "connected",
    description: "Automatically track incoming payments",
    features: ["Real-time payment sync", "Webhook notifications", "Payout tracking"],
    lastSynced: "2 minutes ago",
    icon: CreditCard,
    color: "text-purple-600",
  },
  {
    id: "quickbooks",
    name: "QuickBooks",
    category: "Accounting",
    status: "connected",
    description: "Sync payments and vendors automatically",
    features: ["Two-way sync", "Automatic reconciliation", "Invoice matching"],
    lastSynced: "1 hour ago",
    icon: Building2,
    color: "text-green-600",
  },
  {
    id: "plaid",
    name: "Plaid",
    category: "Banking",
    status: "connected",
    description: "Securely connect your bank accounts",
    features: ["Real-time balance", "Transaction data", "Multi-account support"],
    lastSynced: "5 minutes ago",
    accountsConnected: 2,
    icon: Landmark,
    color: "text-blue-600",
  },
  {
    id: "gusto",
    name: "Gusto",
    category: "Payroll",
    status: "available",
    description: "Automate payroll funding",
    features: ["Auto-fund payroll", "Employee sync", "Tax compliance"],
    icon: Users,
    color: "text-pink-600",
  },
  {
    id: "wise",
    name: "Wise",
    category: "Payments",
    status: "available",
    description: "Send international payments",
    features: ["50+ countries", "Real exchange rates", "Fast transfers"],
    icon: Globe,
    color: "text-green-600",
  },
  {
    id: "xero",
    name: "Xero",
    category: "Accounting",
    status: "available",
    description: "Cloud accounting software",
    features: ["Invoice management", "Expense tracking", "Financial reporting"],
    icon: Building2,
    color: "text-blue-500",
  },
  {
    id: "netsuite",
    name: "NetSuite",
    category: "Accounting",
    status: "available",
    description: "Enterprise resource planning",
    features: ["Financial management", "Revenue recognition", "Multi-currency"],
    icon: Building2,
    color: "text-orange-600",
  },
  {
    id: "sage",
    name: "Sage",
    category: "Accounting",
    status: "available",
    description: "Business management software",
    features: ["Accounting automation", "Cash flow management", "Tax compliance"],
    icon: Building2,
    color: "text-teal-600",
  },
  {
    id: "square",
    name: "Square",
    category: "Payments",
    status: "available",
    description: "Point of sale and payments",
    features: ["POS integration", "Payment processing", "Sales analytics"],
    icon: CreditCard,
    color: "text-gray-800",
  },
];

type FilterTab = "All" | "Connected" | "Available" | "Accounting" | "Payroll" | "Banking";

type ConnectionStep = "auth" | "loading" | "config" | "success" | null;

const Integrations = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterTab>("All");
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [connectionStep, setConnectionStep] = useState<ConnectionStep>(null);
  const [syncProgress, setSyncProgress] = useState(0);
  const [manageModalOpen, setManageModalOpen] = useState(false);
  const { toast } = useToast();

  const filteredIntegrations = mockIntegrations.filter((integration) => {
    const matchesSearch = integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      integration.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeFilter === "All") return matchesSearch;
    if (activeFilter === "Connected") return matchesSearch && integration.status === "connected";
    if (activeFilter === "Available") return matchesSearch && integration.status === "available";
    return matchesSearch && integration.category === activeFilter;
  });

  const handleConnect = (integration: Integration) => {
    setSelectedIntegration(integration);
    setConnectionStep("auth");
  };

  const handleManage = (integration: Integration) => {
    setSelectedIntegration(integration);
    setManageModalOpen(true);
  };

  const handleAuthorize = () => {
    setConnectionStep("loading");
    setTimeout(() => {
      setConnectionStep("config");
    }, 2000);
  };

  const handleStartSync = () => {
    setConnectionStep("success");
    setSyncProgress(0);
    const interval = setInterval(() => {
      setSyncProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleDisconnect = () => {
    toast({
      title: "Integration Disconnected",
      description: `${selectedIntegration?.name} has been disconnected successfully.`,
    });
    setManageModalOpen(false);
    setSelectedIntegration(null);
  };

  const handleSyncNow = () => {
    toast({
      title: "Sync Started",
      description: `Syncing ${selectedIntegration?.name} data...`,
    });
  };

  const closeConnectionModal = () => {
    setConnectionStep(null);
    setSelectedIntegration(null);
    setSyncProgress(0);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Integrations</h1>
          <p className="text-muted-foreground mt-2">
            Connect your financial tools to FlowPay
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search integrations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Tabs value={activeFilter} onValueChange={(value) => setActiveFilter(value as FilterTab)}>
            <TabsList>
              <TabsTrigger value="All">All</TabsTrigger>
              <TabsTrigger value="Connected">Connected</TabsTrigger>
              <TabsTrigger value="Available">Available</TabsTrigger>
              <TabsTrigger value="Accounting">Accounting</TabsTrigger>
              <TabsTrigger value="Payroll">Payroll</TabsTrigger>
              <TabsTrigger value="Banking">Banking</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Integration Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIntegrations.map((integration) => {
            const Icon = integration.icon;
            return (
              <Card key={integration.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-muted ${integration.color}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{integration.name}</CardTitle>
                        <Badge variant="secondary" className="mt-1">
                          {integration.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <CardDescription className="mt-3">{integration.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Features */}
                  <ul className="space-y-2 text-sm">
                    {integration.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Status and Actions */}
                  {integration.status === "connected" ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Badge variant="default" className="bg-green-600">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Connected
                        </Badge>
                        <span className="text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {integration.lastSynced}
                        </span>
                      </div>
                      {integration.accountsConnected && (
                        <p className="text-sm text-muted-foreground">
                          {integration.accountsConnected} accounts connected
                        </p>
                      )}
                      <Button variant="outline" className="w-full" onClick={() => handleManage(integration)}>
                        Manage
                      </Button>
                    </div>
                  ) : (
                    <Button className="w-full" onClick={() => handleConnect(integration)}>
                      Connect
                    </Button>
                  )}

                  <Button variant="link" className="w-full p-0 h-auto text-xs">
                    Learn More →
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredIntegrations.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No integrations found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Connection Flow Modal */}
      <Dialog open={connectionStep !== null} onOpenChange={closeConnectionModal}>
        <DialogContent className="sm:max-w-md">
          {connectionStep === "auth" && (
            <>
              <DialogHeader>
                <DialogTitle>Connect {selectedIntegration?.name}</DialogTitle>
                <DialogDescription>
                  Authorize FlowPay to access your {selectedIntegration?.name} account
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <h4 className="font-medium mb-2">What we'll access:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      Read vendor information
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      Sync payment data
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      Update transaction records
                    </li>
                  </ul>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted p-3 rounded-md">
                  <Shield className="h-4 w-4" />
                  Bank-level 256-bit encryption
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={closeConnectionModal}>
                  Cancel
                </Button>
                <Button onClick={handleAuthorize}>
                  Continue to {selectedIntegration?.name}
                </Button>
              </DialogFooter>
            </>
          )}

          {connectionStep === "loading" && (
            <>
              <DialogHeader>
                <DialogTitle>Connecting...</DialogTitle>
              </DialogHeader>
              <div className="py-8 text-center space-y-4">
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
                <p className="text-muted-foreground">
                  Redirecting to {selectedIntegration?.name}...
                </p>
              </div>
            </>
          )}

          {connectionStep === "config" && (
            <>
              <DialogHeader>
                <DialogTitle>Configure {selectedIntegration?.name}</DialogTitle>
                <DialogDescription>
                  Set up your sync preferences
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Sync Frequency</Label>
                  <Select defaultValue="realtime">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="realtime">Real-time</SelectItem>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>What to Sync</Label>
                  <div className="space-y-2">
                    {["Vendors", "Payments", "Invoices"].map((item) => (
                      <div key={item} className="flex items-center justify-between">
                        <span className="text-sm">{item}</span>
                        <Switch defaultChecked />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Starting Date</Label>
                  <Select defaultValue="90days">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="90days">Last 90 days</SelectItem>
                      <SelectItem value="30days">Last 30 days</SelectItem>
                      <SelectItem value="all">All time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={closeConnectionModal}>
                  Cancel
                </Button>
                <Button onClick={handleStartSync}>
                  Start Syncing
                </Button>
              </DialogFooter>
            </>
          )}

          {connectionStep === "success" && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  {selectedIntegration?.name} Connected!
                </DialogTitle>
                <DialogDescription>
                  Initial sync in progress...
                </DialogDescription>
              </DialogHeader>
              <div className="py-6 space-y-4">
                <Progress value={syncProgress} />
                <p className="text-sm text-muted-foreground text-center">
                  {syncProgress < 100 ? "Syncing data..." : "Sync complete!"}
                </p>
              </div>
              <DialogFooter>
                <Button onClick={closeConnectionModal} className="w-full">
                  View Dashboard
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Manage Integration Modal */}
      <Dialog open={manageModalOpen} onOpenChange={setManageModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Manage {selectedIntegration?.name}</DialogTitle>
            <DialogDescription>
              Update sync settings and view connection details
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Connection Status</span>
              <Badge variant="default" className="bg-green-600">Active</Badge>
            </div>
            
            <Separator />

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Last Sync</span>
                <span className="text-sm text-muted-foreground">{selectedIntegration?.lastSynced}</span>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <Label>Sync Settings</Label>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Sync Vendors</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Sync Payments</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Sync Invoices</span>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label>Sync Frequency</Label>
              <Select defaultValue="realtime">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="realtime">Real-time</SelectItem>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="flex-col sm:flex-col gap-2">
            <Button onClick={handleSyncNow} className="w-full">
              Sync Now
            </Button>
            <Button variant="destructive" onClick={handleDisconnect} className="w-full">
              Disconnect
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Integrations;
