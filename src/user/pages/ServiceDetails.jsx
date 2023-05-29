import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllServices } from "../../features/serviceSlice";
import Breadcrumbs from "../components/Breadcrumbs";
import ContactComponent from "../components/ContactComponent";
import LogoClouds from "../components/LogoClouds";

const ServiceDetails = () => {
  const services = useSelector(getAllServices);
  const params = useParams();
  const serviceId = params.id;
  let currentService;
  useEffect(() => {
    currentService = services.find((s) => s.id == serviceId);
  }, [services]);
  return (
    <>
      <Breadcrumbs title={"about"} />
      {currentService && currentService.title}sa
      <div className="container py-12">
        <div className="mb-12">
          <h1 className="text__black font-bold text-[28px] mb-3">Rig Force</h1>
          <p className="leading-8">
            Lorem ipsum dolor sit amet consectetur. Amet donec leo sit erat.
            Eleifend risus diam cursus dictum est Lorem ipsum dolor sit amet
            consectetur. Amet donec leo sit erat. Eleifend risus diam cursus
            dictum est Lorem ipsum dolor sit amet consectetur. Amet donec leo
            sit erat. Eleifend risus diam cursus dictum est Lorem ipsum dolor
            sit amet consectetur. Amet donec leo sit erat. Eleifend risus diam
            cursus dictum estLorem ipsum dolor sit amet consectetur. Amet donec
            leo sit erat. Eleifend risus diam cursus dictum est Lorem ipsum
            dolor sit amet consectetur. Amet donec leo sit erat. Eleifend risus
            diam cursus dictum est Lorem ipsum dolor sit amet consectetur. Amet
            donec leo sit erat. Eleifend risus diam cursus dictum est Lorem
            ipsum dolor sit amet consectetur. Amet donec leo sit erat. Eleifend
            risus diam cursus dictum est Lorem ipsum dolor sit amet consectetur.
            Amet donec leo sit erat. Eleifend risus diam cursus dictum est Lorem
            ipsum dolor sit amet consectetur. Amet donec leo sit erat. Eleifend
            risus diam cursus dictum estLorem ipsum dolor sit amet consectetur.
            Amet donec leo sit erat. Eleifend risus diam cursus dictum est Lorem
            ipsum dolor sit amet consectetur. Amet donec leo sit erat. Eleifend
            risus diam cursus dictum estLorem ipsum dolor sit amet consectetur
          </p>
        </div>
      </div>
      <ContactComponent />
      <LogoClouds />
    </>
  );
};

export default ServiceDetails;
