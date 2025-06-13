import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ImBooks } from 'react-icons/im';
import { FaCheck } from 'react-icons/fa';
import { TfiWrite } from 'react-icons/tfi';
import { LiaCoinsSolid } from 'react-icons/lia';
import { PiTargetBold } from 'react-icons/pi';
import { GoTrophy } from 'react-icons/go';

const timelineSteps = [
  {
    id: 1,
    title: "Enroll in our Scholarship",
    subtitle: "& Selection Test",
    description: "(Upto 90% Scholarship)",
    icon: <ImBooks />,
    bgColor: "bg-black"
  },
  {
    id: 2,
    title: "Qualify in Scholarship",
    subtitle: "& Selection Test",
    description: "",
    icon: <FaCheck />,
    bgColor: "bg-black"
  },
  {
    id: 3,
    title: "Register in 100% ",
    subtitle: "Placement Assurance Program",
    description: "",
    icon: <TfiWrite />,
    bgColor: "bg-black"
  },
  {
    id: 4,
    title: "Pay Your Remaining Fee",
    subtitle: "After Scholarship Discount",
    description: "Pay only after placement",
    icon: <LiaCoinsSolid />,
    bgColor: "bg-black"
  },
  {
    id: 5,
    title: "Start the Course & Make Sure to have",
    subtitle: "80% Marks in Assignments",
    description: "as well as Attendance in Program",
    icon: <PiTargetBold />,
    bgColor: "bg-black"
  },
  {
    id: 6,
    title: "Complete the Course",
    subtitle: "& Start Earning",
    description: "",
    icon: <GoTrophy />,
    bgColor: "bg-black"
  }
];

const JourneyTimeline = () => {
    useEffect(()=>{
        window.scrollTo(0, 0);
    })
  return (
    <div className="min-h-screen bg-black p-4 lg:p-8">
      {/* Header */}
      <div className="text-start mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-6xl font-semibold text-white mb-2 lg:mb-4"
        >
          Journey to Earnings
        </motion.h1>
      </div>

      {/* Timeline Container */}
      <div className="w-full">
        {/* Desktop Timeline */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Icon Connection Line */}
            <div className="absolute top-8 left-0 right-8 h-1 bg-gray-600 w-full "></div>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "calc(100% - 4rem)" }}
              transition={{ duration: 2, delay: 0.5 }}
              className="absolute top-8 left-0 w-full h-1 bg-white/20"
            ></motion.div>

            {/* Timeline Steps */}
            <div className="relative flex justify-between items-start">
              {timelineSteps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                  className="flex flex-col items-center max-w-xs relative"
                >
                  {/* Icon Circle */}
                  <div className={`${step.bgColor} w-16 h-16 rounded-full flex items-center justify-center text-2xl shadow-lg border-4 border-white/70 z-10 mb-4 bg-primary`}>
                    {step.icon}
                  </div>
                  
                  {/* Connecting Line from Icon to Box */}
                  <div className="w-px h-12 bg-gray-400 mb-4"></div>
                  
                  {/* Content Card */}
                  <div className="bg-white/10 backdrop-blur-md p-4 text-center shadow-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                    <h3 className="text-white font-bold text-sm mb-2 leading-tight">
                      {step.title}
                    </h3>
                    <p className="text-blue-200 text-xs mb-2 font-medium">
                      {step.subtitle}
                    </p>
                    <p className="text-gray-300 text-xs">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Timeline */}
        <div className="lg:hidden -mt-8">
          <div className="relative">
            {/* Vertical Progress Line */}
            <div className="absolute left-6.5 top-0 bottom-0 w-1 bg-gray-600"></div>
            <motion.div 
              initial={{ height: 0 }}
              animate={{ height: "100%" }}
              transition={{ duration: 2, delay: 0.5 }}
              className="absolute left-6.5 top-0 w-1 bg-white/20"
            ></motion.div>

            {/* Mobile Steps */}
            <div className="space-y-8">
              {timelineSteps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                  className="flex items-start"
                >
                  {/* Icon Circle */}
                  <div className={`${step.bgColor} w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-lg border-4 border-white/70 z-10 flex-shrink-0 bg-primary`}>
                    {step.icon}
                  </div>
                  
                  {/* Content Card */}
                  <div className="ml-6 bg-white/10 backdrop-blur-md p-3 shadow-xl border border-white/20 hover:bg-white/20 transition-all duration-300 flex-1">
                    <h3 className="text-white font-bold text-lg mb-2">
                      {step.title}
                    </h3>
                    <p className="text-blue-200 text-sm mb-2 font-medium">
                      {step.subtitle}
                    </p>
                    <p className="text-gray-300 text-sm">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

     {/* Bottom Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.5 }}
        className="mt-16"
      >
        <div className="bg-white/10 backdrop-blur-md  p-4 lg:p-6 border border-white/20">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-xl lg:text-2xl font-semibold text-white">Does Our Programs Look Expensive?</h2>
            <div className="hidden bg-black text-white w-36 h-8 text-xs lg:text-sm font-medium lg:flex items-center justify-center hover:scale-102 active:scale-98 transition-all duration-300 cursor-pointer">
              Apply Now →
            </div>
          </div>
          
          <div className="space-y-4 text-left">
            <div className="flex items-start">
              <span className="text-green-400 mr-3 text-sm lg:text-lg">✓</span>
              <div>
                <p className="text-white text-sm lg:text-base font-medium">Apply for our Scholarship & Selection Test</p>
                <p className="text-blue-200 text-xs lg:text-sm">& Get UFP 30% Scholarship</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <span className="text-green-400 mr-3 text-sm lg:text-lg">✓</span>
              <div>
                <p className="text-white text-sm lg:text-base font-medium">Scholarship & Selection Test consists of 10 MCQ & 2 Coding Questions</p>
                <p className="text-blue-200 text-xs lg:text-sm">From Attitude, Aptitude, Computer Fundamentals, & C Programming</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <span className="text-green-400 mr-3 text-sm lg:text-lg">✓</span>
              <p className="text-white text-sm lg:text-base font-medium">You can start preparation for this test from our Free YouTube Course (CSETO)</p>
            </div>
          </div>
             <div className="lg:hidden bg-black border border-white text-white w-full mt-6 h-8 text-xs lg:text-sm font-medium flex items-center justify-center hover:scale-102 active:scale-98 transition-all duration-300 cursor-pointer">
              Apply Now →
            </div>
        </div>
      </motion.div>
    </div>
  );
};

export default JourneyTimeline;