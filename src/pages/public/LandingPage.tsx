import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { 
  Users, 
  PieChart, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  Smartphone,
  Facebook,
  Instagram,
  Twitter,
  MessageCircle,
  QrCode,
  CheckCircle2,
  X
} from 'lucide-react';
import { PricingCards } from '../../components/pricing/PricingCards';
import heroPersonImg from '../../assets/images/hero_saver_mobile_1788869419985.jpg';

const FLAGS_LIST = [
  {
    code: 'NG',
    name: 'Nigeria (NGN)',
    svg: (
      <svg viewBox="0 0 32 32" className="w-full h-full">
        <rect width="10.6" height="32" fill="#008751" />
        <rect x="10.6" width="10.8" height="32" fill="#FFFFFF" />
        <rect x="21.4" width="10.6" height="32" fill="#008751" />
      </svg>
    )
  },
  {
    code: 'GH',
    name: 'Ghana (GHS)',
    svg: (
      <svg viewBox="0 0 32 32" className="w-full h-full">
        <rect y="0" width="32" height="10.6" fill="#CF0921" />
        <rect y="10.6" width="32" height="10.6" fill="#FCD20F" />
        <rect y="21.2" width="32" height="10.8" fill="#006B3F" />
        <polygon points="16,12 17.2,15 20.5,15 18,17 19,20 16,18.2 13,20 14,17 11.5,15 14.8,15" fill="#000000" />
      </svg>
    )
  },
  {
    code: 'CI',
    name: "Côte d'Ivoire (XOF)",
    svg: (
      <svg viewBox="0 0 32 32" className="w-full h-full">
        <rect width="10.6" height="32" fill="#F77F00" />
        <rect x="10.6" width="10.8" height="32" fill="#FFFFFF" />
        <rect x="21.4" width="10.6" height="32" fill="#009E60" />
      </svg>
    )
  },
  {
    code: 'SN',
    name: 'Senegal (XOF)',
    svg: (
      <svg viewBox="0 0 32 32" className="w-full h-full">
        <rect width="10.6" height="32" fill="#00853F" />
        <rect x="10.6" width="10.8" height="32" fill="#FDEF42" />
        <rect x="21.4" width="10.6" height="32" fill="#E31B23" />
        <polygon points="16,12 17.2,15 20.5,15 18,17 19,20 16,18.2 13,20 14,17 11.5,15 14.8,15" fill="#00853F" />
      </svg>
    )
  },
  {
    code: 'LR',
    name: 'Liberia (LRD)',
    svg: (
      <svg viewBox="0 0 32 32" className="w-full h-full">
        <rect width="32" height="32" fill="#BF0A30" />
        <rect y="3" width="32" height="3" fill="#FFFFFF" />
        <rect y="9" width="32" height="3" fill="#FFFFFF" />
        <rect y="15" width="32" height="3" fill="#FFFFFF" />
        <rect y="21" width="32" height="3" fill="#FFFFFF" />
        <rect y="27" width="32" height="3" fill="#FFFFFF" />
        <rect width="14" height="15" fill="#002868" />
        <polygon points="7,3 8,6 11,6 8.5,8 9.5,11 7,9 4.5,11 5.5,8 3,6 6,6" fill="#FFFFFF" />
      </svg>
    )
  },
  {
    code: 'SL',
    name: 'Sierra Leone (SLE)',
    svg: (
      <svg viewBox="0 0 32 32" className="w-full h-full">
        <rect y="0" width="32" height="10.6" fill="#1EB53A" />
        <rect y="10.6" width="32" height="10.6" fill="#FFFFFF" />
        <rect y="21.2" width="32" height="10.8" fill="#0072C6" />
      </svg>
    )
  },
  {
    code: 'GM',
    name: 'The Gambia (GMD)',
    svg: (
      <svg viewBox="0 0 32 32" className="w-full h-full">
        <rect y="0" width="32" height="10" fill="#CE1126" />
        <rect y="10" width="32" height="1.5" fill="#FFFFFF" />
        <rect y="11.5" width="32" height="9" fill="#0C1C8C" />
        <rect y="20.5" width="32" height="1.5" fill="#FFFFFF" />
        <rect y="22" width="32" height="10" fill="#3A7728" />
      </svg>
    )
  },
  {
    code: 'GN',
    name: 'Guinea (GNF)',
    svg: (
      <svg viewBox="0 0 32 32" className="w-full h-full">
        <rect width="10.6" height="32" fill="#CE1126" />
        <rect x="10.6" width="10.8" height="32" fill="#FCD116" />
        <rect x="21.4" width="10.6" height="32" fill="#009460" />
      </svg>
    )
  },
  {
    code: 'BJ',
    name: 'Benin (XOF)',
    svg: (
      <svg viewBox="0 0 32 32" className="w-full h-full">
        <rect x="12" y="0" width="20" height="16" fill="#FCD116" />
        <rect x="12" y="16" width="20" height="16" fill="#E8112D" />
        <rect x="0" y="0" width="12" height="32" fill="#008751" />
      </svg>
    )
  },
  {
    code: 'TG',
    name: 'Togo (XOF)',
    svg: (
      <svg viewBox="0 0 32 32" className="w-full h-full">
        <rect y="0" width="32" height="6.4" fill="#006A4E" />
        <rect y="6.4" width="32" height="6.4" fill="#FFCE00" />
        <rect y="12.8" width="32" height="6.4" fill="#006A4E" />
        <rect y="19.2" width="32" height="6.4" fill="#FFCE00" />
        <rect y="25.6" width="32" height="6.4" fill="#006A4E" />
        <rect x="0" y="0" width="14" height="14" fill="#D21034" />
        <polygon points="7,2 8,5 11,5 8.5,7 9.5,10 7,8.2 4.5,10 5.5,7 3,5 6,5" fill="#FFFFFF" />
      </svg>
    )
  },
  {
    code: 'BF',
    name: 'Burkina Faso (XOF)',
    svg: (
      <svg viewBox="0 0 32 32" className="w-full h-full">
        <rect y="0" width="32" height="16" fill="#EF3340" />
        <rect y="16" width="32" height="16" fill="#009739" />
        <polygon points="16,11 17.5,15 21.5,15 18.2,17.5 19.5,21.5 16,19 12.5,21.5 13.8,17.5 10.5,15 14.5,15" fill="#FFD100" />
      </svg>
    )
  },
  {
    code: 'ML',
    name: 'Mali (XOF)',
    svg: (
      <svg viewBox="0 0 32 32" className="w-full h-full">
        <rect width="10.6" height="32" fill="#14B53A" />
        <rect x="10.6" width="10.8" height="32" fill="#FCD116" />
        <rect x="21.4" width="10.6" height="32" fill="#CE1126" />
      </svg>
    )
  },
  {
    code: 'NE',
    name: 'Niger (XOF)',
    svg: (
      <svg viewBox="0 0 32 32" className="w-full h-full">
        <rect y="0" width="32" height="10.6" fill="#E05206" />
        <rect y="10.6" width="32" height="10.6" fill="#FFFFFF" />
        <rect y="21.2" width="32" height="10.8" fill="#0DB02B" />
        <circle cx="16" cy="16" r="3.6" fill="#E05206" />
      </svg>
    )
  },
  {
    code: 'GW',
    name: 'Guinea-Bissau (XOF)',
    svg: (
      <svg viewBox="0 0 32 32" className="w-full h-full">
        <rect x="12" y="0" width="20" height="16" fill="#FCD116" />
        <rect x="12" y="16" width="20" height="16" fill="#009E49" />
        <rect x="0" y="0" width="12" height="32" fill="#CE1126" />
        <polygon points="6,12 6.8,14.2 9,14.2 7.2,15.5 7.8,17.5 6,16.2 4.2,17.5 4.8,15.5 3,14.2 5.2,14.2" fill="#000000" />
      </svg>
    )
  },
  {
    code: 'CV',
    name: 'Cabo Verde (CVE)',
    svg: (
      <svg viewBox="0 0 32 32" className="w-full h-full">
        <rect width="32" height="32" fill="#002B7F" />
        <rect y="17" width="32" height="6" fill="#FFFFFF" />
        <rect y="19" width="32" height="2" fill="#CF1126" />
        <circle cx="11" cy="20" r="1.1" fill="#FFCC00" />
        <circle cx="14" cy="17" r="1.1" fill="#FFCC00" />
        <circle cx="14" cy="23" r="1.1" fill="#FFCC00" />
        <circle cx="17" cy="15.5" r="1.1" fill="#FFCC00" />
        <circle cx="17" cy="24.5" r="1.1" fill="#FFCC00" />
        <circle cx="20" cy="17" r="1.1" fill="#FFCC00" />
        <circle cx="20" cy="23" r="1.1" fill="#FFCC00" />
        <circle cx="22" cy="20" r="1.1" fill="#FFCC00" />
      </svg>
    )
  },
  {
    code: 'MR',
    name: 'Mauritania (MRU)',
    svg: (
      <svg viewBox="0 0 32 32" className="w-full h-full">
        <rect width="32" height="32" fill="#00A95C" />
        <rect y="0" width="32" height="5" fill="#D01C1F" />
        <rect y="27" width="32" height="5" fill="#D01C1F" />
        <path d="M11,18 A5.5,5.5 0 0,0 21,18 A5,4.5 0 0,1 11,18 Z" fill="#FFD700" />
        <polygon points="16,12 16.8,14 19,14 17.3,15.2 17.8,17 16,15.8 14.2,17 14.7,15.2 13,14 15.2,14" fill="#FFD700" />
      </svg>
    )
  }
];

