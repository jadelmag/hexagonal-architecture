import { saveTask } from "@/application/task/save.useCase";
import { NewTask, Task } from "@/domain/task/task";
import { TaskService } from "@/services/taskService";
import "@testing-library/jest-dom";
import { describe, expect, it, vi } from "vitest";

describe("saveTask", () => {
  const mockTask: NewTask = {
    userId: 1,
    title: "mock task",
    completed: false,
  };

  const mockSavedTask: Task = {
    id: 1,
    userId: 1,
    title: "mock task",
    completed: false,
  };

  it("should save current task", async () => {
    const mockTaskService = {
      saveTask: vi.fn().mockResolvedValue(mockSavedTask),
    };

    const tasks = await saveTask(
      mockTaskService as unknown as TaskService,
      mockTask
    );

    expect(mockTaskService.saveTask).toHaveBeenCalledTimes(1);
    expect(tasks).toEqual(mockSavedTask);
  });

  it("should handle errror when save task", async () => {
    const mockTaskService = {
      saveTask: vi.fn().mockRejectedValue(new Error("Error creating task")),
    };

    await expect(
      saveTask(mockTaskService as unknown as TaskService, mockTask)
    ).rejects.toThrow("Error creating task");
  });
});
