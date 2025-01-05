import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GNBStore {
  activeTab: number;
  scrollPositions: { [key: number]: number };
  setActiveTab: (index: number) => void;
  setScrollPosition: (index: number, position: number) => void;
  resetState: () => void;
}

export const useGNBStore = create<GNBStore>()(
  persist(
    (set) => ({
      activeTab: 0,
      scrollPositions: {},
      setActiveTab: (index) => set({ activeTab: index }),
      setScrollPosition: (index, position) => 
        set((state) => ({
          scrollPositions: {
            ...state.scrollPositions,
            [index]: position
          }
        })),
      resetState: () => set({ activeTab: 0, scrollPositions: {} })
    }),
    {
      name: 'gnb-storage'
    }
  )
); 