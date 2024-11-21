import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("valid email is required"),
  password: z.string().min(4, "Password must be at least 4 characters long"),
});

export default loginSchema;
