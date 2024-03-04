import { Link } from "react-router-dom";
import PropTypes from "prop-types";
const ProductCard = ({ product }) => {
  return (
    <Link className="productCard" to={product._id}>
      {/* <img src={product.images[0].url} alt={product.name} /> */}
      <p>{product.name}</p>
      <p>{product.description}</p>

      <div>
        {/* <Rating {...options} />{" "} */}
        <span className="productCardSpan">
          {" "}
          {/* ({product.numOfReviews} Reviews) */}
        </span>
      </div>
      <span>{`₹${product.price}`}</span>
    </Link>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired, // Assuming userRef is a required string
    name: PropTypes.string.isRequired, // Adding name property validation
    // pictures: PropTypes.string.isRequired, // Adding name property validation
    description: PropTypes.string.isRequired, // Adding name property validation
    price: PropTypes.number.isRequired, // Adding name property validation
    // address: PropTypes.string.isRequired, // Adding name property validation
    // offer: PropTypes.string.isRequired, // Adding name property validation
    // discountPrice: PropTypes.string.isRequired, // Adding name property validation
    // regularPrice: PropTypes.string.isRequired, // Adding name property validation
    // type: PropTypes.string.isRequired, // Adding name property validation
    // bathrooms: PropTypes.string.isRequired, // Adding name property validation
    // bedrooms: PropTypes.string.isRequired, // Adding name property validation
    // Add other properties if needed
  }).isRequired,
};
export default ProductCard;
