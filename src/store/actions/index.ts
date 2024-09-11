import { fetchUserActivation, fetchToken } from "../../api/auth";
import { fetchUserInfo } from "../../api/user";
import { AppDispatch, AppStore } from '..';
import { NavigateFunction } from 'react-router-dom';
import { IPostQuery } from '../../typings/post';
import { IAuth } from '../../typings/auth';
import { ISignUp } from '../../typings/signUp';

export const CHANGE_THEME = "CHANGE_THEME";
export const POST_USER_DATA = "POST_USER_DATA";
export const RECEIVED_USER_DATA = "RECEIVED_USER_DATA";
export const RECEIVED_TOKEN = "RECEIVED_TOKEN";
export const REQUEST_POSTS = "REQUEST_POSTS";
export const RECEIVED_POSTS = "RECEIVED_POSTS";
export const SET_PAGE = 'SET_PAGE';
export const REQUEST_POST = "REQUEST_POST";
export const RECEIVED_POST = "RECEIVED_POST";
export const ADD_IMG = "ADD_IMG";
export const REMOVE_IMG = "REMOVE_IMG";
export const SET_SEARCH_VALUE = "SET_SEARCH_VALUE";
export const SORTED_ORDER = "SORTED_ORDER";

export const REQUEST_POST_ACTION = { type: REQUEST_POST };
export const CHANGE_THEME_ACTION = { type: CHANGE_THEME };
export const POST_USER_DATA_ACTION = { type: POST_USER_DATA };
export const REQUEST_POSTS_ACTION = { type: REQUEST_POSTS };
export const REMOVE_IMG_ACTION = { type: REMOVE_IMG };
export const setSortedOrder = (order: string) => ({
  type: SORTED_ORDER,
  payload: order,
});
export const addImgAction = (img: string) => ({ type: ADD_IMG, payload: img });
export const addUserDataAction = (user: unknown) => ({
  type: RECEIVED_USER_DATA,
  user,
});
export const setSearchValue = (value: string) => ({
  type: SET_SEARCH_VALUE,
  payload: value,
});
export const setPage = (page: number) => ({
  type: SET_PAGE,
  payload: page,
});
export const addPostsAction = (posts: unknown) => ({
  type: RECEIVED_POSTS,
  payload: posts,
});
export const addTokenAction = (payload: unknown) => ({ type: RECEIVED_TOKEN, payload });
export const addPostDetailsAction = (postDet: unknown) => ({
  type: RECEIVED_POST,
  payload: postDet,
});

//@ts-expect-error
export const addMiddlewareAction = (searchValue, order, limit, page) => {
  return (dispatch: AppDispatch) => {
    dispatch(REQUEST_POSTS_ACTION);
    const offset = (page - 1) * limit;
    const URL = `https://api.spaceflightnewsapi.net/v4/blogs/?limit=${limit}&offset=${offset}${searchValue ? `&title_contains=${searchValue}` : ""
      }${order ? `&ordering=${order}` : ""
      }`
    fetch(URL)
      .then((response) => response.json())
      .then(({ results, count }) => {
        dispatch(addPostsAction({ results, count }));
      })
      .catch((e) => console.log(e));
  };
};

export const postMiddlewareAction = (postId: number, navigate: NavigateFunction) => {
  return (dispatch: AppDispatch) => {
    dispatch(REQUEST_POST_ACTION);

    const URL = `https://api.spaceflightnewsapi.net/v4/blogs/${postId}/`;

    fetch(URL)
      .then((response) => response.json())
      .then((res) => {
        const currentPost = res;

        if (currentPost) {
          dispatch(addPostDetailsAction(currentPost));
        } else {
          navigate("/404");
        }
      })
      .catch((error) => console.error(error));
  };
};


export const signUpMiddlewareAction = (
  //@ts-expect-error
  { name, email, password, group },
  navigate: NavigateFunction
) => {
  return (dispatch: AppDispatch) => {
    dispatch(POST_USER_DATA_ACTION);

    const URL = "https://studapi.teachmeskills.by/auth/users/";

    fetch(URL, {
      method: "POST",
      body: JSON.stringify({
        username: name,
        email,
        password,
        course_group: group,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        dispatch(addUserDataAction(json));

        if (json.id) {
          navigate("/registrDone", { state: { email } });
        }
      });
  };
};

export const activationEmailMiddlewareAction = (uid: string, token: string) => {
  return (dispatch: AppDispatch) => {
    fetchUserActivation(uid, token);
  };
};


//@ts-expect-error
export const authorizationMiddlewareAction = (values, navigate: NavigateFunction) => {
  return (dispatch: AppDispatch) => {
    fetchToken(values).then((response) => {
      dispatch(addTokenAction(response))
      fetchUserInfo(navigate).then((response) =>
        dispatch(addUserDataAction(response))
      );
    });
  };
};


export const getUserInfoMiddlewareAction = (navigate: NavigateFunction) => {
  return (dispatch: AppDispatch) => {
    fetchUserInfo(navigate).then((response) =>
      dispatch(addUserDataAction(response))
    );
  };
};
