import { z } from 'zod';

const UpdateTaskSchema = z
    .object({
        name: z.string(),
        description: z.string(),
    })
    .partial();

type UpdateTaskSchema = z.infer<typeof UpdateTaskSchema>;

export { UpdateTaskSchema };
