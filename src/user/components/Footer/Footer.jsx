import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import navmenu from "../../configs/navmenu";
import { useDispatch, useSelector } from "react-redux";
import { getAllSettings } from "../../../features/settingSlice";
import { useTranslation } from "react-i18next";
const Footer = () => {
  const { t, i18n } = useTranslation();
  const lang = localStorage.getItem("i18nextLng");
  const settings = useSelector(getAllSettings);

  return (
    <div className="bg__blue pt-14">
      <div className="container">
        <div className=" flex justify-between gap-x-20 max-md:flex-col max-md:gap-y-10">
          {/* <div className="basis-6/12">
            <h2 className="font-bold text-xl text-white">{t("Missiyamız")}</h2>
            <p className="text-justify text-white mt-3 leading-8 font-normal">
              {settings &&
                settings.find((s) => s.key === "misyamiz") &&
                settings.find((s) => s.key === "misyamiz").value}
            </p>
          </div> */}
          <div className="basis-3/12 md:pl-10">
            <h2 className="font-bold text-xl text-white">Menu</h2>
            <ul className="text-white flex flex-col mt-3 leading-8">
              <Link to="/"> {t("Əsas səhifə")} </Link>
              <Link to="/about"> {t("Haqqımızda")}</Link>
              <Link to="/services">{t("Xidmətlər")}</Link>
              <Link to="/products">{t("Məhsullar")}</Link>
              <Link to="/contact">{t("Əlaqə")}</Link>
            </ul>
          </div>
          <div className="basis-3/12">
            <h2 className="font-bold text-xl text-white">
              {" "}
              {t("Bizimlə əlaqə")}
            </h2>
            <ul>
              {/* {

                settings.map((e) => {
                  return e.key == 'Address' ? <li>
                    <p className="text-justify text-white mt-3 leading-7">
                      Adress: {e.value}
                    </p>
                  </li> : null ?
                    e.key == 'Tel2' && <li className="text-white">Tel: +994 50 500 50 50</li> : null
                })} */}
              <p className="text-justify text-white mt-3 leading-7">
                {t("Ünvan")}:{" "}
                {settings &&
                  settings.find(
                    (s) =>
                      s.key === `${lang === "az" ? "unvan_az" : "unvan_eng"}`
                  ) &&
                  settings.find(
                    (s) =>
                      s.key === `${lang === "az" ? "unvan_az" : "unvan_eng"}`
                  ).value}
              </p>
              {/* <li className="text-white">
                Mobil: {settings && settings[3]?.value}
              </li> */}
              <li className="text-white">
                {t("Telefon")}:{" "}
                {settings &&
                  settings.find((s) => s.key === "telefon1") &&
                  settings.find((s) => s.key === "telefon1").value}
              </li>
              <li className="text-white">
                {t("Email")}:{" "}
                {settings &&
                  settings.find((s) => s.key === "mail") &&
                  settings.find((s) => s.key === "mail").value}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center bg-[#002b42] h-12 mt-5 tracking-wider text-white font-thin leading-5  text-sm">
        {" "}
        Copyright © -{" "}
        <a href="https://weblash.az" target="_blank">
          Weblash group
        </a>
      </div>
    </div>
  );
};

export default Footer;
