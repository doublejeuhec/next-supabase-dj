import AboutSection from "@/components/landing/AboutSection";
import CurrentShowSection from "@/components/landing/CurrentShowSection";
import HeroSection from "@/components/landing/HeroSection";
import PreviousShows from "@/components/landing/PreviousShows";
import TestimonialSection from "@/components/landing/TestimonialSection";

export default function Home() {
  return (
    <div className="flex flex-col space-y-0">
      <HeroSection />
      <AboutSection />
      <CurrentShowSection />
      <PreviousShows />
      <TestimonialSection />
    </div>
  );
}
