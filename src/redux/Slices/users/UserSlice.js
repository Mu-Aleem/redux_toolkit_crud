import { createSlice } from "@reduxjs/toolkit";
import {
  fetchData,
  addData,
  CreateDeleteData,
  UpdateUserByID,
} from "./UsersThunkAction";

export const STATUS = Object.freeze({
  IDEL: "idel",
  ERROR: "error",
  LOADING: "loading",
});

const initialState = {
  UserData: [],
  status: STATUS,
  updateData: [],
};

export const UserSlice = createSlice({
  name: "UserSlice",
  initialState,
  reducers: {
    SetTheUpdateData: (state, action) => {
      state.updateData = action.payload;
    },
  },
  extraReducers: {
    // Get the All Data from the API
    [fetchData.pending]: (state) => {
      state.status = STATUS.LOADING;
    },
    [fetchData.fulfilled]: (state, action) => {
      state.UserData = action.payload?.data?.data;
      state.status = STATUS.IDEL;
    },
    [fetchData.rejected]: (state) => {
      state.status = STATUS.ERROR;
    },
    // End

    // Add the Data

    [addData.pending]: (state) => {
      state.status = STATUS.LOADING;
    },
    [addData.fulfilled]: (state, action) => {
      state.UserData.unshift(action.payload.submitdata);
      state.status = STATUS.IDEL;
    },
    [addData.rejected]: (state) => {
      state.status = STATUS.ERROR;
    },
    // End

    // Delete the Data by its ID

    [CreateDeleteData.pending]: (state, action) => {
      state.status = STATUS.LOADING;
    },
    [CreateDeleteData.fulfilled]: (state, action) => {
      const returndata = state.UserData.filter((v) => v.id !== action.payload);
      state.UserData = returndata;
      state.status = STATUS.IDEL;
    },
    [CreateDeleteData.rejected]: (state) => {
      state.status = STATUS.ERROR;
    },

    // End

    // Updat the data

    [UpdateUserByID.pending]: (state) => {
      state.status = STATUS.LOADING;
    },

    [UpdateUserByID.fulfilled]: (state, action) => {
      const id = action.payload.data.id;
      const updatedDate = action.payload.data;
      const Index = state.UserData.findIndex((e) => e.id === id);
      state.UserData.splice(Index, 1, updatedDate);
      state.status = STATUS.IDEL;
    },
    [UpdateUserByID.rejected]: (state, action) => {
      state.status = STATUS.ERROR;
      // state.AirDropUpdate = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { SetTheUpdateData } = UserSlice.actions;

export default UserSlice.reducer;
