// "use client";

// import React, { useEffect } from "react";
// import { useAuthStore } from "../../store/auth";
// import { useRouter } from "next/navigation";

// export default function Dashboard() {
//   const user = useAuthStore((state) => state.user);
//   const logout = useAuthStore((state) => state.logout);
//   const router = useRouter();

//   // useEffect(() => {
//   //   if (!user) {
//   //     router.push("/auth/login");
//   //   }
//   // }, [user, router]);

//   const handleLogin = () => {
//     logout();
//     router.push('/auth/register')
//   }

//   return (
//     <div className="flex flex-col items-center justify-center h-screen">
//       <h1 className="text-2xl font-bold">Welcome, {user?.email}!</h1>
//       <button onClick={handleLogin} className="mt-4 cursor-pointer bg-red-500 text-white px-4 py-2">Logout</button>
//     </div>
//   );
// }


"use client";

import React, { useEffect } from "react";
import { useAuthStore } from "../../store/auth";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const loadUser = useAuthStore((state) => state.loadUser);
  const router = useRouter();

  // Load the user when the component mounts
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  // Redirect to login if the user is not logged in
  useEffect(() => {
    if (!user) {
      router.push("/auth/register");
    }
  }, [user, router]);

  const handleLogout = () => {
    logout(); // Call the logout function
    router.push("/auth/login"); // Redirect to the login page after logout
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Welcome, {user?.email}!</h1>
      <button
        onClick={handleLogout}
        className="mt-4 cursor-pointer bg-red-500 text-white px-4 py-2"
      >
        Logout
      </button>
    </div>
  );
}
