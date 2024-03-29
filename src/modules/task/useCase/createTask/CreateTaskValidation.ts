import { z } from 'zod';

const CreateTaskSchema = z
    .object({
        name: z.string(),
        description: z.string(),
    })
    .partial();

type CreateTaskSchema = z.infer<typeof CreateTaskSchema>;

export { CreateTaskSchema };
