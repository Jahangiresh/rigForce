import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import navmenu from "../../configs/navmenu";
import { useDispatch, useSelector } from "react-redux";
import { getAllSettings } from "../../../features/settingSlice";
const Footer = () => {
  const settings = useSelector(getAllSettings);
  console.log(settings);
  return (
    <div className="bg__blue pt-14">
      <div className="container">
        <div className=" flex justify-between gap-x-20 max-md:flex-col max-md:gap-y-10">
          <div className="basis-6/12">
            <h2 className="font-bold text-xl text-white">Missiyamız</h2>
            <p className="text-justify text-white mt-3 leading-8 font-normal">
              {settings &&
                settings.find((s) => s.key === "misyamiz") &&
                settings.find((s) => s.key === "misyamiz").value}
            </p>
          </div>
          <div className="basis-3/12 md:pl-10">
            <h2 className="font-bold text-xl text-white">Menu</h2>
            <ul className="text-white flex flex-col mt-3 leading-8">
              <Link to="/">Əsas səhifə</Link>
              <Link to="/about">Haqqımızda</Link>
              <Link to="/services">Xidmətlər</Link>
              <Link to="/products">Məhsullar</Link>
              <Link to="/contact">Əlaqə</Link>
            </ul>
          </div>
          <div className="basis-3/12">
            <h2 className="font-bold text-xl text-white">Bizimlə əlaqə</h2>
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
                Adress:{" "}
                {settings &&
                  settings.find((s) => s.key === "unvan") &&
                  settings.find((s) => s.key === "unvan").value}
              </p>
              {/* <li className="text-white">
                Mobil: {settings && settings[3]?.value}
              </li> */}
              <li className="text-white">
                Tel:{" "}
                {settings &&
                  settings.find((s) => s.key === "telefon1") &&
                  settings.find((s) => s.key === "telefon1").value}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center bg-[#002b42] h-12 mt-5 tracking-wider text-white font-thin leading-5  text-sm">
        {" "}
        Copyright © - Weblash group
      </div>
    </div>
  );
};

export default Footer;
