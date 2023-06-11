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

export const createContact = createAsyncThunk(
  "contact/postApi",
  async (payload) => {
    const response = await axios
      .post(`https://rigforce.az/api/v1/contactusforms`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
        body: {
          // pageNumber: 1,
          //     pageNumber: 10,
        },
      })
      .then((res) => {
        toast.success("sent");
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
export const deleteContact = createAsyncThunk(
  "contact/deleteApi",
  async (payload) => {
    try {
      const response = await axios.delete(
        `https://rigforce.az/api/v1/equipmentcategories/${payload}`,
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
export const contactFetch = createAsyncThunk(
  "contact/categoryFetch",
  async () => {
    try {
      const resp = await axios.get(
        "https://rigforce.az/api/v1/equipmentcategories",
        {
          params: {
            pageNumber: 1,
            pageSize: 100,
          },
        }
      );
      return resp.data;
    } catch (error) {
      if (error.response.status === 401) {
        AuthService.refreshToken();
      }
      console.error("Error fetching categories:", error);
      throw error;
    }
  }
);

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {},
  extraReducers: {
    [contactFetch.pending]: (state, action) => {
      state.status = "pending";
    },
    [contactFetch.fulfilled]: (state, action) => {
      state.status = "success";
      state.items = action.payload;
    },
    [contactFetch.rejected]: (state, action) => {
      state.status = "fail";
    },
  },
});
export const getAllContacts = (state) => state.categories.items;

export const getStatus = (state) => state.categories.status;

export default contactSlice.reducer;
