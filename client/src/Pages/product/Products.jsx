import React, { useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";

import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import { useParams } from "react-router-dom";
import { allProductsActions } from "../../redux/products/allProductsSlice";
import { toast } from "react-toastify";
import Loader from "../../components/layout/loader/Loader";
import MetaData from "../../components/layout/MetaData";
import ProductCard from "../../components/products/ProductCard";

const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];

const Products = () => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState("");

  const [ratings, setRatings] = useState(0);

  const { allProducts } = useSelector((state) => state.allProducts);
  const params = useParams();
  const keyword = params.keyword;
  console.log(keyword, "value in keyword");
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };
  let count = allProducts.filteredProductsCount;

  const showAllProducts = async (keyword, currentPage, category, price) => {
    try {
      dispatch(allProductsActions.ALL_PRODUCT_REQUEST());
      setLoading(true);
      let link = `http://localhost:5000/api/product/all-products??keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
      if (category) {
        link = `http://localhost:5000/api/product/all-products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
      }
      const res = await fetch(link);
      const data = await res.json();
      console.log(data, "value in data------");
      if (data.success === false) {
        dispatch(allProductsActions.ALL_PRODUCT_FAIL(data.message));
        return;
      }
      dispatch(allProductsActions.ALL_PRODUCT_SUCCESS(data));
      toast.success(data.message);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      dispatch(allProductsActions.ALL_PRODUCT_FAIL(error.message));
    }
  };

  useEffect(() => {
    showAllProducts(keyword, currentPage, category, price);
  }, [dispatch, keyword, currentPage, category, price]);
  console.log(allProducts, "allProducts-------");
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="PRODUCTS -- ECOMMERCE" />
          <h2 className="productsHeading">Products</h2>

          <div className="products">
            {allProducts.products &&
              allProducts.products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>

          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={25000}
            />

            <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>

            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
          </div>
          {allProducts.resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={allProducts.resultPerPage}
                totalItemsCount={allProducts.productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Products;
