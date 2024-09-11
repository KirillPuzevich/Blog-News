import { createStore, applyMiddleware } from "redux";
import { thunk } from 'redux-thunk'
import { reducer } from "./reducer";

const store = createStore<any, any>(reducer, applyMiddleware(thunk));

export default store;

export type AppStore = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

