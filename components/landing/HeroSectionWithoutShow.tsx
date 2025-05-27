export default function HeroSectionWithoutShow() {
  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-16">
          {/* Left side - Text */}
          <div className="w-full md:w-1/2 space-y-8">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground">
              <span className="text-brand-red">Double Jeu</span> revient bientôt
              avec un nouveau spectacle !
            </h1>
            {/* You can add more content here if needed */}
          </div>

          {/* Right side - Video Placeholder */}
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="relative w-1/2 max-w-md shadow-2xl rounded-lg overflow-hidden bg-black">
              {/* Video Player */}
              <video
                className="w-full h-auto block"
                src="/video/annonce-VVD.mp4"
                controls
                poster="/path/to/your/poster-image.jpg" // Optional: Add a poster image
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
