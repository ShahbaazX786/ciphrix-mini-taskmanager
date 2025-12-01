import { z } from "zod";

const loginFormSchema = z.object({
  email: z.email({ error: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { error: "Password must be atleast 8 characters long" })
    .max(50, { error: "Password must not exceed 50 characters" }),
});

const signupFormSchema = z
  .object({
    firstName: z
      .string()
      .min(2, { message: "First name must be greater than 2 letters" })
      .max(50),

    lastName: z
      .string()
      .min(2, { message: "Last name must be greater than 2 letters" })
      .max(50),

    email: z.string().email({ message: "Please enter a valid email address" }),

    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(50),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

const verifyOTPFormSchema = z.object({
  otp: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export { loginFormSchema, signupFormSchema, verifyOTPFormSchema };
