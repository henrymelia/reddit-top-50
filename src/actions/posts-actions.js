import postsAdapter from "../adapters";

export const FETCH_POSTS_STARTED = "FETCH_POSTS_STARTED";
export const FETCH_POSTS_SUCCESS = "FETCH_POSTS_SUCCESS";
export const FETCH_POSTS_ERROR = "FETCH_POSTS_ERROR";
export const SELECT_POST = "SELECT_POST";
export const SET_READED_POST = "SET_READED_POST";
export const DISMISS_POST = "DISMISS_POST";
export const DISMISS_ALL_POSTS = "DISMISS_ALL_POSTS";

const fetchPostsStartedAction = () => ({
  type: FETCH_POSTS_STARTED,
});

const fetchPostsSuccessAction = (posts) => ({
  type: FETCH_POSTS_SUCCESS,
  payload: posts,
});

const fetchPostsErrorAction = (error) => ({
  type: FETCH_POSTS_ERROR,
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
  type: SELECT_POST,
  payload: post,
});

export const setReadedPost = (post) => ({
  type: SET_READED_POST,
  payload: post,
});

export const dismissPost = (post) => ({
  type: DISMISS_POST,
  payload: post,
});

export const dismissAllPosts = () => ({
  type: DISMISS_ALL_POSTS,
});
