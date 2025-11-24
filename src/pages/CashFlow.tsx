import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import {
  CheckCircle,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Lightbulb,
  Calendar,
  DollarSign,
  ArrowUp,
  ArrowDown,
  BarChart3,
} from 'lucide-react';

// Generate realistic forecast data
const generateForecastData = (days: number) => {
  const data = [];
  const startDate = new Date('2025-11-20');
  
  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    
    // Skip weekends for most activity
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const isMonthEnd = date.getDate() > 25;
    
    // Base amounts with patterns
    let incoming = isWeekend ? 0 : 1000 + Math.random() * 2000;
    let outgoing = isWeekend ? 0 : 800 + Math.random() * 1500;
    
    // Month-end spike
    if (isMonthEnd) {
      incoming += 5000;
      outgoing += 3000;
    }
    
    // Tuesday/Friday pattern (higher activity)
    if (date.getDay() === 2 || date.getDay() === 5) {
      incoming *= 1.5;
      outgoing *= 1.2;
    }
    
    // Problem day on Dec 7
    if (date.getDate() === 7 && date.getMonth() === 11) {
      outgoing += 3500;
    }
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      fullDate: date.toISOString(),
      incoming: Math.round(incoming),
      outgoing: Math.round(outgoing),
      balance: 0, // Will calculate cumulative
    });
  }
  
  // Calculate cumulative balance
  let runningBalance = 8400; // Starting balance
  data.forEach((item) => {
    runningBalance += item.incoming - item.outgoing;
    item.balance = Math.round(runningBalance);
  });
  
  return data;
};

const mockObligations = [
  {
    id: 1,
    date: '2025-11-21',
    type: 'income' as const,
    amount: 5000,
    title: 'Client ABC Payment',
    description: 'Invoice #1234',
  },
  {
    id: 2,
    date: '2025-11-22',
    type: 'expense' as const,
    amount: 2400,
    title: 'Web Designer Tom',
    description: 'Monthly retainer',
  },
  {
    id: 3,
    date: '2025-11-25',
    type: 'expense' as const,
    amount: 890,
    title: 'AWS',
    description: 'Cloud hosting',
  },
  {
    id: 4,
    date: '2025-11-26',
    type: 'income' as const,
    amount: 8500,
    title: 'Client XYZ Payment',
    description: 'Project completion',
  },
  {
    id: 5,
    date: '2025-12-01',
    type: 'expense' as const,
    amount: 4200,
    title: 'Developer Jane',
    description: 'Contract payment',
  },
  {
    id: 6,
    date: '2025-12-05',
    type: 'income' as const,
    amount: 3200,
    title: 'Subscription Revenue',
    description: 'Monthly SaaS',
  },
  {
    id: 7,
    date: '2025-12-07',
    type: 'expense' as const,
    amount: 5600,
    title: 'Marketing Campaign',
    description: 'Q4 Ad spend',
  },
];

const insights = [
  {
    id: 1,
    icon: AlertTriangle,
    color: 'text-destructive',
    bgColor: 'bg-destructive/10',
    title: 'Potential shortfall on Dec 7th',
    description: 'Cash balance may drop to $2,100 due to marketing payment',
    recommendation: 'Consider using FlowCredit bridge loan ($3,500 for 7 days at $8.75)',
    action: 'Solve This',
    priority: 'high',
  },
  {
    id: 2,
    icon: Lightbulb,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    title: 'Early payment opportunity',
    description: 'Client ABC pays in 5 days. Consider offering 2% discount for immediate payment',
    recommendation: 'Potential $100 savings vs. waiting, improves cash position',
    action: 'Contact Client',
    priority: 'medium',
  },
  {
    id: 3,
    icon: CheckCircle,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    title: 'Healthy cash position',
    description: 'Your buffer will remain above target for the next 30 days',
    recommendation: 'No immediate action needed. Continue monitoring',
    action: null,
    priority: 'low',
  },
  {
    id: 4,
    icon: BarChart3,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    title: 'Pattern detected: Tuesday & Friday peaks',
    description: 'Historical data shows 65% of payments arrive on these days',
    recommendation: 'Schedule outgoing payments for Wednesdays to optimize timing',
    action: 'View Schedule',
    priority: 'low',
  },
];

