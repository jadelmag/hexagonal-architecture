import {
  newTaskSchema,
  taskSchema,
  tasksResponseSchema,
} from "@/domain/task/task";
import "@testing-library/jest-dom";
import { describe, expect, it } from "vitest";

describe("taskSchema", () => {
  it("should validate a valid task", () => {
    const validTask = {
      id: 1,
      userId: 10,
      title: "Test task",
      completed: false,
    };

    expect(() => taskSchema.parse(validTask)).not.toThrow();
  });

  it("should fail with a negative id", () => {
    const invalidTask = {
      id: -1,
      userId: 10,
      title: "Invalid task",
      completed: false,
    };

    expect(() => taskSchema.parse(invalidTask)).toThrow();
  });

  it("should fail with a very short title", () => {
    const invalidTask = {
      id: 1,
      userId: 10,
      title: "a",
      completed: false,
    };

    expect(() => taskSchema.parse(invalidTask)).toThrow();
  });

  it("should fail if completed is not a boolean", () => {
    const invalidTask = {
      id: 1,
      userId: 10,
      title: "Valid task",
      completed: "false",
    };

    expect(() => taskSchema.parse(invalidTask)).toThrow();
  });
});

describe("newTaskSchema", () => {
  it("should validate a valid new task without id", () => {
    const validNewTask = {
      userId: 10,
      title: "New task",
      completed: true,
    };

    expect(() => newTaskSchema.parse(validNewTask)).not.toThrow();
  });
});

describe("tasksResponseSchema", () => {
  it("should validate a list of valid tasks", () => {
    const validTasks = [
      { id: 1, userId: 10, title: "Task 1", completed: true },
      { id: 2, userId: 20, title: "Task 2", completed: false },
    ];

    expect(() => tasksResponseSchema.parse(validTasks)).not.toThrow();
  });

  it("should fail if the list contains an invalid task", () => {
    const invalidTasks = [
      { id: 1, userId: 10, title: "Task 1", completed: true },
      { id: -2, userId: 20, title: "Ta", completed: false },
    ];

    expect(() => tasksResponseSchema.parse(invalidTasks)).toThrow();
  });
});
