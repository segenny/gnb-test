"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useRouter } from "next/navigation";

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  discount?: number;
}

export default function ProductDetail() {
  const router = useRouter();
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 실제로는 API에서 데이터를 가져올 거야!
    const dummyProduct: Product = {
      id: Number(params.id),
      name: "[특가] 다이슨 에어랩",
      price: 699000,
      imageUrl:
        "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=10&w=500&auto=format&fit=crop",
      discount: 15,
    };

    setProduct(dummyProduct);
    setLoading(false);
  }, [params.id]);

  if (loading || !product) {
    return (
      <div className="min-h-screen p-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-black mb-6"
        >
          <IoArrowBack size={20} />
          <span>뒤로가기</span>
        </button>
        <div className="min-h-screen p-6 flex items-center justify-center">
          <div className="w-full max-w-4xl animate-pulse">
            <div className="aspect-video bg-gray-200 rounded-lg mb-6" />
            <div className="h-8 bg-gray-200 rounded mb-4 w-2/3" />
            <div className="h-6 bg-gray-200 rounded mb-4 w-1/3" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-black mb-6 transition-colors"
        >
          <IoArrowBack size={20} />
          <span>뒤로가기</span>
        </button>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="relative aspect-video">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="absolute w-full h-full object-cover"
            />
            {product.discount && (
              <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full text-lg font-bold">
                {product.discount}% OFF
              </div>
            )}
          </div>

          <div className="p-8 space-y-6">
            <div className="flex items-start justify-between">
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <button className="text-gray-400 hover:text-red-500 transition-colors">
                ❤️
              </button>
            </div>

            <div className="space-y-3 border-t border-b border-gray-100 py-6">
              {product.discount ? (
                <>
                  <div className="flex items-center gap-3">
                    <span className="text-red-500 font-bold text-2xl">
                      {product.discount}%
                    </span>
                    <span className="text-gray-400 line-through text-lg">
                      {product.price.toLocaleString()}원
                    </span>
                  </div>
                  <div className="text-2xl font-bold">
                    {(
                      product.price *
                      (1 - product.discount / 100)
                    ).toLocaleString()}
                    원
                  </div>
                </>
              ) : (
                <div className="text-2xl font-bold">
                  {product.price.toLocaleString()}원
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-gray-600">
                <span>🚚 무료배송</span>
                <span>|</span>
                <span>🎁 포인트 적립</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button className="bg-black text-white px-8 py-4 rounded-xl hover:bg-gray-800 transition-colors font-bold text-lg">
                  바로 구매하기
                </button>
                <button className="border-2 border-black px-8 py-4 rounded-xl hover:bg-gray-50 transition-colors font-bold text-lg">
                  장바구니 담기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
