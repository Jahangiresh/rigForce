import React from "react";
import { Link } from "react-router-dom";
import logoSvg from "../../../assets/images/logo.svg";
import navmenu from "../../configs/navmenu";
import { FiChevronDown } from "react-icons/fi";
import MenuDrawer from "./MenuDrawer";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories, getStatus } from "../../../features/categorySlice";

const Header = () => {
  const categories = useSelector(getAllCategories);
  const status = useSelector(getStatus);
  const dispatch = useDispatch();
  return (
    <div className="h-20  flex items-center">
      <div className="container  ">
        <div className="grid grid-cols-2 max-lg:grid-cols-3 w-full">
          <div className="logo ">
            <img className="w-[60px] h-[60px]" src={logoSvg} alt="" />
          </div>
          <dir className="sm:hidden flex items-center w-full col-span-2 justify-end">
            <MenuDrawer />
          </dir>
          <nav className=" flex items-center max-lg:col-span-2 max-sm:hidden">
            <ul className="flex  justify-between w-full capitalize ">
              {navmenu &&
                navmenu.map((nav) => (
                  <Link
                    key={nav.id}
                    className="flex items-center relative  h-full group "
                    to={nav.path}
                  >
                    {nav.name}{" "}
                    <FiChevronDown
                      className={`ml-2 ${!nav.hasAccordion ? "hidden" : ""}`}
                    />
                    <div
                      className={`${
                        !nav.hasAccordion ? "!hidden" : ""
                      } absolute w-full h-32 bg-red-500 top-[100%] left-0 hidden group-hover:block hover:!block z-20`}
                    ></div>
                  </Link>
                ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
