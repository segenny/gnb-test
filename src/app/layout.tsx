"use client";

import "./globals.css";
import "swiper/css";
import { StoreProvider } from "../store/StoreProvider";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useGNBStore } from "../store/gnbStore";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const resetState = useGNBStore((state) => state.resetState);

  useEffect(() => {
    // 상품 상세 페이지에서 나올 때만 GNB 상태 초기화
    if (!pathname.startsWith("/products/")) {
      resetState();
    }
  }, [pathname]);

  return (
    <html lang="ko">
      <body>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
