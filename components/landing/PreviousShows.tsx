import ShowCard from "../cards/ShowCard";

const shows = [
  {
    index: 0,
    title: "Hortense a dit j'mens fous!",
    date: "Décembre 2024",
    image: "/images/Affiches/Hortense.png",
    youtubeUrl: "https://youtu.be/gWR1-Gic3Dg?si=y16SFnq8Po5gHCi8",
    description: "Une comédie française pleine de rebondissements",
    writer: "Georges Feydeau",
    directors: ["Jean Dupont"],
  },
  {
    index: 1,
    title: "Le songe d'une nuit d'été",
    date: "Avril 2024",
    image: "/images/Affiches/Songe2.png",
    youtubeUrl: "https://youtu.be/fh1phNN9u8s?si=ZwpxNSE2f2MnarA7",
    description: "Une adaptation onirique de l'œuvre de Shakespeare",
    writer: "William Shakespeare",
    directors: ["Marie Laurent"],
  },
  {
    index: 2,
    title: "Les jumeaux vénitiens",
    date: "Décembre 2023",
    image: "/images/Affiches/Jumeaux.jpg",
    youtubeUrl: "https://youtu.be/4t701ayLoUU?si=ehL11ZzN8EQmRayw",
    description: "Une comédie italienne pleine de rebondissements",
    writer: "Carlo Goldoni",
    directors: ["Sophie Martin"],
  },
  {
    index: 3,
    title: "Un fil à la patte",
    date: "Avril 2023",
    image: "/images/Affiches/fil.jpg",
    youtubeUrl: "https://youtu.be/6esbvoB5DTY?si=Y96LSJZW8Ld1cV-u",
    description: "Le chef-d'œuvre comique de Georges Feydeau",
    writer: "Georges Feydeau",
    directors: ["Pierre Durand"],
  },
  {
    index: 4,
    title: "Le médecin malgré lui",
    date: "Décembre 2023",
    image: "/images/Affiches/medecin.png",
    youtubeUrl: "https://youtu.be/yKT8_F3X9rg?si=98mlg6XZaFAaCqFA",
    description: "Une comédie française pleine de rebondissements",
    writer: "Molière",
    directors: ["Claire Petit"],
  },
  {
    index: 5,
    title: "Les Éstivants",
    date: "Avril 2022",
    image: "/images/Affiches/estivants.png",
    youtubeUrl: "https://youtu.be/_vgrDjzOjUk?si=UEs40OhCsiLKOazo",
    description: "Une comédie française pleine de rebondissements",
    writer: "Maxime Gorki",
    directors: ["Thomas Bernard"],
  },
];

const PreviousShows = () => {
  return (
    <section id="previous-shows" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            Nos Spectacles Passés
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Découvrez nos précédentes productions qui ont marqué l'histoire de
            notre troupe.
          </p>
          <div className="mt-6 w-24 h-1 bg-brand-red mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {shows.map((show) => (
            <ShowCard
              key={show.index}
              title={show.title}
              year={show.date}
              description={show.description}
              coverImage={show.image}
              youtubeUrl={show.youtubeUrl}
              writer={show.writer}
              directors={show.directors}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PreviousShows;
