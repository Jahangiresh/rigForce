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
export const deleteService = createAsyncThunk(
  "Services/deleteApi",
  async (payload) => {
    console.log("asdasd", payload);
    try {
      const response = await axios.delete(
        `http://devserver298-001-site1.ctempurl.com/api/v1/providedservices/${payload}`,
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
export const createService = createAsyncThunk(
  "Services/createService", // Fix: Use a unique action type
  async (payload) => {
    const response = await axios
      .post(
        "http://devserver298-001-site1.ctempurl.com/api/v1/providedservices",
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

export const ServiceFetch = createAsyncThunk(
  "Services/categoryFetch", // Fix: Use a unique action type
  async () => {
    const resp = await axios.get(
      "http://devserver298-001-site1.ctempurl.com/api/v1/providedservices",
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

const serviceSlice = createSlice({
  name: "services",
  initialState,
  reducers: {},
  extraReducers: {
    [ServiceFetch.pending]: (state, action) => {
      state.status = "pending";
    },
    [ServiceFetch.fulfilled]: (state, action) => {
      state.status = "success";
      state.items = action.payload;
    },
    [ServiceFetch.rejected]: (state, action) => {
      state.status = "fail";
    },
  },
});

export const getAllServices = (state) => state.services.items;
export const getStatus = (state) => state.services.status;

export default serviceSlice.reducer;
