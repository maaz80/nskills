import { GoArrowRight } from 'react-icons/go';
import Logo from './Logo.webp'
const Features = () => {
    return (
        <div className='relative w-full mt-4 lg:mt-8 overflow-hidden  px-0 md:px-16'>
            {/* Sharp Geometric SVG Background */}
            <div className="absolute inset-0 opacity-10">
                <svg 
                    width="100%" 
                    height="100%" 
                    viewBox="0 0 1200 600" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute inset-0 w-full h-full"
                    preserveAspectRatio="xMidYMid slice"
                >
                    {/* Main geometric patterns */}
                    <polygon points="0,0 200,0 150,100 0,80" fill="url(#grad1)" />
                    <polygon points="180,0 380,20 350,120 120,100" fill="url(#grad2)" />
                    <polygon points="1200,0 1000,0 1050,80 1200,60" fill="url(#grad1)" />
                    <polygon points="1020,0 820,20 850,100 1080,80" fill="url(#grad3)" />
                    
                    {/* Center diagonal cuts */}
                    <polygon points="400,0 600,0 550,150 450,120" fill="url(#grad4)" />
                    <polygon points="600,0 800,0 750,120 650,150" fill="url(#grad2)" />
                    
                    {/* Sharp triangular elements */}
                    <polygon points="100,200 250,180 200,300 50,280" fill="url(#grad3)" />
                    <polygon points="950,200 1100,180 1150,280 1000,300" fill="url(#grad4)" />
                    
                    {/* Diamond shapes */}
                    <polygon points="300,250 400,230 350,350 250,330" fill="url(#grad1)" />
                    <polygon points="800,250 900,230 950,330 850,350" fill="url(#grad2)" />
                    
                    {/* Bottom angular patterns */}
                    <polygon points="0,400 150,380 200,500 0,480" fill="url(#grad4)" />
                    <polygon points="1050,380 1200,400 1200,480 1000,500" fill="url(#grad3)" />
                    
                    {/* Intersecting sharp lines */}
                    <polygon points="500,300 700,280 650,450 550,470" fill="url(#grad1)" />
                    <polygon points="400,350 600,330 550,500 500,520" fill="url(#grad2)" />
                    
                    {/* Angular accent pieces */}
                    <polygon points="150,450 300,430 250,550 100,570" fill="url(#grad3)" />
                    <polygon points="900,430 1050,450 1100,570 950,550" fill="url(#grad4)" />
                    
                    {/* Sharp hexagonal elements */}
                    <polygon points="600,400 700,380 750,450 700,520 600,540 550,470" fill="url(#grad1)" opacity="0.6" />
                    
                    {/* Final bottom layer */}
                    <polygon points="0,500 200,480 300,600 0,600" fill="url(#grad2)" />
                    <polygon points="900,480 1200,500 1200,600 1000,600" fill="url(#grad4)" />
                    
                    {/* Gradient definitions */}
                    <defs>
                        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.3" />
                        </linearGradient>
                        <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.6" />
                            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.4" />
                        </linearGradient>
                        <linearGradient id="grad3" x1="100%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.7" />
                            <stop offset="100%" stopColor="#1E40AF" stopOpacity="0.2" />
                        </linearGradient>
                        <linearGradient id="grad4" x1="50%" y1="0%" x2="50%" y2="100%">
                            <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="#059669" stopOpacity="0.3" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            {/* Additional sharp accent overlay */}
            <div className="absolute inset-0 opacity-10">
                <svg 
                    width="100%" 
                    height="100%" 
                    viewBox="0 0 1200 600" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute inset-0 w-full h-full"
                    preserveAspectRatio="xMidYMid slice"
                >
                    {/* Sharp circuit-like patterns */}
                    <path d="M0,200 L100,180 L120,220 L200,200 L220,160 L300,180 L320,240 L400,220" 
                          stroke="#8B5CF6" strokeWidth="2" fill="none" />
                    <path d="M800,200 L900,180 L920,220 L1000,200 L1020,160 L1100,180 L1120,240 L1200,220" 
                          stroke="#3B82F6" strokeWidth="2" fill="none" />
                    
                    {/* Sharp zigzag patterns */}
                    <path d="M0,350 L80,330 L120,370 L200,350 L240,390 L320,370 L360,410 L440,390" 
                          stroke="#06B6D4" strokeWidth="1.5" fill="none" />
                    <path d="M760,350 L840,330 L880,370 L960,350 L1000,390 L1080,370 L1120,410 L1200,390" 
                          stroke="#7C3AED" strokeWidth="1.5" fill="none" />
                </svg>
            </div>

            {/* Content */}
            <div className="relative z-10 p-6">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold py-6 text-white">
                    WHAT MAKES US UNIQUE FROM OTHER COURSES?
                </h2>

                <ul className="text-left text-white text-xs sm:text-lg space-y-2 lg:space-y-3">
                    <li>✅ Batch Size Starting From Only <span className="text-purple-400">30 Students/Batch</span></li>
                    <li>✅ <span className="text-purple-400">Live Doubt Solving Sessions</span></li>
                    <li>✅ Instant Doubt Solving Via Text, Audio & Video Chat</li>
                    <li className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                        <span>
                            ✅ Each Topic Is Explained In An Easy, Understandable & Practical Way By Mentors From MNCs
                        </span>
                        <div className="flex gap-1">
                            <img src={Logo} alt="Company 1" className="w-6 h-6 rounded-full object-cover" />
                            <img src={Logo} alt="Company 2" className="w-6 h-6 rounded-full object-cover" />
                            <img src={Logo} alt="Company 3" className="w-6 h-6 rounded-full object-cover" />
                            <img src={Logo} alt="Company 4" className="w-6 h-6 rounded-full object-cover" />
                        </div>
                    </li>
                    <li>✅ <span className="text-purple-400">100% Placement Assurance</span>*</li>
                </ul>

               <div className="flex flex-row flex-wrap justify-between items-center gap-4 pt-6">
                    <p className="text-white text-xs sm:text-sm pt-4">* You have to follow our criteria to get qualified for it</p>
                    <button className="border border-white bg-black w-28 lg:w-36 h-6 lg:h-10 font-medium flex items-center justify-center text-white hover:scale-102 active:scale-98 transition-all duration-300 cursor-pointer gap-2 text-xs lg:text-base">
                        Know More <GoArrowRight />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Features;