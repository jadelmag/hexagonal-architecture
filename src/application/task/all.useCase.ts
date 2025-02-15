import { TaskService } from "@/services/taskService";

export const getAllTasks = async (taskService: TaskService) => {
  return await taskService.getAllTasks();
};
