import { toast } from "react-toastify";
import { supabase } from "../supabase-client";
import { COLUMNS, TABLES } from "../constants/DBSchema";

export const validateName = (name) => {
  const trimmedName = name.trim();
  if (!trimmedName.length) {
    // toast.error("Please enter your name — it can't be empty or just spaces.");
    return null;
  }
  return trimmedName;
};

export const validateOtp = (otp, showToast) => {
  if (!otp || otp.length !== 6) {
    // toast.error("Please enter a valid 6-digit OTP!");
    showToast("Please enter a valid 6-digit OTP!", "error", "short");
    return false;
  }
  return true;
};

export const sendOtp = async (fullPhone) => {
  try {
    const { data, error: otpError } = await supabase.auth.signInWithOtp({
      phone: fullPhone,
    });

    console.log(data);
    console.log(otpError);
    if (otpError) {
      console.error("Error sending OTP: ", otpError);
      // toast.error("Failed to send OTP. Please try again.");
      throw new Error("Couldn't send OTP. Retry in a moment.");
    }

    return {
      success: true,
      error: null,
    };
  } catch (error) {
    console.error("Error in sending otp");
    return {
      success: false,
      error,
    };
  }
};
export const verifyOtp = async (phone, otpValue) => {
  try {
    const { data, error: otpError } = await supabase.auth.verifyOtp({
      phone,
      token: otpValue,
      type: "sms",
    });
    if (otpError) {
      throw new Error("Invalid OTP, please enter the correct OTP");
    }
    return data;
  } catch (error) {
    throw new Error("Invalid OTP, please enter the correct OTP");
  }
};

export const handleLogin = async (navigate) => {
  await supabase.auth.updateUser({
    data: { isRegistered: true },
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();
  // localStorage.setItem("userSession",JSON.stringify(session));

  navigate("/");
};

export const handleSignupFlow = async (
  data,
  buttonClicked,
  phone,
  navigate
) => {
    navigate("/user_details_form", {
      state: {
        phone,
        name: data.name,
      },
    });
};

export const handleSignup = async (data, flag = false) => {
  const toastId = toast.loading("Loading...");
  try {
    // console.log("data", data);

    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) throw error;
    console.log("session", session);
    const user_id = session?.user?.id;

    const { error: insertError } = await supabase.from(TABLES.USER).insert([
      {
        [COLUMNS.USER.MOBILE_NUMBER]: data.mobile_number,
        [COLUMNS.USER.NAME]: data.name,
        [COLUMNS.USER.USER_ID]: user_id,
        [COLUMNS.USER.REFERRED_BY]:
          localStorage.getItem("referral_code") || null,
        [COLUMNS.USER.PROFESSION]: data?.profession || "NA",
        [COLUMNS.USER.INCOME_RANGE]: data?.income_range || "NA",
        [COLUMNS.USER.ROLE]: "Customer", // Change it as per role
        ...(flag && { [COLUMNS.USER.WALLET_BALANCE]: 50 }),
        [COLUMNS.USER.UPDATED_AT]: new Date().toISOString(),
      },
    ]);

    localStorage.removeItem("referral_code");
    if (insertError) {
      console.log("Error in inserting in to table", insertError);
      toast.dismiss(toastId);
      // toast.error(insertError.message);
      // showToast(insertError.message, "error", "short")
      return false;
    }

    await supabase.auth.updateUser({
      data: { isRegistered: true },
    });

    // toast.success("Account Created Successfully");
    toast.dismiss(toast.id);
    return true;
  } catch (error) {
    console.error("Error in handleSignup ", error);
    toast.dismiss(toastId);
    // toast.error(error.message);
    return false;
  }
};

export const logout = async (setSession, showToast) => {
  try {
    await supabase.auth.updateUser({
      data: { isRegistered: false },
    });
    await supabase.auth.signOut();
    setSession(null);
    window.location.reload();
    // hasFetchedCurrentLocation.current = false;

    // toast.success("logged out");
  } catch (error) {
    // toast.error("Error in logging out");
    showToast("Error in logging out", "error", "short");
    console.log(error);
  }
};

export const handleAuthError = (error) => {
  console.error("Authentication Error:", error);
  // toast.error(error.message);
};
