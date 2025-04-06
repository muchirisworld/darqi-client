import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthState = {
    isAuthenticated: boolean;
    setAuthenticated: (value: boolean) => void;
};

export const useAuth = create<AuthState>()(
    persist(
        (set) => ({
            isAuthenticated: false,
            setAuthenticated: (value: boolean) => set({ isAuthenticated: value }),
        }),
        {
            name: 'auth-storage',
        }
    )
);