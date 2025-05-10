// app/components/auth/RegisterForm.tsx
'use client';

import { z } from "zod";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { forgotPassord } from '../../api/auth';
import useAuthStore from "@/app/stores/auth.stores";
import { useRouter } from 'next/navigation'; // Note: changed from next/router to next/navigation
import { toast } from "react-toastify";

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid Email address"),
})

type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
  const router = useRouter();
  const { setError: setAuthError } = useAuthStore();

  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const mutation = useMutation({
    mutationFn: forgotPassord,
    onSuccess: () => {
      toast.success("Check your mail to get password reset token")
      router.push('/resetpassword-page')
    },
    onError: (error: any) => {
      setAuthError(error.response?.data?.message || "Registration failed");
      toast.error("couldn't create an account, check your internet connect or try using another email");
    }
  });

  const onSubmit = (data: ForgotPasswordData) => {
    mutation.mutate(data.email)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-[450px]">


      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className="mt-1 block w-full rounded-md border p-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
      </div>


      <div>
        <button
          type="submit"
          disabled={mutation.isPending}
          className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {mutation.isPending ? 'sending reset token...' : 'get reset token'}
        </button>
        <p className="text-sm cursor-pointer" onClick={()=>router.push('/login')}>have an account? <i className="text-blue-600">sign in</i></p>
      </div>
    </form>
  );
}

export default ForgotPassword;