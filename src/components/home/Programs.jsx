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
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Mobile View - Single Program with Dropdown
  const MobileView = () => (
    <div className="w-full mx-auto p-4 lg:p-6 nav-bgcolor border border-gray-700 text-white shadow-2xl space-y-6 rounded-xl lg:hidden">
      {/* Dropdown Header */}
      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="w-full flex items-center justify-between nav-bgcolor/50 border border-gray-600 px-5 py-4 text-sm font-semibold hover:from-gray-700 hover:to-gray-600 transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl transform cursor-pointer active:scale-95 ease-in-out"
        >
          <div className="flex items-center gap-3">
            <div className="text-blue-400">
              {selectedProgram.icon}
            </div>
            <span className="text-white">
              {selectedProgram.name}
            </span>
          </div>
          <ChevronDown
            className={`w-5 h-5 transition-all duration-300 text-gray-400 ${
              dropdownOpen ? "rotate-180 text-blue-400" : ""
            }`}
          />
        </button>

        <div
          className={`absolute left-0 mt-2 w-full bg-primary border border-gray-600 overflow-hidden shadow-2xl rounded-lg transition-all duration-300 ease-in-out z-20
            ${dropdownOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"}
          `}
        >
          {programs.map((program) => (
            <button
              key={program.id}
              onClick={() => {
                setSelectedProgram(program);
                setDropdownOpen(false);
              }}
              className={`w-full text-sm text-left px-5 py-4 flex items-center gap-3 hover:nav-bgcolor transition-all duration-300 ${
                program.id === selectedProgram.id ? "nav-bgcolor border-l-4 border-white " : ""
              }`}
            >
              <div className="text-blue-400">{program.icon}</div>
              <span className="font-medium">{program.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Program Details Table */}
      <div className="bg-primary border border-gray-700 rounded-xl overflow-hidden shadow-xl">
        <table className="w-full">
          <tbody>
            {selectedProgram.details.map((detail, index) => (
              <tr key={index}>
                <td className="px-2 lg:px-6 py-5 flex items-center gap-1 lg:gap-4">
                  <div className="text-blue-400 text-xs group-hover:text-blue-300 transition-colors duration-300">
                    {detail.icon}
                  </div>
                  <span className="text-gray-300 text-xs font-medium group-hover:text-white transition-colors duration-300">{detail.label}</span>
                </td>
                <td className="px-2 lg:px-6  text-right">
                  <span className="font-semibold text-xs text-white bg-gradient-to-r from-gray-700 to-gray-600 px-3 py-1 rounded-lg shadow-md group-hover:from-gray-600 group-hover:to-gray-500 transition-all duration-300">
                    {detail.value}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        <p className="text-gray-400 text-[9px] text-start font-medium">
          *Placement assurance subject to eligibility & performance.
        </p>

      {/* Note */}
      {/* <div className="bg-primary border border-gray-700 border-opacity-50 rounded-lg p-4">
      </div> */}
    </div>
  );

  // Desktop View - All 3 Programs Side by Side
  const DesktopView = () => (
    <div className="hidden lg:block w-full mx-auto ">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {programs.map((program) => (
          <div
            key={program.id}
            className="nav-bgcolor border border-gray-700 text-white shadow-2xl rounded-xl p-6 space-y-5 "
          >
            {/* Program Header */}
            <div className="flex items-center gap-3 pb-4 border-b border-gray-700">
              <div className="text-blue-400">
                {program.icon}
              </div>
              <h3 className="text-lg font-semibold text-white">{program.name}</h3>
            </div>

            {/* Program Details Table */}
            <div className="bg-primary border border-gray-700 rounded-xl overflow-hidden shadow-xl h-[230px] px-3">
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
                        <span className="font-semibold text-white bg-gradient-to-r from-gray-700 to-gray-600 px-2 py-1 rounded-lg shadow-md text-sm">
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
      <div className="mt-6 bg-primary border border-gray-700 border-opacity-50 rounded-lg p-4">
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