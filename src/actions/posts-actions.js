import postsAdapter from "../adapters";
import * as types from "./posts-actions-types";

const fetchPostsStartedAction = () => ({
  type: types.FETCH_POSTS_STARTED,
});

const fetchPostsSuccessAction = (posts) => ({
  type: types.FETCH_POSTS_SUCCESS,
  payload: posts,
});

const fetchPostsErrorAction = (error) => ({
  type: types.FETCH_POSTS_ERROR,
  payload: error,
});

export const fetchPosts = () => async (dispatch) => {
  dispatch(fetchPostsStartedAction());

  try {
    const res = await fetch(`https://www.reddit.com/top.json?limit=50`);
    const posts = await postsAdapter(res);
    dispatch(fetchPostsSuccessAction(posts));
  } catch (error) {
    dispatch(fetchPostsErrorAction(error.message));
  }
};

export const selectPost = (post) => ({
  type: types.SELECT_POST,
  payload: post,
});

export const setReadedPost = (post) => ({
  type: types.SET_READED_POST,
  payload: post,
});

export const dismissPost = (post) => ({
  type: types.DISMISS_POST,
  payload: post,
});

export const dismissAllPosts = () => ({
  type: types.DISMISS_ALL_POSTS,
});
