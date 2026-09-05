import { useState, type FormEvent } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { 
  Shield, 
  Briefcase, 
  UserCheck, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2, 
  Lock, 
  Mail, 
  Phone, 
  User, 
  Building2, 
  Eye, 
  EyeOff, 
  Wallet, 
  TrendingUp, 
  Receipt, 
  Users, 
  Check,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

export default function Register() {
  const [searchParams] = useSearchParams();
  const planParam = searchParams.get('plan');
  const roleParam = searchParams.get('role');

  const [accountType, setAccountType] = useState<'TENANT_COLLECTOR' | 'CONTRIBUTOR'>(
    roleParam === 'contributor' ? 'CONTRIBUTOR' : 'TENANT_COLLECTOR'
  );
  
  const [orgName, setOrgName] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, updateTenant } = useAuth();
  const navigate = useNavigate();

  const handleRegister = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      login(email, {
        name: accountType === 'TENANT_COLLECTOR' ? (orgName || name || email.split('@')[0]) : (name || email.split('@')[0]),
        phone,
        accountType,
        role: accountType === 'CONTRIBUTOR' ? 'CONTRIBUTOR' : 'TENANT_OWNER',
      });

      if (accountType === 'TENANT_COLLECTOR') {
        if (orgName || name) {
          updateTenant({ name: orgName || name });
        }
        navigate('/onboarding');
      } else {
        navigate('/dashboard');
      }
      setIsSubmitting(false);
    }, 400);
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#FAFAF7] text-[#172018]">
      
      {/* ========================================================= */}
      {/* LEFT SIDE: Information about AJOMI & Dynamic Role Benefits */}
      {/* ========================================================= */}
      <div className="lg:w-[48%] xl:w-[46%] bg-gradient-to-br from-[#022410] via-[#055926] to-[#043c19] text-white p-6 sm:p-10 lg:p-12 xl:p-14 flex flex-col justify-between relative overflow-hidden">
        
        {/* Subtle decorative background elements */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[#D4A72C]/10 blur-3xl pointer-events-none" />
        
        {/* Top Header & Brand */}
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 border border-white/25 shadow-md shadow-black/20 backdrop-blur-md group-hover:scale-105 transition-transform">
                <Shield className="h-6 w-6 text-[#fcf9ee]" />
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-white flex items-center gap-1.5">
                  AJOMI
                  <span className="text-[10px] uppercase font-bold tracking-widest bg-[#D4A72C] text-[#022410] px-2 py-0.5 rounded-full">
                    Cloud
                  </span>
                </span>
                <p className="text-[11px] font-medium text-emerald-100/70">
                  Digital Thrift & Cooperative Platform
                </p>
              </div>
            </Link>

            <Link 
              to="/" 
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-100/80 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full border border-white/15 backdrop-blur-xs transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Home</span>
            </Link>
          </div>

          {/* Intro description of AJOMI */}
          <div className="mt-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D4A72C]/40 bg-white/10 px-3.5 py-1 text-xs font-bold text-[#fcf9ee] backdrop-blur-xs">
              <Sparkles className="h-3.5 w-3.5 text-[#D4A72C]" />
              <span>Modernizing Nigerian Ajo, Esusu & Thrift</span>
            </div>
            <h1 className="mt-3 text-2xl sm:text-3xl xl:text-4xl font-black tracking-tight text-white leading-tight">
              Replace paper passbooks with real-time financial trust.
            </h1>
            <p className="mt-3 text-xs sm:text-sm text-emerald-100/85 leading-relaxed">
              AJOMI provides a secure, all-in-one cloud platform for thrift operators, daily collectors, cooperatives, and individual savers to record contributions, automate reconciliations, and verify balances with 100% transparency.
            </p>
          </div>
        </div>

        {/* Dynamic Benefits Section based on accountType selection */}
        <div className="relative z-10 my-8 rounded-3xl border border-white/15 bg-white/10 p-5 sm:p-7 backdrop-blur-md shadow-xl shadow-black/10">
          
          {/* Active Role Indicator on Left */}
          <div className="flex items-center justify-between border-b border-white/15 pb-4 mb-5">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#D4A72C]">
                {accountType === 'TENANT_COLLECTOR' ? 'Collector Platform Perks' : 'Contributor Protection Perks'}
              </p>
              <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">
                {accountType === 'TENANT_COLLECTOR' 
                  ? 'Key Benefits for Collectors & Coops' 
                  : 'Key Benefits for Contributors & Savers'}
              </h3>
            </div>
            
            {/* Quick switcher badge */}
            <button
              type="button"
              onClick={() => setAccountType(accountType === 'TENANT_COLLECTOR' ? 'CONTRIBUTOR' : 'TENANT_COLLECTOR')}
              className="text-[11px] font-semibold text-emerald-200 hover:text-white underline decoration-emerald-400 underline-offset-4"
            >
              Switch view
            </button>
          </div>

          {/* Dynamic Benefits List */}
          {accountType === 'TENANT_COLLECTOR' ? (
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-400/20 text-[#D4A72C] border border-emerald-400/30">
                  <Receipt className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">Instant Daily Collection Recording</h4>
                  <p className="text-[11px] sm:text-xs text-emerald-100/80 leading-relaxed mt-0.5">
                    Log daily, weekly, and monthly deposits in 3 seconds. Completely replaces paper cards and eliminates manual arithmetic.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-400/20 text-[#D4A72C] border border-emerald-400/30">
                  <Users className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">Field Agent Management & Live Reconciliation</h4>
                  <p className="text-[11px] sm:text-xs text-emerald-100/80 leading-relaxed mt-0.5">
                    Assign field agents with daily collection ceilings, secure PIN logins, and instant end-of-day cash balancing to stop leakages.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-400/20 text-[#D4A72C] border border-emerald-400/30">
                  <Shield className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">Zero Missing Passbook Disputes</h4>
                  <p className="text-[11px] sm:text-xs text-emerald-100/80 leading-relaxed mt-0.5">
                    Every transaction creates an immutable digital audit footprint with encrypted timestamps and automated customer SMS/WhatsApp receipts.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-400/20 text-[#D4A72C] border border-emerald-400/30">
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">Automated Payout Rotations & Commission Splits</h4>
                  <p className="text-[11px] sm:text-xs text-emerald-100/80 leading-relaxed mt-0.5">
                    Set up rotating Ajo circles or fixed savings targets. Deduct organizer management fees automatically and disburse payouts directly.
                  </p>
                </div>
              </div>

              {/* Collector Quote */}
              <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-emerald-100/90 italic">
                "Switching from paper cards to AJOMI saved our thrift union 14 hours every weekend and eliminated customer arguments completely."
                <span className="block mt-1 font-semibold not-italic text-[#fcf9ee]">
                  — Mrs. Folashade A., Thrift Collector, Alaba Market
                </span>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-400/20 text-[#D4A72C] border border-emerald-400/30">
                  <Receipt className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">Instant SMS & WhatsApp Payment Confirmation</h4>
                  <p className="text-[11px] sm:text-xs text-emerald-100/80 leading-relaxed mt-0.5">
                    Receive an immediate digital receipt with a unique transaction reference the exact second your collector records your deposit.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-400/20 text-[#D4A72C] border border-emerald-400/30">
                  <Wallet className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">24/7 Real-Time Passbook on Your Phone</h4>
                  <p className="text-[11px] sm:text-xs text-emerald-100/80 leading-relaxed mt-0.5">
                    View your verified total balance, completed contribution stamps, and goal progress anytime without having to call your collector.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-400/20 text-[#D4A72C] border border-emerald-400/30">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">Zero Risk of Lost or Torn Paper Cards</h4>
                  <p className="text-[11px] sm:text-xs text-emerald-100/80 leading-relaxed mt-0.5">
                    Your savings ledger is permanently secured in the cloud. Even if your physical card is lost or damaged, your money is 100% safe.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-400/20 text-[#D4A72C] border border-emerald-400/30">
                  <Shield className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">Vetted Schemes & Guaranteed Payout Alerts</h4>
                  <p className="text-[11px] sm:text-xs text-emerald-100/80 leading-relaxed mt-0.5">
                    Save exclusively with authenticated managers and get notified well in advance when your payout turn or target maturity arrives.
                  </p>
                </div>
              </div>

              {/* Contributor Quote */}
              <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-emerald-100/90 italic">
                "I check my Esusu balance right from my phone every single evening. I have complete peace of mind that my hard-earned savings are safe."
                <span className="block mt-1 font-semibold not-italic text-[#fcf9ee]">
                  — Emeka O., Daily Contributor & Retailer, Trade Fair
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Trust & Security Badges */}
        <div className="relative z-10 pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-3 text-xs text-emerald-100/80">
          <div className="flex items-center gap-1.5">
            <Lock className="h-3.5 w-3.5 text-[#D4A72C]" />
            <span>256-Bit Bank-Grade Encryption</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="h-3.5 w-3.5 text-[#D4A72C]" />
            <span>NDPR Data Protection Compliant</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Shield className="h-3.5 w-3.5 text-[#D4A72C]" />
            <span>99.9% Cloud Uptime Guarantee</span>
          </div>
        </div>

      </div>

      {/* ========================================================= */}
      {/* RIGHT SIDE: The Registration Form with Collector / Contributor options */}
      {/* ========================================================= */}
      <div className="lg:w-[52%] xl:w-[54%] flex flex-col justify-center bg-white p-6 sm:p-10 lg:p-14 xl:p-16 overflow-y-auto">
        
        <div className="max-w-xl w-full mx-auto">
          
          {/* Top login quick-action */}
          <div className="flex items-center justify-between pb-6 border-b border-[#EAE8DF] mb-8">
            <span className="text-xs text-[#586359]">
              Already registered on AJOMI?
            </span>
            <Link 
              to="/login" 
              className="inline-flex items-center gap-1 text-xs font-bold text-[#055926] hover:underline"
            >
              <span>Log in to your account</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Form Header */}
          <div className="mb-6">
            {planParam && accountType === 'TENANT_COLLECTOR' && (
              <div className="inline-flex items-center gap-1.5 rounded-full bg-[#f0f7f2] border border-[#dceed2] px-3 py-0.5 text-xs font-bold text-[#055926] mb-3">
                <Check className="h-3 w-3" />
                <span>Selected Plan: AJOMI {planParam.charAt(0).toUpperCase() + planParam.slice(1)}</span>
              </div>
            )}
            
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#172018]">
              {accountType === 'TENANT_COLLECTOR' ? 'Start Your 14-Day Free Trial' : 'Create Contributor Account'}
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-[#586359] leading-relaxed">
              {accountType === 'TENANT_COLLECTOR'
                ? 'Join hundreds of thrift collectors and cooperatives across Nigeria. No credit card required.'
                : 'Track your daily thrift contributions, verified deposits, and payouts in real-time.'}
            </p>
          </div>

          {/* Step 1: Account Type Selection (Collector vs Contributor) */}
          <div className="mb-6">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#586359] mb-2.5">
              Select Registration Type:
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Option A: Collector */}
              <button
                type="button"
                onClick={() => setAccountType('TENANT_COLLECTOR')}
                className={`relative flex flex-col justify-between p-4 rounded-2xl border-2 text-left transition-all ${
                  accountType === 'TENANT_COLLECTOR'
                    ? 'border-[#055926] bg-[#f0f7f2] shadow-sm shadow-[#055926]/10'
                    : 'border-[#EAE8DF] bg-white hover:border-gray-300'
                }`}
                id="role-select-collector-btn"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-xl ${
                    accountType === 'TENANT_COLLECTOR' ? 'bg-[#055926] text-white' : 'bg-gray-100 text-[#586359]'
                  }`}>
                    <Briefcase className="h-5 w-5" />
                  </div>
                  {accountType === 'TENANT_COLLECTOR' && (
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#055926] text-white text-xs font-bold">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                  )}
                </div>
                <div>
                  <div className="text-sm font-extrabold text-[#172018]">
                    Tenant / Collector
                  </div>
                  <div className="text-xs text-[#586359] mt-0.5">
                    Thrift operators, cooperative managers & field agents
                  </div>
                </div>
              </button>

              {/* Option B: Contributor */}
              <button
                type="button"
                onClick={() => setAccountType('CONTRIBUTOR')}
                className={`relative flex flex-col justify-between p-4 rounded-2xl border-2 text-left transition-all ${
                  accountType === 'CONTRIBUTOR'
                    ? 'border-[#055926] bg-[#f0f7f2] shadow-sm shadow-[#055926]/10'
                    : 'border-[#EAE8DF] bg-white hover:border-gray-300'
                }`}
                id="role-select-contributor-btn"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-xl ${
                    accountType === 'CONTRIBUTOR' ? 'bg-[#055926] text-white' : 'bg-gray-100 text-[#586359]'
                  }`}>
                    <UserCheck className="h-5 w-5" />
                  </div>
                  {accountType === 'CONTRIBUTOR' && (
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#055926] text-white text-xs font-bold">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                  )}
                </div>
                <div>
                  <div className="text-sm font-extrabold text-[#172018]">
                    Contributor / Saver
                  </div>
                  <div className="text-xs text-[#586359] mt-0.5">
                    Daily thrift savers, Ajo/Esusu members & individuals
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Form Fields */}
          <form className="space-y-4" onSubmit={handleRegister}>
            
            {/* Collector-Specific Field: Scheme or Organization Name */}
            {accountType === 'TENANT_COLLECTOR' ? (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#586359]">
                  Organization / Scheme / Business Name <span className="text-red-500">*</span>
                </label>
                <div className="mt-1.5 relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#586359]">
                    <Building2 className="h-4 w-4" />
                  </div>
                  <Input 
                    type="text" 
                    required 
                    value={orgName} 
                    onChange={(e) => setOrgName(e.target.value)}
                    placeholder="e.g. Alaba Daily Thrift Scheme or Goodness Coop"
                    className="h-11 pl-10 rounded-xl text-sm"
                    id="register-org-name"
                  />
                </div>
              </div>
            ) : null}

            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#586359]">
                {accountType === 'TENANT_COLLECTOR' ? 'Manager / Contact Full Name' : 'Your Full Name'} <span className="text-red-500">*</span>
              </label>
              <div className="mt-1.5 relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#586359]">
                  <User className="h-4 w-4" />
                </div>
                <Input 
                  type="text" 
                  required 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  placeholder={accountType === 'TENANT_COLLECTOR' ? 'e.g. Babatunde Adeleke' : 'e.g. Chidinma Okafor'}
                  className="h-11 pl-10 rounded-xl text-sm"
                  id="register-full-name"
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#586359]">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="mt-1.5 relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#586359]">
                  <Mail className="h-4 w-4" />
                </div>
                <Input 
                  type="email" 
                  required 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="h-11 pl-10 rounded-xl text-sm"
                  id="register-email"
                />
              </div>
            </div>

            {/* Phone Number (SMS / WhatsApp) */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#586359]">
                Phone / WhatsApp Number <span className="text-red-500">*</span>
                <span className="font-normal normal-case text-gray-500 ml-1">
                  (For deposit SMS & alerts)
                </span>
              </label>
              <div className="mt-1.5 relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#586359]">
                  <Phone className="h-4 w-4" />
                </div>
                <Input 
                  type="tel" 
                  required
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0803 123 4567"
                  className="h-11 pl-10 rounded-xl text-sm"
                  id="register-phone"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#586359]">
                Create Secure Password <span className="text-red-500">*</span>
              </label>
              <div className="mt-1.5 relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#586359]">
                  <Lock className="h-4 w-4" />
                </div>
                <Input 
                  type={showPassword ? 'text' : 'password'} 
                  required 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="h-11 pl-10 pr-10 rounded-xl text-sm"
                  id="register-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#586359] hover:text-[#172018]"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Terms and consent */}
            <div className="pt-1">
              <label className="flex items-start gap-2 cursor-pointer text-xs text-[#586359]">
                <input 
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  required
                  className="mt-0.5 rounded border-gray-300 text-[#055926] focus:ring-[#055926]"
                />
                <span>
                  I agree to the <span className="font-semibold text-[#055926]">Terms of Service</span>, <span className="font-semibold text-[#055926]">Privacy Policy</span>, and to receive automated deposit receipts via SMS/WhatsApp.
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-3">
              <Button 
                type="submit" 
                disabled={isSubmitting || !agreeTerms}
                className="w-full justify-center h-12 rounded-2xl text-sm font-bold shadow-lg shadow-[#055926]/20 bg-[#055926] hover:bg-[#04471e] text-white active:scale-[0.99] transition-all"
                id="register-submit-btn"
              >
                <span>
                  {isSubmitting 
                    ? 'Creating Account...' 
                    : accountType === 'TENANT_COLLECTOR' 
                      ? 'Start 14-Day Free Trial as Collector' 
                      : 'Complete Registration as Contributor'}
                </span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>

          {/* Bottom security assurance */}
          <div className="mt-8 pt-6 border-t border-[#EAE8DF] flex items-center justify-center gap-2 text-xs text-[#586359]">
            <Lock className="h-3.5 w-3.5 text-[#055926]" />
            <span>Instant account setup • No credit card required • Cancel anytime</span>
          </div>

        </div>

      </div>

    </div>
  );
}
