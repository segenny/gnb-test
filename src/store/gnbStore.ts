import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GNBStore {
  activeTab: number;
  setActiveTab: (index: number) => void;
  resetState: () => void;
}

export const useGNBStore = create<GNBStore>()(
  persist(
    (set) => ({
      activeTab: 0,
      setActiveTab: (index) => set({ activeTab: index }),
      resetState: () => set({ activeTab: 0 })
    }),
    {
      name: 'gnb-storage'
    }
  )
); 