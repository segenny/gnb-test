import Image from "next/image";

interface OnjackItem {
  id: number;
  category: string;
  title: string;
  imageUrl: string;
  price: number;
  rating: number;
}

export const OnjackContent = () => {
  const items: OnjackItem[] = [
    {
      id: 1,
      category: "가구",
      title: "모던 소파",
      imageUrl: "/images/sofa.jpg",
      price: 299000,
      rating: 4.5,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex gap-4 overflow-x-auto pb-4">
        {["전체", "가구", "가전", "주방", "인테리어"].map((category) => (
          <button
            key={category}
            className="px-4 py-2 rounded-full bg-gray-100 hover:bg-blue-500 hover:text-white transition-colors"
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item.id} className="border rounded-lg overflow-hidden">
            <div className="relative aspect-square">
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <div className="text-sm text-gray-500">{item.category}</div>
              <h3 className="font-semibold">{item.title}</h3>
              <div className="mt-2 flex justify-between items-center">
                <span className="font-bold">
                  {item.price.toLocaleString()}원
                </span>
                <span className="text-yellow-500">★ {item.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
