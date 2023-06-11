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

export const deleteSetting = createAsyncThunk(
  "setting/deleteApi",
  async (payload) => {
    try {
      const response = await axios.delete(
        `https://rigforce.az/api/v1/settings/${payload}`,
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

export const createSetting = createAsyncThunk(
  "setting/postApi",
  async (payload) => {
    const response = await axios
      .post(`https://rigforce.az/api/v1/settings`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
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
export const settingFetch = createAsyncThunk(
  "setting/settingFetch",
  async () => {
    const resp = await axios.get("https://rigforce.az/api/v1/settings", {
      params: {
        pageNumber: 1,
        pageSize: 100,
      },
    });
    return resp?.data;
  }
);

const settingSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {},
  extraReducers: {
    [settingFetch.pending]: (state, action) => {
      state.status = "pending";
    },
    [settingFetch.fulfilled]: (state, action) => {
      state.status = "success";
      state.items = action.payload;
    },
    [settingFetch.rejected]: (state, action) => {
      state.status = "fail";
    },
  },
});
export const getAllSettings = (state) => state.settings.items;

export const getStatus = (state) => state.settings.status;

export default settingSlice.reducer;
