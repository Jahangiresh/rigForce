import React from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import ContactComponent from "../components/ContactComponent";
import LogoClouds from "../components/LogoClouds";

import { FiChevronRight } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import {
  getAllServiceCategories,
  getStatus,
} from "../../features/serviceCategorySlice";
import { useSelector } from "react-redux";
import Loader from "../components/Loader/Loader";
import { useTranslation } from "react-i18next";

const ServiceCategories = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const categories = useSelector(getAllServiceCategories);
  const status = useSelector(getStatus);
  return status == "pending" ? (
    <Loader />
  ) : (
    <>
      <Breadcrumbs title={t("Xidmətlər")} />
      <div className="container grid max-md:grid-cols-1 grid-cols-2 h-auto py-10 gap-x-3 gap-y-4">
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
              <Link to={`/services/${category.id}`} className="py-4 pl-3">
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

export default ServiceCategories;
