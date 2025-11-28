import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { getAppName } from "@/utils/helpers";
import Image from "next/image";
import Link from "next/link";

const AuthForm = ({ mode }: { mode: "login" | "signup" }) => {
  const isLoginMode = mode === "login";
  const appName = getAppName();

  return (
    <div className={"flex flex-col gap-6"}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8">
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">
                  {isLoginMode ? "Welcome back" : "Create Account"}
                </h1>
                <p className="text-muted-foreground text-balance">
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
              </div>

              {isLoginMode ? <LoginForm /> : <SignupForm />}

              <FieldDescription className="text-center">
                {isLoginMode
                  ? "Don't have an account? "
                  : "Already have an account? "}

                <Link href={isLoginMode ? "/signup" : "/login"}>
                  {isLoginMode ? "Sign Up" : "Log In"}
                </Link>
              </FieldDescription>
            </FieldGroup>
          </form>
          <div className="bg-muted relative hidden md:block">
            <Image
              src={"/images/authbg.jpg"}
              alt="Image"
              width={1280}
              height={720}
              className="absolute inset-0 h-full w-full object-top dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
};

export default AuthForm;

const LoginForm = () => {
  return (
    <>
      <Field>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input
          id="email"
          type="email"
          placeholder="bakiHanma@email.com"
          required
        />
      </Field>
      <Field>
        <div className="flex items-center">
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <a
            href="#"
            className="ml-auto text-sm underline-offset-2 hover:underline"
          >
            Forgot your password?
          </a>
        </div>
        <Input id="password" type="password" required placeholder="********" />
      </Field>
      <Field>
        <Button type="submit">Login</Button>
      </Field>
    </>
  );
};

const SignupForm = () => {
  return (
    <>
      <Field className="grid grid-cols-2 gap-4">
        <Field>
          <FieldLabel htmlFor="first-name">First Name</FieldLabel>
          <Input id="first-name" type="text" required placeholder="Hanma" />
        </Field>
        <Field>
          <FieldLabel htmlFor="last-name">Last Name</FieldLabel>
          <Input id="last-name" type="text" required placeholder="Baki" />
        </Field>
      </Field>

      <Field>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input
          id="email"
          type="email"
          placeholder="HanmaBaki@email.com"
          required
        />
      </Field>

      <Field className="grid grid-cols-2 gap-4">
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            id="password"
            type="password"
            required
            placeholder="********"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
          <Input
            id="confirm-password"
            type="password"
            required
            placeholder="********"
          />
        </Field>
      </Field>

      <Field>
        <Button type="submit">Create Account</Button>
      </Field>
    </>
  );
};
