import  {  useEffect, useState } from "react";
import {  useDispatch } from "react-redux";
import "./ProductList.css";

import { Button } from "@material-ui/core";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "./Sidebar";
import { imageLink, serverURL } from "../config/config";
import {toast} from "react-toastify"
import MetaData from "../components/layout/MetaData";
import { useNavigate, useParams } from "react-router-dom";
import { productDetailsAction } from "../redux/products/productDetailsSlice";
import Loader from "../components/layout/loader/Loader";
const UpdateProduct = () => {
  const dispatch = useDispatch();

const params=useParams()
  


  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  
  const [loading, setLoading] = useState(false);

  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];
const navigate=useNavigate()
  const productId = params.id;
  useEffect(() => {
    const showProductDetails = async (productId) => {
      try {
        setLoading(true)
        dispatch(productDetailsAction.PRODUCT_DETAILS_REQUEST());
  
        const res = await fetch(`${serverURL}/product/single-product/${productId}`);
        const data = await res.json();
  
        if (data.success === false) {
          dispatch(productDetailsAction.PRODUCT_DETAILS_FAIL(data.message));
          return;
        }
  
        const { name, price, description, category, stock, pictures } = data.singleProduct;
  
        setName(name);
        setPrice(price);
        setDescription(description);
        setCategory(category);
        setStock(stock);
        setOldImages(pictures);
        dispatch(productDetailsAction.PRODUCT_DETAILS_SUCCESS(data));
        setLoading(false)
      } catch (error) {
        setLoading(false)

        dispatch(productDetailsAction.ALL_PRODUCT_FAIL(error.message));
      }
    };
  
    showProductDetails(productId);
  }, [dispatch, productId, productDetailsAction]);
  
  const updateProductSubmitHandler = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("stock", stock);
  
    for (const image of images) {
      formData.append("pictures", image);
    
    }
  
    try {
      setLoading(true);
  
      const response = await fetch(`${serverURL}/product/update-product/${productId}`, {
        method: "POST",
        credentials: "include",
        body: formData
      });
  
      const data = await response.json();
  
      setLoading(false);
  
      if (!data.success) {
        toast.error(data.message);
        return;
      }
  
      toast.success(data.message);
      navigate("/admin/products");
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  const updateProductImagesChange = (e) => {
    setImages(e.target.files)
    setOldImages([]);
 
  };
  const imageUrls = Array.from(images).map((file) =>
  URL.createObjectURL(file)
  );
  return (
    <>
      <MetaData title="Update Product" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
        {loading ? (
            <Loader />
          ) : (
    <form className="createProductForm" encType="multipart/form-data" onSubmit={updateProductSubmitHandler}>
      <h1>Create Product</h1>

      <div>
        <SpellcheckIcon />
        <input
          type="text"
          placeholder="Product Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <AttachMoneyIcon />
        <input
          type="number"
          placeholder="Price"
          required
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      <div>
        <DescriptionIcon />
        <textarea
          placeholder="Product Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          cols="30"
          rows="1"
        ></textarea>
      </div>

      <div>
        <AccountTreeIcon />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Choose Category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div>
        <StorageIcon />
        <input
          type="number"
          placeholder="Stock"
          required
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
      </div>

      <div id="createProductFormFile">
        <input
          type="file"
          name="avatar"
          accept="image/*"
          onChange={updateProductImagesChange}
          multiple
        />
      </div>

      <div id="createProductFormImage">
        {oldImages && oldImages.map((image, index) => (
          <img key={index} src={imageLink + image} alt="Old Product Preview" />
        ))}
      </div>

      <div id="createProductFormImage">
        {imageUrls.map((image, index) => (
          <img key={index} src={image} alt="Product Preview" />
        ))}
      </div>

      <Button id="createProductBtn"  disabled={loading ? true : false} type="submit">Update</Button>
    </form>
       )}
  </div>
      </div>
    </>
  );
};

export default UpdateProduct;