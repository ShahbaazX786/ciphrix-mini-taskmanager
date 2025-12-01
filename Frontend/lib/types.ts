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

type testimonial = {
  userName: string;
  role: string;
  company: string;
  imageUrl: string;
  quote: string;
  rating: number;
};

type Task = {
  _id: string;
  title: string;
  description: string;
  status: "Pending" | "Completed";
  createdAt: string;
  updatedAt: string;
  __V: number;
};

export type { loginPayload, ReactChildren, signupPayload, testimonial };
export type { Task };
