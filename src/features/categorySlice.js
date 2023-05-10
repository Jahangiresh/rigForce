import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  items: [],
  status: null,
};
const { accessToken } = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : "";
export const categoryFetch = createAsyncThunk(
  "category/categoryFetch",
  async () => {
    const resp = await axios.get(
      "https://devserver298-001-site1.ctempurl.com/api/v1/equipmentcategories",
      {
        body: {
          pageNumber: 1,
        },
      }
    );
    return resp?.data;
  }
);
const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: {
    [categoryFetch.pending]: (state, action) => {
      state.status = "pending";
    },
    [categoryFetch.fulfilled]: (state, action) => {
      state.status = "success";
      state.items = action.payload;
    },
    [categoryFetch.rejected]: (state, action) => {
      state.status = "fail";
    },
  },
});
export const getAllCategories = (state) => state.categories.items;

export const getStatus = (state) => state.categories.status;

export default categorySlice.reducer;
