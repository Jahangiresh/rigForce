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
      return { ...state, setting: action.payload, loader: false };
    case "FETCH_FAIL":
      return { ...state, error: true };
    default:
      return state;
  }
};

const SettingsEdit = () => {
  const [{ loading, error, setting }, dispatch] = useReducer(reducer, {
    setting: {},
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
          `https://rigforce.az/api/v1/settings/${id}`
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
      key: setting.key,
      value: setting.value,
      file: setting.file,
    },
    onSubmit: async (values) => {
      const { accessToken } = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : "";

      try {
        await axios.put(
          `https://rigforce.az/api/v1/settings/${id}`,
          {
            key: values.key,
            value: values.value,
            file: values.file,
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
            shekil
          </label>
          <input
            className="createadvocates__forms__input"
            id="image"
            name="file"
            accept="image/*"
            type="file"
            onChange={(e) => {
              formik.setFieldValue("file", e.currentTarget.files[0]);
            }}
          />{" "}
          <label className="createadvocates__forms__label" htmlFor="firstName">
            acar soz{" "}
          </label>
          <input
            className="createadvocates__forms__input"
            id="title"
            name="key"
            disabled
            type="text"
            onChange={formik.handleChange}
            // value={formik.values.firstName}
            defaultValue={setting.key}
          />{" "}
          <label className="createadvocates__forms__label" htmlFor="firstName">
            deyer{" "}
          </label>
          <input
            className="createadvocates__forms__input"
            id="value"
            name="value"
            type="text"
            onChange={formik.handleChange}
            // value={formik.values.firstName}
            defaultValue={setting.value}
          />
          <button className="createadvocates__forms__button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default SettingsEdit;
