"use client";

import { Card, CardContent } from "@/components/ui/card";
import { FieldDescription } from "@/components/ui/field";
import { getAppName } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import useAuthGuard from "@/lib/hooks/useAuthGuard";

const AuthForm = ({ mode }: { mode: "login" | "signup" }) => {
  useAuthGuard();
  const isLoginMode = mode === "login";
  const appName = getAppName();

  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          {/* LEFT SIDE */}
          <div className="flex flex-col items-center justify-center gap-4 p-6 text-center">
            <h1 className="text-2xl font-bold">
              {isLoginMode ? "Welcome back" : "Create Account"}
            </h1>

            <p className="text-muted-foreground">
              {isLoginMode ? (
                <>
                  Login to your
                  <span className="font-bold px-1">{appName}</span>
                  account
                </>
              ) : (
                <>
                  Create your new
                  <span className="font-bold px-1">{appName}</span>
                  account now!
                </>
              )}
            </p>

            {isLoginMode ? <LoginForm /> : <SignupForm />}

            <p className="text-sm text-muted-foreground mt-4">
              {isLoginMode ? (
                <>
                  Don&apos;t have an account?{" "}
                  <Link
                    className="font-semibold hover:underline"
                    href="/signup"
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <Link className="font-semibold hover:underline" href="/login">
                    Log In
                  </Link>
                </>
              )}
            </p>
          </div>

          {/* RIGHT SIDE */}
          <div className="relative hidden md:block">
            <Image
              src="/images/authbg.jpg"
              alt="Auth background"
              fill
              loading="eager"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover dark:brightness-[0.25] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>

      <FieldDescription className="px-6 text-center">
        By continuing, you agree to our{" "}
        <a href="#" className="underline">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="underline">
          Privacy Policy
        </a>
        .
      </FieldDescription>
    </div>
  );
};

export default AuthForm;
