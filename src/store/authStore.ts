import { create } from 'zustand';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: 'user' | 'admin';
  isActive: boolean;
  createdAt: string;
  profileImage?: string;
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  register: (firstName: string, lastName: string, email: string, password: string) => void;
  logout: () => void;
  setUser: (user: User) => void;
}

const adminUser: User = {
  id: 'admin-001',
  firstName: 'Admin',
  lastName: 'User',
  email: 'admin@tabricpro.uz',
  phone: '+998991234567',
  role: 'admin',
  isActive: true,
  createdAt: new Date().toISOString(),
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,

  login: (email: string, password: string) => {
    if (email === 'admin@tabricpro.uz' && password === 'admin123') {
      set({ user: adminUser, isAuthenticated: true });
      localStorage.setItem('auth-storage', JSON.stringify({ user: adminUser, isAuthenticated: true }));
    } else {
      const newUser: User = {
        id: `user-${Date.now()}`,
        firstName: 'User',
        lastName: 'Test',
        email,
        phone: '',
        role: 'user',
        isActive: true,
        createdAt: new Date().toISOString(),
      };
      set({ user: newUser, isAuthenticated: true });
      localStorage.setItem('auth-storage', JSON.stringify({ user: newUser, isAuthenticated: true }));
    }
  },

  register: (firstName: string, lastName: string, email: string, password: string) => {
    const newUser: User = {
      id: `user-${Date.now()}`,
      firstName,
      lastName,
      email,
      phone: '',
      role: 'user',
      isActive: true,
      createdAt: new Date().toISOString(),
    };
    set({ user: newUser, isAuthenticated: true });
    localStorage.setItem('auth-storage', JSON.stringify({ user: newUser, isAuthenticated: true }));
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
    localStorage.removeItem('auth-storage');
  },

  setUser: (user: User) => {
    set({ user, isAuthenticated: true });
    localStorage.setItem('auth-storage', JSON.stringify({ user, isAuthenticated: true }));
  },
}));

if (typeof window !== 'undefined') {
  const storedAuth = localStorage.getItem('auth-storage');
  if (storedAuth) {
    try {
      const { user, isAuthenticated } = JSON.parse(storedAuth);
      useAuthStore.setState({ user, isAuthenticated });
    } catch (e) {
      console.error('Failed to restore auth state', e);
    }
  }
}