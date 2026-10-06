import React from 'react';
import AboutHero from '@/components/about/AboutHero';
import WhoWeAre from '@/components/about/WhoWeAre';
import OurJourney from '@/components/about/OurJourney';
import WhyChooseUs from '@/components/about/WhyChooseUs';
import MeetOurTeam from '@/components/about/MeetOurTeam';
import { pageMetadata } from '@/lib/page-seo';

export const generateMetadata = () =>
  pageMetadata({
    title: 'About Codigix Infotech | Healthcare Marketing Agency Pune',
    description:
      'Learn more about Codigix Infotech, our mission, our team, and our commitment to providing cutting-edge digital marketing solutions for the healthcare industry.',
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

