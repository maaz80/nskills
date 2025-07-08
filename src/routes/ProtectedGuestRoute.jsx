import { useEffect, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { supabase } from "../supabase-client";
import Loader from "../components/Loader";
import NetworkError from "../components/NetworkError/NetworkError";
import { useAuth } from "../context/authContext";
// import { logout } from "../utils/auth";

const ProtectedGuestRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  // const [session, setSession] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [error, setError] = useState(null);
  const [isRetrying, setIsRetrying] = useState(false);

  const { session, setSession, proceedToUserDetails } = useAuth();
  const [searchParams] = useSearchParams();

  const MAX_RETRIES = 3;
  useEffect(() => {
    const getUserData = async () => {
      try {
        console.log(`Attempt ${retryCount + 1}`);
        if (retryCount > 0) setIsRetrying(true);
        if (!navigator.onLine) {
          // setError("No internet connection");
          throw new Error("Network Error");
        }


        const referral = searchParams.get('referral');
        if(referral){
          localStorage.setItem('referral_code',JSON.stringify(referral));
          // console.log(localStorage.getItem(referral_code))
        }
        const {
          data: { session },error
        } = await supabase.auth.getSession();

        if (!session || error) throw new Error("No session returned");

        setSession(session);

        const user = session?.user;
        if (user) {
          const isReg = user?.user_metadata?.isRegistered ?? false;
          setIsRegistered(isReg);
        }
        setError(null);
        setIsLoading(false);
        setIsRetrying(false);
      } catch (err) {
        const isNetworkError =
          !navigator.onLine ||
          err.message.includes("Failed to fetch") ||
          err.message.includes("Network Error");

        // console.error("Supabase connection error:", err);
        if (isNetworkError && retryCount < MAX_RETRIES - 1) {
          console.warn("Network error, retrying...", err);
          // schedule a retry
          setTimeout(() => setRetryCount((c) => c + 1), 3000);
          return; // bail out of this catch so we stay in loading state
        }

        // non-network error (or out of retries): give up
        console.error("Error fetching session:", err);
        setError(err);
        setIsLoading(false);
        setIsRetrying(false);
      }
    };

    getUserData();
  }, [retryCount, setSession]);

  if (isLoading) {
    return <Loader />;
  }

  if (
    error &&
    (!navigator.onLine ||
      error.message.includes("Failed to fetch") ||
      error.message.includes("Network Error"))
  ) {
    return <NetworkError />;
  }

  // ✅ Final access control logic
  if (session && isRegistered) {
    return <Navigate to="/" replace />;
  }

  // const handleUnwantedSession = async() => {
  //     await logout();
  //   }

  //   if(session && !isRegistered){
  //     handleUnwantedSession();
  //   }

  return children;
};

export default ProtectedGuestRoute;