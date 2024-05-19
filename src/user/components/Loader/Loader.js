import React from "react";
import "./loader.css";
const Loader = () => {
  return (
    <div className="flex w-full h-full items-center justify-center absolute top-0 left-0 bg-white z-[100]">
      <div className="loader">
        <p>Rig Force</p>
        <div className="words">
          <span className="word">keyfiyyət</span>
          <span className="word">innovasiya</span>
          <span className="word">davamlılıq</span>
          <span className="word">inkişaf</span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
