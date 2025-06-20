import CourseBG from "./CourseBG.jpg";
import { GoArrowRight, GoPeople, GoClock } from "react-icons/go";

export default function AIStreamCard() {
  return (
    <div className="group relative w-full md:max-w-[340px] bg-transparent shadow-lg overflow-hidden border border-gray-700 hover:shadow-xl transition-shadow duration-300">
      {/* Light Strip */}
      {/* <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -left-[150%] top-0 w-[50%] h-[300%] bg-gradient-to-tr from-transparent via-white/30 to-transparent rotate-45 group-hover:animate-lightstrip"></div>
      </div> */}
 {/* Light sweep effect overlay */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 z-10 pointer-events-none"></div>

      {/* Image Section */}
      <div className="relative h-48 bg-gray-100 overflow-hidden">
        <img src={CourseBG} alt="AI Technology" className="w-full h-full object-cover" />
        <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center">
          <div className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse"></div>
          LIVE
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        <h2 className="text-lg font-bold mb-2 leading-tight">Streams for New Era of AI</h2>
        <p className="text-xs lg:text-sm mb-1 font-medium">Title Subtitle</p>
        <p className="text-xs lg:text-sm mb-4 leading-relaxed">
          Join us for an exclusive deep dive into the revolutionary developments in artificial intelligence. Discover cutting-edge technologies, breakthrough innovations, and what the future holds for AI integration.
        </p>

        {/* Stream Details */}
        <div className="flex items-center justify-between space-x-4 text-xs lg:text-sm">
          <div className="flex items-center gap-3">
            <div className="flex items-center">
              <GoPeople className="w-3 h-3 mr-1" />
              <span>2.3K watching</span>
            </div>
            <div className="flex items-center">
              <GoClock className="w-3 h-3 mr-1" />
              <span>Started 1h ago</span>
            </div>
          </div>
          <button className="w-10 h-10 hover:scale-102 active:scale-98 cursor-pointer bg-black text-white rounded-full flex items-center justify-center transition-colors duration-200 shadow-md hover:shadow-lg">
            <GoArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
