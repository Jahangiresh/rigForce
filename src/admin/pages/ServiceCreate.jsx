import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import "../scss/adminadvocates.scss";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import { createService } from "../../features/serviceSlice";
import { getAllServiceCategories } from "../../features/serviceCategorySlice";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Quill-in əsas stili
import "react-quill/dist/quill.bubble.css"; // İkinci tema (lazım olarsa)
import { Quill } from "react-quill";

// Quill formatsız hizalanma üçün konfiqurasiyalar
var AlignStyle = Quill.import("attributors/style/align");
Quill.register(AlignStyle, true);

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

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline"],
      [{ color: [] }, { background: [] }], // Text color və background color düymələri
      [{ align: [] }], // Text align düymələri
      [{ size: [] }],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "list",
    "bullet",
    "indent",
    "color",
    "background", // Bu parametrləri əlavə edirik
    "align", // Text align formatı
  ];

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
          value={formik.values.title}
        />

        <label className="createadvocates__forms__label" htmlFor="address">
          desc
        </label>
        <ReactQuill
          theme="snow"
          value={descriptionValue}
          onChange={descriptionOnChange}
          modules={modules}
          formats={formats}
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
          value={formik.values.providedServiceCategoryId}
        >
          {categories &&
            categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
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
          value={formik.values.language}
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
