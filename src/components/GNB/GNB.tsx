"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { GNBItem } from "./GNBItem";
import { useState, useRef, Suspense, lazy, useMemo, useEffect } from "react";
import { useGNBStore } from "../../store/gnbStore";

// 컴포넌트들을 lazy로 import
const lazyComponents = {
  ScheduleList: lazy(() => import("../Schedule/ScheduleList")),
  ProductGrid: lazy(() => import("../Product/ProductGrid")),
  OnjackContent: lazy(() => import("../Onjak/OnjackContent")),
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
  const { activeTab, scrollPositions, setActiveTab, setScrollPosition } =
    useGNBStore();
  const swiperRef = useRef<any>(null);
  const [preloadIndex, setPreloadIndex] = useState<number | null>(null);
  const renderedComponents = useRef<{ [key: number]: React.ReactNode }>({});

  // swiperRef가 준비되면 초기 탭으로 이동
  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(activeTab, 0);
    }
  }, [activeTab]);

  const renderComponent = (index: number) => {
    if (renderedComponents.current[index]) {
      return renderedComponents.current[index];
    }

    const componentName = menuItems[index].component;
    const Component =
      lazyComponents[componentName as keyof typeof lazyComponents];

    const rendered = (
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

    renderedComponents.current[index] = rendered;
    return rendered;
  };

  const cachedComponents = useMemo(() => {
    return menuItems.map((_, index) => {
      if (index === activeTab || index === preloadIndex) {
        return renderComponent(index);
      }
      return renderedComponents.current[index] || null;
    });
  }, [activeTab, preloadIndex]);

  const handleSlideChange = (swiper: any) => {
    const prevIndex = swiper.previousIndex;
    const slideElement =
      swiper.slides[prevIndex]?.querySelector(".overflow-y-auto");
    if (slideElement) {
      setScrollPosition(prevIndex, slideElement.scrollTop);
    }
    setActiveTab(swiper.activeIndex);
  };

  // 스크롤 위치 복원
  useEffect(() => {
    if (swiperRef.current) {
      const slideElement =
        swiperRef.current.slides[activeTab]?.querySelector(".overflow-y-auto");
      if (slideElement) {
        const savedPosition = scrollPositions[activeTab] || 0;
        setTimeout(() => {
          slideElement.scrollTop = savedPosition;
        }, 100); // 약간의 딜레이를 줘서 컴포넌트가 완전히 마운트된 후 스크롤 위치를 복원
      }
    }
  }, [activeTab, scrollPositions]);

  return (
    <div className="flex flex-col w-full h-full">
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={8}
        freeMode={true}
        className="h-12 w-full flex px-2 py-1"
        preventInteractionOnTransition={true}
        touchMoveStopPropagation={true}
        touchReleaseOnEdges={true}
        cssMode={true}
        onSlideChange={handleSlideChange}
      >
        {menuItems.map((item, index) => (
          <SwiperSlide key={item.id} className="!w-auto">
            <button
              onClick={() => {
                setActiveTab(index);
                swiperRef.current?.slideTo(index);
              }}
              className="focus:outline-none"
            >
              <GNBItem
                isActive={activeTab === index}
                className={`transition-all duration-200 px-3 py-1.5 text-sm
                  ${
                    activeTab === index
                      ? "bg-white text-blue-600 font-bold shadow-md border-2 border-blue-500 rounded-md transform hover:scale-102"
                      : "bg-gray-50 text-gray-600 border border-gray-200 rounded-md hover:border-gray-300 hover:bg-gray-100"
                  }`}
              >
                {item.title}
              </GNBItem>
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={handleSlideChange}
        className="w-full flex-1 h-full"
        speed={300}
        touchRatio={1.5}
        resistance={true}
        resistanceRatio={0.55}
        observer={true}
        observeParents={true}
      >
        {menuItems.map((item, index) => (
          <SwiperSlide key={item.id} className="h-full overflow-y-auto">
            <div className="mt-4 px-2">{cachedComponents[index]}</div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
