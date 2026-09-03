import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, X } from 'lucide-react';

export interface PricingCardsProps {
  showBillingToggle?: boolean;
  onSelectEnterprise?: () => void;
}

export const PRICING_FEATURES = [
  { id: 'contributor_mgmt', label: 'Contributor Management' },
  { id: 'daily_tracking', label: 'Daily Collection Tracking' },
  { id: 'automated_records', label: 'Automated Records' },
  { id: 'basic_analytics', label: 'Basic Analytics' },
  { id: 'loan_mgmt', label: 'Loan Management' },
  { id: 'whatsapp_alerts', label: 'WhatsApp Alerts' },
  { id: 'full_analytics', label: 'Full Analytics Dashboard' },
  { id: 'dedicated_support', label: 'Dedicated Support' },
];

export function PricingCards({ showBillingToggle = true, onSelectEnterprise }: PricingCardsProps) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annually'>('monthly');

  // Annual discount is ~15% off base monthly cost
  const starterBase = billingCycle === 'monthly' ? 3000 : 2550;
  const growthBase = billingCycle === 'monthly' ? 8000 : 6800;

  return (
    <div className="w-full">
      {showBillingToggle && (
        <div className="flex flex-col items-center justify-center mb-12">
          <div className="inline-flex items-center rounded-full border border-[#EAE8DF] bg-white p-1.5 shadow-sm">
            <button
              type="button"
              onClick={() => setBillingCycle('monthly')}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-[#055926] text-white shadow-sm'
                  : 'text-[#1F2937]/70 hover:text-[#172018]'
              }`}
            >
              Monthly billing
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle('annually')}
              className={`flex items-center gap-1.5 rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                billingCycle === 'annually'
                  ? 'bg-[#055926] text-white shadow-sm'
                  : 'text-[#1F2937]/70 hover:text-[#172018]'
              }`}
            >
              <span>Annual billing</span>
              <span className="rounded-full bg-[#fcf9ee] px-2 py-0.5 text-[10px] font-bold text-[#986d15] border border-[#D4A72C]/40">
                Save 15%
              </span>
            </button>
          </div>
          {billingCycle === 'annually' && (
            <p className="mt-2 text-xs text-[#586359]">
              Billed annually. Per-deposit fees remain unchanged.
            </p>
          )}
        </div>
      )}

      {/* Grid of 3 Cards */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-3 lg:items-stretch">
        
        {/* ================= STARTER CARD ================= */}
        <div className="relative flex flex-col justify-between rounded-3xl border border-[#EAE8DF] bg-white p-7 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)] transition-all duration-200 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:border-[#dceed2]">
          <div>
            {/* Top pill badge */}
            <div className="mb-4">
              <span className="inline-flex items-center rounded-full bg-[#f0f7f2] px-3.5 py-1 text-xs font-semibold text-[#055926] border border-[#dceed2]">
                Up to 50 contributors
              </span>
            </div>

            {/* Plan Title */}
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#172018]">
              Starter
            </h3>

            {/* Price Box */}
            <div className="mt-6 mb-8 rounded-2xl border border-[#EAE8DF] bg-[#FAFAF7] p-5">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#172018]">
                  ₦{starterBase.toLocaleString()}
                </span>
                <span className="text-sm font-medium text-[#586359]">/month</span>
              </div>
              <p className="mt-1.5 text-xs sm:text-sm font-semibold text-[#055926]">
                + ₦15 per deposit
              </p>
            </div>

            {/* Features List */}
            <ul className="space-y-4">
              {/* 1. Contributor Management */}
              <li className="flex items-center gap-3">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#055926] text-white">
                  <Check className="h-3 w-3 stroke-[3]" />
                </div>
                <span className="text-sm font-medium text-[#172018]">Contributor Management</span>
              </li>

              {/* 2. Daily Collection Tracking */}
              <li className="flex items-center gap-3">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#055926] text-white">
                  <Check className="h-3 w-3 stroke-[3]" />
                </div>
                <span className="text-sm font-medium text-[#172018]">Daily Collection Tracking</span>
              </li>

              {/* 3. Automated Records */}
              <li className="flex items-center gap-3">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#055926] text-white">
                  <Check className="h-3 w-3 stroke-[3]" />
                </div>
                <span className="text-sm font-medium text-[#172018]">Automated Records</span>
              </li>

              {/* 4. Basic Analytics */}
              <li className="flex items-center gap-3">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#055926] text-white">
                  <Check className="h-3 w-3 stroke-[3]" />
                </div>
                <span className="text-sm font-medium text-[#172018]">Basic Analytics</span>
              </li>

              {/* 5. Loan Management (Excluded) */}
              <li className="flex items-center gap-3">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center text-gray-300">
                  <X className="h-4 w-4" />
                </div>
                <span className="text-sm text-gray-400">Loan Management</span>
              </li>

              {/* 6. WhatsApp Alerts (Excluded) */}
              <li className="flex items-center gap-3">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center text-gray-300">
                  <X className="h-4 w-4" />
                </div>
                <span className="text-sm text-gray-400">WhatsApp Alerts</span>
              </li>

              {/* 7. Full Analytics Dashboard (Excluded) */}
              <li className="flex items-center gap-3">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center text-gray-300">
                  <X className="h-4 w-4" />
                </div>
                <span className="text-sm text-gray-400">Full Analytics Dashboard</span>
              </li>

              {/* 8. Dedicated Support (Excluded) */}
              <li className="flex items-center gap-3">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center text-gray-300">
                  <X className="h-4 w-4" />
                </div>
                <span className="text-sm text-gray-400">Dedicated Support</span>
              </li>
            </ul>
          </div>

          {/* Bottom Action Button */}
          <div className="mt-8 pt-4">
            <Link to="/register?plan=starter" className="block w-full">
              <button
                type="button"
                className="w-full rounded-2xl border-2 border-[#055926] py-3.5 px-6 text-sm font-bold text-[#055926] transition-all hover:bg-[#055926] hover:text-white active:scale-[0.99]"
              >
                Get Started
              </button>
            </Link>
          </div>
        </div>


        {/* ================= GROWTH CARD (MOST POPULAR) ================= */}
        <div className="relative flex flex-col justify-between rounded-3xl border-2 border-[#D4A72C]/70 bg-gradient-to-b from-[#055926] to-[#033c1a] p-7 sm:p-8 shadow-2xl shadow-[#055926]/30 lg:-translate-y-2 lg:scale-[1.03] transition-all duration-200">
          <div>
            {/* Top pill badges */}
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center rounded-full bg-white/15 px-3.5 py-1 text-xs font-semibold text-emerald-50 border border-white/20">
                51-200 contributors
              </span>
              <span className="inline-flex items-center rounded-full bg-[#D4A72C] px-3.5 py-1 text-xs font-black text-[#172018] shadow-md uppercase tracking-wider">
                Most Popular
              </span>
            </div>

            {/* Plan Title */}
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Growth
            </h3>

            {/* Price Box */}
            <div className="mt-6 mb-8 rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-md">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                  ₦{growthBase.toLocaleString()}
                </span>
                <span className="text-sm font-normal text-emerald-100/80">/month</span>
              </div>
              <p className="mt-1.5 text-xs sm:text-sm font-semibold text-[#fcf9ee]">
                + ₦12 per deposit
              </p>
            </div>

            {/* Features List */}
            <ul className="space-y-4">
              {/* 1. Contributor Management */}
              <li className="flex items-center gap-3">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#D4A72C] text-[#172018]">
                  <Check className="h-3 w-3 stroke-[3]" />
                </div>
                <span className="text-sm font-medium text-white">Contributor Management</span>
              </li>

              {/* 2. Daily Collection Tracking */}
              <li className="flex items-center gap-3">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#D4A72C] text-[#172018]">
                  <Check className="h-3 w-3 stroke-[3]" />
                </div>
                <span className="text-sm font-medium text-white">Daily Collection Tracking</span>
              </li>

              {/* 3. Automated Records */}
              <li className="flex items-center gap-3">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#D4A72C] text-[#172018]">
                  <Check className="h-3 w-3 stroke-[3]" />
                </div>
                <span className="text-sm font-medium text-white">Automated Records</span>
              </li>

              {/* 4. Basic Analytics */}
              <li className="flex items-center gap-3">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#D4A72C] text-[#172018]">
                  <Check className="h-3 w-3 stroke-[3]" />
                </div>
                <span className="text-sm font-medium text-white">Basic Analytics</span>
              </li>

              {/* 5. Loan Management */}
              <li className="flex items-center gap-3">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#D4A72C] text-[#172018]">
                  <Check className="h-3 w-3 stroke-[3]" />
                </div>
                <span className="text-sm font-medium text-white">Loan Management</span>
              </li>

              {/* 6. WhatsApp Alerts */}
              <li className="flex items-center gap-3">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#D4A72C] text-[#172018]">
                  <Check className="h-3 w-3 stroke-[3]" />
                </div>
                <span className="text-sm font-medium text-white">WhatsApp Alerts</span>
              </li>

              {/* 7. Full Analytics Dashboard */}
              <li className="flex items-center gap-3">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#D4A72C] text-[#172018]">
                  <Check className="h-3 w-3 stroke-[3]" />
                </div>
                <span className="text-sm font-medium text-white">Full Analytics Dashboard</span>
              </li>

              {/* 8. Dedicated Support (Excluded) */}
              <li className="flex items-center gap-3">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center text-white/30">
                  <X className="h-4 w-4" />
                </div>
                <span className="text-sm text-white/40">Dedicated Support</span>
              </li>
            </ul>
          </div>

          {/* Bottom Action Button */}
          <div className="mt-8 pt-4">
            <Link to="/register?plan=growth" className="block w-full">
              <button
                type="button"
                className="w-full rounded-2xl bg-white py-3.5 px-6 text-sm font-bold text-[#055926] shadow-lg transition-all hover:bg-[#f0f7f2] active:scale-[0.99]"
              >
                Get Started
              </button>
            </Link>
          </div>
        </div>


        {/* ================= ENTERPRISE CARD ================= */}
        <div className="relative flex flex-col justify-between rounded-3xl border border-[#EAE8DF] bg-white p-7 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)] transition-all duration-200 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:border-[#dceed2]">
          <div>
            {/* Top pill badge */}
            <div className="mb-4">
              <span className="inline-flex items-center rounded-full bg-[#1F2937]/5 px-3.5 py-1 text-xs font-semibold text-[#1F2937] border border-[#1F2937]/15">
                200+ contributors
              </span>
            </div>

            {/* Plan Title */}
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#172018]">
              Enterprise
            </h3>

            {/* Price Box */}
            <div className="mt-6 mb-8 rounded-2xl border border-[#EAE8DF] bg-[#FAFAF7] p-5">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#172018]">
                  Custom
                </span>
              </div>
              <p className="mt-1.5 text-xs sm:text-sm font-semibold text-[#586359]">
                + Negotiated volume
              </p>
            </div>

            {/* Features List */}
            <ul className="space-y-4">
              {/* 1. Contributor Management */}
              <li className="flex items-center gap-3">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#055926] text-white">
                  <Check className="h-3 w-3 stroke-[3]" />
                </div>
                <span className="text-sm font-medium text-[#172018]">Contributor Management</span>
              </li>

              {/* 2. Daily Collection Tracking */}
              <li className="flex items-center gap-3">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#055926] text-white">
                  <Check className="h-3 w-3 stroke-[3]" />
                </div>
                <span className="text-sm font-medium text-[#172018]">Daily Collection Tracking</span>
              </li>

              {/* 3. Automated Records */}
              <li className="flex items-center gap-3">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#055926] text-white">
                  <Check className="h-3 w-3 stroke-[3]" />
                </div>
                <span className="text-sm font-medium text-[#172018]">Automated Records</span>
              </li>

              {/* 4. Basic Analytics */}
              <li className="flex items-center gap-3">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#055926] text-white">
                  <Check className="h-3 w-3 stroke-[3]" />
                </div>
                <span className="text-sm font-medium text-[#172018]">Basic Analytics</span>
              </li>

              {/* 5. Loan Management */}
              <li className="flex items-center gap-3">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#055926] text-white">
                  <Check className="h-3 w-3 stroke-[3]" />
                </div>
                <span className="text-sm font-medium text-[#172018]">Loan Management</span>
              </li>

              {/* 6. WhatsApp Alerts */}
              <li className="flex items-center gap-3">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#055926] text-white">
                  <Check className="h-3 w-3 stroke-[3]" />
                </div>
                <span className="text-sm font-medium text-[#172018]">WhatsApp Alerts</span>
              </li>

              {/* 7. Full Analytics Dashboard */}
              <li className="flex items-center gap-3">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#055926] text-white">
                  <Check className="h-3 w-3 stroke-[3]" />
                </div>
                <span className="text-sm font-medium text-[#172018]">Full Analytics Dashboard</span>
              </li>

              {/* 8. Dedicated Support */}
              <li className="flex items-center gap-3">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#055926] text-white">
                  <Check className="h-3 w-3 stroke-[3]" />
                </div>
                <span className="text-sm font-medium text-[#172018]">Dedicated Support</span>
              </li>
            </ul>
          </div>

          {/* Bottom Action Button */}
          <div className="mt-8 pt-4">
            {onSelectEnterprise ? (
              <button
                type="button"
                onClick={onSelectEnterprise}
                className="w-full rounded-2xl border-2 border-[#1F2937] py-3.5 px-6 text-sm font-bold text-[#1F2937] transition-all hover:bg-[#1F2937] hover:text-white active:scale-[0.99]"
              >
                Contact Us
              </button>
            ) : (
              <a href="#contact" className="block w-full">
                <button
                  type="button"
                  className="w-full rounded-2xl border-2 border-[#1F2937] py-3.5 px-6 text-sm font-bold text-[#1F2937] transition-all hover:bg-[#1F2937] hover:text-white active:scale-[0.99]"
                >
                  Contact Us
                </button>
              </a>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
