import { FaArrowRight } from "react-icons/fa";
import { useForm } from "react-hook-form";
import {
  Link,
  useLocation,
  useNavigate,
  useNavigationType,
} from "react-router-dom";
import OTPInput from "react-otp-input";
import { useEffect, useState } from "react";
import { BiPencil } from "react-icons/bi";
import { FiArrowLeft } from "react-icons/fi";
import { toast } from "react-toastify";
import { GoArrowRight } from "react-icons/go";

const Otp = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });
  const otp = watch("otp") || "";

  const [isResending, setIsResending] = useState(false);

  //Auto submit
  useEffect(() => {
    const handleAutoSubmit = async () => {
      if (otp?.length === 6 && isLogin && !isResending) {
        await handleSubmit(onSubmit)();
      }
    };
    handleAutoSubmit();
  }, [otp, isResending]);

  // business logic

  const [phone, setPhone] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [countryCode, setCountryCode] = useState("");
  const [userName, setUserName] = useState("");

  const navType = useNavigationType();

  const [authenticating, setAuthenticating] = useState(false);

  /********************    verify otp ********************/

  const onSubmit = async (data, event) => {
 navigate("/user_details_form")
  };
  // Otp auto detection
  const attemptOtpAutofill = async () => {
    if ("OTPCredential" in window) {
      try {
        console.log("Starting OTP detection...");
        // Listen the SMS and get the OTP
        const abortController = new AbortController();
        const timeout = setTimeout(() => abortController.abort(), 60000);

        const content = await navigator?.credentials.get({
          otp: {
            transport: ["sms"],
          },

          signal: abortController?.signal,
        });
        clearTimeout(timeout);

        if (content && content.code) {
          console.log("OTP detected:", content?.code);
          setValue("otp", content?.code);

          setTimeout(() => {
            const submitButton = document.querySelector(
              '#otp-form button[type="submit"]'
            );
            if (submitButton) {
              console.log("Focusing submit button");
              submitButton.focus();
            } else {
              console.warn("Submit button not found");
            }
          }, 100);
          toast.success("OTP Filled Automatically");
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("OTP Autofill Error: ", error);
        }
      }
    } else {
      // toast.error("OTP Autofill not supported in this browser.");
      console.warn("OTP Credential API not supported in this browser.");
    }
  };

  // Runs the OTP autofill function when OTP is sent
  useEffect(() => {
    attemptOtpAutofill();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row h-full bg-black">
      {/* Left Side */}
      <div className="w-full lg:w-[68%] overflow-hidden">
        <div className="h-[25vh] lg:h-screen"> </div>
        <Link
          to="/"
          className="absolute text-white bg-primary rounded-full p-3 text-2xl top-4 lg:top-5 left-1 lg:left-4 z-20 hover:scale-102 active:scale-98 transition duration-300"
        >
          <FiArrowLeft />
        </Link>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        id="otp-form"
        className="relative p-4 lg:p-10 w-full lg:w-[34%] flex flex-col items-start justify-start lg:justify-center ml-0 lg:-ml-5 bg-primary overflow-y-auto max-h-screen lg:h-screen"
        style={{ minHeight: "75vh" }}
      >
        <div className="flex items-center justify-center mb-3 lg:mb-4 text-sm lg:text-lg font-medium text-white ">
          {phone && (
            <>
              OTP sent to&nbsp;{phone}
              <Link
                to="/"
                state={{
                  phone: phone,
                  countryCode: countryCode,
                }}
                className="text-white hover:underline border-2 border-gray p-1 rounded-full ml-2"
              >
                <BiPencil className="rounded-full" />
              </Link>
            </>
          )}
        </div>
  
        <h1 className={`page-heading mb-4 `}>
          {isLogin ? `WELCOME, MAAZ` : "REGISTRATION"}
        </h1>

        {/* Name Input */}
        {!isLogin && (
          <div className={`space-y-1 heading-color flex flex-col w-full`}>
            <label className="text-xs font-medium ">ENTER YOUR NAME</label>
            <input
              type="text"
              placeholder="Full Name"
              autoFocus
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters",
                },
                maxLength: {
                  value: 50,
                  message: "Name must be less than 50 characters",
                },
                // pattern: {
                //   value: /^[A-Za-z]+(?: [A-Za-z]+)*$/,
                //   message: "Name must contain only alphabets and single spaces",
                // },
                validate: (value) => {
                  const trimmed = value.trim();
                  const regex = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
                  if (trimmed === "")
                    return "Name cannot be empty or spaces only";
                  if (!regex?.test(trimmed))
                    return "Name must contain only alphabets and single spaces";
                  return true;
                },
              })}
              className={`w-full border ${
                errors.name
                  ? "border-red-500 focus:border-white focus:ring-white"
                  : `border-gray-300   ${
                      isValid
                        ? " focus:border-green border-green focus:ring-green-400"
                        : " focus:border-white focus:ring-white"
                    }`
              } p-3 outline-none w-full  focus:outline-none focus:ring-1  transition duration-300 `}
            />
            {errors?.name && (
              <p className="text-red-500 text-sm">{errors?.name?.message}</p>
            )}
          </div>
        )}

        {/* OTP Input */}
        <div className="space-y-2 heading-color mt-4">
          <label className="text-xs font-medium ">ENTER OTP</label>
          <OTPInput
            value={otp}
            onChange={(value) => {
              setValue("otp", value);
            }}
            shouldAutoFocus={isLogin}
            numInputs={6}
            isInputNum
            inputType="number"
            containerStyle={{
              display: "flex",
              justifyContent: "start",
              gap: "12px",
            }}
            inputStyle={{
              width: "14%",
              height: "60px",
              textAlign: "center",
              borderBottom: `2px solid ${
                otp.length === 6 ? "green" : "#d1d5db"
              }`,
              outline: "none",
              color: "#ffffff",
              fontSize: "1.125rem",
            }}
            renderInput={(props) => (
              <input
                {...props}
                className={`focus:outline-none focus:ring-2 ${
                  otp.length === 6 ? "focus:ring-green" : "focus:ring-white"
                } transition duration-300`}
              />
            )}
            inputProps={{
              inputMode: "numeric",
              autoComplete: "one-time-code",
            }}
          />
        </div>
        {/* <ResendButton fullPhone={phone} setIsResending={setIsResending} onResendSuccess={() => setValue("otp", "")}/> */}

        <div className="flex flex-col w-full  lg:flex-row gap-3 items-center justify-between mt-6">
      

{/* Submit Button - Login/Sign Up */}
<button
  type="submit"
  name="defaultSignup"
  className={`
    flex items-center justify-center gap-2 md:gap-3 ml-auto button-spacing-top primary-button-styling py-3 font-semibold shadow-lg transition duration-300 border-2
    ${
      isLogin 
        ? !(isValid && otp?.length === 6)
          ? "bg-white/20 text-white/50 border-white/30 cursor-not-allowed"
          : "bg-white cursor-pointer hover:scale-101 text-black active:scale-98 border border-white"
        : !(isValid && otp?.length === 6)
        ? "bg-white/20 text-white/50 border-white/30 cursor-not-allowed"
        : "bg-white cursor-pointer hover:scale-101 text-black active:scale-98 border border-white"
    }
  `}
  disabled={authenticating}
>
  {isLogin ? "Login" : "Sign Up"}
  <GoArrowRight className="text-lg md:text-xl" />
</button>
        </div>
      </form>
    </div>
  );
};

export default Otp;
