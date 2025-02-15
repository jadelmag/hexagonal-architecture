import { z } from 'zod';

const taskSchema = z.object({
  id: z.number(),
  userId: z.number(),
  title: z.string(),
  completed: z.boolean(),
});
const tasksResponseSchema = z.array(taskSchema);

export type Task = z.infer<typeof taskSchema>;

const newTaskSchema = taskSchema.omit({ id: true });

export type NewTask = z.infer<typeof newTaskSchema>;

export { newTaskSchema, taskSchema, tasksResponseSchema };

