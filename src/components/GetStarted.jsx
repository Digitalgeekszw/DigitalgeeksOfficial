import React, { useState } from "react";
import styles from "../style";
import { arrowUp } from "../assets";

const GetStarted = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    // Open the external site in a new tab
    window.open("https://www.linkedin.com/company/92799402", "_blank");
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className={`${styles.flexCenter} w-[140px] h-[140px] rounded-full bg-blue-gradient p-[2px] cursor-pointer`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <div
        className={`${styles.flexCenter} flex-col bg-primary w-[100%] h-[100%] rounded-full`}
        style={{ transform: isHovered ? "scale(1.1)" : "scale(1)" }}>
        <div className={`${styles.flexStart} flex-row`}>
          <p className="font-poppins font-medium text-[18px] leading-[23.4px]">
            <span className="text-gradient">Let's</span>
          </p>
          <img
            src={arrowUp}
            alt="arrow-up"
            className="w-[23px] h-[23px] object-contain"
          />
        </div>

        <p className="font-poppins font-medium text-[18px] leading-[23.4px]">
          <span className="text-gradient">Collaborate</span>
        </p>
      </div>
    </div>
  );
};

export default GetStarted;
