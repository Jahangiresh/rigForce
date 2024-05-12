import React, { useEffect } from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import ContactComponent from "../components/ContactComponent";
import LogoClouds from "../components/LogoClouds";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { createContact } from "../../features/contactSlice";
import { getAllSettings } from "../../features/settingSlice";
import Loader from "../components/Loader/Loader";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t, i18n } = useTranslation();
  const lang = localStorage.getItem("i18nextLng");
  const dispatch = useDispatch();
  const settings = useSelector(getAllSettings);
  useEffect(() => {
    console.log("setting", settings);
    // dispatch(settingFetch())
  }, []);

  return !settings ? (
    <Loader />
  ) : (
    <>
      <Breadcrumbs title={t("Əlaqə")} />

      <div className="container !my-12">
        <Formik
          initialValues={{
            fullName: "",
            email: "",
            phoneNumber: "",
            subject: "",
            messageText: "",
          }}
          onSubmit={(values) => {
            console.log("val", values);
            dispatch(createContact(values));
          }}
        >
          <Form className="grid lg:grid-cols-3 grid-cols-1">
            <div className="flex w-full lg:flex-col gap-y-4 justify-center max-lg:mb-10 max-lg:gap-x-2 max-sm:flex-col">
              <div className="border border-[#e3e3e3] shadow-lg px-10 py-5 lg:mr-10">
                <h3 className="font-bold text__black text-xl mb-5">
                  {t("Telefon")}:
                </h3>
                <p>
                  {" "}
                  {settings &&
                    settings.find((s) => s.key === "telefon1") &&
                    settings.find((s) => s.key === "telefon1").value}
                </p>
              </div>
              <div className="border border-[#e3e3e3] shadow-lg px-10 py-5 lg:mr-10">
                <h3 className="font-bold text__black text-xl mb-5">
                  {t("Email")}:
                </h3>
                <p>
                  {" "}
                  {settings &&
                    settings.find((s) => s.key === "mail") &&
                    settings.find((s) => s.key === "mail").value}
                </p>
              </div>
              <div className="border border-[#e3e3e3] shadow-lg px-10 py-5 lg:mr-10">
                <h3 className="font-bold text__black text-xl mb-5">
                  {t("Ünvan")}:
                </h3>
                <p>
                  {" "}
                  {settings &&
                    settings.find(
                      (s) =>
                        s.key === `${lang === "az" ? "unvan_az" : "unvan_eng"}`
                    ) &&
                    settings.find(
                      (s) =>
                        s.key === `${lang === "az" ? "unvan_az" : "unvan_eng"}`
                    ).value}
                </p>
              </div>
            </div>
            <div className="sm:col-span-2 max-sm:mb-6 sm:grid grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label
                  className="text__black font-bold mb-2"
                  htmlFor="fullName"
                >
                  {t("Ad & Soyad")}
                </label>
                <Field
                  type="text"
                  id="fullName"
                  name="fullName"
                  className="my__input"
                />
              </div>
              <div className="flex flex-col">
                <label className="text__black font-bold mb-2" htmlFor="email">
                  {t("Email")}
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="my__input"
                />
              </div>
              <div className="flex flex-col">
                <label
                  className="text__black font-bold mb-2"
                  htmlFor="phoneNumber"
                >
                  {t("Telefon")}
                </label>
                <Field
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  className="my__input"
                />
              </div>
              <div className="flex flex-col">
                <label className="text__black font-bold mb-2" htmlFor="subject">
                  {t("Mövzu")}
                </label>
                <Field
                  type="text"
                  id="subject"
                  name="subject"
                  className="my__input"
                />
              </div>
              <div className="col-span-2 flex flex-col">
                <label className="text__black font-bold mb-2" htmlFor="message">
                  {t("Mesaj")}
                </label>
                <Field
                  as="textarea"
                  className="resize-none my__input"
                  id="messageText"
                  name="messageText"
                  rows="10"
                  cols="30"
                />
                <div className="rail !w-full flex justify-end mt-3">
                  <button type="submit" className="btn__main !py-3 w-max">
                    {t("Göndər")}
                  </button>
                </div>
              </div>
            </div>
          </Form>
        </Formik>
      </div>
      <iframe
        src={
          settings &&
          settings.find((s) => s.key === "map") &&
          settings.find((s) => s.key === "map").value
        }
        style={{ width: "100%", height: "500px" }}
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
      <ContactComponent />
      <LogoClouds />
    </>
  );
};

export default Contact;
