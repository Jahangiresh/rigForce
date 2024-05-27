import React, { useEffect, useState } from "react";
import servicesvg from "../../../assets/images/servicesvector.svg";
import { FiChevronRight } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAllServices } from "../../../features/serviceSlice";
import Slider from "react-slick";

const ServicesCard = () => {
  const navigate = useNavigate();
  const services = useSelector(getAllServices);
  const [serviceList, setServiceList] = useState([]);
  const lang = localStorage.getItem("i18nextLng");

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <></>,
    prevArrow: <></>,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: false,
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
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    const filterByLanguage = services.filter((service) =>
      service.title.endsWith(`_${lang ? lang : "en"}`)
    );
    setServiceList(filterByLanguage);
  }, [services, lang]);

  return (
    <Slider {...settings}>
      {serviceList &&
        serviceList.map((service) => (
          <div className="flex flex-col " key={service.id}>
            <div className="serviceimage w-full h-52 mb-7">
              <img
                className="w-full h-full object-fill"
                src={`https://rigforce.az/api/v1/files?filepath=${service.images[0].filePath}`}
                alt=""
              />
            </div>
            <Link to={`/service/${service?.id}`}>
              <h2 className="text-white font-bold text-xl hover:text-amber-400">
                {service.title.endsWith("_az") || service.title.endsWith("_en")
                  ? service.title.slice(0, -3)
                  : service.title}
              </h2>
            </Link>
            {/* <p className="my-4 text-white text-center description-text">
              {service.description.length > 120
                ? service.description.substring(0, 119) + "..."
                : service.description}
              ~
            </p> */}
          </div>
        ))}
    </Slider>
  );
};

export default ServicesCard;
