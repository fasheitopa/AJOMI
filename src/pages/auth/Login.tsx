import React, { useState, useRef, type FormEvent } from 'react';
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
  Sparkles,
  KeyRound,
  FileSpreadsheet,
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

export default function Login() {
  const [searchParams] = useSearchParams();
  const roleParam = searchParams.get('role');

  // Role toggle: Tenant/Collector or Contributor
  const [accountType, setAccountType] = useState<'TENANT_COLLECTOR' | 'CONTRIBUTOR'>(
    roleParam === 'contributor' ? 'CONTRIBUTOR' : 'TENANT_COLLECTOR'
  );

  // Collector fields: ID / Email & Password
  const [collectorId, setCollectorId] = useState('manager@thriftcoop.ng');
  const [collectorPassword, setCollectorPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);

  // Contributor fields: ID / Phone Number & 4-Digit PIN
  const [contributorId, setContributorId] = useState('0803 123 4567');
  const [pin, setPin] = useState<string[]>(['4', '2', '1', '9']);
  const [showPin, setShowPin] = useState(false);

  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const pinRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRoleChange = (newRole: 'TENANT_COLLECTOR' | 'CONTRIBUTOR') => {
    setAccountType(newRole);
    setErrorMessage(null);
  };

  // PIN input handlers for 4 separate slots
  const handlePinSlotChange = (index: number, value: string) => {
    setErrorMessage(null);
    const cleaned = value.replace(/\D/g, '');

    // Multi-digit paste or autofill
    if (cleaned.length > 1) {
      const digits = cleaned.slice(0, 4).split('');
      const updated = [...pin];
      for (let i = 0; i < 4; i++) {
        if (digits[i] !== undefined) {
          updated[i] = digits[i];
        }
      }
      setPin(updated);
      const nextIdx = Math.min(digits.length, 3);
      pinRefs[nextIdx]?.current?.focus();
      return;
    }

    const updated = [...pin];
    updated[index] = cleaned;
    setPin(updated);

    // Auto-advance to next slot
    if (cleaned && index < 3) {
      pinRefs[index + 1]?.current?.focus();
    }
  };

  const handlePinKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!pin[index] && index > 0) {
        // Move back to previous slot and clear it
        const updated = [...pin];
        updated[index - 1] = '';
        setPin(updated);
        pinRefs[index - 1]?.current?.focus();
      }
    }
  };

  const handlePinPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4);
    if (pasteData) {
      const digits = pasteData.split('');
      const updated = ['', '', '', ''];
      digits.forEach((d, i) => {
        if (i < 4) updated[i] = d;
      });
      setPin(updated);
      const focusTarget = Math.min(digits.length, 3);
      pinRefs[focusTarget]?.current?.focus();
    }
  };

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (accountType === 'TENANT_COLLECTOR') {
      if (!collectorId.trim()) {
        setErrorMessage('Please enter your Collector ID or registered Email address.');
        return;
      }
      if (!collectorPassword.trim()) {
        setErrorMessage('Please enter your account password.');
        return;
      }

      setIsSubmitting(true);
      setTimeout(() => {
        login(collectorId.trim(), {
          accountType: 'TENANT_COLLECTOR',
          role: 'TENANT_OWNER',
          name: collectorId.includes('@') 
            ? collectorId.split('@')[0].replace('.', ' ') 
            : `Collector ${collectorId}`,
        });
        navigate('/dashboard');
        setIsSubmitting(false);
      }, 350);

    } else {
      // Contributor Login
      if (!contributorId.trim()) {
        setErrorMessage('Please enter your Contributor ID or Phone Number.');
        return;
      }

      const completePin = pin.join('');
      if (completePin.length < 4) {
        setErrorMessage('Please enter all 4 digits of your security PIN.');
        return;
      }

      setIsSubmitting(true);
      setTimeout(() => {
        login(contributorId.trim(), {
          accountType: 'CONTRIBUTOR',
          role: 'CONTRIBUTOR',
          name: contributorId.startsWith('0') || contributorId.startsWith('+')
            ? `Saver (${contributorId.slice(-4)})`
            : `Member ${contributorId}`,
          phone: contributorId,
        });
        navigate('/dashboard');
        setIsSubmitting(false);
      }, 350);
    }
  };

  const handleQuickDemo = (demoRole: 'TENANT_COLLECTOR' | 'CONTRIBUTOR') => {
    handleRoleChange(demoRole);
    setErrorMessage(null);
    if (demoRole === 'TENANT_COLLECTOR') {
      setCollectorId('manager@thriftcoop.ng');
      setCollectorPassword('password123');
    } else {
      setContributorId('0803 123 4567');
      setPin(['4', '2', '1', '9']);
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
                {accountType === 'TENANT_COLLECTOR'
                  ? 'Sign in as a thrift organizer, coop manager, or field collector using your ID/Email & Password.'
                  : 'Sign in as a daily saver or scheme member using your ID/Phone Number & 4-digit PIN.'}
              </p>
            </div>

            {/* Role Selection: Collector vs Contributor */}
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
                      <span>Tenant / Collector</span>
                      {accountType === 'TENANT_COLLECTOR' && (
                        <Check className="h-3.5 w-3.5 text-[#055926]" />
                      )}
                    </div>
                    <div className="text-[11px] text-[#586359] truncate mt-0.5">
                      ID/Email & Password
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
                      ID/Phone & 4-Digit PIN
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Error banner if validation fails */}
            {errorMessage && (
              <div className="mb-4 flex items-center gap-2 rounded-xl bg-red-50 border border-red-200 p-3 text-xs text-red-700">
                <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* ================= LOGIN FORM ================= */}
            <form className="space-y-4" onSubmit={handleLogin}>
              
              {/* ================= TENANT / COLLECTOR FORM FIELDS ================= */}
              {accountType === 'TENANT_COLLECTOR' ? (
                <>
                  {/* Field 1: Collector ID or Email */}
                  <div>
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#586359]">
                        Collector ID or Email
                      </label>
                      <span className="text-[11px] text-gray-500 font-normal">
                        e.g. TC-8821 or name@org.ng
                      </span>
                    </div>
                    <div className="mt-1.5 relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#586359]">
                        <Mail className="h-4 w-4" />
                      </div>
                      <Input 
                        type="text" 
                        required 
                        value={collectorId} 
                        onChange={(e) => setCollectorId(e.target.value)}
                        placeholder="manager@thriftcoop.ng or TC-8821"
                        className="h-11 pl-10 rounded-xl text-sm"
                        id="login-collector-id-email"
                      />
                    </div>
                  </div>

                  {/* Field 2: Password */}
                  <div>
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#586359]">
                        Password
                      </label>
                      <a 
                        href="#forgot-password" 
                        onClick={(e) => {
                          e.preventDefault();
                          alert("Password reset link has been dispatched to your registered collector email.");
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
                        value={collectorPassword} 
                        onChange={(e) => setCollectorPassword(e.target.value)}
                        placeholder="••••••••"
                        className="h-11 pl-10 pr-10 rounded-xl text-sm"
                        id="login-collector-password"
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
                </>
              ) : (
                /* ================= CONTRIBUTOR / SAVER FORM FIELDS ================= */
                <>
                  {/* Field 1: Contributor ID or Phone Number */}
                  <div>
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#586359]">
                        Contributor ID or Phone Number
                      </label>
                      <span className="text-[11px] text-gray-500 font-normal">
                        e.g. AJM-4091 or 0803...
                      </span>
                    </div>
                    <div className="mt-1.5 relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#586359]">
                        <Phone className="h-4 w-4" />
                      </div>
                      <Input 
                        type="text" 
                        required 
                        value={contributorId} 
                        onChange={(e) => setContributorId(e.target.value)}
                        placeholder="0803 123 4567 or AJM-4091"
                        className="h-11 pl-10 rounded-xl text-sm"
                        id="login-contributor-id-phone"
                      />
                    </div>
                  </div>

                  {/* Field 2: 4-Digit Security PIN */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#586359] flex items-center gap-1.5">
                        <KeyRound className="h-3.5 w-3.5 text-[#055926]" />
                        <span>4-Digit Security PIN</span>
                      </label>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setShowPin(!showPin)}
                          className="text-xs font-medium text-[#586359] hover:text-[#172018] flex items-center gap-1"
                        >
                          {showPin ? (
                            <>
                              <EyeOff className="h-3.5 w-3.5" />
                              <span>Mask</span>
                            </>
                          ) : (
                            <>
                              <Eye className="h-3.5 w-3.5" />
                              <span>Show</span>
                            </>
                          )}
                        </button>
                        <a 
                          href="#forgot-pin" 
                          onClick={(e) => {
                            e.preventDefault();
                            alert("A 4-digit PIN reset code will be sent to your registered phone number via SMS.");
                          }}
                          className="text-xs font-semibold text-[#055926] hover:underline"
                        >
                          Forgot PIN?
                        </a>
                      </div>
                    </div>

                    {/* 4 Dedicated Digit Slots */}
                    <div className="flex items-center justify-between gap-2.5 sm:gap-3 py-1">
                      {[0, 1, 2, 3].map((slotIdx) => (
                        <div key={slotIdx} className="flex-1">
                          <input
                            ref={pinRefs[slotIdx]}
                            type={showPin ? 'text' : 'password'}
                            inputMode="numeric"
                            pattern="[0-9]*"
                            maxLength={1}
                            value={pin[slotIdx] || ''}
                            onChange={(e) => handlePinSlotChange(slotIdx, e.target.value)}
                            onKeyDown={(e) => handlePinKeyDown(slotIdx, e)}
                            onPaste={handlePinPaste}
                            id={`pin-slot-${slotIdx}`}
                            className={`w-full h-14 text-center text-xl sm:text-2xl font-black rounded-xl border-2 transition-all outline-none ${
                              pin[slotIdx] 
                                ? 'border-[#055926] bg-[#f0f7f2] text-[#055926] shadow-xs' 
                                : 'border-[#EAE8DF] bg-white text-[#172018] focus:border-[#055926] focus:bg-[#f0f7f2]'
                            }`}
                            placeholder="•"
                          />
                        </div>
                      ))}
                    </div>

                    <p className="mt-2 text-[11px] text-gray-500 flex items-center gap-1.5">
                      <HelpCircle className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                      <span>Enter the 4-digit secret PIN set when opening your savings account.</span>
                    </p>
                  </div>
                </>
              )}

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
                      ? 'Authenticating...' 
                      : accountType === 'TENANT_COLLECTOR' 
                        ? 'Sign in as Collector' 
                        : 'Sign in with 4-Digit PIN'}
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
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white border border-[#D4A72C]/40 text-[#172018] hover:bg-emerald-50 transition-colors shadow-2xs"
                  id="demo-collector-btn"
                >
                  Demo: Collector (ID & Pass)
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemo('CONTRIBUTOR')}
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white border border-[#D4A72C]/40 text-[#172018] hover:bg-emerald-50 transition-colors shadow-2xs"
                  id="demo-contributor-btn"
                >
                  Demo: Saver (Phone & PIN)
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
                  {accountType === 'TENANT_COLLECTOR' ? 'Start 30-day collector trial' : 'Register as a saver'}
                </Link>
              </p>
            </div>

          </div>
        </div>

        {/* Bottom Security Footer */}
        <div className="mt-8 pt-4 border-t border-[#EAE8DF] max-w-md w-full mx-auto flex items-center justify-center gap-2 text-xs text-[#586359]">
          <Lock className="h-3.5 w-3.5 text-[#055926]" />
          <span>256-Bit SSL Encrypted • Row-Level Multi-Tenant Isolation</span>
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
            Modernizing West African Ajo, Esusu & Thrift Schemes.
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-emerald-100/85 leading-relaxed">
            AJOMI replaces handwritten passbooks with an encrypted, cloud-backed financial system. Trusted by market unions, thrift operators, cooperative societies, and individual daily contributors across West Africa and beyond.
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
                  ? 'Benefits of Using AJOMI as Collector' 
                  : 'Benefits of Using AJOMI as Contributor'}
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
            /* ================= COLLECTOR BENEFITS ================= */
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-400/20 text-[#D4A72C] border border-emerald-400/30">
                  <Receipt className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">3-Second Digital Collection Logging</h4>
                  <p className="text-[11px] sm:text-xs text-emerald-100/80 leading-relaxed mt-0.5">
                    Record daily, weekly, or monthly cash deposits in 3 clicks with zero mental math or duplicate paper card stamps.
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
                    Assign route zones, set daily cash ceilings, and balance field collectors automatically at end-of-day.
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

              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-400/20 text-[#D4A72C] border border-emerald-400/30">
                  <FileSpreadsheet className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">One-Click Accounting & Audit Reports</h4>
                  <p className="text-[11px] sm:text-xs text-emerald-100/80 leading-relaxed mt-0.5">
                    Generate instant PDF and Excel reports for cooperative meetings, executive audits, and bank reconciliations.
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
            /* ================= CONTRIBUTOR BENEFITS ================= */
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-400/20 text-[#D4A72C] border border-emerald-400/30">
                  <KeyRound className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">Fast 4-Digit PIN Passbook Access</h4>
                  <p className="text-[11px] sm:text-xs text-emerald-100/80 leading-relaxed mt-0.5">
                    Sign in with just your phone number or saver ID and private 4-digit PIN. No complex passwords to remember.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-400/20 text-[#D4A72C] border border-emerald-400/30">
                  <Receipt className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">Instant SMS & WhatsApp Payment Proof</h4>
                  <p className="text-[11px] sm:text-xs text-emerald-100/80 leading-relaxed mt-0.5">
                    Get an immediate digital receipt with a unique transaction reference the second cash is handed to your collector.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-400/20 text-[#D4A72C] border border-emerald-400/30">
                  <Wallet className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">24/7 Phone Passbook & Balance Inquiry</h4>
                  <p className="text-[11px] sm:text-xs text-emerald-100/80 leading-relaxed mt-0.5">
                    Check your verified savings balance, daily stamp history, and target completion anytime without having to call your collector.
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
                    Your savings ledger is securely backed up in the cloud. Even if your paper card gets torn or misplaced, your money remains 100% safe.
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
                "I check my Esusu balance from my phone every single evening with my 4-digit PIN. I have 100% peace of mind that my daily savings are safe."
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
