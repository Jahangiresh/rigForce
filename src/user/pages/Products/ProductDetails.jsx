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

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, prodDetails: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
const ProductDetails = () => {
  const [{ error, loader, prodDetails }, dispatch] = useReducer(reducer, {
    prodDetails: [],
    error: false,
    loader: false,
  });

  const params = useParams();
  const prodCategory = params.category;
  const prodId = params.id;

  const fetchProdDetails = async () => {
    try {
      dispatch({ type: "FETCH_REQUEST" });

      const { data } = await axios.get(
        `http://devserver298-001-site1.ctempurl.com/api/v1/equipments/${prodId}`
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
        original:
          "http://devserver298-001-site1.ctempurl.com/api/v1/files?filepath=" +
          image.filePath,
        thumbnail:
          "http://devserver298-001-site1.ctempurl.com/api/v1/files?filepath=" +
          image.filePath,
      };
    });

    images.push(...updatedImages); // Use the spread operator (...) to push all images at once
    console.log(images);
  }

  return (
    <>
      <Breadcrumbs title={"Products"} />
      <div className="container py-10">
        <div className="grid lg:grid-cols-3 max-lg:flex max-lg:flex-col max-lg:items-center  ">
          <div className="col-span-1 max-lg:mb-10">
            <ImageGallery items={images} />
          </div>
          <div className="col-span-2 pl-6 ">
            <h1 className="text__black font-bold text-[28px] mb-6 ">
              {prodDetails && prodDetails.title}
            </h1>
            <ul className="leading-8">
              <li>
                <span className="text__black font-medium">Product code: </span>
                <span> {prodDetails && prodDetails.productCode}</span>
              </li>{" "}
              <li>
                <span className="text__black font-medium">Accredited To: </span>
                <span> {prodDetails && prodDetails.accreditedTo}</span>
              </li>{" "}
              <li>
                <span className="text__black font-medium">Weight: </span>
                <span> {prodDetails && prodDetails.weight}</span>
              </li>{" "}
              <li>
                <span className="text__black font-medium">Size: </span>
                <span> {prodDetails && prodDetails.size}</span>
              </li>{" "}
              <li>
                <span className="text__black font-medium">Material: </span>
                <span> {prodDetails && prodDetails.material}</span>
              </li>{" "}
              <li>
                <span className="text__black font-medium">Fittings: </span>
                <span> {prodDetails && prodDetails.fittings}</span>
              </li>{" "}
              <li>
                <span className="text__black font-medium">
                  Product Features:{" "}
                </span>
                <span> {prodDetails && prodDetails.features}</span>
              </li>{" "}
            </ul>
            <ul className="flex flex-col mt-2 gap-y-4">
              <li>
                <a
                  href={`http://devserver298-001-site1.ctempurl.com/api/v1/${prodDetails.filePath}`}
                  download
                >
                  {prodDetails.fileName}
                </a>

                <button className="btn__secondary">Download PDF</button>
              </li>
              <li>
                <button className="btn__secondary">
                  Declaration of Conformity
                </button>
              </li>
              <li>
                <button className="btn__secondary">Data sheet</button>
              </li>
            </ul>
          </div>
        </div>
        <div className="grid lg:grid-cols-3">
          <div className="desc col-span-2 ">
            <h1 className="text__black font-bold text-[28px] mb-6 mt-24 ">
              Product Description:
            </h1>
            <p className="text__black leading-8">
              Our V-shaped Summit adventure harness comes with two points of
              connection. This collection of harnesses are colour coded for easy
              and fast size allocation. The step in design and different
              coloured right leg loop simplifies donning. The easy slide buckles
              make adjustability easy meaning resizing the harness is effortless
              and fast. The back and ventral connection points on this harness
              make it suitable for multiple activities. *14 times reduction in
              bacterial growth, according to ISO 20743:2013 contact with
              K.pneumoniae, commonly associated with healthcare infections such
              as E.coli.
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
