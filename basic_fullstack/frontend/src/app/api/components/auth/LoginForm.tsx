"use client"

import useAuthStore from "@/app/stores/auth.stores";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { login, forgotPassord } from "../../auth";
import { toast } from "react-toastify";



const LoginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string()
})

type LoginFormData = z.infer<typeof LoginSchema>;

const LoginForm = () => {
    const router = useRouter();

    const {setUser, setToken, setIsAuthenticated, setError: setAuthError} = useAuthStore();

    const {register, handleSubmit, formState: {errors}} = useForm<LoginFormData>({
        resolver: zodResolver(LoginSchema),
    });

    const mutation = useMutation({
        mutationFn: login,
        onSuccess: (response) => {
            setUser(response.data.data.user);
            setToken(response.data.token);
            setIsAuthenticated(true);
            router.push('/dashboard')
        },
        onError: (error: any) => {
            setAuthError(error.response?.data?.message || 'Login failed');
            toast.error("Unable to login, Please confirm your credentials are correct")
        }
    });

    const onSubmit = (data: LoginFormData) => {
        mutation.mutate(data)
    }

    const handleForgotPassword = () =>{
      forgotPassord
    }

 return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="password"
          type="password"
          {...register('password')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
            Remember me
          </label>
        </div>

        <div className="text-sm" >
          <a href="/forgot-password"onClick={handleForgotPassword} className="font-medium text-indigo-600 hover:text-indigo-500">
            Forgot your password?
          </a>
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={mutation.isPending}
          className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {mutation.isPending ? 'Logging in...' : 'Sign in'}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;

