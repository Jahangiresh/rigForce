import React from "react";
import { useFormik } from "formik";
import "../scss/adminadvocates.scss";
import { useDispatch } from "react-redux";
import { Toaster } from "react-hot-toast";
import { createCategory } from "../../features/categorySlice";
import { createPartner } from "../../features/partnerSlice";
import { createSetting } from "../../features/settingSlice";
import { createSlider } from "../../features/sliderSlice";
import { createEquipment } from "../../features/EquipmentSlice";
const EquipmentsCreate = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      productCode: "",
      accreditedTo: "",
      fittings: "",
      material: "",
      weight: "",
      size: "",
      features: "",
      mainImageFile: "",
      detailImageFiles: [],
      pdfFile: "",
      doCFile: "",
      dataSheet: "",
      equipmentCategoryId: "",
    },
    onSubmit: (values) => {
      console.log("val", values);
      var req = new FormData();
      req.append("title", values.title);
      req.append("description", values.description);
      req.append("productCode", values.productCode);
      req.append("accreditedTo", values.accreditedTo);
      req.append("fittings", values.fittings);
      req.append("material", values.material);
      req.append("weight", values.weight);
      req.append("size", values.size);
      req.append("features", values.features);
      req.append("mainImageFile", values.mainImageFile);
      req.append("detailImageFiles", values.detailImageFiles);
      req.append("pdfFile", values.pdfFile);
      req.append("doCFile", values.doCFile);
      req.append("dataSheet", values.dataSheet);
      req.append("equipmentCategoryId", values.equipmentCategoryId);
      dispatch(
        createEquipment({
          title: req.get("title"),
          description: req.get("description"),
          productCode: req.get("productCode"),
          accreditedTo: req.get("accreditedTo"),
          fittings: req.get("fittings"),
          material: req.get("material"),
          weight: req.get("weight"),
          size: req.get("size"),
          features: req.get("features"),
          mainImageFile: req.get("mainImageFile"),
          detailImageFiles: req.get("detailImageFiles"),
          pdfFile: req.get("pdfFile"),
          doCFile: req.get("doCFile"),
          dataSheet: req.get("dataSheet"),
          equipmentCategoryId: req.get("equipmentCategoryId"),
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
          esas şəkil
        </label>
        <input
          className="createadvocates__forms__input"
          id="mainImageFile"
          name="mainImageFile"
          accept="image/*"
          type="file"
          onChange={(e) => {
            formik.setFieldValue("mainImageFile", e.currentTarget.files[0]);
          }}
        />
        <label className="createadvocates__forms__label" htmlFor="image">
          detailImageFiles
        </label>
        <input
          className="createadvocates__forms__input"
          id="detailImageFiles"
          name="detailImageFiles"
          accept="image/*"
          type="file"
          onChange={(e) => {
            formik.setFieldValue("detailImageFiles", e.currentTarget.files[0]);
          }}
        />
        <label className="createadvocates__forms__label" htmlFor="image">
          pdfFile
        </label>
        <input
          className="createadvocates__forms__input"
          id="pdfFile"
          name="pdfFile"
          accept="application/pdf"
          type="file"
          onChange={(e) => {
            formik.setFieldValue("pdfFile", e.currentTarget.files[0]);
          }}
        />
        <label className="createadvocates__forms__label" htmlFor="image">
          doCFile
        </label>
        <input
          className="createadvocates__forms__input"
          id="doCFile"
          name="doCFile"
          accept="application/pdf"
          type="file"
          onChange={(e) => {
            formik.setFieldValue("doCFile", e.currentTarget.files[0]);
          }}
        />
        <label className="createadvocates__forms__label" htmlFor="image">
          dataSheet
        </label>
        <input
          className="createadvocates__forms__input"
          id="dataSheet"
          name="dataSheet"
          accept="application/pdf"
          type="file"
          onChange={(e) => {
            formik.setFieldValue("dataSheet", e.currentTarget.files[0]);
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
        <label className="createadvocates__forms__label" htmlFor="name">
          description
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
          productCode
        </label>
        <input
          className="createadvocates__forms__input"
          id="productCode"
          name="productCode"
          type="text"
          onChange={formik.handleChange}
          defaultValue={formik.values.productCode}
        />
        <label className="createadvocates__forms__label" htmlFor="name">
          accreditedTo
        </label>
        <input
          className="createadvocates__forms__input"
          id="accreditedTo"
          name="accreditedTo"
          type="text"
          onChange={formik.handleChange}
          defaultValue={formik.values.accreditedTo}
        />

        <label className="createadvocates__forms__label" htmlFor="name">
          fittings
        </label>
        <input
          className="createadvocates__forms__input"
          id="fittings"
          name="fittings"
          type="text"
          onChange={formik.handleChange}
          defaultValue={formik.values.fittings}
        />
        <label className="createadvocates__forms__label" htmlFor="name">
          material
        </label>
        <input
          className="createadvocates__forms__input"
          id="material"
          name="material"
          type="text"
          onChange={formik.handleChange}
          defaultValue={formik.values.material}
        />
        <label className="createadvocates__forms__label" htmlFor="name">
          weight
        </label>
        <input
          className="createadvocates__forms__input"
          id="weight"
          name="weight"
          type="text"
          onChange={formik.handleChange}
          defaultValue={formik.values.weight}
        />
        <label className="createadvocates__forms__label" htmlFor="name">
          size
        </label>
        <input
          className="createadvocates__forms__input"
          id="size"
          name="size"
          type="text"
          onChange={formik.handleChange}
          defaultValue={formik.values.size}
        />
        <label className="createadvocates__forms__label" htmlFor="name">
          features
        </label>
        <input
          className="createadvocates__forms__input"
          id="features"
          name="features"
          type="text"
          onChange={formik.handleChange}
          defaultValue={formik.values.features}
        />
        <label className="createadvocates__forms__label" htmlFor="name">
          equipmentCategoryId
        </label>
        <input
          className="createadvocates__forms__input"
          id="equipmentCategoryId"
          name="equipmentCategoryId"
          type="text"
          onChange={formik.handleChange}
          defaultValue={formik.values.equipmentCategoryId}
        />

        <button className="createadvocates__forms__button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EquipmentsCreate;
