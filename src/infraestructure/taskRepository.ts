import {
  NewTask,
  Task,
  taskSchema,
  tasksResponseSchema,
} from "@/domain/task/task";
import { HttpStatus } from "@/interfaces/status.code.interface";
import { TaskRepositoryInterface } from "@/port/taskRepository";
import axios, { AxiosError, AxiosResponse } from "axios";

export class ApiTaskRepository implements TaskRepositoryInterface {
  private apiUrl: string = "https://jsonplaceholder.typicode.com/todos";

  private async handleError(error: AxiosError) {
    console.error("API Error:", error.response || error.message);
    throw new Error("An error occurred with the API");
  }

  async getAllTasks(): Promise<Task[]> {
    try {
      const tasks: AxiosResponse<Task[]> = await axios.get(this.apiUrl);
      const result = tasksResponseSchema.safeParse(tasks.data);

      if (result.success) {
        return result.data;
      } else {
        console.error(
          "Error fetching tasks: Invalid data structure",
          result.error.errors
        );
        return [];
      }
    } catch (error) {
      this.handleError(error as AxiosError);
      return [];
    }
  }

  async saveTask(task: NewTask): Promise<Task> {
    try {
      const newTask: AxiosResponse<Task> = await axios.post(this.apiUrl, task);
      const result = taskSchema.safeParse(newTask.data);

      if (newTask.status === HttpStatus.Created && result.success) {
        return result.data;
      } else {
        console.error("Error saving task: Unexpected status", newTask.status);
        throw new Error("Failed to save task");
      }
    } catch (error) {
      this.handleError(error as AxiosError);
      throw new Error("An error occurred while saving the task");
    }
  }

  async removeTask(id: number): Promise<void> {
    try {
      const response: AxiosResponse<void> = await axios.delete(
        `${this.apiUrl}/${id}`
      );

      if (response.status !== HttpStatus.OK) {
        console.error(
          "Error deleting task, unexpected status code:",
          response.status
        );
        throw new Error("Failed to delete task");
      }

      console.log(`Task with id ${id} deleted successfully.`);
    } catch (error) {
      this.handleError(error as AxiosError);
      throw new Error(`Error deleting task with id ${id}`);
    }
  }

  async updateTask(id: number, task: Task): Promise<Task> {
    try {
      const updatedTask: AxiosResponse<Task> = await axios.put(
        `${this.apiUrl}/${id}`,
        task
      );

      const result = taskSchema.safeParse(updatedTask.data);

      if (updatedTask.status === HttpStatus.OK && result.success) {
        return result.data;
      } else {
        console.error(
          "Error updating task: Unexpected status",
          updatedTask.status
        );
        throw new Error("Failed to update task");
      }
    } catch (error) {
      this.handleError(error as AxiosError);
      throw new Error(`Error updating task with id ${id}`);
    }
  }
}
