import { NewTask, Task } from "@/domain/task/task";
import { TaskRepositoryInterface } from "@/ports/taskRepository";
import { TaskService } from "@/services/taskService";
import { describe, expect, it, vi } from "vitest";

describe("TaskService", () => {
  const mockRepository: TaskRepositoryInterface = {
    getAllTasks: vi.fn().mockResolvedValue([
      { id: 1, userId: 1, title: "Task 1", completed: false },
    ]),
    saveTask: vi.fn().mockResolvedValue({
      id: 2,
      userId: 1,
      title: "New Task",
      completed: false,
    }),
    removeTask: vi.fn().mockResolvedValue(undefined),
    updateTask: vi.fn().mockResolvedValue({
      id: 1,
      userId: 1,
      title: "Updated Task",
      completed: true,
    }),
  };

  const service = new TaskService(mockRepository);

  it("should get all tasks", async () => {
    const tasks = await service.getAllTasks();
    expect(tasks).toEqual([
      { id: 1, userId: 1, title: "Task 1", completed: false },
    ]);
  });

  it("should save a new task", async () => {
    const newTask: NewTask = { userId: 1, title: "New Task", completed: false };
    const savedTask = await service.saveTask(newTask);
    expect(savedTask).toEqual({ id: 2, ...newTask });
  });

  it("should remove a task by id", async () => {
    await expect(service.removeTask(1)).resolves.toBeUndefined();
  });

  it("should update an existing task", async () => {
    const updatedTask: Task = { id: 1, userId: 1, title: "Updated Task", completed: true };
    const result = await service.updateTask(1, updatedTask);
    expect(result).toEqual(updatedTask);
  });
});
