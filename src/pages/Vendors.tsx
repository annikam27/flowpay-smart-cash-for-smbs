import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Plus,
  Upload,
  Grid3x3,
  List,
  Search,
  MoreVertical,
  Building,
  Globe,
  DollarSign,
  Mail,
  Phone,
  Calendar,
  Edit,
  Trash2,
  Eye,
} from 'lucide-react';

// Mock data
const mockVendors = [
  {
    id: 1,
    name: 'Web Designer Tom',
    email: 'tom@design.com',
    phone: '(555) 123-4567',
    avatar: 'T',
    color: 'bg-blue-500',
    totalPaid: 24800,
    paymentCount: 12,
    lastPayment: { date: '2025-11-17', amount: 2400 },
    tags: ['Design', 'Contractor'],
    paymentMethods: ['ach', 'international'],
    status: 'active',
  },
  {
    id: 2,
    name: 'AWS Cloud Services',
    email: 'billing@aws.com',
    phone: '(555) 234-5678',
    avatar: 'A',
    color: 'bg-orange-500',
    totalPaid: 18650,
    paymentCount: 8,
    lastPayment: { date: '2025-11-14', amount: 890 },
    tags: ['Infrastructure', 'SaaS'],
    paymentMethods: ['ach'],
    status: 'active',
  },
  {
    id: 3,
    name: 'Marketing Agency Pro',
    email: 'hello@marketingpro.com',
    phone: '(555) 345-6789',
    avatar: 'M',
    color: 'bg-purple-500',
    totalPaid: 45000,
    paymentCount: 15,
    lastPayment: { date: '2025-11-10', amount: 3500 },
    tags: ['Marketing', 'Agency'],
    paymentMethods: ['ach', 'wire'],
    status: 'active',
  },
  {
    id: 4,
    name: 'Freelance Developer Jane',
    email: 'jane@dev.com',
    phone: '(555) 456-7890',
    avatar: 'J',
    color: 'bg-green-500',
    totalPaid: 32400,
    paymentCount: 9,
    lastPayment: { date: '2025-11-08', amount: 4200 },
    tags: ['Development', 'Contractor'],
    paymentMethods: ['ach', 'international'],
    status: 'active',
  },
  {
    id: 5,
    name: 'Office Supplies Co',
    email: 'orders@officesupplies.com',
    phone: '(555) 567-8901',
    avatar: 'O',
    color: 'bg-yellow-500',
    totalPaid: 8950,
    paymentCount: 22,
    lastPayment: { date: '2025-11-05', amount: 450 },
    tags: ['Supplies'],
    paymentMethods: ['ach'],
    status: 'active',
  },
  {
    id: 6,
    name: 'Legal Advisors LLC',
    email: 'contact@legaladvisors.com',
    phone: '(555) 678-9012',
    avatar: 'L',
    color: 'bg-red-500',
    totalPaid: 15000,
    paymentCount: 5,
    lastPayment: { date: '2025-11-01', amount: 3000 },
    tags: ['Legal', 'Professional'],
    paymentMethods: ['wire'],
    status: 'active',
  },
  {
    id: 7,
    name: 'Content Writer Mike',
    email: 'mike@writing.com',
    phone: '(555) 789-0123',
    avatar: 'M',
    color: 'bg-indigo-500',
    totalPaid: 12600,
    paymentCount: 14,
    lastPayment: { date: '2025-10-28', amount: 900 },
    tags: ['Content', 'Contractor'],
    paymentMethods: ['ach'],
    status: 'active',
  },
  {
    id: 8,
    name: 'Cloud Storage Plus',
    email: 'support@cloudstorage.com',
    phone: '(555) 890-1234',
    avatar: 'C',
    color: 'bg-teal-500',
    totalPaid: 5400,
    paymentCount: 12,
    lastPayment: { date: '2025-10-25', amount: 450 },
    tags: ['SaaS', 'Infrastructure'],
    paymentMethods: ['ach'],
    status: 'active',
  },
  {
    id: 9,
    name: 'Graphic Designer Sarah',
    email: 'sarah@graphics.com',
    phone: '(555) 901-2345',
    avatar: 'S',
    color: 'bg-pink-500',
    totalPaid: 19800,
    paymentCount: 11,
    lastPayment: { date: '2025-10-20', amount: 1800 },
    tags: ['Design', 'Contractor'],
    paymentMethods: ['ach', 'international'],
    status: 'active',
  },
  {
    id: 10,
    name: 'Accounting Services Inc',
    email: 'info@accounting.com',
    phone: '(555) 012-3456',
    avatar: 'A',
    color: 'bg-cyan-500',
    totalPaid: 28000,
    paymentCount: 7,
    lastPayment: { date: '2025-10-15', amount: 4000 },
    tags: ['Accounting', 'Professional'],
    paymentMethods: ['ach', 'wire'],
    status: 'active',
  },
  {
    id: 11,
    name: 'International Consultant',
    email: 'consultant@global.com',
    phone: '+44 20 1234 5678',
    avatar: 'I',
    color: 'bg-violet-500',
    totalPaid: 52000,
    paymentCount: 13,
    lastPayment: { date: '2025-10-10', amount: 4000 },
    tags: ['Consulting', 'International'],
    paymentMethods: ['international', 'wire'],
    status: 'active',
  },
  {
    id: 12,
    name: 'Security Software Ltd',
    email: 'sales@security.com',
    phone: '(555) 123-9999',
    avatar: 'S',
    color: 'bg-slate-500',
    totalPaid: 9600,
    paymentCount: 12,
    lastPayment: { date: '2025-10-05', amount: 800 },
    tags: ['SaaS', 'Security'],
    paymentMethods: ['ach'],
    status: 'active',
  },
];

