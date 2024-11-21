import { z } from "zod";

const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(3, "First Name must be at least 3 characters long")
      .max(50, "First Name must be less than 50 characters long"),
    lastName: z
      .string()
      .min(3, "Last Name must at least 3 characters long")
      .max(50, "Last Name must be less than 50 characters long"),
    email: z.string().email("Valid email required"),
    password: z.string().min(4, "Password must be at least 4 characters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });

export default registerSchema;
