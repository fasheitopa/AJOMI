import { useState, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent } from '../../components/ui/Card';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRegister = (e: FormEvent) => {
    e.preventDefault();
    if (email) {
      // For preview purposes, we instantly log them in
      login(email);
      navigate('/onboarding');
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
          No credit card required. Full access to daily collections, customer ledgers, and SMS receipts.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="rounded-3xl border border-[#EAE8DF] bg-white shadow-xl shadow-black/5">
          <CardContent className="p-6 sm:p-8">
            <form className="space-y-5" onSubmit={handleRegister}>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#586359]">Work or Business Email</label>
                <div className="mt-1.5">
                  <Input 
                    type="email" 
                    required 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ceo@ajothrift.ng"
                    className="h-11 rounded-xl text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#586359]">Create Secure Password</label>
                <div className="mt-1.5">
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
                  <span>Unlimited field collectors & customer accounts</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#055926]" />
                  <span>Bank-grade multi-tenant isolated database</span>
                </div>
              </div>

              <div className="pt-2">
                <Button type="submit" className="w-full justify-center h-12 rounded-2xl text-sm font-bold shadow-md shadow-[#055926]/20">
                  <span>Create Business Account</span>
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
