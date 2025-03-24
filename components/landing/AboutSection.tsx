"use client";

import { Carousel } from "@/components/ui/carousel";
import { FlippingCard } from "@/components/ui/flipping-card";

const AboutSection = () => {
  // Maxime's images for the carousel
  const maximeImages = [
    "/images/Maxime/1.jpeg",
    "/images/Maxime/2.jpeg",
    "/images/Maxime/3.jpeg",
    "/images/Maxime/4.jpeg",
  ];

  const equipeImages = ["/images/Equipe/1.jpg", "/images/Equipe/2.jpg"];

  const histoireImages = [
    "/images/Histoire/1.jpg",
    "/images/Histoire/2.jpg",
    "/images/Histoire/3.jpg",
  ];

  // Front content for each card
  const renderCardFront = (title: string, content: React.ReactNode) => (
    <div className="bg-card p-8 rounded-xl shadow-md h-full flex flex-col">
      <h3 className="text-2xl font-semibold mb-4 text-foreground">{title}</h3>
      <div className="w-12 h-1 bg-brand-red mb-6 rounded-full"></div>
      <div className="text-muted-foreground flex-grow">{content}</div>
      <div className="mt-4 text-sm text-center text-muted-foreground/70">
        Cliquez pour voir plus
      </div>
    </div>
  );

  return (
    <section id="about" className="py-12 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold">À propos de Double Jeu</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* First Card - Histoire */}
          <div className="h-[350px] perspective-[1000px]">
            <FlippingCard
              front={renderCardFront(
                "Notre Histoire",
                <p>
                  Depuis 25 ans, Double Jeu anime la scène d'HEC Paris. Chaque
                  année, nous préparons deux spectacles de A à Z. Des décors,
                  aux costumes, en passant par la mise en scène et la
                  communication. Nous mettons tout en oeuvre pour vous proposer
                  des spectacles de qualité.
                </p>
              )}
              back={
                <div className="bg-card rounded-xl h-full overflow-hidden flex flex-col">
                  <div className="flex-grow">
                    <Carousel
                      images={histoireImages}
                      className="w-full h-full"
                    />
                  </div>
                  <div className="p-2 text-center text-sm text-muted-foreground/70">
                    Cliquez pour revenir
                  </div>
                </div>
              }
              height="h-full"
              frontClassName="rounded-xl"
              backClassName="rounded-xl"
            />
          </div>

          {/* Second Card - Maxime */}
          <div className="h-[350px] perspective-[1000px]">
            <FlippingCard
              front={renderCardFront(
                "Maxime !!!",
                <p>
                  Nous avons la chance d'être accompagnés par Maxime Taffanel
                  pour la mise en scène de nos spectacles. Ce metteur en scène
                  extrêmement talentueux et passionné nous accompagne dans nos
                  ambitions. Allez voir son spectacle{" "}
                  <span className="underline italic">100 mètres papillon</span>.
                  C'est du grand théâtre.
                </p>
              )}
              back={
                <div className="bg-card rounded-xl h-full overflow-hidden flex flex-col">
                  <div className="flex-grow">
                    <Carousel images={maximeImages} className="w-full h-full" />
                  </div>
                  <div className="p-2 text-center text-sm text-muted-foreground/70">
                    Cliquez pour revenir
                  </div>
                </div>
              }
              height="h-full"
              frontClassName="rounded-xl"
              backClassName="rounded-xl"
            />
          </div>

          {/* Third Card - Équipe */}
          <div className="h-[350px] perspective-[1000px]">
            <FlippingCard
              front={renderCardFront(
                "Notre équipe",
                <p>
                  Une vingtaine d'étudiants sur deux promotions composent Double
                  Jeu. Chaque année, huit nouveaux comédiens rejoignent
                  l'aventure après des auditions rigoureuses. Nous travaillons
                  ensemble dans la conception et la réalisation de toute la
                  scénographie.
                </p>
              )}
              back={
                <div className="bg-card rounded-xl h-full overflow-hidden flex flex-col">
                  <div className="flex-grow">
                    <Carousel images={equipeImages} className="w-full h-full" />
                  </div>
                  <div className="p-2 text-center text-sm text-muted-foreground/70">
                    Cliquez pour revenir
                  </div>
                </div>
              }
              height="h-full"
              frontClassName="rounded-xl"
              backClassName="rounded-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
