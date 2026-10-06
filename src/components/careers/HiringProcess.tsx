import React from 'react';
import { Send, PhoneCall, BrainCircuit, Handshake, CheckCircle2 } from 'lucide-react';

const steps = [
  {
    step: '01',
    title: 'Quick Application Review',
    timing: 'Within 48 Hours',
    description:
      'We respect your time. Our hiring team reviews your resume and portfolio within two business days. No ghosting, guaranteed.',
    icon: Send,
  },
  {
    step: '02',
    title: '30-Min Discovery Conversation',
    timing: 'Culture & Goals',
    description:
      'A relaxed conversation with a senior strategist about your past campaigns, personal career ambitions, and what gets you excited.',
    icon: PhoneCall,
  },
  {
    step: '03',
    title: 'Practical Campaign Teardown',
    timing: 'Proof of Thinking',
    description:
      'No grueling 10-hour assignments or free work. You will teardown a real marketing problem or discuss a campaign strategy live.',
    icon: BrainCircuit,
  },
  {
    step: '04',
    title: 'Offer & Onboarding',
    timing: 'Decision in 48 Hours',
    description:
      'Transparent compensation, clear bonus structures, and immediate start dates. We send out competitive offers quickly.',
    icon: Handshake,
  },
];

export default function HiringProcess() {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-[#1a1053] to-[#12093d] text-white relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#e20b27]/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4  relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold uppercase tracking-wider text-indigo-200 border border-white/10 mb-4">
            <CheckCircle2 size={13} className="text-[#ff7582]" />
            Fast & Respectful Process
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-4 text-white">
            Our 4-Step Hiring Blueprint
          </h2>
          <p className="text-indigo-100/80 text-base sm:text-lg">
            We move swiftly because great digital marketers don&apos;t stay on the market for long.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={i}
                className="bg-white/5 backdrop-blur-md rounded-3xl p-7 border border-white/10 flex flex-col justify-between hover:bg-white/10 hover:border-white/20 transition-all duration-300 relative group"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <span className="text-2xl font-black text-[#ff7582]/80 group-hover:text-[#ff7582] transition-colors">
                      {s.step}
                    </span>
                    <div className="w-11 h-11 rounded-2xl bg-white/10 text-indigo-200 flex items-center justify-center">
                      <Icon size={20} />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 leading-snug">
                    {s.title}
                  </h3>
                  <div className="text-[11px] font-semibold text-[#ff7582] uppercase tracking-wider mb-3">
                    {s.timing}
                  </div>
                  <p className="text-indigo-100/70 text-sm leading-relaxed">
                    {s.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
