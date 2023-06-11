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
export const deletePartner = createAsyncThunk(
  "partners/deleteApi",
  async (payload) => {
    try {
      const response = await axios.delete(
        `https://rigforce.az/api/v1/partners/${payload}`,
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
export const createPartner = createAsyncThunk(
  "partners/createPartner", // Fix: Use a unique action type
  async (payload) => {
    const response = await axios
      .post("https://rigforce.az/api/v1/partners", payload, {
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

export const PartnerFetch = createAsyncThunk(
  "partners/categoryFetch", // Fix: Use a unique action type
  async () => {
    const resp = await axios.get("https://rigforce.az/api/v1/partners", {
      params: {
        pageNumber: 1,
        pageSize: 100,
      },
    });
    return resp?.data;
  }
);

const partnerSlice = createSlice({
  name: "partners",
  initialState,
  reducers: {},
  extraReducers: {
    [PartnerFetch.pending]: (state, action) => {
      state.status = "pending";
    },
    [PartnerFetch.fulfilled]: (state, action) => {
      state.status = "success";
      state.items = action.payload;
    },
    [PartnerFetch.rejected]: (state, action) => {
      state.status = "fail";
    },
  },
});

export const getAllPartners = (state) => state.partners.items;
export const getStatus = (state) => state.partners.status;

export default partnerSlice.reducer;
