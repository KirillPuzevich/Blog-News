import {
  CHANGE_THEME,
  POST_USER_DATA,
  RECEIVED_USER_DATA,
  RECEIVED_TOKEN,
  RECEIVED_POSTS,
  REQUEST_POSTS,
  SET_PAGE,
  REQUEST_POST,
  RECEIVED_POST,
  ADD_IMG,
  REMOVE_IMG,
  SET_SEARCH_VALUE,
  SORTED_ORDER,
} from "../actions/index.ts";

const initialState = {
  isBlackTheme: false,
  user: {
    content: {},
    loading: false,
    loaded: false,
    errors: {},
  },
  token: null,
  posts: {
    content: [],
    count: 0,
    loading: false,
    loaded: false,
    error: null,
  },
  postDet: {
    content: [],
    loading: false,
    loaded: false,
  },
  page: 1,
  img: null,
  searchValue: "",
  order: "id",
};

export const reducer = (state = initialState, action) => {
  console.log(state);
  switch (action.type) {
    case CHANGE_THEME:
      return {
        ...state,
        isBlackTheme: !state.isBlackTheme,
      };

    case POST_USER_DATA:
      return {
        ...state,
        user: {
          ...state.user,
          loading: true,
        },
      };

    case RECEIVED_USER_DATA:
      const isError = !action.user?.id;

      return {
        ...state,
        user: {
          ...state.user,
          content: isError ? {} : action.user,
          loading: false,
          loaded: true,
          errors: isError ? action.user : {},
        },
      };

    case RECEIVED_TOKEN:
      return {
        ...state,
        token: action.payload,
      };

    case REQUEST_POSTS:
      return {
        ...state,
        posts: {
          ...state.posts,
          loading: true,
        },
      };

    case RECEIVED_POSTS:
      return {
        ...state,
        posts: {
          ...state.posts,
          content: action.payload.results,
          count: action.payload.count,
          loading: false,
          loaded: true,
        },
      };
    case SET_PAGE:
      return { ...state, page: action.payload };

    case REQUEST_POST:
      return {
        ...state,
        postDet: {
          ...state.postDet,
          loading: true,
        },
      };

    case RECEIVED_POST:
      return {
        ...state,
        postDet: {
          ...state.postDet,
          content: action.payload,
          loading: false,
          loaded: true,
        },
      };

    case ADD_IMG:
      return {
        ...state,
        img: action.payload,
      };
    case REMOVE_IMG:
      return {
        ...state,
        img: null,
      };

    case SET_SEARCH_VALUE:
      return { ...state, searchValue: action.payload };

    case SORTED_ORDER:
      return { ...state, order: action.payload };

    default:
      return state;
  }
};
