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