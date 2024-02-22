const Product = require("../Models/productModel");
const ApiFeatures = require("../utils/apiFeatures");
const errorHandler = require("../utils/error");

// admin create Product
const createProduct = async (req, res, next) => {
  try {
    req.body.user = req.user.id;
    let pics = [];
    req.files.map((item) => {
      pics.push(item.filename);
    });
    req.body.pictures = pics;

    const count = await Product.countDocuments();
    let productId = count + 1;
    req.body.productId = productId;
    if (req.body.pictures.length === 0) {
      return next(errorHandler(401, "please upload pictures"));
    }

    const productLength = await Product.find({});

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
    const resultPerPage = 5;
    const productCount = await Product.countDocuments();
    const apiFeature = new ApiFeatures(Product.find(), req.query)
      .search()
      .filter()
      .pagination(resultPerPage);
    // const allProducts = await Product.find();
    let allProducts = await apiFeature.query;
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
      productCount,
    });
  } catch (error) {
    return next(error);
  }
};
// getSingleProduct

const getSingleProduct = async (req, res, next) => {
  const singleProduct = await Product.findById(req.params.id);

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
