import React from "react";
import { fireEvent, render, waitFor, within } from "@testing-library/react";
import { Provider } from "react-redux";

import Sidebar from "./Sidebar";
import postsResponse from "../../fixtures/posts-response-fixture";
import { getStore } from "../../store";

let store;

describe("Sidebar Component", () => {
  beforeEach(() => {
    store = getStore();
  });

  it("renders", () => {
    const { getByText } = render(
      <Provider store={store}>
        <Sidebar onHideSidebar={() => {}} />
      </Provider>
    );

    expect(getByText("Top Posts").textContent).toBe("Top Posts");
    expect(getByText("Retrieving posts...").textContent).toBe(
      "Retrieving posts..."
    );
    expect(getByText("Refresh").textContent).toBe("Refresh");
  });

  it("renders the full list of posts", async () => {
    fetch.mockResponse(JSON.stringify(postsResponse));
    const posts = postsResponse.data.children.map(({ data: post }) => post);

    const { getAllByRole } = render(
      <Provider store={store}>
        <Sidebar onHideSidebar={() => {}} />
      </Provider>
    );

    let listItems;
    await waitFor(() => {
      listItems = getAllByRole("listitem");
      expect(listItems).toHaveLength(25);
    });

    listItems.forEach((item, index) => {
      const { getByText } = within(item);
      const { title } = posts[index];
      waitFor(() => {
        expect(getByText(title)).toBe(title);
      });
    });
  });

  it("set the class selectedPost when a post gets clicked", async () => {
    fetch.mockResponse(JSON.stringify(postsResponse));

    const { getByTitle, getByTestId } = render(
      <Provider store={store}>
        <Sidebar onHideSidebar={() => {}} />
      </Provider>
    );

    let post;
    await waitFor(() => {
      post = getByTitle(
        "Man trying to return a dog's toy gets tricked into playing fetch"
      );
      expect(post).toBeTruthy();
    });

    fireEvent.click(post);

    await waitFor(() => {
      expect(getByTestId("t3_2hqlxp").className).toBe("selectedPost");
    });
  });
});
