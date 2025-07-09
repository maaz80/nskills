import React, { useState } from "react";
import {
  Users,
  Monitor,
  Clock,
  DollarSign,
  Star,
  Zap,
  Award,
  Building,
  ChevronDown,
} from "lucide-react";

const ProgramsTable = () => {
  const programs = [
    {
      id: 0,
      name: "STANDARD",
      icon: <Monitor className="w-5 h-5" />,
      details: [
        { icon: <Users className="w-4 h-4" />, label: "Batch Size", value: "100" },
        { icon: <Monitor className="w-4 h-4" />, label: "Mode", value: "Recorded + Live" },
        { icon: <Clock className="w-4 h-4" />, label: "Duration", value: "3 months" },
        { icon: <DollarSign className="w-4 h-4" />, label: "Expected Earnings", value: "2-10 LPA" },
      ],
    },
    {
      id: 1,
      name: "PREMIUM",
      icon: <Star className="w-5 h-5" />,
      details: [
        { icon: <Users className="w-4 h-4" />, label: "Batch Size", value: "30" },
        { icon: <Zap className="w-4 h-4" />, label: "Mode", value: "Recorded + Live" },
        { icon: <Clock className="w-4 h-4" />, label: "Duration", value: "6 months" },
        { icon: <DollarSign className="w-4 h-4" />, label: "Expected Earnings", value: "4-12 LPA" },
      ],
    },
    {
      id: 2,
      name: "CLASSROOM (Gurgaon)",
      icon: <Building className="w-5 h-5" />,
      details: [
        { icon: <Users className="w-4 h-4" />, label: "Batch Size", value: "50" },
        { icon: <Award className="w-4 h-4" />, label: "Mode", value: "Classroom + Live + Recorded" },
        { icon: <Clock className="w-4 h-4" />, label: "Duration", value: "6 months" },
        { icon: <DollarSign className="w-4 h-4" />, label: "Expected Earnings", value: "4-20 LPA" },
      ],
    },
  ];

  const [selectedProgram, setSelectedProgram] = useState(programs[0]);

  // Tab Selection Component (replacing dropdown)
const TabSelection = () => (
  <div className="flex bg-gray-800 p-1 border border-gray-700 ">
    {programs.map((program, index) => (
      <button
        key={program.id}
        onClick={() => setSelectedProgram(program)}
        className={`flex-1 px-3 py-2 text-xs font-medium rounded-sm transition-all duration-300 ${
          selectedProgram.id === program.id
            ? "bg-gray-900 text-white shadow-md"
            : "bg-transparent text-gray-300 hover:text-white hover:bg-gray-700"
        }`}
      >
        {program.name.includes("CLASSROOM") ? "CLASSROOM" : program.name}
      </button>
    ))}
  </div>
);

  // Mobile View - Single Program with Tab Selection
  const MobileView = () => (
    <div className="w-full mx-auto p-4 lg:p-6 bg-gray-900 border border-gray-700 text-white shadow-2xl space-y-6 lg:hidden">
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out forwards;
        }
      `}</style>
      {/* Tab Selection replacing dropdown */}
      <TabSelection />

      {/* Program Details Table */}
      <div className="bg-gray-800 border border-gray-700 overflow-hidden shadow-xl">
        <div className="transition-all duration-500 ease-in-out">
          <table className="w-full">
            <tbody>
              {selectedProgram.details.map((detail, index) => (
                <tr key={index} className="opacity-0 animate-fadeIn flex items-center justify-between" style={{ animationDelay: `${index * 100}ms` }}>
                  <td className="px-2 lg:px-6 py-5 flex items-center gap-1 lg:gap-4 ">
                    <div className="text-whhite text-xs group-hover:text-blue-300 transition-colors duration-300">
                      {detail.icon}
                    </div>
                    <span className="text-gray-300 text-xs font-medium group-hover:text-white transition-colors duration-300">{detail.label}</span>
                  </td>
                  <td className="px-2 lg:px-6  text-right">
                    <span className="font-semibold text-xs rounded-xs text-white bg-gradient-to-r from-gray-700 to-gray-600 px-3 py-1 shadow-md group-hover:from-gray-600 group-hover:to-gray-500 transition-all duration-300">
                      {detail.value}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
            <button className="bg-white text-gray-900 px-3 py-1 rounded-xs mt-3 mb-4 float-right mr-2 font-semibold">Start Program</button>
          </table>
        </div>
      </div>
      <p className="text-gray-400 text-[9px] text-start font-medium">
        *Placement assurance subject to eligibility & performance.
      </p>
    </div>
  );

  // Desktop View - All 3 Programs Side by Side
  const DesktopView = () => (
    <div className="hidden lg:block w-full mx-auto ">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {programs.map((program) => (
          <div
            key={program.id}
            className="bg-gray-900 border border-gray-700 text-white shadow-2xl p-6 space-y-5 "
          >
            {/* Program Header */}
            <div className="flex items-center justify-between gap-3 pb-4 border-b border-gray-700">
              <div className="flex items-center gap-2">
                <div className="text-blue-400">
                {program.icon}
              </div>
              <h3 className="text-lg font-semibold text-white">{program.name}</h3>
              </div>
                <button className="bg-white text-gray-900 px-3 py-1 rounded-xs  font-semibold">Start Program</button>
            </div>

            {/* Program Details Table */}
            <div className="bg-gray-800 border border-gray-700 overflow-hidden shadow-xl h-[230px] px-3">
              <table className="w-full ">
                <tbody>
                  {program.details.map((detail, index) => (
                    <tr key={index}>
                      <td className=" py-4 flex items-center gap-3">
                        <div className="text-blue-400 transition-colors duration-300">
                          {detail.icon}
                        </div>
                        <span className="text-gray-300 font-medium text-sm">{detail.label}</span>
                      </td>
                      <td className=" py-4 text-right">
                        <span className="font-semibold rounded-xs text-white bg-gradient-to-r from-gray-700 to-gray-600 px-2 py-1 shadow-md text-sm">
                          {detail.value}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      {/* Note */}
      <div className="mt-6 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-400 border-opacity-50 p-4">
        <p className="text-gray-400 text-sm text-start font-medium">
          *Placement assurance subject to eligibility & performance.
        </p>
      </div>
    </div>
  );

  return (
    <>
      <MobileView />
      <DesktopView />
    </>
  );
};

export default ProgramsTable;