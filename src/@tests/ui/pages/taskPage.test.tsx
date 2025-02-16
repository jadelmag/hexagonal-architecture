import TaskPage from "@/ui/pages/taskPage";
import "@testing-library/jest-dom";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mockHandleCreateTask = vi.fn();
const mockHandleRemoveTask = vi.fn();
const mockHandleUpdateTask = vi.fn();

// Mock de useTask hook
vi.mock("@/ui/hooks/useTasks", () => ({
  useTask: vi.fn(() => ({
    tasks: [{ id: 1, userId: 1, title: "Test Task", completed: false }],
    handleCreateTask: mockHandleCreateTask,
    handleRemoveTask: mockHandleRemoveTask,
    handleUpdateTask: mockHandleUpdateTask,
  })),
}));

describe("TaskPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render the page with tasks", () => {
    render(<TaskPage />);

    const title = screen.getByRole("heading", { level: 1 });
    expect(title).toBeInTheDocument();

    const inputPlaceholder = screen.getByPlaceholderText("give me a task...");
    expect(inputPlaceholder).toBeInTheDocument();
    
    const taskItem = screen.getByText("Test Task");
    expect(taskItem).toBeInTheDocument();
  });

  it("should call handleCreateTask when submitting the form", async () => {
    render(<TaskPage />);

    const input = screen.getByPlaceholderText("give me a task...");
    const button = screen.getByText("Add Task");

    await act(async () => {
      fireEvent.change(input, { target: { value: "New Task" } });
      fireEvent.click(button);
    });

    expect(mockHandleCreateTask).toHaveBeenCalledWith(
      { userId: 1, title: "New Task", completed: false },
      expect.any(HTMLFormElement)
    );
  });

  it("should call handleRemoveTask when a task is deleted", async () => {
    render(<TaskPage />);

    const removeButton = screen.getByRole("button", { name: /Test Task/i });

    fireEvent.click(removeButton);

    expect(mockHandleRemoveTask).toHaveBeenCalledWith(1);
  });

  it("should call handleUpdateTask when a task is updated", async () => {
    render(<TaskPage />);

    const checkbox = screen.getByRole("checkbox", { name: /Test Task/i });

    fireEvent.click(checkbox);

    expect(mockHandleUpdateTask).toHaveBeenCalledWith({
      id: 1,
      userId: 1,
      title: "Test Task",
      completed: false,
    });
  });
});
