import { removeTask } from "@/application/task/remove.useCase";
import { TaskService } from "@/services/taskService";
import "@testing-library/jest-dom";
import { describe, expect, it, vi } from "vitest";

describe("removeTask", () => {
  const mockId = 1;

  it("should return all tasks", async () => {
    const mockTaskService = {
      removeTask: vi.fn().mockResolvedValue({}),
    };

    const tasks = await removeTask(mockTaskService as unknown as TaskService, mockId);

    expect(mockTaskService.removeTask).toHaveBeenCalledTimes(1);
    expect(tasks).toEqual({});
  });

  it("should handle errror when remove task", async () => {
    const mockTaskService = {
      removeTask: vi
        .fn()
        .mockRejectedValue(new Error("Error removing task")),
    };

    await expect(
      removeTask(mockTaskService as unknown as TaskService, mockId)
    ).rejects.toThrow("Error removing task");
  });
});
