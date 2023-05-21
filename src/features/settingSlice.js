import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";
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
      console.log("asdasd", payload);
      try {
        const response = await axios.delete(
          `http://devserver298-001-site1.ctempurl.com/api/v1/settings/${payload}`,
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
        toast.error("yenidən cəhd edin!");
      }
    }
  );

export const createSetting = createAsyncThunk(
  "setting/postApi",
  async (payload) => {
    const response = await axios
      .post(
        `http://devserver298-001-site1.ctempurl.com/api/v1/settings`,
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        toast.success("yaradıldı");
        // window.location = "/adminalshn001907/branches";
      })
      .catch((err) => {
        toast.error("yenidən cəhd edin!");
      });
    return response.data;
  }
);
export const settingFetch = createAsyncThunk(
  "setting/settingFetch",
  async () => {
    const resp = await axios.get(
      "http://devserver298-001-site1.ctempurl.com/api/v1/settings",
      {
        params: {
          pageNumber: 1,
          pageSize: 100,
        },
      }
    );
    console.log("data", resp);
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
