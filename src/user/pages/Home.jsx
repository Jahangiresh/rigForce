import React from "react";
import { useSelector } from "react-redux";
import coverHomeSvg from "../../assets/images/coverhome.svg";
import { getAllSettings } from "../../features/settingSlice";
import { getAllSliders, getStatus } from "../../features/sliderSlice";
import AboutComponent from "../components/AboutComponent";
import ContactComponent from "../components/ContactComponent";
import Loader from "../components/Loader/Loader";
import LogoClouds from "../components/LogoClouds";
import ProductBanner from "../components/Products/ProductBanner";
import ServicesComponent from "../components/Services/ServicesComponent";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useEffect } from "react";
const Home = () => {
  const sets = useSelector(getAllSettings);
  const sliders = useSelector(getAllSliders);
  const status = useSelector(getStatus);
  useEffect(() => {
    console.log(sliders, "slider");
  }, []);
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    draggable: true,
    autoplay: true,
    autoplaySpeed: 7000,
  };
  return status == "pending" ? (
    <Loader />
  ) : (
    <div className="homeComponent">
      <Slider {...settings}>
        {sliders &&
          sliders.map((slider) => (
            <div className="cover h-[524px]  text-center relative w-full flex justify-center items-center">
              <img
                className="absolute top-0 left-0 h-full w-full  object-cover -z-10"
                src={`http://devserver298-001-site1.ctempurl.com/api/v1/files?filepath=${
                  slider.image && slider.image.filePath
                }`}
                alt=""
              />

              <div className="cover__content !flex !flex-col !items-center !justify-center  h-full w-full max-sm:w-full max-sm:px-1 ">
                <h1 className="font-bold text-white text-[38px] max-sm:text-[28px] max-sm:leading-2">
                  {sets &&
                    sets.find((s) => s.key === "banner1") &&
                    sets.find((s) => s.key === "banner1").value}
                </h1>
                <p className=" text-white sm:text-xl mt-6 max-sm:leading-8">
                  {sets &&
                    sets.find((s) => s.key === "banner2") &&
                    sets.find((s) => s.key === "banner2").value}
                </p>
              </div>
            </div>
          ))}
        {/* <div className="cover h-[524px]  text-center relative w-full flex justify-center items-center">
          <img
            className="absolute top-0 left-0 h-full w-full  object-cover -z-10"
            src={coverHomeSvg}
            alt=""
          />

          <div className="cover__content !flex !flex-col !items-center !justify-center  h-full w-full max-sm:w-full max-sm:px-1 ">
            <h1 className="font-bold text-white text-[38px] max-sm:text-[28px] max-sm:leading-2">
              {sets &&
                sets.find((s) => s.key === "banner1") &&
                sets.find((s) => s.key === "banner1").value}
            </h1>
            <p className=" text-white sm:text-xl mt-6 max-sm:leading-8">
              {sets &&
                sets.find((s) => s.key === "banner2") &&
                sets.find((s) => s.key === "banner2").value}
            </p>
          </div>
        </div>{" "} */}
      </Slider>
      {/* <div className="cover h-[524px]  text-center relative w-full flex justify-center items-center">
        <img
          className="absolute top-0 left-0 h-full w-full object-cover -z-10"
          src={coverHomeSvg}
          alt=""
        />

        <div className="cover__content   w-full max-sm:w-full max-sm:px-1 ">
          <h1 className="font-bold text-white text-[38px] max-sm:text-[28px] max-sm:leading-2">
            {sets &&
              sets.find((s) => s.key === "banner1") &&
              sets.find((s) => s.key === "banner1").value}
          </h1>
          <p className=" text-white sm:text-xl mt-6 max-sm:leading-8">
            {sets &&
              sets.find((s) => s.key === "banner2") &&
              sets.find((s) => s.key === "banner2").value}
          </p>
        </div>
      </div> */}
      <AboutComponent />
      <ServicesComponent />
      <ProductBanner />
      <ContactComponent />
      <LogoClouds />
    </div>
  );
};

export default Home;
