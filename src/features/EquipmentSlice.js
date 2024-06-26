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

export const deleteEquipment = createAsyncThunk(
  "Equipment/deleteApi",
  async (payload) => {
    try {
      const { accessToken } = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : "";
      const response = await axios.delete(
        `https://rigforce.az/api/v1/equipments/${payload}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      window.location = "/adminalshn001907/equipments";
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
export const createEquipment = createAsyncThunk(
  "Equipment/postApi",
  async (payload) => {
    const { accessToken } = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : "";
    const response = await axios
      .post(`https://rigforce.az/api/v1/equipments`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        toast.success("yaradıldı");
        window.location = "/adminalshn001907/equipments";
      })
      .catch((err) => {
        for (const property in err?.response?.data?.errors) {
          toast.error(property);
        }
        if (err.response.status === 401) {
          AuthService.refreshToken();
        }
        toast.error("yenidən cəhd edin!");
      });
    return response.data;
  }
);
export const equipmentFetch = createAsyncThunk(
  "Equipment/equipmentrFetch",
  async () => {
    const resp = await axios.get("https://rigforce.az/api/v1/equipments", {
      params: {
        pageNumber: 1,
        pageSize: 100,
      },
    });
    return resp?.data;
  }
);

const equipmentSlice = createSlice({
  name: "equipments",
  initialState,
  reducers: {},
  extraReducers: {
    [equipmentFetch.pending]: (state, action) => {
      state.status = "pending";
    },
    [equipmentFetch.fulfilled]: (state, action) => {
      state.status = "success";
      state.items = action.payload;
    },
    [equipmentFetch.rejected]: (state, action) => {
      state.status = "fail";
    },
  },
});
export const getAllEquipments = (state) => state.equipment.items;

export const getStatus = (state) => state.equipment.status;

export default equipmentSlice.reducer;
