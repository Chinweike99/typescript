'use client';

import React, { useState } from 'react'
import { useAuthStore } from '../../store/auth';
import { useRouter } from 'next/navigation';

export const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const register = useAuthStore((state) => state.register);
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');


    // const handleRegister = async (e: React.FormEvent) =>{
    //     e.preventDefault();
    //     try {
    //         await register(name, email, password);
    //         router.push('/auth/login')
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }

    const handleRegister = async (e: React.FormEvent) => {
      e.preventDefault();
    setLoading(true);
    setError('');

      try {
        console.log('Attempting to register user...');
        await register(name, email, password);
        console.log('User registered successfully');
        // router.push('/auth/login');
        router.push('/auth/dashboard');
      } catch (error) {
        console.error('Registration error:', error);
      }
      setLoading(false);
    };



  return (
    <div>
         <div className="flex h-screen items-center justify-center">
      <form onSubmit={handleRegister} className="p-6 bg-white  shadow-2xl rounded-lg w-96">
        <h1 className="text-2xl font-bold mb-4">Register</h1>
        <input type="text" 
        placeholder='Name'
        className="border p-2 w-full mb-2"
        onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-2"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-2"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="bg-green-500 text-white p-2 w-full">
          Register
        </button>
      </form>
    </div>
    </div>
  )
}
