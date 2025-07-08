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
import Dropdown from "./Dropdown";

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
    <div className="w-full mx-auto p-4 lg:p-6 nav-bgcolor border border-gray-700 text-white shadow-2xl space-y-6  lg:hidden">
      {/* Dropdown Header */}
      <Dropdown
        items={programs}
        selectedItem={selectedProgram}
        onSelect={(program) => setSelectedProgram(program)}
      />



      {/* Program Details Table */}
      <div className="bg-primary border border-gray-700 overflow-hidden shadow-xl">
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
                  <span className="font-semibold text-xs text-white bg-gradient-to-r from-gray-700 to-gray-600 px-3 py-1 shadow-md group-hover:from-gray-600 group-hover:to-gray-500 transition-all duration-300">
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
            className="nav-bgcolor border border-gray-700 text-white shadow-2xl p-6 space-y-5 "
          >
            {/* Program Header */}
            <div className="flex items-center gap-3 pb-4 border-b border-gray-700">
              <div className="text-blue-400">
                {program.icon}
              </div>
              <h3 className="text-lg font-semibold text-white">{program.name}</h3>
            </div>

            {/* Program Details Table */}
            <div className="bg-primary border border-gray-700 overflow-hidden shadow-xl h-[230px] px-3">
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
                        <span className="font-semibold text-white bg-gradient-to-r from-gray-700 to-gray-600 px-2 py-1 shadow-md text-sm">
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
      <div className="mt-6 bg-primary border border-gray-700 border-opacity-50 p-4">
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