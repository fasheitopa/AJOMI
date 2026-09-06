import React, { useState, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { X, Shield, Briefcase, UserCheck, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultAccountType?: 'TENANT_COLLECTOR' | 'CONTRIBUTOR';
  defaultPlan?: string;
}

export function RegisterModal({
  isOpen,
  onClose,
  defaultAccountType = 'TENANT_COLLECTOR',
  defaultPlan,
}: RegisterModalProps) {
  const [accountType, setAccountType] = useState<'TENANT_COLLECTOR' | 'CONTRIBUTOR'>(defaultAccountType);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [groupCode, setGroupCode] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, updateTenant } = useAuth();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);

    setTimeout(() => {
      login(email, {
        name: name || email.split('@')[0],
        phone,
        accountType,
        role: accountType === 'CONTRIBUTOR' ? 'CONTRIBUTOR' : 'TENANT_OWNER',
      });

      if (accountType === 'TENANT_COLLECTOR') {
        if (name) {
          updateTenant({ name });
        }
        onClose();
        navigate('/onboarding');
      } else {
        // Contributor account
        onClose();
        navigate('/dashboard');
      }
      setLoading(false);
    }, 400);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="relative w-full max-w-lg rounded-3xl border border-[#EAE8DF] bg-white p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 duration-200 text-[#172018] my-8"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#055926] text-white shadow-sm shadow-[#055926]/20">
            <Shield className="h-6 w-6" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#fcf9ee] border border-[#D4A72C]/40 px-2.5 py-0.5 text-[10px] font-bold text-[#986d15] mb-0.5">
              <Sparkles className="h-3 w-3 text-[#D4A72C]" />
              <span>{defaultPlan ? `Plan: ${defaultPlan}` : '30-Day Free Access'}</span>
            </div>
            <h3 className="text-xl font-black text-[#172018] tracking-tight">
              Create Free AJOMI Account
            </h3>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[#586359] leading-relaxed mb-5">
          Select your registration role below to customize your dashboard and features.
        </p>

        {/* Role Selector Tabs / Cards */}
        <div className="mb-6">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#586359] mb-2">
            I want to register as:
          </label>
          <div className="grid grid-cols-2 gap-3">
            {/* Option 1: Tenant / Collector */}
            <button
              type="button"
              onClick={() => setAccountType('TENANT_COLLECTOR')}
              className={`relative flex flex-col items-start p-3.5 rounded-2xl border-2 text-left transition-all ${
                accountType === 'TENANT_COLLECTOR'
                  ? 'border-[#055926] bg-[#f0f7f2] shadow-sm'
                  : 'border-[#EAE8DF] bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-1.5">
                <div className={`flex h-8 w-8 items-center justify-center rounded-xl ${
                  accountType === 'TENANT_COLLECTOR' ? 'bg-[#055926] text-white' : 'bg-gray-100 text-gray-600'
                }`}>
                  <Briefcase className="h-4 w-4" />
                </div>
                {accountType === 'TENANT_COLLECTOR' && (
                  <CheckCircle2 className="h-4 w-4 text-[#055926]" />
                )}
              </div>
              <span className="text-xs sm:text-sm font-bold text-[#172018]">
                Tenant / Collector
              </span>
              <span className="text-[11px] text-[#586359] leading-tight mt-0.5">
                Organizers, Managers & Field Agents
              </span>
            </button>

            {/* Option 2: Contributor */}
            <button
              type="button"
              onClick={() => setAccountType('CONTRIBUTOR')}
              className={`relative flex flex-col items-start p-3.5 rounded-2xl border-2 text-left transition-all ${
                accountType === 'CONTRIBUTOR'
                  ? 'border-[#055926] bg-[#f0f7f2] shadow-sm'
                  : 'border-[#EAE8DF] bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-1.5">
                <div className={`flex h-8 w-8 items-center justify-center rounded-xl ${
                  accountType === 'CONTRIBUTOR' ? 'bg-[#055926] text-white' : 'bg-gray-100 text-gray-600'
                }`}>
                  <UserCheck className="h-4 w-4" />
                </div>
                {accountType === 'CONTRIBUTOR' && (
                  <CheckCircle2 className="h-4 w-4 text-[#055926]" />
                )}
              </div>
              <span className="text-xs sm:text-sm font-bold text-[#172018]">
                Contributor
              </span>
              <span className="text-[11px] text-[#586359] leading-tight mt-0.5">
                Daily Savers & Scheme Members
              </span>
            </button>
          </div>
        </div>

        {/* Dynamic Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#586359]">
              {accountType === 'TENANT_COLLECTOR' ? 'Organization or Scheme Name' : 'Your Full Name'}
            </label>
            <div className="mt-1">
              <Input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={accountType === 'TENANT_COLLECTOR' ? 'e.g. Alaba Progressive Thrift' : 'e.g. Adebayo Ogunlesi'}
                className="h-10 rounded-xl text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#586359]">
                Email Address
              </label>
              <div className="mt-1">
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@email.com"
                  className="h-10 rounded-xl text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#586359]">
                Phone / WhatsApp
              </label>
              <div className="mt-1">
                <Input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="080 1234 5678"
                  className="h-10 rounded-xl text-sm"
                />
              </div>
            </div>
          </div>

          {accountType === 'CONTRIBUTOR' && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#586359]">
                Thrift Scheme Code <span className="text-gray-400 font-normal">(Optional)</span>
              </label>
              <div className="mt-1">
                <Input
                  type="text"
                  value={groupCode}
                  onChange={(e) => setGroupCode(e.target.value)}
                  placeholder="e.g. AJO-4821 or leave blank"
                  className="h-10 rounded-xl text-sm"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#586359]">
              Password
            </label>
            <div className="mt-1">
              <Input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="h-10 rounded-xl text-sm"
              />
            </div>
          </div>

          <div className="rounded-xl bg-[#FAFAF7] border border-[#EAE8DF] p-3 text-[11px] text-[#586359] space-y-1">
            <div className="flex items-center gap-1.5 text-[#055926] font-semibold">
              <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
              <span>
                {accountType === 'TENANT_COLLECTOR' 
                  ? 'Includes daily automated ledgers, field collector accounts & SMS alerts'
                  : 'Track personal daily savings, view digital cards, check payout dates'}
              </span>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full justify-center h-11 rounded-2xl text-sm font-bold shadow-md shadow-[#055926]/20 mt-2"
          >
            <span>
              {loading 
                ? 'Creating Account...' 
                : accountType === 'TENANT_COLLECTOR' 
                  ? 'Start Free Trial as Tenant / Collector' 
                  : 'Register as Contributor'}
            </span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>

        <div className="mt-5 border-t border-[#EAE8DF] pt-4 text-center">
          <p className="text-xs text-[#586359]">
            Already have an account?{' '}
            <Link 
              to="/login" 
              onClick={onClose} 
              className="font-bold text-[#055926] hover:underline"
            >
              Log in to your account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
