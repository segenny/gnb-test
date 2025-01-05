import { NextResponse } from 'next/server';
import type { ApiResponse } from '@/types';

const programs = [
  {
    id: 1,
    title: "아침을 부탁해",
    host: "김하늘, 박성웅",
    time: "06:00-07:30",
    imageUrl: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=10&w=500&auto=format&fit=crop",
    description: "건강한 아침 식사와 함께하는 즐거운 토크쇼",
    category: "예능",
    viewerRating: 8.9,
  },
  {
    id: 2,
    title: "뉴스 투데이",
    host: "이수진",
    time: "08:00-09:30",
    imageUrl: "https://images.unsplash.com/photo-1495020689067-958852a7765e?q=10&w=500&auto=format&fit=crop",
    description: "아침에 꼭 알아야 할 핵심 뉴스 총정리",
    category: "뉴스",
    viewerRating: 9.1,
  },
  {
    id: 3,
    title: "웃음 한 스푼",
    host: "유재석, 조세호",
    time: "20:00-22:00",
    imageUrl: "https://images.unsplash.com/photo-1543584756-8f40a802e14f?q=10&w=500&auto=format&fit=crop",
    description: "대한민국 대표 예능인들과 함께하는 웃음 폭탄 예능",
    category: "예능",
    viewerRating: 9.5,
  },
  {
    id: 4,
    title: "밤의 음악회",
    host: "김고은",
    time: "22:30-24:00",
    imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=10&w=500&auto=format&fit=crop",
    description: "감미로운 음악과 함께하는 힐링 토크",
    category: "음악",
    viewerRating: 8.8,
  },
  {
    id: 5,
    title: "오늘의 요리",
    host: "백종원",
    time: "11:00-12:30",
    imageUrl: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=10&w=500&auto=format&fit=crop",
    description: "맛있고 건강한 집밥 레시피",
    category: "요리",
    viewerRating: 9.3,
  },
  {
    id: 6,
    title: "스포츠 하이라이트",
    host: "안정환, 이영표",
    time: "23:00-24:30",
    imageUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=10&w=500&auto=format&fit=crop",
    description: "오늘의 스포츠 경기 하이라이트 총정리",
    category: "스포츠",
    viewerRating: 8.7,
  },
  {
    id: 7,
    title: "주말 영화관",
    host: "이동진",
    time: "21:00-23:30",
    imageUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=10&w=500&auto=format&fit=crop",
    description: "엄선된 명작 영화와 심도있는 리뷰",
    category: "영화",
    viewerRating: 9.2,
  },
  {
    id: 8,
    title: "과학의 세계",
    host: "김상욱",
    time: "17:00-18:30",
    imageUrl: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=10&w=500&auto=format&fit=crop",
    description: "어려운 과학 이야기를 쉽고 재미있게",
    category: "교양",
    viewerRating: 8.5,
  },
  {
    id: 9,
    title: "반려동물 이야기",
    host: "강형욱",
    time: "14:00-15:30",
    imageUrl: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?q=10&w=500&auto=format&fit=crop",
    description: "반려동물과 행복하게 사는 법",
    category: "교양",
    viewerRating: 9.0,
  },
  {
    id: 10,
    title: "심야 라디오",
    host: "이적",
    time: "00:00-02:00",
    imageUrl: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=10&w=500&auto=format&fit=crop",
    description: "깊어가는 밤, 음악과 이야기로 채우는 시간",
    category: "음악",
    viewerRating: 8.6,
  }
];

export async function GET() {
  try {
    // 실제 환경에서는 여기서 데이터베이스 조회를 하면 돼!
    const response: ApiResponse = {
      success: true,
      data: programs
    };

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: '프로그램 데이터를 가져오는데 실패했습니다.' 
      },
      { status: 500 }
    );
  }
} 