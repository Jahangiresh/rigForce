import React from "react";
import { useSelector } from "react-redux";
import coverHomeSvg from "../../assets/images/coverhome.svg";
import { getAllSettings } from "../../features/settingSlice";
import AboutComponent from "../components/AboutComponent";
import ContactComponent from "../components/ContactComponent";
import Loader from "../components/Loader/Loader";
import LogoClouds from "../components/LogoClouds";
import ProductBanner from "../components/Products/ProductBanner";
import ServicesComponent from "../components/Services/ServicesComponent";
const Home = () => {
  const settings = useSelector(getAllSettings);

  return !settings ? (
    <Loader />
  ) : (
    <div>
      <div className="cover h-[524px]  text-center relative w-full flex justify-center items-center">
        <img
          className="absolute top-0 left-0 h-full w-full object-cover -z-10"
          src={coverHomeSvg}
          alt=""
        />
        <div className="cover__content  w-[772px] max-sm:w-full max-sm:px-1 ">
          <h1 className="font-bold text-white text-[38px] max-sm:text-[28px] max-sm:leading-2">
            {settings &&
              settings.find((s) => s.key === "banner1") &&
              settings.find((s) => s.key === "banner1").value}
          </h1>
          <p className=" text-white sm:text-xl mt-6 max-sm:leading-8">
            {settings &&
              settings.find((s) => s.key === "banner2") &&
              settings.find((s) => s.key === "banner2").value}
          </p>
        </div>
      </div>
      <AboutComponent />
      <ServicesComponent />
      <ProductBanner />
      <ContactComponent />
      <LogoClouds />
    </div>
  );
};

export default Home;
