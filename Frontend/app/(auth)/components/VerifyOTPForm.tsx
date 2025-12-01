"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { verifyOTP } from "@/lib/api/api.auth";
import { verifyOTPFormSchema } from "@/lib/schema/user.schema";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import CountdownTimer from "./CountdownTimer";
import { toast } from "sonner";

const VerifyOTPForm = () => {
  const router = useRouter();

  const otpForm = useForm<z.infer<typeof verifyOTPFormSchema>>({
    resolver: zodResolver(verifyOTPFormSchema),
    defaultValues: {
      otp: "",
    },
  });

  const verifyOTPMutation = useMutation({
    mutationFn: (data: z.infer<typeof verifyOTPFormSchema>) => verifyOTP(data),
    onSuccess: (res) => {
      if (res?.success) {
        toast.success(res?.message, {
          richColors: true,
        });
        router.push("/dashboard");
      } else {
        toast.error(res?.message, {
          richColors: true,
        });
        console.warn("Something went wrong i guess", res?.message);
      }
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message, {
        richColors: true,
      });
      console.warn("Error", err?.response?.data?.message);
    },
  });

  const onSubmit = (data: z.infer<typeof verifyOTPFormSchema>) => {
    verifyOTPMutation.mutate(data);
  };

  return (
    <form onSubmit={otpForm.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="inputOTP" className="text-lg">
            <CountdownTimer />
          </FieldLabel>

          <Controller
            name="otp"
            control={otpForm.control}
            render={({ field }) => (
              <InputOTP
                maxLength={6}
                value={field.value}
                onChange={field.onChange}
              >
                <InputOTPGroup
                  className={`${
                    otpForm.formState.errors.otp ? "text-red-500" : ""
                  }`}
                >
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            )}
          />

          {otpForm.formState.errors.otp && (
            <p className="text-red-500 text-sm mt-1">
              {otpForm.formState.errors.otp.message}
            </p>
          )}
        </Field>
      </FieldGroup>

      <Button
        type="submit"
        disabled={Boolean(otpForm.formState.errors.otp?.message)}
      >
        Submit
      </Button>
    </form>
  );
};

export default VerifyOTPForm;
