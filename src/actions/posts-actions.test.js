import * as actions from "./posts-actions";
import * as types from "./posts-actions-types";
import postsFixture from "../fixtures/posts-fixture";

const fakePost = {
  ...postsFixture[0],
};

describe("Action creators", () => {
  it("fetchPostsStartedAction", () => {
    const expectedAction = {
      type: types.FETCH_POSTS_STARTED,
    };
    expect(actions.fetchPostsStartedAction()).toEqual(expectedAction);
  });

  it("fetchPostsSuccessAction", () => {
    const expectedAction = {
      type: types.FETCH_POSTS_SUCCESS,
      payload: postsFixture,
    };
    expect(actions.fetchPostsSuccessAction(postsFixture)).toEqual(
      expectedAction
    );
  });

  // it("fetchPostsErrorAction", () => {
  //   const fakeError = "fake error text";
  //   const expectedAction = {
  //     type: types.FETCH_POSTS_ERROR,
  //     payload: fakeError,
  //   };
  //   expect(actions.fetchPostsError(fakeError)).toEqual(expectedAction);
  // });

  it("fetchPostsErrorAction", () => {
    const expectedAction = {
      type: types.SELECT_POST,
      payload: fakePost,
    };
    expect(actions.selectPost(fakePost)).toEqual(expectedAction);
  });

  it("setReadedPost", () => {
    const expectedAction = {
      type: types.SET_READED_POST,
      payload: fakePost,
    };
    expect(actions.setReadedPost(fakePost)).toEqual(expectedAction);
  });

  it("dismissPost", () => {
    const expectedAction = {
      type: types.DISMISS_POST,
      payload: fakePost,
    };
    expect(actions.dismissPost(fakePost)).toEqual(expectedAction);
  });

  it("dismissAllPosts", () => {
    const expectedAction = {
      type: types.DISMISS_ALL_POSTS,
    };
    expect(actions.dismissAllPosts()).toEqual(expectedAction);
  });
});

describe("Asynchronous actions", () => {
  it("fetchPosts", () => {});
});
