import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import WebFont from "webfontloader";
import Header from "./components/layout/header/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./Pages/home/Home";
import Footer from "./components/layout/footer/Footer";
import LoginSignUp from "./Pages/loginSignUp/Auth";
import ProductDetails from "./components/products/ProductDetails";
import Products from "./Pages/product/Products";
import Search from "./components/products/Search";
import { useSelector } from "react-redux";
import MenuOption from "./components/layout/header/MenuOption";
import Profile from "./components/user/Profile";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgotPassword from "./components/user/ForgotPassword";
import Cart from "./components/cart/Cart";
import Shipping from "./components/shippingOrder/Shipping";
import ConfirmOrder from "./components/shippingOrder/ConfirmOrder";
import { serverURL } from "./config/config";
import Payment from "./components/shippingOrder/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./components/shippingOrder/OrderSuccess";
import MyOrders from "./components/order/MyOrder";
import OrderDetails from "./components/order/OrderDetails";
const App = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const [isStripeKey,setStripeApiKey]=useState("")
  const getStripeKey=async()=>{
    const res=await fetch(`${serverURL}/payment/stripeapikey`,{
      method: "GET",
      credentials: "include",
    

    })
    const data=await res.json()
   
    setStripeApiKey(data.stripeApiKey)
  }
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    if(isAuthenticated){
   
      getStripeKey()
    }

      
  }, [isAuthenticated]);
 return (
    <>
      <BrowserRouter>
        <Header />
        {isAuthenticated && <MenuOption />}
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/product/:productId"
            element={<ProductDetails />}
          ></Route>
          <Route path="/products" element={<Products />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/shipping" element={<Shipping/>}></Route>
          <Route path="/orders" element={<MyOrders/>}></Route>

   {isStripeKey && (
  <Route exact path="/process/payment" element={
    <Elements stripe={loadStripe(isStripeKey)}>
      <Payment />
    </Elements>
  } />
)} 
          <Route path="/success" element={<OrderSuccess/>}></Route>
          <Route path="/order/confirm" element={<ConfirmOrder/>}></Route>
          <Route path="/order/:id" element={<OrderDetails/>}></Route>
          <Route path="/products/:keyword" element={<Products />}></Route>
          <Route path="/Search" element={<Search />}></Route>
          <Route path="/login" element={<LoginSignUp />}></Route>
          <Route path="/account" element={<Profile />}></Route>
          <Route path="/me/update" element={<UpdateProfile />}></Route>
          <Route path="/password/update" element={<UpdatePassword />}></Route>
          <Route path="/password/forgot" element={<ForgotPassword />}></Route>
          <Route
            path="/password/reset/:token"
            element={<ForgotPassword />}
          ></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
