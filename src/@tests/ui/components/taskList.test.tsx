import { Task } from "@/domain/task/task";
import TaskList from "@/ui/components/taskList";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

describe("TaskList", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const tasks: Task[] = [
    {
      id: 1,
      userId: 0,
      title: "Task 1",
      completed: false,
    },
    {
      id: 2,
      userId: 0,
      title: "Task 2",
      completed: true,
    },
  ];

  const onRemoveTaskSpy = vi.fn();
  const onUpdateTaskSpy = vi.fn();

  it("should render the list of tasks", () => {
    render(
      <TaskList
        tasks={tasks}
        onRemoveTask={onRemoveTaskSpy}
        onUpdateTask={onUpdateTaskSpy}
      />
    );

    const title1 = screen.getByText(/Task 1/i);
    const title2 = screen.getByText(/Task 2/i);

    expect(title1).toBeInTheDocument();
    expect(title2).toBeInTheDocument();
  });

  it("should call onUpdateTask when checkbox is clicked", async () => {
    render(
      <TaskList
        tasks={tasks}
        onRemoveTask={onRemoveTaskSpy}
        onUpdateTask={onUpdateTaskSpy}
      />
    );

    const checkbox = screen.getByRole("checkbox", { name: /Task 1/i });
    fireEvent.click(checkbox);

    expect(onUpdateTaskSpy).toHaveBeenCalled();
  });

  it("should call onRemoveTask when remove button is clicked", () => {
    render(
      <TaskList
        tasks={tasks}
        onRemoveTask={onRemoveTaskSpy}
        onUpdateTask={onUpdateTaskSpy}
      />
    );

    const removeButton = screen.getByRole("button", { name: /Task 1/i });
    fireEvent.click(removeButton);

    expect(onRemoveTaskSpy).toHaveBeenCalledWith(1);
  });

  it("should display tasks with correct background color based on completion", () => {
    render(
      <TaskList
        tasks={tasks}
        onRemoveTask={onRemoveTaskSpy}
        onUpdateTask={onUpdateTaskSpy}
      />
    );

    const task1 = screen.getByText("Task 1").closest("article");
    const task2 = screen.getByText("Task 2").closest("article");

    expect(task1).toHaveClass("bg-yellow-500");
    expect(task2).toHaveClass("bg-green-500");
  });

  it("should apply line-through to completed tasks", () => {
    render(
      <TaskList
        tasks={tasks}
        onRemoveTask={onRemoveTaskSpy}
        onUpdateTask={onUpdateTaskSpy}
      />
    );

    const task2 = screen.getByText("Task 2");

    expect(task2).toHaveClass("line-through"); // Verifica que "Task 2" tenga la clase line-through (tachado)
  });
});
