import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, DollarSign, AlertCircle } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Current Balance',
      value: '$124,350',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
    },
    {
      title: 'Projected 30-Day',
      value: '$98,240',
      change: '-5.2%',
      trend: 'down',
      icon: TrendingDown,
    },
    {
      title: 'Outstanding Payments',
      value: '$42,150',
      change: '8 pending',
      trend: 'neutral',
      icon: AlertCircle,
    },
    {
      title: 'Monthly Revenue',
      value: '$186,920',
      change: '+18.2%',
      trend: 'up',
      icon: TrendingUp,
    },
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

        {/* Stats grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className="shadow-elegant hover:shadow-elegant-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <p
                    className={`text-xs flex items-center mt-1 ${
                      stat.trend === 'up'
                        ? 'text-success'
                        : stat.trend === 'down'
                        ? 'text-destructive'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {stat.trend === 'up' && <TrendingUp className="h-3 w-3 mr-1" />}
                    {stat.trend === 'down' && <TrendingDown className="h-3 w-3 mr-1" />}
                    {stat.change} from last month
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick actions */}
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Your dashboard is ready! Start exploring the sidebar to manage payments, vendors, and
              view detailed cash flow analytics.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
