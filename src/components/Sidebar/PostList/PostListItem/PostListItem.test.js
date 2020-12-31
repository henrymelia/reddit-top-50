import React from "react";
import { fireEvent, render } from "@testing-library/react";

import PostListItem from "./PostListItem";
import mockPost from "../../../../fixtures/post-fixture";

const mockOnPostSelect = jest.fn();
const mockOnPostDismiss = jest.fn();

describe("PostListItem Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders", () => {
    const { getByText, getByAltText, getByTitle } = render(
      <PostListItem
        post={mockPost}
        onPostSelect={mockOnPostSelect}
        onPostDismiss={mockOnPostDismiss}
      />
    );

    expect(getByTitle(mockPost.title).getAttribute("role")).toBe("button");
    expect(getByText(mockPost.title).textContent).toBe(mockPost.title);
    expect(getByText(`by ${mockPost.author}`).textContent).toBe(
      `by ${mockPost.author}`
    );
    expect(getByText(`${mockPost.commentCount} comments`).textContent).toBe(
      `${mockPost.commentCount} comments`
    );
    expect(getByText("Dismiss").textContent).toBe("Dismiss");
    expect(getByAltText(mockPost.title).src).toBe(mockPost.thumbnail);
  });

  it("calls onPostSelect when the element gets clicked", () => {
    const { getByTitle } = render(
      <PostListItem
        post={mockPost}
        onPostSelect={mockOnPostSelect}
        onPostDismiss={mockOnPostDismiss}
      />
    );

    fireEvent.click(getByTitle(mockPost.title));

    expect(mockOnPostSelect).toHaveBeenCalled();
  });

  it("calls onPostDismiss when the dismiss button gets clicked", () => {
    const { getByText } = render(
      <PostListItem
        post={mockPost}
        onPostSelect={mockOnPostSelect}
        onPostDismiss={mockOnPostDismiss}
      />
    );

    fireEvent.click(getByText("Dismiss"));
    fireEvent.click(getByText("Dismiss"));

    expect(mockOnPostDismiss).toHaveBeenCalledTimes(2);
    expect(mockOnPostSelect).not.toHaveBeenCalled();
  });
});
