import { LocalStorageTaskRepository } from "@/infraestructure/localStorageTaskRepository";
import { ApiTaskRepository } from "@/infraestructure/taskRepository";
import { TaskService } from "@/services/taskService";
import { TaskServiceFactory } from "@/services/taskServiceFactory";
import { describe, expect, it, vi } from "vitest";

describe("TaskServiceFactory", () => {
  it("should create a TaskService with ApiTaskRepository when useApi is true", () => {
    const mockApiRepo = vi
      .fn()
      .mockImplementation(() => new ApiTaskRepository());
    const mockTaskService = vi
      .fn()
      .mockImplementation(() => new TaskService(mockApiRepo()));
    expect(mockTaskService.getMockName()).toBe("spy");

    const taskService = TaskServiceFactory.create(true);

    expect(taskService).toBeInstanceOf(TaskService);
    expect(taskService["taskRepository"]).toBeInstanceOf(ApiTaskRepository);
  });

  it("should create a TaskService with LocalStorageTaskRepository when useApi is false", () => {
    const mockLocalStorageRepo = vi
      .fn()
      .mockImplementation(() => new LocalStorageTaskRepository());
    const mockTaskService = vi
      .fn()
      .mockImplementation(() => new TaskService(mockLocalStorageRepo()));
    expect(mockTaskService.getMockName()).toBe("spy");

    const taskService = TaskServiceFactory.create(false);

    expect(taskService).toBeInstanceOf(TaskService);
    expect(taskService["taskRepository"]).toBeInstanceOf(
      LocalStorageTaskRepository
    );
  });

  it("should call getTaskRepository with correct argument", () => {
    const spyGetTaskRepository = vi.spyOn(
      TaskServiceFactory,
      "getTaskRepository"
    );

    TaskServiceFactory.create(true);

    expect(spyGetTaskRepository).toHaveBeenCalledWith(true);

    TaskServiceFactory.create(false);

    expect(spyGetTaskRepository).toHaveBeenCalledWith(false);
  });
});
