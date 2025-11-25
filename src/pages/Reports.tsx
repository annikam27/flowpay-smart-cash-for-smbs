import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Download,
  Calendar as CalendarIcon,
  Mail,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Activity,
  Users,
  CreditCard,
  AlertCircle,
  CheckCircle2,
  Clock,
  Zap,
  Target,
  Lightbulb,
} from 'lucide-react';
import { format } from 'date-fns';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Mock data
const mockCashFlowData = [
  { period: 'Week 1', inflows: 32000, outflows: 24000, net: 8000 },
  { period: 'Week 2', inflows: 28000, outflows: 26000, net: 2000 },
  { period: 'Week 3', inflows: 35000, outflows: 22000, net: 13000 },
  { period: 'Week 4', inflows: 29800, outflows: 26200, net: 3600 },
];

const mockMonthlyTrends = [
  { month: 'Jan', inflows: 98000, outflows: 76000, net: 22000, buffer: 5000 },
  { month: 'Feb', inflows: 92000, outflows: 83800, net: 8200, buffer: 5000 },
  { month: 'Mar', inflows: 105000, outflows: 78000, net: 27000, buffer: 5000 },
  { month: 'Apr', inflows: 112000, outflows: 84000, net: 28000, buffer: 5000 },
  { month: 'May', inflows: 108000, outflows: 82000, net: 26000, buffer: 5000 },
  { month: 'Jun', inflows: 118000, outflows: 86000, net: 32000, buffer: 5000 },
  { month: 'Jul', inflows: 122000, outflows: 88000, net: 34000, buffer: 5000 },
  { month: 'Aug', inflows: 115000, outflows: 91000, net: 24000, buffer: 5000 },
  { month: 'Sep', inflows: 128000, outflows: 94000, net: 34000, buffer: 5000 },
  { month: 'Oct', inflows: 142000, outflows: 100000, net: 42000, buffer: 5000 },
  { month: 'Nov', inflows: 124800, outflows: 98200, net: 26600, buffer: 5000 },
];

const mockPaymentStatusData = [
  { name: 'Completed', value: 43, color: 'hsl(var(--chart-1))' },
  { name: 'Scheduled', value: 3, color: 'hsl(var(--chart-2))' },
  { name: 'Failed', value: 1, color: 'hsl(var(--chart-3))' },
];

const mockPaymentMethodData = [
  { method: 'ACH', count: 35, volume: 82400, fees: 0 },
  { method: 'Wire', count: 8, volume: 32800, fees: 120 },
  { method: 'International', count: 4, volume: 9600, fees: 770 },
];

const mockVendorSpendingData = [
  { category: 'Design Services', value: 35, color: 'hsl(var(--chart-1))' },
  { category: 'Cloud Infrastructure', value: 20, color: 'hsl(var(--chart-2))' },
  { category: 'Marketing', value: 18, color: 'hsl(var(--chart-3))' },
  { category: 'Office Supplies', value: 15, color: 'hsl(var(--chart-4))' },
  { category: 'Other', value: 12, color: 'hsl(var(--chart-5))' },
];

const mockTopPayments = [
  { date: 'Nov 24', vendor: 'Web Designer Tom', amount: 8500, method: 'ACH', status: 'Completed' },
  { date: 'Nov 22', vendor: 'AWS Cloud', amount: 6200, method: 'ACH', status: 'Completed' },
  { date: 'Nov 20', vendor: 'Marketing Agency', amount: 4800, method: 'Wire', status: 'Completed' },
  { date: 'Nov 18', vendor: 'Office Plus', amount: 3200, method: 'ACH', status: 'Completed' },
  { date: 'Nov 15', vendor: 'Freelance Designer', amount: 2800, method: 'International', status: 'Completed' },
];

