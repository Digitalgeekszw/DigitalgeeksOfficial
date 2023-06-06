import { apple, bill, google } from "../assets";

import styles, { layout } from "../style";

const Services = () => (
  <section id="Services" className={layout.sectionReverse}>
    <div className={layout.sectionImgReverse}>
      <img
        src={bill}
        alt="billing"
        className="w-[100%] h-[100%] relative z-[5]"
      />

      {/* gradient start */}
      <div className="absolute z-[3] -left-1/2 top-0 w-[50%] h-[50%] rounded-full white__gradient" />
      <div className="absolute z-[0] w-[50%] h-[50%] -left-1/2 bottom-0 rounded-full pink__gradient" />
      {/* gradient end */}
    </div>

    <div className={layout.sectionInfo}>
      <h2 className={styles.heading2}>
        We are a solution <br className="sm:block hidden" /> To Digital Problems
      </h2>
      <p className={`${styles.paragraph} max-w-[490px] mt-10`}>
        Digital Geeks is your one-stop-shop for all your technology needs. We
        offer a wide range of services, including custom software development,
        mobile app development, web development, e-commerce solutions, cloud
        computing, and Industrial Solutions. Our team of experts is committed to
        delivering cutting-edge and tailored technological solutions that help
        our clients stay ahead of the curve. With our extensive industry
        knowledge and experience, we guarantee to provide the best possible
        results for your business. Choose Digital Geeks and experience the power
        of technology.
      </p>

      <div className="flex flex-row flex-wrap sm:mt-10 mt-6">
        {/* <img
          src={apple}
          alt="google_play"
          className="w-[128.86px] h-[42.05px] object-contain mr-5 cursor-pointer"
        />
        <img
          src={google}
          alt="google_play"
          className="w-[144.17px] h-[43.08px] object-contain cursor-pointer"
        /> */}
      </div>
    </div>
  </section>
);

export default Services;
