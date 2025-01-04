import { Program } from "@/types";
import Image from "next/image";
import { useState, useEffect, useMemo } from "react";

const ScheduleList = () => {
  const [isLoading, setIsLoading] = useState(true);

  // programs 데이터를 useMemo로 캐싱
  const programs = useMemo<Program[]>(
    () => [
      {
        id: 1,
        title: "아침을 부탁해",
        host: "김하늘, 박성웅",
        time: "06:00-07:30",
        imageUrl:
          "https://images.unsplash.com/photo-1528735602780-2552fd46c7af",
        description: "건강한 아침 식사와 함께하는 즐거운 토크쇼",
        category: "예능",
        viewerRating: 8.9,
      },
      {
        id: 2,
        title: "뉴스와이드",
        host: "이수정",
        time: "07:30-09:00",
        imageUrl:
          "https://images.unsplash.com/photo-1495020689067-958852a7765e",
        description: "오늘의 주요 뉴스를 심층 분석하는 시사 프로그램",
        category: "뉴스",
        viewerRating: 9.1,
      },
      {
        id: 3,
        title: "웰컴 투 K-쿡",
        host: "백종원, 에릭남",
        time: "11:00-12:30",
        imageUrl: "https://images.unsplash.com/photo-1556910103-1c02745aae4d",
        description: "한식의 세계화! 외국인과 함께하는 쿠킹 클래스",
        category: "예능",
        viewerRating: 9.3,
      },
      {
        id: 4,
        title: "오후의 클래식",
        host: "손열음",
        time: "14:00-15:30",
        imageUrl:
          "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0",
        description: "클래식 음악과 함께하는 평화로운 오후",
        category: "교양",
        viewerRating: 8.7,
      },
      {
        id: 5,
        title: "IT 트렌드 리포트",
        host: "김택진, 안랩",
        time: "16:00-17:30",
        imageUrl:
          "https://images.unsplash.com/photo-1518770660439-4636190af475",
        description: "최신 테크 트렌드와 IT 업계 소식을 알아보는 시간",
        category: "교양",
        viewerRating: 8.8,
      },
      {
        id: 6,
        title: "저녁 있는 삶",
        host: "백진희, 유해진",
        time: "18:30-20:00",
        imageUrl:
          "https://images.unsplash.com/photo-1493770348161-369560ae357d",
        description: "직장인들의 퇴근 후 일상을 따뜻하게 담아내는 리얼리티",
        category: "예능",
        viewerRating: 9.5,
      },
      {
        id: 7,
        title: "밤의 추리단",
        host: "유재석, 조세호",
        time: "20:00-22:00",
        imageUrl:
          "https://images.unsplash.com/photo-1536599424071-0b215a388ba7",
        description: "대한민국 대표 예능인들과 함께하는 추리 게임쇼",
        category: "예능",
        viewerRating: 9.7,
      },
      {
        id: 8,
        title: "글로벌 다큐멘터리",
        host: "내레이션: 박중훈",
        time: "22:00-23:00",
        imageUrl:
          "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
        description: "세계 각지의 특별한 이야기를 담은 다큐멘터리",
        category: "교양",
        viewerRating: 9.2,
      },
      {
        id: 9,
        title: "심야 음악회",
        host: "조성진",
        time: "23:00-00:30",
        imageUrl:
          "https://images.unsplash.com/photo-1511735111819-9a3f7709049c",
        description: "깊어가는 밤, 감미로운 연주와 함께하는 힐링 타임",
        category: "교양",
        viewerRating: 8.6,
      },
      {
        id: 10,
        title: "심야식당",
        host: "마동석, 정유미",
        time: "00:30-02:00",
        imageUrl:
          "https://images.unsplash.com/photo-1514933651103-005eec06c04b",
        description: "늦은 밤 출출한 당신을 위한 맛있는 이야기",
        category: "예능",
        viewerRating: 9.4,
      },
    ],
    []
  ); // 빈 의존성 배열로 최초 렌더링시에만 생성

  // SkeletonCard 컴포넌트도 메모이제이션
  const SkeletonCard = useMemo(() => {
    return ({ program }: { program: Program }) => (
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
  }, []);

  useEffect(() => {
    // 실제 데이터 로딩을 시뮬레이션
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-3 max-w-7xl mx-auto max-h-screen overflow-y-auto">
      {isLoading
        ? programs.map((program) => (
            <SkeletonCard key={program.id} program={program} />
          ))
        : programs.map((program) => (
            <div
              key={program.id}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col"
            >
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
          ))}
    </div>
  );
};

export default ScheduleList;
