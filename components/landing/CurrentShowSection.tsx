import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const CurrentShowSection = () => {
  return (
    <>
      <section id="spectacle" className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Notre Spectacle Actuel
            </h2>

            <div className="mt-6 w-24 h-1 bg-red-600 mx-auto rounded-full"></div>
          </div>

          <div className="flex flex-col md:flex-row gap-16 items-center max-w-6xl mx-auto">
            <div className="w-full md:w-1/2 space-y-6">
              <h3 className="text-3xl font-bold text-gray-900">
                La visite de la vieille dame
              </h3>
              <div className="w-12 h-1 bg-red-600 rounded-full"></div>
              <p className="text-gray-600 leading-relaxed text-lg">
                Dans cette pièce captivante de Friedrich Dürrenmatt, nous
                explorons les thèmes de la vengeance, de la justice et de la
                corruption morale. Claire Zahanassian, devenue immensément
                riche, revient dans sa ville natale pour se venger d'un ancien
                amant qui l'a abandonnée.
              </p>
              <p className="text-gray-600 leading-relaxed text-lg">
                Notre mise en scène contemporaine met en lumière la critique
                sociale et les dilemmes moraux de cette œuvre majeure du théâtre
                germanophone, offrant une expérience théâtrale intense et
                mémorable.
              </p>
              <div className="pt-6">
                <Link
                  href="/tickets"
                  className="inline-flex items-center px-8 py-4 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-all transform hover:scale-105 text-lg font-medium shadow-md"
                >
                  Réserver maintenant
                  <ArrowUpRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CurrentShowSection;
