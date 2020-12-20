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
  selectedPost: null,
  readed: false,
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
        postList: action.payload,
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
