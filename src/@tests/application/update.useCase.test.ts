import { updateTask } from "@/application/task/update.useCase";
import { Task } from "@/domain/task/task";
import { TaskService } from "@/services/taskService";
import "@testing-library/jest-dom";
import { describe, expect, it, vi } from "vitest";

describe("updateTask", () => {
  const mockTask: Task = {
    id: 0,
    userId: 1,
    title: "mock task",
    completed: false,
  };

  const updatedTask: Task = {
    id: 0,
    userId: 1,
    title: "mock task",
    completed: true,
  };

  it("should update current task", async () => {
    const mockTaskService = {
      updateTask: vi.fn().mockResolvedValue(updatedTask),
    };

    const tasks = await updateTask(
      mockTaskService as unknown as TaskService,
      mockTask.id,
      mockTask
    );

    expect(mockTaskService.updateTask).toHaveBeenCalledTimes(1);
    expect(tasks).toEqual(updatedTask);
  });

  it("should handle errror when update task", async () => {
    const mockTaskService = {
      updateTask: vi.fn().mockRejectedValue(new Error("Error updating task")),
    };

    await expect(
      updateTask(
        mockTaskService as unknown as TaskService,
        mockTask.id,
        mockTask
      )
    ).rejects.toThrow("Error updating task");
  });
});
