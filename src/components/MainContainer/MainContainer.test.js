import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";

import MainContainer from "./MainContainer";
import mockPost from "../../fixtures/post-fixture";

const mockOnShowSidebar = jest.fn();
const mockMarkPostAsReaded = jest.fn();

describe("MainContainer Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders", () => {
    const { getByText } = render(
      <MainContainer
        onShowSidebar={mockOnShowSidebar}
        markPostAsReaded={mockMarkPostAsReaded}
      />
    );

    expect(getByText("Show Posts").textContent).toBe("Show Posts");
    expect(getByText("👈 Pick a post").textContent).toBe("👈 Pick a post");
  });

  it("doesn't render the Show Posts button when isSidebarVisible is true", () => {
    const { queryByText } = render(
      <MainContainer
        isSidebarVisible
        onShowSidebar={() => {}}
        markPostAsReaded={() => {}}
      />
    );

    expect(queryByText("Show Posts")).toBeNull();
  });

  it("markPostAsReaded gets called when the post is displayed", async () => {
    render(
      <MainContainer
        post={mockPost}
        onShowSidebar={mockOnShowSidebar}
        markPostAsReaded={mockMarkPostAsReaded}
      />
    );

    await waitFor(() => {
      expect(mockMarkPostAsReaded).toHaveBeenCalledTimes(1);
    });
  });

  it("onShowSidebar gets called when the Show Posts button is clicked", () => {
    const { getByText } = render(
      <MainContainer
        onShowSidebar={mockOnShowSidebar}
        markPostAsReaded={mockMarkPostAsReaded}
      />
    );

    fireEvent.click(getByText("Show Posts"));

    expect(mockOnShowSidebar).toHaveBeenCalledTimes(1);
  });
});
