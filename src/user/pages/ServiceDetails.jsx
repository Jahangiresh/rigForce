import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllServices } from "../../features/serviceSlice";
import Breadcrumbs from "../components/Breadcrumbs";
import ContactComponent from "../components/ContactComponent";
import LogoClouds from "../components/LogoClouds";
import Loader from "../components/Loader/Loader";
import { useTranslation } from "react-i18next";

const ServiceDetails = () => {
  const { t } = useTranslation();
  const services = useSelector(getAllServices);
  const params = useParams();
  const serviceId = params.id;
  const [currentService, setCurrentService] = useState();

  useEffect(() => {
    setCurrentService(services.find((s) => s.id == serviceId));
  }, []);

  console.log(currentService);

  return !currentService ? (
    <Loader />
  ) : (
    <>
      <Breadcrumbs title={t("Xidmət")} />

      <div className="container py-12">
        <div className="mb-12">
          <h1 className="text__black font-bold text-[28px] mb-3">
            {currentService && currentService.title}
          </h1>
          <div className="flex">
            <p className="leading-8">
              {currentService && currentService.description}
            </p>
          </div>
          <div>
            <img
              className="w-full h-full object-cover"
              src={`https://rigforce.az/api/v1/files?filepath=${currentService.images[0].filePath}`}
              alt=""
            />
          </div>
        </div>
      </div>
      <ContactComponent />
      <LogoClouds />
    </>
  );
};

export default ServiceDetails;
