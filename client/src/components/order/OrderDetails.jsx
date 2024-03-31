
import "./OrderDetails.css";
// import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Link, useParams } from "react-router-dom";
import { Typography } from "@material-ui/core";
import Loader from "../layout/loader/Loader";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderDetailsActions } from "../../redux/orderDetails/orderDetailsSlice";
import { imageLink, serverURL } from "../../config/config";


const OrderDetails = () => {
  

//   const dispatch = useDispatch();
const params=useParams()

  
  const dispatch=useDispatch()
  const { orderDetails,isLoading } = useSelector((state) => state.orderDetails);
  const {isAuthenticated } = useSelector((state) => state.user);
  
  const showOrderDetails = async () => {
    try {
      dispatch(orderDetailsActions.CREATE_ORDERDETAILS_REQUEST());
      const res = await fetch(`${serverURL}/order/order-details/${params.id}`,{
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(orderDetailsActions.CREATE_ORDERDETAILS_FAIL(data.message));
        return;
      }
      dispatch(orderDetailsActions.CREATE_ORDERDETAILS_SUCCESS(data));
      return;
    } catch (error) {
      dispatch(orderDetailsActions.CREATE_ORDERDETAILS_FAIL(error.message));
    }
  };

  useEffect(() => {
    showOrderDetails();
  }, [dispatch,isAuthenticated]);
  const {order}=orderDetails
  
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Order Details" />
          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              <Typography component="h1">
                Order #{order && order._id}
              </Typography>
              <Typography>Shipping Info</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>Name:</p>
                  <span>{order.user && order.user.name}</span>
                </div>
                <div>
                  <p>Phone:</p>
                  <span>
                    {order.shippingInfo && order.shippingInfo.phoneNo}
                  </span>
                </div>
                <div>
                  <p>Address:</p>
                  <span>
                    {order.shippingInfo &&
                      `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                  </span>
                </div>
              </div>
              <Typography>Payment</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.paymentInfo &&
                    order.paymentInfo.status === "succeeded"
                      ? "PAID"
                      : "NOT PAID"}
                  </p>
                </div>

                <div>
                  <p>Amount:</p>
                  <span>{order.totalPrice && order.totalPrice}</span>
                </div>
              </div>

              <Typography>Order Status</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.orderStatus && order.orderStatus === "Delivered"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.orderStatus && order.orderStatus}
                  </p>
                </div>
              </div>
            </div>

            <div className="orderDetailsCartItems">
              <Typography>Order Items:</Typography>
              <div className="orderDetailsCartItemsContainer">
                {order.orderItems &&
                  order.orderItems.map((item) => (
                    <div key={item.product}>
                      <img src={imageLink+item.image} alt="Product" />
                      <Link to={`/product/${item.product}`}>
                        {item.name}
                      </Link>{" "}
                      <span>
                        {item.quantity} X ₹{item.price} ={" "}
                        <b>₹{item.price * item.quantity}</b>
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default OrderDetails;