import { bill } from "../assets";
import styles, { layout } from "../style";

const Services = () => (
  <section id="Services" className={`${layout.sectionReverse} bg-slate-50 relative py-20`}>
    <div className={`flex-1 flex justify-center items-center md:mr-10 mr-0 md:mt-0 mt-10 relative`}>
      {/* Replaced neon gradients with subtle corporate backdrop for the image */}
      <div className="absolute z-[0] w-[80%] h-[80%] -left-1/4 top-0 rounded-[40px] bg-blue-100 opacity-50 transform rotate-6" />
      <img
        src={bill}
        alt="billing"
        className="w-[90%] h-[90%] relative z-[5] rounded-xl shadow-lg border border-slate-200"
      />
    </div>

    <div className={layout.sectionInfo}>
      <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-full border border-blue-100 mb-4 w-fit">
        <span className="font-poppins font-medium text-sm text-secondary uppercase tracking-widest">
          Our Services
        </span>
      </div>
      <h2 className={`${styles.heading2} text-4xl`}>
        We are a solution <br className="sm:block hidden" /> To Digital Problems
      </h2>
      <p className={`${styles.paragraph} max-w-[490px] mt-6 leading-relaxed`}>
        Digital Geeks is your one-stop-shop for all your technology needs. We
        offer a wide range of services, including custom software development,
        mobile app development, web development, e-commerce solutions, cloud
        computing, and Industrial Solutions.
      </p>
      <p className={`${styles.paragraph} max-w-[490px] mt-4 leading-relaxed`}>
        Our team of experts is committed to delivering cutting-edge and tailored 
        technological solutions that help our clients stay ahead of the curve. 
        Choose Digital Geeks and experience the power of technology.
      </p>

      <div className="flex flex-row flex-wrap sm:mt-10 mt-6 gap-4">
        <a href="#Contact" className="bg-secondary text-white font-poppins font-medium px-8 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-colors">
          Get in Touch
        </a>
      </div>
    </div>
  </section>
);

export default Services;
