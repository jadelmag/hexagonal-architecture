import { NewTask, Task } from "@/domain/task/task";
import { TaskRepositoryInterface } from "@/port/taskRepository";
import { generateNumberId } from "@/utils/generateId";

export class LocalStorageTaskRepository implements TaskRepositoryInterface {
  async getAllTasks(): Promise<Task[]> {
    const tasksString = localStorage.getItem("tasks");

    if (!tasksString) {
      return [];
    }

    const tasks: Task[] = JSON.parse(tasksString);
    return tasks;
  }

  async saveTask(task: NewTask): Promise<Task> {
    const tasks: Task[] = await this.getAllTasks();

    const newTask = {
      ...task,
      id: generateNumberId(),
    } as Task;

    tasks.push(newTask);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    return newTask;
  }

  async removeTask(id: number): Promise<void> {
    const tasks: Task[] = await this.getAllTasks();

    const newTasks: Task[] = tasks.filter((task: Task) => task.id !== id);

    localStorage.setItem("tasks", JSON.stringify(newTasks));
  }

  async updateTask(id: number, task: Task): Promise<Task> {
    const tasks: Task[] = await this.getAllTasks();

    const newTasks: Task[] = tasks.map((t) => (t.id === id ? task : t));

    localStorage.setItem("tasks", JSON.stringify(newTasks));

    return task;
  }
}
