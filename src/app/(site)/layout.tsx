import { Suspense } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MotionProvider from "@/components/layout/MotionProvider";
import SmoothScroll from "@/components/layout/SmoothScroll";
import NavigationProgress from "@/components/layout/NavigationProgress";
import { getSettings } from "@/lib/api";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();
  return (
    <SmoothScroll>
      {/* Suspense: useSearchParams must not opt the statically rendered pages out of SSR */}
      <Suspense fallback={null}>
        <NavigationProgress />
      </Suspense>
      <MotionProvider>
        <Navbar />
        <main className="site-main">{children}</main>
        <Footer settings={settings} />
      </MotionProvider>
    </SmoothScroll>
  );
}
