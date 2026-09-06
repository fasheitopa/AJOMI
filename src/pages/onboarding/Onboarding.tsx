import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { Shield, Sparkles, Building2, Sliders } from 'lucide-react';

export default function Onboarding() {
  const { user, tenant, updateTenant } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    currency: 'NGN',
    commissionRules: 'PERCENTAGE',
  });

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If already onboarded, redirect to dashboard
  if (tenant && tenant.name) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleComplete = () => {
    updateTenant({
      name: formData.name,
      currency: formData.currency,
    });
    navigate('/dashboard');
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAF7] text-[#172018]">
      <div className="mx-auto flex w-full max-w-2xl flex-col px-4 py-12 sm:px-6 lg:px-8">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#055926] shadow-sm mb-3">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#172018]">
            Set Up Your AJOMI Ledger
          </h1>
          <p className="mt-1.5 text-xs sm:text-sm text-[#586359]">
            Configure your business profile and default operating currency.
          </p>
        </div>

        {/* Step Indicator */}
        <div className="mb-8 max-w-sm mx-auto w-full">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center">
              <div className={`flex h-9 w-9 items-center justify-center rounded-xl text-xs font-bold transition-all ${
                step >= 1 ? 'bg-[#055926] text-white shadow-sm' : 'bg-[#EAE8DF] text-[#586359]'
              }`}>
                1
              </div>
              <span className="mt-1.5 text-[11px] font-bold text-[#172018]">Business Info</span>
            </div>
            <div className={`h-1 flex-1 mx-3 rounded-full ${step >= 2 ? 'bg-[#055926]' : 'bg-[#EAE8DF]'}`} />
            <div className="flex flex-col items-center">
              <div className={`flex h-9 w-9 items-center justify-center rounded-xl text-xs font-bold transition-all ${
                step >= 2 ? 'bg-[#055926] text-white shadow-sm' : 'bg-[#EAE8DF] text-[#586359]'
              }`}>
                2
              </div>
              <span className="mt-1.5 text-[11px] font-bold text-[#586359]">Currency</span>
            </div>
          </div>
        </div>

        {step === 1 && (
          <Card className="rounded-3xl border border-[#EAE8DF] bg-white shadow-xl shadow-black/5">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-[#055926]" />
                <CardTitle className="text-lg font-bold text-[#172018]">Business Profile</CardTitle>
              </div>
              <CardDescription className="text-xs text-[#586359]">
                Enter the trading name your thrift savers recognize.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#586359]">Business or Scheme Name</label>
                <Input 
                  className="mt-1.5 h-11 rounded-xl text-sm" 
                  placeholder="e.g. Alaba Market Thrift Society"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#586359]">Official Phone / WhatsApp</label>
                <Input 
                  className="mt-1.5 h-11 rounded-xl text-sm" 
                  placeholder="+234 802 000 0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div className="pt-4 flex justify-end">
                <Button 
                  onClick={() => setStep(2)} 
                  disabled={!formData.name}
                  className="rounded-xl px-6 font-bold shadow-md shadow-[#055926]/20"
                >
                  Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card className="rounded-3xl border border-[#EAE8DF] bg-white shadow-xl shadow-black/5">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Sliders className="h-5 w-5 text-[#055926]" />
                <CardTitle className="text-lg font-bold text-[#172018]">Operating Currency</CardTitle>
              </div>
              <CardDescription className="text-xs text-[#586359]">
                Choose your primary ledger denomination. All cards and statements will format in this currency.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#586359]">Base Currency</label>
                <select 
                  className="mt-1.5 block h-11 w-full rounded-xl border border-[#EAE8DF] bg-[#FAFAF7] px-3.5 py-2 text-sm text-[#172018] focus:border-[#055926] focus:outline-none focus:ring-2 focus:ring-[#055926]/20 font-medium"
                  value={formData.currency}
                  onChange={(e) => setFormData({...formData, currency: e.target.value})}
                >
                  <option value="NGN">Nigerian Naira (₦)</option>
                  <option value="GHS">Ghanaian Cedi (GH₵)</option>
                  <option value="XOF">West African CFA Franc (CFA)</option>
                  <option value="KES">Kenyan Shilling (KSh)</option>
                  <option value="USD">US Dollar ($)</option>
                </select>
              </div>
              
              <div className="pt-4 flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)} className="rounded-xl border-[#EAE8DF]">
                  Back
                </Button>
                <Button onClick={handleComplete} className="rounded-xl px-6 font-bold shadow-md shadow-[#055926]/20">
                  Complete Setup & Open Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
