import { Bell, Search, LogOut, Shield } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';

export function Header() {
  const { user, logout, tenant } = useAuth();

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-[#EAE8DF] bg-white px-4 sm:px-6 lg:px-8 text-[#172018] z-10">
      {/* Search Input (Desktop & Tablet) */}
      <div className="flex flex-1 items-center max-w-xs sm:max-w-md">
        <div className="flex w-full items-center rounded-2xl border border-[#EAE8DF] bg-[#FAFAF7] px-3.5 py-2 text-sm focus-within:ring-2 focus-within:ring-[#055926]/30 focus-within:border-[#055926] transition-all">
          <Search className="mr-2 h-4 w-4 text-[#586359] shrink-0" />
          <input 
            type="text" 
            placeholder="Search savers, cards, transactions..." 
            className="w-full bg-transparent text-xs sm:text-sm text-[#172018] focus:outline-none placeholder:text-[#586359]/70"
          />
        </div>
      </div>

      {/* Mobile Brand Title (visible only on small screens) */}
      <div className="flex md:hidden items-center gap-1.5 ml-2 mr-auto">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#055926] text-white">
          <Shield className="h-4 w-4" />
        </div>
        <span className="text-xs font-black tracking-tight text-[#172018]">AJOMI</span>
      </div>

      {/* Right controls: Notifications + User Profile */}
      <div className="flex items-center gap-2 sm:gap-4 ml-auto">
        <button 
          type="button"
          className="relative rounded-xl p-2 text-[#586359] hover:bg-[#FAFAF7] hover:text-[#172018] transition-colors"
          title="Notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 block h-2 w-2 rounded-full bg-[#D4A72C] ring-2 ring-white" />
        </button>

        <div className="h-6 w-px bg-[#EAE8DF] hidden sm:block" />

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-xs sm:text-sm font-bold text-[#172018] leading-tight">
              {user?.name || 'Administrator'}
            </span>
            <span className="text-[11px] font-medium text-[#055926] capitalize">
              {user?.role ? user.role.replace('_', ' ') : 'Manager'}
            </span>
          </div>

          {/* User Avatar */}
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#055926] text-white text-xs font-black shadow-xs ring-2 ring-[#055926]/10">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
          </div>

          {/* Logout */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={logout} 
            title="Log out"
            className="text-[#586359] hover:text-rose-600 hover:bg-rose-50 rounded-xl"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
