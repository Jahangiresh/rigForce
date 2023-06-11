import React, { useEffect, useReducer } from "react";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import AuthService from "../services/AuthService";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQ":
      return { ...state, loader: true };
    case "FETCH_SUCCES":
      return { ...state, partner: action.payload, loader: false };
    case "FETCH_FAIL":
      return { ...state, error: true };
    default:
      return state;
  }
};

const PartnersEdit = () => {
  const [{ loading, error, partner }, dispatch] = useReducer(reducer, {
    partner: {},
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
          `https://rigforce.az/api/v1/partners/${id}`
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
      urlLink: partner.urlLink,
      imageFile: partner.imageFile,
    },
    onSubmit: async (values) => {
      const { accessToken } = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : "";

      try {
        await axios.put(
          `https://rigforce.az/api/v1/partners/${id}`,
          {
            urlLink: values.urlLink,
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
        if (error.response.status === 401) {
          AuthService.refreshToken();
        }
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
            image
          </label>
          <input
            className="createadvocates__forms__input"
            id="image"
            name="imageFile"
            accept="image/*"
            type="file"
            onChange={(e) => {
              formik.setFieldValue("imageFile", e.currentTarget.files[0]);
            }}
          />
          <label className="createadvocates__forms__label" htmlFor="firstName">
            title{" "}
          </label>
          <input
            className="createadvocates__forms__input"
            id="title"
            name="urlLink"
            type="text"
            onChange={formik.handleChange}
            // value={formik.values.firstName}
            defaultValue={partner.urlLink}
          />

          <button className="createadvocates__forms__button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default PartnersEdit;
