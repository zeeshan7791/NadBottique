import "./Home.css";
// import {CgMouse} from "react-icons/all"
import { CgMouse } from "react-icons/cg";
import ProductCard from "../../components/products/ProductCard";

import { useDispatch } from "react-redux";
import { allProductsActions } from "../../redux/products/allProductsSlice";
import { useEffect, useState } from "react";
// import axios from "axios";
import MetaData from "../../components/layout/MetaData";

import Loader from "../../components/layout/loader/Loader";
import { toast } from "react-toastify";
const Home = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const showAllProducts = async () => {
    try {
      dispatch(allProductsActions.ALL_PRODUCT_REQUEST());
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/product/all-products");
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
        {loading ? <Loader /> : <ProductCard />}
      </div>
    </>
  );
};

export default Home;