const CashFlow = () => {
  const [timeRange, setTimeRange] = useState<'30' | '60' | '90'>('30');
  const [whatIfAmount, setWhatIfAmount] = useState('');
  const [whatIfDate, setWhatIfDate] = useState('');
  const [showWhatIfResult, setShowWhatIfResult] = useState(false);
  
  const forecastData = generateForecastData(90).slice(0, parseInt(timeRange));
  
  const totalIncoming = forecastData.reduce((sum, item) => sum + item.incoming, 0);
  const totalOutgoing = forecastData.reduce((sum, item) => sum + item.outgoing, 0);
  const netChange = totalIncoming - totalOutgoing;
  const confidence = 85;
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };
  
  const getHealthColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-destructive';
  };
  
  const getHealthStatus = (score: number) => {
    if (score >= 80) return 'Healthy';
    if (score >= 60) return 'Moderate';
    return 'At Risk';
  };
  
  const handleCalculateWhatIf = () => {
    setShowWhatIfResult(true);
  };
  
  const whatIfResult = whatIfAmount ? 8400 - parseInt(whatIfAmount) : 0;
  const bufferSafe = whatIfResult >= 5000;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Cash Flow Forecast</h1>
          <p className="text-muted-foreground mt-1">
            AI-powered predictions for the next {timeRange} days
          </p>
        </div>

        {/* Key Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Current Position */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Current Position</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Available Cash</div>
                <div className="text-2xl font-bold text-foreground">$8,400</div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">In Buffer</span>
                <span className="font-medium text-foreground flex items-center gap-1">
                  $5,000 <CheckCircle className="h-4 w-4 text-green-600" />
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Committed</span>
                <span className="font-medium text-foreground">$6,200</span>
              </div>
              <div className="pt-3 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">Truly Available</span>
                  <span className="text-xl font-bold text-green-600">$2,200</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 2: 30-Day Forecast */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{timeRange}-Day Forecast</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Expected In</span>
                <span className="font-medium text-green-600 flex items-center gap-1">
                  {formatCurrency(totalIncoming)}
                  <TrendingUp className="h-4 w-4" />
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Expected Out</span>
                <span className="font-medium text-destructive flex items-center gap-1">
                  {formatCurrency(totalOutgoing)}
                  <TrendingDown className="h-4 w-4" />
                </span>
              </div>
              <div className="pt-3 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">Net Change</span>
                  <span className="text-xl font-bold text-green-600 flex items-center gap-1">
                    {netChange > 0 ? '+' : ''}{formatCurrency(netChange)}
                    <ArrowUp className="h-5 w-5" />
                  </span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">AI Confidence</span>
                  <span className="font-medium text-foreground">{confidence}%</span>
                </div>
                <Progress value={confidence} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Card 3: Health Score */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Health Score</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-center">
                <div className="relative">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      className="text-muted"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={`${(87 / 100) * 351.86} 351.86`}
                      className="text-green-600"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-3xl font-bold text-foreground">87</span>
                    <span className="text-xs text-muted-foreground">/100</span>
                  </div>
                </div>
              </div>
              <div className="text-center space-y-1">
                <div className={`text-lg font-semibold ${getHealthColor(87)}`}>
                  {getHealthStatus(87)}
                </div>
                <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                  <ArrowUp className="h-4 w-4 text-green-600" />
                  +5 from last month
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Interactive Forecast Chart */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Cash Flow Forecast</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Projected incoming, outgoing, and balance
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="gap-1">
                  AI Confidence: {confidence}%
                </Badge>
                <Select value={timeRange} onValueChange={(value: any) => setTimeRange(value)}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 Days</SelectItem>
                    <SelectItem value="60">60 Days</SelectItem>
                    <SelectItem value="90">90 Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={forecastData}>
                <defs>
                  <linearGradient id="colorIncoming" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorOutgoing" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12 }}
                  className="text-muted-foreground"
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  className="text-muted-foreground"
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                  formatter={(value: any) => formatCurrency(value)}
                />
                <ReferenceLine
                  y={5000}
                  stroke="hsl(var(--primary))"
                  strokeDasharray="5 5"
                  label={{ value: 'Buffer Target', position: 'right', fontSize: 12 }}
                />
                <Area
                  type="monotone"
                  dataKey="incoming"
                  stroke="hsl(var(--chart-2))"
                  fill="url(#colorIncoming)"
                  name="Incoming"
                />
                <Area
                  type="monotone"
                  dataKey="outgoing"
                  stroke="hsl(var(--destructive))"
                  fill="url(#colorOutgoing)"
                  name="Outgoing"
                />
                <Area
                  type="monotone"
                  dataKey="balance"
                  stroke="hsl(var(--primary))"
                  fill="transparent"
                  strokeWidth={2}
                  name="Balance"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Obligations Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Obligations</CardTitle>
              <p className="text-sm text-muted-foreground">Next 30 days</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockObligations.map((obligation) => {
                  const date = new Date(obligation.date);
                  const today = new Date('2025-11-20');
                  const daysAway = Math.ceil(
                    (date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
                  );
                  
                  return (
                    <div
                      key={obligation.id}
                      className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                    >
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          obligation.type === 'income'
                            ? 'bg-green-100 text-green-600'
                            : 'bg-red-100 text-destructive'
                        }`}
                      >
                        {obligation.type === 'income' ? (
                          <TrendingUp className="h-6 w-6" />
                        ) : (
                          <TrendingDown className="h-6 w-6" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div className="font-medium text-foreground truncate">
                            {obligation.title}
                          </div>
                          <div
                            className={`font-semibold ${
                              obligation.type === 'income'
                                ? 'text-green-600'
                                : 'text-destructive'
                            }`}
                          >
                            {obligation.type === 'income' ? '+' : '-'}
                            {formatCurrency(obligation.amount)}
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {obligation.description}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                          <Calendar className="h-3 w-3" />
                          {daysAway === 0
                            ? 'Today'
                            : daysAway === 1
                            ? 'Tomorrow'
                            : `In ${daysAway} days`}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* What-If Scenarios */}
          <Card>
            <CardHeader>
              <CardTitle>What-If Scenario</CardTitle>
              <p className="text-sm text-muted-foreground">
                See the impact of a planned expense
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="whatIfAmount">Expense Amount</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                    $
                  </span>
                  <Input
                    id="whatIfAmount"
                    type="number"
                    placeholder="5000"
                    value={whatIfAmount}
                    onChange={(e) => setWhatIfAmount(e.target.value)}
                    className="pl-7"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="whatIfDate">Expected Date</Label>
                <Input
                  id="whatIfDate"
                  type="date"
                  value={whatIfDate}
                  onChange={(e) => setWhatIfDate(e.target.value)}
                  min="2025-11-20"
                />
              </div>

              <Button
                onClick={handleCalculateWhatIf}
                disabled={!whatIfAmount || !whatIfDate}
                className="w-full"
              >
                Calculate Impact
              </Button>

              {showWhatIfResult && whatIfAmount && (
                <div className="p-4 border rounded-lg space-y-3 bg-muted/50">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Your cash would drop to:
                    </span>
                    <span className="text-xl font-bold text-foreground">
                      {formatCurrency(whatIfResult)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Buffer status:</span>
                    {bufferSafe ? (
                      <Badge variant="secondary" className="gap-1">
                        <CheckCircle className="h-3 w-3" />
                        Safe
                      </Badge>
                    ) : (
                      <Badge variant="destructive" className="gap-1">
                        <AlertTriangle className="h-3 w-3" />
                        Below Target
                      </Badge>
                    )}
                  </div>
                  {!bufferSafe && (
                    <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-lg">
                      ⚠️ This expense would bring your buffer below the $5,000 target.
                      Consider using FlowCredit or delaying this expense.
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Cash Flow Insights */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-4">AI Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {insights.map((insight) => {
              const Icon = insight.icon;
              return (
                <Card key={insight.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg ${insight.bgColor}`}>
                        <Icon className={`h-6 w-6 ${insight.color}`} />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="font-semibold text-foreground">{insight.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {insight.description}
                        </div>
                        {insight.recommendation && (
                          <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                            💡 {insight.recommendation}
                          </div>
                        )}
                        {insight.action && (
                          <Button variant="outline" size="sm" className="mt-2">
                            {insight.action}
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CashFlow;
