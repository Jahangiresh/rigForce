import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import { useSelector } from "react-redux";
import { getAllPartners } from "../../features/partnerSlice";

const LogoClouds = () => {
  const logos = useSelector(getAllPartners);
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    draggable: true,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="h-[219px] py-10 overflow-y-hidden">
      <div className="container">
        <h1 className="text-center text__black font-bold text-[28px] ">
          Tərəfdaşlar
        </h1>
        <Slider {...settings} className="h-full mt-10">
          {logos &&
            logos.map((logo) => (
              <div className="px-4 h-[70px]">
                <img
                  className="h-full w-full  object-contain"
                  src={`http://devserver298-001-site1.ctempurl.com/api/v1/files?filepath=${logo.image.filePath}`}
                  alt="logo"
                />
              </div>
            ))}
        </Slider>
      </div>
    </div>
  );
};

export default LogoClouds;
