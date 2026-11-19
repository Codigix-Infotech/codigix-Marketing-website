import React from 'react';
import AboutHero from '@/components/about/AboutHero';
import WhoWeAre from '@/components/about/WhoWeAre';
import OurJourney from '@/components/about/OurJourney';
import WhyChooseUs from '@/components/about/WhyChooseUs';
import MeetOurTeam from '@/components/about/MeetOurTeam';
import { pageMetadata } from '@/lib/page-seo';

export const generateMetadata = () =>
  pageMetadata({
    title: 'About Codigix Infotech | Digital Engineering & Communication, Pune',
    description:
      'Codigix Infotech is a Pune-based technology and digital communication firm working across healthcare institutions, enterprises, and commercial businesses, with clear ethics and data-protection commitments.',
    path: '/about',
  });

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <AboutHero />
      <WhoWeAre />
      <OurJourney />
      <WhyChooseUs />
      <MeetOurTeam />
    </div>
  );
}

