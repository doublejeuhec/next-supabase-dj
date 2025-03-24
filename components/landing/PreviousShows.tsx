import ShowCard from "../cards/ShowCard";

const previousShows = [
  {
    title: "Hortense a dit j'mens fous!",
    date: "Décembre 2024",
    image: "/images/Affiches/Hortense.png",
    youtubeUrl: "https://youtu.be/gWR1-Gic3Dg?si=y16SFnq8Po5gHCi8",
    description: "Une comédie française pleine de rebondissements",
  },
  {
    title: "Le songe d'une nuit d'été",
    date: "Avril 2024",
    image: "/images/Affiches/Songe2.png",
    youtubeUrl: "https://youtu.be/fh1phNN9u8s?si=ZwpxNSE2f2MnarA7",
    description: "Une adaptation onirique de l'œuvre de Shakespeare",
  },
  {
    title: "Les jumeaux vénitiens",
    date: "Décembre 2023",
    image: "/images/Affiches/Jumeaux.jpg",
    youtubeUrl: "https://youtu.be/4t701ayLoUU?si=ehL11ZzN8EQmRayw",
    description: "Une comédie italienne pleine de rebondissements",
  },
  {
    title: "Un fil à la patte",
    date: "Avril 2023",
    image: "/images/Affiches/fil.jpg",
    youtubeUrl: "https://youtu.be/6esbvoB5DTY?si=Y96LSJZW8Ld1cV-u",
    description: "Le chef-d'œuvre comique de Georges Feydeau",
  },
  {
    title: "Le médecin malgré lui",
    date: "Décembre 2023",
    image: "/images/Affiches/medecin.png",
    youtubeUrl: "https://youtu.be/yKT8_F3X9rg?si=98mlg6XZaFAaCqFA",
    description: "Une comédie française pleine de rebondissements",
  },
  {
    title: "Les Éstivants",
    date: "Avril 2022",
    image: "/images/Affiches/estivants.png",
    youtubeUrl: "https://youtu.be/_vgrDjzOjUk?si=UEs40OhCsiLKOazo",
    description: "Une comédie française pleine de rebondissements",
  },
];

export default function PreviousShows() {
  return (
    <section className="py-12 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">
            Nos anciens spectacles
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez nos précédentes productions à travers ces extraits vidéo
          </p>
          <div className="mt-6 w-24 h-1 bg-red-600 mx-auto rounded-full"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {previousShows.map((show, index) => (
              <ShowCard
                key={index}
                title={show.title}
                date={show.date}
                image={show.image}
                youtubeUrl={show.youtubeUrl}
                description={show.description}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
