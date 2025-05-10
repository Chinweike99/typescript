"use client";

import useAuthStore from "@/app/stores/auth.stores";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation"
import { useEffect } from "react";




const ProtectedRoute = ({children}: {children: React.ReactNode}) =>{
    const router = useRouter();
    const {isAuthenticated, isLoading } = useAuthStore();


    useEffect(() => {
        if(!isLoading && !isAuthenticated) {
            router.push('/login')
        }
    }, [isAuthenticated, isLoading, router])

    if(isLoading || !isAuthenticated){
        return <div className="flex flex-col items-center justify-center min-h-screen">
        <LoaderCircle className="animate-spin text-blue-600" size={40} />
        <span className="mt-4 text-gray-600">Loading...</span>
    </div>
    }

    return <>{children}</>

}


export default ProtectedRoute;



