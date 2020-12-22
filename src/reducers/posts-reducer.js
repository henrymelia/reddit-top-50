import {
  FETCH_POSTS_STARTED,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_ERROR,
  SELECT_POST,
  DISMISS_POST,
  SET_READED_POST,
  DISMISS_ALL_POSTS,
} from "../actions/posts-actions";

const initialState = {
  dismissedIdList: [],
  postList: [],
  pending: false,
  error: null,
  readedIdList: [],
  selectedPost: null,
};

const filterDismissed = (posts, dismissedPostIds) => {
  const dismissedPostsSet = new Set(dismissedPostIds);
  return posts.filter(({ id }) => !dismissedPostsSet.has(id));
};

const markReaded = (posts, readedPostIds) => {
  const readedPostsSet = new Set(readedPostIds);
  return posts.map((post) => ({
    ...post,
    readed: readedPostsSet.has(post.id),
  }));
};

const getReadedAndDismissedCleaned = (
  posts,
  readedPostIds,
  dismissedPostIds
) => {
  const postsSet = new Set(posts.map(({ id }) => id));
  const predicate = (id) => postsSet.has(id);
  return {
    readedIdList: readedPostIds.filter(predicate),
    dismissedIdList: dismissedPostIds.filter(predicate),
  };
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS_STARTED:
      return {
        ...state,
        pending: true,
      };
    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        pending: false,
        postList: markReaded(
          filterDismissed(action.payload, state.dismissedIdList),
          state.readedIdList
        ),
        ...getReadedAndDismissedCleaned(
          action.payload,
          state.readedIdList,
          state.dismissedIdList
        ),
      };
    case FETCH_POSTS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case SELECT_POST:
      return {
        ...state,
        selectedPost: action.payload,
      };
    case DISMISS_POST:
      return {
        ...state,
        dismissedIdList: [...state.dismissedIdList, action.payload.id],
        selectedPost:
          state?.selectedPost?.id === action.payload.id
            ? null
            : state.selectedPost,
        postList: state.postList.filter(
          (post) => post.id !== action.payload.id
        ),
      };
    case SET_READED_POST:
      return {
        ...state,
        postList: state.postList.map((post) =>
          post.id === action.payload.id ? { ...post, readed: true } : post
        ),
        readedIdList: [...state.readedIdList, action.payload.id],
      };
    case DISMISS_ALL_POSTS:
      return {
        ...state,
        postList: [],
        selectedPost: null,
        dismissedIdList: [
          ...state.dismissedIdList,
          ...state.postList.map(({ id }) => id),
        ],
      };
    default:
      return state;
  }
};

export default postsReducer;
