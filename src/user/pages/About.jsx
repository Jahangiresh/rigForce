import React from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import ContactComponent from "../components/ContactComponent";
import LogoClouds from "../components/LogoClouds";
import { useSelector } from "react-redux";
import { getAllSettings } from "../../features/settingSlice";
import Loader from "../components/Loader/Loader";
import { useTranslation } from "react-i18next";

const About = () => {
  const settings = useSelector(getAllSettings);
  const { t } = useTranslation();
  const lang = localStorage.getItem("i18nextLng");

  return !settings ? (
    <Loader />
  ) : (
    <>
      <Breadcrumbs title={t("Haqqımızda")} />
      <div className="container py-12">
        <div className="mb-12">
          <h1 className="text__black font-bold text-[28px] mb-3">Rig Force</h1>
          <p className="leading-8">
            {settings &&
              settings.find(
                (s) =>
                  s.key ===
                  `${lang === "az" ? "haqqimizda_az" : "haqqimizda_eng"}`
              ) &&
              settings.find(
                (s) =>
                  s.key ===
                  `${lang === "az" ? "haqqimizda_az" : "haqqimizda_eng"}`
              ).value}
          </p>
        </div>
        <div className="mb-12">
          <h1 className="text__black font-bold text-[28px] mb-3">
            {t("Görüşlərimiz və Məqsədlərimiz")}
          </h1>
          <p className="leading-8">
            {settings &&
              settings.find(
                (s) =>
                  s.key ===
                  `${lang === "az" ? "gorushlerimiz_az" : "gorushlerimiz_eng"}`
              ) &&
              settings.find(
                (s) =>
                  s.key ===
                  `${lang === "az" ? "gorushlerimiz_az" : "gorushlerimiz_eng"}`
              ).value}
          </p>
        </div>
      </div>
      <ContactComponent />
      <LogoClouds />
    </>
  );
};

export default About;
