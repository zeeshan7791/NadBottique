import  {  useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./ProductReview.css";
import { useSelector, useDispatch } from "react-redux";

import { Button } from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";
import Star from "@material-ui/icons/Star";

import SideBar from "./Sidebar";
import MetaData from "../components/layout/MetaData";
import { serverURL } from "../config/config";
import { productAllReviewsAction } from "../redux/productReviews/productReviewsSlice";
import { toast } from "react-toastify";

const ProductReviews = () => {
  const dispatch = useDispatch();

  const { reviews, loading } = useSelector(
    (state) => state.productReviews
  );


  const [productId, setProductId] = useState("");

  const deleteReviewHandler = async(reviewId,productId) => {
    
   
    try {
        dispatch(productAllReviewsAction.ADMIN_PRODUCTALLREVIEWS_REQUEST());
        const res = await fetch(`${serverURL}/product/delete-review?id=${reviewId}&productId=${productId}`, {
          method: "DELETE",
          credentials: "include",
        });
        const data = await res.json();
  
        if (data.success === false) {
            toast.error(data.message)
          dispatch(productAllReviewsAction.ADMIN_PRODUCTALLREVIEWS_FAIL(data.message));
          return;
        }
        toast.success(data.message)
        dispatch(productAllReviewsAction.ADMIN_DELETEREVIEW_SUCCESS(reviewId));
      } catch (error) {
        toast.error(error)
        dispatch(productAllReviewsAction.ADMIN_PRODUCTALLREVIEWS_FAIL(error));
      }
  };

  const productReviewsSubmitHandler =async (e) => {
    e.preventDefault();
    try {
        dispatch(productAllReviewsAction.ADMIN_PRODUCTALLREVIEWS_REQUEST());
        const res = await fetch(`${serverURL}/product/all-reviews?id=${productId}`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
  
        if (data.success === false) {
          dispatch(productAllReviewsAction.ADMIN_PRODUCTALLREVIEWS_FAIL(data.message));
          return;
        }
       
        if (productId.length === 24) {
            dispatch(productAllReviewsAction.ADMIN_PRODUCTALLREVIEWS_SUCCESS(data.reviews))
          }
       
      } catch (error) {
        dispatch(productAllReviewsAction.ADMIN_PRODUCTALLREVIEWS_FAIL(error.message));
      }
  };


  const columns = [
    { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },

    {
      field: "user",
      headerName: "User",
      minWidth: 200,
      flex: 0.6,
    },

    {
      field: "comment",
      headerName: "Comment",
      minWidth: 350,
      flex: 1,
    },

    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 180,
      flex: 0.4,

      cellClassName: (params) => {
        return params.getValue(params.id, "rating") >= 3
          ? "greenColor"
          : "redColor";
      },
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
           <Button
    onClick={() =>
        deleteReviewHandler(
            params.getValue(params.id, "id"),
            productId  // Pass productId here
        )
    }
>
    <DeleteIcon />
</Button>
          </>
        );
      },
    },
  ];

  const rows = [];
 

  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        rating: item.rating,
        comment: item.comment,
        user: item.name,
      });
    });

  return (
    <>
      <MetaData title={`ALL REVIEWS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productReviewsContainer">
          <form
            className="productReviewsForm"
            onSubmit={productReviewsSubmitHandler}
          >
            <h1 className="productReviewsFormHeading">ALL REVIEWS</h1>

            <div>
              <Star />
              <input
                type="text"
                placeholder="Product Id"
                required
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={
                loading ? true : false || productId === "" ? true : false
              }
            >
              Search
            </Button>
          </form>

          {reviews && reviews.length > 0 ? (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="productListTable"
              autoHeight
            />
          ) : (
            <h1 className="productReviewsFormHeading">No Reviews Found</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductReviews;