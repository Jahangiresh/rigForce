import React, { useEffect, useReducer } from "react";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQ":
      return { ...state, loader: true };
    case "FETCH_SUCCES":
      return { ...state, equipment: action.payload, loader: false };
    case "FETCH_FAIL":
      return { ...state, error: true };
    default:
      return state;
  }
};

const EquipmentsEdit = () => {
  const [{ loading, error, equipment }, dispatch] = useReducer(reducer, {
    equipment: {},
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
          `http://devserver298-001-site1.ctempurl.com/api/v1/equipments/${id}`
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
      title: equipment.title,
      description: equipment.description,
      productCode: equipment.productCode,
      accreditedTo: equipment.accreditedTo,
      fittings: equipment.fittings,
      material: equipment.material,
      weight: equipment.weight,
      size: equipment.size,
      features: equipment.features,
      mainImageFile: equipment.mainImageFile,
      detailImageFiles: equipment.detailImageFiles,
      pdfFile: equipment.pdfFile,
      doCFile: equipment.doCFile,
      dataSheet: equipment.dataSheet,
      equipmentCategoryId: equipment.equipmentCategoryId,
    },
    onSubmit: async (values) => {
      const { accessToken } = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : "";

      try {
        await axios.put(
          `http://devserver298-001-site1.ctempurl.com/api/v1/equipments/${id}`,
          {
            title: values.title,
            description: values.description,
            productCode: values.productCode,
            accreditedTo: values.accreditedTo,
            fittings: values.fittings,
            material: values.material,
            weight: values.weight,
            size: values.size,
            features: values.features,
            mainImageFile: values.mainImageFile,
            detailImageFiles: values.detailImageFiles,
            pdfFile: values.pdfFile,
            doCFile: values.doCFile,
            dataSheet: values.dataSheet,
            equipmentCategoryId: values.equipmentCategoryId,
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
              formik.setFieldValue(
                "detailImageFiles",
                e.currentTarget.files[0]
              );
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
            defaultValue={equipment.title}
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
            defaultValue={equipment.description}
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
            defaultValue={equipment.productCode}
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
            defaultValue={equipment.accreditedTo}
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
            defaultValue={equipment.fittings}
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
            defaultValue={equipment.material}
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
            defaultValue={equipment.weight}
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
            defaultValue={equipment.size}
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
            defaultValue={equipment.features}
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
            defaultValue={equipment.id}
          />
          <button className="createadvocates__forms__button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EquipmentsEdit;
