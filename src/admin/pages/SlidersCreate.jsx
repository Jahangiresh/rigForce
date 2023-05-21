import React from "react";
import { useFormik } from "formik";
import "../scss/adminadvocates.scss";
import { useDispatch } from "react-redux";
import { Toaster } from "react-hot-toast";
import { createCategory } from "../../features/categorySlice";
import { createPartner } from "../../features/partnerSlice";
import { createSetting } from "../../features/settingSlice";
import { createSlider } from "../../features/sliderSlice";
const SlidersCreate = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      order: "",
      imageFile: "",
    },
    onSubmit: (values) => {
      console.log("val", values);
      var req = new FormData();
      req.append("order", values.order);
      req.append("imageFile", values.imageFile);
      dispatch(
        createSlider({
          order: req.get("order"),
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
          sira nomresi
        </label>
        <input
          className="createadvocates__forms__input"
          id="key"
          name="order"
          type="text"
          onChange={formik.handleChange}
          defaultValue={formik.values.order}
        />

        <button className="createadvocates__forms__button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SlidersCreate;
