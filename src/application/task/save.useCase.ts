import { NewTask } from "@/domain/task/task";
import { TaskService } from "@/services/taskService";

export const saveTask = async (taskService: TaskService, task: NewTask) => {
  return await taskService.saveTask(task);
};
