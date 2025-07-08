import  { useEffect, useState } from "react";
import { logout } from "../../utils/auth";
import { useAuth } from "../../context/authContext";
import { useToast } from "../customtoast/CustomToast";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuItems = ["Programs", "Earnings", "Contact", "Privacy Policy", "Logout "];
  const { setSession } = useAuth();
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const {showToast} = useToast()

  // Navbar hidding on scrool functionality 
  useEffect(() => {
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        // Scrolling up or at the top
        setShowNavbar(true);
      } else {
        // Scrolling down
        setShowNavbar(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Logout function
    const handleMenuClick = async (item) => {
    if (item.trim().toLowerCase() === "logout") {
    await logout(setSession , showToast);
      localStorage.clear();
      navigate("/login");
    }
    setIsMobileMenuOpen(false);
  };

  // Toggle menu in mobile 
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={`fixed top-0 left-0 w-full nav-bgcolor text-white z-50 shadow-lg transition-transform duration-300 ease-in-out ${showNavbar ? 'translate-y-0' : '-translate-y-full'
      }`}>
      <div className="w-full mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 md:py-4">
        {/* Left section */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Logo or first letter */}
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white text-black flex items-center justify-center text-lg sm:text-xl font-bold  overflow-hidden">
            N
          </div>

          {/* Text */}
          <div className="flex flex-col leading-tight">
            <span className="font-semibold text-sm sm:text-base md:text-lg">nSkills</span>
            <span className="text-[9px] sm:text-[10px] md:text-xs text-gray-300 tracking-wide">RESHAPE YOUR DESTINY</span>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-4 xl:gap-6">
          {menuItems.map((item, idx) => (
            <button
              key={idx}
              className="text-sm xl:text-base hover:text-gray-200 hover:scale-102 cursor-pointer transition-colors duration-200 active:scale-95 whitespace-nowrap"
            onClick={() => handleMenuClick(item)} 
            >
              {item}
            </button>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1 focus:outline-none"
          aria-label="Toggle mobile menu"
        >
          <span
            className={`block w-5 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
          ></span>
          <span
            className={`block w-5 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""
              }`}
          ></span>
          <span
            className={`block w-5 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
          ></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 w-full bg-black border-t border-gray-800 transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <div className="px-4 sm:px-6 py-4 space-y-3">
          {menuItems.map((item, idx) => (
            <button
              key={idx}
              className="block w-full text-left text-sm sm:text-base hover:text-gray-200 cursor-pointer transition-colors duration-200 py-2 px-2 rounded hover:bg-gray-900"
              onClick={() => handleMenuClick(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile menu backdrop */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-[-1]"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;