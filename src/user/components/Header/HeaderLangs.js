import React from "react";
import { NavDropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { MdLanguage } from "react-icons/md";
import { GrLanguage } from "react-icons/gr";

const HeaderLangs = () => {
  const { t, i18n } = useTranslation();

  function clickLang(lang) {
    i18n.changeLanguage(lang);
  }
  return (
    <li className="lang__li flex items-center relative  h-full group  pl-4  ">
      <GrLanguage />
      <ul className="headerlangs hidden hover:!block group-hover:block ">
        <li
          className="headerlangs__li hover:underline cursor-pointer"
          onClick={() => clickLang("en")}
        >
          english
        </li>
        <li
          className="headerlangs__li hover:underline cursor-pointer"
          onClick={() => clickLang("az")}
        >
          azərbaycan
        </li>
      </ul>
    </li>
  );
};

export default HeaderLangs;
