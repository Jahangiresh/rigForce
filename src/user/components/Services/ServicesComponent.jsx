import React from "react";
import ServicesCard from "./ServicesCard";
import { useSelector } from "react-redux";
import { getAllSettings } from "../../../features/settingSlice";
import { useTranslation } from "react-i18next";

const ServicesComponent = () => {
  const settings = useSelector(getAllSettings);
  const { t, i18n } = useTranslation();
  const lang = localStorage.getItem("i18nextLng");

  return (
    <div className="bg__blue py-12">
      <div className="container">
        <div className="content flex flex-col items-center mb-14">
          <h1 className="font-bold text-[28px] text-white text-center mb3">
            {t("Xidmətlər")}
          </h1>
          <p className="leading-6 text-center md:w-[700px] text-white">
            {settings &&
              settings.find(
                (s) =>
                  s.key ===
                  `${lang === "az" ? "servisler_az" : "servisler_eng"}`
              ) &&
              settings.find(
                (s) =>
                  s.key ===
                  `${lang === "az" ? "servisler_az" : "servisler_eng"}`
              ).value}
          </p>
        </div>
        <div className="services">
          <ServicesCard />
        </div>
      </div>
    </div>
  );
};

export default ServicesComponent;
