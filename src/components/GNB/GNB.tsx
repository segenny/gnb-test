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
  OnjackContent1: lazy(() => import("../Onjak/OnjackContent")),
  OnjackContent2: lazy(() => import("../Onjak/OnjackContent")),
  // ... 나머지 컴포넌트들도 lazy로 변경
};

const menuItems = [
  { id: 1, title: "편성표", component: "ScheduleList" },
  { id: 2, title: "TV쇼핑", component: "ProductGrid" },
  { id: 3, title: "홈", component: "OnjackContent1" },
  { id: 4, title: "웨딩/이사", component: "ScheduleList" },
  { id: 5, title: "특가", component: "ScheduleList" },
  { id: 6, title: "미식생활", component: "ScheduleList" },
];

// GNBHeader 컴포넌트 추가
const GNBHeader = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: number;
  setActiveTab: (index: number) => void;
}) => {
  return (
    <div className="relative">
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={16}
        freeMode={true}
        className="h-12 w-full flex px-4 border-b border-gray-100"
        preventInteractionOnTransition={true}
        touchMoveStopPropagation={true}
        touchReleaseOnEdges={true}
        cssMode={true}
        wrapperClass="!flex !flex-row !translate-x-0 !w-auto"
        initialSlide={activeTab}
      >
        {menuItems.map((item, index) => (
          <SwiperSlide key={item.id} className="!w-auto !mr-4 !flex-shrink-0">
            <button
              onClick={() => setActiveTab(index)}
              className="focus:outline-none relative h-full flex items-center"
            >
              <GNBItem
                isActive={activeTab === index}
                className={`transition-all duration-200 px-1 py-1.5 text-sm relative
                  ${
                    activeTab === index
                      ? "text-blue-600 font-bold"
                      : "text-gray-600 hover:text-gray-900"
                  }
                `}
              >
                {item.title}
                {/* 활1, 홈2 메뉴일 때만 2개의 점 표시 */}

                {/* 활성 탭 밑줄 표시 */}
                {activeTab === index && (
                  <div className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-blue-600 rounded-full" />
                )}
              </GNBItem>
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

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

  // 다음/이전 컴포넌트 프리로딩을 위한 함수
  const preloadAdjacentComponents = (currentIndex: number) => {
    // 다음 컴포넌트 프리로딩
    if (currentIndex < menuItems.length - 1) {
      setPreloadIndex(currentIndex + 1);
      renderComponent(currentIndex + 1);
    }
    // 이전 컴포넌트 프리로딩
    if (currentIndex > 0) {
      setPreloadIndex(currentIndex - 1);
      renderComponent(currentIndex - 1);
    }
  };

  // activeTab이 변경될 때마다 인접 컴포넌트 프리로딩
  useEffect(() => {
    preloadAdjacentComponents(activeTab);
  }, [activeTab]);

  const handleSlideChange = (swiper: any) => {
    const prevIndex = swiper.previousIndex;
    const slideElement =
      swiper.slides[prevIndex]?.querySelector(".overflow-y-auto");
    if (slideElement) {
      setScrollPosition(prevIndex, slideElement.scrollTop);
    }
    setActiveTab(swiper.activeIndex);
    // 슬라이드 변경 시에도 프리로딩 실행
    preloadAdjacentComponents(swiper.activeIndex);
  };

  // touchStart 이벤트 핸들러 추가
  const handleTouchStart = () => {
    const currentIndex = swiperRef.current?.activeIndex;
    if (currentIndex !== undefined) {
      preloadAdjacentComponents(currentIndex);
    }
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
      <GNBHeader
        activeTab={activeTab}
        setActiveTab={(index) => {
          setActiveTab(index);
          swiperRef.current?.slideTo(index);
          // 탭 클릭 시에도 프리로딩 실행
          preloadAdjacentComponents(index);
        }}
      />
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={handleSlideChange}
        onTouchStart={handleTouchStart} // 터치 시작할 때도 프리로딩
        className="w-full flex-1 h-full bg-[#f8f9fa]"
        speed={300}
        touchRatio={1.5}
        resistance={true}
        resistanceRatio={0.55}
        observer={true}
        observeParents={true}
        spaceBetween={0}
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
