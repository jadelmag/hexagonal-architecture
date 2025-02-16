import { generateNumberId } from "@/utils/generateId";
import "@testing-library/jest-dom";
import { describe, expect, it, vi } from "vitest";

describe("generateNumberId", () => {
  it("should generate an id", () => {
    const id = generateNumberId();
    expect(id).toBeGreaterThan(0);
  });
});

describe("generateNumberId with mock", () => {
  vi.mock("@/utils/generateId", () => ({
    generateNumberId: vi.fn(() => 20),
  }));

  it("should generate a unique id", () => {
    const id = generateNumberId();
    expect(id).toBe(20);
  });

  it("should generate a type number", () => {
    const id = generateNumberId();
    expect(typeof id).toBe("number");
  });
});
