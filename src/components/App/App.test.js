import React from "react";
import { render } from "@testing-library/react";

import App from "./App";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe("App Component", () => {
  it("renders", () => {
    const { getByText } = render(<App />);
    expect(getByText("Top Posts").textContent).toBe("Top Posts");
    expect(getByText("👈 Pick a post").textContent).toBe("👈 Pick a post");
  });
});
