import Image from "next/image";

export const ProductGrid = () => {
  const products = [
    {
      id: 1,
      title: "프리미엄 주방용품 세트",
      price: 89000,
      originalPrice: 129000,
      imageUrl: "https://images.unsplash.com/photo-1610701596007-11502861dcfa",
      discount: 31,
    },
    {
      id: 2,
      title: "울트라 HD TV 55인치",
      price: 990000,
      originalPrice: 1290000,
      imageUrl: "https://images.unsplash.com/photo-1593784991095-a205069470b6",
      discount: 23,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-xl p-3 hover:shadow-xl transition-all duration-300 cursor-pointer"
        >
          <div className="relative aspect-square mb-2">
            <Image
              src={product.imageUrl}
              alt={product.title}
              fill
              className="object-cover rounded-lg"
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            {product.discount && (
              <div className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-lg text-sm font-semibold shadow-md">
                -{product.discount}%
              </div>
            )}
          </div>
          <div className="space-y-1 px-1">
            <h3 className="font-medium text-gray-800 truncate text-sm">
              {product.title}
            </h3>
            <div className="flex items-baseline gap-2">
              <span className="text-base font-bold text-gray-900">
                {product.price.toLocaleString()}원
              </span>
              {product.originalPrice && (
                <span className="text-xs text-gray-400 line-through">
                  {product.originalPrice.toLocaleString()}원
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
