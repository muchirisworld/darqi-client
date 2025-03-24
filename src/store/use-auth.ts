import { SignInFormValues, SignUpFormValues } from "@/lib/schema/auth";
import { create } from "zustand";

type UseAuthProps = {
    user: User | null;
    error: string | null;
    isPending: boolean;
    signIn: (data: SignInFormValues) => Promise<void>;
    signUp: (data: SignUpFormValues) => Promise<void>;
    signOut: () => Promise<void>;
}

export const useAuth = create<UseAuthProps>((set) => ({
    user: null,
    isPending: false,
    error: null,
    signIn: async (data) => {
        try {
            set({ isPending: true, error: null });

            const response = await fetch("/api/auth/sign-in", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const responseData = await response.json();
          
            if (!response.ok) {
              throw new Error(responseData.message || "Failed to sign in");
            }
          
            set({ user: responseData.user, isPending: false });
        } catch (error: any) {
            set({ error: error.message, isPending: false });
            throw error;
        }
    },
    signUp: async (data) => {
        try {
            set({ isPending: true, error: null });

            const response = await fetch("/api/auth/sign-up", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const responseData = await response.json();
          
            if (!response.ok) {
              throw new Error(responseData.message || "Failed to sign up");
            }
          
            set({ user: responseData.user, isPending: false });
        } catch (error: any) {
            set({ error: error.message, isPending: false });
            throw error;
        }
    },
    signOut: async () => {
        try {
            set({ isPending: true, error: null });

            const response = await fetch("/api/auth/sign-out", {
                method: "POST"
            });
          
            if (!response.ok) {
              throw new Error("Failed to sign out");
            }
          
            set({ user: null, isPending: false });
        } catch (error: any) {
            set({ error: error.message, isPending: false });
            throw error;
        }
    },
}));