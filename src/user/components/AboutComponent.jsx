import React from "react";
import aboutsvg1 from "../../assets/images/aboutvector1.svg";
import aboutsvg2 from "../../assets/images/aboutvector2.svg";
import { FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAllSettings } from "../../features/settingSlice";
import { useTranslation } from "react-i18next";

const AboutComponent = () => {
  const { t, i18n } = useTranslation();

  const settings = useSelector(getAllSettings);

  return (
    <div className="my-14">
      <div className="container ">
        <div className="grid md:grid-cols-2  gap-x-5 w-full">
          <div className="w-full max-md:mb-10">
            <div className="img__div w-14 h-14 mb-7">
              <img
                className="w-full h-full object-cover"
                src={aboutsvg1}
                alt="jpg"
              />
            </div>
            <h1 className="text-[28px] font-bold text__black mb-3">
              {t("Haqqımızda")}
            </h1>
            <p
              style={{
                whiteSpace: "normal",
              }}
              className="md:leading-8 text__black mb-6 "
            >
              {settings &&
                settings.find((s) => s.key === "haqqimizda") &&
                settings.find((s) => s.key === "haqqimizda").value}
            </p>
            <Link to="/about">
              <button className="flex btn__main items-center ">
                {t("Daha çox")}
                <FiChevronRight className="ml-2" />{" "}
              </button>
            </Link>
          </div>
          <div className="w-full">
            <div className="img__div w-14 h-14 mb-7">
              <img
                className="w-full h-full object-cover"
                src={aboutsvg2}
                alt="jpg"
              />
            </div>
            <h1 className="text-[28px] font-bold text__black mb-3">
              {t("Görüşlərimiz və Məqsədlərimiz")}
            </h1>
            <p
              style={{
                whiteSpace: "normal",
              }}
              className="md:leading-8 text__black mb-6"
            >
              {settings &&
                settings.find((s) => s.key === "gorushlerimiz") &&
                settings.find((s) => s.key === "gorushlerimiz").value}
            </p>
            <Link to="/about">
              <button className="flex btn__main items-center ">
                {t("Daha çox")}
                <FiChevronRight className="ml-2" />{" "}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutComponent;
