import React from "react";
import { useFormik } from "formik";
import "../scss/adminadvocates.scss";
import { useDispatch } from "react-redux";
import { Toaster } from "react-hot-toast";
import { createCategory } from "../../features/categorySlice";
import { createPartner } from "../../features/partnerSlice";
import { createSetting } from "../../features/settingSlice";
const SettingCreate = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      key: "",
      value: "",
      file: "",
    },
    onSubmit: (values) => {
      var req = new FormData();
      req.append("key", values.key);
      req.append("value", values.value);
      req.append("file", values.file);
      dispatch(
        createSetting({
          key: req.get("key"),
          value: req.get("value"),
          file: req.get("file"),
        })
      );
    },
  });
  return (
    <div className="createadvocates">
      <div>
        <Toaster />
      </div>
      <form className="createadvocates__forms" onSubmit={formik.handleSubmit}>
        <label className="createadvocates__forms__label" htmlFor="image">
          şəkil
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
        />
        <label className="createadvocates__forms__label" htmlFor="name">
          açar söz
        </label>
        <input
          className="createadvocates__forms__input"
          id="key"

          name="key"
          type="text"
          onChange={formik.handleChange}
          defaultValue={formik.values.key}
        />
        <label className="createadvocates__forms__label" htmlFor="name">
          dəyər
        </label>
        <input
          className="createadvocates__forms__input"
          id="value"
          name="value"
          type="text"
          onChange={formik.handleChange}
          defaultValue={formik.values.value}
        />

        <button className="createadvocates__forms__button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SettingCreate;
