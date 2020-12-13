import React from "react";
import { render } from "@testing-library/react";

import App from "./App";

describe("App Component", () => {
  it("renders", () => {
    const { getByText } = render(<App />);
    expect(getByText("Reddit Top 50").textContent).toBe("Reddit Top 50");
  });
});
