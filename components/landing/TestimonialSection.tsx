const TestimonialSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            Ce qu'ils disent de nous
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Quelques témoignages d'anciens, de spectateurs et de professionnels
            qui ont collaboré avec Double Jeu.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-border"
            >
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <div className="w-12 h-12 rounded-full bg-brand-red flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-foreground">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.title}
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground italic">
                "{testimonial.quote}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const testimonials = [
  {
    name: "Sophie Martin",
    title: "Ancienne de la troupe (Promo 2018)",
    quote:
      "Faire partie de Double Jeu a été l'une des expériences les plus enrichissantes de mon parcours à HEC. J'y ai développé des compétences qui me servent aujourd'hui dans ma vie professionnelle.",
  },
  {
    name: "Thomas Dubois",
    title: "Spectateur fidèle",
    quote:
      "Je suis impressionné chaque année par la qualité des spectacles de Double Jeu. Le niveau est vraiment professionnel et l'énergie des étudiants sur scène est communicative !",
  },
  {
    name: "Jean Lefèvre",
    title: "Metteur en scène",
    quote:
      "Travailler avec les étudiants de Double Jeu est toujours un plaisir. Leur motivation, leur sérieux et leur créativité permettent de monter des spectacles ambitieux.",
  },
];

export default TestimonialSection;
