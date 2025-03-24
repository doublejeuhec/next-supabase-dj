import { Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export interface ShowCardProps {
  title: string;
  year: string;
  description: string;
  coverImage: string;
  youtubeUrl?: string;
  writer?: string;
  directors?: string[];
}

const ShowCard = ({
  title,
  year,
  description,
  coverImage,
  youtubeUrl,
  writer,
  directors = [],
}: ShowCardProps) => {
  return (
    <div
      className="group relative overflow-hidden shadow-md transition-all hover:shadow-xl rounded-lg"
      style={{ aspectRatio: "1/1.414" }}
    >
      {/* A4 format (width:height ratio of 1:1.414) */}
      <div className="absolute inset-0">
        <Image
          src={coverImage}
          alt={title}
          fill
          priority
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      {/* Overlay gradient that appears on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-between p-6 text-white backdrop-blur-[2px] group-hover:backdrop-blur-[5px]">
        <div className="flex flex-col gap-4 translate-y-8 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          {/* Year at the top */}
          <div className="text-base text-brand-red font-bold transform transition-all">
            {year}
          </div>

          {/* Title bigger */}
          <h3 className="text-2xl md:text-3xl font-bold text-white transition-all">
            {title}
          </h3>

          {/* Writer name bigger */}
          {writer && (
            <p className="text-xl text-white/90 font-medium">{writer}</p>
          )}

          {/* Directors with "mise en scène" text */}
          {directors.length > 0 && (
            <p className="text-gray-200 text-base">
              Mise en scène par {directors.join(", ")}
            </p>
          )}

          {/* Description */}
          <p className="text-gray-300 text-base line-clamp-3 transition-all duration-500 pt-2">
            {description}
          </p>
        </div>

        {youtubeUrl && (
          <Link
            href={youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="self-center mt-auto translate-y-8 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
          >
            <div className="rounded-full bg-brand-red p-3 flex items-center justify-center w-14 h-14 hover:bg-opacity-90 transition-all hover:scale-110 shadow-lg hover:shadow-brand-red/30">
              <Play
                className="w-7 h-7 text-white fill-current"
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
