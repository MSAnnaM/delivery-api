import Product from "../bd/models/productModel.js";
import HttpError from "../helpers/HttpError.js";

export const createProduct = async (req, res, next) => {
  try {
    const { name, imgURL, img2xURL, demoImgURL, basicInfo, information } = req.body;
    const newProduct = await Product.create({ name, imgURL, img2xURL, demoImgURL, basicInfo, information });
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, { new: true, runValidators: true });

    if (!updatedProduct) {
      throw HttpError(404, "Product not found");
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      throw HttpError(404, "Product not found");
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    next(error);
  }
};