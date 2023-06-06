import React from "react";
import styles from "../style";
import Button from "./Button";

const CTA = () => {
  const handleButtonClicked = () => {
    window.open("https://www.linkedin.com/company/92799402/", "_blank");
  };

  return (
    <section
      className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} sm:flex-row flex-col bg-black-gradient-2 rounded-[20px] box-shadow`}>
      <div className="flex-1 flex flex-col">
        <h2 className={styles.heading2}>Try our service now!</h2>
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
          Let's Boost Your Business With The Latest Technology
        </p>
      </div>
      <div className={`${styles.flexCenter} sm:ml-10 ml-0 sm:mt-0 mt-10`}>
        <Button styles={`mt-10`} onClick={handleButtonClicked}>
          Try Now!
        </Button>
      </div>
    </section>
  );
};

export default CTA;
