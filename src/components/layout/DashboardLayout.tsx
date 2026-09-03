import { useState } from 'react';
import { Outlet, Navigate, NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Wallet, 
  PiggyBank, 
  MoreHorizontal,
  X,
  History,
  Banknote,
  Briefcase,
  BarChart3,
  Settings,
  ArrowRightLeft,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { cn } from '../../lib/utils';

export default function DashboardLayout() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const mobileNavItems = [
    { name: 'Home', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Customers', href: '/dashboard/customers', icon: Users },
    { name: 'Savings', href: '/dashboard/savings', icon: PiggyBank },
    { name: 'Collections', href: '/dashboard/contributions', icon: Wallet },
  ];

  const secondaryNavItems = [
    { name: 'Payouts', href: '/dashboard/payouts', icon: ArrowRightLeft },
    { name: 'Loans & Advances', href: '/dashboard/loans', icon: Banknote },
    { name: 'Audit & Transactions', href: '/dashboard/transactions', icon: History },
    { name: 'Field Staff', href: '/dashboard/staff', icon: Briefcase },
    { name: 'Reports & Export', href: '/dashboard/reports', icon: BarChart3 },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-[#FAFAF7] text-[#172018]">
      {/* Desktop Sidebar (hidden on mobile) */}
      <div className="hidden md:flex md:shrink-0">
        <Sidebar />
      </div>

      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        
        {/* Main Content Viewport */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pb-24 md:pb-8">
          <Outlet />
        </main>
      </div>

      {/* ================= MOBILE BOTTOM NAVIGATION (App-like feel) ================= */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-[#EAE8DF] bg-white/95 backdrop-blur-md px-2 py-1.5 shadow-lg">
        <div className="flex items-center justify-around">
          {mobileNavItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <NavLink
                key={item.name}
                to={item.href}
                className={cn(
                  "flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all active:scale-95",
                  isActive ? "text-[#055926]" : "text-[#586359] hover:text-[#172018]"
                )}
              >
                <item.icon className={cn("h-5 w-5", isActive && "stroke-[2.5]")} />
                <span className={cn("text-[10px] font-semibold mt-0.5", isActive ? "text-[#055926] font-bold" : "text-[#586359]")}>
                  {item.name}
                </span>
              </NavLink>
            );
          })}

          {/* "More" Trigger for mobile drawer */}
          <button
            type="button"
            onClick={() => setMobileDrawerOpen(true)}
            className="flex flex-col items-center justify-center py-1 px-3 rounded-xl text-[#586359] hover:text-[#172018] active:scale-95"
          >
            <MoreHorizontal className="h-5 w-5" />
            <span className="text-[10px] font-semibold mt-0.5 text-[#586359]">
              More
            </span>
          </button>
        </div>
      </div>

      {/* ================= MOBILE "MORE" SLIDE-UP DRAWER ================= */}
      {mobileDrawerOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex flex-col justify-end bg-black/50 backdrop-blur-xs">
          <div className="rounded-t-3xl border-t border-[#EAE8DF] bg-white p-6 shadow-2xl animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#055926]" />
                <h3 className="font-bold text-[#172018] text-base">All Modules</h3>
              </div>
              <button
                type="button"
                onClick={() => setMobileDrawerOpen(false)}
                className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              {secondaryNavItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileDrawerOpen(false)}
                  className="flex items-center gap-3 rounded-2xl border border-[#EAE8DF] bg-[#FAFAF7] p-3 text-xs font-semibold text-[#172018] hover:border-[#055926] active:scale-98 transition-all"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#055926] text-white">
                    <item.icon className="h-4 w-4" />
                  </div>
                  <span>{item.name}</span>
                </NavLink>
              ))}
            </div>

            <div className="mt-5 rounded-2xl bg-[#f0f7f2] border border-[#dceed2] p-3 text-center">
              <p className="text-xs font-bold text-[#055926]">AJOMI FinTech Mobile Suite</p>
              <p className="text-[11px] text-[#586359] mt-0.5">Automated Thrift & Cooperative Management</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

