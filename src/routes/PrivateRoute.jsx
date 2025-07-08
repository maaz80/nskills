import { useEffect, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { supabase } from "../supabase-client";
import { useAuth } from "../context/authContext";
import Loader from "../components/Loader";
// import NetworkError from "../components/NetworkError/NetworkError";
// import { logout } from "../utils/auth";
// import { useSearch } from "../context/searchContext";

const PrivateRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { session, setSession } = useAuth();
  const [isRegistered, setIsRegistered] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [error, setError] = useState(null);
  const MAX_RETRIES = 3;

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const getUserData = async () => {
      try {
        if (!navigator.onLine) {
          // setError("No internet connection");
          throw new Error("Network Error")
        }


        const referral = searchParams.get('referral');
        if (referral) {
          localStorage.setItem('referral_code', JSON.stringify(referral));
          // console.log(localStorage.getItem('referral_code'))
        }
        const {
          data: { session }, error
        } = await supabase.auth.getSession();
        // console.log(session)
        if (!session || error) throw new Error("No session returned");
        setSession(session);
        const isReg = session?.user?.user_metadata?.isRegistered ?? false;
        setIsRegistered(isReg);
        setError(null);
        localStorage.removeItem('referral_code');
      } catch (err) {
        console.error("error in private route", err);
        const isNetworkError =
          !navigator.onLine ||
          err.message.includes("Network Error");

        if (isNetworkError && retryCount < MAX_RETRIES - 1) {
          setTimeout(() => setRetryCount((c) => c + 1), 3000);
          return;
        }

        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    getUserData();
  }, [retryCount, setSession]);

  // While loading, show loader
  if (isLoading) return <Loader />;

  // Network errors
  if (
    error &&
    (!navigator.onLine ||
      error.message.includes("Failed to fetch") ||
      error.message.includes("Network Error"))
  ) {
    return <div>Network Error</div>;
  }
  {/* <NetworkError /> */ }
  // No session = redirect to login
  if (!session) return <Navigate to="/login" replace />;

  // Session exists but user not registered = logout and redirect
  if (session && isRegistered === false) {
    // logout(setSession); // this clears supabase + context
    return <Navigate to="/login" replace />;
    // or if you want to collect user details:
    // return <Navigate to="/userdetails" replace />;
  }

  // All good
  if (session && isRegistered) {
    return children;
  }

  // Fallback: defensive (shouldn't reach here)
  return <Navigate to={'/login'} replace />;
};

export default PrivateRoute;
