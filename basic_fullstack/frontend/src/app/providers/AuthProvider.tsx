'use client';

import { useEffect, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import useAuthStore from "../stores/auth.stores";
import { getCurrentUser } from "../api/auth";
import { ToastContainer } from 'react-toastify';

// Create the client outside of the component to avoid re-initialization
const queryClient = new QueryClient();

export default function AuthProvider({ children }: { children: ReactNode }) {
  const { setIsLoading, setError, setUser, setIsAuthenticated } = useAuthStore();

  useEffect(() => {
    const initializeAuth = async() => {
      try {
        setIsLoading(true);
        const response = await getCurrentUser();
        setUser(response.data.data.user);
        setIsAuthenticated(true);
      } catch (error) {
        setUser(null);
        setIsAuthenticated(false)
        setError(`An error occured: ${error}`)
      } finally {
        setIsLoading(false)
      }
    };
    initializeAuth();
  }, [setIsAuthenticated, setIsLoading, setUser, setError]);
    
    return (
      <>
       <ToastContainer position="top-right" />
      <QueryClientProvider client={queryClient}>
      {children}
       <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
      </>
      
    )

}