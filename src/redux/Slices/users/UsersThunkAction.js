import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  GetData,
  ApiAddData,
  DeleteData,
  UpdateDataApi,
} from "../../../utils/api";

// get the data api request

export const fetchData = createAsyncThunk("fetchData", async () => {
  const ResponseData = await GetData();
  return ResponseData;
});

// Add the data request

export const addData = createAsyncThunk("addData", async (query) => {
  const data = await ApiAddData(query);
  const returnData = {
    submitdata: query,
    respostData: data?.data?.data,
    responseStatus: data?.success,
  };
  if (data.success) {
    return returnData;
  }
  return data;
});

// Delete the Data

// Delete the Data by id

export const CreateDeleteData = createAsyncThunk(
  "deleteuser",
  async (query) => {
    const res = await DeleteData(query);
    return query;
  }
);

// Update the data

export const UpdateUserByID = createAsyncThunk("Updareuser", async (query) => {
  const res = await UpdateDataApi(query);
  return res;
});
