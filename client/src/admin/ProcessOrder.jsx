import  { useEffect, useState } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";
import { Typography } from "@material-ui/core";
import SideBar from "./Sidebar";

import { useSelector, useDispatch } from "react-redux";


import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { Button } from "@material-ui/core";

import "./ProcessOrder.css";
import { orderDetailsActions } from "../redux/orderDetails/orderDetailsSlice";
import MetaData from "../components/layout/MetaData";
import { imageLink, serverURL } from "../config/config";
import Loader from "../components/layout/loader/Loader";
import { toast } from "react-toastify";

const ProcessOrder = () => {
    const { orderDetails,isLoading } = useSelector((state) => state.orderDetails);
const [loading,setLoading]=useState(false)
const params=useParams()
 
  const dispatch = useDispatch();
const navigate=useNavigate()

  
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
  }, [dispatch]);

  const {order}=orderDetails

  const [status, setStatus] = useState("");
  const updateOrderSubmitHandler = async (e) => {
    e.preventDefault();
    const myForm = new FormData();
  
    myForm.append("status", status);
  
    try {
      setLoading(true);
  
      const response = await fetch(`${serverURL}/order/update-order/${params.id}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });
  
      const data = await response.json();
  
      setLoading(false);
  
      if (!data.success) {
        toast.error(data.message);
        return;
      }
  
      toast.success(data.message);
      navigate("/admin/orders");
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };
  

  return (
    <>
      <MetaData title="Process Order" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          {isLoading ? (
            <Loader />
          ) : (
            <div
              className="confirmOrderPage"
              style={{
                display: order.orderStatus === "Delivered" ? "block" : "grid",
              }}
            >
              <div>
                <div className="confirmshippingArea">
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
                <div className="confirmCartItems">
                  <Typography>Your Cart Items:</Typography>
                  <div className="confirmCartItemsContainer">
                    {order.orderItems &&
                      order.orderItems.map((item) => (
                        <div key={item.product}>
                          <img src={imageLink+ item.image} alt="Product" />
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
              {/*  */}
              <div
                style={{
                  display: order.orderStatus === "Delivered" ? "none" : "block",
                }}
              >
                <form
                  className="updateOrderForm"
                  onSubmit={updateOrderSubmitHandler}
                >
                  <h1>Process Order</h1>

                  <div>
                    <AccountTreeIcon />
                    <select onChange={(e) => setStatus(e.target.value)}>
                      <option value="">Choose Category</option>
                      {order.orderStatus === "Processing" && (
                        <option value="Shipped">Shipped</option>
                      )}

                      {order.orderStatus === "Shipped" && (
                        <option value="Delivered">Delivered</option>
                      )}
                    </select>
                  </div>

                  <Button
                    id="createProductBtn"
                    type="submit"
                    disabled={
                      loading ? true : false || status === "" ? true : false
                    }
                  >
                    Process
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProcessOrder;