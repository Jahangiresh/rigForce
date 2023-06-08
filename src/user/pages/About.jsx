import React from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import ContactComponent from "../components/ContactComponent";
import LogoClouds from "../components/LogoClouds";
import { useSelector } from "react-redux";
import { getAllSettings } from "../../features/settingSlice";
import Loader from "../components/Loader/Loader";

const About = () => {
  const settings = useSelector(getAllSettings);
  return !settings ? (
    <Loader />
  ) : (
    <>
      <Breadcrumbs title={"Haqqımızda"} />
      <div className="container py-12">
        <div className="mb-12">
          <h1 className="text__black font-bold text-[28px] mb-3">Rig Force</h1>
          <p className="leading-8">
            {settings &&
              settings.find((s) => s.key === "haqqimizda") &&
              settings.find((s) => s.key === "haqqimizda").value}
          </p>
        </div>
        <div className="mb-12">
          <h1 className="text__black font-bold text-[28px] mb-3">
            Görüşlərimiz & Məqsədimiz
          </h1>
          <p className="leading-8">
            {settings &&
              settings.find((s) => s.key === "gorushlerimiz") &&
              settings.find((s) => s.key === "gorushlerimiz").value}
          </p>
        </div>
      </div>
      <ContactComponent />
      <LogoClouds />
    </>
  );
};

export default About;
