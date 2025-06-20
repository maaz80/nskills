import Sample from './Sample.mp4'
import Logo from './Logo.webp'
import { GoArrowRight } from 'react-icons/go';
import Features from './Features';

const HeroSection = () => {
    return (
        <section className="relative w-full min-h-screen bg-transparent pt-16  lg:pt-32 pb-3 lg:pb-10">
            {/* Responsive flex: stack on mobile, row on md+ */}
            <div className="w-full flex flex-col md:flex-row items-start md:items-start justify-between gap-8 md:gap-0  px-4 md:px-16">
             <div className="flex gap-3">
                   {/* Left Accent */}
                <div className="flex flex-col items-center pt-4 mr-0 md:mr-4 mb-4 md:mb-0">
                    <span className='w-8 h-8 rounded-full bg-purple-500'></span>
                    <span className='w-1.5 h-40 md:h-52 bg-gradient-to-b from-purple-500 to-bg-primary'></span>
                </div>

                {/* Center Content */}
                <div className="flex-1">
                    <h1 className="text-4xl md:text-8xl font-bold text-white py-4">
                        Hi, I'm <span className="text-purple-500">nSkills</span>
                    </h1>

                    <p className="text-white text-xs md:text-2xl font-medium leading-relaxed">
                        AI is replacing humans — then what should you do?
                    </p>

                    <p className="text-white text-xs md:text-2xl font-medium leading-relaxed">
                        Add tech skills in your career with our
                        <span className="text-purple-500"> 100% Placement Assurance</span>* live + Recorded Certification Programs for new Era of AI in Hinglish.
                    </p>
                </div>
             </div>

                {/* Video */}
                <div className="w-full md:w-1/3 pt-0 lg:pt-4 flex-shrink-0">
                    <video
                        autoPlay
                        loop
                        muted
                        className="w-full h-60 lg:h-64 object-cover"
                    >
                        <source src={Sample} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>

            {/* Features Section */}
          <Features/>
        </section>
    );
};

export default HeroSection;