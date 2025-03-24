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
        <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full border border-gray-100">
          <div className="relative w-full aspect-[2/3]">
            <Image src={image} alt={title} fill className="object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-white bg-opacity-80 flex items-center justify-center transform hover:scale-110 transition-transform">
                <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-12 border-l-red-600 ml-1"></div>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="text-sm text-red-600 font-medium mb-2">{date}</div>
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
          </div>
        </div>
      </a>
    </div>
  );
}
