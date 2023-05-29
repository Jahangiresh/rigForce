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

export const deleteEquipment = createAsyncThunk(
  "Equipment/deleteApi",
  async (payload) => {
    try {
      const response = await axios.delete(
        `http://devserver298-001-site1.ctempurl.com/api/v1/equipments/${payload}`,
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
export const createEquipment = createAsyncThunk(
  "Equipment/postApi",
  async (payload) => {
    const response = await axios
      .post(
        `http://devserver298-001-site1.ctempurl.com/api/v1/equipments`,
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
export const equipmentFetch = createAsyncThunk(
  "Equipment/equipmentrFetch",
  async () => {
    const resp = await axios.get(
      "http://devserver298-001-site1.ctempurl.com/api/v1/equipments",
      {
        params: {
          pageNumber: 1,
          pageSize: 100,
        },
      }
    );
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
