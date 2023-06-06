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
      return { ...state, category: action.payload, loader: false };
    case "FETCH_FAIL":
      return { ...state, error: true };
    default:
      return state;
  }
};

const ServiceCategoriesEdit = () => {
  const [{ loading, error, category }, dispatch] = useReducer(reducer, {
    category: {},
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
          `http://devserver298-001-site1.ctempurl.com/api/v1/providedservicecategories/${id}`
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
      title: category.title,
      description: category.description,
      imageFile: category.imageFile,
    },
    onSubmit: async (values) => {
      const { accessToken } = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : "";

      try {
        await axios.put(
          `http://devserver298-001-site1.ctempurl.com/api/v1/providedservicecategories/${id}`,
          {
            title: values.title,
            description: values.description,
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
            name="title"
            type="text"
            onChange={formik.handleChange}
            // value={formik.values.firstName}
            defaultValue={category.title}
          />
          <label className="createadvocates__forms__label" htmlFor="email">
            description
          </label>
          <input
            className="createadvocates__forms__input"
            id="description"
            name="description"
            type="text"
            onChange={formik.handleChange}
            // value={formik.values.email}
            defaultValue={category.description}
          />{" "}
          <label
            className="createadvocates__forms__label"
            htmlFor="phoneNumber"
          >
            phoneNumber
          </label>
          <button className="createadvocates__forms__button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ServiceCategoriesEdit;
