import { FaArrowRight } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { GoArrowRight } from "react-icons/go";
import { supabase } from "../../supabase-client";
import { useToast } from "../../components/customtoast/CustomToast";
import { handleAuthError, sendOtp } from "../../utils/auth"
import { COLUMNS, TABLES } from "../../constants/DBSchema";
const Login = () => {
  const navigate = useNavigate();
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState("+91");
  const location = useLocation();
  const { showToast } = useToast();
  const defaultPhone = location?.state?.phone || "";
  const defaultCountryCode = location?.state?.countryCode || "+91";
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
    trigger,
  } = useForm(
    {
      defaultValues: {
        phoneNumber: defaultPhone,
      },
    },
    {
      mode: "onChange",
    }
  );

  const phoneNumber = watch("phoneNumber") || "";

  useEffect(() => {
    if (defaultPhone) setValue("phoneNumber", defaultPhone);
    if (defaultCountryCode) setSelectedCountryCode(defaultCountryCode);
    // window?.history?.replaceState({}, document?.title);
  }, [defaultPhone, defaultCountryCode, setValue]);

  // Country codes list
  const countryCodes = [
    { code: "+1", country: "US/Canada" },
    { code: "+44", country: "UK" },
    { code: "+91", country: "India" },
    { code: "+61", country: "Australia" },
    { code: "+49", country: "Germany" },
    { code: "+33", country: "France" },
    { code: "+86", country: "China" },
    { code: "+81", country: "Japan" },
    { code: "+7", country: "Russia" },
    { code: "+55", country: "Brazil" },
    { code: "+27", country: "South Africa" },
    { code: "+971", country: "UAE" },
    { code: "+65", country: "Singapore" },
    { code: "+82", country: "South Korea" },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showCountryDropdown &&
        !event?.target?.closest(".country-dropdown-container")
      ) {
        setShowCountryDropdown(false);
      }
    };

    document?.addEventListener("mousedown", handleClickOutside);
    return () => {
      document?.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCountryDropdown]);

  // Bussiness logic
  const [sendingOtp, setSendingOtp] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  function isValidPhoneNumber(phone) {
    // Remove spaces, dashes, and parentheses
    if (!phone) return false;

    // Remove everything except + and digits
    const regex = /^\+[0-9]{10,15}$/;
    return regex?.test(phone);
  }

  // Modified onSubmit function - add this validation at the beginning
  const onSubmit = async (data) => {
    // Force validation and show errors even if button is disabled
    const isFormValid = await trigger();
    if (!data?.phoneNumber || !data?.phoneNumber.trim()) {
      showToast("Please enter a phone number!", "error", "medium");
      return;
    }

    if (!/^[0-9]{10}$/.test(data?.phoneNumber)) {
      showToast(
        "Phone number should contain exactly 10 digits with no spaces or symbols.",
        "error",
        "medium"
      );
      return;
    }

    const fullPhone = selectedCountryCode + data?.phoneNumber;

    if (!isValidPhoneNumber(fullPhone)) {
      showToast("Not a valid phone number format", "error", "medium");
      return;
    }
    const toastId = showToast("Sending OTP", "info", "short");

    try {
      setSendingOtp(true);
      // localStorage.setItem('referral_code',JSON.stringify(referralCode));
      const { data: userData, error } = await supabase
        .from(TABLES?.USER)
        .select(`${COLUMNS?.USER?.MOBILE_NUMBER},${COLUMNS?.USER?.NAME}`)
        .eq(COLUMNS?.USER?.MOBILE_NUMBER, fullPhone)
        .maybeSingle();

      // console.log(userData);

      if (error) {
        throw error;
      }
      const isUserRegistered = userData && !error;

      if (isUserRegistered) {
        // toast.info("Number already registered! Please login instead.");
        setIsLogin(true);
      } else {
        console.log(error);
        setIsLogin(false);
      }

      const { success: otpSuccess, error: otpError } = await sendOtp(fullPhone);

      if (otpError) {
        throw otpError
      }

      // console.log(otpData)

      // Navigate to OTP page
      showToast("OTP sent successfully!", "success", "short");
      setSendingOtp(false);

      // toast.dismiss(toastId);
      navigate("/otp", {
        state: {
          phone: fullPhone,
          countryCode: selectedCountryCode,
          isLogin: isUserRegistered,
          userName: userData?.name || "",
          // referral,
        },
      });
    } catch (error) {
      // console.error("Error during OTP submission:", error);
      // toast.error("An error occurred while sending the OTP. Please try again.");
      // toast.dismiss(toastId);
      handleAuthError(error);
      showToast("Error in sending otp", "error", "long");
      setSendingOtp(false);
    }
  };


  return (
    <div className="flex flex-col lg:flex-row items-center  h-full bg-black">
      {/* Left Side */}
      <div className="w-full lg:w-[68%] overflow-hidden">
        <div className="h-[25vh] lg:h-screen">
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative p-4 lg:p-10 w-full lg:w-[32%] flex flex-col items-start justify-start lg:justify-center ml-0 bg-primary overflow-y-auto max-h-screen lg:h-screen "
        style={{ minHeight: "75vh" }}
      >


        <h2 className="page-heading mb-5 ">
          ENTER YOUR NUMBER
        </h2>
        {/* <p className=" text-sm mb-3 text-black">
          Get instant credit with zero paperwork.
        </p> */}

        {/* Phone Input */}
        <div className="flex w-full">
          <div className="relative  country-dropdown-container">
            <button
              type="button"
              onClick={() => setShowCountryDropdown(!showCountryDropdown)}
              className={`flex items-center justify-center p-3.5 border text-white border-r-0
    ${isValid ? "border-green" : "border-gray"}
  `}
            >
              <span className="font-medium">{selectedCountryCode}</span>
              <svg
                className={`w-4 h-4 ml-1 transition-transform ${showCountryDropdown ? "rotate-180" : ""
                  }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Country code dropdown */}
            {showCountryDropdown && (
              <div
                className={`absolute z-10 w-48 mt-1 overflow-scroll scrollbar-hide bg-white text-black-700 shadow-lg max-h-60 border border-gray-300`}
              >
                <ul className="">
                  {countryCodes?.map((country) => (
                    <li key={country?.code}>
                      <button
                        type="button"
                        className={`w-full bg-black text-white text-left px-4 py-3 hover:bg-black/90 ${selectedCountryCode === country?.code
                          ? "bg-black/90 text-white"
                          : ""
                          }`}
                        onClick={() => {
                          setSelectedCountryCode(country?.code);
                          setShowCountryDropdown(false);
                        }}
                      >
                        <span className="font-medium">{country?.code}</span>{" "}
                        {country?.country}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <input
            type="text"
            inputMode="numeric"
            autoFocus
            pattern="[0-9]*"
            placeholder="Phone Number"
            {...register("phoneNumber", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Phone number should contain exactly 10 digits with no spaces or symbols.",
              },
              validate: (value) =>
                value?.trim() !== "" ||
                "Phone number cannot be empty or spaces only",
            })}
            onInput={(e) => {
              e.target.value = e.target.value.replace(/[^0-9]/g, "");
            }}
            className={`w-full p-3 border text-lg  text-white placeholder-gray-400 focus:outline-none transition duration-300 focus:ring-1
    ${errors?.phoneNumber
                ? "border-red-500 focus:ring-red-500"
                : isValid
                  ? "border-green-500 focus:ring-green-500"
                  : "border-gray focus:border-white  focus:ring-white"
              }`}
          />
        </div>
        {errors?.phoneNumber && (
          <p className="text-red-500 text-sm mb-3">
            {errors?.phoneNumber?.message}
          </p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          onClick={(e) => {
            // Allow click even when form is invalid
            if (!isValid) {
              e.preventDefault();
              handleSubmit(onSubmit)();
            }
          }}
          className={`flex items-center button-spacing-top primary-button-styling justify-center gap-2 ml-auto py-3 text-lg transition duration-300 ${sendingOtp || !isValid
            ? 'bg-white/20 cursor-not-allowed text-white/50 border border-white/30'
            : 'bg-white cursor-pointer hover:scale-101 text-black active:scale-98 border border-white'
            }`}
          disabled={sendingOtp} // Only actually disable when sending OTP
        >
          Next
          <GoArrowRight className="text-xl" />
        </button>


      </form>
    </div>
  );
};

export default Login;
