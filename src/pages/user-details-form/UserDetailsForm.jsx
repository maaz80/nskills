import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate, useNavigationType } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { useEffect, useState } from "react";
import { GoArrowRight } from "react-icons/go";
import { handleSignup } from "../../utils/auth";
import { useAuth } from "../../context/authContext";

const UserDetailsForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [selectedProfession, setSelectedProfession] = useState("");
  const { setCameFromUserDetailsPage } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const navType = useNavigationType(); // "PUSH" | "REPLACE" | "POP"

  useEffect(() => {
    // On POP (refresh, back/forward, direct URL), clear any state:
    // console.log("Nav Type", navType);
    if (navType === "POP" || !location?.state) {
      navigate("/login", { replace: true });
    } else {
      setPhone(location?.state?.phone || localStorage.getItem("user_phone"));
      setName(location?.state?.name || localStorage.getItem("user_name"));
    }
  }, [navType, location?.pathname, location?.state, navigate]);

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });


  const professionOptions = [
    { value: "student", label: "Student" },
    { value: "professional", label: "Working Professional" },
    { value: "business", label: "Business Owner / Entrepreneur" },
    { value: "other", label: "Other" }
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Select Profession functionality 
  const handleProfessionSelect = (profession) => {
    setSelectedProfession(profession.label);
    setValue("profession", profession.label, { shouldValidate: true });
    setIsDropdownOpen(false);
    // Clear error if exists
    if (errors.profession) {
      setErrors(prev => ({ ...prev, profession: null }));
    }
  };
  // Watch for changes in profession and income
  const professionValue = watch("profession");
  const incomeValue = watch("income");

  // Back Button check 
  useEffect(() => {
    // Mark that we're on the details page
    setCameFromUserDetailsPage(true);

    return () => {
      // Jab ye page leave ho, check karein ki user back gaya ya next
      if (location.pathname === "/otp") {
        // User back gaya → redirect to login
        navigate("/login", { replace: true });
      }
    };
  }, []);

  // Navbar hiding on scroll functionality
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY || currentScrollY < 50) {
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

  // Submit functionality 
  const onSubmit = async (data) => {
    if (loading) return;
    const isValid = await trigger(); // this will show all validation errors
    if (!isValid) return;

    console.log(data);

    setLoading(true);
    const res = await handleSignup(
      {
        name: name,
        mobile_number: phone,
        profession: data?.profession,
        income_range: data?.income,
      },
      true
    );

    if (res) {
      navigate("/");
    } else setLoading(false);
  };

  // Scroll to top on refresh 
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  return (
    <div className="min-h-screen bg-primary">
      {/* Header Section */}
      <div className={`fixed top-0 left-0 right-0 z-50 text-white py-4 lg:py-8 bg-black overflow-hidden shadow-lg transition-transform duration-300 ease-in-out ${showNavbar ? 'translate-y-0' : '-translate-y-full'
        }`}>

        <div className="max-w-6xl mx-auto px-4 lg:px-6 flex flex-col gap-4">
          {/* Back Button */}
          <Link
            to="/otp"
            className="absolute text-white bg-primary shadow-lg rounded-full p-3 text-2xl top-3 lg:top-9 left-3 lg:left-9 z-20 hover:scale-110 transition"
          >
            <FiArrowLeft />
          </Link>

          {/* Welcome Text */}
          <h1 className="text-3xl lg:text-6xl font-semibold tracking-tight drop-shadow-lg  ml-14 lg:ml-0">
            WELCOME,{" "}
            <span className="text-white">
              MAAZ
            </span>
          </h1>

          {/* Sub Text */}
          <p className="page-heading drop-shadow shadow-white">
            COMPLETE YOUR PROFILE & GET{" "}
            <span className="font-bold text-orange">₹50</span> INSTANT REWARD 🎁
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 lg:px-6 py-5 lg:py-10 bg-primary mt-32 sm:mt-36 lg:mt-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column - Information */}
          <div className="space-y-8 hidden lg:block">
            <div>
              <h2 className="page-heading mb-6">
                WHY WE NEED THIS INFORMATION
              </h2>
              <div className="space-y-4 text-grey-700 leading-relaxed">
                <p>
                  Your professional background helps us tailor our services
                  specifically to your needs. We understand that every
                  individual has unique financial requirements based on their
                  career path and income level.
                </p>
                <p>
                  This information enables us to provide personalized
                  recommendations, exclusive offers, and relevant financial
                  products that align with your professional status and earning
                  capacity.
                </p>
              </div>
            </div>

            <div className="bg-white/10 p-6">
              <h3 className="page-heading mb-3">
                INSTANT BENIFITS
              </h3>
              <ul className="space-y-2 text-grey-700">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  ₹50 instant cash reward
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  Personalized financial recommendations
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  Exclusive access to premium features
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="space-y-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

              <div className="bg-white/10 p-4  block lg:hidden">
                <h3 className="page-heading mb-3">
                  INSTANT BENIFITS
                </h3>
                <ul className="space-y-2 text-grey-200 text-sm">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    ₹50 instant cash reward
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Personalized financial recommendations
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Exclusive access to premium features
                  </li>
                </ul>
              </div>
              {/* Profession Section */}
              <div className="mb-8">
                <label className="block page-heading mb-4">
                  PROFESSIONAL BACKGROUND
                </label>
                <div className="relative dropdown-container">
                  <div
                    className="relative w-full px-4 py-4 text-lg border-2 border-gray-300 focus:border-white outline-none transition-colors text-white pr-10 bg-primary cursor-pointer hover:bg-white hover:primary-text"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <input
                      type="hidden"
                      {...register("profession", { required: "Please select your profession" })}
                    />
                    {selectedProfession || "Select your current profession"}
                  </div>

                  <div
                    className={`w-full z-10 border-2 border-gray-300 border-t-0 shadow-[0_0_10px_rgba(255,255,255,0.3)] overflow-hidden bg-primary transition-all duration-400 ease-linear
      ${isDropdownOpen ? "max-h-96 opacity-100 pointer-events-auto" : "max-h-0 opacity-0 pointer-events-none"}
    `}
                    style={{ transitionProperty: "max-height, opacity" }}
                  >
                    {professionOptions.map((option) => (
                      <div
                        key={option.value}
                        className="w-full px-4 py-4 text-lg text-gray-300 transition-colors hover:text-gray-600 hover:bg-white hover:primary-text cursor-pointer border-b border-white last:border-b-0"
                        onClick={() => handleProfessionSelect(option)}
                      >
                        {option.label}
                      </div>
                    ))}
                  </div>


                  <div className="pointer-events-none absolute inset-y-0 bg-primary right-1 flex items-center px-0 h-4 top-6">
                    <svg
                      className={`h-4 md:h-6 w-5 md:w-6 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                {errors.profession && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.profession}
                  </p>
                )}
              </div>

              {/* Income Section */}
              <div className="mb-8">
                <label className="block page-heading mb-6">
                  ANNUAL INCOME RANGE
                </label>
                <div className="space-y-4">
                  <div className="border-2 border-grey-200  p-4 hover:border-white transition-colors cursor-pointer">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        value="0-300000"
                        {...register("income", {
                          required: "Please select your income range",
                        })}
                        className="w-5 h-5 text-white border-2 border-slate-300 focus:ring-orange mr-4"
                      />
                      <div>
                        <span className="text-lg font-medium text-white">
                          ₹0 - ₹3 Lacs
                        </span>
                        <p className="text-sm text-grey-600">
                          Entry level / Students
                        </p>
                      </div>
                    </label>
                  </div>

                  <div className="border-2 border-slate-200  p-4 hover:border-orange transition-colors cursor-pointer">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        value="300000-500000"
                        {...register("income", {
                          required: "Please select your income range",
                        })}
                        className="w-5 h-5 text-white border-2 border-slate-300 focus:ring-orange mr-4"
                      />
                      <div>
                        <span className="text-lg font-medium text-white">
                          ₹3 - ₹5 Lacs
                        </span>
                        <p className="text-sm text-grey-600">
                          Mid-level professionals
                        </p>
                      </div>
                    </label>
                  </div>

                  <div className="border-2 border-slate-200  p-4 hover:border-orange transition-colors cursor-pointer">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        value="500000-700000"
                        {...register("income", {
                          required: "Please select your income range",
                        })}
                        className="w-5 h-5 text-white border-2 border-slate-300 focus:ring-orange mr-4"
                      />
                      <div>
                        <span className="text-lg font-medium text-white">
                          ₹5 - ₹7 Lacs
                        </span>
                        <p className="text-sm text-grey-600">
                          Senior professionals
                        </p>
                      </div>
                    </label>
                  </div>

                  <div className="border-2 border-slate-200  p-4 hover:border-orange transition-colors cursor-pointer">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        value="1000000"
                        {...register("income", {
                          required: "Please select your income range",
                        })}
                        className="w-5 h-5 text-white border-2 border-slate-300 focus:ring-orange mr-4"
                      />
                      <div>
                        <span className="text-lg font-medium text-white">
                          ₹7+ Lacs
                        </span>
                        <p className="text-sm text-grey-600">
                          Leadership / Executive level
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
                {errors?.income && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors?.income?.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={`cursor-pointer w-full flex items-center justify-center gap-3 bg-white hover:bg-white/90 text-black py-2 lg:py-5 px-2 lg:px-8 text-lg lg:text-xl primary-button-styling transition-colors disabled:bg-white/20 disabled:text-white/50 disabled:cursor-not-allowed disabled:opacity-70 ${!(professionValue && incomeValue) && "opacity-70"
                  }`}
                disabled={loading || !(professionValue && incomeValue)}
              >
                Submit
                <GoArrowRight className="w-6 h-6" />
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsForm;