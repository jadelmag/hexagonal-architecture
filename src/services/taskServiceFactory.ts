import { LocalStorageTaskRepository } from "@/infraestructure/localStorageTaskRepository";
import { ApiTaskRepository } from "@/infraestructure/taskRepository";
import { TaskService } from "@/services/taskService";

export class TaskServiceFactory {
  static create() {
    const apiTaskRepository = new ApiTaskRepository();
    return new TaskService(apiTaskRepository);
  }

  static local() {
    const localTaskRepository = new LocalStorageTaskRepository();
    return new TaskService(localTaskRepository);
  }
}


