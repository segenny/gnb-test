"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { GNBItem } from "./GNBItem";
import { useState, useRef, Suspense, lazy, useMemo } from "react";

// 컴포넌트들을 lazy로 import
const lazyComponents = {
  ScheduleList: lazy(() => import("../Schedule/ScheduleList")),
  ProductGrid: lazy(() => import("../Schedule/ScheduleList")),
  OnjackContent: lazy(() => import("../Schedule/ScheduleList")),
  // ... 나머지 컴포넌트들도 lazy로 변경
};

const menuItems = [
  { id: 1, title: "편성표", component: "ScheduleList" },
  { id: 2, title: "TV쇼핑", component: "ProductGrid" },
  { id: 3, title: "온작", component: "OnjackContent" },
  { id: 4, title: "웨딩/이사", component: "ScheduleList" },
  { id: 5, title: "특가", component: "ScheduleList" },
  { id: 6, title: "미식생활", component: "ScheduleList" },
];

export const GNB = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [preloadIndex, setPreloadIndex] = useState<number | null>(null);
  const swiperRef = useRef<any>(null);
  const scrollPositions = useRef<{ [key: number]: number }>({});

  const renderComponent = (index: number) => {
    const componentName = menuItems[index].component;
    const Component =
      lazyComponents[componentName as keyof typeof lazyComponents];

    return (
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center">
            <div className="animate-pulse"></div>
          </div>
        }
      >
        <Component />
      </Suspense>
    );
  };

  // 캐시된 컴포넌트들을 저장할 메모이제이션 추가 ✨
  const cachedComponents = useMemo(() => {
    return menuItems.map((_, index) => renderComponent(index));
  }, [menuItems]); // ✨ menuItems를 의존성 배열에 추가

  const handleSlideChange = (swiper: any) => {
    // 이전 슬라이드의 스크롤 위치 저장
    const prevIndex = swiper.previousIndex;
    const slideElement =
      swiper.slides[prevIndex]?.querySelector(".overflow-y-auto");
    if (slideElement) {
      scrollPositions.current[prevIndex] = slideElement.scrollTop;
    }

    setActiveIndex(swiper.activeIndex);
  };

  const handleSlideMount = (index: number) => {
    // 저장된 스크롤 위치로 복원
    const savedPosition = scrollPositions.current[index];
    if (savedPosition !== undefined) {
      const slideElement =
        swiperRef.current?.slides[index]?.querySelector(".overflow-y-auto");
      if (slideElement) {
        setTimeout(() => {
          slideElement.scrollTop = savedPosition;
        }, 0);
      }
    }
  };

  return (
    <div className="flex flex-col w-full h-full">
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={8}
        freeMode={true}
        className="h-10 w-full flex"
        preventInteractionOnTransition={true}
        touchMoveStopPropagation={true}
        touchReleaseOnEdges={true}
        cssMode={true}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.activeIndex);
          swiperRef.current?.slideTo(swiper.activeIndex);
        }}
      >
        {menuItems.map((item, index) => (
          <SwiperSlide key={item.id} className="!w-auto">
            <button
              onClick={() => {
                setActiveIndex(index);
                swiperRef.current?.slideTo(index);
              }}
              className="focus:outline-none"
            >
              <GNBItem isActive={activeIndex === index}>{item.title}</GNBItem>
            </button>
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={handleSlideChange}
        onTouchMove={(swiper) => {
          const direction = swiper.touches.diff > 0 ? -1 : 1;
          const nextIndex = activeIndex + direction;

          if (nextIndex >= 0 && nextIndex < menuItems.length) {
            setPreloadIndex(nextIndex);
          }
        }}
        onTouchEnd={() => {
          setPreloadIndex(null);
        }}
        className="w-full flex-1 h-full"
        speed={200} // ✨ 스와이프 속도를 더 빠르게 조정
        touchRatio={1.5} // ✨ 터치 민감도를 높임
        resistance={true}
        resistanceRatio={0.65} // ✨ 저항 비율을 낮춰서 더 쉽게 넘어가도록 함
      >
        {menuItems.map((item, index) => (
          <SwiperSlide key={item.id} className="h-full overflow-y-auto">
            <div className="mt-4 px-2">
              <div
                style={{
                  display:
                    activeIndex === index || preloadIndex === index
                      ? "block"
                      : "none",
                }}
                onAnimationEnd={() => handleSlideMount(index)}
              >
                {cachedComponents[index]}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
