
import "./OrderDetails.css";
// import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import Loader from "../layout/loader/Loader";


const OrderDetails = () => {
//   const { order, error, loading } = useSelector((state) => state.orderDetails);

//   const dispatch = useDispatch();


  const loading=false
  const order={
    "_id": "60f2e89b1c05540015a34e44",
    "user": {
      "name": "John Doe"
    },
    "shippingInfo": {
      "phoneNo": "+1234567890",
      "address": "123 Main Street",
      "city": "Anytown",
      "state": "ABC",
      "pinCode": "12345",
      "country": "Country X"
    },
    "paymentInfo": {
      "status": "succeeded"
    },
    "totalPrice": 100,
    "orderStatus": "Delivered",
    "orderItems": [
      {
        "product": "60f2e89b1c05540015a34e45",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ21UFvcUnCKJlS6CzgllslS-3_iBiAkr_jVTFjzM19-g&s",
        "name": "Product 1",
        "quantity": 2,
        "price": 50
      },
      {
        "product": "60f2e89b1c05540015a34e46",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwiHvgIobm6r4qOSM6Nl4c_vCmWsNuW1JXdiQtKRAWRg&s",
        "name": "Product 2",
        "quantity": 1,
        "price": 100
      }
    ]
  }
  
  return (
    <>
      {loading ? (
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
                      <img src={item.image} alt="Product" />
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