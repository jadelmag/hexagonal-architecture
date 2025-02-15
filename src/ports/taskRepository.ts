import { NewTask, Task } from "@/domain/task/task";

// Port
export interface TaskRepositoryInterface {
  getAllTasks: () => Promise<Task[]>;
  saveTask: (task: NewTask) => Promise<Task>;
  removeTask: (id: number) => Promise<void>;
  updateTask: (id: number, task: Task) => Promise<Task>;
}
