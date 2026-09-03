import { useState, type FormEvent } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { Shield, Briefcase, UserCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent } from '../../components/ui/Card';

export default function Register() {
  const [searchParams] = useSearchParams();
  const plan = searchParams.get('plan');
  const [accountType, setAccountType] = useState<'TENANT_COLLECTOR' | 'CONTRIBUTOR'>('TENANT_COLLECTOR');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const { login, updateTenant } = useAuth();
  const navigate = useNavigate();

  const handleRegister = (e: FormEvent) => {
    e.preventDefault();
    if (email) {
      login(email, {
        name: name || email.split('@')[0],
        phone,
        accountType,
        role: accountType === 'CONTRIBUTOR' ? 'CONTRIBUTOR' : 'TENANT_OWNER',
      });
      if (accountType === 'TENANT_COLLECTOR') {
        if (name) updateTenant({ name });
        navigate('/onboarding');
      } else {
        navigate('/dashboard');
      }
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-center bg-[#FAFAF7] py-10 px-4 sm:px-6 lg:px-8 text-[#172018]">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-2.5 hover:opacity-95 transition-opacity">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#055926] shadow-md shadow-[#055926]/20">
            <Shield className="h-7 w-7 text-white" />
          </div>
        </Link>
        <h2 className="mt-4 text-center text-2xl sm:text-3xl font-black tracking-tight text-[#172018]">
          Start Your Free 14-Day Trial
        </h2>
        <p className="mt-2 text-center text-xs sm:text-sm text-[#586359]">
          {plan ? `Selected Tier: ${plan.toUpperCase()} • ` : ''}Full access to daily collections, customer ledgers, and SMS receipts.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="rounded-3xl border border-[#EAE8DF] bg-white shadow-xl shadow-black/5">
          <CardContent className="p-6 sm:p-8">
            {/* Account Type Selector */}
            <div className="mb-6">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#586359] mb-2">
                Register as:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setAccountType('TENANT_COLLECTOR')}
                  className={`p-3 rounded-2xl border-2 text-left transition-all ${
                    accountType === 'TENANT_COLLECTOR'
                      ? 'border-[#055926] bg-[#f0f7f2]'
                      : 'border-[#EAE8DF] bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <Briefcase className="h-4 w-4 text-[#055926]" />
                    {accountType === 'TENANT_COLLECTOR' && <CheckCircle2 className="h-3.5 w-3.5 text-[#055926]" />}
                  </div>
                  <div className="text-xs font-bold text-[#172018]">Tenant / Collector</div>
                  <div className="text-[10px] text-[#586359]">Organizers & Agents</div>
                </button>

                <button
                  type="button"
                  onClick={() => setAccountType('CONTRIBUTOR')}
                  className={`p-3 rounded-2xl border-2 text-left transition-all ${
                    accountType === 'CONTRIBUTOR'
                      ? 'border-[#055926] bg-[#f0f7f2]'
                      : 'border-[#EAE8DF] bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <UserCheck className="h-4 w-4 text-[#055926]" />
                    {accountType === 'CONTRIBUTOR' && <CheckCircle2 className="h-3.5 w-3.5 text-[#055926]" />}
                  </div>
                  <div className="text-xs font-bold text-[#172018]">Contributor</div>
                  <div className="text-[10px] text-[#586359]">Daily Savers & Members</div>
                </button>
              </div>
            </div>

            <form className="space-y-4" onSubmit={handleRegister}>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#586359]">
                  {accountType === 'TENANT_COLLECTOR' ? 'Organization or Scheme Name' : 'Full Name'}
                </label>
                <div className="mt-1">
                  <Input 
                    type="text" 
                    required 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    placeholder={accountType === 'TENANT_COLLECTOR' ? 'e.g. Alaba Daily Thrift' : 'e.g. Adebayo Ogunlesi'}
                    className="h-11 rounded-xl text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#586359]">Email Address</label>
                <div className="mt-1">
                  <Input 
                    type="email" 
                    required 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="h-11 rounded-xl text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#586359]">Phone / WhatsApp</label>
                <div className="mt-1">
                  <Input 
                    type="tel" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="080 1234 5678"
                    className="h-11 rounded-xl text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#586359]">Create Secure Password</label>
                <div className="mt-1">
                  <Input 
                    type="password" 
                    required 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="h-11 rounded-xl text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2 pt-1 text-xs text-[#586359]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#055926]" />
                  <span>
                    {accountType === 'TENANT_COLLECTOR' 
                      ? 'Unlimited field collectors & customer accounts'
                      : 'Real-time balance tracking & SMS deposit verification'}
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <Button type="submit" className="w-full justify-center h-12 rounded-2xl text-sm font-bold shadow-md shadow-[#055926]/20">
                  <span>
                    {accountType === 'TENANT_COLLECTOR' ? 'Start Free Trial as Tenant / Collector' : 'Register as Contributor'}
                  </span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>

            <div className="mt-6 border-t border-[#EAE8DF] pt-5 text-center">
              <p className="text-xs text-[#586359]">
                Already have an account?{' '}
                <Link to="/login" className="font-bold text-[#055926] hover:underline">
                  Log in to your dashboard
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
