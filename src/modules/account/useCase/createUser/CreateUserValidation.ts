import { z } from 'zod';

const User = z
    .object({
        name: z
            .string()
            .min(3, 'Name field needs to have at least 3 characterers')
            .transform((name) => {
                return name
                    .trim()
                    .split(' ')
                    .map((word) => {
                        return word[0].toUpperCase().concat(word.substring(1).toLowerCase());
                    })
                    .join(' ');
            }),
        email: z
            .string()
            .toLowerCase()
            .email('It is necessary inform a valid email')
            .transform((value) => value.toLowerCase()),
        password: z
            .string()
            .min(6, 'Password must have at least 6 characterers')
            .max(16, 'Password must have at most 16 characters')
            .refine((value) => /[a-z]/.test(value), {
                message: 'Password must contain at least one lowercase letter',
            })
            .refine((value) => /[A-Z]/.test(value), {
                message: 'Password must contain at least one uppercase letter',
            })
            .refine((value) => /\d/.test(value), {
                message: 'Password must contain at least one number',
            })
            .refine((value) => /[!@#$%^&*()_+[\]{};':"\\|,.<>?/=\-~`]/.test(value), {
                message: 'Password must contain at least one special character',
            }),
    })
    .required();

type User = z.infer<typeof User>;

export { User };
