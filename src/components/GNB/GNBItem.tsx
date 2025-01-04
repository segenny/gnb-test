"use client";

import React from "react";

interface GNBItemProps {
  children: React.ReactNode;
  isActive: boolean;
}

export const GNBItem = React.memo(({ children, isActive }: GNBItemProps) => {
  return (
    <div className={`px-4 py-2 ${isActive ? "text-kt-red" : "text-gray-500"}`}>
      {children}
    </div>
  );
});
