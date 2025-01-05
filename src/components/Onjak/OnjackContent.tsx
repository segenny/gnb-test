"use client";

import Image from "next/image";

interface OnjackItem {
  id: number;
  category: string;
  title: string;
  imageUrl: string;
  price: number;
  originalPrice?: number;
  status: string;
  remainingTime: string;
}

const OnjackContent = () => {
  const items: OnjackItem[] = [
    {
      id: 1,
      category: "TV특가",
      title: "전고객 쉬젤나이트5종! 보스티나 더 플러스 염색약",
      imageUrl:
        "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=10&w=500&auto=format&fit=crop",
      price: 78900,
      originalPrice: 89900,
      status: "무료배송",
      remainingTime: "00:24:04",
    },
    {
      id: 2,
      category: "인기상품",
      title: "[특가] 프리미엄 주방용품 세트 모음전",
      imageUrl:
        "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=10&w=500&auto=format&fit=crop",
      price: 159000,
      originalPrice: 199000,
      status: "당일발송",
      remainingTime: "01:30:00",
    },
    {
      id: 3,
      category: "베스트",
      title: "프리미엄 음악감상 블루투스 이어폰",
      imageUrl:
        "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=10&w=500&auto=format&fit=crop",
      price: 129000,
      originalPrice: 150000,
      status: "무료배송",
      remainingTime: "02:45:00",
    },
    // ... 필요하면 더 추가할 수 있어!
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <div
          key={item.id}
          className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="relative">
            <div className="absolute top-2 left-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm">
              LIVE {item.remainingTime}
            </div>
            <div className="relative aspect-video">
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="p-4">
            <div className="text-lg font-bold">
              {item.price.toLocaleString()}원 바로구매
            </div>
            <h3 className="text-sm mt-2 line-clamp-2">{item.title}</h3>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-gray-500 line-through text-sm">
                {item.originalPrice?.toLocaleString()}원
              </span>
              <span className="text-red-500 font-bold">
                {Math.round(
                  (1 - item.price / (item.originalPrice || item.price)) * 100
                )}
                %
              </span>
            </div>
            <div className="mt-2 flex gap-2">
              <span className="text-sm text-gray-600">{item.status}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OnjackContent;
