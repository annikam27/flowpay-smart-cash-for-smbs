import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { TrendingUp, DollarSign, Shield, Clock, Plus, Building, Landmark, CheckCircle, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const Dashboard = () => {
  const { user } = useAuth();

  // Mock data
  const topMetrics = [
    {
      title: 'Available Cash',
      value: '$8,400',
      change: '+$2,100',
      trend: 'up',
      icon: DollarSign,
    },
    {
      title: 'Buffer Status',
      value: '$5,000 / $5,000',
      status: 'Target met',
      trend: 'success',
      icon: Shield,
    },
    {
      title: 'Pending Payments',
      value: '3 payments',
      subtitle: '$6,200 total',
      trend: 'neutral',
      icon: Clock,
    },
    {
      title: 'Next 30 Days',
      value: '+$4,000',
      change: 'Net forecast',
      trend: 'up',
      icon: TrendingUp,
    },
  ];

  const forecastData = [
    { date: '11/21', in: 5000, out: 2000 },
    { date: '11/24', in: 4200, out: 3000 },
    { date: '11/27', in: 6000, out: 4000 },
    { date: '11/30', in: 5500, out: 3500 },
    { date: '12/03', in: 7000, out: 4500 },
    { date: '12/06', in: 6200, out: 3800 },
    { date: '12/09', in: 5800, out: 3200 },
    { date: '12/12', in: 6500, out: 4200 },
    { date: '12/15', in: 7200, out: 4800 },
    { date: '12/18', in: 6800, out: 4000 },
  ];

  const upcomingPayments = [
    { id: 1, vendor: 'Web Designer Tom', amount: 2400, dueDate: 'Today', status: 'Scheduled' },
    { id: 2, vendor: 'AWS', amount: 890, dueDate: 'Tomorrow', status: 'Scheduled' },
    { id: 3, vendor: 'Office Supplies Co', amount: 450, dueDate: 'In 3 days', status: 'Pending Approval' },
    { id: 4, vendor: 'Marketing Agency', amount: 3200, dueDate: 'In 5 days', status: 'Scheduled' },
    { id: 5, vendor: 'Software Licenses', amount: 1260, dueDate: 'In 7 days', status: 'Scheduled' },
  ];

  const recentActivity = [
    { id: 1, text: 'Payment received: $5,000 from ClientCorp', time: '2 hours ago', icon: ArrowDownRight, color: 'text-success' },
    { id: 2, text: 'Auto-allocated: Designer paid $2,400', time: '4 hours ago', icon: ArrowUpRight, color: 'text-destructive' },
    { id: 3, text: 'Buffer restored to $5,000', time: '1 day ago', icon: CheckCircle, color: 'text-success' },
    { id: 4, text: 'Payment scheduled: AWS $890', time: '1 day ago', icon: Clock, color: 'text-muted-foreground' },
    { id: 5, text: 'New vendor added: Marketing Agency', time: '2 days ago', icon: Building, color: 'text-muted-foreground' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome section */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Welcome back, {user?.businessName}!
          </h1>
          <p className="text-muted-foreground mt-2">
            Here's what's happening with your cash flow today.
          </p>
        </div>

        {/* Top Metrics Row */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {topMetrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <Card key={metric.title} className="shadow-elegant hover:shadow-elegant-lg transition-all hover:scale-105">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {metric.title}
                  </CardTitle>
                  <Icon className={`h-5 w-5 ${metric.trend === 'success' ? 'text-success' : metric.trend === 'up' ? 'text-primary' : 'text-muted-foreground'}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{metric.value}</div>
                  {metric.change && (
                    <p className={`text-xs flex items-center mt-1 gap-1 ${metric.trend === 'up' ? 'text-success' : 'text-muted-foreground'}`}>
                      {metric.trend === 'up' && <TrendingUp className="h-3 w-3" />}
                      {metric.change}
                    </p>
                  )}
                  {metric.status && (
                    <p className="text-xs flex items-center mt-1 gap-1 text-success">
                      <CheckCircle className="h-3 w-3" />
                      {metric.status}
                    </p>
                  )}
                  {metric.subtitle && (
                    <p className="text-xs text-muted-foreground mt-1">{metric.subtitle}</p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Cash Flow Forecast Chart */}
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle>30-Day Cash Flow Forecast</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={forecastData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis 
                  dataKey="date" 
                  className="text-xs"
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                />
                <YAxis 
                  className="text-xs"
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  tickFormatter={(value) => `$${value / 1000}k`}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: 'hsl(var(--foreground))' }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="in" 
                  stroke="hsl(var(--success))" 
                  strokeWidth={2}
                  name="Projected In"
                  dot={{ fill: 'hsl(var(--success))' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="out" 
                  stroke="hsl(var(--destructive))" 
                  strokeWidth={2}
                  name="Projected Out"
                  dot={{ fill: 'hsl(var(--destructive))' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Upcoming Payments */}
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle>Upcoming Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {upcomingPayments.map((payment) => (
                    <TableRow key={payment.id} className="hover:bg-muted/50">
                      <TableCell>
                        <div className="flex items-center gap-2">
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
                      <TableCell className="text-muted-foreground">
                        {payment.dueDate}
                      </TableCell>
                      <TableCell>
                        <Badge variant={payment.status === 'Scheduled' ? 'default' : 'secondary'}>
                          {payment.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-4">
                <Button variant="outline" className="w-full">View All Payments</Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => {
                  const ActivityIcon = activity.icon;
                  return (
                    <div key={activity.id} className="flex gap-4 items-start">
                      <div className={`rounded-full p-2 bg-muted ${activity.color}`}>
                        <ActivityIcon className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{activity.text}</p>
                        <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4">
                <Button variant="outline" className="w-full">View All Activity</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Schedule Payment
              </Button>
              <Button variant="outline" className="gap-2">
                <Building className="h-4 w-4" />
                Add Vendor
              </Button>
              <Button variant="outline" className="gap-2">
                <Landmark className="h-4 w-4" />
                Connect Bank
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
