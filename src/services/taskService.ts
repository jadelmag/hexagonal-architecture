import { NewTask, Task } from "@/domain/task/task";
import { TaskRepositoryInterface } from "@/ports/taskRepository";

export class TaskService implements TaskRepositoryInterface {
  constructor(private taskRepository: TaskRepositoryInterface) {}

  async getAllTasks(): Promise<Task[]> {
    return this.taskRepository.getAllTasks();
  }

  async saveTask(task: NewTask): Promise<Task | null> {
    return this.taskRepository.saveTask(task);
  }

  async removeTask(id: number): Promise<void> {
    return this.taskRepository.removeTask(id);
  }

  async updateTask(id: number, task: Task): Promise<Task> {
    return this.taskRepository.updateTask(id, task);
  }
}
