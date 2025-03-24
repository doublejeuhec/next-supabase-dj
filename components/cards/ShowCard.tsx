import Image from "next/image";

interface ShowCardProps {
  title: string;
  date: string;
  image: string;
  youtubeUrl: string;
  description: string;
}

export default function ShowCard({
  title,
  date,
  image,
  youtubeUrl,
  description,
}: ShowCardProps) {
  return (
    <div className="flex justify-center">
      <a
        href={youtubeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full max-w-xs transform transition-transform hover:scale-105"
      >
        <div className="relative h-full rounded-xl overflow-hidden group">
          {/* A4 aspect ratio is approximately 1:1.414 */}
          <div className="relative w-full aspect-[1/1.414]">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              priority
            />

            {/* Information overlay that appears on hover */}
            <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
              <div>
                <div className="text-sm text-red-500 font-medium mb-2">
                  {date}
                </div>
                <h3 className="text-lg font-bold mb-2 text-white">{title}</h3>
                <p className="text-gray-200 text-sm">{description}</p>
              </div>

              {/* Play button at the bottom */}
              <div className="self-center mt-4">
                <div className="rounded-full bg-red-600 p-3 flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-6 h-6 text-white fill-current"
                    style={{ marginLeft: "2px" }}
                  >
                    <polygon points="5,3 19,12 5,21" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}
