import React from 'react';
import { HelpCircle } from 'lucide-react';

const faqs = [
  {
    q: 'Do I need previous healthcare marketing experience to apply?',
    a: 'Not necessarily! If you have strong fundamental skills in SEO, Google Ads, short-form video creation, or web UX, we will train you on our proprietary medical marketing frameworks, HIPAA compliance, and local patient journey systems.',
  },
  {
    q: 'What does your hybrid work policy look like?',
    a: 'We operate with high trust. Most roles are hybrid (2–3 days in our Pune creative studio for team jams and client strategy huddles, and the rest from home). Fully remote options are also available for select senior content and technical roles.',
  },
  {
    q: 'How are performance bonuses calculated?',
    a: 'We believe in sharing the upside. For media buyers and account leads, campaign ROAS and client retention targets unlock quarterly bonuses. For SEOs and creatives, organic growth milestones and viral reach benchmarks trigger direct financial incentives.',
  },
  {
    q: 'What tools and equipment will I have access to?',
    a: 'Every team member gets modern workstation hardware plus enterprise logins to Ahrefs, Semrush, SurferSEO, Meta Business Suite, Adobe Premiere Pro, Midjourney, Figma, and OpenAI/Claude developer tiers.',
  },
  {
    q: 'How fast is the interview and offer timeline?',
    a: 'We respect your schedule and move quickly. From your initial application to a formal offer, our process typically takes between 4 to 8 business days.',
  },
];

export default function CareersFaq() {
  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200/80">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-bold uppercase tracking-wider text-[#1a1053] mb-3 shadow-sm">
            <HelpCircle size={13} className="text-[#e20b27]" />
            Candidate Questions
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a1053] tracking-tight">
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-[#e20b27]">Questions</span>
          </h2>
          <p className="text-slate-500 mt-2 text-sm sm:text-base">
            Everything you need to know about working and growing at Codigix.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details
              key={i}
              className="group bg-white border border-slate-200/80 rounded-2xl p-6 open:shadow-lg open:border-indigo-200 transition-all duration-200"
              open={i === 0}
            >
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-bold text-base sm:text-lg text-[#1a1053]">
                <span>{faq.q}</span>
                <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold group-open:rotate-45 group-open:bg-[#1a1053] group-open:text-white transition-all shrink-0">
                  +
                </span>
              </summary>
              <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed pt-3 border-t border-slate-100">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
