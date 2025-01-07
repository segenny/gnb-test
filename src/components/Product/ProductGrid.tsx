"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useGNBStore } from "../../store/gnbStore";

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  discount?: number;
}

export const ProductGrid = () => {
  const router = useRouter();
  const { activeTab } = useGNBStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // _더미 데이터로 시작하기_ 🛍
  useEffect(() => {
    // 실제로는 API에서 데이터를 가져올 거야!
    const dummyProducts: Product[] = [
      {
        id: 1,
        name: "[특가] 다이슨 에어랩",
        price: 699000,
        imageUrl:
          "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=10&w=500&auto=format&fit=crop",
        discount: 15,
      },
      {
        id: 2,
        name: "삼성 QLED TV 65인치",
        price: 1590000,
        imageUrl:
          "https://images.unsplash.com/photo-1495020689067-958852a7765e?q=10&w=500&auto=format&fit=crop",
        discount: 10,
      },
      {
        id: 3,
        name: "LG 스탠바이미",
        price: 1290000,
        imageUrl:
          "https://images.unsplash.com/photo-1543584756-8f40a802e14f?q=10&w=500&auto=format&fit=crop",
        discount: 20,
      },
      {
        id: 4,
        name: "소니 블루투스 스피커",
        price: 219000,
        imageUrl:
          "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=10&w=500&auto=format&fit=crop",
        discount: 5,
      },
      {
        id: 5,
        name: "필립스 에어프라이어",
        price: 159000,
        imageUrl:
          "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=10&w=500&auto=format&fit=crop",
        discount: 30,
      },
      {
        id: 6,
        name: "나이키 런닝화",
        price: 129000,
        imageUrl:
          "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=10&w=500&auto=format&fit=crop",
        discount: 25,
      },
      {
        id: 7,
        name: "애플 에어팟 프로 2",
        price: 359000,
        imageUrl:
          "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=10&w=500&auto=format&fit=crop",
        discount: 10,
      },
      {
        id: 8,
        name: "삼성 갤럭시 워치 6",
        price: 429000,
        imageUrl:
          "https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=10&w=500&auto=format&fit=crop",
        discount: 15,
      },
      {
        id: 9,
        name: "캣타워",
        price: 89000,
        imageUrl:
          "https://images.unsplash.com/photo-1450778869180-41d0601e046e?q=10&w=500&auto=format&fit=crop",
        discount: 20,
      },
      {
        id: 10,
        name: "마샬 블루투스 스피커",
        price: 329000,
        imageUrl:
          "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=10&w=500&auto=format&fit=crop",
        discount: 10,
      },
      {
        id: 11,
        name: "[신상] 맥북 프로 16인치 M3",
        price: 3890000,
        imageUrl:
          "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=10&w=500&auto=format&fit=crop",
        discount: 8,
      },
      {
        id: 12,
        name: "다이슨 V15 청소기",
        price: 999000,
        imageUrl:
          "https://images.unsplash.com/photo-1558317374-067fb5f30001?q=10&w=500&auto=format&fit=crop",
        discount: 12,
      },
      {
        id: 13,
        name: "샤넬 플랩백 미디움",
        price: 4590000,
        imageUrl:
          "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=10&w=500&auto=format&fit=crop",
        discount: 5,
      },
      {
        id: 14,
        name: "루이비통 네버풀 MM",
        price: 2890000,
        imageUrl:
          "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=10&w=500&auto=format&fit=crop",
        discount: 7,
      },
      {
        id: 15,
        name: "발뮤다 토스터",
        price: 449000,
        imageUrl:
          "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=10&w=500&auto=format&fit=crop",
        discount: 15,
      },
      {
        id: 16,
        name: "구찌 마몬트 크로스백",
        price: 1890000,
        imageUrl:
          "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=10&w=500&auto=format&fit=crop",
        discount: 10,
      },
      {
        id: 17,
        name: "애플 맥 스튜디오",
        price: 2890000,
        imageUrl:
          "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=10&w=500&auto=format&fit=crop",
        discount: 5,
      },
      {
        id: 18,
        name: "삼성 비스포크 냉장고",
        price: 2190000,
        imageUrl:
          "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?q=10&w=500&auto=format&fit=crop",
        discount: 18,
      },
      {
        id: 19,
        name: "LG 올레드 TV 77인치",
        price: 4990000,
        imageUrl:
          "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=10&w=500&auto=format&fit=crop",
        discount: 15,
      },
      {
        id: 20,
        name: "소니 A7M4 카메라",
        price: 2790000,
        imageUrl:
          "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=10&w=500&auto=format&fit=crop",
        discount: 10,
      },
    ];

    setProducts(dummyProducts);
    setLoading(false);
  }, []);

  const handleProductClick = (productId: number) => {
    router.push(`/products/${productId}`);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 max-h-[calc(100vh-80px)] overflow-y-auto">
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="relative pb-[120%]">
              <div className="absolute top-0 left-0 w-full h-full bg-gray-200 animate-pulse" />
            </div>
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
              <div className="h-6 bg-gray-200 rounded animate-pulse w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="overflow-y-auto">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 max-h-[calc(100vh-80px)] overflow-y-auto">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer"
            onClick={() => handleProductClick(product.id)}
          >
            <div className="relative pb-[120%] group">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {product.discount && (
                <div className="absolute top-2 left-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {product.discount}% OFF
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="text-sm font-medium line-clamp-2 mb-2 h-10">
                {product.name}
              </h3>
              <div className="space-y-1">
                {product.discount ? (
                  <>
                    <div className="flex items-center gap-2">
                      <span className="text-red-500 font-bold text-lg">
                        {product.discount}%
                      </span>
                      <span className="text-gray-400 line-through text-sm">
                        {product.price.toLocaleString()}원
                      </span>
                    </div>
                    <span className="font-bold text-lg">
                      {(
                        product.price *
                        (1 - product.discount / 100)
                      ).toLocaleString()}
                      원
                    </span>
                  </>
                ) : (
                  <span className="font-bold text-lg">
                    {product.price.toLocaleString()}원
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
