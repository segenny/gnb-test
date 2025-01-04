import Image from "next/image";
import { Program } from "@/types";

const ProgramCard = ({ program }: { program: Program }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col">
      {program.imageUrl && (
        <div className="w-full h-48 relative animate-fadeIn">
          <Image
            src={program.imageUrl}
            alt={program.title}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      )}
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
            {program.time}
          </span>
          <span className="flex items-center gap-1 text-amber-500 font-medium">
            ⭐ {program.viewerRating}
          </span>
        </div>
        <h3 className="text-lg font-bold text-gray-800 mb-2">
          {program.title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2 mb-3 flex-1">
          {program.description}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-700">
            {program.category}
          </span>
          <span className="text-sm text-gray-600 flex items-center gap-1">
            👤 {program.host}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProgramCard;
