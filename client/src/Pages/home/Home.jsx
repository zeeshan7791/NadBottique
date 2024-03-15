import "./Home.css";
// import {CgMouse} from "react-icons/all"
import { CgMouse } from "react-icons/cg";
import ProductCard from "../../components/products/ProductCard";

import { useDispatch, useSelector } from "react-redux";
import { allProductsActions } from "../../redux/products/allProductsSlice";
import { useEffect } from "react";
import axios from "axios";
import MetaData from "../../components/layout/MetaData";
import { Link } from "react-router-dom";
const Home = () => {
  const dispatch = useDispatch();

  const showAllProducts = async () => {
    try {
      dispatch(allProductsActions.ALL_PRODUCT_REQUEST());
      const data = await axios.get(
        "http://localhost:5000/api/product/all-products"
      );

      console.log(data, "value in data------");
      if (data.success === false) {
        dispatch(allProductsActions.ALL_PRODUCT_FAIL(data.message));
        return;
      }
      dispatch(allProductsActions.ALL_PRODUCT_SUCCESS(data));
    } catch (error) {
      dispatch(allProductsActions.ALL_PRODUCT_FAIL(error.message));
    }
  };

  useEffect(() => {
    showAllProducts();
  }, [dispatch]);

  return (
    <>
      <MetaData title={"Nadboutique"} />
      <div className="banner">
        <p>Welcome to Ecommerce</p>

        <h1>FIND AMAZING PRODUCTS BELOW</h1>

        <a href="#container">
          <button>
            Scroll <CgMouse />
          </button>
        </a>
      </div>
      <h2 className="homeHeading">Featured Products</h2>
      <div className="container" id="container">
        <ProductCard />
      </div>
    </>
  );
};

export default Home;
