import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UIState {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      isMenuOpen: false,
      toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
      closeMenu: () => set({ isMenuOpen: false }),
      activeSection: "hero",
      setActiveSection: (section) => set({ activeSection: section }),
    }),
    {
      name: "ui-storage",
    }
  )
);
