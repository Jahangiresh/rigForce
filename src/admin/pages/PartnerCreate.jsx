import React from "react";
import { useFormik } from "formik";
import "../scss/adminadvocates.scss";
import { useDispatch } from "react-redux";
import { Toaster } from "react-hot-toast";
import { createCategory } from "../../features/categorySlice";
import { createPartner } from "../../features/partnerSlice";
const PartnerCreate = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      urlLink: "",
      imageFile: "",
    },
    onSubmit: (values) => {
      console.log("val", values);
      var req = new FormData();
      req.append("urlLink", values.urlLink);
      req.append("imageFile", values.imageFile);
      dispatch(
        createPartner({
          urlLink: req.get("urlLink"),
          imageFile: req.get("imageFile"),
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
          name="imageFile"
          accept="image/*"
          type="file"
          onChange={(e) => {
            formik.setFieldValue("imageFile", e.currentTarget.files[0]);
          }}
        />
        <label className="createadvocates__forms__label" htmlFor="name">
          url
        </label>
        <input
          className="createadvocates__forms__input"
          id="urlLink"
          name="urlLink"
          type="text"
          onChange={formik.handleChange}
          defaultValue={formik.values.urlLink}
        />

        <button className="createadvocates__forms__button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default PartnerCreate;
