import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoSvg from "../../../assets/images/logo.svg";
import { FiChevronDown } from "react-icons/fi";
import MenuDrawer from "./MenuDrawer";
import { useSelector } from "react-redux";
import { getAllCategories } from "../../../features/categorySlice";
import HeaderLangs from "./HeaderLangs";
import { useTranslation } from "react-i18next";
import { getAllServiceCategories } from "../../../features/serviceCategorySlice";
const Header = () => {
  const { t } = useTranslation();
  const lang = localStorage.getItem("i18nextLng");
  const navigate = useNavigate();
  const categories = useSelector(getAllCategories);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const serviceCategories = useSelector(getAllServiceCategories);

  const navigateHandler = (catId) => {
    navigate(`/products/${catId}`);
  };

  const filterCategoriesByLanguage = () => {
    const filteredData = categories.filter((value) =>
      value.title.endsWith(`_${lang}`)
    );
    setFilteredCategories([...filteredData]);
  };

  useEffect(() => {
    filterCategoriesByLanguage();
  }, [lang]);

  return (
    <div className="h-20  flex items-center">
      {/* <h1>{t(`${s}`)}</h1> */}
      <div className="container h-full  ">
        <div className="grid grid-cols-2 max-lg:grid-cols-3 w-full h-full">
          <div className="logo h-full flex items-center ">
            <Link to="/">
              <img className="w-[60px] h-[60px]" src={logoSvg} alt="" />
            </Link>
          </div>
          <dir className="sm:hidden flex items-center w-full col-span-2 justify-end">
            <MenuDrawer />
          </dir>
          <nav className=" flex items-center max-lg:col-span-2 max-sm:hidden h-full">
            <ul className="flex  justify-between w-full capitalize h-full ">
              <Link
                className="flex items-center relative  h-full group "
                to="/"
              >
                {t("Əsas səhifə")}
              </Link>
              <Link
                className="flex items-center relative  h-full group "
                to="/about"
              >
                {t("Haqqımızda")}
              </Link>
              <Link
                className="flex items-center relative  h-full group "
                to="/services"
              >
                {t("Xidmətlər")}
                <FiChevronDown className={`ml-2 `} />
                <div
                  className={` border-t-blue-500 absolute w-max px-5 py-3  h-max  border bg-white border-[#e3e3e3] top-[100%] left-0 hidden group-hover:block hover:!block z-20`}
                >
                  <ul>
                    {serviceCategories &&
                      serviceCategories.map((scategory) => (
                        <Link
                          key={scategory.id}
                          // onClick={(e) => navigateHandler2(scategory.id)}
                          to={`/services/${scategory.id}`}
                          className="transition-all  duration-200 hover:text-[#3a85ad] flex flex-col  mb-3 cursor-pointer"
                        >
                          {scategory.title}
                        </Link>
                      ))}
                  </ul>
                </div>
              </Link>
              <li className="flex items-center relative  h-full group ">
                <Link to="/products">{t("Məhsullar")}</Link>
                <FiChevronDown className={`ml-2 `} />
                <div
                  className={` border-t-blue-500 absolute w-max px-5 py-3  h-max  border bg-white border-[#e3e3e3] top-[100%] left-0 hidden group-hover:block hover:!block z-20`}
                >
                  <ul>
                    {categories &&
                      categories.map((category) => (
                        <li
                          onClick={(e) => navigateHandler(category.id)}
                          className="transition-all  duration-200 hover:text-[#3a85ad]  mb-3 cursor-pointer"
                        >
                          {category.title}
                        </li>
                      ))}
                  </ul>
                </div>
              </li>
              <Link
                className="flex items-center relative  h-full group "
                to="/contact"
              >
                {t("Əlaqə")}
              </Link>
              <HeaderLangs />
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
