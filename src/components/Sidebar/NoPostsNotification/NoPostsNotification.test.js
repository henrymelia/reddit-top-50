import React from "react";
import { fireEvent, render } from "@testing-library/react";

import NoPostsNotification from "./NoPostsNotification";

const mockOnPostsRefresh = jest.fn();

describe("NoPostsNotification Component", () => {
  it("renders", () => {
    const { getByText, getByRole } = render(
      <NoPostsNotification onPostsRefresh={mockOnPostsRefresh} />
    );

    expect(getByText("No posts to show.").textContent).toBe(
      "No posts to show."
    );
    expect(getByRole("button").textContent).toBe("Check Updates");
  });

  it("calls onPostsRefresh when the primary button is clicked", () => {
    const { getByRole } = render(
      <NoPostsNotification onPostsRefresh={mockOnPostsRefresh} />
    );

    fireEvent.click(getByRole("button"));
    fireEvent.click(getByRole("button"));

    expect(mockOnPostsRefresh).toHaveBeenCalledTimes(2);
  });
});
