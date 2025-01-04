export interface Product {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  discount?: number;
  description?: string;
}

export interface Program {
  id: number;
  time: string;
  title: string;
  host: string;
  category: string;
  description: string;
  imageUrl?: string;
  viewerRating: number;
} 