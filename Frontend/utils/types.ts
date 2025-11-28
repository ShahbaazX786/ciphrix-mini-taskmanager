type ReactChildren = {
  children: React.ReactNode;
};

type signupPayload = {
  firstName: string;
  lastName: string;
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
};

type loginPayload = Pick<signupPayload, "email" | "password">;

export type { loginPayload, ReactChildren, signupPayload };