const mockVendorAnalysis = [
  { vendor: 'Web Designer Tom', score: 95, avgDelay: -2, risk: 'Low', action: 'None' },
  { vendor: 'AWS Cloud', score: 88, avgDelay: 0, risk: 'Low', action: 'Monitor' },
  { vendor: 'Marketing Agency', score: 92, avgDelay: -1, risk: 'Low', action: 'None' },
  { vendor: 'Office Plus', score: 78, avgDelay: 3, risk: 'Medium', action: 'Review payment terms' },
  { vendor: 'Freelance Designer', score: 85, avgDelay: 1, risk: 'Low', action: 'None' },
];

export default function Reports() {
  const [selectedReport, setSelectedReport] = useState('cash-flow');
  const [dateRange, setDateRange] = useState('this-month');
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  const [scheduleEmail, setScheduleEmail] = useState('');
  const [scheduleFrequency, setScheduleFrequency] = useState('weekly');

  const exportReport = (format: string) => {
    console.log(`Exporting report as ${format}`);
    // Implement export logic
  };

  const scheduleReport = () => {
    console.log(`Scheduling ${selectedReport} report to ${scheduleEmail} ${scheduleFrequency}`);
    setShowScheduleDialog(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Reports & Analytics</h1>
          <p className="text-muted-foreground mt-2">
            Comprehensive financial insights and data analysis
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-4 items-center">
          <Select value={selectedReport} onValueChange={setSelectedReport}>
            <SelectTrigger className="w-[240px]">
              <SelectValue placeholder="Select Report" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cash-flow">Cash Flow Statement</SelectItem>
              <SelectItem value="payment-summary">Payment Summary</SelectItem>
              <SelectItem value="vendor-analysis">Vendor Analysis</SelectItem>
              <SelectItem value="payment-methods">Payment Method Breakdown</SelectItem>
              <SelectItem value="monthly-trends">Monthly Trends</SelectItem>
              <SelectItem value="executive-summary">Executive Summary</SelectItem>
            </SelectContent>
          </Select>

          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Date Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="yesterday">Yesterday</SelectItem>
              <SelectItem value="last-7-days">Last 7 Days</SelectItem>
              <SelectItem value="last-30-days">Last 30 Days</SelectItem>
              <SelectItem value="this-month">This Month</SelectItem>
              <SelectItem value="last-month">Last Month</SelectItem>
              <SelectItem value="this-quarter">This Quarter</SelectItem>
              <SelectItem value="ytd">Year to Date</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => exportReport('pdf')}>
                Export as PDF
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => exportReport('excel')}>
                Export as Excel
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => exportReport('csv')}>
                Export as CSV
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Dialog open={showScheduleDialog} onOpenChange={setShowScheduleDialog}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Mail className="mr-2 h-4 w-4" />
                Schedule
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Schedule Report</DialogTitle>
                <DialogDescription>
                  Automatically email this report on a regular schedule
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={scheduleEmail}
                    onChange={(e) => setScheduleEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="frequency">Frequency</Label>
                  <Select value={scheduleFrequency} onValueChange={setScheduleFrequency}>
                    <SelectTrigger id="frequency">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly (Monday 8AM)</SelectItem>
                      <SelectItem value="monthly">Monthly (1st of month)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Include</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="charts" defaultChecked />
                      <label htmlFor="charts" className="text-sm">Charts and visualizations</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="tables" defaultChecked />
                      <label htmlFor="tables" className="text-sm">Detailed tables</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="summary" defaultChecked />
                      <label htmlFor="summary" className="text-sm">Executive summary</label>
                    </div>
                  </div>
                </div>
              </div>
              <Button onClick={scheduleReport} className="w-full">
                Schedule Report
              </Button>
            </DialogContent>
          </Dialog>
        </div>

        {/* Report Content */}
        {selectedReport === 'cash-flow' && <CashFlowReport />}
        {selectedReport === 'payment-summary' && <PaymentSummaryReport />}
        {selectedReport === 'vendor-analysis' && <VendorAnalysisReport />}
        {selectedReport === 'payment-methods' && <PaymentMethodsReport />}
        {selectedReport === 'monthly-trends' && <MonthlyTrendsReport />}
        {selectedReport === 'executive-summary' && <ExecutiveSummaryReport />}
      </div>
    </DashboardLayout>
  );
}

