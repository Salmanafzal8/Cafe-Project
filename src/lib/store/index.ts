import { configureStore } from "@reduxjs/toolkit";
import barGameModalReducer from "./barGameModalSlice";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

export const store = configureStore({
  reducer: {
    barGameModal: barGameModalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const UseDispatch: () => AppDispatch = useDispatch;
export const UseSelector: TypedUseSelectorHook<RootState> = useSelector;

