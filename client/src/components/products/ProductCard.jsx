import { Link } from "react-router-dom";
// import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { productDetailsAction } from "../../redux/products/productDetailsSlice";
import { toast } from "react-toastify";

const ProductCard = () => {
  const { allProducts } = useSelector((state) => state.allProducts);
  const { productDetails } = useSelector((state) => state.productDetails);
  const dispatch = useDispatch();

  const showProductDetails = async (productId) => {
    try {
      dispatch(productDetailsAction.PRODUCT_DETAILS_REQUEST());

      const res = await fetch(
        `http://localhost:5000/api/product/single-product/${productId}`
      );
      const data = await res.json();
      console.log(data, "value in data------");
      if (data.success === false) {
        dispatch(productDetailsAction.PRODUCT_DETAILS_FAIL(data.message));
        return;
      }
      dispatch(productDetailsAction.PRODUCT_DETAILS_SUCCESS(data));
      toast.success(data.message);
    } catch (error) {
      dispatch(productDetailsAction.ALL_PRODUCT_FAIL(error.message));
    }
  };
  console.log(productDetails, "productDetails----------");
  return (
    <>
      {allProducts.products.map((product) => (
        <Link
          key={product._id}
          onClick={() => showProductDetails(product._id)}
          className="productCard"
          to={`/product/${product._id}`}
        >
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
