
import "./Cart.css";
import CartItemCard from "./CartItemCard";
import { useSelector, useDispatch } from "react-redux";

import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Link, useNavigate } from "react-router-dom";
import { cartItemsAction } from "../../redux/cartItems/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const { cartItems } = useSelector((state) => state.cart);

  const increaseQuantity = (id,name,price,image, stock,quantity) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    let data={
        product: id,
        name:name,
        price:price,
        image:image,
        stock:stock,
        quantity:newQty,
      }
   
      dispatch(cartItemsAction.ADD_TO_CART(data))

  };

  const decreaseQuantity = (id,name,price,image,quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    let data={
        product: id,
        name:name,
        price:price,
        image:image,
        quantity:newQty,
      }
    dispatch(cartItemsAction.ADD_TO_CART(data))

  };

  const deleteCartItems = (id) => {
    dispatch(cartItemsAction.REMOVE_CART_ITEM(id))
  };

  const checkoutHandler = () => {
    navigate("/shipping");
  };
  return (
    <>
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <RemoveShoppingCartIcon />

          <Typography>No Product in Your Cart</Typography>
          <Link to="/products">View Products</Link>
        </div>
      ) : (
        <>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>

            {cartItems &&
              cartItems.map((item) => (
                <div className="cartContainer" key={item.product}>
                  <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                  <div className="cartInput">
                    <button
                      onClick={() =>
                        decreaseQuantity(item.product,item.name,item.price,item.image, item.quantity)
                      }
                    >
                      -
                    </button>
                    <input type="number" value={item.quantity} readOnly />
                    <button
                      onClick={() =>
                        increaseQuantity(item.product,item.name,item.price,item.image,item.stock, item.quantity)
                      }
                    >
                      +
                    </button>
                  </div>
                  <p className="cartSubtotal">{`₹${
                    item.price * item.quantity
                  }`}</p>
                </div>
              ))}

            <div className="cartGrossProfit">
              <div></div>
              <div className="cartGrossProfitBox">
                <p>Gross Total</p>
                <p>{`₹${cartItems.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0
                )}`}</p>
              </div>
              <div></div>
              <div className="checkOutBtn">
                <button onClick={checkoutHandler}>Check Out</button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;