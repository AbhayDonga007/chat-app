'use client'
import { FunctionComponent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

interface pageProps {}

const Page: FunctionComponent<pageProps> = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      await signIn("google");
    } catch (e) {
      toast.error("Something went to wrong with your login");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="flex h-screen items-center justify-center bg-gray-300">
      <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-white shadow-lg">
        <h1 className="text-2xl font-bold text-center">Create Account</h1>
        <p className="text-sm text-gray-500 text-center">
          Fill in the information below to create your account.
        </p>
        <form className="space-y-6">
          <div>
            <label className="text-sm font-medium" htmlFor="email">
              Email
            </label>
            <Input
              className="mt-1"
              id="email"
              placeholder="you@example.com"
              type="email"
            />
          </div>
          <div>
            <label className="text-sm font-medium" htmlFor="password">
              Password
            </label>
            <Input
              className="mt-1"
              id="password"
              placeholder="•••••••••"
              type="password"
            />
          </div>
          <div>
            <label className="text-sm font-medium" htmlFor="confirm-password">
              Confirm Password
            </label>
            <Input
              className="mt-1"
              id="confirm-password"
              placeholder="•••••••••"
              type="password"
            />
          </div>
          <Button className="w-full text-white bg-black">Sign Up</Button>
        </form>
        <div className="flex items-center justify-center space-x-2">
          <span className="h-px w-16 bg-gray-300" />
          <span className="text-sm font-medium text-gray-500">OR</span>
          <span className="h-px w-16 bg-gray-300" />
        </div>
        <Button
            onClick={loginWithGoogle}
            className="w-full"
            variant="outline"
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <svg
                className="mr-2 h-4 w-4"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="github"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
                <path d="M1 1h22v22H1z" fill="none" />
              </svg>
            )}
            Continue with Google
          </Button>
        <p className="text-sm text-center text-gray-500">
          Already have an account?{" "}
          <Link className="text-black font-medium underline" href="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

function ChromeIcon({ ...props }) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <line x1="21.17" x2="12" y1="8" y2="8" />
      <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
      <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
    </svg>
  );
}

export default Page;
