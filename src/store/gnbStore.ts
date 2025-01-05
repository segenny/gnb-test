import { create } from 'zustand';

interface GNBStore {
  activeTab: number;
  scrollPositions: { [key: number]: number };
  setActiveTab: (index: number) => void;
  setScrollPosition: (index: number, position: number) => void;
}

export const useGNBStore = create<GNBStore>((set) => ({
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
})); 