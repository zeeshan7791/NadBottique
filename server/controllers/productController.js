const Product = require("../Models/productModel");
const errorHandler = require("../utils/error");

// admin create Product
const createProduct = async (req, res, next) => {
  try {
    console.log(req.body, "value in req.body");
    let pics = [];
    req.files.map((item) => {
      pics.push(item.filename);
    });
    req.body.pictures = pics;
    console.log(req.body.pictures);

    const count = await Product.countDocuments();
    let productId = count + 1;
    req.body.productId = productId;
    if (req.body.pictures.length === 0) {
      return next(errorHandler(401, "please upload pictures"));
    }

    const productLength = await Product.find({});
    console.log(productLength, "prict--------");
    const product = await Product.create(req.body);
    return res.status(200).json({
      success: true,
      message: "product created successfully",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

// get All Product

const getAllProducts = async (req, res, next) => {
  try {
    const allProducts = await Product.find();
    if (!allProducts) {
      return res.status(401).json({
        success: true,
        message: "no products found",
      });
    }
    return res.status(401).json({
      success: true,
      message: "products found",
      allProducts,
    });
  } catch (error) {
    return next(error);
  }
};
// getSingleProduct

const getSingleProduct = async (req, res, next) => {
  const singleProduct = await Product.findById(req.params.id);
  console.log(singleProduct, "value in single product------");
  if (!singleProduct) {
    return next(errorHandler(404, "product does not found"));
  }
  try {
    return res.status(200).json({
      success: true,
      message: "product found",
      singleProduct,
    });
  } catch (error) {
    return next(error);
  }
};
// admin update product
const updateProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return next(errorHandler("Product not found", 404));
    }
    let pics = [];
    req.files.map((item) => {
      pics.push(item.filename);
    });
    if (product.pictures !== 0) {
      req.body.pictures = pics;
    }

    const updatedproduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true, useFindAndModify: false }
    );
    return res.status(200).json({
      success: true,
      message: "product update successfully",
      updatedproduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

// admin delete-Product
const deleteProduct = async (req, res, next) => {
  const findProduct = await Product.findById(req.params.id);
  console.log(findProduct);
  if (!findProduct) {
    return next(errorHandler(404, "product does not found"));
  }
  try {
    await Product.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      success: true,
      message: "product deleted successfully",
    });
  } catch (error) {
    return next(error);
  }
};
module.exports = {
  createProduct,
  updateProduct,
  getAllProducts,
  deleteProduct,
  getSingleProduct,
};
