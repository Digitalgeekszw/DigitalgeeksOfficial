import { quotes } from "../assets";

const FeedbackCard = ({ content, name, title, img }) => (
  <div className="flex justify-between flex-col px-8 py-10 rounded-[32px] w-full max-w-[400px] border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 mx-auto">
    <div className="flex gap-2 text-yellow-400 mb-6 font-bold text-2xl">
      ★★★★★
    </div>
    <p className="font-poppins font-normal text-[18px] leading-[32px] text-slate-700 mb-10 flex-grow">
      "{content}"
    </p>

    <div className="flex flex-row items-center border-t border-slate-100 pt-6">
      <img src={img} alt={name} className="w-[50px] h-[50px] rounded-full object-cover border border-slate-200" />
      <div className="flex flex-col ml-4">
        <h4 className="font-poppins font-semibold text-[18px] leading-[24px] text-slate-900">
          {name}
        </h4>
        <p className="font-poppins font-normal text-[15px] leading-[24px] text-slate-500 mt-0.5">
          {title}
        </p>
      </div>
    </div>
  </div>
);


export default FeedbackCard;
