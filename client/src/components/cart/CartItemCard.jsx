
import PropTypes from "prop-types";
import "./CartItemCard.css";
import { Link } from "react-router-dom";
import { imageLink } from "../../config/config";

const CartItemCard = ({ item, deleteCartItems }) => {

  return (
    <div className="CartItemCard">
      <img src={imageLink + item.image} alt="ssa" />
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`Price: ₹${item.price}`}</span>
        <p onClick={() => deleteCartItems(item.product)}>Remove</p>
      </div>
    </div>
  );
};

CartItemCard.propTypes = {
  item: PropTypes.shape({
    image: PropTypes.string.isRequired,
    product: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  deleteCartItems: PropTypes.func.isRequired,
};

export default CartItemCard;
