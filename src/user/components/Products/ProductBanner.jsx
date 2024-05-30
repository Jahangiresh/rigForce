import React from "react";
import { useSelector } from "react-redux";
import { getAllCategories } from "../../../features/categorySlice";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ProductBanner = () => {
  const categories = useSelector(getAllCategories);
  const { t } = useTranslation();

  return (
    <div className="container">
      <div className="grid max-md:grid-cols-1 grid-cols-2 h-auto py-5 gap-x-3">
        {categories &&
          categories.slice(0, 2).map((category) => (
            <div className="flex flex-col bg-[#003049]" key={category.id}>
              <div className="serviceimage w-full h-64 bg-white">
                <img
                  className="w-full h-full object-cover"
                  src={`https://rigforce.az/api/v1/files?filepath=${category.image.filePath}`}
                  alt=""
                />
              </div>
              <Link to={`/products/${category.id}`} className="py-4 pl-3">
                <h2 className="text-white font-bold text-xl hover:text-amber-400">
                  {category.title}
                </h2>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductBanner;
