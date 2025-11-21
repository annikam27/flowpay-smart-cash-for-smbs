import { useState, useMemo } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Plus, Search, MoreVertical, X, ChevronLeft, ChevronRight } from 'lucide-react';

type PaymentStatus = 'Scheduled' | 'Processing' | 'Completed' | 'Failed' | 'Cancelled';
type PaymentMethod = 'ACH' | 'Wire' | 'International' | 'Check';

interface Payment {
  id: string;
  vendor: string;
  amount: number;
  paymentMethod: PaymentMethod;
  status: PaymentStatus;
  scheduledDate: string;
}

const generateMockPayments = (): Payment[] => {
  const vendors = [
    'Web Designer Tom', 'AWS', 'Office Supplies Co', 'Marketing Agency',
    'Software Licenses', 'Legal Services LLC', 'Accounting Firm',
    'Cloud Storage Inc', 'Design Studio', 'Freelance Developer',
    'Print Services', 'Consulting Group', 'IT Support', 'Insurance Co',
    'Shipping Services', 'Telecom Provider', 'Equipment Rental',
    'Training Institute', 'Research Firm', 'Data Analytics Co'
  ];
  
  const methods: PaymentMethod[] = ['ACH', 'Wire', 'International', 'Check'];
  const statuses: PaymentStatus[] = ['Scheduled', 'Processing', 'Completed', 'Failed', 'Cancelled'];
  
  const payments: Payment[] = [];
  const today = new Date();
  
  for (let i = 0; i < 50; i++) {
    const daysAgo = Math.floor(Math.random() * 90);
    const date = new Date(today);
    date.setDate(date.getDate() - daysAgo);
    
    payments.push({
      id: `PAY-${String(i + 1).padStart(4, '0')}`,
      vendor: vendors[Math.floor(Math.random() * vendors.length)],
      amount: Math.floor(Math.random() * 9900) + 100,
      paymentMethod: methods[Math.floor(Math.random() * methods.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      scheduledDate: date.toISOString().split('T')[0],
    });
  }
  
  return payments.sort((a, b) => new Date(b.scheduledDate).getTime() - new Date(a.scheduledDate).getTime());
};

const Payments = () => {
  const [payments] = useState<Payment[]>(generateMockPayments());
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [methodFilter, setMethodFilter] = useState<string>('All');
  const [selectedPayments, setSelectedPayments] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const filteredPayments = useMemo(() => {
    return payments.filter(payment => {
      const matchesSearch = 
        payment.vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        payment.amount.toString().includes(searchQuery);
      const matchesStatus = statusFilter === 'All' || payment.status === statusFilter;
      const matchesMethod = methodFilter === 'All' || payment.paymentMethod === methodFilter;
      
      return matchesSearch && matchesStatus && matchesMethod;
    });
  }, [payments, searchQuery, statusFilter, methodFilter]);

  const paginatedPayments = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredPayments.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredPayments, currentPage]);

  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
  const totalAmount = payments.filter(p => p.status === 'Completed').reduce((sum, p) => sum + p.amount, 0);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedPayments(new Set(paginatedPayments.map(p => p.id)));
    } else {
      setSelectedPayments(new Set());
    }
  };

  const handleSelectPayment = (paymentId: string, checked: boolean) => {
    const newSelected = new Set(selectedPayments);
    if (checked) {
      newSelected.add(paymentId);
    } else {
      newSelected.delete(paymentId);
    }
    setSelectedPayments(newSelected);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setStatusFilter('All');
    setMethodFilter('All');
    setCurrentPage(1);
  };

  const getStatusColor = (status: PaymentStatus) => {
    switch (status) {
      case 'Completed': return 'bg-success/10 text-success border-success/20';
      case 'Scheduled': return 'bg-primary/10 text-primary border-primary/20';
      case 'Processing': return 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20';
      case 'Failed': return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'Cancelled': return 'bg-muted text-muted-foreground border-border';
      default: return '';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Payments</h1>
            <p className="text-muted-foreground mt-1">
              {payments.length} payments this month • ${totalAmount.toLocaleString()} processed
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Payment
          </Button>
        </div>

        {/* Bulk Actions Bar */}
        {selectedPayments.size > 0 && (
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 flex items-center justify-between animate-fade-in">
            <span className="text-sm font-medium">
              {selectedPayments.size} payment{selectedPayments.size > 1 ? 's' : ''} selected
            </span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Cancel Selected</Button>
              <Button variant="outline" size="sm">Export Selected</Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setSelectedPayments(new Set())}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Filters */}
        <Card className="shadow-elegant">
          <CardContent className="pt-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by vendor or amount..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full lg:w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Status</SelectItem>
                  <SelectItem value="Scheduled">Scheduled</SelectItem>
                  <SelectItem value="Processing">Processing</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Failed">Failed</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>

              <Select value={methodFilter} onValueChange={setMethodFilter}>
                <SelectTrigger className="w-full lg:w-[180px]">
                  <SelectValue placeholder="Payment Method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Methods</SelectItem>
                  <SelectItem value="ACH">ACH</SelectItem>
                  <SelectItem value="Wire">Wire</SelectItem>
                  <SelectItem value="International">International</SelectItem>
                  <SelectItem value="Check">Check</SelectItem>
                </SelectContent>
              </Select>

              {(searchQuery || statusFilter !== 'All' || methodFilter !== 'All') && (
                <Button variant="outline" onClick={clearFilters} className="gap-2">
                  <X className="h-4 w-4" />
                  Clear
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Desktop Table */}
        <Card className="shadow-elegant hidden md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={paginatedPayments.length > 0 && paginatedPayments.every(p => selectedPayments.has(p.id))}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Scheduled Date</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedPayments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                    No payments found matching your filters
                  </TableCell>
                </TableRow>
              ) : (
                paginatedPayments.map((payment) => (
                  <TableRow key={payment.id} className="hover:bg-muted/50 cursor-pointer">
                    <TableCell>
                      <Checkbox
                        checked={selectedPayments.has(payment.id)}
                        onCheckedChange={(checked) => handleSelectPayment(payment.id, checked as boolean)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-primary/10 text-primary text-xs">
                            {payment.vendor.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{payment.vendor}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold">
                      ${payment.amount.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{payment.paymentMethod}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(payment.status)}>
                        {payment.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatDate(payment.scheduledDate)}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Duplicate</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Cancel</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Card>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {paginatedPayments.length === 0 ? (
            <Card className="shadow-elegant">
              <CardContent className="py-12 text-center text-muted-foreground">
                No payments found matching your filters
              </CardContent>
            </Card>
          ) : (
            paginatedPayments.map((payment) => (
              <Card key={payment.id} className="shadow-elegant hover:shadow-elegant-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <Checkbox
                        checked={selectedPayments.has(payment.id)}
                        onCheckedChange={(checked) => handleSelectPayment(payment.id, checked as boolean)}
                      />
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {payment.vendor.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-base">{payment.vendor}</CardTitle>
                        <p className="text-sm text-muted-foreground">{payment.id}</p>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Cancel</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">${payment.amount.toLocaleString()}</span>
                    <Badge className={getStatusColor(payment.status)}>
                      {payment.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{payment.paymentMethod}</Badge>
                    </div>
                    <span className="text-muted-foreground">
                      {formatDate(payment.scheduledDate)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <Card className="shadow-elegant">
            <CardContent className="py-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm text-muted-foreground">
                  Showing {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, filteredPayments.length)} of {filteredPayments.length} payments
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(pageNum)}
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Payments;
