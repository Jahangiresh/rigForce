import React, { useEffect, useReducer } from "react";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { getAllServiceCategories } from "../../features/serviceCategorySlice";
import AuthService from "../services/AuthService";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQ":
      return { ...state, loader: true };
    case "FETCH_SUCCES":
      return { ...state, service: action.payload, loader: false };
    case "FETCH_FAIL":
      return { ...state, error: true };
    default:
      return state;
  }
};

const ServicesEdit = () => {
  const [{ loading, error, service }, dispatch] = useReducer(reducer, {
    service: {},
    loading: true,
    error: false,
  });
  const params = useParams();
  const id = params.id;
  const categories = useSelector(getAllServiceCategories);
  useEffect(() => {
    const getCategory = async () => {
      dispatch({ type: "FETCH_REQ" });

      try {
        const resp = await axios.get(
          `https://rigforce.az/api/v1/providedservices/${id}`
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
      title: service.title,
      description: service.description,
      iconImage: service.iconImage,
      detailImages: service.detailImages,
      providedServiceCategoryId: service.providedServiceCategoryId,
    },
    onSubmit: async (values) => {
      const { accessToken } = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : "";

      try {
        await axios.put(
          `https://rigforce.az/api/v1/providedservices/${id}`,
          {
            title: values.title,
            description: values.description,
            iconImage: values.iconImage,
            detailImages: values.detailImages,
            providedServiceCategoryId: values.providedServiceCategoryId,
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
            iconImage salam
          </label>
          <input
            className="createadvocates__forms__input"
            id="image"
            name="iconImage"
            accept="image/*"
            type="file"
            onChange={(e) => {
              formik.setFieldValue("iconImage", e.currentTarget.files[0]);
            }}
          />{" "}
          <label className="createadvocates__forms__label" htmlFor="image">
            image
          </label>
          <input
            className="createadvocates__forms__input"
            id="image"
            name="detailImages"
            accept="image/*"
            type="file"
            onChange={(e) => {
              formik.setFieldValue("detailImages", e.currentTarget.files[0]);
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
            defaultValue={service.title}
          />{" "}
          <label className="createadvocates__forms__label" htmlFor="firstName">
            description{" "}
          </label>
          <input
            className="createadvocates__forms__input"
            id="description"
            name="description"
            type="text"
            onChange={formik.handleChange}
            // value={formik.values.firstName}
            defaultValue={service.description}
          />
          <select
            className="createadvocates__forms__input"
            id="providedServiceCategoryId"
            name="providedServiceCategoryId"
            type="text"
            onChange={formik.handleChange}
            defaultValue={formik.values.providedServiceCategoryId}
          >
            {categories &&
              categories.map((c) => <option value={c.id}>{c.title}</option>)}
          </select>
          <button className="createadvocates__forms__button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ServicesEdit;
