import { LocalStorageTaskRepository } from "@/infraestructure/localStorageTaskRepository";
import { ApiTaskRepository } from "@/infraestructure/taskRepository";
import { TaskRepositoryInterface } from "@/ports/taskRepository";
import { TaskService } from "@/services/taskService";

export class TaskServiceFactory {
  static getTaskRepository(useApi: boolean): TaskRepositoryInterface {
    return useApi ? new ApiTaskRepository() : new LocalStorageTaskRepository();
  }

  static create(useApi: boolean): TaskService {
    const taskRepository = this.getTaskRepository(useApi);
    return new TaskService(taskRepository);
  }
}
