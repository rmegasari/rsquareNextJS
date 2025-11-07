import FAQSection from "@/components/FAQSection";
import FeaturedTemplatesSection from "@/components/FeaturedTemplatesSection";
import FeatureHighlights from "@/components/FeatureHighlights";
import HomeHero from "@/components/HomeHero";
import MissionCTA from "@/components/MissionCTA";
import ProductMarquee from "@/components/ProductMarquee";
import VideoShowcase from "@/components/VideoShowcase";

// Force dynamic rendering to always show latest active/inactive products
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <FeatureHighlights />
      <ProductMarquee />
      <FeaturedTemplatesSection />
      <VideoShowcase />
      <FAQSection />
      <MissionCTA />
    </>
  );
}
