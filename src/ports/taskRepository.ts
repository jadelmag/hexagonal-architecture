import { NewTask, Task } from "@/domain/task/task";

export interface TaskRepositoryInterface {
  getAllTasks: () => Promise<Task[]>;
  saveTask: (task: NewTask) => Promise<Task | null>;
  removeTask: (id: number) => Promise<void>;
  updateTask: (id: number, task: Task) => Promise<Task | null>;
}
