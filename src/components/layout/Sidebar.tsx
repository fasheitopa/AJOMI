import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  PiggyBank, 
  Wallet, 
  ArrowRightLeft, 
  Banknote, 
  History, 
  Briefcase, 
  BarChart3,
  Settings,
  Shield,
  Sparkles
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAuth } from '../../contexts/AuthContext';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Customers', href: '/dashboard/customers', icon: Users },
  { name: 'Savings Plans', href: '/dashboard/savings', icon: PiggyBank },
  { name: 'Contributions', href: '/dashboard/contributions', icon: Wallet },
  { name: 'Payouts', href: '/dashboard/payouts', icon: ArrowRightLeft },
  { name: 'Loans & Advances', href: '/dashboard/loans', icon: Banknote },
  { name: 'Audit & Transactions', href: '/dashboard/transactions', icon: History },
  { name: 'Field Staff', href: '/dashboard/staff', icon: Briefcase },
  { name: 'Reports & Export', href: '/dashboard/reports', icon: BarChart3 },
];

export function Sidebar() {
  const { tenant } = useAuth();
  
  return (
    <div className="flex h-full w-64 flex-col border-r border-[#EAE8DF] bg-white text-[#172018]">
      {/* Header / Brand */}
      <div className="flex h-16 shrink-0 items-center px-6 border-b border-[#EAE8DF]">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#055926] shadow-sm">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-base font-extrabold tracking-tight text-[#172018] truncate leading-tight">
              {tenant?.name || 'AJOMI'}
            </span>
            <span className="text-[10px] font-semibold text-[#055926] uppercase tracking-wider">
              {tenant?.currency || 'NGN'} Ledger
            </span>
          </div>
        </div>
      </div>
      
      {/* Navigation List */}
      <div className="flex flex-1 flex-col overflow-y-auto px-3 py-4">
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) => cn(
                "group flex items-center rounded-xl px-3 py-2.5 text-sm font-semibold transition-all active:scale-98",
                isActive 
                  ? "bg-[#055926] text-white shadow-sm" 
                  : "text-[#1F2937]/75 hover:bg-[#FAFAF7] hover:text-[#055926]"
              )}
            >
              {({ isActive }) => (
                <>
                  <item.icon 
                    className={cn(
                      "mr-3 h-5 w-5 flex-shrink-0 transition-colors",
                      isActive ? "text-[#D4A72C]" : "text-[#586359] group-hover:text-[#055926]"
                    )} 
                    aria-hidden="true" 
                  />
                  {item.name}
                </>
              )}
            </NavLink>
          ))}
        </nav>
        
        {/* Bottom Section */}
        <div className="mt-6 border-t border-[#EAE8DF] pt-4 space-y-3">
          <NavLink
            to="/dashboard/settings"
            className={({ isActive }) => cn(
              "group flex items-center rounded-xl px-3 py-2.5 text-sm font-semibold transition-all active:scale-98",
              isActive 
                ? "bg-[#055926] text-white shadow-sm" 
                : "text-[#1F2937]/75 hover:bg-[#FAFAF7] hover:text-[#055926]"
            )}
          >
            {({ isActive }) => (
              <>
                <Settings 
                  className={cn(
                    "mr-3 h-5 w-5 flex-shrink-0",
                    isActive ? "text-[#D4A72C]" : "text-[#586359] group-hover:text-[#055926]"
                  )} 
                />
                Settings
              </>
            )}
          </NavLink>

          {/* Mini Subscription Status Pill */}
          <div className="rounded-2xl border border-[#D4A72C]/30 bg-[#fcf9ee] p-3">
            <div className="flex items-center justify-between text-xs font-bold text-[#172018]">
              <span className="flex items-center gap-1">
                <Sparkles className="h-3 w-3 text-[#D4A72C]" />
                Growth Tier
              </span>
              <span className="rounded-full bg-[#D4A72C] text-[#172018] px-1.5 py-0.2 text-[9px] font-black">
                ACTIVE
              </span>
            </div>
            <p className="mt-1 text-[11px] text-[#586359]">
              Unlimited collectors & daily SMS receipts
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
