import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/store/use-auth';
import { SignInFormValues, SignUpFormValues } from '@/lib/schema/auth';

export function useUser() {
    const queryClient = useQueryClient();
    const { isAuthenticated, setAuthenticated } = useAuth();

    const { data: user, isLoading } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const response = await fetch('/api/auth/me');
            const data = await response.json();

            if (!response.ok) {
                setAuthenticated(false);
                throw new Error(data.message || 'Failed to fetch user');
            }

            if (data) setAuthenticated(true);
            return data;
        },
        // Only fetch if we think we're authenticated
        enabled: isAuthenticated,
        staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
        gcTime: 10 * 60 * 1000,   // Keep data in cache for 10 minutes
    });

    const signIn = useMutation({
        mutationFn: async (data: SignInFormValues) => {
            const response = await fetch('/api/auth/sign-in', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const res = await response.json();

            if (!response.ok) {
                throw new Error(res.message || "Failed to sign in");
            }

            return res
        },
        onSuccess: (userData) => {
            setAuthenticated(true);
            queryClient.setQueryData(['user'], userData);
        },
    });

    const signUp = useMutation({
        mutationFn: async (data: SignUpFormValues) => {
            const response = await fetch('/api/auth/sign-up', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const res = await response.json();

            if (!response.ok) {
                throw new Error(res.message || "Failed to sign up");
            }

            return res
        },
        onSuccess: (userData) => {
            setAuthenticated(true);
            queryClient.setQueryData(['user'], userData);
        },
    });

    const signOut = useMutation({
        mutationFn: async () => {
            const response = await fetch('/api/auth/sign-out', {
                method: 'POST'
            });

            if (!response.ok) {
                throw new Error('Failed to sign out');
            }
        },
        onSuccess: () => {
            setAuthenticated(false);
            queryClient.setQueryData(['user'], null);
        },
    });

    return {
        user,
        isLoading,
        signIn,
        signUp,
        signOut,
    };
}