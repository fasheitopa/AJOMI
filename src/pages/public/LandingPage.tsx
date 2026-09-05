import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Users, PieChart, ShieldCheck, ArrowRight, Sparkles, Smartphone } from 'lucide-react';
import { PricingCards } from '../../components/pricing/PricingCards';

export default function LandingPage() {
  const navigate = useNavigate();

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
      {/* ================= Hero Section ================= */}
      <section className="relative px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-28 overflow-hidden">
        <div className="mx-auto max-w-5xl text-center relative z-10">
          
          {/* Mobile Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D4A72C]/40 bg-[#fcf9ee] px-4 py-1.5 text-xs font-bold text-[#986d15] mb-6 shadow-xs">
            <Sparkles className="h-3.5 w-3.5 text-[#D4A72C]" />
            <span>Digital Thrift & Cooperative Software</span>
          </div>

          <h1 className="text-3xl font-black tracking-tight text-[#172018] sm:text-5xl lg:text-6xl leading-tight">
            Manage Your Daily Savings Business <br className="hidden sm:block"/>
            <span className="text-[#055926]">With Confidence</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base sm:text-lg text-[#4B5563] leading-relaxed">
            AJOMI helps Ajo, Esusu, thrift collectors, cooperative managers and contributors automate daily/weekly and monthly contributions, record deposits, assign field agents, and track contributions and payouts from one secured platform.
          </p>

          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto">
            <Button 
              size="lg" 
              onClick={() => handleOpenRegister()}
              className="w-full sm:w-auto text-base font-bold shadow-lg shadow-[#055926]/20"
              id="hero-start-free-trial-btn"
            >
              Start Free Trial
            </Button>
            <a href="#how-it-works" className="w-full sm:w-auto">
              <button 
                type="button" 
                className="w-full sm:w-auto rounded-2xl border-2 border-[#1F2937] py-3 px-6 text-sm font-bold text-[#1F2937] hover:bg-[#1F2937] hover:text-white transition-all capitalize"
                id="hero-how-it-works-btn"
              >
                how it works
              </button>
            </a>
          </div>

          {/* Quick trust metrics */}
          <div className="mt-12 pt-8 border-t border-[#EAE8DF] grid grid-cols-3 gap-4 max-w-xl mx-auto text-center">
            <div>
              <p className="text-xl sm:text-2xl font-black text-[#055926]">100%</p>
              <p className="text-xs text-[#586359] font-medium mt-0.5">Audited Ledgers</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-black text-[#172018]">0</p>
              <p className="text-xs text-[#586359] font-medium mt-0.5">Duplicate Errors</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-black text-[#055926]">24/7</p>
              <p className="text-xs text-[#586359] font-medium mt-0.5">Offline-Ready</p>
            </div>
          </div>
        </div>
        
        {/* Background decorative elements */}
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80 opacity-40" aria-hidden="true">
          <div 
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#055926] to-[#D4A72C] opacity-25 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" 
            style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}
          />
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
    </div>
  );
}
