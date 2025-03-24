import { Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export interface ShowCardProps {
  title: string;
  year: string;
  description: string;
  coverImage: string;
  youtubeUrl: string;
  writer?: string;
  directors?: string[];
}

const ShowCard = ({
  title,
  year,
  description,
  coverImage,
  youtubeUrl,
  writer = "Auteur inconnu",
  directors = [],
}: ShowCardProps) => {
  return (
    <div
      className="group relative overflow-hidden shadow-md transition-all hover:shadow-xl"
      style={{ aspectRatio: "1/1.414" }}
    >
      {/* A4 format (width:height ratio of 1:1.414) */}
      <div className="absolute inset-0">
        <Image
          src={coverImage}
          alt={title}
          fill
          priority
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Overlay that appears on hover */}
      <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6 text-white">
        <div className="space-y-3">
          <div className="text-sm text-brand-red font-medium mb-2">
            {year} {directors.length > 0 && <>• {directors.join(", ")}</>}
          </div>

          <h3 className="text-lg font-bold mb-2 text-white">{title}</h3>
          {writer && <p className="text-gray-200 text-sm">Par {writer}</p>}
          <p className="text-gray-200 text-sm">{description}</p>
        </div>

        {youtubeUrl && (
          <Link
            href={youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="self-center mt-auto"
          >
            <div className="rounded-full bg-brand-red p-3 flex items-center justify-center w-12 h-12 hover:bg-red-700 transition-colors">
              <Play
                className="w-6 h-6 text-white fill-current"
                strokeWidth={0.5}
              />
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ShowCard;
