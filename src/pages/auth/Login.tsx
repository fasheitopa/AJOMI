import { useState, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Sparkles, ArrowRight } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent } from '../../components/ui/Card';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (email) {
      login(email);
      // Let App.tsx routing handle redirecting to /onboarding or /dashboard
      navigate('/dashboard');
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
          Sign in to AJOMI
        </h2>
        <p className="mt-2 text-center text-xs sm:text-sm text-[#586359]">
          Manage your daily thrift, esusu, and contribution ledgers.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="rounded-3xl border border-[#EAE8DF] bg-white shadow-xl shadow-black/5">
          <CardContent className="p-6 sm:p-8">
            <form className="space-y-5" onSubmit={handleLogin}>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#586359]">Email address</label>
                <div className="mt-1.5">
                  <Input 
                    type="email" 
                    required 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="manager@thriftcoop.ng"
                    className="h-11 rounded-xl text-sm"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#586359]">Password</label>
                  <a href="#" className="text-xs font-semibold text-[#055926] hover:underline">
                    Forgot password?
                  </a>
                </div>
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

              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-[#EAE8DF] text-[#055926] focus:ring-[#055926]"
                />
                <label htmlFor="remember-me" className="ml-2 block text-xs font-medium text-[#586359]">
                  Remember this device for 30 days
                </label>
              </div>

              <div className="pt-2">
                <Button type="submit" className="w-full justify-center h-12 rounded-2xl text-sm font-bold shadow-md shadow-[#055926]/20">
                  <span>Sign in to Dashboard</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>

            <div className="mt-6 border-t border-[#EAE8DF] pt-5 text-center">
              <p className="text-xs text-[#586359]">
                New thrift organizer?{' '}
                <Link to="/register" className="font-bold text-[#055926] hover:underline">
                  Create a free 14-day trial account
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Demo Fast Login helper */}
        <div className="mt-6 rounded-2xl border border-[#D4A72C]/30 bg-[#fcf9ee] p-3 text-center">
          <p className="text-xs font-bold text-[#986d15] flex items-center justify-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-[#D4A72C]" />
            Quick Demo: Enter any email and click "Sign In"
          </p>
        </div>
      </div>
    </div>
  );
}
