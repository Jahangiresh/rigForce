import React from "react";
import ServicesCard from "./ServicesCard";
import { useSelector } from "react-redux";
import { getAllSettings } from "../../../features/settingSlice";

const ServicesComponent = () => {
  const settings = useSelector(getAllSettings);
  return (
    <div className="bg__blue py-12">
      <div className="container">
        <div className="content flex flex-col items-center mb-14">
          <h1 className="font-bold text-[28px] text-white text-center mb3">
            Xidmətlər
          </h1>
          <p className="leading-6 text-center md:w-[700px] text-white">
            {settings &&
              settings.find((s) => s.key === "servisler") &&
              settings.find((s) => s.key === "servisler").value}
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
