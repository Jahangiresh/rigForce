import React from "react";
import mapsvg from "../../assets/images/mapVector.svg";
import { FiChevronRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAllSettings } from "../../features/settingSlice";
import { useTranslation } from "react-i18next";

const ContactComponent = () => {
  const navigate = useNavigate();
  const settings = useSelector(getAllSettings);
  const { t, i18n } = useTranslation();
  function clickLang(lang) {
    i18n.changeLanguage(lang);
  }
  return (
    <div className="bg__blue h-[282px] relative">
      <img
        className="absolute -z-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        src={mapsvg}
        alt=""
      />
      <div className="content flex flex-col justify-center h-full items-center pb-20">
        <h2 className="text-white font-bold text-3xl ">
          {" "}
          {t("Bizimlə əlaqə")}
        </h2>
        <p className="my-4 text-white leading-8  md:w-[720px] text-center ">
          {settings &&
            settings.find((s) => s.key === "elaqe") &&
            settings.find((s) => s.key === "elaqe").value}
        </p>
        <button
          onClick={() => navigate("/contact")}
          className="btn__main flex items-center !absolute bottom-10 hover:bg-[#fff] "
        >
          {t("Bizimlə əlaqə")}
        </button>
      </div>
    </div>
  );
};

export default ContactComponent;
