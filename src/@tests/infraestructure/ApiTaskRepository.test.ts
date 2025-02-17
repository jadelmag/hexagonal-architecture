/* eslint-disable @typescript-eslint/no-explicit-any */
// import { ApiTaskRepository } from "@/infraestructure/taskRepository";
// import { HttpStatus } from "@/interfaces/status.code.interface";
// import axios from "axios";
// import { beforeEach, describe, expect, it, vi } from "vitest";

// vi.mock("axios");

// describe("ApiTaskRepository", () => {
//   let repository;

//   beforeEach(() => {
//     repository = new ApiTaskRepository();
//     vi.clearAllMocks();
//   });

//   describe("updateTask", () => {
//     it("should update a task successfully", async () => {
//       const updatedTask = { id: 1, title: "Updated Task", completed: true };
//       axios.put.mockResolvedValue({ status: HttpStatus.OK, data: updatedTask });

//       const result = await repository.updateTask(1, updatedTask);
//       expect(result).toEqual(updatedTask);
//     });

//     it("should throw an error when update fails", async () => {
//       axios.put.mockResolvedValue({ status: HttpStatus.BadRequest, data: {} });
//       await expect(repository.updateTask(1, { title: "Fail" })).rejects.toThrow("Failed to update task");
//     });
//   });
// });

import { NewTask, Task } from "@/domain/task/task";
import { ApiTaskRepository } from "@/infraestructure/ApiTaskRepository";
import { HttpStatus } from "@/interfaces/status.code.interface";
import "@testing-library/jest-dom";
import axios from "axios";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("axios");
const mockTasks: Task[] = [
  {
    id: 1,
    title: "Task 1",
    userId: 1,
    completed: false,
  },
  {
    id: 2,
    title: "Task 2",
    userId: 1,
    completed: false,
  },
];

describe("ApiTaskRepository", () => {
  let repository: ApiTaskRepository;

  beforeEach(() => {
    vi.clearAllMocks();
    repository = new ApiTaskRepository();
  });

  describe("getAllTasks", () => {
    it("should return tasks when API responds with valid data", async () => {
      vi.mocked(axios, true).get.mockResolvedValueOnce({
        data: mockTasks,
      });

      const result = await repository.getAllTasks();
      expect(result).toEqual(mockTasks);
      expect(axios.get).toHaveBeenCalledWith(
        "https://jsonplaceholder.typicode.com/todos"
      );
    });

    it("should return an empty array when API returns invalid data", async () => {
      vi.mocked(axios, true).get.mockResolvedValueOnce({
        data: null,
      });
      const result = await repository.getAllTasks();
      expect(result).toEqual([]);
    });

    it("should handle API errors and return an empty array", async () => {
      vi.mocked(axios, true).get.mockRejectedValueOnce(() =>
        Promise.resolve(new Error("API Error"))
      );

      const result = await repository.getAllTasks();
      expect(result).toEqual([]);
    });
  });

  describe("saveTask", () => {
    it("should save a task and return it when successful", async () => {
      const newTask: NewTask = {
        userId: 1,
        title: "New Task",
        completed: false,
      };
      const savedTask: Task = { id: 1, ...newTask };
      vi.mocked(axios, true).post.mockResolvedValueOnce({
        data: savedTask,
      });

      const result = await repository.saveTask(newTask);
      expect(result).toEqual(savedTask);
    });

    it("should throw an error when API does not return a 201 status", async () => {
      const newTask: NewTask = {
        userId: 1,
        title: "New Task",
        completed: false,
      };
      vi.mocked(axios, true).post.mockResolvedValue({
        data: {},
      });

      const result = await repository.saveTask(newTask);

      expect(result).toBeNull();
    });

    it("should handle API errors and return null", async () => {
      const newTask: NewTask = {
        userId: 1,
        title: "New Task",
        completed: false,
      };
      vi.mocked(axios, true).post.mockRejectedValueOnce(new Error("API Error"));

      const result = await repository.saveTask(newTask);

      expect(result).toBeNull();
    });
  });

  describe("removeTask", () => {
    it("should delete a task successfully", async () => {
      vi.mocked(axios, true).delete.mockResolvedValueOnce({
        status: HttpStatus.OK,
      });
      const result = await repository.removeTask(1);

      expect(result).toBeUndefined();
    });

    it("should delete a task successfully", async () => {
      vi.mocked(axios, true).delete.mockResolvedValueOnce({
        status: HttpStatus.Unauthorized,
      });
      const result = await repository.removeTask(1);

      expect(result).toBeUndefined();
    });

    it("should handle errors and log an error when deletion fails", async () => {
      vi.mocked(axios, true).delete.mockRejectedValueOnce(
        new Error("API Error")
      );

      const consoleErrorSpy = vi.spyOn(console, "error");

      const result = await repository.removeTask(1);

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Error deleting task with id 1"
      );
      expect(result).toBeUndefined();

      consoleErrorSpy.mockRestore();
    });
  });

  describe("updateTask", () => {
    it("should update a task successfully", async () => {
      const task: Task = {
        id: 1,
        userId: 1,
        title: "Updated Task",
        completed: false,
      };
      const updatedTask: Task = { ...task, completed: true };
      vi.mocked(axios, true).put.mockResolvedValueOnce({
        data: updatedTask,
      });

      const result = await repository.updateTask(task.id, task);
      expect(result).toEqual(updatedTask);
    });

    it("should fail an updated task", async () => {
      const task: Task = {
        id: 1,
        userId: 1,
        title: "Updated Task",
        completed: false,
      };
      vi.mocked(axios, true).put.mockResolvedValueOnce({
        data: null,
      });

      const result = await repository.updateTask(task.id, task);
      expect(result).toBeNull();
    });

    it("should handle API errors and return null", async () => {
      const task: Task = {
        id: 1,
        userId: 1,
        title: "New Task",
        completed: false,
      };
      vi.mocked(axios, true).put.mockRejectedValueOnce(new Error("API Error"));

      const result = await repository.updateTask(task.id, task);

      expect(result).toBeNull();
    });
  });
});
