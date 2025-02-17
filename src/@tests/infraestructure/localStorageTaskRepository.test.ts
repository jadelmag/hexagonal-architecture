import { NewTask, Task } from "@/domain/task/task";
import { LocalStorageTaskRepository } from "@/infraestructure/localStorageTaskRepository";
import "@testing-library/jest-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";

describe("LocalStorageTaskRepository", () => {
  let repo: LocalStorageTaskRepository;

  beforeEach(() => {
    repo = new LocalStorageTaskRepository();
    vi.clearAllMocks();
  });

  it("should return an empty list when there are no tasks in localStorage", async () => {
    localStorage.getItem("tasks");

    const tasks = await repo.getAllTasks();

    expect(tasks).toEqual([]);
  });

  it("should return the list of tasks when there are tasks in localStorage", async () => {
    const mockTasks = [
      { id: 1, title: "Task 1", description: "Description 1" },
      { id: 2, title: "Task 2", description: "Description 2" },
    ];

    localStorage.setItem("tasks", JSON.stringify(mockTasks));

    const tasks = await repo.getAllTasks();

    expect(tasks).toEqual(mockTasks);
  });

  it("should save a task and return the task with an id", async () => {
    const newTask: NewTask = {
      title: "New Task",
      userId: 0,
      completed: false,
    };

    localStorage.getItem(JSON.stringify([]));

    const savedTask = await repo.saveTask(newTask);

    expect(savedTask).toEqual({
      ...newTask,
      id: savedTask.id,
    });
  });

  it("should remove a task and update localStorage", async () => {
    const mockTasks: Task[] = [
      {
        id: 1, title: "Task 1",
        userId: 0,
        completed: false
      },
      {
        id: 2, title: "Task 2",
        userId: 0,
        completed: false
      },
    ];
    localStorage.setItem("tasks", JSON.stringify(mockTasks));

    await repo.removeTask(1);

    const tasksStr: string | null = localStorage.getItem("tasks");
    expect(tasksStr).not.toBeNull();
    if (tasksStr !== null) {
      const tasks = JSON.parse(tasksStr);
      expect(tasks).toHaveLength(1);
    }
  });

  it("should update a task and modify localStorage", async () => {
    const mockTasks: Task[] = [
      {
        id: 1,
        title: "Task 1",
        userId: 0,
        completed: false,
      },
      {
        id: 2,
        title: "Task 2",
        userId: 0,
        completed: false,
      },
    ];
    localStorage.setItem("tasks", JSON.stringify(mockTasks));

    const updatedTask: Task = {...mockTasks[0], completed: true };

    const result: Task = await repo.updateTask(1, updatedTask);

    expect(result).toEqual(updatedTask);
  });
});
