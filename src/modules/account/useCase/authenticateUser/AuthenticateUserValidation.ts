import { z } from 'zod';

const AuthenticateUserSchema = z.object({
    email: z
        .string()
        .toLowerCase()
        .email('It is necessary inform a valid email')
        .transform((value) => value.toLowerCase()),
});

type AuthenticateUserSchema = z.infer<typeof AuthenticateUserSchema>;

export { AuthenticateUserSchema };
