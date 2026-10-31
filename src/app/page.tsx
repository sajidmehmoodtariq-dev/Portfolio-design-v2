import SiteHeader from "@/components/SiteHeader";
import RevealObserver from "@/components/RevealObserver";
import ProgressRail from "@/components/tour/ProgressRail";
import Tour from "@/components/tour/Tour";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Tour />
      </main>
      <ProgressRail />
      <RevealObserver />
    </>
  );
}
