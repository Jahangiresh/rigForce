import React from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import ContactComponent from "../../components/ContactComponent";
import LogoClouds from "../../components/LogoClouds";
import { Link } from "react-router-dom";
import { getAllCategories, getStatus } from "../../../features/categorySlice";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";
import { useTranslation } from "react-i18next";
const Products = () => {
  const { t } = useTranslation();
  const categories = useSelector(getAllCategories);
  const status = useSelector(getStatus);
  return status == "pending" ? (
    <Loader />
  ) : (
    <>
      <Breadcrumbs title={t("Məhsullar")} />
      <div className="container grid max-md:grid-cols-1 grid-cols-2 h-auto py-10 gap-x-3 gap-y-3">
        {categories &&
          categories.map((category) => (
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
      <ContactComponent />
      <LogoClouds />
    </>
  );
};

export default Products;
