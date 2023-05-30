import React from "react";
import banner1 from "../../../assets/images/banner1.svg";
import banner2 from "../../../assets/images/banner2.svg";
import { FiChevronRight } from "react-icons/fi";
import { useSelector } from "react-redux";
import { getAllCategories } from "../../../features/categorySlice";
import { useNavigate } from "react-router-dom";

const ProductBanner = () => {
  const categories = useSelector(getAllCategories);
  const navigate = useNavigate();
  return (
    <div className="grid max-md:grid-cols-1 grid-cols-2 h-auto">
      {categories &&
        categories.slice(0, 2).map((category) => (
          <div className="relative  h-[346px]  w-full flex  justify-center flex-col px-24 max-lg:px-10 ">
            <img
              className="absolute object-cover !w-full h-full top-0 left-0 -z-10"
              src={`http://devserver298-001-site1.ctempurl.com/api/v1/files?filepath=${category.image.filePath}`}
              alt="banner"
            />
            <div className="content flex flex-col justify-center   h-full">
              <h2 className="text-white font-bold text-2xl ">
                {category.title}{" "}
              </h2>
              <p className="my-4 text-white lg:leading-2 ">
                {category.description}{" "}
              </p>
              <button
                onClick={() => navigate(`/products/${category.id}`)}
                className="btn__secondary flex items-center w-44"
              >
                Read more <FiChevronRight className="ml-2" />
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ProductBanner;
