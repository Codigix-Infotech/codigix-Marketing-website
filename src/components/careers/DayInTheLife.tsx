import React from 'react';
import { Coffee, BarChart3, Palette, Rocket, PartyPopper } from 'lucide-react';

const schedule = [
  {
    time: '09:30 AM',
    title: 'Morning Pulse & Campaign Dashboard',
    description:
      'Grab your favorite brew in the studio kitchen. Review real-time Google Ads ROAS, GA4 patient leads, and overnight keyword ranking movements on our agency dashboards.',
    icon: Coffee,
    color: 'bg-amber-500/10 text-amber-600 border-amber-200/60',
  },
  {
    time: '11:15 AM',
    title: 'Creative Jam & Strategic Scripting',
    description:
      'Huddle with our creative directors and copywriters. Brainstorm high-converting hooks for doctor reels, write A/B headlines for PPC landing pages, and sketch visual storyboards.',
    icon: Palette,
    color: 'bg-purple-500/10 text-purple-600 border-purple-200/60',
  },
  {
    time: '02:30 PM',
    title: 'Deep Work & Live Campaign Execution',
    description:
      'Uninterrupted focus time. Deploy Performance Max assets, optimize Google Business Profile citations, execute technical SEO schema migrations, and write medical pillar content.',
    icon: Rocket,
    color: 'bg-blue-500/10 text-blue-600 border-blue-200/60',
  },
  {
    time: '05:00 PM',
    title: 'Growth Teardowns & Victory Confetti',
    description:
      'Review new conversion records, share algorithm discoveries from the trenches, celebrate client breakthroughs with the team, and wrap up with clean documentation.',
    icon: PartyPopper,
    color: 'bg-rose-500/10 text-[#e20b27] border-rose-200/60',
  },
];

export default function DayInTheLife() {
  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 ">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-xs font-bold uppercase tracking-wider text-[#1a1053] mb-3">
            <BarChart3 size={13} className="text-[#e20b27]" />
            Agency Rhythm
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1a1053] tracking-tight leading-tight mb-4">
            A Day in the Life of a{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-[#e20b27]">
              Codigix Marketer
            </span>
          </h2>
          <p className="text-slate-500 text-base sm:text-lg leading-relaxed">
            Here is what high-autonomy, outcome-driven marketing actually looks like inside our Pune studio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {schedule.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="bg-slate-50/60 rounded-3xl p-7 border border-slate-200/80 hover:bg-white hover:shadow-xl hover:border-indigo-200 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 shadow-sm">
                      {item.time}
                    </span>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${item.color}`}>
                      <Icon size={20} />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-[#1a1053] mb-3 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {item.description}
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
