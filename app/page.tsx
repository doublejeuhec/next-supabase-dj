import AboutSection from "@/components/landing/AboutSection";
import HeroSectionWithoutShow from "@/components/landing/HeroSectionWithoutShow";
import PreviousShows from "@/components/landing/PreviousShows";
import TestimonialSection from "@/components/landing/TestimonialSection";

export default function Home() {
  return (
    <div className="flex flex-col space-y-0">
      {/* <HeroSectionWithShow /> */}
      <HeroSectionWithoutShow />
      <AboutSection />
      {/* <CurrentShowSection /> */}
      <PreviousShows />
      <TestimonialSection />
    </div>
  );
}
