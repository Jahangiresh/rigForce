import React, { useState } from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import prodImg from "../../../assets/images/prod.png";
import { FiChevronRight } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { useReducer } from "react";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { getAllEquipments } from "../../../features/EquipmentSlice";
import Loader from "../../components/Loader/Loader";
import { useTranslation } from "react-i18next";
import FilterCategoryList from "../../components/FilterCategoryList";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loader: true };
    case "FETCH_SUCCESS":
      return { ...state, prods: action.payload, loader: false };
    case "FETCH_FAIL":
      return { ...state, loader: false, error: action.payload };
    default:
      return state;
  }
};

const ProductsList = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const allProds = useSelector(getAllEquipments);
  const lang = localStorage.getItem("i18nextLng");
  const [productList, setProductList] = useState([]);
  const [{ error, loader, prods }, dispatch] = useReducer(reducer, {
    prods: [],
    error: false,
    loader: true,
  });

  const params = useParams();
  const prodCategory = params.category;
  useEffect(() => {
    const getProds = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });

        const { data } = await axios.get(
          `https://rigforce.az/api/v1/equipments?equipmentCategoryId=${prodCategory}`,
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
  }, [prodCategory]);

  useEffect(() => {
    const filterByLanguage = prods.filter((p) =>
      p.title.endsWith(`_${lang ? lang : "en"}`)
    );
    setProductList(filterByLanguage);
  }, [prods, lang]);

  return loader ? (
    <Loader />
  ) : (
    <>
      <Breadcrumbs title={t("Məhsullar")} />
      <div className="container">
        <div className="grid grid-cols-3 gap-4 py-10 max-sm:grid-cols-1">
          {" "}
          {/*Filteri aktiv edəndə grid-cols-4 yazılmalıdır */}
          {/* <div className="col-span-1">
            <h2 className="px-4 font-normal text-xl">
              {t("Məhsul Kateqoriyası")}
            </h2>
            <FilterCategoryList />
          </div> */}
          <div className="col-span-3">
            <div className="grid grid-cols-3 max-sm:grid-cols-1 max-lg:grid-cols-2 gap-6 ">
              {productList.length == 0 ? (
                <div className="w-full col-span-3">
                  <div
                    className="flex  p-4 text-sm text-gray-800 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600"
                    role="alert"
                  >
                    <svg
                      aria-hidden="true"
                      className="flex-shrink-0 inline w-5 h-5 mr-3"
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
                    <span className="sr-only">Info</span>
                    <div>
                      <span className="font-medium">{t("Diqqət")}</span>{" "}
                      {t("MəhsulTapılmadı")}
                    </div>
                  </div>
                </div>
              ) : (
                productList &&
                productList.map((prod) => (
                  <div className="rounded-md shadow-md border border-[#e3e3e3]">
                    <div className="pImage h-60 ">
                      <img
                        className="w-full h-full object-contain"
                        src={`https://rigforce.az/api/v1/files?filepath=${
                          prod.images[0].filePath && prod.images[0].filePath
                        }`}
                        alt="img"
                      />
                    </div>
                    <div className="content my-6 flex flex-col items-center px-6">
                      <h1 className="font-bold whitespace-normal text-center text-xl ">
                        {prod.title.endsWith("_az") ||
                        prod.title.endsWith("_en")
                          ? prod.title.slice(0, -3)
                          : prod.title}
                      </h1>
                      <p className="my-2 text-center leading-7">
                        {prod.description?.length > 100
                          ? prod.description.slice(0, 100) + "..."
                          : prod.description}
                      </p>
                      <button
                        onClick={() =>
                          navigate(`/products/${prodCategory}/${prod.id}`)
                        }
                        className="btn__secondary flex items-center"
                      >
                        {t("Daha ətraflı")} <FiChevronRight />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsList;