// Cash Flow Statement Report
function CashFlowReport() {
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Total Inflows</p>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-green-500 mt-2">$124,800</p>
          <p className="text-xs text-muted-foreground mt-1">+12.5% vs last month</p>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Total Outflows</p>
            <TrendingDown className="h-4 w-4 text-red-500" />
          </div>
          <p className="text-2xl font-bold text-red-500 mt-2">$98,200</p>
          <p className="text-xs text-muted-foreground mt-1">+8.2% vs last month</p>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Net Cash Flow</p>
            <ArrowUpRight className="h-4 w-4 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-green-500 mt-2">+$26,600</p>
          <p className="text-xs text-muted-foreground mt-1">21.3% margin</p>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Avg Daily Balance</p>
            <DollarSign className="h-4 w-4 text-primary" />
          </div>
          <p className="text-2xl font-bold mt-2">$32,400</p>
          <p className="text-xs text-muted-foreground mt-1">Above target</p>
        </Card>
      </div>

      {/* Chart */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Cash Flow Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={mockCashFlowData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="inflows" fill="hsl(var(--chart-1))" name="Inflows" />
            <Bar dataKey="outflows" fill="hsl(var(--chart-3))" name="Outflows" />
            <Line type="monotone" dataKey="net" stroke="hsl(var(--chart-2))" name="Net" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Detailed Breakdown */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Detailed Breakdown</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">% of Total</TableHead>
              <TableHead className="text-right">Change</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="font-semibold">
              <TableCell>Inflows</TableCell>
              <TableCell className="text-right text-green-500">$124,800</TableCell>
              <TableCell className="text-right">100%</TableCell>
              <TableCell className="text-right">+12.5%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="pl-8">Customer Payments</TableCell>
              <TableCell className="text-right">$120,000</TableCell>
              <TableCell className="text-right">96%</TableCell>
              <TableCell className="text-right">+13.2%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="pl-8">Other Income</TableCell>
              <TableCell className="text-right">$4,800</TableCell>
              <TableCell className="text-right">4%</TableCell>
              <TableCell className="text-right">+4.3%</TableCell>
            </TableRow>
            <TableRow className="font-semibold">
              <TableCell>Outflows</TableCell>
              <TableCell className="text-right text-red-500">$98,200</TableCell>
              <TableCell className="text-right">100%</TableCell>
              <TableCell className="text-right">+8.2%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="pl-8">Vendor Payments</TableCell>
              <TableCell className="text-right">$68,000</TableCell>
              <TableCell className="text-right">69%</TableCell>
              <TableCell className="text-right">+10.4%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="pl-8">Payroll</TableCell>
              <TableCell className="text-right">$24,000</TableCell>
              <TableCell className="text-right">24%</TableCell>
              <TableCell className="text-right">+0%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="pl-8">Operating Expenses</TableCell>
              <TableCell className="text-right">$6,200</TableCell>
              <TableCell className="text-right">7%</TableCell>
              <TableCell className="text-right">+12.7%</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

// Payment Summary Report
function PaymentSummaryReport() {
  return (
    <div className="space-y-6">
      {/* Summary Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Payments Processed</p>
            <Activity className="h-4 w-4 text-primary" />
          </div>
          <p className="text-2xl font-bold mt-2">47</p>
          <p className="text-xs text-muted-foreground mt-1">This month</p>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Success Rate</p>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-green-500 mt-2">98%</p>
          <p className="text-xs text-muted-foreground mt-1">46 of 47 successful</p>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Avg Processing Time</p>
            <Clock className="h-4 w-4 text-primary" />
          </div>
          <p className="text-2xl font-bold mt-2">1.2 days</p>
          <p className="text-xs text-muted-foreground mt-1">Faster than industry avg</p>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Total Fees Paid</p>
            <DollarSign className="h-4 w-4 text-red-500" />
          </div>
          <p className="text-2xl font-bold mt-2">$890</p>
          <p className="text-xs text-muted-foreground mt-1">0.72% of volume</p>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Payment Status */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Payment Status</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={mockPaymentStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {mockPaymentStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Payment Methods */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Payment Method Breakdown</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={mockPaymentMethodData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="method" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="volume" fill="hsl(var(--chart-1))" name="Volume ($)" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Top Payments Table */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Top 10 Largest Payments</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Vendor</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockTopPayments.map((payment, idx) => (
              <TableRow key={idx}>
                <TableCell>{payment.date}</TableCell>
                <TableCell>{payment.vendor}</TableCell>
                <TableCell className="text-right font-medium">
                  ${payment.amount.toLocaleString()}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{payment.method}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="default" className="bg-green-500">
                    {payment.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

// Vendor Analysis Report
function VendorAnalysisReport() {
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">On-time Payments</p>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-green-500 mt-2">46 (98%)</p>
          <p className="text-xs text-muted-foreground mt-1">Excellent payment reliability</p>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Avg Days Early</p>
            <Clock className="h-4 w-4 text-primary" />
          </div>
          <p className="text-2xl font-bold mt-2">-2 days</p>
          <p className="text-xs text-muted-foreground mt-1">Ahead of due dates</p>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Late Payments</p>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </div>
          <p className="text-2xl font-bold text-red-500 mt-2">1 (2%)</p>
          <p className="text-xs text-muted-foreground mt-1">Within acceptable range</p>
        </Card>
      </div>

      {/* Spending Categories */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Spending by Category</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={mockVendorSpendingData}
              cx="50%"
              cy="50%"
              labelLine={true}
              label={({ name, value }) => `${name}: ${value}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {mockVendorSpendingData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Card>

      {/* Vendor Risk Assessment */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Vendor Risk Assessment</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vendor</TableHead>
              <TableHead className="text-right">Reliability Score</TableHead>
              <TableHead className="text-right">Avg Delay (days)</TableHead>
              <TableHead>Risk Level</TableHead>
              <TableHead>Recommended Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockVendorAnalysis.map((vendor, idx) => (
              <TableRow key={idx}>
                <TableCell className="font-medium">{vendor.vendor}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <span>{vendor.score}/100</span>
                    <Progress value={vendor.score} className="w-16 h-2" />
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <span className={vendor.avgDelay <= 0 ? 'text-green-500' : 'text-red-500'}>
                    {vendor.avgDelay}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={vendor.risk === 'Low' ? 'default' : 'destructive'}
                    className={vendor.risk === 'Low' ? 'bg-green-500' : ''}
                  >
                    {vendor.risk}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{vendor.action}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Year over Year */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Year-over-Year Comparison</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Current Period Spending</p>
              <p className="text-2xl font-bold">$68,000</p>
            </div>
            <ArrowUpRight className="h-8 w-8 text-green-500" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Same Period Last Year</p>
              <p className="text-2xl font-bold">$52,000</p>
            </div>
          </div>
          <div className="pt-4 border-t">
            <p className="text-sm text-muted-foreground">Change</p>
            <p className="text-xl font-bold text-green-500">+30.8% (+$16,000)</p>
            <p className="text-xs text-muted-foreground mt-1">
              Increased investment in design services
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

// Payment Methods Report
function PaymentMethodsReport() {
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Total Methods Used</p>
          <p className="text-2xl font-bold mt-2">3</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Most Cost-Effective</p>
          <p className="text-2xl font-bold mt-2">ACH</p>
          <p className="text-xs text-green-500 mt-1">$0 fees</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Total Fees Paid</p>
          <p className="text-2xl font-bold mt-2">$890</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Potential Savings</p>
          <p className="text-2xl font-bold text-green-500 mt-2">$240</p>
          <p className="text-xs text-muted-foreground mt-1">if optimized</p>
        </Card>
      </div>

      {/* Method Comparison Table */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Payment Method Comparison</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Count</TableHead>
              <TableHead className="text-right">Total Volume</TableHead>
              <TableHead className="text-right">Avg Amount</TableHead>
              <TableHead className="text-right">Total Fees</TableHead>
              <TableHead className="text-right">Avg Fee %</TableHead>
              <TableHead>Speed</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">ACH</TableCell>
              <TableCell className="text-right">35</TableCell>
              <TableCell className="text-right">$82,400</TableCell>
              <TableCell className="text-right">$2,354</TableCell>
              <TableCell className="text-right text-green-500">$0</TableCell>
              <TableCell className="text-right text-green-500">0%</TableCell>
              <TableCell>2-3 days</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Wire Transfer</TableCell>
              <TableCell className="text-right">8</TableCell>
              <TableCell className="text-right">$32,800</TableCell>
              <TableCell className="text-right">$4,100</TableCell>
              <TableCell className="text-right">$120</TableCell>
              <TableCell className="text-right">0.37%</TableCell>
              <TableCell>Same day</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">International</TableCell>
              <TableCell className="text-right">4</TableCell>
              <TableCell className="text-right">$9,600</TableCell>
              <TableCell className="text-right">$2,400</TableCell>
              <TableCell className="text-right text-red-500">$770</TableCell>
              <TableCell className="text-right text-red-500">8.02%</TableCell>
              <TableCell>1-2 days</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>

      {/* Optimization Recommendations */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-6 border-l-4 border-l-blue-500">
          <div className="flex items-start gap-3">
            <Lightbulb className="h-5 w-5 text-blue-500 mt-1" />
            <div className="flex-1">
              <h4 className="font-semibold mb-2">Switch 2 wire transfers to ACH</h4>
              <div className="space-y-2 text-sm">
                <p className="text-muted-foreground">Potential savings: $30/month</p>
                <p className="text-muted-foreground">Impact: Minimal (1-day delay vs same-day)</p>
                <Button variant="outline" size="sm" className="mt-2">
                  View Eligible Payments
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-l-4 border-l-green-500">
          <div className="flex items-start gap-3">
            <Lightbulb className="h-5 w-5 text-green-500 mt-1" />
            <div className="flex-1">
              <h4 className="font-semibold mb-2">Use Wise for international payments</h4>
              <div className="space-y-2 text-sm">
                <p className="text-muted-foreground">Current cost: 8% average</p>
                <p className="text-muted-foreground">Wise cost: 0.5% average</p>
                <p className="font-medium text-green-500">Potential savings: $72/month</p>
                <Button variant="outline" size="sm" className="mt-2">
                  Connect Wise
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-l-4 border-l-green-500">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-green-500 mt-1" />
            <div className="flex-1">
              <h4 className="font-semibold mb-2">ACH usage optimized</h4>
              <p className="text-sm text-muted-foreground">
                You're using the most cost-effective method for domestic payments. Keep it up!
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

// Monthly Trends Report
function MonthlyTrendsReport() {
  return (
    <div className="space-y-6">
      {/* Trend Indicators */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">MoM Growth</p>
          <p className="text-2xl font-bold text-green-500 mt-2">+12.5%</p>
          <div className="flex items-center text-xs text-green-500 mt-1">
            <ArrowUpRight className="h-3 w-3 mr-1" />
            Increasing
          </div>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">QoQ Growth</p>
          <p className="text-2xl font-bold text-green-500 mt-2">+8.2%</p>
          <div className="flex items-center text-xs text-green-500 mt-1">
            <ArrowUpRight className="h-3 w-3 mr-1" />
            Increasing
          </div>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Payment Volume</p>
          <p className="text-2xl font-bold mt-2">47</p>
          <div className="flex items-center text-xs text-green-500 mt-1">
            <TrendingUp className="h-3 w-3 mr-1" />
            Increasing
          </div>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Vendor Count</p>
          <p className="text-2xl font-bold mt-2">12</p>
          <div className="flex items-center text-xs text-muted-foreground mt-1">
            <Activity className="h-3 w-3 mr-1" />
            Stable
          </div>
        </Card>
      </div>

      {/* 12-Month Chart */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">12-Month Cash Flow Trend</h3>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={mockMonthlyTrends}>
            <defs>
              <linearGradient id="colorInflows" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8} />
                <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorOutflows" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--chart-3))" stopOpacity={0.8} />
                <stop offset="95%" stopColor="hsl(var(--chart-3))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="inflows"
              stroke="hsl(var(--chart-1))"
              fillOpacity={1}
              fill="url(#colorInflows)"
              name="Inflows"
            />
            <Area
              type="monotone"
              dataKey="outflows"
              stroke="hsl(var(--chart-3))"
              fillOpacity={1}
              fill="url(#colorOutflows)"
              name="Outflows"
            />
            <Line type="monotone" dataKey="net" stroke="hsl(var(--chart-2))" name="Net" strokeWidth={2} />
            <Line
              type="monotone"
              dataKey="buffer"
              stroke="hsl(var(--chart-4))"
              strokeDasharray="5 5"
              name="Buffer Target"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      {/* Key Insights */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Key Insights</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 bg-green-500/10 rounded-lg">
            <TrendingUp className="h-5 w-5 text-green-500 mt-0.5" />
            <div>
              <p className="font-medium">Strongest month: October 2025</p>
              <p className="text-sm text-muted-foreground">+$42,000 net cash flow</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-yellow-500/10 rounded-lg">
            <TrendingDown className="h-5 w-5 text-yellow-500 mt-0.5" />
            <div>
              <p className="font-medium">Weakest month: February 2025</p>
              <p className="text-sm text-muted-foreground">+$8,200 net cash flow</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-blue-500/10 rounded-lg">
            <DollarSign className="h-5 w-5 text-blue-500 mt-0.5" />
            <div>
              <p className="font-medium">Average monthly net: +$26,600</p>
              <p className="text-sm text-muted-foreground">Consistent positive cash flow</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-green-500/10 rounded-lg">
            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
            <div>
              <p className="font-medium">Buffer maintenance: 100%</p>
              <p className="text-sm text-muted-foreground">
                Never dropped below $5,000 target
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Forecast */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">3-Month Forecast</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Month</TableHead>
              <TableHead className="text-right">Projected Net</TableHead>
              <TableHead className="text-right">Confidence</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">December 2025</TableCell>
              <TableCell className="text-right text-green-500">+$28,400</TableCell>
              <TableCell className="text-right">85%</TableCell>
              <TableCell>
                <Badge variant="default" className="bg-green-500">Positive</Badge>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">January 2026</TableCell>
              <TableCell className="text-right text-green-500">+$31,200</TableCell>
              <TableCell className="text-right">82%</TableCell>
              <TableCell>
                <Badge variant="default" className="bg-green-500">Positive</Badge>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">February 2026</TableCell>
              <TableCell className="text-right text-green-500">+$27,800</TableCell>
              <TableCell className="text-right">78%</TableCell>
              <TableCell>
                <Badge variant="default" className="bg-green-500">Positive</Badge>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <p className="text-xs text-muted-foreground mt-4">
          Based on historical patterns and scheduled payments
        </p>
      </Card>
    </div>
  );
}

// Executive Summary Report
function ExecutiveSummaryReport() {
  return (
    <div className="space-y-6">
      {/* Report Header */}
      <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10">
        <h2 className="text-2xl font-bold">Executive Summary - November 2025</h2>
        <p className="text-muted-foreground mt-1">Your business at a glance</p>
        <p className="text-xs text-muted-foreground mt-2">
          Generated on {format(new Date(), 'PPP')} at {format(new Date(), 'p')}
        </p>
      </Card>

      {/* Top-Level Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-muted-foreground">Cash Position</p>
            <DollarSign className="h-4 w-4 text-primary" />
          </div>
          <p className="text-3xl font-bold">$32,400</p>
          <div className="mt-3 space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Buffer Status</span>
              <span className="text-green-500 flex items-center">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Healthy
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">30-Day Outlook</span>
              <span className="text-green-500">+$4,000</span>
            </div>
            <div className="mt-2 pt-2 border-t">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Health Score</span>
                <span className="text-lg font-bold text-green-500">87/100</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-muted-foreground">This Month</p>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </div>
          <div className="space-y-2">
            <div>
              <p className="text-xs text-muted-foreground">Revenue</p>
              <p className="text-2xl font-bold">$124,800</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Net Profit</p>
              <p className="text-xl font-bold text-green-500">$26,600</p>
            </div>
            <div className="flex items-center justify-between text-xs pt-2 border-t">
              <span className="text-muted-foreground">Margin</span>
              <span className="font-medium">21.3%</span>
            </div>
            <div className="flex items-center text-xs text-green-500">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +12.5% vs last month
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-muted-foreground">Operations</p>
            <Activity className="h-4 w-4 text-primary" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Payments</span>
              <span className="text-lg font-bold">47</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Success Rate</span>
              <span className="text-lg font-bold text-green-500">98%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Avg Time</span>
              <span className="text-lg font-bold">1.2 days</span>
            </div>
            <div className="pt-2 border-t">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Efficiency</span>
                <span className="text-lg font-bold text-green-500">94/100</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-muted-foreground">Vendors</p>
            <Users className="h-4 w-4 text-primary" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Active</span>
              <span className="text-lg font-bold">12</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">On-Time Rate</span>
              <span className="text-lg font-bold text-green-500">98%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Total Spend</span>
              <span className="text-lg font-bold">$68,000</span>
            </div>
            <div className="pt-2 border-t text-xs">
              <p className="text-muted-foreground">Top Vendor</p>
              <p className="font-medium">Web Designer Tom</p>
              <p className="text-muted-foreground">$24,800</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Key Highlights */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Key Highlights</h3>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            <p className="text-sm">Maintained healthy cash buffer for 30 consecutive days</p>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            <p className="text-sm">Successfully prevented 2 cash flow gaps using FlowCredit</p>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            <p className="text-sm">Reduced international payment fees by 40%</p>
          </div>
          <div className="flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
            <p className="text-sm">One failed payment to AWS (resolved same day)</p>
          </div>
          <div className="flex items-start gap-2">
            <TrendingUp className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            <p className="text-sm">Revenue up 12.5% month-over-month</p>
          </div>
          <div className="flex items-start gap-2">
            <Lightbulb className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <p className="text-sm">Early payment discount available from 3 vendors</p>
          </div>
        </div>
      </Card>

      {/* Top Expenses */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Top 5 Expenses This Month</h3>
        <div className="space-y-3">
          {[
            { name: 'Payroll Processing', amount: 24000, pct: 35 },
            { name: 'Web Designer Tom', amount: 24800, pct: 36 },
            { name: 'AWS Cloud Services', amount: 12400, pct: 18 },
            { name: 'Marketing Agency', amount: 8600, pct: 13 },
            { name: 'Office Supplies', amount: 5200, pct: 8 },
          ].map((expense, idx) => (
            <div key={idx}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">{expense.name}</span>
                <span className="text-sm font-bold">${expense.amount.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Progress value={expense.pct} className="h-2" />
                <span className="text-xs text-muted-foreground w-10">{expense.pct}%</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Risks & Opportunities */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-500" />
            Risks to Monitor
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-2 p-3 bg-red-500/10 rounded-lg">
              <span className="text-red-500 font-bold">🔴</span>
              <div>
                <p className="text-sm font-medium">AWS payment delay</p>
                <p className="text-xs text-muted-foreground">Monitor for recurring issues</p>
              </div>
            </div>
            <div className="flex items-start gap-2 p-3 bg-yellow-500/10 rounded-lg">
              <span className="text-yellow-500 font-bold">🟡</span>
              <div>
                <p className="text-sm font-medium">International fees still high</p>
                <p className="text-xs text-muted-foreground">Consider alternative providers</p>
              </div>
            </div>
            <div className="flex items-start gap-2 p-3 bg-yellow-500/10 rounded-lg">
              <span className="text-yellow-500 font-bold">🟡</span>
              <div>
                <p className="text-sm font-medium">Cash dip to $22K on Nov 7</p>
                <p className="text-xs text-muted-foreground">Watch Q4 seasonal patterns</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-green-500" />
            Opportunities
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-2 p-3 bg-green-500/10 rounded-lg">
              <span className="text-green-500 font-bold">🟢</span>
              <div>
                <p className="text-sm font-medium">Early payment discounts</p>
                <p className="text-xs text-muted-foreground">Save $240/month from 3 vendors</p>
              </div>
            </div>
            <div className="flex items-start gap-2 p-3 bg-green-500/10 rounded-lg">
              <span className="text-green-500 font-bold">🟢</span>
              <div>
                <p className="text-sm font-medium">Volume discount negotiation</p>
                <p className="text-xs text-muted-foreground">Better rates with Web Designer Tom</p>
              </div>
            </div>
            <div className="flex items-start gap-2 p-3 bg-green-500/10 rounded-lg">
              <span className="text-green-500 font-bold">🟢</span>
              <div>
                <p className="text-sm font-medium">FlowCredit limit increase</p>
                <p className="text-xs text-muted-foreground">$30K → $50K available</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Recommendations */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Action Items</h3>
        <div className="space-y-3">
          {[
            { text: 'Enable early payment discounts', impact: 'Potential savings: $240/month' },
            { text: 'Connect Wise integration', impact: 'Reduce international fees by 60%' },
            { text: 'Review AWS spending', impact: 'Investigate $2,400 spike this month' },
            { text: 'Schedule quarterly vendor review', impact: 'Negotiate rates for high-volume vendors' },
            { text: 'Increase FlowCredit limit', impact: 'Prepare for Q1 seasonal spending' },
          ].map((item, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 border rounded-lg hover:bg-accent">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                {idx + 1}
              </span>
              <div className="flex-1">
                <p className="text-sm font-medium">{item.text}</p>
                <p className="text-xs text-muted-foreground">{item.impact}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Performance vs Goals */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Performance vs Goals</h3>
        <div className="space-y-4">
          {[
            { goal: 'Monthly Revenue Target', target: 120000, actual: 124800, pct: 104 },
            { goal: 'Expense Budget', target: 100000, actual: 98200, pct: 98 },
            { goal: 'Buffer Maintenance', target: 5000, actual: 5000, pct: 100 },
            { goal: 'Payment Success Rate', target: 95, actual: 98, pct: 103 },
          ].map((metric, idx) => (
            <div key={idx}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{metric.goal}</span>
                <div className="text-right">
                  <span className="text-sm font-bold">{metric.pct}%</span>
                  <CheckCircle2 className="inline h-4 w-4 text-green-500 ml-1" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Progress value={metric.pct > 100 ? 100 : metric.pct} className="h-2" />
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {typeof metric.actual === 'number' && metric.actual > 1000
                    ? `$${metric.actual.toLocaleString()}`
                    : metric.actual}
                  {' / '}
                  {typeof metric.target === 'number' && metric.target > 1000
                    ? `$${metric.target.toLocaleString()}`
                    : metric.target}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Footer */}
      <Card className="p-4 bg-muted/50">
        <div className="text-xs text-muted-foreground space-y-1">
          <p>Report generated by FlowPay AI on {format(new Date(), 'PPP')} at {format(new Date(), 'p')}</p>
          <p>All data is based on transactions through November 24, 2025</p>
          <p>Forecasts are estimates based on historical patterns</p>
        </div>
      </Card>
    </div>
  );
}
