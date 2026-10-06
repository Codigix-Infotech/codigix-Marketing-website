import HeroSection from "@/components/home/HeroSection";
import ServicesOverview from "@/components/home/ServicesOverview";
import IndustriesSection from "@/components/home/IndustriesSection";
import ClientVisuals from "@/components/home/ClientVisuals";
import PortfolioSection from "@/components/home/PortfolioSection";
import ProcessSection from "@/components/home/ProcessSection";
import WhyCodigixSection from "@/components/home/WhyCodigixSection";
import InsightsSection from "@/components/home/InsightsSection";
import CtaSection from "@/components/home/CtaSection";
import ClientLogos from "@/components/home/ClientLogos";
import { getBlogs, getClients, getDashboard, getSettings, getVideos } from "@/lib/api";
import { pageMetadata } from "@/lib/page-seo";

export async function generateMetadata() {
  const { seo } = await getSettings();
  return pageMetadata({
    title: seo.default_title || "Healthcare Digital Marketing Agency | Codigix Infotech",
    description: seo.default_description || "",
    path: "/",
  });
}

export default async function Home() {
  const [dashboard, clients, videos, blogs] = await Promise.all([
    getDashboard(),
    getClients(),
    getVideos(),
    getBlogs({ limit: 3 }),
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection dashboard={dashboard} />
      <ClientVisuals videos={videos} />
      <section className="bg-white relative overflow-hidden border-t border-slate-100">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40" style={{ backgroundImage: 'linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <IndustriesSection />
      </section>
      <ServicesOverview />
      <PortfolioSection />
      <ProcessSection />
      <WhyCodigixSection />
      <ClientLogos clients={clients} />
      <InsightsSection posts={blogs.data} />
      <CtaSection />
    </div>
  );
}
