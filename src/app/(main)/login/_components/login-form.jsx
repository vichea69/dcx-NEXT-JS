'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { Button } from '@/components/ui/button.jsx';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { toast } from 'sonner';

export function LoginForm() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    console.log("🚀 Login form submitted");

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    console.log("📧 Email:", email);
    console.log("🔒 Password:", password); // ⚠️ Don't log this in production!

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    console.log("📦 Login result:", res);

    setLoading(false);

    if (res?.error) {
      const errorMessage =
        res.error === 'CredentialsSignin'
          ? 'Incorrect email or password.'
          : res.error || 'Login failed. Try again.';

      console.error("❌ Login failed:", errorMessage);
      setError(errorMessage);
      toast.error(errorMessage);
    } else {
      console.log("✅ Login successful! Redirecting to /courses");
      toast.success('Login successful');
      router.push('/courses');
    }
  };

  return (
    <Card className="mx-auto max-w-sm w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
            <Button type="button" variant="outline" className="w-full flex items-center justify-center gap-2" onClick={() => signIn('google', { callbackUrl: '/courses' })}>
              <svg aria-hidden="true" width="18" height="18" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303C33.602 32.291 29.223 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.156 7.947 3.053l5.657-5.657C33.892 6.053 29.166 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20c10.493 0 19-8.507 19-19 0-1.341-.138-2.651-.389-3.917z" />
                <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 16.108 18.961 14 24 14c3.059 0 5.842 1.156 7.947 3.053l5.657-5.657C33.892 6.053 29.166 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
                <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.191l-6.197-5.238C29.191 35.431 26.715 36 24 36c-5.202 0-9.568-3.69-11.115-8.652l-6.522 5.02C9.67 39.556 16.21 44 24 44z" />
                <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-1.079 3.291-3.458 5.98-6.091 7.571.002-.001.004-.002.006-.004l6.197 5.238C33.062 42.019 37.5 44 42 44c.722 0 1.431-.047 2.127-.135C45.861 40.651 48 34.724 48 28c0-2.729-.395-5.351-1.139-7.917z" />
              </svg>
              Continue with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/register/instructor" className="underline">
              Instructor
            </Link>{' '}
            or{' '}
            <Link href="/register/student" className="underline">
              Student
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}