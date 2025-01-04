"use client";

import React from "react";

interface GNBItemProps {
  children: React.ReactNode;
  isActive?: boolean;
  className?: string;
}

export const GNBItem: React.FC<GNBItemProps> = ({
  children,
  isActive,
  className,
}) => {
  return <div className={className}>{children}</div>;
};