export default function LandingPage() {
  const navigate = useNavigate();
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);

  const handleOpenRegister = (planName?: string) => {
    if (planName) {
      const slug = planName.toLowerCase().replace('ajomi', '').trim();
      navigate(`/register?plan=${encodeURIComponent(slug)}`);
    } else {
      navigate('/register');
    }
  };

  return (
    <div className="flex flex-col bg-[#FAFAF7] text-[#172018]">
      {/* ================= Vertical Social Media Floating Panel (Fixed on scroll) ================= */}
      <aside 
        aria-label="Connect with AJOMI on social media"
        className="fixed right-2 sm:right-4 lg:right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center"
      >
        <div className="flex flex-col items-center gap-2 sm:gap-2.5 p-2 sm:p-2.5 rounded-full bg-[#E2EFE5] border-2 border-[#055926]/30 shadow-2xl shadow-black/15 backdrop-blur-md">
          <div className="flex flex-col items-center py-1 select-none">
            <span className="h-1.5 w-1.5 rounded-full bg-[#055926] mb-1.5 animate-pulse" />
            <span className="text-[9px] font-black uppercase tracking-widest text-[#055926] [writing-mode:vertical-lr] rotate-180">
              Follow Us
            </span>
          </div>

          {/* Facebook */}
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit AJOMI on Facebook"
            title="Facebook"
            id="floating-social-facebook"
            className="group relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-2xl bg-white text-[#1877F2] hover:bg-[#1877F2] hover:text-white border border-[#c4e0cb] hover:border-[#1877F2] shadow-xs hover:shadow-md transition-all hover:scale-105"
          >
            <Facebook className="h-4 w-4 transition-transform group-hover:scale-110" />
            <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-lg bg-[#172018] px-2.5 py-1 text-xs font-semibold text-white opacity-0 shadow-md transition-opacity group-hover:opacity-100 hidden sm:block">
              Facebook
            </span>
          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit AJOMI on Instagram"
            title="Instagram"
            id="floating-social-instagram"
            className="group relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-2xl bg-white text-[#E4405F] hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:text-white border border-[#c4e0cb] hover:border-pink-500 shadow-xs hover:shadow-md transition-all hover:scale-105"
          >
            <Instagram className="h-4 w-4 transition-transform group-hover:scale-110" />
            <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-lg bg-[#172018] px-2.5 py-1 text-xs font-semibold text-white opacity-0 shadow-md transition-opacity group-hover:opacity-100 hidden sm:block">
              Instagram
            </span>
          </a>

          {/* X (Twitter) */}
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow AJOMI on X"
            title="X"
            id="floating-social-x"
            className="group relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-2xl bg-white text-[#0F1419] hover:bg-black hover:text-white border border-[#c4e0cb] hover:border-black shadow-xs hover:shadow-md transition-all hover:scale-105"
          >
            <Twitter className="h-4 w-4 transition-transform group-hover:scale-110" />
            <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-lg bg-[#172018] px-2.5 py-1 text-xs font-semibold text-white opacity-0 shadow-md transition-opacity group-hover:opacity-100 hidden sm:block">
              X (Twitter)
            </span>
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/2348000000000?text=Hello%20AJOMI%20Team%2C%20I%20would%20like%20to%20inquire%20about%20the%20platform"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with AJOMI on WhatsApp"
            title="WhatsApp"
            id="floating-social-whatsapp"
            className="group relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-2xl bg-white text-[#128C7E] hover:bg-[#25D366] hover:text-white border border-[#c4e0cb] hover:border-[#25D366] shadow-xs hover:shadow-md transition-all hover:scale-105"
          >
            <MessageCircle className="h-4 w-4 transition-transform group-hover:scale-110" />
            <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-lg bg-[#172018] px-2.5 py-1 text-xs font-semibold text-white opacity-0 shadow-md transition-opacity group-hover:opacity-100 hidden sm:block">
              WhatsApp
            </span>
          </a>
        </div>
      </aside>

      {/* ================= Hero Section (Raenest-inspired Design) ================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#043b19] via-[#055926] to-[#022810] text-white pt-12 pb-20 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-28">
        {/* Ambient glowing shapes and waves matching the reference */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          {/* Radial emerald glow behind content */}
          <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-[#10b981]/15 blur-[120px]" />
          {/* Warm gold ambient aura */}
          <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] rounded-full bg-[#D4A72C]/12 blur-[140px]" />
          {/* Subtle curved contour wave */}
          <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 1440 800">
            <path fill="currentColor" d="M0,288L48,272C96,256,192,224,288,229.3C384,235,480,277,576,288C672,299,768,277,864,250.7C960,224,1056,192,1152,197.3C1248,203,1344,245,1392,266.7L1440,288L1440,800L1392,800C1344,800,1248,800,1152,800C1056,800,960,800,864,800C768,800,672,800,576,800C480,800,384,800,288,800C192,800,96,800,48,800L0,800Z"></path>
          </svg>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* Left Column: Flags stream, Headline, Subtext, CTAs, Trust Metrics */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              
              {/* Country Flags Stream (like Raenest's top currency tokens row) */}
              <div className="relative max-w-full mb-6 select-none">
                <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto no-scrollbar py-1 pr-4">
                  {FLAGS_LIST.map((flag) => (
                    <div 
                      key={flag.code}
                      title={flag.name}
                      className="group relative flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full overflow-hidden shadow-md ring-1 ring-white/30 hover:scale-110 hover:ring-2 hover:ring-[#E5B842] transition-transform cursor-pointer"
                    >
                      {flag.svg}
                    </div>
                  ))}
                </div>
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight text-white leading-[1.1]">
                Manage Your Daily <br className="hidden sm:block" />
                Savings Business{' '}
                <span className="text-[#E5B842] block sm:inline">With Confidence</span>
              </h1>

              {/* Subtitle / Write-up */}
              <p className="mt-5 sm:mt-6 text-base sm:text-lg text-emerald-100/90 leading-relaxed max-w-xl">
                AJOMI helps Ajo, Esusu, thrift collectors, cooperative managers and contributors automate daily/weekly and monthly contributions, record deposits, assign field agents, and track contributions and payouts from one secured platform.
              </p>

              {/* Action Buttons Row */}
              <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-3.5 sm:gap-4">
                <button 
                  onClick={() => handleOpenRegister()}
                  id="hero-start-trial-btn"
                  className="rounded-2xl bg-white px-7 py-3.5 text-sm sm:text-base font-bold text-[#055926] shadow-xl shadow-black/25 hover:bg-emerald-50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
                >
                  <span>Start Free Trial</span>
                  <ArrowRight className="h-4 w-4 text-[#055926]" />
                </button>

                <button 
                  type="button" 
                  onClick={() => setDownloadModalOpen(true)}
                  id="hero-download-app-btn"
                  className="rounded-2xl bg-white/10 hover:bg-white/20 border border-white/25 px-5 sm:px-6 py-3.5 text-sm sm:text-base font-bold text-white backdrop-blur-md transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2.5 shadow-lg shadow-black/10"
                >
                  {/* Apple Logo SVG */}
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-2 .6-2.65 1.35-.58.67-1.09 1.74-.95 2.77.99.08 2.06-.52 2.68-1.27z"/>
                  </svg>
                  {/* Google Play Logo SVG */}
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M3.609 1.814L13.793 12 3.61 22.186c-.234-.236-.37-.582-.37-.98V2.794c0-.398.136-.744.37-.98zm11.238 11.24l2.57 2.57-12.04 6.883 9.47-9.453zm0-2.108L5.378 1.493l12.04 6.883-2.571 2.57zM18.847 11.02l2.36 1.35c.67.382.67 1.008 0 1.39l-2.36 1.35-2.146-2.145 2.146-2.145z"/>
                  </svg>
                  <span>Download app</span>
                </button>

                <a 
                  href="#how-it-works"
                  id="hero-how-it-works-btn"
                  className="text-xs sm:text-sm font-semibold text-emerald-100 hover:text-white underline underline-offset-4 px-2 py-1 transition-colors"
                >
                  How it works
                </a>
              </div>

              {/* Quick Trust Metrics */}
              <div className="mt-10 pt-6 border-t border-white/15 grid grid-cols-3 gap-6 max-w-lg w-full">
                <div>
                  <p className="text-xl sm:text-2xl font-black text-[#E5B842]">100%</p>
                  <p className="text-xs text-emerald-100/75 font-medium mt-0.5">Audited Ledgers</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-black text-white">0</p>
                  <p className="text-xs text-emerald-100/75 font-medium mt-0.5">Duplicate Errors</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-black text-[#34D399]">24/7</p>
                  <p className="text-xs text-emerald-100/75 font-medium mt-0.5">Offline-Ready</p>
                </div>
              </div>

            </div>

            {/* Right Column: Arch Portal + Overlaid Floating Transaction Card */}
            <div className="lg:col-span-5 relative flex justify-center lg:justify-end mt-6 lg:mt-0 pb-8 sm:pb-10 lg:pb-0">
              
              {/* Glowing backdrop aura */}
              <div className="absolute -inset-4 sm:-inset-6 rounded-full bg-gradient-to-tr from-[#10B981]/25 via-[#D4A72C]/20 to-transparent blur-2xl pointer-events-none" />

              {/* Arch Frame matching Raenest's portal design */}
              <div className="relative w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[440px] rounded-t-[160px] sm:rounded-t-[200px] lg:rounded-t-[240px] rounded-b-3xl overflow-hidden border-4 border-white/20 shadow-2xl shadow-black/50 bg-[#02240e]">
                <img 
                  src={heroPersonImg} 
                  alt="Smiling African Saver using AJOMI App" 
                  className="w-full h-[400px] sm:h-[480px] lg:h-[530px] object-cover object-top"
                />
                {/* Subtle gradient shadow inside bottom of photo */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#021f0b] via-[#021f0b]/50 to-transparent pointer-events-none" />
              </div>

              {/* Overlaid Floating "Recent transactions" Card (Directly matching Raenest reference) */}
              <div 
                id="hero-recent-transactions-card"
                className="absolute -bottom-4 sm:-bottom-6 left-1/2 -translate-x-1/2 sm:left-4 sm:translate-x-0 w-[92%] sm:w-[320px] lg:w-[340px] rounded-2xl bg-[#03240e]/95 backdrop-blur-xl border border-white/20 p-4 text-white shadow-2xl shadow-black/40 z-20"
              >
                <div className="flex items-center justify-between text-xs font-semibold mb-3">
                  <span className="text-white/90">Recent transactions</span>
                  <Link to="/login" className="text-[#E5B842] hover:underline font-bold text-xs">See all</Link>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center font-black text-[#055926] shadow-sm text-sm">
                      AJ
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white leading-tight">Daily Ajo Payout</p>
                      <span className="inline-block mt-0.5 rounded-sm bg-[#10B981]/25 px-1.5 py-0.5 text-[10px] font-bold text-[#34D399]">
                        Success
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-white">+ ₦45,000</p>
                    <p className="text-[11px] text-white/60 mt-0.5">19 Jan, 2025</p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ================= Features / Benefits ================= */}
      <section id="features" className="bg-white border-y border-[#EAE8DF] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#f0f7f2] px-3.5 py-1 text-xs font-semibold text-[#055926] mb-3 border border-[#dceed2]">
              <Smartphone className="h-3.5 w-3.5 text-[#055926]" />
              Built for Mobile & Field Collectors
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#172018]">
              Everything you need to scale your thrift network
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#4B5563]">
              Stop relying on paper cards and spreadsheets. AJOMI provides end-to-end management for modern contribution businesses.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-5xl sm:mt-16">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: 'Manage Customers Easily',
                  description: 'Track profiles, active savings cycles, phone numbers, and collection histories for thousands of savers securely.',
                  icon: Users,
                  tag: 'Customer KYC'
                },
                {
                  name: 'Track Daily Collections',
                  description: 'Record contributions with unique transaction references to guarantee financial accuracy and prevent duplicates.',
                  icon: PieChart,
                  tag: 'Zero Ledger Math'
                },
                {
                  name: 'Isolated & Secure',
                  description: 'Enterprise-grade row level multi-tenancy ensures your business records and customer funds are strictly private.',
                  icon: ShieldCheck,
                  tag: 'Bank Security'
                },
              ].map((feature) => (
                <div 
                  key={feature.name} 
                  className="rounded-3xl border border-[#EAE8DF] bg-[#FAFAF7] p-6 sm:p-7 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:border-[#dceed2] transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#055926] text-white shadow-sm">
                        <feature.icon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#055926] bg-[#f0f7f2] border border-[#dceed2] px-2.5 py-0.5 rounded-full">
                        {feature.tag}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-[#172018]">
                      {feature.name}
                    </h3>
                    <p className="mt-2 text-sm text-[#4B5563] leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= How it works ================= */}
      <section id="how-it-works" className="bg-[#FAFAF7] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#172018]">
            How AJOMI Works
          </h2>
          <p className="mt-2 text-sm text-[#4B5563] max-w-md mx-auto">
            Get your contribution business digitised and live in under 5 minutes.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3 max-w-5xl mx-auto">
            {[
              { step: '01', title: 'Create Account', desc: 'Set up your business profile, customize your commission rate, and configure currency.' },
              { step: '02', title: 'Add Staff & Customers', desc: 'Assign field collectors, register thrift savers, and activate individual or group cycles.' },
              { step: '03', title: 'Track & Grow', desc: 'Record daily collections, issue instant customer receipts, approve payouts, and view profit reports.' }
            ].map((s) => (
              <div key={s.step} className="rounded-3xl border border-[#EAE8DF] bg-white p-7 shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex flex-col items-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f0f7f2] border border-[#dceed2] text-xl font-black text-[#055926] mb-4">
                  {s.step}
                </div>
                <h3 className="text-lg font-bold text-[#172018]">{s.title}</h3>
                <p className="mt-2 text-xs sm:text-sm text-[#4B5563] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= Pricing Section ================= */}
      <section id="pricing" className="bg-white border-t border-[#EAE8DF] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#172018]">
              Predictable Pricing Built for Scale
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#4B5563]">
              Select the plan aligned with your active contributor count. All plans feature automated ledger tracking and bank-grade security.
            </p>
          </div>

          <PricingCards 
            showBillingToggle={true} 
            onSelectPlan={(plan) => handleOpenRegister(plan)}
          />

          <div className="mt-12 text-center">
            <Link 
              to="/pricing" 
              className="inline-flex items-center gap-2 text-sm font-bold text-[#055926] hover:underline"
            >
              <span>Explore interactive fee calculator, full comparison matrix & FAQs</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ================= Mobile App Download Modal ================= */}
      {downloadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-[#EAE8DF]">
            <button
              onClick={() => setDownloadModalOpen(false)}
              className="absolute right-5 top-5 rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
              aria-label="Close dialog"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="text-center mb-6">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#055926]/10 text-[#055926] mb-3">
                <Smartphone className="h-7 w-7" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-[#172018]">
                Get the AJOMI Mobile App
              </h3>
              <p className="text-sm text-[#586359] mt-1">
                Collect deposits in the field, print Bluetooth thermal receipts, and sync ledgers offline.
              </p>
            </div>

            <div className="space-y-3">
              {/* Option 1: Android Play Store */}
              <a
                href="https://play.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-2xl border border-[#EAE8DF] bg-[#FAFAF7] hover:border-[#055926] hover:bg-emerald-50/50 p-4 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white border border-[#EAE8DF] text-[#055926] group-hover:scale-105 transition-transform">
                    <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                      <path d="M3.609 1.814L13.793 12 3.61 22.186c-.234-.236-.37-.582-.37-.98V2.794c0-.398.136-.744.37-.98zm11.238 11.24l2.57 2.57-12.04 6.883 9.47-9.453zm0-2.108L5.378 1.493l12.04 6.883-2.571 2.57zM18.847 11.02l2.36 1.35c.67.382.67 1.008 0 1.39l-2.36 1.35-2.146-2.145 2.146-2.145z"/>
                    </svg>
                  </div>
                  <div className="text-left">
                    <span className="text-sm font-bold text-[#172018]">Google Play Store (Android)</span>
                    <p className="text-xs text-[#586359]">Official release for smartphones and handheld POS</p>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-100 text-emerald-800 px-2.5 py-1 text-[11px] font-bold">
                  Verified
                </span>
              </a>

              {/* Option 2: Apple iOS PWA */}
              <div className="flex items-center justify-between rounded-2xl border border-[#EAE8DF] bg-[#FAFAF7] p-4 text-left">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white border border-[#EAE8DF] text-gray-800">
                    <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-2 .6-2.65 1.35-.58.67-1.09 1.74-.95 2.77.99.08 2.06-.52 2.68-1.27z"/>
                    </svg>
                  </div>
                  <div>
                    <span className="text-sm font-bold text-[#172018]">Apple iOS (iPhone / iPad)</span>
                    <p className="text-xs text-[#586359]">Open in Safari & tap "Add to Home Screen"</p>
                  </div>
                </div>
                <span className="rounded-full bg-gray-200 text-gray-700 px-2.5 py-1 text-[11px] font-bold">
                  Instant PWA
                </span>
              </div>
            </div>

            {/* Offline & Hardware Features List */}
            <div className="mt-4 rounded-2xl bg-[#FAFAF7] border border-[#EAE8DF] p-3.5">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#586359] mb-2">
                Mobile Field Highlights
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
                  <span>Instant SMS & WhatsApp</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#055926] shrink-0" />
                  <span>Biometric Fingerprint/Face</span>
                </div>
              </div>
            </div>

            <Button
              className="w-full mt-5 font-bold"
              onClick={() => setDownloadModalOpen(false)}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
