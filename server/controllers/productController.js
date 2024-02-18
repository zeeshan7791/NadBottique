const Product = require("../Models/productModel");
const errorHandler = require("../utils/error");

// admin route
const createProduct = async (req, res, next) => {
  try {
    console.log(req.body, "value in req.body");
    let pics = [];
    req.files.map((item) => {
      pics.push(item.filename);
    });
    req.body.pictures = pics;
    console.log(req.body.pictures);

    if (req.body.pictures.length === 0) {
      return next(errorHandler(401, "please upload pictures"));
    }
    // if (
    //   !name ||
    //   !description ||
    //   !price ||
    //   !category ||
    //   !stock ||
    //   numOfReviews
    // ) {
    //   return next(errorHandler(401, "Enter the complete details"));
    // }
    const product = await Product.create(req.body);
    return res.status(200).json({
      success: true,
      message: "product created successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

module.exports = {
  createProduct,
};
