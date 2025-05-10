"use client";

import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";


const verifyPage = () => {
    const router = useRouter()
    const userlogin = () => {
        router.push('/login')
    }

    return (
        <div>
            <div className="flex flex-col p-12 border ">
                <Check className="text-white bg-green-500 rounded-full h-16 w-16"/>
                <p className="text-3xl ">Click on the link sent to your email to get your account verified</p>

                <button onClick={userlogin}>Ok</button>
            </div>
        </div>
    )
}

export default verifyPage;