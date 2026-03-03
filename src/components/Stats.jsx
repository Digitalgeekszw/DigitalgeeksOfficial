import { stats } from "../constants";
import styles from "../style";

const Stats = () => (
  <section className="flex flex-row flex-wrap justify-center border-y border-slate-100 py-10 bg-white sm:mb-20 mb-6">
    {stats.map((stat, index) => (
      <div key={stat.id} className={`flex-1 flex justify-center items-center flex-col sm:flex-row m-3 ${index !== stats.length - 1 ? 'sm:border-r border-slate-200 sm:pr-10' : ''}`} >
        <h4 className="font-poppins font-semibold text-[40px] text-slate-900 leading-[1.2]">
          {stat.value}
        </h4>
        <p className="font-poppins font-medium text-[16px] text-slate-500 uppercase ml-0 sm:ml-4 mt-2 sm:mt-0 tracking-wider">
          {stat.title}
        </p>
      </div>
    ))}
  </section>
);

export default Stats;
