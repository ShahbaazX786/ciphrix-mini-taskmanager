"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { loginUser } from "@/lib/api/api.auth";
import { loginFormSchema } from "@/lib/schema/user.schema";
import { useAuthStore } from "@/lib/store/auth.store";
import { loginResponse, mutationError } from "@/lib/types";
import { removeToken, setToken } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const LoginForm = () => {
  const router = useRouter();
  const formSchema = loginFormSchema;
  const { setUserState, setSessionState } = useAuthStore();

  const loginForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: (data: z.infer<typeof formSchema>) => loginUser(data),
    onMutate: () => {
      toast.loading("Logging In...");
    },
    onSuccess: (res: loginResponse) => {
      if (res?.success) {
        setUserState(res?.user?.fullName, res?.user?.email, res?.user?.role);
        setSessionState(res?.tokenExpiry, res?.tokenExpiry);
        setToken(res?.token);
        toast.dismiss();
        toast.success("User Logged In Successfully!", {
          richColors: true,
        });
        router.push("/dashboard");
      }
    },
    onError: (err: mutationError) => {
      setUserState(null, null, "user");
      setSessionState(0, 0);
      removeToken();

      toast.dismiss();
      toast.error(
        err?.response?.data?.message || "Server Error, Please check the logs",
        {
          richColors: true,
        }
      );
      console.warn("Error", err?.response?.data?.message);
    },
  });

  const onFormSubmit = (data: z.infer<typeof formSchema>) => {
    loginMutation.mutate(data);
  };

  return (
    <form
      className="w-full h-full p-6 md:p-8"
      onSubmit={loginForm.handleSubmit(onFormSubmit)}
    >
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="bakiHanma@email.com"
            {...loginForm.register("email")}
          />
          {loginForm.formState.errors.email && (
            <p className="text-red-500 text-xs text-left">
              {loginForm.formState.errors.email.message}
            </p>
          )}
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
          <Input
            id="password"
            type="password"
            placeholder="********"
            {...loginForm.register("password")}
          />
          {loginForm.formState.errors.password && (
            <p className="text-red-500 text-xs text-left">
              {loginForm.formState.errors.password.message}
            </p>
          )}
        </Field>
        <Field>
          <Button type="submit" disabled={loginMutation.isPending}>
            {loginMutation.isPending ? "Logging In..." : "Login"}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
};

export default LoginForm;
