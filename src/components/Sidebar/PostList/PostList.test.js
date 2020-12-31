import React from "react";
import { render } from "@testing-library/react";

import PostList from "./PostList";

describe("PostList Component", () => {
  it("renders children", () => {
    const { getByText } = render(
      <PostList>
        <li>Fake text one</li>
        <li>Fake text two</li>
      </PostList>
    );

    expect(getByText("Fake text one").textContent).toBe("Fake text one");
    expect(getByText("Fake text two").textContent).toBe("Fake text two");
  });
});
