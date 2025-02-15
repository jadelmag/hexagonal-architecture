import { getAllTasks } from "@/application/task/all.useCase";
import { removeTask } from "@/application/task/remove.useCase";
import { saveTask } from "@/application/task/save.useCase";
import { updateTask } from "@/application/task/update.useCase";
import { NewTask, Task } from "@/domain/task/task";
import { TaskServiceFactory } from "@/services/taskServiceFactory";
import { useEffect, useState } from "react";

const taskService = TaskServiceFactory.create(true);

export const useTask = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleCreateTask = async (task: NewTask, currentForm: HTMLFormElement) => {
    const created: Task = await saveTask(taskService, task);
    setTasks([...tasks, created]);
    currentForm.reset();
  };

  const handleRemoveTask = async (id: number) => {
    await removeTask(taskService, id);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleUpdateTask = async (task: Task) => {
    const updatedTask: Task = { ...task, completed: !task.completed } as Task;
    const updated: Task = await updateTask(taskService, task.id, updatedTask );
    setTasks(tasks.map((t: Task) => (t.id === task.id ? updated : t)));
  };

  const handleGetAllTasks = async () => {
    const tasks: Task[] = await getAllTasks(taskService);
    setTasks(tasks);
  };

  useEffect(() => {
    handleGetAllTasks();
  }, []);

  return {
    handleCreateTask,
    tasks,
    handleRemoveTask,
    handleUpdateTask,
  };
};
