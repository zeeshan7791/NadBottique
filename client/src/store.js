import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";
import allProductsSlice from "./redux/products/allProductsSlice";
import productDetailsSlice from "./redux/products/productDetailsSlice";
import registerUserSlice from "./redux/user/registerUserSlice";
import cartSlice from "./redux/cartItems/cartSlice";
import newOrderSlice from "./redux/orderDetails/newOrderSlice";
import myOrderSlice from "./redux/orderDetails/myOrderSlice";
import orderDetailsSlice from "./redux/orderDetails/orderDetailsSlice";


const rootReducer = combineReducers({
  user: registerUserSlice,
  allProducts: allProductsSlice,
  productDetails: productDetailsSlice,
  cart:cartSlice,
  newOrder:newOrderSlice,
  myOrders:myOrderSlice,
  orderDetails:orderDetailsSlice,
});
const persistConfig = {
  key: "root",
  storage,
  version: 1,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);
