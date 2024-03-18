import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { Rating } from "@material-ui/lab";
import { imageLink } from "../../config/config";

const ProductCard = ({ product }) => {
  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <>
      <Link
        key={product._id}
        className="productCard"
        to={`/product/${product._id}`}
      >
        <img src={imageLink + product.pictures[0]} alt={product.name} />
        <p>{product.name}</p>
        <p>{product.description}</p>

        <div>
          <Rating {...options} /> <span className="productCardSpan"></span>
        </div>
        <span>{`₹${product.price}`}</span>
      </Link>
    </>
  );
};

ProductCard.propTypes = {
  product: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      pictures: PropTypes.array.isRequired,
      price: PropTypes.number.isRequired,
      Rating: PropTypes.string.isRequired,
      // Add more properties as needed
    })
  ).isRequired,
};

export default ProductCard;
