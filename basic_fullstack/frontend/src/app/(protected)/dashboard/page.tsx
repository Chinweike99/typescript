"use client";

import ProtectedRoute from "@/app/api/components/auth/ProtectedRoute";
import useAuthStore from "@/app/stores/auth.stores"




const DashboardPage = () =>{
    const {user, logout } = useAuthStore();

    return (
    <ProtectedRoute>
      <div className="min-h-full">
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <button
              onClick={logout}
              className="rounded-md bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Logout
            </button>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <div className="h-96 rounded-lg border-4 border-dashed border-gray-200 p-4">
                <h2 className="text-xl font-semibold">Welcome, {user?.name}!</h2>
                <p className="mt-2 text-gray-600">You are now logged in to your account.</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default DashboardPage;

