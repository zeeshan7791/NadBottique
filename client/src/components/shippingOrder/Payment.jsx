import  { useRef } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Typography } from "@material-ui/core";

import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";


import "./Payment.css";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { serverURL } from "../../config/config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "./CheckoutSteps";
import MetaData from "../layout/MetaData";
import { orderActions } from "../../redux/orderDetails/newOrderSlice";

const Payment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
// console.log(orderInfo,'value in orderInfo')
  const dispatch = useDispatch();
 const navigate=useNavigate()
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { currentUser } = useSelector((state) => state.user);


  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

const createOrder=async(order)=>{
  console.log(order,'value in order')
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = order;
  try{
dispatch(orderActions.CREATE_ORDER_REQUEST())
const res = await fetch(`${serverURL}/order/create-order`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include",
  body: JSON.stringify({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  })
});
const data=await res.json()

if(data.success===false){
  toast.error(data.message)
  return
}
if(data.success){
  dispatch(orderActions.CREATE_ORDER_SUCCESS(data))
  toast.success(data.message)
  navigate("/success");

  return
}

  }
  catch(error){
dispatch(orderActions.CREATE_ORDER_FAIL(error.message))
  }
}
  const submitHandler = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;

    try { 
    
      const res = await fetch(`${serverURL}/payment/process`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        
        },
        credentials: "include",
        body:JSON.stringify(paymentData),
      });
      const data=await res.json()
      console.log(data,'value in Data')
      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: currentUser.name,
            email: currentUser.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });


      if (result.error) {
        payBtn.current.disabled = false;

        toast.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

        //   dispatch(createOrder(order));
        createOrder(order)

    
        } else {
          toast.error("There's some issue while processing payment ");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
   toast.error(error)
    }
  };


  return (
    <>
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={2} />
      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          <Typography>Card Info</Typography>
          <div>
            <CreditCardIcon />
            <CardNumberElement className="paymentInput" />
          </div>
          <div>
            <EventIcon />
            <CardExpiryElement className="paymentInput" />
          </div>
          <div>
            <VpnKeyIcon />
            <CardCvcElement className="paymentInput" />
          </div>

          <input
            type="submit"
            value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="paymentFormBtn"
          />
        </form>
      </div>
    </>
  );
};

export default Payment;