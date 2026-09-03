import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, X, Sparkles } from 'lucide-react';

export interface PricingCardsProps {
  showBillingToggle?: boolean;
  onSelectEnterprise?: () => void;
  onSelectPlan?: (planName: string) => void;
}

export function PricingCards({ showBillingToggle = true, onSelectEnterprise, onSelectPlan }: PricingCardsProps) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annually'>('monthly');

  // Annual discount is ~15% off base monthly cost
  const starterBase = billingCycle === 'monthly' ? 3000 : 2550;
  const growthBase = billingCycle === 'monthly' ? 5000 : 4250;
  const scaleBase = billingCycle === 'monthly' ? 8500 : 7225;

  const handlePlanClick = (planSlug: string, planName: string) => {
    if (onSelectPlan) {
      onSelectPlan(planName);
    }
  };

  return (
    <div className="w-full">
      {showBillingToggle && (
        <div className="flex flex-col items-center justify-center mb-10">
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
              Billed annually. Save 15% on your monthly subscription rate.
            </p>
          )}
        </div>
      )}

      {/* Grid of 4 Cards */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4 items-stretch">
        
        {/* ================= 1. AJOMI STARTER ================= */}
        <div className="relative flex flex-col justify-between rounded-3xl border border-[#EAE8DF] bg-white p-6 sm:p-7 shadow-[0_4px_24px_rgba(0,0,0,0.03)] transition-all duration-200 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:border-[#dceed2]">
          <div>
            {/* Top pill badge */}
            <div className="mb-3 flex justify-center">
              <span className="inline-flex items-center rounded-full bg-[#f0f7f2] px-3 py-1 text-xs font-semibold text-[#055926] border border-[#dceed2]">
                Up to 100 contributors
              </span>
            </div>

            {/* Plan Title */}
            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-[#172018] text-center">
              AJOMI Starter
            </h3>

            {/* Price Box */}
            <div className="mt-4 mb-6 rounded-2xl border border-[#EAE8DF] bg-[#FAFAF7] p-4 text-center">
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-2xl sm:text-3xl font-black tracking-tight text-[#172018]">
                  ₦{starterBase.toLocaleString()}
                </span>
                <span className="text-xs font-medium text-[#586359]">/month</span>
              </div>
            </div>

            {/* Features List */}
            <ul className="space-y-3 text-xs sm:text-sm">
              <li className="flex items-center gap-2.5">
                <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#055926] text-white">
                  <Check className="h-2.5 w-2.5 stroke-[3]" />
                </div>
                <span className="font-medium text-[#172018]">Contributor Management</span>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#055926] text-white">
                  <Check className="h-2.5 w-2.5 stroke-[3]" />
                </div>
                <span className="font-medium text-[#172018]">Daily Collection Tracking</span>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#055926] text-white">
                  <Check className="h-2.5 w-2.5 stroke-[3]" />
                </div>
                <span className="font-medium text-[#172018]">Automated Records</span>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#055926] text-white">
                  <Check className="h-2.5 w-2.5 stroke-[3]" />
                </div>
                <span className="font-medium text-[#172018]">Basic Analytics</span>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="flex h-4 w-4 shrink-0 items-center justify-center text-gray-300">
                  <X className="h-3.5 w-3.5" />
                </div>
                <span className="text-gray-400">Loan Management</span>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="flex h-4 w-4 shrink-0 items-center justify-center text-gray-300">
                  <X className="h-3.5 w-3.5" />
                </div>
                <span className="text-gray-400">WhatsApp Alerts</span>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="flex h-4 w-4 shrink-0 items-center justify-center text-gray-300">
                  <X className="h-3.5 w-3.5" />
                </div>
                <span className="text-gray-400">Dedicated Support</span>
              </li>
            </ul>
          </div>

          {/* Bottom Action Button */}
          <div className="mt-6 pt-3">
            {onSelectPlan ? (
              <button
                type="button"
                onClick={() => handlePlanClick('starter', 'AJOMI Starter')}
                className="w-full rounded-2xl border-2 border-[#055926] py-3 px-4 text-xs sm:text-sm font-bold text-[#055926] transition-all hover:bg-[#055926] hover:text-white active:scale-[0.99]"
              >
                Get Started
              </button>
            ) : (
              <Link to="/register?plan=starter" className="block w-full">
                <button
                  type="button"
                  className="w-full rounded-2xl border-2 border-[#055926] py-3 px-4 text-xs sm:text-sm font-bold text-[#055926] transition-all hover:bg-[#055926] hover:text-white active:scale-[0.99]"
                >
                  Get Started
                </button>
              </Link>
            )}
          </div>
        </div>


        {/* ================= 2. AJOMI GROWTH (POPULAR) ================= */}
        <div className="relative flex flex-col justify-between rounded-3xl border-2 border-[#D4A72C] bg-gradient-to-b from-[#055926] to-[#033c1a] p-6 sm:p-7 shadow-xl shadow-[#055926]/20 transition-all duration-200">
          <div>
            {/* Top pill badges */}
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-emerald-50 border border-white/20">
                101 - 250 contributors
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#D4A72C] px-2.5 py-0.5 text-[10px] font-black text-[#172018] shadow-sm uppercase tracking-wider">
                <Sparkles className="h-3 w-3" />
                Popular
              </span>
            </div>

            {/* Plan Title */}
            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white text-center">
              AJOMI Growth
            </h3>

            {/* Price Box */}
            <div className="mt-4 mb-6 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md text-center">
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                  ₦{growthBase.toLocaleString()}
                </span>
                <span className="text-xs font-normal text-emerald-100/80">/month</span>
              </div>
            </div>

            {/* Features List */}
            <ul className="space-y-3 text-xs sm:text-sm">
              <li className="flex items-center gap-2.5">
                <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#D4A72C] text-[#172018]">
                  <Check className="h-2.5 w-2.5 stroke-[3]" />
                </div>
                <span className="font-medium text-white">Contributor Management</span>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#D4A72C] text-[#172018]">
                  <Check className="h-2.5 w-2.5 stroke-[3]" />
                </div>
                <span className="font-medium text-white">Daily Collection Tracking</span>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#D4A72C] text-[#172018]">
                  <Check className="h-2.5 w-2.5 stroke-[3]" />
                </div>
                <span className="font-medium text-white">Automated Records</span>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#D4A72C] text-[#172018]">
                  <Check className="h-2.5 w-2.5 stroke-[3]" />
                </div>
                <span className="font-medium text-white">Loan Management</span>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#D4A72C] text-[#172018]">
                  <Check className="h-2.5 w-2.5 stroke-[3]" />
                </div>
                <span className="font-medium text-white">WhatsApp Alerts</span>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#D4A72C] text-[#172018]">
                  <Check className="h-2.5 w-2.5 stroke-[3]" />
                </div>
                <span className="font-medium text-white">Full Analytics Dashboard</span>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="flex h-4 w-4 shrink-0 items-center justify-center text-white/30">
                  <X className="h-3.5 w-3.5" />
                </div>
                <span className="text-white/40">Dedicated Support</span>
              </li>
            </ul>
          </div>

          {/* Bottom Action Button */}
          <div className="mt-6 pt-3">
            {onSelectPlan ? (
              <button
                type="button"
                onClick={() => handlePlanClick('growth', 'AJOMI Growth')}
                className="w-full rounded-2xl bg-white py-3 px-4 text-xs sm:text-sm font-black text-[#055926] shadow-lg transition-all hover:bg-[#f0f7f2] active:scale-[0.99]"
              >
                Get Started
              </button>
            ) : (
              <Link to="/register?plan=growth" className="block w-full">
                <button
                  type="button"
                  className="w-full rounded-2xl bg-white py-3 px-4 text-xs sm:text-sm font-black text-[#055926] shadow-lg transition-all hover:bg-[#f0f7f2] active:scale-[0.99]"
                >
                  Get Started
                </button>
              </Link>
            )}
          </div>
        </div>


        {/* ================= 3. AJOMI SCALE ================= */}
        <div className="relative flex flex-col justify-between rounded-3xl border border-[#EAE8DF] bg-white p-6 sm:p-7 shadow-[0_4px_24px_rgba(0,0,0,0.03)] transition-all duration-200 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:border-[#dceed2]">
          <div>
            {/* Top pill badge */}
            <div className="mb-3 flex justify-center">
              <span className="inline-flex items-center rounded-full bg-[#fcf9ee] px-3 py-1 text-xs font-semibold text-[#986d15] border border-[#D4A72C]/40">
                251 - 500 contributors
              </span>
            </div>

            {/* Plan Title */}
            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-[#172018] text-center">
              AJOMI Scale
            </h3>

            {/* Price Box */}
            <div className="mt-4 mb-6 rounded-2xl border border-[#EAE8DF] bg-[#FAFAF7] p-4 text-center">
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-2xl sm:text-3xl font-black tracking-tight text-[#172018]">
                  ₦{scaleBase.toLocaleString()}
                </span>
                <span className="text-xs font-medium text-[#586359]">/month</span>
              </div>
            </div>

            {/* Features List */}
            <ul className="space-y-3 text-xs sm:text-sm">
              <li className="flex items-center gap-2.5">
                <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#055926] text-white">
                  <Check className="h-2.5 w-2.5 stroke-[3]" />
                </div>
                <span className="font-medium text-[#172018]">All Growth Features</span>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#055926] text-white">
                  <Check className="h-2.5 w-2.5 stroke-[3]" />
                </div>
                <span className="font-medium text-[#172018]">Multiple Field Agents</span>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#055926] text-white">
                  <Check className="h-2.5 w-2.5 stroke-[3]" />
                </div>
                <span className="font-medium text-[#172018]">Advanced Loan Engine</span>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#055926] text-white">
                  <Check className="h-2.5 w-2.5 stroke-[3]" />
                </div>
                <span className="font-medium text-[#172018]">Custom SMS Sender ID</span>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#055926] text-white">
                  <Check className="h-2.5 w-2.5 stroke-[3]" />
                </div>
                <span className="font-medium text-[#172018]">Branch Performance Ledgers</span>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#055926] text-white">
                  <Check className="h-2.5 w-2.5 stroke-[3]" />
                </div>
                <span className="font-medium text-[#172018]">Priority Phone & Chat</span>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="flex h-4 w-4 shrink-0 items-center justify-center text-gray-300">
                  <X className="h-3.5 w-3.5" />
                </div>
                <span className="text-gray-400">Custom Bank API Integration</span>
              </li>
            </ul>
          </div>

          {/* Bottom Action Button */}
          <div className="mt-6 pt-3">
            {onSelectPlan ? (
              <button
                type="button"
                onClick={() => handlePlanClick('scale', 'AJOMI Scale')}
                className="w-full rounded-2xl border-2 border-[#055926] py-3 px-4 text-xs sm:text-sm font-bold text-[#055926] transition-all hover:bg-[#055926] hover:text-white active:scale-[0.99]"
              >
                Get Started
              </button>
            ) : (
              <Link to="/register?plan=scale" className="block w-full">
                <button
                  type="button"
                  className="w-full rounded-2xl border-2 border-[#055926] py-3 px-4 text-xs sm:text-sm font-bold text-[#055926] transition-all hover:bg-[#055926] hover:text-white active:scale-[0.99]"
                >
                  Get Started
                </button>
              </Link>
            )}
          </div>
        </div>


        {/* ================= 4. AJOMI ENTERPRISE ================= */}
        <div className="relative flex flex-col justify-between rounded-3xl border border-[#EAE8DF] bg-white p-6 sm:p-7 shadow-[0_4px_24px_rgba(0,0,0,0.03)] transition-all duration-200 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:border-[#dceed2]">
          <div>
            {/* Top pill badge */}
            <div className="mb-3 flex justify-center">
              <span className="inline-flex items-center rounded-full bg-[#1F2937]/5 px-3 py-1 text-xs font-semibold text-[#1F2937] border border-[#1F2937]/15">
                500+ Contributors
              </span>
            </div>

            {/* Plan Title */}
            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-[#172018] text-center">
              AJOMI Enterprise
            </h3>

            {/* Price Box */}
            <div className="mt-4 mb-6 rounded-2xl border border-[#EAE8DF] bg-[#FAFAF7] p-4 text-center">
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-2xl sm:text-3xl font-black tracking-tight text-[#172018]">
                  Custom
                </span>
              </div>
            </div>

            {/* Features List */}
            <ul className="space-y-3 text-xs sm:text-sm">
              <li className="flex items-center gap-2.5">
                <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#055926] text-white">
                  <Check className="h-2.5 w-2.5 stroke-[3]" />
                </div>
                <span className="font-medium text-[#172018]">Everything in Scale</span>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#055926] text-white">
                  <Check className="h-2.5 w-2.5 stroke-[3]" />
                </div>
                <span className="font-medium text-[#172018]">Unlimited Contributors</span>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#055926] text-white">
                  <Check className="h-2.5 w-2.5 stroke-[3]" />
                </div>
                <span className="font-medium text-[#172018]">Dedicated Account Manager</span>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#055926] text-white">
                  <Check className="h-2.5 w-2.5 stroke-[3]" />
                </div>
                <span className="font-medium text-[#172018]">Direct Bank API Integrations</span>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#055926] text-white">
                  <Check className="h-2.5 w-2.5 stroke-[3]" />
                </div>
                <span className="font-medium text-[#172018]">Custom SLA & Security Audit</span>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#055926] text-white">
                  <Check className="h-2.5 w-2.5 stroke-[3]" />
                </div>
                <span className="font-medium text-[#172018]">On-premise / Private DB option</span>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#055926] text-white">
                  <Check className="h-2.5 w-2.5 stroke-[3]" />
                </div>
                <span className="font-medium text-[#172018]">Onboarding & Staff Training</span>
              </li>
            </ul>
          </div>

          {/* Bottom Action Button */}
          <div className="mt-6 pt-3">
            {onSelectEnterprise ? (
              <button
                type="button"
                onClick={onSelectEnterprise}
                className="w-full rounded-2xl border-2 border-[#1F2937] py-3 px-4 text-xs sm:text-sm font-bold text-[#1F2937] transition-all hover:bg-[#1F2937] hover:text-white active:scale-[0.99]"
              >
                Contact Us
              </button>
            ) : (
              <a href="#contact" className="block w-full">
                <button
                  type="button"
                  className="w-full rounded-2xl border-2 border-[#1F2937] py-3 px-4 text-xs sm:text-sm font-bold text-[#1F2937] transition-all hover:bg-[#1F2937] hover:text-white active:scale-[0.99]"
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
