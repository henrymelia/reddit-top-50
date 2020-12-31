import React from "react";
import { fireEvent, render, waitFor, within } from "@testing-library/react";
import { Provider } from "react-redux";

import Layout from "./Layout";
import postsResponse from "../../fixtures/posts-response-fixture";
import { getStore } from "../../store";

let store;

describe("Layout Component", () => {
  beforeEach(() => {
    store = getStore();
  });

  it("renders", () => {
    const { getByText } = render(
      <Provider store={store}>
        <Layout />
      </Provider>
    );

    expect(getByText("✖️").textContent).toBe("✖️");
    expect(getByText("Refresh").textContent).toBe("Refresh");
    expect(getByText("Dismiss All").textContent).toBe("Dismiss All");
    expect(getByText("Top Posts").textContent).toBe("Top Posts");
    expect(getByText("Retrieving posts...").textContent).toBe(
      "Retrieving posts..."
    );
    expect(getByText("👈 Pick a post").textContent).toBe("👈 Pick a post");
  });

  it("displays the selected post", async () => {
    const mockPost = postsResponse.data.children[0].data;
    fetch.mockResponse(JSON.stringify(postsResponse));

    const { getAllByText, getByTitle } = render(
      <Provider store={store}>
        <Layout />
      </Provider>
    );

    let sidebarPost;
    await waitFor(() => {
      sidebarPost = getByTitle(mockPost.title);
      expect(sidebarPost).toBeTruthy();
    });

    fireEvent.click(sidebarPost);

    await waitFor(() => {
      expect(getAllByText(mockPost.title)).toHaveLength(2);
    });
  });

  it("dismisses the post when the dismiss button is clicked", async () => {
    const post = postsResponse.data.children[0].data;
    fetch.mockResponse(JSON.stringify(postsResponse));

    const { getAllByText, queryByText, getByTitle } = render(
      <Provider store={store}>
        <Layout />
      </Provider>
    );

    let dismissPostButton;
    await waitFor(() => {
      const postElement = getByTitle(post.title);
      dismissPostButton = postElement.querySelector("button");
      expect(dismissPostButton).toBeTruthy();
      expect(getAllByText("Dismiss")).toHaveLength(25);
    });

    fireEvent.click(dismissPostButton);

    await waitFor(() => {
      expect(getAllByText("Dismiss")).toHaveLength(24);
      expect(queryByText(post.title)).toBeNull();
    });
  });

  it("dismisses all the posts when Dismiss All button is clicked", async () => {
    fetch.mockResponse(JSON.stringify(postsResponse));

    const { getAllByText, queryAllByText, getByText } = render(
      <Provider store={store}>
        <Layout />
      </Provider>
    );

    let dismissAllButton;
    await waitFor(() => {
      dismissAllButton = getByText("Dismiss All");
      expect(getAllByText("Dismiss")).toHaveLength(25);
    });

    fireEvent.click(dismissAllButton);

    await waitFor(() => {
      expect(queryAllByText("Dismiss")).toHaveLength(0);
    });
  });

  it("refreshes the top posts when Refresh button is clicked", async () => {
    const firstPostList = postsResponse.data.children.slice(0, 10);
    const mockFirstResponse = {
      ...postsResponse,
      data: {
        ...postsResponse.data,
        children: firstPostList,
      },
    };
    fetch.mockResponse(JSON.stringify(mockFirstResponse));

    const { getByText, getAllByRole } = render(
      <Provider store={store}>
        <Layout />
      </Provider>
    );

    let refreshButton;
    await waitFor(() => {
      refreshButton = getByText("Refresh");
      expect(refreshButton).toBeTruthy();
    });

    let listItems;
    await waitFor(() => {
      listItems = getAllByRole("listitem");
      expect(listItems).toHaveLength(10);
    });

    listItems.forEach(async (item, index) => {
      const { getByText: getByTextWithinItem } = within(item);
      const { title } = firstPostList[index];
      await waitFor(() => {
        expect(getByTextWithinItem(title)).toBe(title);
      });
    });

    const refreshedPostList = postsResponse.data.children.slice(10, 20);
    const mockSecondResponse = {
      ...postsResponse,
      data: {
        ...postsResponse.data,
        children: refreshedPostList,
      },
    };
    fetch.mockResponse(JSON.stringify(mockSecondResponse));

    fireEvent.click(refreshButton);

    await waitFor(() => {
      listItems = getAllByRole("listitem");
      expect(listItems).toHaveLength(10);
    });

    listItems.forEach(async (item, index) => {
      const { getByText: getByTextWithinItem } = within(item);
      const { title } = firstPostList[index];
      await waitFor(() => {
        expect(getByTextWithinItem(title)).toBe(title);
      });
    });
  });

  it("when hide and show sidebar buttons are clicked the corresponding classes are added or removed", async () => {
    const { getByText, getByRole, getByLabelText } = render(
      <Provider store={store}>
        <Layout />
      </Provider>
    );

    fireEvent.click(getByText("✖️"));

    await waitFor(() => {
      expect(getByRole("complementary").className).toBe("sidebar is-collapsed");
      expect(getByLabelText("Main Content").className).toBe(
        "content is-full-width"
      );
    });

    fireEvent.click(getByText("Show Posts"));

    await waitFor(() => {
      expect(getByRole("complementary").className).toBe("sidebar");
      expect(getByLabelText("Main Content").className).toBe("content");
    });
  });
});