const Vendors = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [selectedVendor, setSelectedVendor] = useState<typeof mockVendors[0] | null>(null);

  const filteredVendors = mockVendors.filter((vendor) =>
    vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vendor.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedVendors = [...filteredVendors].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'lastPayment':
        return new Date(b.lastPayment.date).getTime() - new Date(a.lastPayment.date).getTime();
      case 'totalPaid':
        return b.totalPaid - a.totalPaid;
      default:
        return 0;
    }
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'ach':
        return <Building className="h-4 w-4" />;
      case 'wire':
        return <DollarSign className="h-4 w-4" />;
      case 'international':
        return <Globe className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Vendors</h1>
            <p className="text-muted-foreground mt-1">
              {mockVendors.length} active vendors
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Import from CSV
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Vendor
            </Button>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex items-center gap-4 bg-card p-4 rounded-lg border">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search vendors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="lastPayment">Last Payment</SelectItem>
              <SelectItem value="totalPaid">Total Paid</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center border rounded-lg">
            <Button
              variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
              size="icon"
              onClick={() => setViewMode('grid')}
            >
              <Grid3x3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'secondary' : 'ghost'}
              size="icon"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Grid View */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedVendors.map((vendor) => (
              <Card
                key={vendor.id}
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedVendor(vendor)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className={vendor.color}>
                          <span className="text-white font-semibold text-lg">
                            {vendor.avatar}
                          </span>
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-foreground">{vendor.name}</h3>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                          {vendor.paymentMethods.map((method, idx) => (
                            <div key={idx}>{getPaymentMethodIcon(method)}</div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-3 w-3" />
                      <span className="truncate">{vendor.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="h-3 w-3" />
                      <span>{vendor.phone}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t">
                    <div className="text-sm font-medium text-foreground">
                      {vendor.paymentCount} payments • {formatCurrency(vendor.totalPaid)} total
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                      <Calendar className="h-3 w-3" />
                      Last payment: {formatDate(vendor.lastPayment.date)}
                    </div>
                  </div>

                  {vendor.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {vendor.tags.map((tag, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-2 pt-2">
                    <Button size="sm" className="flex-1">
                      <DollarSign className="h-3 w-3 mr-1" />
                      Pay Now
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View History
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* List View */}
        {viewMode === 'list' && (
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Payment Methods</TableHead>
                  <TableHead className="text-right">Total Paid</TableHead>
                  <TableHead>Last Payment</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedVendors.map((vendor) => (
                  <TableRow
                    key={vendor.id}
                    className="cursor-pointer"
                    onClick={() => setSelectedVendor(vendor)}
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback className={vendor.color}>
                            <span className="text-white font-semibold">
                              {vendor.avatar}
                            </span>
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-foreground">{vendor.name}</div>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {vendor.tags.map((tag, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <div>{vendor.email}</div>
                        <div>{vendor.phone}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {vendor.paymentMethods.map((method, idx) => (
                          <div key={idx} className="text-muted-foreground">
                            {getPaymentMethodIcon(method)}
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="font-medium text-foreground">
                        {formatCurrency(vendor.totalPaid)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {vendor.paymentCount} payments
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium text-foreground">
                          {formatCurrency(vendor.lastPayment.amount)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {formatDate(vendor.lastPayment.date)}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">Active</Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <DollarSign className="h-4 w-4 mr-2" />
                            Pay Now
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View History
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        )}

        {/* Empty State */}
        {sortedVendors.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">No vendors found</div>
            <Button onClick={() => setSearchQuery('')}>Clear search</Button>
          </div>
        )}
      </div>

      {/* Vendor Details Side Panel */}
      <Sheet open={!!selectedVendor} onOpenChange={() => setSelectedVendor(null)}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          {selectedVendor && (
            <>
              <SheetHeader>
                <SheetTitle>Vendor Details</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                {/* Vendor Info */}
                <div className="flex items-start gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className={selectedVendor.color}>
                      <span className="text-white font-semibold text-2xl">
                        {selectedVendor.avatar}
                      </span>
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground">
                      {selectedVendor.name}
                    </h3>
                    <Badge variant="secondary" className="mt-2">
                      {selectedVendor.status}
                    </Badge>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-3 p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground">{selectedVendor.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground">{selectedVendor.phone}</span>
                  </div>
                </div>

                {/* Payment Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="text-sm text-muted-foreground">Total Paid</div>
                    <div className="text-2xl font-bold text-foreground mt-1">
                      {formatCurrency(selectedVendor.totalPaid)}
                    </div>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="text-sm text-muted-foreground">Payments</div>
                    <div className="text-2xl font-bold text-foreground mt-1">
                      {selectedVendor.paymentCount}
                    </div>
                  </div>
                </div>

                {/* Payment Methods */}
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Payment Methods</h4>
                  <div className="space-y-2">
                    {selectedVendor.paymentMethods.map((method, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg"
                      >
                        {getPaymentMethodIcon(method)}
                        <span className="text-sm text-foreground capitalize">{method}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                {selectedVendor.tags.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedVendor.tags.map((tag, idx) => (
                        <Badge key={idx} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Last Payment */}
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Last Payment</h4>
                  <div className="p-4 bg-muted/50 rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Amount</span>
                      <span className="font-medium text-foreground">
                        {formatCurrency(selectedVendor.lastPayment.amount)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Date</span>
                      <span className="font-medium text-foreground">
                        {formatDate(selectedVendor.lastPayment.date)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 pt-4 border-t">
                  <Button className="w-full">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Schedule Payment
                  </Button>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button variant="destructive">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </DashboardLayout>
  );
};

export default Vendors;
