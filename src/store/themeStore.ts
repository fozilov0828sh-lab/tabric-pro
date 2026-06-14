import { create } from 'zustand';

interface ThemeStore {
  isDark: boolean;
  toggle: () => void;
  setDark: (dark: boolean) => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
  isDark: localStorage.getItem('theme-storage') === 'dark',

  toggle: () => {
    set((state) => {
      const newDark = !state.isDark;
      localStorage.setItem('theme-storage', newDark ? 'dark' : 'light');
      if (newDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return { isDark: newDark };
    });
  },

  setDark: (dark: boolean) => {
    set({ isDark: dark });
    localStorage.setItem('theme-storage', dark ? 'dark' : 'light');
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  },
}));

if (typeof window !== 'undefined') {
  const isDark = useThemeStore.getState().isDark;
  if (isDark) {
    document.documentElement.classList.add('dark');
  }
}