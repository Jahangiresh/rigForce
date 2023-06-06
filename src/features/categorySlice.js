import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";
import AuthService from "../admin/services/AuthService";
const initialState = {
  items: [],
  status: null,
};
const { accessToken } = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : "";

export const createCategory = createAsyncThunk(
  "category/postApi",
  async (payload) => {
    const response = await axios
      .post(
        `http://devserver298-001-site1.ctempurl.com/api/v1/equipmentcategories`,
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
          body: {
            pageNumber: 1,
            //     pageNumber: 10,
          },
        }
      )
      .then((res) => {
        toast.success("yaradıldı");
        // window.location = "/adminalshn001907/branches";
      })
      .catch(async (err) => {
        if (err.response.status === 401) {
          await AuthService.refreshToken();
        }
      });
    return response.data;
  }
);
export const deleteCategory = createAsyncThunk(
  "category/deleteApi",
  async (payload) => {
    try {
      const response = await axios.delete(
        `http://devserver298-001-site1.ctempurl.com/api/v1/equipmentcategories/${payload}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      // window.location = "/adminalshn001907/branches";
      toast.success("silindi");

      return response.data;
    } catch (error) {
      if (error.response.status === 401) {
        AuthService.refreshToken();
      }
      toast.error("yenidən cəhd edin!");
    }
  }
);
export const categoryFetch = createAsyncThunk(
  "category/categoryFetch",
  async () => {
    try {
      const resp = await axios.get(
        "http://devserver298-001-site1.ctempurl.com/api/v1/equipmentcategories",
        {
          params: {
            pageNumber: 1,
            pageSize: 100,
          },
        }
      );
      return resp.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
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
