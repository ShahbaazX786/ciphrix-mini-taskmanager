"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { signUpUser } from "@/lib/api/api.auth";
import { signupFormSchema } from "@/lib/schema/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";

const SignupForm = () => {
  const formSchema = signupFormSchema;
  const signupForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const signupMutation = useMutation({
    mutationFn: (data: z.infer<typeof formSchema>) => signUpUser(data),
    onSuccess: (res) => {
      if (res?.success) {
        console.warn("User Created Sucessfully");
      } else {
        console.warn("Something went wrong i guess", res?.message);
      }
    },
    onError: (err: any) => {
      console.warn("Error", err?.response?.data?.message);
    },
  });

  const onFormSubmit = (data: z.infer<typeof formSchema>) => {
    signupMutation.mutate(data);
  };

  return (
    <form
      className=" w-full h-full p-6 md:p-8"
      onSubmit={signupForm.handleSubmit(onFormSubmit)}
    >
      <FieldGroup>
        <Field className="grid grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor="first-name">First Name</FieldLabel>
            <Input
              id="first-name"
              type="text"
              placeholder="Hanma"
              {...signupForm.register("firstName")}
            />
            {signupForm.formState.errors.firstName && (
              <p className="text-red-500 text-xs text-left">
                {signupForm.formState.errors.firstName.message}
              </p>
            )}
          </Field>
          <Field>
            <FieldLabel htmlFor="last-name">Last Name</FieldLabel>
            <Input
              id="last-name"
              type="text"
              placeholder="Baki"
              {...signupForm.register("lastName")}
            />
            {signupForm.formState.errors.lastName && (
              <p className="text-red-500 text-xs text-left">
                {signupForm.formState.errors.lastName.message}
              </p>
            )}
          </Field>
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="HanmaBaki@email.com"
            {...signupForm.register("email")}
          />
          {signupForm.formState.errors.email && (
            <p className="text-red-500 text-xs text-left">
              {signupForm.formState.errors.email.message}
            </p>
          )}
        </Field>
        <Field className="grid grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              type="password"
              placeholder="********"
              {...signupForm.register("password")}
            />
            {signupForm.formState.errors.password && (
              <p className="text-red-500 text-xs text-left">
                {signupForm.formState.errors.password.message}
              </p>
            )}
          </Field>
          <Field>
            <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
            <Input
              id="confirm-password"
              type="password"
              placeholder="********"
              {...signupForm.register("confirmPassword")}
            />
            {signupForm.formState.errors.confirmPassword && (
              <p className="text-red-500 text-xs text-left">
                {signupForm.formState.errors.confirmPassword.message}
              </p>
            )}
          </Field>
        </Field>
        <Field>
          <Button type="submit" disabled={signupMutation.isPending}>
            {signupMutation.isPending
              ? "Creating Account..."
              : "Create Account"}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
};

export default SignupForm;
