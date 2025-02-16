import { generateNumberId } from "@/utils/generateId";
import "@testing-library/jest-dom";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/utils/generateId", () => ({
  generateNumberId: vi.fn(() => 20),
}));

describe("generateNumberId", () => {
  it("should generate a unique id", () => {
    const id = generateNumberId();
    expect(id).toBe(20);
  });

  it("should generate a type number", () => {
    const id = generateNumberId();
    expect(typeof id).toBe("number");
  });
});
