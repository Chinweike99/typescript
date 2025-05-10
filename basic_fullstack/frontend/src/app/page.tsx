// app/page.tsx
// import RegisterForm from './components/auth/RegisterForm';

import RegisterForm from "./api/components/auth/RegisterForm";

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <RegisterForm />
    </main>
  );
}
