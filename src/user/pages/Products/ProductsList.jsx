import React from "react";
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

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, prods: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const ProductsList = () => {
  const navigate = useNavigate();
  const allProds = useSelector(getAllEquipments);
  const [{ error, loader, prods }, dispatch] = useReducer(reducer, {
    prods: [],
    error: false,
    loader: false,
  });

  const params = useParams();
  const prodCategory = params.category;
  useEffect(() => {
    const getProds = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });

        const { data } = await axios.get(
          `http://devserver298-001-site1.ctempurl.com/api/v1/equipments?equipmentCategoryId=${prodCategory}`,
          {
            params: {
              pageNumber: 1,
              pageSize: 100,
            },
          }
        );
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) { }
      dispatch({ type: "FETCH_FAIL" });
      toast.error("Bu kateqoriya üzrə məhsul tapılmadı");
    };
    getProds();
  }, [prodCategory]);
  return (
    <>
      <Breadcrumbs title={"Prods--zirt pirt"} />
      <div className="container">
        <div className="grid grid-cols-3 max-sm:grid-cols-1 max-lg:grid-cols-2  py-10 gap-6 ">
          {prods.length == 0 ? (
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
            prods &&
            prods.map((prod) => (
              <div className="rounded-md shadow-md border border-[#e3e3e3]">
                <div className="pImage h-60 ">
                  <img
                    className="w-full h-full object-contain"
                    src={prodImg}
                    alt="img"
                  />
                </div>
                <div className="content my-6 flex flex-col items-center px-6">
                  <h1 className="font-bold text__black text-xl ">
                    {prod.title}
                  </h1>
                  <p className="my-2 text-center leading-7">
                    Our V-shaped Summit adventure harness comes with two points
                    of connection. This collection of harnesses are colour coded
                    for
                  </p>
                  <button
                    onClick={() =>
                      navigate(`/products/${prodCategory}/${prod.id}`)
                    }
                    className="btn__secondary flex items-center"
                  >
                    See more <FiChevronRight />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default ProductsList;
