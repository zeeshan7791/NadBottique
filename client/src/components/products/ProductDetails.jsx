import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import Carousel from "react-material-ui-carousel";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import "./ProductDetails.css";
import ReviewCard from "./ReviewCard";
const ProductDetails = () => {
  const { productDetails } = useSelector((state) => state.productDetails);
  console.log(productDetails, "productDetails");
  const options = {
    size: "large",
    value: productDetails.singleProduct.ratings,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <>
      <MetaData title={`${productDetails.singleProduct.name} -- ECOMMERCE`} />
      <div className="ProductDetails">
        <div>
          {/* <Carousel>
            {product.images &&
              product.images.map((item, i) => (
                <img
                  className="CarouselImage"
                  key={i}
                  src={item.url}
                  alt={`${i} Slide`}
                />
              ))}
          </Carousel> */}
        </div>

        <div>
          <div className="detailsBlock-1">
            <h2>{productDetails.singleProduct.name}</h2>
            <p>Product # {productDetails.singleProduct._id}</p>
          </div>
          <div className="detailsBlock-2">
            <Rating {...options} />
            <span className="detailsBlock-2-span">
              {" "}
              ({productDetails.singleProduct.numOfReviews} Reviews)
            </span>
          </div>
          <div className="detailsBlock-3">
            <h1>{`₹${productDetails.singleProduct.price}`}</h1>
            <div className="detailsBlock-3-1">
              <div className="detailsBlock-3-1-1">
                <button onClick={"decreaseQuantity"}>-</button>
                <input readOnly type="number" value={"quantity"} />
                <button onClick={"increaseQuantity"}>+</button>
              </div>
              <button
                disabled={"product.Stock < 1 ? true : false"}
                onClick={"addToCartHandler"}
              >
                Add to Cart
              </button>
            </div>

            <p>
              Status:
              {/* <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                {product.Stock < 1 ? "OutOfStock" : "InStock"}
              </b> */}
            </p>
          </div>

          <div className="detailsBlock-4">
            Description : <p>{productDetails.singleProduct.description}</p>
          </div>

          <button onClick={"submitReviewToggle"} className="submitReview">
            Submit Review
          </button>
        </div>
      </div>
      <h3 className="reviewsHeading">REVIEWS</h3>
      {/* <Dialog
        aria-labelledby="simple-dialog-title"
        open={open}
        onClose={"submitReviewToggle"}
      >
        <DialogTitle>Submit Review</DialogTitle>
        <DialogContent className="submitDialog">
          <Rating
            onChange={(e) => setRating(e.target.value)}
            value={rating}
            size="large"
          />

          <textarea
            className="submitDialogTextArea"
            cols="30"
            rows="5"
            // value={comment}
            // onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </DialogContent>
        <DialogActions>
          <Button onClick={"submitReviewToggle"} color="secondary">
            Cancel
          </Button>
          <Button onClick={"reviewSubmitHandler"} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog> */}
      {productDetails.singleProduct.reviews &&
      productDetails.singleProduct.reviews[0] ? (
        <div className="reviews">
          {productDetails.singleProduct.reviews &&
            productDetails.singleProduct.reviews.map((review) => (
              <ReviewCard key={review._id} review={review} />
            ))}
        </div>
      ) : (
        <p className="noReviews">No Reviews Yet</p>
      )}{" "}
      *
    </>
  );
};

export default ProductDetails;
