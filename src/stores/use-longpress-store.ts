import { create } from "zustand";

interface LongPressState {
  activeSection: string | null;
  activeId: string | number | null;
  setActive: (section: string, id: string | number) => void;
  clear: () => void;
}

export const useLongPressStore = create<LongPressState>((set) => ({
  activeSection: null,
  activeId: null,
  setActive: (section, id) => set({ activeSection: section, activeId: id }),
  clear: () => set({ activeSection: null, activeId: null }),
}));
