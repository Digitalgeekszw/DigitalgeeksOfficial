import styles from "../style";
import { logo } from "../assets"; // Make sure logo works on dark background
import { footerLinks, socialMedia } from "../constants";

const Footer = () => (
  <section
    id="Contact"
    className={`${styles.flexCenter} ${styles.paddingY} flex-col bg-slate-900 px-6 sm:px-16`}>
    <div className={`${styles.flexStart} md:flex-row flex-col mb-8 w-full max-w-[1280px]`}>
      <div className="flex-[1] flex flex-col justify-start mr-10">
        <img
          src={logo}
          alt="DigitalGeeks Logo"
          className="w-[266px] h-[72.14px] object-contain opacity-90"
        />
        <p className={`font-poppins font-normal text-slate-400 text-[16px] leading-[28px] mt-4 max-w-[312px]`}>
          Empowering innovation, driving excellence through collaboration. Let's build the future.
        </p>
      </div>

      <div className="flex-[1.5] w-full flex flex-row justify-between flex-wrap md:mt-0 mt-10">
        {footerLinks.map((footerlink) => (
          <div
            key={footerlink.title}
            className={`flex flex-col ss:my-0 my-4 min-w-[150px]`}>
            <h4 className="font-poppins font-semibold text-[18px] leading-[27px] text-white">
              {footerlink.title}
            </h4>
            <ul className="list-none mt-4">
              {footerlink.links.map((link, index) => (
                <li
                  key={link.name}
                  className={`font-poppins font-normal text-[15px] leading-[24px] text-slate-400 hover:text-white cursor-pointer transition-colors ${
                    index !== footerlink.links.length - 1 ? "mb-3" : "mb-0"
                  }`}
                  onClick={() => window.open(link.link)}
                >
                  {link.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>

    <div className="w-full max-w-[1280px] flex justify-between items-center md:flex-row flex-col pt-6 border-t-[1px] border-t-slate-800">
      <p className="font-poppins font-normal text-center text-[15px] leading-[27px] text-slate-400">
        © {new Date().getFullYear()} DigitalGeeks. All Rights Reserved.
      </p>

      <div className="flex flex-row md:mt-0 mt-6 gap-6">
        {socialMedia.map((social) => (
          <img
            key={social.id}
            src={social.icon}
            alt={social.id}
            className="w-[21px] h-[21px] object-contain cursor-pointer opacity-70 hover:opacity-100 transition-opacity filter invert"
            style={{ filter: "brightness(0) invert(1)" }} 
            onClick={() => window.open(social.link)}
          />
        ))}
        {/* Style note: forced invert filter for icons assuming original assets were dark/colored vs requested solid white icons on dark slate background */}
      </div>
    </div>
  </section>
);

export default Footer;
