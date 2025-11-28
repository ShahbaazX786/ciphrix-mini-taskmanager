"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { loginUser } from "@/utils/api/api.auth";
import { loginFormSchema } from "@/utils/schema/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";

const LoginForm = () => {
  const formSchema = loginFormSchema;
  const loginForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: (data: z.infer<typeof formSchema>) => loginUser(data),
    onSuccess: (res) => {
      if (res?.success) {
        console.warn("User Logged In Sucessfully");
      } else {
        console.warn("Something went wrong i guess", res?.message);
      }
    },
    onError: (err: any) => {
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
