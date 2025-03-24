import { z } from "zod";

export const signInFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export type SignInFormValues = z.infer<typeof signInFormSchema>;

export const signUpFormSchema = z
    .object({
        firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
        lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
        email: z.string().email({ message: "Please enter a valid email address" }),
        password: z
            .string()
            .min(8, { message: "Password must be at least 8 characters" })
            .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
            .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
            .regex(/\d/, { message: "Password must contain at least one number" })
            .regex(/[@$!%*?&]/, { message: "Password must contain at least one special character" }),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
});

export type SignUpFormValues = z.infer<typeof signUpFormSchema>;