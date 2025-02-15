import { NewTask, Task } from "@/domain/task/task";
import { TaskRepositoryInterface } from "@/port/taskRepository";

export class TaskService implements TaskRepositoryInterface {
  constructor(private taskRepository: TaskRepositoryInterface) {}

  async getAllTasks() {
    return this.taskRepository.getAllTasks();
  }

  async saveTask(task: NewTask) {
    return this.taskRepository.saveTask(task);
  }

  async removeTask(id: number) {
    return this.taskRepository.removeTask(id);
  }

  async updateTask(id: number, task: Task) {
    return this.taskRepository.updateTask(id, task);
  }
}
