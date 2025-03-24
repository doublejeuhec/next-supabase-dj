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
              Depuis 25 ans, Double Jeu anime la scène d'HEC Paris. Notre
              troupe, née d'une simple passion étudiante, est devenue un
              collectif artistique reconnu. Chaque année, nous présentons deux
              spectacles, dont l'un au prestigieux Palais des Glaces à Paris.
            </p>
          </div>

          <div className="bg-card p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-border flex flex-col">
            <h3 className="text-2xl font-semibold mb-4 text-foreground">
              Notre Vision
            </h3>
            <div className="w-12 h-1 bg-brand-red mb-6 rounded-full"></div>
            <p className="text-muted-foreground flex-grow">
              Nous créons un théâtre où fusionnent rigueur, créativité et
              audace. Notre ambition : proposer des pièces captivantes dans des
              conditions professionnelles, avec un metteur en scène reconnu.
              Chaque production repousse nos limites artistiques tout en
              préservant notre esprit d'équipe unique.
            </p>
          </div>

          <div className="bg-card p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-border flex flex-col">
            <h3 className="text-2xl font-semibold mb-4 text-foreground">
              Notre Équipe
            </h3>
            <div className="w-12 h-1 bg-brand-red mb-6 rounded-full"></div>
            <p className="text-muted-foreground flex-grow">
              Une vingtaine d'étudiants sur deux promotions composent Double
              Jeu. Chaque année, huit nouveaux comédiens rejoignent l'aventure
              après des auditions rigoureuses. Notre équipe englobe aussi
              décorateurs, costumiers et communicants, tous essentiels pour
              donner vie à nos spectacles emblématiques.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
