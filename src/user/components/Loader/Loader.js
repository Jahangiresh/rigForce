import React from "react";
import "./loader.css";
const Loader = () => {
  return (
    <div className="flex w-full h-full items-center justify-center absolute top-0 left-0 bg-white z-[100]">
      <div class="loader">
        <p>Rig Force</p>
        <div class="words">
          <span class="word">keyfiyyət</span>
          <span class="word">innovasiya</span>
          <span class="word">davamlılıq</span>
          <span class="word">inkşaf</span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
