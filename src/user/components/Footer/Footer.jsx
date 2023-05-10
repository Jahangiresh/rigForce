import React from "react";
import { Link } from "react-router-dom";
import navmenu from "../../configs/navmenu";
const Footer = () => {
  return (
    <div className="bg__blue py-14">
      <div className="container">
        <div className=" flex justify-between gap-x-20 max-md:flex-col max-md:gap-y-10">
          <div className="basis-6/12">
            <h2 className="font-bold text-xl text-white">Mission</h2>
            <p className="text-justify text-white mt-3 leading-8 font-normal">
              Lorem ipsum dolor sit amet consectetur. Amet donec leo sit erat.
              Eleifend risus diam cursus dictum est Lorem ipsum dolor sit amet
              consectetur. Amet donec leo sit erat. Eleifend
            </p>
          </div>
          <div className="basis-3/12 md:pl-10">
            <h2 className="font-bold text-xl text-white">Menu</h2>
            <ul className="text-white flex flex-col mt-3 leading-8">
              {navmenu && navmenu.map((n) => <Link to={n.path}>{n.name}</Link>)}
            </ul>
          </div>
          <div className="basis-3/12">
            <h2 className="font-bold text-xl text-white">Contact Us</h2>
            <ul>
              <li>
                <p className="text-justify text-white mt-3 leading-7">
                  Adress: Lorem ipsum dolor sit amet consectetur. Amet donec leo
                  sit erat.
                </p>
              </li>
              <li className="text-white">Tel: +994 50 500 50 50</li>
              <li className="text-white">Tel: +994 50 500 50 50</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
