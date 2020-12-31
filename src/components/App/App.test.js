import React from "react";
import { render } from "@testing-library/react";

import App from "./App";

describe("App Component", () => {
  it("renders", () => {
    const { getByText } = render(<App />);
    expect(getByText("Top Posts").textContent).toBe("Top Posts");
    expect(getByText("Retrieving posts...").textContent).toBe(
      "Retrieving posts..."
    );
    expect(getByText("👈 Pick a post").textContent).toBe("👈 Pick a post");
  });
});
