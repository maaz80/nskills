import { createContext, useContext, useEffect, useRef, useState } from "react";
import {
  getNearbySavedAddresses,
  handleAddressError,
  markAsSelectedAddress,
} from "../utils/address";
import { useAuth } from "./authContext";
import { useToast } from "../components/customtoast/CustomToast";
import { useLocation } from "react-router-dom";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const { showToast } = useToast();
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedGoogleSuggestions, setSelectedGoogleSuggestions] = useState(
    []
  );
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [currentDeliveryAddress, setCurrentDeliveryAddress] = useState(null);

  /************************************** search page queries below ***************************/
  const [searchedVendors, setSearchedVendors] = useState([]);
  const [searchedCategories, setSearchedcategories] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [searchedRecentSearches, setSearchedRecentSearches] = useState([]);
  const [showSearchedResult, setShowSearchedResult] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilterValue, setSelectedFilterValue] = useState({
    id: "all price range",
    min_price: 0,
    max_price: 1000000,
  });
  const [sortBy, setSortBy] = useState("rating");
  const [minRating, setMinRating] = useState(0);
  const [maxExpectedTime, setMaxExpectedTime] = useState(2 * 60);
  const [showCategoriesFirst, setShowCategoriesFirst] = useState(false);
  const { session } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const hasFetchedCurrentLocation = useRef(false);
  const [openLocationModal,setOpenLocationModal] = useState(false);
  const [newLocation,setNewLocation] = useState(null);
  const [openErrorModal,setOpenErrorModal] = useState(false);

  const [tempAdd,setTempAdd] = useState(null);
  const loaction = useLocation();
  useEffect( () => {
    if(!session) {
      hasFetchedCurrentLocation.current = false,
      setCurrentDeliveryAddress(null);
      setSavedAddresses([]);
    }
  },[])

  useEffect(() => {
    const allowedRoutes = ["/search", "/search_results"];
    if (!allowedRoutes.includes(location.pathname)) {
      setSearchQuery("");
    }
  }, [location.pathname]);
  
  const handleCurrentLocation = async () => {
    if (isLoading) return; // Prevent multiple clicks if already loading
    // const toastId = toast.loading("Getting current Location");
    setIsLoading(true);
    try {
      console.log("justbefore getnearby saved addresses");
      const {
        success: currSucc,
        // address,
        error,
      } = await getNearbySavedAddresses(session?.user?.id,currentDeliveryAddress,setCurrentDeliveryAddress,setOpenLocationModal,setNewLocation,setIsLoading,session,setOpenErrorModal,setTempAdd);

      console.log("just after neearby saved addresses");

      if (!currSucc || error) {
        // toast.dismiss(toastId);
        handleAddressError(error, "Failed to get current location", showToast);

        //  show modal for asking user for using last used location
        
        return;
      }
    } catch (error) {
      // toast.dismiss(toastId);
      console.error("Error in location:", error);
      // handleAddressError(error, "Failed to fetch current location");
    } finally {
      // toast.dismiss(toastId);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const loadAddresses = async () => {
      // console.log("Fetching address in home")
      if (isLoading) return;
      try {
        await handleCurrentLocation();
      } catch (error) {
        console.log("Failed to fetch delivery address", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (
      session &&
      session?.user?.user_metadata?.isRegistered &&
      !currentDeliveryAddress &&
      !hasFetchedCurrentLocation.current
    ){

      loadAddresses();
      hasFetchedCurrentLocation.current = true;
    }
  }, [session]);

  const value = {
    savedAddresses,
    setSavedAddresses,
    selectedGoogleSuggestions,
    setSelectedGoogleSuggestions,
    selectedAddress,
    setSelectedAddress,
    currentDeliveryAddress,
    setCurrentDeliveryAddress,
    searchedVendors,
    setSearchedVendors,
    searchedCategories,
    setSearchedcategories,
    recentSearches,
    setRecentSearches,
    searchedRecentSearches,
    setSearchedRecentSearches,
    showSearchedResult,
    setShowSearchedResult,
    searchQuery,
    setSearchQuery,
    selectedFilterValue,
    setSelectedFilterValue,
    showCategoriesFirst,
    setShowCategoriesFirst,
    sortBy,
    setSortBy,
    maxExpectedTime,
    setMaxExpectedTime,
    minRating,
    setMinRating,
    isLoading,
    setIsLoading,
    hasFetchedCurrentLocation,
    openLocationModal,setOpenLocationModal,
    newLocation,setNewLocation,
    openErrorModal,setOpenErrorModal,
    tempAdd,setTempAdd
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};
