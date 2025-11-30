import { z } from "zod";

const newTaskSchema = z.object({
  title: z
    .string({ error: "Title must be a textual string" })
    .min(5, { error: "Title must be at least 5 characters long" })
    .max(30, { error: "Title must not exceed over 30 characters" }),
  description: z
    .string({ error: "Description must be a textual string" })
    .min(5, { error: "Description must be at least 5 characters long" })
    .max(30, { error: "Description must not exceed over 30 characters" }),
  status: z
    .enum(["Pending", "Completed"], {
      error: "Invalid status Provided",
    })
    .default("Pending"),
});

const editTaskSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Title must be at least 5 characters long" })
    .max(30, { message: "Title must not exceed 30 characters" })
    .optional(),

  description: z
    .string()
    .min(5, { message: "Description must be at least 5 characters long" })
    .max(30, { message: "Description must not exceed 30 characters" })
    .optional(),

  status: z.enum(["Pending", "Completed"]).optional(),
});

export { newTaskSchema, editTaskSchema };
