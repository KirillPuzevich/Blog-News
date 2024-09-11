import { AppStore } from "..";

export const getBlackTheme = (state: AppStore) => state.isBlackTheme;
export const getPage = (state: AppStore) => state.page;
export const getOrder = (state: AppStore) => state.order;
export const getCount = (state: AppStore) => state.posts.count;
export const getPostDetails = (state: AppStore) => state.postDet.content;
export const getImg = (state: AppStore) => state.img;
export const getPosts = (state: AppStore) => state.posts;
export const geSearchValue = (state: AppStore) => state.searchValue;