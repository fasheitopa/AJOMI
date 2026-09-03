import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Check, 
  X, 
  HelpCircle, 
  Calculator, 
  Coins, 
  ArrowRight,
  Send
} from 'lucide-react';
import { PricingCards } from '../../components/pricing/PricingCards';
import { RegisterModal } from '../../components/auth/RegisterModal';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

export default function PricingPage() {
  const [showContactModal, setShowContactModal] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | undefined>(undefined);
  const [calculatorContributors, setCalculatorContributors] = useState(150);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    estimatedSavers: '500+',
    message: ''
  });

  // Calculate recommendation based on slider
  let recommendedPlan = 'AJOMI Growth';
  let planSlug = 'growth';
  let baseFee = 5000;
  let rangeLabel = '101 - 250 contributors';
  let planDescription = 'Great for established collectors & microfinance operators with high-volume groups.';

  if (calculatorContributors <= 100) {
    recommendedPlan = 'AJOMI Starter';
    planSlug = 'starter';
    baseFee = 3000;
    rangeLabel = 'Up to 100 contributors';
    planDescription = 'Perfect for individual thrift collectors managing a tight portfolio of local savers.';
  } else if (calculatorContributors <= 250) {
    recommendedPlan = 'AJOMI Growth';
    planSlug = 'growth';
    baseFee = 5000;
    rangeLabel = '101 - 250 contributors';
    planDescription = 'Great for established collectors & microfinance operators with high-volume groups.';
  } else if (calculatorContributors <= 500) {
    recommendedPlan = 'AJOMI Scale';
    planSlug = 'scale';
    baseFee = 8500;
    rangeLabel = '251 - 500 contributors';
    planDescription = 'Designed for multi-agent cooperatives, loan portfolios, and expanding operations.';
  } else {
    recommendedPlan = 'AJOMI Enterprise';
    planSlug = 'enterprise';
    baseFee = 0;
    rangeLabel = '500+ Contributors';
    planDescription = 'Custom deployment, dedicated SLA, custom bank integrations, and unlimited field accounts.';
  }

  const handleOpenRegister = (plan?: string) => {
    setSelectedPlan(plan);
    setRegisterModalOpen(true);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setShowContactModal(false);
      setFormSubmitted(false);
      setContactForm({
        name: '',
        email: '',
        phone: '',
        businessName: '',
        estimatedSavers: '500+',
        message: ''
      });
    }, 2200);
  };

  return (
    <div className="flex flex-col bg-[#FAFAF7] text-[#172018] min-h-screen">
      
      {/* ================= HERO HEADER ================= */}
      <section className="relative px-4 pt-16 pb-12 sm:px-6 lg:px-8 overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl opacity-30" aria-hidden="true">
          <div 
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#055926] to-[#D4A72C] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" 
            style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}
          />
        </div>

        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D4A72C]/40 bg-[#fcf9ee] px-4 py-1 text-xs font-bold text-[#986d15] mb-6 shadow-xs">
            <Coins className="h-3.5 w-3.5 text-[#D4A72C]" />
            Simple, Transparent Pricing
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#172018] sm:text-5xl lg:text-6xl">
            Choose the right plan for <br className="hidden sm:block" />
            <span className="text-[#055926]">your savings business</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base sm:text-lg text-[#4B5563]">
            From independent thrift collectors to large microfinance institutions. Clear monthly pricing with zero hidden charges.
          </p>
        </div>

        {/* ================= 30 DAYS FREE TRIAL PROMO BANNER ================= */}
        <div className="mx-auto max-w-5xl mt-10 sm:mt-12 relative">
          {/* Subtle dot pattern behind the left corner */}
          <div className="absolute -left-6 -bottom-6 -top-6 w-32 pointer-events-none hidden lg:block opacity-35">
            <svg width="100%" height="100%" fill="none">
              <defs>
                <pattern id="pricing-dots" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1.5" fill="#586359" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#pricing-dots)" />
            </svg>
          </div>

          {/* Ambient glow on right corner */}
          <div className="absolute -right-10 -top-10 w-72 h-72 rounded-full bg-[#055926]/15 blur-3xl pointer-events-none -z-10" />

          {/* Main AJOMI Deep Green Card Container */}
          <div className="relative overflow-hidden rounded-[2.25rem] sm:rounded-[2.5rem] bg-gradient-to-r from-[#033416] via-[#055926] to-[#094721] p-6 sm:p-10 lg:p-12 text-white shadow-2xl shadow-[#055926]/20 border border-[#055926]/40">
            
            {/* Ambient Lighting & Concentric Rings inside the card */}
            <div className="absolute -right-16 -top-16 h-80 w-80 rounded-full bg-[#D4A72C]/15 blur-2xl pointer-events-none" />
            <div className="absolute -right-8 top-1/2 -translate-y-1/2 h-[420px] w-[420px] rounded-full border border-white/[0.08] pointer-events-none hidden sm:block" />
            <div className="absolute -right-2 top-1/2 -translate-y-1/2 h-[320px] w-[320px] rounded-full border border-[#D4A72C]/15 pointer-events-none hidden sm:block" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
              
              {/* Left Column: Heading & Guarantee */}
              <div className="flex-1 text-center lg:text-left space-y-3">
                <p className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-[#D4A72C] uppercase flex items-center justify-center lg:justify-start gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#D4A72C] animate-pulse" />
                  <span>READY TO DIGITISE YOUR THRIFT GROUP?</span>
                </p>
                <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-extrabold tracking-tight text-white leading-[1.15]">
                  Your first 30 days are free.
                </h2>
                <p className="text-sm sm:text-base text-emerald-100/90 max-w-xl font-normal leading-relaxed pt-1">
                  No credit card required. Cancel any time. Your data is always yours.
                </p>
              </div>

              {/* Right Column: Next Step Card with Call-to-Action */}
              <div className="w-full sm:w-auto sm:min-w-[280px] lg:min-w-[310px] shrink-0">
                <div className="relative rounded-[1.75rem] border border-white/15 bg-white/[0.07] backdrop-blur-md p-4 sm:p-5 shadow-2xl ring-1 ring-white/10">
                  
                  {/* Inner Next Step Box */}
                  <div className="rounded-2xl border border-white/10 bg-black/15 p-4 text-left mb-4">
                    <p className="text-[10px] sm:text-[11px] font-bold tracking-widest text-[#D4A72C] uppercase">
                      NEXT STEP
                    </p>
                    <p className="text-xs sm:text-sm text-emerald-50 font-medium mt-1 leading-snug">
                      Bring your thrift group into a verified daily record.
                    </p>
                  </div>

                  {/* Primary Get Started Button */}
                  <button
                    type="button"
                    onClick={() => handleOpenRegister('growth')}
                    className="w-full rounded-2xl bg-white py-3.5 px-6 text-center text-sm font-black text-[#055926] shadow-lg shadow-black/10 hover:bg-[#FAFAF7] hover:shadow-xl active:scale-[0.98] transition-all"
                  >
                    Get Started Free
                  </button>

                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ================= PRICING CARDS SECTION ================= */}
      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <PricingCards 
            showBillingToggle={true} 
            onSelectEnterprise={() => setShowContactModal(true)}
            onSelectPlan={(plan) => handleOpenRegister(plan)}
          />
        </div>
      </section>

      {/* ================= INTERACTIVE PLAN FINDER ================= */}
      <section className="border-t border-[#EAE8DF] bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#f0f7f2] px-3.5 py-1 text-xs font-semibold text-[#055926] mb-3 border border-[#dceed2]">
              <Calculator className="h-3.5 w-3.5 text-[#055926]" />
              Interactive Plan Finder
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#172018]">
              Find the perfect plan for your contributor size
            </h2>
            <p className="mt-2 text-[#4B5563] text-sm max-w-xl mx-auto">
              Slide to match your active contributor portfolio to see our recommended tier and flat monthly investment.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 rounded-3xl border border-[#EAE8DF] bg-[#FAFAF7] p-6 sm:p-8 lg:grid-cols-12 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            {/* Slider on Left */}
            <div className="space-y-8 lg:col-span-7 pr-0 lg:pr-6 lg:border-r lg:border-[#EAE8DF]">
              <div>
                <div className="flex justify-between text-sm font-semibold mb-2">
                  <span className="text-[#172018]">Active Contributors:</span>
                  <span className="font-bold text-[#055926] text-base">{calculatorContributors} savers</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="650"
                  step="5"
                  value={calculatorContributors}
                  onChange={(e) => setCalculatorContributors(Number(e.target.value))}
                  className="w-full accent-[#055926] h-2.5 bg-gray-200 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[11px] font-medium text-[#586359] mt-1.5">
                  <span>10 (Starter)</span>
                  <span>100</span>
                  <span>250 (Growth)</span>
                  <span>500 (Scale)</span>
                  <span>500+ (Enterprise)</span>
                </div>
              </div>

              <div className="rounded-2xl border border-[#dceed2] bg-[#f0f7f2]/80 p-4.5 text-xs text-[#055926] space-y-2">
                <p className="font-bold flex items-center gap-1.5 text-sm">
                  <Check className="h-4 w-4 text-[#055926]" />
                  <span>Simple Flat-Rate Pricing</span>
                </p>
                <p className="text-[#172018]/85 leading-relaxed">
                  Every AJOMI package comes with predictable flat monthly subscription pricing. You record unlimited deposits, savings entries, and payouts with zero per-transaction cuts.
                </p>
              </div>

              <div className="rounded-2xl border border-[#EAE8DF] bg-white p-4 text-xs text-[#586359]">
                <p className="font-semibold text-[#172018] mb-1">Plan Overview</p>
                <p className="leading-relaxed">{planDescription}</p>
              </div>
            </div>

            {/* Calculations Summary on Right */}
            <div className="flex flex-col justify-between lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-wider font-bold text-[#586359]">
                  Recommended Tier ({rangeLabel})
                </span>
                <div className="mt-1 flex items-center justify-between">
                  <span className="text-2xl font-bold text-[#172018]">{recommendedPlan}</span>
                  <span className="rounded-full bg-[#f0f7f2] border border-[#dceed2] px-3 py-0.5 text-xs font-bold text-[#055926]">
                    {rangeLabel}
                  </span>
                </div>

                <div className="mt-6 space-y-3 border-t border-[#EAE8DF] pt-4 text-sm">
                  <div className="flex justify-between text-[#4B5563]">
                    <span>Monthly Software Subscription:</span>
                    <span className="font-bold text-[#172018] text-base">
                      {recommendedPlan === 'AJOMI Enterprise' ? 'Custom Quote' : `₦${baseFee.toLocaleString()}/mo`}
                    </span>
                  </div>
                  <div className="flex justify-between text-[#4B5563]">
                    <span>Transaction / Deposit Fees:</span>
                    <span className="font-bold text-[#055926]">₦0 (Zero fees)</span>
                  </div>
                  <div className="flex justify-between text-[#4B5563]">
                    <span>Daily Collection Tracking:</span>
                    <span className="font-semibold text-[#172018]">Unlimited</span>
                  </div>
                  <div className="flex justify-between text-[#4B5563]">
                    <span>Audited Customer Ledgers:</span>
                    <span className="font-semibold text-[#172018]">Included</span>
                  </div>
                </div>

                <div className="mt-6 border-t border-[#EAE8DF] pt-4">
                  <div className="flex items-baseline justify-between">
                    <span className="text-base font-semibold text-[#172018]">Total Investment:</span>
                    <span className="text-2xl font-extrabold text-[#055926]">
                      {recommendedPlan === 'AJOMI Enterprise' ? 'Custom Quote' : `₦${baseFee.toLocaleString()}/mo`}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#586359] mt-1">
                    First 30 days are 100% free with complete access to all plan features.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleOpenRegister(recommendedPlan)}
                className="w-full"
              >
                <Button className="w-full rounded-2xl py-3 text-sm font-semibold flex items-center justify-center gap-2">
                  <span>Choose {recommendedPlan}</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= COMPREHENSIVE FEATURE MATRIX (4 PACKAGES) ================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-[#EAE8DF] bg-[#FAFAF7]">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#172018]">
              Full Feature Comparison
            </h2>
            <p className="mt-2 text-[#4B5563] text-sm max-w-xl mx-auto">
              Compare capabilities across AJOMI Starter, AJOMI Growth, AJOMI Scale, and AJOMI Enterprise.
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-[#EAE8DF] bg-white shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-[#EAE8DF] bg-[#FAFAF7]">
                  <th className="py-4 px-5 text-sm font-bold text-[#172018] w-2/6">Capabilities</th>
                  <th className="py-4 px-4 text-xs sm:text-sm font-bold text-center text-[#172018] w-1/6">AJOMI Starter</th>
                  <th className="py-4 px-4 text-xs sm:text-sm font-bold text-center text-[#055926] w-1/6 bg-[#f0f7f2] border-x border-[#dceed2]">
                    AJOMI Growth
                  </th>
                  <th className="py-4 px-4 text-xs sm:text-sm font-bold text-center text-[#172018] w-1/6">AJOMI Scale</th>
                  <th className="py-4 px-4 text-xs sm:text-sm font-bold text-center text-[#172018] w-1/6">AJOMI Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAE8DF] text-sm">
                {/* Contributors & Scale */}
                <tr className="bg-[#FAFAF7]/50">
                  <td colSpan={5} className="py-2.5 px-5 text-xs font-bold uppercase tracking-wider text-[#586359]">
                    Contributor Capacity & Pricing
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-5 text-[#172018] font-medium">Contributor Capacity</td>
                  <td className="py-3.5 px-4 text-center text-[#586359] font-medium">Up to 100</td>
                  <td className="py-3.5 px-4 text-center text-[#055926] font-bold bg-[#f0f7f2]/50 border-x border-[#dceed2]">
                    101 - 250
                  </td>
                  <td className="py-3.5 px-4 text-center text-[#172018] font-medium">251 - 500</td>
                  <td className="py-3.5 px-4 text-center text-[#172018] font-medium">500+ Contributors</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-5 text-[#172018] font-medium">Base Monthly Price</td>
                  <td className="py-3.5 px-4 text-center text-[#172018] font-semibold">₦3,000</td>
                  <td className="py-3.5 px-4 text-center text-[#055926] font-bold bg-[#f0f7f2]/50 border-x border-[#dceed2]">
                    ₦5,000
                  </td>
                  <td className="py-3.5 px-4 text-center text-[#172018] font-semibold">₦8,500</td>
                  <td className="py-3.5 px-4 text-center text-[#172018] font-semibold">Custom</td>
                </tr>

                {/* Operations */}
                <tr className="bg-[#FAFAF7]/50">
                  <td colSpan={5} className="py-2.5 px-5 text-xs font-bold uppercase tracking-wider text-[#586359]">
                    Operations & Core Accounting
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-5 text-[#172018] font-medium">Contributor Profiles & KYC</td>
                  <td className="py-3.5 px-4 text-center"><Check className="h-5 w-5 text-[#055926] mx-auto" /></td>
                  <td className="py-3.5 px-4 text-center bg-[#f0f7f2]/50 border-x border-[#dceed2]"><Check className="h-5 w-5 text-[#055926] mx-auto" /></td>
                  <td className="py-3.5 px-4 text-center"><Check className="h-5 w-5 text-[#055926] mx-auto" /></td>
                  <td className="py-3.5 px-4 text-center"><Check className="h-5 w-5 text-[#055926] mx-auto" /></td>
                </tr>
                <tr>
                  <td className="py-3.5 px-5 text-[#172018] font-medium">Daily Collection Tracking</td>
                  <td className="py-3.5 px-4 text-center"><Check className="h-5 w-5 text-[#055926] mx-auto" /></td>
                  <td className="py-3.5 px-4 text-center bg-[#f0f7f2]/50 border-x border-[#dceed2]"><Check className="h-5 w-5 text-[#055926] mx-auto" /></td>
                  <td className="py-3.5 px-4 text-center"><Check className="h-5 w-5 text-[#055926] mx-auto" /></td>
                  <td className="py-3.5 px-4 text-center"><Check className="h-5 w-5 text-[#055926] mx-auto" /></td>
                </tr>
                <tr>
                  <td className="py-3.5 px-5 text-[#172018] font-medium">Automated Ledger & Receipts</td>
                  <td className="py-3.5 px-4 text-center"><Check className="h-5 w-5 text-[#055926] mx-auto" /></td>
                  <td className="py-3.5 px-4 text-center bg-[#f0f7f2]/50 border-x border-[#dceed2]"><Check className="h-5 w-5 text-[#055926] mx-auto" /></td>
                  <td className="py-3.5 px-4 text-center"><Check className="h-5 w-5 text-[#055926] mx-auto" /></td>
                  <td className="py-3.5 px-4 text-center"><Check className="h-5 w-5 text-[#055926] mx-auto" /></td>
                </tr>
                <tr>
                  <td className="py-3.5 px-5 text-[#172018] font-medium">Basic Analytics & Summaries</td>
                  <td className="py-3.5 px-4 text-center"><Check className="h-5 w-5 text-[#055926] mx-auto" /></td>
                  <td className="py-3.5 px-4 text-center bg-[#f0f7f2]/50 border-x border-[#dceed2]"><Check className="h-5 w-5 text-[#055926] mx-auto" /></td>
                  <td className="py-3.5 px-4 text-center"><Check className="h-5 w-5 text-[#055926] mx-auto" /></td>
                  <td className="py-3.5 px-4 text-center"><Check className="h-5 w-5 text-[#055926] mx-auto" /></td>
                </tr>

                {/* Advanced Features */}
                <tr className="bg-[#FAFAF7]/50">
                  <td colSpan={5} className="py-2.5 px-5 text-xs font-bold uppercase tracking-wider text-[#586359]">
                    Advanced Modules & Automation
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-5 text-[#172018] font-medium">Loan & Advance Management</td>
                  <td className="py-3.5 px-4 text-center"><X className="h-4 w-4 text-gray-300 mx-auto" /></td>
                  <td className="py-3.5 px-4 text-center bg-[#f0f7f2]/50 border-x border-[#dceed2]"><Check className="h-5 w-5 text-[#055926] mx-auto" /></td>
                  <td className="py-3.5 px-4 text-center"><Check className="h-5 w-5 text-[#055926] mx-auto" /></td>
                  <td className="py-3.5 px-4 text-center"><Check className="h-5 w-5 text-[#055926] mx-auto" /></td>
                </tr>
                <tr>
                  <td className="py-3.5 px-5 text-[#172018] font-medium">Instant WhatsApp Alerts</td>
                  <td className="py-3.5 px-4 text-center"><X className="h-4 w-4 text-gray-300 mx-auto" /></td>
                  <td className="py-3.5 px-4 text-center bg-[#f0f7f2]/50 border-x border-[#dceed2]"><Check className="h-5 w-5 text-[#055926] mx-auto" /></td>
                  <td className="py-3.5 px-4 text-center"><Check className="h-5 w-5 text-[#055926] mx-auto" /></td>
                  <td className="py-3.5 px-4 text-center"><Check className="h-5 w-5 text-[#055926] mx-auto" /></td>
                </tr>
                <tr>
                  <td className="py-3.5 px-5 text-[#172018] font-medium">Full Business Analytics Dashboard</td>
                  <td className="py-3.5 px-4 text-center"><X className="h-4 w-4 text-gray-300 mx-auto" /></td>
                  <td className="py-3.5 px-4 text-center bg-[#f0f7f2]/50 border-x border-[#dceed2]"><Check className="h-5 w-5 text-[#055926] mx-auto" /></td>
                  <td className="py-3.5 px-4 text-center"><Check className="h-5 w-5 text-[#055926] mx-auto" /></td>
                  <td className="py-3.5 px-4 text-center"><Check className="h-5 w-5 text-[#055926] mx-auto" /></td>
                </tr>
                <tr>
                  <td className="py-3.5 px-5 text-[#172018] font-medium">Staff / Field Collector Accounts</td>
                  <td className="py-3.5 px-4 text-center text-[#586359]">Up to 2</td>
                  <td className="py-3.5 px-4 text-center text-[#055926] font-bold bg-[#f0f7f2]/50 border-x border-[#dceed2]">Up to 10</td>
                  <td className="py-3.5 px-4 text-center text-[#172018] font-medium">Up to 30</td>
                  <td className="py-3.5 px-4 text-center text-[#172018] font-medium">Unlimited</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-5 text-[#172018] font-medium">Custom SMS Sender ID</td>
                  <td className="py-3.5 px-4 text-center"><X className="h-4 w-4 text-gray-300 mx-auto" /></td>
                  <td className="py-3.5 px-4 text-center bg-[#f0f7f2]/50 border-x border-[#dceed2]">Optional</td>
                  <td className="py-3.5 px-4 text-center"><Check className="h-5 w-5 text-[#055926] mx-auto" /></td>
                  <td className="py-3.5 px-4 text-center"><Check className="h-5 w-5 text-[#055926] mx-auto" /></td>
                </tr>
                <tr>
                  <td className="py-3.5 px-5 text-[#172018] font-medium">Dedicated Support & Account SLA</td>
                  <td className="py-3.5 px-4 text-center"><X className="h-4 w-4 text-gray-300 mx-auto" /></td>
                  <td className="py-3.5 px-4 text-center bg-[#f0f7f2]/50 border-x border-[#dceed2]"><X className="h-4 w-4 text-gray-300 mx-auto" /></td>
                  <td className="py-3.5 px-4 text-center text-[#172018] font-medium">Priority</td>
                  <td className="py-3.5 px-4 text-center"><Check className="h-5 w-5 text-[#055926] mx-auto" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ================= FREQUENTLY ASKED QUESTIONS ================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-[#EAE8DF] bg-white">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#172018]">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-[#4B5563] text-sm">
              Clear answers to how pricing, collection tracking, and subscriptions work.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "What happens when my contributors grow beyond 100?",
                a: "You will receive a gentle prompt on your dashboard when approaching your plan limit. You can seamlessly upgrade from AJOMI Starter to AJOMI Growth (101 - 250) or AJOMI Scale (251 - 500) with one click, preserving all historical records without any downtime."
              },
              {
                q: "Are there any per-deposit or transaction fees?",
                a: "No. AJOMI uses 100% flat, transparent monthly subscription pricing. There are zero deductions, zero per-deposit cuts, and zero variable transaction charges on your collections."
              },
              {
                q: "Can I try AJOMI before paying?",
                a: "Yes! Every new account includes a 14-day free trial on either Starter, Growth, or Scale with complete access to real collection tracking, customer registration, and ledger reports."
              },
              {
                q: "Can contributors register directly on the platform?",
                a: "Yes! AJOMI supports both Tenant / Collector registrations (for organizers and managers) and Contributor registrations (for daily savers who want to track their cards and verified savings balances)."
              },
              {
                q: "Is my customers' financial data private and secure?",
                a: "Absolutely. AJOMI uses enterprise multi-tenant database isolation enforced via cryptographic Row Level Security (RLS). Other organizations or unauthorized staff can never access your ledger or customer records."
              }
            ].map((faq, i) => (
              <div key={i} className="rounded-2xl border border-[#EAE8DF] bg-[#FAFAF7] p-5 sm:p-6 transition-all hover:border-[#dceed2]">
                <h3 className="text-base font-semibold text-[#172018] flex items-center gap-2.5">
                  <HelpCircle className="h-4 w-4 text-[#055926] shrink-0" />
                  {faq.q}
                </h3>
                <p className="mt-2.5 text-sm text-[#4B5563] leading-relaxed pl-6.5">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= BOTTOM CTA BANNER ================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-[#EAE8DF] bg-[#FAFAF7]">
        <div className="mx-auto max-w-5xl rounded-3xl bg-[#055926] p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Ready to automate your daily savings operations?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-emerald-100 text-base">
              Join dozens of thrift managers and contributors who have eliminated manual ledger mistakes and scaled their network with AJOMI.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => handleOpenRegister()}
                className="w-full sm:w-auto rounded-2xl bg-[#D4A72C] px-8 py-3.5 text-base font-bold text-[#172018] shadow-lg hover:bg-[#bb8d1e] transition-all active:scale-98"
              >
                Start 14-Day Free Trial
              </button>
              <button
                type="button"
                onClick={() => setShowContactModal(true)}
                className="w-full sm:w-auto rounded-2xl border-2 border-white/40 px-8 py-3.5 text-base font-semibold text-white hover:bg-white/10 transition-all"
              >
                Talk to Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CONTACT ENTERPRISE MODAL ================= */}
      {showContactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="relative w-full max-w-lg rounded-3xl border border-[#EAE8DF] bg-white p-7 shadow-2xl">
            <button
              type="button"
              onClick={() => setShowContactModal(false)}
              className="absolute right-5 top-5 rounded-full p-1.5 text-gray-400 hover:bg-gray-100 hover:text-[#172018]"
            >
              <X className="h-5 w-5" />
            </button>

            {formSubmitted ? (
              <div className="py-12 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f0f7f2] text-[#055926] mb-4 border border-[#dceed2]">
                  <Check className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-[#172018]">Inquiry Received</h3>
                <p className="mt-2 text-sm text-[#4B5563]">
                  Thank you! Our enterprise solutions team will contact you within 2 hours with customized volume pricing.
                </p>
              </div>
            ) : (
              <div>
                <h3 className="text-xl font-bold text-[#172018]">Enterprise Plan Inquiry</h3>
                <p className="mt-1 text-xs text-[#4B5563]">
                  For businesses managing 500+ contributors, multi-branch operations, or bespoke workflows.
                </p>

                <form onSubmit={handleContactSubmit} className="mt-6 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#172018]">Your Full Name</label>
                    <Input
                      required
                      type="text"
                      placeholder="e.g. Adebayo Ogunleye"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="mt-1"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#172018]">Work Email</label>
                      <Input
                        required
                        type="email"
                        placeholder="adebayo@company.ng"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#172018]">Phone Number</label>
                      <Input
                        required
                        type="tel"
                        placeholder="+234 801 234 5678"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#172018]">Business / Thrift Name</label>
                      <Input
                        required
                        type="text"
                        placeholder="Premier Thrift MFB"
                        value={contactForm.businessName}
                        onChange={(e) => setContactForm({ ...contactForm, businessName: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#172018]">Active Contributors</label>
                      <select
                        value={contactForm.estimatedSavers}
                        onChange={(e) => setContactForm({ ...contactForm, estimatedSavers: e.target.value })}
                        className="mt-1 block h-11 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-[#172018] focus:border-[#055926] focus:outline-none focus:ring-2 focus:ring-[#055926]"
                      >
                        <option value="250-500">250 - 500 savers</option>
                        <option value="500-1000">500 - 1,000 savers</option>
                        <option value="1000-5000">1,000 - 5,000 savers</option>
                        <option value="5000+">5,000+ savers</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#172018]">Specific Requirements (Optional)</label>
                    <textarea
                      rows={3}
                      placeholder="Tell us about your collectors, payout schedules, or custom reporting needs..."
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className="mt-1 block w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-[#172018] placeholder:text-gray-400 focus:border-[#055926] focus:outline-none focus:ring-2 focus:ring-[#055926]"
                    />
                  </div>

                  <div className="pt-2">
                    <Button type="submit" className="w-full flex items-center justify-center gap-2">
                      <Send className="h-4 w-4" />
                      Submit Enterprise Inquiry
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= REGISTRATION MODAL ================= */}
      <RegisterModal 
        isOpen={registerModalOpen} 
        onClose={() => setRegisterModalOpen(false)} 
        defaultPlan={selectedPlan}
      />

    </div>
  );
}
