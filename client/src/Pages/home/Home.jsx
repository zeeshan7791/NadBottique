import "./Home.css";
// import {CgMouse} from "react-icons/all"
import { CgMouse } from "react-icons/cg";
import ProductCard from "../../components/products/ProductCard";
import MetaData from "../../components/layout/MetaData";
const Home = () => {
  const product = {
    name: "car",
    description: "brand new car",
    price: 500,
    _id: "1",
  };
  return (
    <>
      <MetaData title={"Nad Boutique"} />
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
        <ProductCard key={product._id} product={product} />
        <ProductCard key={product._id} product={product} />
        <ProductCard key={product._id} product={product} />
        <ProductCard key={product._id} product={product} />
        <ProductCard key={product._id} product={product} />
        <ProductCard key={product._id} product={product} />
        <ProductCard key={product._id} product={product} />
        <ProductCard key={product._id} product={product} />
      </div>
    </>
  );
};

export default Home;
