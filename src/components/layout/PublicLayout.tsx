import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Shield, Menu, X, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';

export default function PublicLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAF7] text-[#172018] antialiased selection:bg-[#055926]/20 selection:text-[#055926]">
      {/* Top Banner / Announcement on mobile/web */}
      <div className="bg-[#1F2937] text-white py-2 px-4 text-center text-xs font-medium flex items-center justify-center gap-2">
        <span className="flex h-2 w-2 rounded-full bg-[#D4A72C] animate-pulse" />
        <span>Nigeria's premier digital Ajo & Esusu management system</span>
        <span className="hidden sm:inline text-gray-400">|</span>
        <Link to="/pricing" className="hidden sm:inline-flex items-center gap-1 text-[#D4A72C] font-semibold hover:underline">
          <span>See live pricing</span>
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      {/* Main Header Bar */}
      <header className="sticky top-0 z-50 w-full border-b border-[#EAE8DF] bg-[#FAFAF7]/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-2.5 hover:opacity-95 transition-opacity">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#055926] shadow-sm ring-1 ring-black/5">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-[#172018] leading-none">
                AJOMI
              </span>
              <span className="text-[10px] font-semibold tracking-wider text-[#055926] uppercase">
                Savings & Esusu
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7">
            <Link 
              to="/" 
              className={`text-sm font-semibold transition-colors ${
                location.pathname === '/' ? 'text-[#055926]' : 'text-[#1F2937]/80 hover:text-[#055926]'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/#features" 
              className="text-sm font-semibold text-[#1F2937]/80 hover:text-[#055926] transition-colors"
            >
              Features
            </Link>
            <Link 
              to="/pricing" 
              className={`text-sm font-semibold transition-colors flex items-center gap-1 ${
                location.pathname === '/pricing' ? 'text-[#055926]' : 'text-[#1F2937]/80 hover:text-[#055926]'
              }`}
            >
              Pricing
              <span className="rounded-full bg-[#fcf9ee] border border-[#D4A72C]/40 px-1.5 py-0.2 text-[10px] font-bold text-[#986d15]">
                New
              </span>
            </Link>
          </nav>

          {/* Action CTAs (Desktop) */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" className="text-sm font-semibold text-[#1F2937] hover:bg-black/5">
                Log in
              </Button>
            </Link>
            <Link to="/register">
              <Button className="text-sm font-bold shadow-md shadow-[#055926]/20">
                Get Started Free
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <Link to="/login">
              <button 
                type="button" 
                className="px-3 py-1.5 text-xs font-semibold text-[#055926] rounded-lg border border-[#055926]/30 bg-[#f0f7f2]"
              >
                Log In
              </button>
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-[#172018] hover:bg-gray-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-[#EAE8DF] bg-white px-4 pt-3 pb-6 space-y-4 shadow-xl animate-in slide-in-from-top-2 duration-150">
            <div className="flex flex-col space-y-3">
              <Link 
                to="/" 
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl px-3 py-2 text-base font-semibold text-[#172018] hover:bg-[#FAFAF7]"
              >
                Home
              </Link>
              <Link 
                to="/#features" 
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl px-3 py-2 text-base font-semibold text-[#172018] hover:bg-[#FAFAF7]"
              >
                Features
              </Link>
              <Link 
                to="/pricing" 
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl px-3 py-2 text-base font-semibold text-[#055926] bg-[#f0f7f2] flex items-center justify-between"
              >
                <span>Pricing & Plans</span>
                <span className="rounded-full bg-[#D4A72C] text-[#172018] px-2 py-0.5 text-[10px] font-bold">
                  Compare
                </span>
              </Link>
            </div>
            
            <div className="pt-2 border-t border-gray-100 flex flex-col gap-2">
              <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="w-full">
                <Button className="w-full justify-center text-sm font-bold py-3 shadow-md">
                  Create Free Account
                </Button>
              </Link>
              <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="w-full">
                <Button variant="outline" className="w-full justify-center text-sm font-medium py-3 border-[#EAE8DF]">
                  Log In to Business
                </Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Premium Footer */}
      <footer className="border-t border-[#1F2937]/10 bg-[#1F2937] text-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-10 border-b border-gray-700/60">
            
            {/* Brand column */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#055926]">
                  <Shield className="h-5 w-5 text-[#D4A72C]" />
                </div>
                <span className="text-2xl font-extrabold tracking-tight text-white">AJOMI</span>
              </div>
              <p className="text-sm text-gray-300 max-w-sm leading-relaxed">
                Empowering daily savings collectors, Ajo thrift societies, and cooperative organizations with bank-grade digital ledgers, real-time receipts, and automated payouts.
              </p>
              <div className="flex items-center gap-2 text-xs text-[#D4A72C]">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Engineered for Nigerian & West African Microfinance</span>
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">Platform</h4>
              <ul className="space-y-2.5 text-sm text-gray-300">
                <li><Link to="/" className="hover:text-white transition-colors">Overview</Link></li>
                <li><Link to="/#features" className="hover:text-white transition-colors">Daily Tracking</Link></li>
                <li><Link to="/pricing" className="hover:text-[#D4A72C] transition-colors font-medium">Pricing Plans</Link></li>
                <li><Link to="/login" className="hover:text-white transition-colors">Field Collector Portal</Link></li>
              </ul>
            </div>

            {/* Legal & Security */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">Security & Trust</h4>
              <ul className="space-y-2.5 text-sm text-gray-300">
                <li className="flex items-center gap-1.5 text-xs text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>256-Bit SSL Encrypted</span>
                </li>
                <li><span className="text-gray-400">Row Level Multi-Tenancy</span></li>
                <li><span className="text-gray-400">Automated Audit Trails</span></li>
                <li><Link to="/pricing" className="text-[#D4A72C] hover:underline">14-Day Free Trial</Link></li>
              </ul>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
            <p>© {new Date().getFullYear()} AJOMI Financial Systems Ltd. All rights reserved.</p>
            <div className="flex gap-6">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
              <span>Security Whitepaper</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
