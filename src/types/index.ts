export interface Program {
  id: number;
  title: string;
  host: string;
  time: string;
  imageUrl: string;
  description: string;
  category: string;
  viewerRating: number;
}

export interface ApiResponse {
  success: boolean;
  data: Program[];
  error?: string;
} 