import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ImBooks } from 'react-icons/im';
import { FaCheck } from 'react-icons/fa';
import { TfiWrite } from 'react-icons/tfi';
import { LiaCoinsSolid } from 'react-icons/lia';
import { PiStudentDuotone, PiTargetBold } from 'react-icons/pi';
import { GoTrophy } from 'react-icons/go';
import { FaArrowRightLong } from 'react-icons/fa6';

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
    description: "",
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
          className="page-heading mb-2 lg:mb-4"
        >
          JOURNEY TO EARNINGS
        </motion.h1>
      </div>

      {/* Timeline Container */}
      <div className="w-full">
        {/* Desktop Timeline */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Icon Connection Line */}
            <div className='absolute top-0 left-0 w-16 h-16 rounded-full flex items-center justify-center text-2xl shadow-lg border-4 border-white/50 z-10 mb-4 bg-primary'><PiStudentDuotone /></div>
            <div className="absolute top-8 left-0 right-8 h-1 bg-gray-600 w-full "></div>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "calc(100% - 0rem)" }}
              transition={{ duration: 2, delay: 0.5 }}
              className="absolute top-8 left-0 w-full h-1 bg-white/20"
            ></motion.div>

            {/* Timeline Steps */}
            <div className="relative flex justify-between items-start ml-10">
              {timelineSteps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                  className="flex flex-col items-center max-w-xs relative"
                >
                  {/* Icon Circle */}
                  <div className={`${step.bgColor} w-16 h-16 rounded-full flex items-center justify-center text-2xl shadow-lg border-4 border-white/50 z-10 mb-4 bg-primary`}>
                    {step.icon}
                  </div>
                  
                  {/* Connecting Line from Icon to Box */}
                  <div className="w-px h-12 bg-gray-400 mb-4"></div>
                  
                  {/* Content Card */}
                  <div className="heading-color bg-white/10 backdrop-blur-md flex flex-col items-center justify-start pt-7 px-3 w-[230px] h-36 text-center shadow-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                    <h3 className="font-semibold text-base mb-2 leading-tight">
                      {step.title}
                    </h3>
                    <p className="text-sm mb-2 font-medium">
                      {step.id !== 4 && step.id !== 6 ? step.subtitle : ""}
                    </p>
                    <p className={`text-[12px] ${step.id === 4 || step.id === 6 ? '-mt-3' :'mt-0'}`}>
                      {step.id === 1 && step.description ? (
                        <span className="text-purple-500 text-sm">
                          {step.description}
                        </span>
                      ) : step.id === 4 && step.subtitle ? (
                        <>After <span className="text-purple-500 text-sm">Scholarship Discount</span></>
                      ) : step.id === 6 && step.subtitle ? (
                        <>& <span className="text-purple-500 text-sm">Start Earning</span></>
                      ) : (
                        step.description
                      )}
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
            {/* <div className='w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-lg border-4 border-white/50 z-50 flex-shrink-0 bg-primary'><PiStudentDuotone /></div> */}
            <div className="absolute left-6.5 top-0 bottom-0 w-1 bg-gray-600"></div>
            <motion.div 
              initial={{ height: 0 }}
              animate={{ height: "100%" }}
              transition={{ duration: 2, delay: 0.5 }}
              className="absolute left-6.5 top-0 w-1 bg-white/20"
            ></motion.div>

            {/* Mobile Steps */}
            <div className="space-y-8 mt-16">
              {timelineSteps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                  className="flex items-start"
                >
                  {/* Icon Circle */}
                  <div className={`${step.bgColor} w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-lg border-4 border-white/50 z-10 flex-shrink-0 bg-primary`}>
                    {step.icon}
                  </div>
                  
                  {/* Content Card */}
                  <div className="relative ml-6 bg-zinc-900 backdrop-blur-md p-3 shadow-xl  hover:bg-white/20 transition-all duration-300 flex-1 heading-color z-20">
                    <h3 className="font-semibold text-lg mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm mb-2 font-medium">
                      {step.id !== 4 && step.id !== 6 ? step.subtitle : ""}
                    </p>
                    <p className={`text-sm ${step.id === 4 || step.id === 6 ? 'mt-0' :'mt-0'}`}>
                      {step.id === 1 && step.description ? (
                        <span className="text-purple-500 text-base">
                          {step.description}
                        </span>
                      ) : step.id === 4 && step.subtitle ? (
                        <>After <span className="text-purple-500 text-sm">Scholarship Discount</span></>
                      ) : step.id === 6 && step.subtitle ? (
                        <>& <span className="text-purple-500 text-sm">Start Earning</span></>
                      ) : (
                        step.description
                      )}
                    </p>
                    <span className="absolute bg-zinc-900 w-3 h-3 -left-1.5 top-2 z-10 rotate-45"></span>
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
            <h2 className="page-heading ">DOES OUR PROGRAMS LOOKS EXPENSIVE?</h2>
            <div className="hidden border border-heading-color bg-black heading-color w-36 h-8 text-xs lg:text-sm font-medium lg:flex items-center justify-center hover:scale-102 active:scale-98 transition-all duration-300 cursor-pointer">
              Apply Now →
            </div>
          </div>
          
          <div className="space-y-4 text-left">
            <div className="flex items-start">
              <span className="text-green-400 mr-3 text-sm lg:text-lg">✓</span>
              <div>
                <p className="heading-color text-sm lg:text-base font-medium">Apply for our Scholarship & Selection Test</p>
                <p className="heading-color  text-xs lg:text-sm">& Get Upto <span className='text-sm text-purple-500'>90% Scholarship</span></p>
              </div>
            </div>
            
            <div className="flex items-start">
              <span className="text-green-400 mr-3 text-sm lg:text-lg">✓</span>
              <div>
                <p className="heading-color text-sm lg:text-base font-medium">Scholarship & Selection Test consists of 10 MCQ & 2 Coding Questions</p>
                <p className="heading-color text-xs lg:text-sm">From Aptitude, Computer Fundamentals, & C Programming</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <span className="text-green-400 mr-3 text-sm lg:text-lg">✓</span>
              <div className="heading-color text-sm lg:text-base font-medium gap-1">You can start preparation for this test from our <span className='text-purple-500'>Free YouTube Course</span> <button className='inline-flex items-center gap-1 border border-heading-color cursor-pointer hover:scale-102 active:scale-98 px-2 bg-black text-xs py-1 font-medium ml-4'>CSEO<FaArrowRightLong /></button></div>
            </div>
          </div>
             <div className="lg:hidden bg-black border border-heading-color heading-color w-full mt-6 h-8 text-xs lg:text-sm font-medium flex items-center justify-center hover:scale-102 active:scale-98 transition-all duration-300 cursor-pointer">
              Apply Now →
            </div>
        </div>
      </motion.div>
    </div>
  );
};

export default JourneyTimeline;