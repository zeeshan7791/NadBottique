import { Link } from "react-router-dom";
// import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const ProductCard = () => {
  const { allProducts } = useSelector((state) => state.allProducts);

  return (
    <>
      {allProducts.products.map((product) => (
        <Link key={product._id} className="productCard" to={`/${product._id}`}>
          <p>{product.name}</p>
          <p>{product.description}</p>

          <div>
            <span className="productCardSpan"></span>
          </div>
          <span>{`₹${product.price}`}</span>
        </Link>
      ))}
    </>
  );
};

// ProductCard.propTypes = {
//   allProducts: PropTypes.arrayOf(
//     PropTypes.shape({
//       _id: PropTypes.string.isRequired,
//       name: PropTypes.string.isRequired,
//       description: PropTypes.string.isRequired,
//       price: PropTypes.number.isRequired,
//       // Add more properties as needed
//     })
//   ).isRequired,
// };

export default ProductCard;
