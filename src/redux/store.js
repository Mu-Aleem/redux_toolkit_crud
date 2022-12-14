import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import UserSlice from "./Slices/users/UserSlice";

const reducer = combineReducers({
  user: UserSlice,
});
export const store = configureStore({
  reducer,
});
