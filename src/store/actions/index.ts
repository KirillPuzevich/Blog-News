import { fetchToken } from "../../api/auth";
import { fetchUserInfo } from "../../api/user";
import { AppDispatch, AppStore } from '..';
import { NavigateFunction } from 'react-router-dom';
import { IPostQuery } from '../../typings/post';
import { IAuth } from '../../typings/auth';
import { ISignUp } from '../../typings/signUp';
import { urlApi } from "../../serviceWorkerRegistration";

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
export const CLEAR_SEARCH_VALUE = "CLEAR_SEARCH_VALUE";
export const SET_CREATE_ERRORS = 'SET_CREATE_ERRORS';
export const LOADING_IMG = 'LOADING_IMG'
export const DELETE_POST = 'DELETE_POST_ACTION';
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';
export const REMOVE_FAVORITE_SUCCESS = 'REMOVE_FAVORITE_SUCCESS';

export const REQUEST_POST_ACTION = { type: REQUEST_POST };
export const DELETE_POST_ACTION = {type: DELETE_POST};
export const CHANGE_THEME_ACTION = { type: CHANGE_THEME };
export const POST_USER_DATA_ACTION = { type: POST_USER_DATA };
export const REQUEST_POSTS_ACTION = { type: REQUEST_POSTS };
export const REMOVE_IMG_ACTION = { type: REMOVE_IMG };

export const setDeletePostSuccess = (postId: number) => ({
  type: DELETE_POST_SUCCESS,
  payload: postId,
});

export const removeFavorite = (categoryId: string) => ({
  type: REMOVE_FAVORITE_SUCCESS, payload: categoryId,
});

export const setSortedOrder = (order: string) => ({
  type: SORTED_ORDER,
  payload: order,
});
export const loadingImage = (image: unknown) => ({
  type: LOADING_IMG,
  payload: image,
});
export const clearSearchValue = () => ({
  type: CLEAR_SEARCH_VALUE,
});
export const setCreateErrors = (createPostErrors:unknown) => ({
  type: SET_CREATE_ERRORS,
  payload: createPostErrors,
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


export const addMiddlewareAction = ({searchValue, order, limit, page}: IPostQuery, url:string) => {
  return (dispatch: AppDispatch) => {
    dispatch(REQUEST_POSTS_ACTION);
    const offset = (page - 1) * limit;

    // Формируем строку запроса
    const query = `?limit=${limit}&offset=${offset}${searchValue ? `&search=${searchValue}` : ""}${order ? `&ordering=${order}` : ""}`;
    const fullURL = `${url}${query}`;

    fetch(fullURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(({result, count}) => { // Обратите внимание на 'result' вместо 'results'
        dispatch(addPostsAction({ results: result, count })); // Здесь мы передаем результат
      })
      .catch((e) => console.log(e));
  };
};


export const postMiddlewareAction = (postId: number, navigate: NavigateFunction, url:string) => {
  return (dispatch: AppDispatch) => {
    dispatch(REQUEST_POST_ACTION);

    const URL = `${url}/${postId}`;

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

export const deletePostAction = (postId: number, navigate: NavigateFunction, url: string, nav: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(DELETE_POST_ACTION);
      await fetch(`${url}/${postId}`, {
        method: 'DELETE',
      });
      dispatch(setDeletePostSuccess(postId));
      dispatch(REQUEST_POSTS_ACTION);
      navigate(nav);
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };
};

export const signUpMiddlewareAction = (
  { username, email, password }: ISignUp,
  navigate: NavigateFunction
) => {
  return (dispatch: AppDispatch) => {
    dispatch(POST_USER_DATA_ACTION);

    const URL = `${urlApi}auth/registration`;

    fetch(URL, {
      method: "POST",
      body: JSON.stringify({
        username,
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            throw new Error(errorData.message || "Registration failed");
          });
        }
        return response.json();
      })
      .then((json) => {
        console.log("Response from server:", json);
        dispatch(addUserDataAction(json));

        // Проверяем наличие id в ответе
        if (json) {
          navigate("/login"); // Измените на нужный вам путь
        }
      })
      .catch((error) => {
        console.error("Registration error:", error);
        // Обработка ошибок, например, показать сообщение пользователю
      });
  };
};

export const authorizationMiddlewareAction = (values: IAuth, navigate: NavigateFunction, setRequestStatus: (status: number) => void) => {
  return async (dispatch: AppDispatch) => {
    const response = await fetchToken(values);
    
    if (response.status === 200) { 
      dispatch(addTokenAction(response));
      const userInfo = await fetchUserInfo(navigate);
      dispatch(addUserDataAction(userInfo));
      setRequestStatus(200); 
    } else {
      setRequestStatus(response.status);
    }
  };
};



export const getUserInfoMiddlewareAction = (navigate: NavigateFunction) => {
  return async (dispatch: AppDispatch) => {
    const response = await fetchUserInfo(navigate);
    if (response) {
      dispatch(addUserDataAction(response));
    }
  };
};

// actions.js
export const removeFavoriteAction = (categoryId: string) => {
  return async (dispatch: AppDispatch) => {
    const response = await fetch(`${urlApi}api/me/favorites`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({ categoryId: categoryId.toString() }),
    });

    if (response.ok) {
      dispatch(removeFavorite(categoryId));
      return true; // Возвращаем результат
    } else {
      console.error("Ошибка при удалении категории из избранного");
      return false; // Возвращаем результат в случае ошибки
    }
  };
};
