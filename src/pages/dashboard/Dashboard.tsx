import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { formatCurrency } from '../../lib/utils';
import { 
  Users, 
  Wallet, 
  Banknote, 
  PieChart, 
  PlusCircle, 
  ArrowUpRight, 
  ArrowDownLeft, 
  UserPlus, 
  Sparkles,
  TrendingUp,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockChartData = [
  { name: 'Mon', collections: 40000 },
  { name: 'Tue', collections: 52000 },
  { name: 'Wed', collections: 48000 },
  { name: 'Thu', collections: 61000 },
  { name: 'Fri', collections: 59000 },
  { name: 'Sat', collections: 85000 },
  { name: 'Sun', collections: 91000 },
];

const mockRecentActivity = [
  { id: 'tx_1', type: 'Daily Contribution', customer: 'John Doe', amount: 5000, date: '2 mins ago', status: 'Completed', agent: 'Agent Tayo' },
  { id: 'tx_2', type: 'Cycle Payout', customer: 'Sarah Smith', amount: 150000, date: '1 hour ago', status: 'Pending Approval', agent: 'Main Office' },
  { id: 'tx_3', type: 'Daily Contribution', customer: 'Michael Ali', amount: 2000, date: '3 hours ago', status: 'Completed', agent: 'Agent Tayo' },
  { id: 'tx_4', type: 'Loan Repayment', customer: 'Grace Okafor', amount: 10000, date: '5 hours ago', status: 'Completed', agent: 'Agent Bisi' },
];

export default function Dashboard() {
  const { tenant } = useAuth();
  const currency = tenant?.currency || 'NGN';

  return (
    <div className="space-y-6 sm:space-y-8 max-w-7xl mx-auto">
      {/* ================= Mobile-Like Welcome Banner ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-3xl bg-[#055926] text-white p-6 sm:p-8 shadow-md relative overflow-hidden">
        <div className="relative z-10 space-y-1">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-[#D4A72C] animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#D4A72C]">
              Real-time Business Ledger
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            {tenant?.name || 'My Thrift & Esusu Co.'}
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-xl leading-relaxed">
            Welcome back. All branches and field collectors are synced with zero unresolved ledger discrepancies.
          </p>
        </div>

        {/* Action Button inside Banner */}
        <div className="relative z-10 flex items-center gap-3">
          <Link 
            to="/dashboard/contributions" 
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#D4A72C] px-5 py-3 text-xs sm:text-sm font-bold text-[#172018] shadow-sm hover:brightness-105 active:scale-95 transition-all"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Record Daily Deposit</span>
          </Link>
        </div>

        {/* Decorative background shape */}
        <div className="absolute right-0 top-0 -bottom-10 w-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* ================= Quick Mobile Action Buttons ================= */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Link 
          to="/dashboard/contributions"
          className="flex items-center gap-3 rounded-2xl border border-[#EAE8DF] bg-white p-3.5 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:border-[#055926] active:scale-98 transition-all"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f0f7f2] text-[#055926]">
            <ArrowDownLeft className="h-5 w-5" />
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-[#172018] truncate">Record Deposit</p>
            <p className="text-[10px] text-[#586359] truncate">Instant Card credit</p>
          </div>
        </Link>

        <Link 
          to="/dashboard/customers"
          className="flex items-center gap-3 rounded-2xl border border-[#EAE8DF] bg-white p-3.5 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:border-[#055926] active:scale-98 transition-all"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f0f7f2] text-[#055926]">
            <UserPlus className="h-5 w-5" />
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-[#172018] truncate">Register Saver</p>
            <p className="text-[10px] text-[#586359] truncate">New KYC member</p>
          </div>
        </Link>

        <Link 
          to="/dashboard/payouts"
          className="flex items-center gap-3 rounded-2xl border border-[#EAE8DF] bg-white p-3.5 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:border-[#055926] active:scale-98 transition-all"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#fcf9ee] text-[#986d15]">
            <ArrowUpRight className="h-5 w-5" />
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-[#172018] truncate">Approve Payout</p>
            <p className="text-[10px] text-[#586359] truncate">Mature thrift cycle</p>
          </div>
        </Link>

        <Link 
          to="/dashboard/loans"
          className="flex items-center gap-3 rounded-2xl border border-[#EAE8DF] bg-white p-3.5 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:border-[#055926] active:scale-98 transition-all"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f0f7f2] text-[#055926]">
            <Banknote className="h-5 w-5" />
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-[#172018] truncate">Loan & Advance</p>
            <p className="text-[10px] text-[#586359] truncate">Fast microcredit</p>
          </div>
        </Link>
      </div>

      {/* ================= Summary Metric Cards ================= */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Metric 1 */}
        <Card className="hover:border-[#055926]/40 transition-all">
          <CardContent className="p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-[#586359] uppercase tracking-wider">Today's Collections</p>
                <p className="mt-2 text-2xl sm:text-3xl font-black text-[#172018]">
                  {formatCurrency(142000, currency)}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f0f7f2] border border-[#dceed2]">
                <Wallet className="h-6 w-6 text-[#055926]" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs">
              <span className="font-bold text-[#055926] bg-[#f0f7f2] px-2 py-0.5 rounded-full flex items-center gap-0.5">
                <TrendingUp className="h-3 w-3" /> +12%
              </span>
              <span className="ml-2 text-[#586359]">from yesterday</span>
            </div>
          </CardContent>
        </Card>

        {/* Metric 2 */}
        <Card className="hover:border-[#055926]/40 transition-all">
          <CardContent className="p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-[#586359] uppercase tracking-wider">Active Savers</p>
                <p className="mt-2 text-2xl sm:text-3xl font-black text-[#172018]">1,248</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f0f7f2] border border-[#dceed2]">
                <Users className="h-6 w-6 text-[#055926]" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs">
              <span className="font-bold text-[#055926] bg-[#f0f7f2] px-2 py-0.5 rounded-full">
                +48
              </span>
              <span className="ml-2 text-[#586359]">onboarded this week</span>
            </div>
          </CardContent>
        </Card>

        {/* Metric 3 */}
        <Card className="hover:border-[#055926]/40 transition-all">
          <CardContent className="p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-[#586359] uppercase tracking-wider">Pending Payouts</p>
                <p className="mt-2 text-2xl sm:text-3xl font-black text-[#172018]">
                  {formatCurrency(450000, currency)}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fcf9ee] border border-[#D4A72C]/30">
                <Banknote className="h-6 w-6 text-[#986d15]" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs">
              <span className="font-bold text-[#986d15] bg-[#fcf9ee] px-2 py-0.5 rounded-full">
                12 cycles
              </span>
              <span className="ml-2 text-[#586359]">awaiting approval</span>
            </div>
          </CardContent>
        </Card>

        {/* Metric 4 */}
        <Card className="hover:border-[#055926]/40 transition-all">
          <CardContent className="p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-[#586359] uppercase tracking-wider">Estimated Commission</p>
                <p className="mt-2 text-2xl sm:text-3xl font-black text-[#055926]">
                  {formatCurrency(84500, currency)}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f0f7f2] border border-[#dceed2]">
                <PieChart className="h-6 w-6 text-[#055926]" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs">
              <span className="font-bold text-[#055926] bg-[#f0f7f2] px-2 py-0.5 rounded-full">
                Net Profit
              </span>
              <span className="ml-2 text-[#586359]">Accrued this month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ================= Charts & Recent Activity ================= */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Collection Trends Chart */}
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base sm:text-lg font-bold text-[#172018]">
                Collection Trends
              </CardTitle>
              <p className="text-xs text-[#586359]">7-day rolling deposit volume</p>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-[#055926] bg-[#f0f7f2] border border-[#dceed2] px-2.5 py-1 rounded-xl">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Verified Ledgers</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[280px] w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockChartData} margin={{ top: 5, right: 15, bottom: 5, left: -10 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EAE8DF" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#586359', fontSize: 12, fontWeight: 500 }}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#586359', fontSize: 12 }}
                    tickFormatter={(value) => `₦${value/1000}k`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#FFFFFF', 
                      borderColor: '#EAE8DF', 
                      borderRadius: '16px', 
                      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.08)',
                      color: '#172018'
                    }}
                    itemStyle={{ color: '#055926', fontWeight: 'bold' }}
                    labelStyle={{ color: '#586359', fontWeight: 600 }}
                    formatter={(value: number) => [formatCurrency(value, currency), 'Daily Total']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="collections" 
                    stroke="#055926" 
                    strokeWidth={3.5}
                    dot={{ r: 4, strokeWidth: 2, fill: '#FFFFFF', stroke: '#055926' }}
                    activeDot={{ r: 7, strokeWidth: 0, fill: '#D4A72C' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity List */}
        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base sm:text-lg font-bold text-[#172018]">
                Recent Activity
              </CardTitle>
              <p className="text-xs text-[#586359]">Latest field collections</p>
            </div>
            <Link 
              to="/dashboard/transactions" 
              className="text-xs font-bold text-[#055926] hover:underline flex items-center gap-0.5"
            >
              <span>View all</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockRecentActivity.map((activity) => (
                <div 
                  key={activity.id} 
                  className="flex items-center justify-between border-b border-[#EAE8DF]/80 pb-3 last:border-0 last:pb-0"
                >
                  <div className="space-y-0.5 pr-2">
                    <p className="text-xs sm:text-sm font-bold text-[#172018]">{activity.type}</p>
                    <p className="text-[11px] text-[#586359]">{activity.customer} • {activity.date}</p>
                    <p className="text-[10px] text-[#055926] font-medium">{activity.agent}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs sm:text-sm font-black text-[#172018]">
                      {formatCurrency(activity.amount, currency)}
                    </p>
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold border mt-1 ${
                      activity.status === 'Completed' 
                        ? 'bg-[#f0f7f2] text-[#055926] border-[#dceed2]' 
                        : 'bg-[#fcf9ee] text-[#986d15] border-[#D4A72C]/30'
                    }`}>
                      {activity.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
