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
import { mutationError, verifyOTPResponse } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import CountdownTimer from "./CountdownTimer";
import SignupSuccessDialog from "./SignupSuccessDialog";

const VerifyOTPForm = () => {
  const [open, setOpen] = useState(false);

  const otpForm = useForm<z.infer<typeof verifyOTPFormSchema>>({
    resolver: zodResolver(verifyOTPFormSchema),
    defaultValues: {
      otp: "",
    },
  });

  const verifyOTPMutation = useMutation({
    mutationFn: (data: z.infer<typeof verifyOTPFormSchema>) => verifyOTP(data),
    onMutate: () => {
      toast.loading("Verifying One Time Password...");
    },
    onSuccess: (res: verifyOTPResponse) => {
      if (res?.success) {
        toast.dismiss();
        toast.success(res?.message, {
          richColors: true,
        });
      }
    },
    onError: (err: mutationError) => {
      toast.dismiss();
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
    <>
      <form
        onSubmit={otpForm.handleSubmit(onSubmit)}
        className="w-2/3 space-y-6"
      >
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
                    } bg-white dark:bg-gray-700`}
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
      <SignupSuccessDialog open={open} onOpenChange={setOpen} />
    </>
  );
};

export default VerifyOTPForm;
