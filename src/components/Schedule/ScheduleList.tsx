import { Program } from "@/types";
import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";

const ScheduleList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [programs, setPrograms] = useState<Program[]>([]);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await fetch("/api/programs");
        const result = await response.json();

        if (result.success) {
          setPrograms(result.data);
        } else {
          console.error("데이터 로딩 실패 😢:", result.error);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("API 호출 실패 😢:", error);
        setIsLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  // 일반 컴포넌트로 변경
  const SkeletonCard = ({ program }: { program: Program }) => (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md flex flex-col">
      <div className="w-full h-48 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-[pulse_1.5s_ease-in-out_infinite]" />
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <div className="w-20 h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full animate-[pulse_1.5s_ease-in-out_infinite]" />
          <div className="w-16 h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full animate-[pulse_1.5s_ease-in-out_infinite]" />
        </div>
        <div className="w-3/4 h-7 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded mb-2 animate-[pulse_1.5s_ease-in-out_infinite]" />
        <div className="w-full h-12 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded mb-3 animate-[pulse_1.5s_ease-in-out_infinite]" />
        <div className="flex items-center justify-between mt-auto">
          <div className="w-16 h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full animate-[pulse_1.5s_ease-in-out_infinite]" />
          <div className="w-24 h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full animate-[pulse_1.5s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );

  // 프로그램 카드 컴포넌트를 동적으로 import
  const ProgramCard = dynamic(() => import("./ProgramCard"), {
    loading: () => <SkeletonCard program={programs[0]} />,
    ssr: false,
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-3 max-w-7xl mx-auto max-h-screen overflow-y-auto">
      {isLoading
        ? programs.map((program) => (
            <SkeletonCard key={program.id} program={program} />
          ))
        : programs.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
    </div>
  );
};

export default ScheduleList;
