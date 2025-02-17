import { getAllTasks } from "@/application/task/all.useCase";
import { removeTask } from "@/application/task/remove.useCase";
import { saveTask } from "@/application/task/save.useCase";
import { updateTask } from "@/application/task/update.useCase";
import { NewTask, Task } from "@/domain/task/task";
import { useTask } from "@/ui/hooks/useTasks";
import "@testing-library/jest-dom";
import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mockTasks: Task[] = [
  { id: 1, userId: 1, title: "Test Task", completed: false },
];
const newTask: NewTask = { userId: 1, title: "New Task", completed: false };
const createdTask: Task = {
  id: 1,
  userId: 1,
  title: "Test Task",
  completed: false,
};
const mockUpdatedTask = { ...createdTask, completed: true };

vi.mock("@/application/task/all.useCase", () => ({
  getAllTasks: vi.fn(async () => mockTasks),
}));
vi.mock("@/application/task/save.useCase", () => ({
  saveTask: vi.fn(async () => createdTask),
}));
vi.mock("@/application/task/remove.useCase", () => ({
  removeTask: vi.fn(async () => ({})),
}));
vi.mock("@/application/task/update.useCase", () => ({
  updateTask: vi.fn(async () => mockUpdatedTask),
}));

describe("useTask Hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch all tasks on mount", async () => {
    const { result } = renderHook(() => useTask());

    await act(async () => {
      await result.current.handleGetAllTasks();
    });

    expect(getAllTasks).toHaveBeenCalled();
    expect(result.current.tasks).toEqual(mockTasks);
  });

  it("should add a new task", async () => {
    const { result } = renderHook(() => useTask());
    const fakeForm = document.createElement("form");
    fakeForm.reset = vi.fn();

    await act(async () => {
      await result.current.handleCreateTask(newTask, fakeForm);
    });

    expect(saveTask).toHaveBeenCalledWith(expect.any(Object), newTask);
    expect(result.current.tasks).toContainEqual(createdTask);
  });

  it("should remove a task", async () => {
    const { result } = renderHook(() => useTask());

    await act(async () => {
      await result.current.handleRemoveTask(1);
    });

    expect(removeTask).toHaveBeenCalledWith(expect.any(Object), 1);
    expect(result.current.tasks).not.toContainEqual(mockTasks[0]);
  });

  it("should update a task", async () => {
    const { result } = renderHook(() => useTask());

    await act(async () => {
      await result.current.handleUpdateTask(createdTask);
    });

    expect(updateTask).toHaveBeenCalledWith(
      expect.any(Object),
      mockUpdatedTask.id,
      mockUpdatedTask
    );
  });
});
