import { NewTask, Task } from "@/domain/task/task";
import { TaskRepositoryInterface } from "@/ports/taskRepository";
import "@testing-library/jest-dom";
import { describe, expect, it, vi } from "vitest";

describe("TaskRepositoryInterface", () => {
  it("should get all tasks", async () => {
    const mockTasks: Task[] = [
      { id: 1, userId: 1, title: "Test Task 1", completed: false },
      { id: 2, userId: 2, title: "Test Task 2", completed: true },
    ];
    const repository: TaskRepositoryInterface = {
      getAllTasks: vi.fn().mockResolvedValue(mockTasks),
      saveTask: vi.fn(),
      removeTask: vi.fn(),
      updateTask: vi.fn(),
    };

    const tasks = await repository.getAllTasks();
    expect(tasks).toEqual(mockTasks);
  });

  it("should save a new task", async () => {
    const newTask: NewTask = {
      userId: 1,
      title: "New Test Task",
      completed: false,
    };
    const savedTask: Task = { id: 3, ...newTask };
    const repository: TaskRepositoryInterface = {
      getAllTasks: vi.fn(),
      saveTask: vi.fn().mockResolvedValue(savedTask),
      removeTask: vi.fn(),
      updateTask: vi.fn(),
    };

    const result = await repository.saveTask(newTask);
    expect(result).toEqual(savedTask);
  });

  it("should remove a task by id", async () => {
    const repository: TaskRepositoryInterface = {
      getAllTasks: vi.fn(),
      saveTask: vi.fn(),
      removeTask: vi.fn().mockResolvedValue(undefined),
      updateTask: vi.fn(),
    };

    await expect(repository.removeTask(1)).resolves.toBeUndefined();
  });

  it("should update an existing task", async () => {
    const updatedTask: Task = {
      id: 1,
      userId: 1,
      title: "Updated Task",
      completed: true,
    };
    const repository: TaskRepositoryInterface = {
      getAllTasks: vi.fn(),
      saveTask: vi.fn(),
      removeTask: vi.fn(),
      updateTask: vi.fn().mockResolvedValue(updatedTask),
    };

    const result = await repository.updateTask(1, updatedTask);
    expect(result).toEqual(updatedTask);
  });
});
