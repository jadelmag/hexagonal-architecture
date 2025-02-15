import { TaskService } from "@/services/taskService";

export const removeTask = async (taskService: TaskService, taskId: number) => {
  return await taskService.removeTask(taskId);
};
