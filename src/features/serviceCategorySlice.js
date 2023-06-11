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

export const createServiceCategory = createAsyncThunk(
  "serviceCategory/postApi",
  async (payload) => {
    const response = await axios
      .post(`https://rigforce.az/api/v1/providedservicecategories`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
        body: {
          pageNumber: 1,
          //     pageNumber: 10,
        },
      })
      .then((res) => {
        toast.success("yaradıldı");
        // window.location = "/adminalshn001907/branches";
      })
      .catch((err) => {
        if (err.response.status === 401) {
          AuthService.refreshToken();
        }
        toast.error("yenidən cəhd edin!");
      });
    return response.data;
  }
);
export const deleteServiceCategory = createAsyncThunk(
  "serviceCategory/deleteApi",
  async (payload) => {
    try {
      const response = await axios.delete(
        `https://rigforce.az/api/v1/providedservicecategories/${payload}`,
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
export const serviceCategoryFetch = createAsyncThunk(
  "serviceCategory/serviceCategoryFetch",
  async () => {
    try {
      const resp = await axios.get(
        "https://rigforce.az/api/v1/providedservicecategories",
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

const serviceCategorySlice = createSlice({
  name: "serviceCategories",
  initialState,
  reducers: {},
  extraReducers: {
    [serviceCategoryFetch.pending]: (state, action) => {
      state.status = "pending";
    },
    [serviceCategoryFetch.fulfilled]: (state, action) => {
      state.status = "success";
      state.items = action.payload;
    },
    [serviceCategoryFetch.rejected]: (state, action) => {
      state.status = "fail";
    },
  },
});
export const getAllServiceCategories = (state) => state.serviceCategories.items;

export const getStatus = (state) => state.serviceCategories.status;

export default serviceCategorySlice.reducer;
