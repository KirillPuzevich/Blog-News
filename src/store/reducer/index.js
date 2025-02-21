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
  CLEAR_SEARCH_VALUE,
  SET_CREATE_ERRORS,
  LOADING_IMG,
  DELETE_POST_ACTION,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE,
  REMOVE_FAVORITE_SUCCESS,
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
    content: {},
    loading: false,
    loaded: false,
  },
  page: 1,
  img: null,
  searchValue: "",
  order: "id",
  createPostErrors: {
    errors: {},
  },
  image: [],
  deleting: false,
  deleteError: null,
  favorites: [],
};

export const reducer = (state = initialState, action) => {
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

    case CLEAR_SEARCH_VALUE:
      return { ...state, searchValue: '' };

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

    case SET_CREATE_ERRORS:
      return {
        ...state,
        createPostErrors: {
          errors: action.payload,
        },
      };

    case LOADING_IMG:
      return { ...state, image: action.payload };

    case DELETE_POST_ACTION:
      return {
        ...state,
        deleting: true,
        deleteError: null,
      };

    case DELETE_POST_SUCCESS:
      return {
        ...state,
        deleting: false,
        posts: {
          ...state.posts,
          content: state.posts.content.filter((post) => post.id !== action.payload),
        },
      };
      case REMOVE_FAVORITE_SUCCESS:
      return {
        ...state,
        favorites: state.favorites.filter(fav => fav.id !== action.payload)
      };
    default:
      return state;
  }
};