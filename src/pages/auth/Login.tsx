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

export default function Login() {
  const [searchParams] = useSearchParams();
  const roleParam = searchParams.get('role');

  const [accountType, setAccountType] = useState<'TENANT_COLLECTOR' | 'CONTRIBUTOR'>(
    roleParam === 'contributor' ? 'CONTRIBUTOR' : 'TENANT_COLLECTOR'
  );

  const [identifier, setIdentifier] = useState(
    accountType === 'TENANT_COLLECTOR' ? 'manager@thriftcoop.ng' : 'saver@ajomi.ng'
  );
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRoleChange = (newRole: 'TENANT_COLLECTOR' | 'CONTRIBUTOR') => {
    setAccountType(newRole);
    if (newRole === 'TENANT_COLLECTOR') {
      if (identifier === 'saver@ajomi.ng') {
        setIdentifier('manager@thriftcoop.ng');
      }
    } else {
      if (identifier === 'manager@thriftcoop.ng') {
        setIdentifier('saver@ajomi.ng');
      }
    }
  };

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (!identifier) return;

    setIsSubmitting(true);
    setTimeout(() => {
      login(identifier, {
        accountType,
        role: accountType === 'CONTRIBUTOR' ? 'CONTRIBUTOR' : 'TENANT_OWNER',
        name: accountType === 'CONTRIBUTOR' 
          ? (identifier.includes('@') ? identifier.split('@')[0] : 'Contributor Saver')
          : (identifier.includes('@') ? identifier.split('@')[0] : 'Thrift Manager'),
      });
      navigate('/dashboard');
      setIsSubmitting(false);
    }, 350);
  };

  const handleQuickDemo = (demoRole: 'TENANT_COLLECTOR' | 'CONTRIBUTOR') => {
    handleRoleChange(demoRole);
    if (demoRole === 'TENANT_COLLECTOR') {
      setIdentifier('manager@thriftcoop.ng');
      setPassword('password123');
    } else {
      setIdentifier('saver@ajomi.ng');
      setPassword('password123');
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#FAFAF7] text-[#172018]">
      
      {/* ========================================================= */}
      {/* LEFT SIDE: Login Form (Option for Collector or Contributor) */}
      {/* ========================================================= */}
      <div className="lg:w-[52%] xl:w-[54%] flex flex-col justify-between bg-white p-6 sm:p-10 lg:p-14 xl:p-16 overflow-y-auto">
        
        {/* Top brand & navigation bar */}
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-[#EAE8DF] mb-8">
            <Link to="/" className="inline-flex items-center gap-2.5 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#055926] shadow-sm shadow-[#055926]/20 group-hover:scale-105 transition-transform">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-black tracking-tight text-[#172018]">
                AJOMI
              </span>
            </Link>

            <Link 
              to="/" 
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#586359] hover:text-[#172018] bg-[#FAFAF7] hover:bg-gray-100 px-3 py-1.5 rounded-full border border-[#EAE8DF] transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Home</span>
            </Link>
          </div>

          <div className="max-w-md w-full mx-auto">
            
            {/* Form Header */}
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#172018]">
                Welcome back
              </h1>
              <p className="mt-1.5 text-xs sm:text-sm text-[#586359] leading-relaxed">
                Sign in to manage contributions, view ledger stamps, and track balances.
              </p>
            </div>

            {/* Option to login as Collector or Contributor */}
            <div className="mb-6">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#586359] mb-2.5">
                Login as:
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Collector / Operator Option */}
                <button
                  type="button"
                  onClick={() => handleRoleChange('TENANT_COLLECTOR')}
                  className={`relative flex items-center gap-3 p-3.5 rounded-2xl border-2 text-left transition-all ${
                    accountType === 'TENANT_COLLECTOR'
                      ? 'border-[#055926] bg-[#f0f7f2] shadow-sm shadow-[#055926]/10'
                      : 'border-[#EAE8DF] bg-white hover:border-gray-300'
                  }`}
                  id="login-role-collector-btn"
                >
                  <div className={`p-2 rounded-xl shrink-0 ${
                    accountType === 'TENANT_COLLECTOR' ? 'bg-[#055926] text-white' : 'bg-gray-100 text-[#586359]'
                  }`}>
                    <Briefcase className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold text-[#172018] flex items-center justify-between">
                      <span>Collector / Operator</span>
                      {accountType === 'TENANT_COLLECTOR' && (
                        <Check className="h-3.5 w-3.5 text-[#055926]" />
                      )}
                    </div>
                    <div className="text-[11px] text-[#586359] truncate mt-0.5">
                      Thrift organizers & agents
                    </div>
                  </div>
                </button>

                {/* Contributor / Saver Option */}
                <button
                  type="button"
                  onClick={() => handleRoleChange('CONTRIBUTOR')}
                  className={`relative flex items-center gap-3 p-3.5 rounded-2xl border-2 text-left transition-all ${
                    accountType === 'CONTRIBUTOR'
                      ? 'border-[#055926] bg-[#f0f7f2] shadow-sm shadow-[#055926]/10'
                      : 'border-[#EAE8DF] bg-white hover:border-gray-300'
                  }`}
                  id="login-role-contributor-btn"
                >
                  <div className={`p-2 rounded-xl shrink-0 ${
                    accountType === 'CONTRIBUTOR' ? 'bg-[#055926] text-white' : 'bg-gray-100 text-[#586359]'
                  }`}>
                    <UserCheck className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold text-[#172018] flex items-center justify-between">
                      <span>Contributor / Saver</span>
                      {accountType === 'CONTRIBUTOR' && (
                        <Check className="h-3.5 w-3.5 text-[#055926]" />
                      )}
                    </div>
                    <div className="text-[11px] text-[#586359] truncate mt-0.5">
                      Daily savers & members
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Login Form */}
            <form className="space-y-4" onSubmit={handleLogin}>
              
              {/* Identifier Input */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#586359]">
                  {accountType === 'TENANT_COLLECTOR' ? 'Manager / Collector Email' : 'Saver Email or Phone Number'}
                </label>
                <div className="mt-1.5 relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#586359]">
                    {accountType === 'TENANT_COLLECTOR' ? (
                      <Mail className="h-4 w-4" />
                    ) : (
                      <Phone className="h-4 w-4" />
                    )}
                  </div>
                  <Input 
                    type={accountType === 'TENANT_COLLECTOR' ? 'email' : 'text'} 
                    required 
                    value={identifier} 
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder={accountType === 'TENANT_COLLECTOR' ? 'manager@thriftcoop.ng' : '0803 123 4567 or saver@ajomi.ng'}
                    className="h-11 pl-10 rounded-xl text-sm"
                    id="login-identifier-input"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#586359]">
                    Password
                  </label>
                  <a 
                    href="#forgot-password" 
                    onClick={(e) => {
                      e.preventDefault();
                      alert("Password reset instructions have been simulated to your email/phone number.");
                    }}
                    className="text-xs font-semibold text-[#055926] hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>
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
                    id="login-password-input"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#586359] hover:text-[#172018]"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-[#586359]">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-[#055926] focus:ring-[#055926]"
                    id="login-remember-checkbox"
                  />
                  <span>Remember this device for 30 days</span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full justify-center h-12 rounded-2xl text-sm font-bold shadow-lg shadow-[#055926]/20 bg-[#055926] hover:bg-[#04471e] text-white active:scale-[0.99] transition-all"
                  id="login-submit-btn"
                >
                  <span>
                    {isSubmitting 
                      ? 'Signing in...' 
                      : accountType === 'TENANT_COLLECTOR' 
                        ? 'Sign in as Collector' 
                        : 'Sign in as Contributor'}
                  </span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>

            {/* Quick Demo Switcher Buttons */}
            <div className="mt-6 rounded-2xl border border-[#D4A72C]/35 bg-[#fcf9ee] p-3.5 text-center">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#986d15] flex items-center justify-center gap-1.5 mb-2">
                <Sparkles className="h-3.5 w-3.5 text-[#D4A72C]" />
                Instant Demo Logins
              </p>
              <div className="flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickDemo('TENANT_COLLECTOR')}
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white border border-[#D4A72C]/40 text-[#172018] hover:bg-emerald-50 transition-colors"
                >
                  Demo as Collector
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemo('CONTRIBUTOR')}
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white border border-[#D4A72C]/40 text-[#172018] hover:bg-emerald-50 transition-colors"
                >
                  Demo as Contributor
                </button>
              </div>
            </div>

            {/* Link to Registration */}
            <div className="mt-6 pt-5 border-t border-[#EAE8DF] text-center">
              <p className="text-xs text-[#586359]">
                Don't have an AJOMI account yet?{' '}
                <Link 
                  to={accountType === 'TENANT_COLLECTOR' ? '/register?role=collector' : '/register?role=contributor'} 
                  className="font-bold text-[#055926] hover:underline"
                >
                  {accountType === 'TENANT_COLLECTOR' ? 'Start 14-day free trial' : 'Register as a contributor'}
                </Link>
              </p>
            </div>

          </div>
        </div>

        {/* Bottom Security Footer */}
        <div className="mt-8 pt-4 border-t border-[#EAE8DF] max-w-md w-full mx-auto flex items-center justify-center gap-2 text-xs text-[#586359]">
          <Lock className="h-3.5 w-3.5 text-[#055926]" />
          <span>256-Bit SSL Encrypted • Row-Level Multi-Tenant Protection</span>
        </div>

      </div>

      {/* ========================================================= */}
      {/* RIGHT SIDE: Information about AJOMI & Dynamic Role Benefits */}
      {/* ========================================================= */}
      <div className="lg:w-[48%] xl:w-[46%] bg-gradient-to-br from-[#022410] via-[#055926] to-[#043c19] text-white p-6 sm:p-10 lg:p-12 xl:p-14 flex flex-col justify-between relative overflow-hidden">
        
        {/* Decorative blur glows */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#D4A72C]/10 blur-3xl pointer-events-none" />

        {/* Top Info about AJOMI */}
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D4A72C]/40 bg-white/10 px-3.5 py-1 text-xs font-bold text-[#fcf9ee] backdrop-blur-xs">
            <Sparkles className="h-3.5 w-3.5 text-[#D4A72C]" />
            <span>Digital Thrift & Cooperative Platform</span>
          </div>

          <h2 className="mt-3 text-2xl sm:text-3xl xl:text-4xl font-black tracking-tight text-white leading-tight">
            Modernizing Nigerian Ajo, Esusu & Thrift Schemes.
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-emerald-100/85 leading-relaxed">
            AJOMI replaces handwritten passbooks with an encrypted, cloud-backed financial system. Trusted by market unions, thrift operators, cooperative societies, and individual daily contributors across Nigeria.
          </p>
        </div>

        {/* Dynamic Benefits Section based on selected role */}
        <div className="relative z-10 my-8 rounded-3xl border border-white/15 bg-white/10 p-5 sm:p-7 backdrop-blur-md shadow-xl shadow-black/10">
          
          {/* Header of Benefits Box */}
          <div className="flex items-center justify-between border-b border-white/15 pb-4 mb-5">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#D4A72C]">
                {accountType === 'TENANT_COLLECTOR' ? 'Collector Platform Advantages' : 'Contributor Protection Advantages'}
              </p>
              <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">
                {accountType === 'TENANT_COLLECTOR' 
                  ? 'Why Collectors & Coops Use AJOMI' 
                  : 'Why Savers & Contributors Trust AJOMI'}
              </h3>
            </div>

            {/* Quick role switcher link */}
            <button
              type="button"
              onClick={() => handleRoleChange(accountType === 'TENANT_COLLECTOR' ? 'CONTRIBUTOR' : 'TENANT_COLLECTOR')}
              className="text-[11px] font-semibold text-emerald-200 hover:text-white underline decoration-emerald-400 underline-offset-4"
            >
              Switch view
            </button>
          </div>

          {/* Dynamic Content */}
          {accountType === 'TENANT_COLLECTOR' ? (
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-400/20 text-[#D4A72C] border border-emerald-400/30">
                  <Receipt className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">3-Second Digital Collection Logging</h4>
                  <p className="text-[11px] sm:text-xs text-emerald-100/80 leading-relaxed mt-0.5">
                    Record daily, weekly, or monthly deposits with zero mental arithmetic or duplicate handwritten entries.
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
                    Set daily collection ceilings, secure PIN logins for field collectors, and balance cash instantly at end-of-day.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-400/20 text-[#D4A72C] border border-emerald-400/30">
                  <Shield className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">Zero Passbook Disputes</h4>
                  <p className="text-[11px] sm:text-xs text-emerald-100/80 leading-relaxed mt-0.5">
                    Automated SMS and WhatsApp receipts are sent to savers the exact instant cash is collected, creating an indisputable audit trail.
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
                    Manage rotating Ajo cycles effortlessly. Deduct organizer management commissions automatically before dishing out payouts.
                  </p>
                </div>
              </div>

              {/* Collector Testimonial */}
              <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-emerald-100/90 italic">
                "Switching from paper cards to AJOMI eliminated missing ledger rows completely and saved our union 14 hours every single weekend."
                <span className="block mt-1 font-semibold not-italic text-[#fcf9ee]">
                  — Mrs. Folashade A., Alaba Market Thrift Union
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
                  <h4 className="text-xs sm:text-sm font-bold text-white">Instant SMS & WhatsApp Receipts</h4>
                  <p className="text-[11px] sm:text-xs text-emerald-100/80 leading-relaxed mt-0.5">
                    Get an immediate digital confirmation with a unique transaction reference the second you hand cash to your collector.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-400/20 text-[#D4A72C] border border-emerald-400/30">
                  <Wallet className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">24/7 Phone Passbook</h4>
                  <p className="text-[11px] sm:text-xs text-emerald-100/80 leading-relaxed mt-0.5">
                    Check your verified savings balance, stamp history, and target completion anytime without having to call your collector.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-400/20 text-[#D4A72C] border border-emerald-400/30">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">Zero Risk of Lost Paper Cards</h4>
                  <p className="text-[11px] sm:text-xs text-emerald-100/80 leading-relaxed mt-0.5">
                    Your savings ledger is safely stored in the cloud. Even if your paper card gets torn or lost, your money remains 100% accounted for.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-400/20 text-[#D4A72C] border border-emerald-400/30">
                  <Shield className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">Guaranteed Payout Rotation Alerts</h4>
                  <p className="text-[11px] sm:text-xs text-emerald-100/80 leading-relaxed mt-0.5">
                    Receive clear countdown alerts when your payout collection date approaches so you can plan business investments with confidence.
                  </p>
                </div>
              </div>

              {/* Contributor Testimonial */}
              <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-emerald-100/90 italic">
                "I check my Esusu balance from my phone every single evening. I have 100% peace of mind that my daily hard work is safe."
                <span className="block mt-1 font-semibold not-italic text-[#fcf9ee]">
                  — Emeka O., Daily Contributor & Retailer, Trade Fair
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Trust & Compliance Footnote */}
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
            <span>99.9% Uptime Guarantee</span>
          </div>
        </div>

      </div>

    </div>
  );
}
