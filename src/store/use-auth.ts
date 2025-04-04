import { SignInFormValues, SignUpFormValues } from "@/lib/schema/auth";
import { create } from "zustand";

type UseAuthProps = {
    user: User | null;
    signIn: (data: SignInFormValues) => Promise<void>;
    signUp: (data: SignUpFormValues) => Promise<void>;
    signOut: () => Promise<void>;
}

export const useAuth = create<UseAuthProps>((set) => ({
    user: null,
    signIn: async (data) => {
        try {
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
          
            set({ user: responseData });
        } catch (error: any) {
            throw error;
        }
    },
    signUp: async (data) => {
        try {
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
          
            set({ user: responseData });
        } catch (error: any) {
            throw error;
        }
    },
    signOut: async () => {
        try {
            const response = await fetch("/api/auth/sign-out", {
                method: "POST"
            });
          
            if (!response.ok) {
              throw new Error("Failed to sign out");
            }
          
            set({ user: null });
        } catch (error: any) {
            throw error;
        }
    },
}));