import React, { useEffect, useReducer } from "react";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQ":
      return { ...state, loader: true };
    case "FETCH_SUCCES":
      return { ...state, slider: action.payload, loader: false };
    case "FETCH_FAIL":
      return { ...state, error: true };
    default:
      return state;
  }
};

const SlidersEdit = () => {
  const [{ loading, error, slider }, dispatch] = useReducer(reducer, {
    slider: {},
    loading: true,
    error: false,
  });
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    const getCategory = async () => {
      dispatch({ type: "FETCH_REQ" });

      try {
        const resp = await axios.get(
          `http://devserver298-001-site1.ctempurl.com/api/v1/sliders/${id}`
        );

        dispatch({ type: "FETCH_SUCCES", payload: resp.data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL" });
        alert("err");
      }
    };
    getCategory();
  }, []);

  const formik = useFormik({
    initialValues: {
      order: slider.order,
      imageFile: slider.imageFile,
    },
    onSubmit: async (values) => {
      const { accessToken } = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : "";

      try {
        await axios.put(
          `http://devserver298-001-site1.ctempurl.com/api/v1/sliders/${id}`,
          {
            order: values.order,
            imageFile: values.imageFile,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        toast.success(" updated");

        // window.location = "/admin/advocates";
      } catch (error) {
        toast.error(error.response.data.Detail);
      }
    },
  });
  return (
    <div>
      <div className="createadvocates">
        <div>
          <Toaster />
        </div>
        <form className="createadvocates__forms" onSubmit={formik.handleSubmit}>
          <label className="createadvocates__forms__label" htmlFor="image">
            shekil
          </label>
          <input
            className="createadvocates__forms__input"
            id="imageFile"
            name="imageFile"
            accept="image/*"
            type="file"
            onChange={(e) => {
              formik.setFieldValue("imageFile", e.currentTarget.files[0]);
            }}
          />{" "}
          <label className="createadvocates__forms__label" htmlFor="firstName">
            order
          </label>
          <input
            className="createadvocates__forms__input"
            id="title"
            name="order"
            type="text"
            onChange={formik.handleChange}
            // value={formik.values.firstName}
            defaultValue={slider.order}
          />{" "}
          <button className="createadvocates__forms__button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default SlidersEdit;
