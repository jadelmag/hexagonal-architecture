import { LocalStorageTaskRepository } from "@/infraestructure/localStorageTaskRepository";
import { ApiTaskRepository } from "@/infraestructure/taskRepository";
import { TaskService } from "@/services/taskService";

export class TaskServiceFactory {
  static create(useApi: boolean) {
    const taskRepository = useApi
      ? new ApiTaskRepository() 
      : new LocalStorageTaskRepository();

    return new TaskService(taskRepository);
  }
}