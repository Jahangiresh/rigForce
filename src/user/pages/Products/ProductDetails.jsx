import React from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import prodImg from "../../../assets/images/prod.png";
import ImageGallery from "react-image-gallery";
import ContactComponent from "../../components/ContactComponent";
import LogoClouds from "../../components/LogoClouds";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useReducer } from "react";
import Loader from "../../components/Loader/Loader";
import { useTranslation } from "react-i18next";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loader: true };
    case "FETCH_SUCCESS":
      return { ...state, prodDetails: action.payload, loader: false };
    case "FETCH_FAIL":
      return { ...state, loader: false, error: action.payload };
    default:
      return state;
  }
};
const ProductDetails = () => {
  const { t } = useTranslation();
  const [{ error, loader, prodDetails }, dispatch] = useReducer(reducer, {
    prodDetails: [],
    error: false,
    loader: true,
  });

  const params = useParams();
  const prodCategory = params.category;
  const prodId = params.id;

  const fetchProdDetails = async () => {
    try {
      dispatch({ type: "FETCH_REQUEST" });

      const { data } = await axios.get(
        `https://rigforce.az/api/v1/equipments/${prodId}`
      );

      dispatch({ type: "FETCH_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "FETCH_FAIL" });
      toast.error("Bu kateqoriya üzrə məhsul tapılmadı");
    }
  };

  useEffect(() => {
    fetchProdDetails();
  }, [prodId]);
  const images = [];

  if (prodDetails && prodDetails.images && prodDetails.images.length > 0) {
    const updatedImages = prodDetails.images.map((image) => {
      return {
        original: "https://rigforce.az/api/v1/files?filepath=" + image.filePath,
        thumbnail:
          "https://rigforce.az/api/v1/files?filepath=" + image.filePath,
      };
    });

    images.push(...updatedImages); // Use the spread operator (...) to push all images at once
    console.log(images);
  }

  return loader ? (
    <Loader />
  ) : (
    <>
      <Breadcrumbs title={t("Məhsullar")} />
      <div className="container py-10">
        <div className="grid lg:grid-cols-3 max-lg:flex max-lg:flex-col max-lg:items-center  ">
          <div className="col-span-1 max-lg:mb-10">
            <ImageGallery items={images} />
          </div>
          <div className="col-span-2 pl-6 ">
            <h1 className="text__black font-bold text-[28px] mb-6 ">
              {prodDetails.title && prodDetails.title}
            </h1>
            <ul className="leading-8">
              <li>
                <span className="text__black font-medium">
                  {t("Məhsul kodu")}:{" "}
                </span>
                <span>
                  {" "}
                  {prodDetails.productCode && prodDetails.productCode}
                </span>
              </li>{" "}
              <li>
                <span className="text__black font-medium">
                  {t("Akkreditə olunub")}:{" "}
                </span>
                <span>
                  {" "}
                  {prodDetails.accreditedTo && prodDetails.accreditedTo}
                </span>
              </li>{" "}
              <li>
                <span className="text__black font-medium">{t("Çəkisi")}: </span>
                <span> {prodDetails.weight && prodDetails.weight}</span>
              </li>{" "}
              <li>
                <span className="text__black font-medium">{t("Ölçüsü")}: </span>
                <span> {prodDetails.size && prodDetails.size}</span>
              </li>{" "}
              <li>
                <span className="text__black font-medium">
                  {t("Materialı")}:{" "}
                </span>
                <span> {prodDetails.material && prodDetails.material}</span>
              </li>{" "}
              <li>
                <span className="text__black font-medium">
                  {t("Fitinqlər")}:{" "}
                </span>
                <span> {prodDetails.fittings && prodDetails.fittings}</span>
              </li>{" "}
              <li>
                <span className="text__black font-medium">
                  {t("Məhsul Xüsusiyyətləri")} :{" "}
                </span>
                <span> {prodDetails.features && prodDetails.features}</span>
              </li>{" "}
            </ul>
            <ul className="flex flex-col mt-2 gap-y-4">
              <li>
                <a
                  className="btn__secondary"
                  href={`https://rigforce.az/api/v1/files?filepath=${
                    prodDetails.files && prodDetails.files[0].filePath
                  }`}
                  download
                >
                  {t("PDF yüklə")}
                </a>
              </li>
              <li>
                <a
                  className="btn__secondary"
                  href={`https://rigforce.az/api/v1/files?filepath=${
                    prodDetails.files && prodDetails.files[1].filePath
                  }`}
                  download
                >
                  {t("Uyğunluq Bəyannaməsi")}
                </a>
              </li>{" "}
              <li>
                <a
                  className="btn__secondary"
                  href={`https://rigforce.az/api/v1/files?filepath=${
                    prodDetails.files && prodDetails.files[2].filePath
                  }`}
                  download
                >
                  {t("Məlumat vərəqi")}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="grid lg:grid-cols-3">
          <div className="desc col-span-2 ">
            <h1 className="text__black font-bold text-[28px] mb-6 mt-24 ">
              {t("Məhsul təsviri")}:
            </h1>
            <p
              style={{
                whiteSpace: "normal",
              }}
              className="text__black leading-8"
            >
              {prodDetails.description && prodDetails.description}
            </p>
          </div>
        </div>
      </div>
      <ContactComponent />
      <LogoClouds />
    </>
  );
};

export default ProductDetails;
