const AboutSection = () => {
  return (
    <section id="about" className="py-12 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center"></div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-card p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-border flex flex-col">
            <h3 className="text-2xl font-semibold mb-4 text-foreground">
              Notre Histoire
            </h3>
            <div className="w-12 h-1 bg-brand-red mb-6 rounded-full"></div>
            <p className="text-muted-foreground flex-grow">
              Depuis 25 ans, Double Jeu anime la scène d'HEC Paris. Chaque
              année, nous préparons deux spectacles de A à Z. Des décors, aux
              costumes, en passant par la mise en scène et la communication.
              Nous mettons tout en oeuvre pour vous proposer des spectacles de
              qualité.
            </p>
          </div>

          <div className="bg-card p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-border flex flex-col">
            <h3 className="text-2xl font-semibold mb-4 text-foreground">
              Maxime !!! le metteur en scène
            </h3>
            <div className="w-12 h-1 bg-brand-red mb-6 rounded-full"></div>
            <p className="text-muted-foreground flex-grow">
              Nous avons la chance d'être accompagnés par Maxime Taffanel pour
              la mise en scène de nos spectacles. Ce metteur en scène
              extrêmement talentueux et passionné nous accompagne dans nos
              ambitions. Allez voir son spectacle{" "}
              <span className="font-bold underline italic">
                100 mètres papillon
              </span>
              . C'est du grand théâtre.
            </p>
          </div>

          <div className="bg-card p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-border flex flex-col">
            <h3 className="text-2xl font-semibold mb-4 text-foreground">
              Notre équipe
            </h3>
            <div className="w-12 h-1 bg-brand-red mb-6 rounded-full"></div>
            <p className="text-muted-foreground flex-grow">
              Une vingtaine d'étudiants sur deux promotions composent Double
              Jeu. Chaque année, huit nouveaux comédiens rejoignent l'aventure
              après des auditions rigoureuses. Nous travaillons ensemble dans la
              dans la conception et la réalisation de toute la scénographie.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
