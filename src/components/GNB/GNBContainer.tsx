import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import PlatformGNB from "./PlatformGNB";
import TVShoppingGNB from "./TVShoppingGNB";
import OrderGNB from "./OrderGNB";
import WebtoonGNB from "./WebtoonGNB";
import SpecialGNB from "./SpecialGNB";

export default function GNBContainer() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { id: 0, name: "편성표", component: <PlatformGNB /> },
    { id: 1, name: "TV쇼핑", component: <TVShoppingGNB /> },
    { id: 2, name: "온라인", component: <OrderGNB /> },
    { id: 3, name: "웨비토", component: <WebtoonGNB /> },
    { id: 4, name: "특가", component: <SpecialGNB /> },
  ];

  return (
    <div className="w-full">
      <Swiper
        slidesPerView={5}
        onSlideChange={(swiper) => setActiveTab(swiper.activeIndex)}
      >
        {tabs.map((tab) => (
          <SwiperSlide key={tab.id}>
            <button
              className={`w-full py-3 text-sm ${
                activeTab === tab.id
                  ? "text-kt-red border-b-2 border-kt-red"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.name}
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="mt-4">{tabs[activeTab].component}</div>
    </div>
  );
}
