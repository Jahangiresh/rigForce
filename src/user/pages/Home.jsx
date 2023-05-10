import React from "react";
import coverHomeSvg from "../../assets/images/coverhome.svg";
import AboutComponent from "../components/AboutComponent";
import ContactComponent from "../components/ContactComponent";
import LogoClouds from "../components/LogoClouds";
import ProductBanner from "../components/Products/ProductBanner";
import ServicesComponent from "../components/Services/ServicesComponent";
const Home = () => {
  return (
    <div>
      <div className="cover h-[524px]  text-center relative w-full flex justify-center items-center">
        <img
          className="absolute top-0 left-0 h-full w-full object-cover -z-10"
          src={coverHomeSvg}
          alt=""
        />
        <div className="cover__content  w-[772px] max-sm:w-full max-sm:px-1 ">
          <h1 className="font-bold text-white text-[38px] max-sm:text-[28px] max-sm:leading-2">
            Lorem ipsum dolor sit amet consectetur. Amet donec leo sit erat.
            <span className="text__yellow">Eleifend risus</span> diam cursus
            dictum est
          </h1>
          <p className=" text-white sm:text-xl mt-6 max-sm:leading-8">
            Lorem ipsum dolor sit amet consectetur. Amet donec leo sit erat.
            Eleifend risus diam cursus dictum est Lorem ipsum dolor sit amet
            consectetur. Amet donec leo sit erat. Eleifend risus diam cursus
            dictum est
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
