"use client";

import { useEffect, useState } from "react";
import {
  HomeIcon,
  Bars3Icon as MenuIcon,
  UserIcon,
  ClockIcon,
  MagnifyingGlassIcon as SearchIcon,
  ShoppingBagIcon as CartIcon,
  SignalIcon as OnAirIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import { GNB } from "@/components/GNB/GNB";

export default function Home() {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* 상단 헤더 */}
      <header
        className={`fixed top-0 w-full bg-white z-50 transition-transform duration-300 ${
          visible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 h-12 border-b">
          <div className="flex items-center space-x-3">
            <ArrowLeftIcon className="w-6 h-6 text-gray-700" />
            <span className="text-lg font-semibold text-red-600">
              KT AlphaShopping
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative">
              <SearchIcon className="w-6 h-6 text-gray-700" />
            </button>
            <button className="relative">
              <CartIcon className="w-6 h-6 text-gray-700" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                0
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* GNB 컴포넌트를 헤더 밖으로 이동 */}
      <div
        className={`fixed top-12 w-full bg-white z-40 transition-transform duration-300 ${
          visible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <GNB />
      </div>

      {/* 메인 컨텐츠 영역 추가 */}
      <main className="flex-1 mt-24 mb-14 overflow-y-auto">
        {/* 여기에 페이지 컨텐츠 추가 */}
      </main>

      {/* 하단 네비게이션은 그대로 유지 */}
      <nav className="fixed bottom-0 w-full bg-white border-t">
        <div className="flex justify-around items-center h-14">
          <a href="/" className="flex flex-col items-center">
            <HomeIcon className="w-6 h-6" />
            <span className="text-xs">홈</span>
          </a>
          <a href="/category" className="flex flex-col items-center">
            <MenuIcon className="w-6 h-6" />
            <span className="text-xs">카테고리</span>
          </a>
          <a href="/live" className="flex flex-col items-center">
            <div className="relative -mt-8 bg-red-500 rounded-full p-4">
              <OnAirIcon className="w-8 h-8 text-white" />
            </div>
            <span className="text-xs mt-1">ON AIR</span>
          </a>
          <a href="/mykt" className="flex flex-col items-center">
            <UserIcon className="w-6 h-6" />
            <span className="text-xs">마이KT</span>
          </a>
          <a href="/recent" className="flex flex-col items-center">
            <ClockIcon className="w-6 h-6" />
            <span className="text-xs">최근본상품</span>
          </a>
        </div>
      </nav>
    </div>
  );
}
