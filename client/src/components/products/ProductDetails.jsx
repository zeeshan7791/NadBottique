import { useDispatch, useSelector } from "react-redux";
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

import { productDetailsAction } from "../../redux/products/productDetailsSlice";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { serverURL, imageLink } from "../../config/config";
import { cartItemsAction } from "../../redux/cartItems/cartSlice";
import { toast } from "react-toastify";
const ProductDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const productId = params.productId;
  const { productDetails } = useSelector((state) => state.productDetails);
  const { cartItems } = useSelector((state) => state.cart);
  console.log(productDetails, "productDetails");
  const { singleProduct } = productDetails;
  const options = {
    size: "large",
    value: singleProduct.ratings,
    readOnly: true,
    precision: 0.5,
  };


  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const increaseQuantity = () => {
    if (singleProduct.stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };
  const showProductDetails = async (productId) => {
    try {
      dispatch(productDetailsAction.PRODUCT_DETAILS_REQUEST());

      const res = await fetch(`${serverURL}/product/single-product/${productId}`
      );
      const data = await res.json();

      if (data.success === false) {
        dispatch(productDetailsAction.PRODUCT_DETAILS_FAIL(data.message));
        return;
      }
      dispatch(productDetailsAction.PRODUCT_DETAILS_SUCCESS(data));
    } catch (error) {
      dispatch(productDetailsAction.ALL_PRODUCT_FAIL(error.message));
    }
  };
  useEffect(() => {
    showProductDetails(productId);
  }, [dispatch, productId]);

  const addToCartHandler=(id,name,price,image,stock,quantity)=>{
  let data={
    product: id,
    name: name,
    price:price,
    image:image,
    stock:stock,
    quantity,
  }
    dispatch(cartItemsAction.ADD_TO_CART(data))
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    toast.success("item added to cart")
    return
  }
//  console.log(singleProduct,'value in single product')
const submitReviewToggle = () => {
  open ? setOpen(false) : setOpen(true);
};

const reviewSubmitHandler =async () => {
 try{

   
   
   const res = await fetch(`${serverURL}/product/review`, {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        rating,
        comment,
        productId
      }),
    });
    const data=await res.json()
    console.log(data,'review-------')
    if(data.success==false){
      toast.error(data.message)
      return

    }
    if(data.success){
toast.success(data.message)
      setOpen(false);
    }

    
  }
    
    catch(error){
      toast.error(error)
    }

};

  return (
    <>
      <MetaData title={`${singleProduct.name} -- ECOMMERCE`} />
      <div className="ProductDetails">
        <div>
           <Carousel
            className="CarouselImageWrapper"
            style={{ width: "100%", height: "100%" }}
          >
            {singleProduct.pictures &&
              singleProduct.pictures.map((picture, i) => (
                <img
                  className="CarouselImage"
                  key={i}
                  src={imageLink + picture}
                  alt={`${i} Slide`}
                />
              ))}
          </Carousel> 
        </div>

        <div>
          <div className="detailsBlock-1">
            <h2>{singleProduct.name}</h2>
            <p>Product # {singleProduct._id}</p>
          </div>
          <div className="detailsBlock-2">
            <Rating {...options} />
            <span className="detailsBlock-2-span">
              {" "}
              ({singleProduct.numOfReviews} Reviews)
            </span>
          </div>
          <div className="detailsBlock-3">
            <h1>{`₹${singleProduct.price}`}</h1>
            <div className="detailsBlock-3-1">
              <div className="detailsBlock-3-1-1">
                <button onClick={decreaseQuantity}>-</button>
                <input readOnly type="number" value={quantity} />
                <button onClick={increaseQuantity}>+</button>
              </div>
              <button
                disabled={singleProduct.stock < 1 ? true : false}
                onClick={()=>addToCartHandler(singleProduct._id,singleProduct.name,singleProduct.price,singleProduct.pictures[0],singleProduct.stock,quantity)}
              >
                Add to Cart
              </button>
            </div>

            <p>
              Status:
              <b
                className={singleProduct.stock < 1 ? "redColor" : "greenColor"}
              >
                {singleProduct.stock < 1 ? "OutOfStock" : "InStock"}
              </b>
            </p>
          </div>

          <div className="detailsBlock-4">
            Description : <p>{productDetails.singleProduct.description}</p>
          </div>

          <button onClick={submitReviewToggle} className="submitReview">
            Submit Review
          </button>
        </div> 
      </div>
      <h3 className="reviewsHeading">REVIEWS</h3>
       <Dialog
        aria-labelledby="simple-dialog-title"
        open={open}
        onClose={submitReviewToggle}
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
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </DialogContent>
        <DialogActions>
          <Button onClick={submitReviewToggle} color="secondary">
            Cancel
          </Button>
          <Button onClick={reviewSubmitHandler} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog> 
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
      )}
      
    </>
  );
};

export default ProductDetails;
