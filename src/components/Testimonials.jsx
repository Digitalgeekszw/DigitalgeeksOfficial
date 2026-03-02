// import { feedback } from "../constants";
import styles from "../style";
// import FeedbackCard from "./FeedbackCard";

const Testimonials = () => (
  <section
    id="clients"
    className={`${styles.paddingY} ${styles.flexCenter} flex-col relative bg-slate-50 py-24`}>
    
    <div className="w-full flex justify-between items-center md:flex-row flex-col sm:mb-16 mb-6 relative z-[1] max-w-[1280px] px-6 sm:px-16">
      <div className="flex-1">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-full border border-blue-100 mb-4 w-fit">
            <span className="font-poppins font-medium text-sm text-secondary uppercase tracking-widest">
              Leadership
            </span>
        </div>
        <h2 className={`${styles.heading2} text-4xl`}>
          Our Leading
          <br className="sm:block hidden" />
          Team
        </h2>
      </div>
      
      <div className="flex-1 md:mt-0 mt-6 md:pl-10">
        <p className={`${styles.paragraph} text-left max-w-[550px]`}>
          United in purpose, bound by a shared vision, our team stands ready to
          conquer challenges, ignite innovation, and achieve extraordinary
          results. Together, we embody the power of collaboration, the strength
          of diverse perspectives, and the unwavering commitment to excellence.
        </p>
      </div>
    </div>

    {/* Team grid would go here if uncommented. For now we just styled the header block. */}
    {/* <div className="flex flex-wrap sm:justify-start justify-center w-full feedback-container relative z-[1] max-w-[1280px] px-6 sm:px-16">
      {feedback.map((card) => (
        <FeedbackCard key={card.id} {...card} />
      ))}
    </div> */}
  </section>
);

export default Testimonials;
