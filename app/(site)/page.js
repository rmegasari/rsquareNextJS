import FAQSection from "@/components/FAQSection";
import FeaturedTemplatesSection from "@/components/FeaturedTemplatesSection";
import FeatureHighlights from "@/components/FeatureHighlights";
import HomeHero from "@/components/HomeHero";
import MissionCTA from "@/components/MissionCTA";
import ProductMarquee from "@/components/ProductMarquee";
import VideoShowcase from "@/components/VideoShowcase";

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
