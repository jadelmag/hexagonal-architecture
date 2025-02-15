import { Task } from "@/domain/task/task";
import { TaskService } from "@/services/taskService";

export const updateTask = async (
  taskService: TaskService,
  id: number,
  task: Task
) => {
  return await taskService.updateTask(id, task);
};
