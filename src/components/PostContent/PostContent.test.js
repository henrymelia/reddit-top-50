import React from "react";
import { render } from "@testing-library/react";

import PostContent from "./PostContent";
import post from "../../fixtures/post-fixture";

const mockMarkAsReaded = jest.fn();
const mockedNowTime = new Date("29 Dec 2020 13:30:00 GMT").getTime();

describe("PostContent Component", () => {
  beforeAll(() => {
    Date.now = () => mockedNowTime;
  });

  it("renders when no post is passed via props", () => {
    const { getByText } = render(<PostContent />);

    expect(getByText("👈 Pick a post").textContent).toBe("👈 Pick a post");
  });

  it("renders when a post is passed via props", () => {
    const { getByText, getByAltText } = render(
      <PostContent post={post} markPostAsReaded={mockMarkAsReaded} />
    );

    expect(getByText(post.title).textContent).toBe(post.title);
    expect(getByText(`by ${post.author}`).textContent).toBe(
      `by ${post.author}`
    );
    expect(getByAltText(post.title).src).toBe(post.url);
    expect(getByText("6 days ago").textContent).toBe("6 days ago");
  });

  it("calls markPostAsReaded", () => {
    render(<PostContent post={post} markPostAsReaded={mockMarkAsReaded} />);

    expect(mockMarkAsReaded).toHaveBeenCalled();
  });
});
