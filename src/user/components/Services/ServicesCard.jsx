import React from "react";
import servicesvg from "../../../assets/images/servicesvector.svg";
import { FiChevronRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAllServices } from "../../../features/serviceSlice";

const ServicesCard = () => {
  const navigate = useNavigate();
  const services = useSelector(getAllServices);

  return (
    <div className="grid md:grid-cols-3 gap-x-20 max-md:gap-y-10">
      {services &&
        services.slice(0, 3).map((service) => (
          <div className="flex flex-col items-center" key={service.id}>
            <div className="serviceimage w-[61px] h-[61px] mb-7">
              <img
                className="w-full h-full object-cover"
                src={`https://rigforce.az/api/v1/files?filepath=${service.images[0].filePath}`}
                alt=""
              />
            </div>
            <h2 className="text-white font-bold text-xl">{service.title}</h2>
            <p className="my-4 text-white text-center description-text">
              {service.description.length > 120
                ? service.description.substring(0, 119) + "..."
                : service.description}
            </p>
            <button
              onClick={() => navigate(`/services/${service.id}`)}
              className="btn__secondary flex items-center"
            >
              Daha ətraflı <FiChevronRight className="ml-2" />
            </button>
          </div>
        ))}
    </div>
  );
};

export default ServicesCard;
