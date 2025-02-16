import { App } from "@/App";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/ui/pages/taskPage", () => ({
  default: () => <div>Mocked TaskPage</div>, 
}));

describe("App", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render TaskPage component", () => {
    render(<App />);

    const taskPageElement = screen.getByText(/Mocked TaskPage/i);
    expect(taskPageElement).toBeInTheDocument();
  });
});
