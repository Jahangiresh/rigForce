import React from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import ServicesCard from "../components/Services/ServicesCard";
import servicesvg from "../../assets/images/servicesvector.svg";
import { FiChevronRight } from "react-icons/fi";
import ContactComponent from "../components/ContactComponent";
import LogoClouds from "../components/LogoClouds";
import { useSelector } from "react-redux";
import { getAllServices } from "../../features/serviceSlice";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import { useEffect } from "react";
import axios from "axios";
import { useReducer } from "react";
import { toast } from "react-hot-toast";
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loader: true };
    case "FETCH_SUCCESS":
      return { ...state, services: action.payload, loader: false };
    case "FETCH_FAIL":
      return { ...state, loader: false, error: action.payload };
    default:
      return state;
  }
};
const Services = () => {
  const [{ error, loader, services }, dispatch] = useReducer(reducer, {
    services: [],
    error: false,
    loader: false,
  });
  const navigate = useNavigate();
  // const services = useSelector(getAllServices);
  const params = useParams();
  const serCategory = params.category;
  useEffect(() => {
    const getProds = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });

        const { data } = await axios.get(
          `https://rigforce.az/api/v1/providedservices?providedServiceCategoryId=${serCategory}`,
          {
            params: {
              pageNumber: 1,
              pageSize: 100,
            },
          }
        );
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {}
      dispatch({ type: "FETCH_FAIL" });
      toast.error("Bu kateqoriya üzrə məhsul tapılmadı");
    };
    getProds();
  }, [serCategory]);
  return loader ? (
    <Loader />
  ) : (
    <>
      <Breadcrumbs title={"Xidmətlər"} />
      <div className="container">
        <div className="grid md:grid-cols-3 max-lg:gap-x-6 gap-x-20 max-md:gap-y-10 my-12 ">
          {services.length == 0 ? (
            <div className="w-full col-span-3">
              <div
                class="flex  p-4 text-sm text-gray-800 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600"
                role="alert"
              >
                <svg
                  aria-hidden="true"
                  class="flex-shrink-0 inline w-5 h-5 mr-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span class="sr-only">Info</span>
                <div>
                  <span class="font-medium">Diqqət!</span> Bu kateqoriya üzrə
                  məhsul tapılmadı
                </div>
              </div>
            </div>
          ) : (
            services &&
            services.map((service) => (
              <div className="mb-3 py-7 px-3 max-md:px-10 flex flex-col items-center shadow-md rounded-lg border border-[#e3e3e3]">
                <div className="serviceimage w-[61px] h-[61px] mb-7">
                  <img
                    className="w-full h-full object-cover"
                    src={`https://rigforce.az/api/v1/files?filepath=${service.images[0].filePath}`}
                    alt=""
                  />
                </div>
                <h2 className="text__black font-bold text-xl ">
                  {service.title}
                </h2>
                <p
                  style={{
                    whiteSpace: "normal",
                  }}
                  className="my-4 text__black text-center h-auto"
                >
                  {service.description}
                </p>

                {/* <button
                  onClick={() => navigate(`/services/${service.id}`)}
                  className="btn__secondary flex items-center mt-6"
                >
                  Daha ətraflı <FiChevronRight className="ml-2" />
                </button> */}
              </div>
            ))
          )}
        </div>
      </div>
      <ContactComponent />
      <LogoClouds />
    </>
  );
};

export default Services;
