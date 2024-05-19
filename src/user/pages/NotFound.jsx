import React from "react";
import "./notfound.css";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="w-full h-full flex gap-x-3 flex-col items-center justify-center absolute top-0 right-0 bg-white z-50">
      <div className="scene flex !gap-x-5 ">
        <div className="box">
          <div className="box__face front">4</div>
          <div className="box__face back">0</div>
          <div className="box__face right">4</div>
          <div className="box__face left">0</div>
          <div className="box__face top">0</div>
          <div className="box__face bottom">0</div>
        </div>
        <div className="shadow"></div>
      </div>
      <div className="desc">
        <h2>Bu səhifə tapılmadı!</h2>
        <button>
          <Link to="/">ƏSAS SƏHİFƏYƏ QAYIT</Link>
        </button>
      </div>
    </div>
  );
};

export default NotFound;
