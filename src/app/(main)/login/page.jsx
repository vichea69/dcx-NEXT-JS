'use client'
import { LoginForm } from "./_components/login-form.jsx";
const LoginPage = () => {
  return (
    <div className="w-full flex-col h-screen flex items-center justify-center">
      <div className="container">
        <LoginForm />
      </div>
    </div>
  );
};
export default LoginPage;
