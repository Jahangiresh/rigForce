import React from "react";
import { useFormik } from "formik";
import "../scss/adminadvocates.scss";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import { createCategory } from "../../features/categorySlice";
import { createService } from "../../features/serviceSlice";
import { getAllServiceCategories } from "../../features/serviceCategorySlice";
const ServiceCreate = () => {
  const categories = useSelector(getAllServiceCategories);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      iconImage: "",
      detailImages: "",
      providedServiceCategoryId: "",
    },

    onSubmit: (values) => {
      console.log(values.providedServiceCategoryId);

      var req = new FormData();
      req.append("title", values.title);
      req.append("description", values.description);
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
        <input
          className="createadvocates__forms__input"
          id="description"
          name="description"
          type="text"
          onChange={formik.handleChange}
          defaultValue={formik.values.description}
        />
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
        <button className="createadvocates__forms__button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ServiceCreate;
