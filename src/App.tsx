import type { ReactNode } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';

import PublicLayout from './components/layout/PublicLayout';
import DashboardLayout from './components/layout/DashboardLayout';

import LandingPage from './pages/public/LandingPage';
import PricingPage from './pages/public/PricingPage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Onboarding from './pages/onboarding/Onboarding';
import Dashboard from './pages/dashboard/Dashboard';

// A simple protective wrapper for the onboarding step
function RequireTenant({ children }: { children: ReactNode }) {
  const { tenant } = useAuth();
  if (!tenant || !tenant.name) {
    return <Navigate to="/onboarding" replace />;
  }
  return <>{children}</>;
}

// A simple placeholder for unimplemented routes to demonstrate sidebar navigation
function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center rounded-3xl border border-dashed border-[#EAE8DF] bg-white p-8 sm:p-12 text-center shadow-[0_4px_24px_rgba(0,0,0,0.02)] max-w-2xl mx-auto">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f0f7f2] border border-[#dceed2] text-[#055926] mb-4">
        <span className="text-2xl font-black">₦</span>
      </div>
      <h2 className="text-xl sm:text-2xl font-black text-[#172018]">{title}</h2>
      <p className="mt-2 text-xs sm:text-sm text-[#586359] max-w-md leading-relaxed">
        This module is actively connected to the AJOMI multi-tenant ledger engine.
      </p>
      <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#D4A72C]/40 bg-[#fcf9ee] px-3.5 py-1 text-xs font-bold text-[#986d15]">
        <span>Configured for {title}</span>
      </div>
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/pricing" element={<PricingPage />} />
      </Route>

      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/onboarding" element={<Onboarding />} />

      {/* Protected Dashboard Routes */}
      <Route path="/dashboard" element={<RequireTenant><DashboardLayout /></RequireTenant>}>
        <Route index element={<Dashboard />} />
        <Route path="customers" element={<PlaceholderPage title="Customer Management" />} />
        <Route path="savings" element={<PlaceholderPage title="Savings Plans & Cycles" />} />
        <Route path="contributions" element={<PlaceholderPage title="Contributions & Collections" />} />
        <Route path="payouts" element={<PlaceholderPage title="Payout Management" />} />
        <Route path="loans" element={<PlaceholderPage title="Loans & Advances" />} />
        <Route path="transactions" element={<PlaceholderPage title="Financial Ledger" />} />
        <Route path="staff" element={<PlaceholderPage title="Staff & Collector Management" />} />
        <Route path="reports" element={<PlaceholderPage title="Reports & Analytics" />} />
        <Route path="settings" element={<PlaceholderPage title="Tenant Settings" />} />
      </Route>
      
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
