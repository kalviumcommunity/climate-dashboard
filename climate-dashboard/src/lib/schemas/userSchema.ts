import { z } from "zod";

export const userCreateSchema = z.object({
  username: z
    .string()
    .min(2, "Username must be at least 2 characters long"),
  email: z.string().email("Invalid email address"),
  role: z.enum(["admin", "operator"], {
    required_error: "Role is required",
    invalid_type_error: "Role must be either 'admin' or 'operator'",
  }),
});

export const userUpdateSchema = userCreateSchema.partial();

export type UserCreateInput = z.infer<typeof userCreateSchema>;
export type UserUpdateInput = z.infer<typeof userUpdateSchema>;

