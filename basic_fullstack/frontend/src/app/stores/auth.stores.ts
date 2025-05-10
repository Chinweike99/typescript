import { create } from "zustand";
import { persist } from "zustand/middleware";



interface User {
    id: string;
    name: string;
    email: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    setUser: (user: User | null) => void;
    setToken: (token: string | null) => void;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
    setIsLoading: (isLoading: boolean) => void;
    setError: (error: string | null) => void;
    logout: () => void;
};



const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
            setUser: (user) => set({user}),
            setToken: (token) => set({token}),
            setIsAuthenticated: (isAuthenticated) => set ({isAuthenticated}),
            setIsLoading: (isLoading) => set({isLoading}),
            setError: (error) => set({error}),
            logout: () => {
                set({
                    user: null,
                    token: null,
                    isAuthenticated: false,
                });
            }
        }),
        {
            name: "auth-storage"
        }
    )
)

export default useAuthStore;
