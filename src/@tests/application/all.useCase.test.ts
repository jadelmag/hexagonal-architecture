import { getAllTasks } from "@/application/task/all.useCase";
import { TaskService } from "@/services/taskService";
import "@testing-library/jest-dom";
import { describe, expect, it, vi } from "vitest";

describe("getAllTasks", () => {
  it("should return all tasks", async () => {
    const mockTaskService = {
      getAllTasks: vi.fn().mockResolvedValue([
        { id: 1, title: "Task 1", completed: false },
        { id: 2, title: "Task 2", completed: true },
      ]),
    };

    const tasks = await getAllTasks(mockTaskService as unknown as TaskService);

    expect(mockTaskService.getAllTasks).toHaveBeenCalledTimes(1);
    expect(tasks).toEqual([
      { id: 1, title: "Task 1", completed: false },
      { id: 2, title: "Task 2", completed: true },
    ]);
  });

  it("should handle errror when get all tasks", async () => {
    const mockTaskService = {
      getAllTasks: vi
        .fn()
        .mockRejectedValue(new Error("Error getting all tasks")),
    };

    await expect(
      getAllTasks(mockTaskService as unknown as TaskService)
    ).rejects.toThrow("Error getting all tasks");
  });
});
