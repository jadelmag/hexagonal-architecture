/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  NewTask,
  Task,
  taskSchema,
  tasksResponseSchema,
} from "@/domain/task/task";
import { HttpStatus } from "@/interfaces/status.code.interface";
import { TaskRepositoryInterface } from "@/ports/taskRepository";
import axios, { AxiosError, AxiosResponse } from "axios";

export class ApiTaskRepository implements TaskRepositoryInterface {
  private apiUrl: string = "https://jsonplaceholder.typicode.com/todos";

  private async handleError(error: AxiosError, customMessage: string = "") {
    console.error("API Error:", error.response || error.message);
    console.error(customMessage || "An error occurred with the API");
  }

  private validateResponse<T>(
    response: AxiosResponse<T>,
    schema: any
  ): T | null {
    const result = schema.safeParse(response.data);
    if (result.success) {
      return result.data;
    } else {
      console.error("Validation failed:", result.error.errors);
      return null;
    }
  }

  async getAllTasks(): Promise<Task[]> {
    try {
      const response: AxiosResponse<Task[]> = await axios.get(this.apiUrl);
      const tasks = this.validateResponse(response, tasksResponseSchema);

      if (tasks) {
        return tasks;
      } else {
        return [];
      }
    } catch (error) {
      this.handleError(error as AxiosError, "Failed to fetch tasks");
      return [];
    }
  }

  async saveTask(task: NewTask): Promise<Task | null> {
    try {
      const response: AxiosResponse<Task> = await axios.post(this.apiUrl, task);
      const newTask = this.validateResponse(response, taskSchema);

      if (newTask) {
        return newTask;
      } else {
        console.error("Failed to save task");
        return null;
      }
    } catch (error) {
      this.handleError(
        error as AxiosError,
        "An error occurred while saving the task"
      );
      return null;
    }
  }

  async removeTask(id: number): Promise<void> {
    try {
      const response: AxiosResponse<void> = await axios.delete(
        `${this.apiUrl}/${id}`
      );

      if (response.status === HttpStatus.OK) {
        console.log(`Task with id ${id} deleted successfully.`);
      } else {
        console.error("Failed to delete task");
      }
    } catch (error) {
      this.handleError(
        error as AxiosError,
        `Error deleting task with id ${id}`
      );
    }
  }

  async updateTask(id: number, task: Task): Promise<Task | null> {
    try {
      const response: AxiosResponse<Task> = await axios.put(
        `${this.apiUrl}/${id}`,
        task
      );
      const updatedTask = this.validateResponse(response, taskSchema);

      if (updatedTask) {
        return updatedTask;
      } else {
        console.error("Failed to update task");
        return null;
      }
    } catch (error) {
      this.handleError(
        error as AxiosError,
        `Error updating task with id ${id}`
      );
      console.error("Failed to update task");
      return null;
    }
  }
}
