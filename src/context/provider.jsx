import { AuthProvider } from "./authContext";
// import { CartProvider } from "./cartContext";
// import { OrderProvider } from "./ordersContext";
// import { RatingProvider } from "./ratingContext";
// import { SearchProvider } from "./searchContext";
// import { SortProvider } from "./sortContext";
// import { UserProvider } from "./userContext";
// import { VendorProvider } from "./vendorContext";

const Providers = ({ children }) => {
  return (
    <AuthProvider>
      {/* <UserProvider>
        <SearchProvider>
          <CartProvider>
            <OrderProvider>
              <VendorProvider>
                <RatingProvider>
                <SortProvider> */}
                  {children}
                  {/* </SortProvider>
                </RatingProvider>
              </VendorProvider>
            </OrderProvider>
          </CartProvider>
        </SearchProvider>
      </UserProvider> */}
    </AuthProvider>
  );
};

export default Providers;