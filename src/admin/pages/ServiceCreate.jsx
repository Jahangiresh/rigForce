import React, { useState } from "react";
import { useFormik } from "formik";
import "../scss/adminadvocates.scss";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import { createCategory } from "../../features/categorySlice";
import { createService } from "../../features/serviceSlice";
import { getAllServiceCategories } from "../../features/serviceCategorySlice";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const ServiceCreate = () => {
  const [descriptionValue, setDescriptionValue] = useState("");
  const categories = useSelector(getAllServiceCategories);
  const dispatch = useDispatch();

  const descriptionOnChange = (value) => {
    setDescriptionValue(value);
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      iconImage: "",
      detailImages: "",
      providedServiceCategoryId: "",
      language: "_az",
    },

    onSubmit: (values) => {
      if (!values.title.endsWith("_az") && !values.title.endsWith("_en")) {
        values.title = values.title + values.language;
      } else if (values.title.endsWith("_az") && values.language === "_en") {
        values.title = values.title.slice(0, -3);
        values.title = values.title + "_en";
      } else if (values.title.endsWith("_en") && values.language === "_az") {
        values.title = values.title.slice(0, -3);
        values.title = values.title + "_az";
      }

      var req = new FormData();
      req.append("title", values.title);
      req.append("description", descriptionValue);
      req.append("iconImage", values.iconImage);
      req.append("detailImages", values.detailImages);
      req.append("providedServiceCategoryId", values.providedServiceCategoryId);
      dispatch(
        createService({
          title: req.get("title"),
          description: req.get("description"),
          iconImage: req.get("iconImage"),
          detailImages: req.get("detailImages"),
          providedServiceCategoryId: req.get("providedServiceCategoryId"),
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
          name="detailImages"
          accept="image/*"
          type="file"
          onChange={(e) => {
            formik.setFieldValue("detailImages", e.currentTarget.files[0]);
          }}
        />
        <label className="createadvocates__forms__label" htmlFor="image">
          icon
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
        />
        <label className="createadvocates__forms__label" htmlFor="name">
          title
        </label>
        <input
          className="createadvocates__forms__input"
          id="title"
          name="title"
          type="text"
          onChange={formik.handleChange}
          defaultValue={formik.values.title}
        />

        <label className="createadvocates__forms__label" htmlFor="address">
          desc
        </label>
        {/* <input
          className="createadvocates__forms__input"
          id="description"
          name="description"
          type="text"
          onChange={formik.handleChange}
          defaultValue={formik.values.description}
        /> */}
        <ReactQuill theme="snow" onChange={descriptionOnChange} />
        <label className="createadvocates__forms__label" htmlFor="name">
          equipmentCategoryId
        </label>
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
        <label className="createadvocates__forms__label" htmlFor="language">
          Dil
        </label>
        <select
          className="createadvocates__forms__input"
          id="language"
          name="language"
          type="text"
          onChange={formik.handleChange}
        >
          <option value="_az">Azərbaycan</option>
          <option value="_en">English</option>
        </select>
        <button className="createadvocates__forms__button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ServiceCreate;
