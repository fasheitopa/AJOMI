import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Shield, Menu, X, ArrowRight, Sparkles, Smartphone, Download, QrCode, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Button';

export default function PublicLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
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
            <button
              type="button"
              onClick={() => setDownloadModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-bold text-[#055926] hover:text-[#033416] bg-[#f0f7f2] hover:bg-[#e3efe5] border border-[#dceed2] rounded-xl transition-all active:scale-95 shadow-xs"
              id="nav-download-app-btn"
            >
              <Smartphone className="h-4 w-4 text-[#055926]" />
              <span>Download APP</span>
            </button>
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
            <button
              type="button"
              onClick={() => setDownloadModalOpen(true)}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold text-[#055926] rounded-lg border border-[#055926]/30 bg-[#f0f7f2] active:scale-95 transition-all"
              id="mobile-download-app-btn"
            >
              <Smartphone className="h-3.5 w-3.5" />
              <span>Download APP</span>
            </button>
            <Link to="/login">
              <button 
                type="button" 
                className="px-3 py-1.5 text-xs font-semibold text-[#1F2937] rounded-lg border border-[#EAE8DF] bg-white"
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
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setDownloadModalOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 rounded-xl py-3 px-4 text-sm font-bold text-[#055926] bg-[#f0f7f2] border border-[#dceed2] hover:bg-[#e4f1e7]"
              >
                <Smartphone className="h-4 w-4" />
                <span>Download APP (Android & iOS)</span>
              </button>
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

      {/* ================= DOWNLOAD APP MODAL ================= */}
      {downloadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div 
            className="relative w-full max-w-lg rounded-3xl border border-[#EAE8DF] bg-white p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 duration-200"
            role="dialog"
            aria-modal="true"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setDownloadModalOpen(false)}
              className="absolute right-5 top-5 rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#055926] shadow-sm">
                <Smartphone className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-[#fcf9ee] border border-[#D4A72C]/40 px-2.5 py-0.5 text-[10px] font-bold text-[#986d15] mb-0.5">
                  <Sparkles className="h-3 w-3 text-[#D4A72C]" />
                  <span>Field Agent & Manager Edition</span>
                </div>
                <h3 className="text-xl font-black text-[#172018] tracking-tight">
                  Download AJOMI Mobile APP
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#586359] leading-relaxed mb-6">
              Record daily contributions on the street even without an active internet connection. Pair bluetooth thermal printers for physical receipts and send instant SMS alerts.
            </p>

            {/* Download Options */}
            <div className="space-y-3 mb-6">
              {/* Option 1: Direct Android APK */}
              <a 
                href="#download-apk" 
                onClick={(e) => {
                  e.preventDefault();
                  alert('Starting AJOMI Field Collector v2.4.1 APK download (14.8 MB)...');
                }}
                className="group flex items-center justify-between rounded-2xl border-2 border-[#055926] bg-[#f0f7f2] p-4 transition-all hover:bg-[#e3f0e6] hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#055926] text-white">
                    <Download className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-black text-[#055926]">Download Android APK</span>
                      <span className="rounded-full bg-[#055926] px-2 py-0.5 text-[10px] font-bold text-white">v2.4.1</span>
                    </div>
                    <p className="text-xs text-[#586359]">Direct APK install for any Android phone / POS (14.8 MB)</p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-[#055926] group-hover:translate-x-1 transition-transform" />
              </a>

              {/* Option 2: Google Play Store */}
              <div className="flex items-center justify-between rounded-2xl border border-[#EAE8DF] bg-[#FAFAF7] p-4 text-left">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-[#EAE8DF] text-[#172018]">
                    <Smartphone className="h-5 w-5 text-gray-700" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-[#172018]">Google Play Store</span>
                    <p className="text-xs text-[#586359]">Official release on Android Play Store</p>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-100 text-emerald-800 px-2.5 py-1 text-[11px] font-bold">
                  Verified
                </span>
              </div>

              {/* Option 3: iOS Web App / PWA */}
              <div className="flex items-center justify-between rounded-2xl border border-[#EAE8DF] bg-[#FAFAF7] p-4 text-left">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-[#EAE8DF] text-[#172018]">
                    <QrCode className="h-5 w-5 text-gray-700" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-[#172018]">Apple iOS (iPhone / iPad)</span>
                    <p className="text-xs text-[#586359]">Open in Safari & tap "Add to Home Screen"</p>
                  </div>
                </div>
                <span className="rounded-full bg-gray-100 text-gray-700 px-2.5 py-1 text-[11px] font-bold">
                  Instant PWA
                </span>
              </div>
            </div>

            {/* Key Capabilities */}
            <div className="rounded-2xl bg-[#FAFAF7] border border-[#EAE8DF] p-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#586359] mb-2.5">
                Included in Mobile Application
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs text-[#172018]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#055926] shrink-0" />
                  <span>100% Offline Collections</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#055926] shrink-0" />
                  <span>Bluetooth POS Printers</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#055926] shrink-0" />
                  <span>Biometric Fingerprint Login</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#055926] shrink-0" />
                  <span>Auto SMS to Savers</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end">
              <Button 
                variant="outline" 
                onClick={() => setDownloadModalOpen(false)}
                className="rounded-xl border-[#EAE8DF] text-xs font-semibold px-5"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
