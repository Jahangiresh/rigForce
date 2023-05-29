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

export const deleteSlider = createAsyncThunk(
  "slider/deleteApi",
  async (payload) => {
    try {
      const response = await axios.delete(
        `http://devserver298-001-site1.ctempurl.com/api/v1/sliders/${payload}`,
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
export const createSlider = createAsyncThunk(
  "slider/postApi",
  async (payload) => {
    const response = await axios
      .post(
        `http://devserver298-001-site1.ctempurl.com/api/v1/sliders`,
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        toast.success("yaradıldı");
        // window.location = "/adminalshn001907/branches";
      })
      .catch((err) => {
        toast.error("yenidən cəhd edin!");
      });
    return response.data;
  }
);
export const sliderFetch = createAsyncThunk("slider/sliderFetch", async () => {
  const resp = await axios.get(
    "http://devserver298-001-site1.ctempurl.com/api/v1/sliders",
    {
      params: {
        pageNumber: 1,
        pageSize: 100,
      },
    }
  );
  return resp?.data;
});

const sliderSlice = createSlice({
  name: "sliders",
  initialState,
  reducers: {},
  extraReducers: {
    [sliderFetch.pending]: (state, action) => {
      state.status = "pending";
    },
    [sliderFetch.fulfilled]: (state, action) => {
      state.status = "success";
      state.items = action.payload;
    },
    [sliderFetch.rejected]: (state, action) => {
      state.status = "fail";
    },
  },
});
export const getAllSliders = (state) => state.slider.items;

export const getStatus = (state) => state.slider.status;

export default sliderSlice.reducer;
