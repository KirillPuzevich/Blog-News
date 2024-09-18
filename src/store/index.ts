import { createStore, applyMiddleware } from "redux";
import { thunk } from 'redux-thunk'
import { reducer } from "./reducer";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";

const store = createStore<any, any>(reducer, applyMiddleware(thunk));

export default store;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export type AppStore = ReturnType<typeof store.getState>;


