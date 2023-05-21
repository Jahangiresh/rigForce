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

export const createContact = createAsyncThunk(
  "contact/postApi",
  async (payload) => {
    const response = await axios
      .post(
        `http://devserver298-001-site1.ctempurl.com/api/v1/contactusforms`,
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
          body: {
            // pageNumber: 1,
            //     pageNumber: 10,
          },
        }
      )
      .then((res) => {
        console.log(res);
        toast.success("sent");
        // window.location = "/adminalshn001907/branches";
      })
      .catch((err) => {
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
      toast.error("yenidən cəhd edin!");
    }
  }
);
export const contactFetch = createAsyncThunk(
  "contact/categoryFetch",
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
      console.log("data", resp.data);
      return resp.data;
    } catch (error) {
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
