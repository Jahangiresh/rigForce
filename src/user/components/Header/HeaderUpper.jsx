import React from "react";
import { useSelector } from "react-redux";
import { getAllSettings } from "../../../features/settingSlice";

const HeaderUpper = () => {
  const settings = useSelector(getAllSettings);

  return (
    <div className="bg__blue">
      <div className="container font-normal text-base sm:h-10 items-center text-white flex max-sm:gap-2 gap-4 justify-end max-sm:flex-col max-sm:py-2 ">
        <span>
          <span>Email: </span>{" "}
          {settings &&
            settings.find((s) => s.key === "mail") &&
            settings.find((s) => s.key === "mail").value}
        </span>
        <span>
          <span>Tel: </span>
          {settings &&
            settings.find((s) => s.key === "telefon1") &&
            settings.find((s) => s.key === "telefon1").value}
        </span>
      </div>
    </div>
  );
};

export default HeaderUpper;
