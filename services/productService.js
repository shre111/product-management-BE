const ProductModel = require("../models/productModel");

class ProductService {
  async addProduct(productData, res) {
    try {
      if (productData.quantityInStock < 0) {
        return res
          .status(400)
          .json({ error: "QuantityInStock must be a positive integer" });
      }

      const price = parseFloat(productData.price);
      const discountPercentage = parseFloat(productData.discountPercentage);
      const finalPrice = price - (price * discountPercentage) / 100;

      productData.finalPrice = finalPrice.toFixed(2);

      const product = new ProductModel(productData);

      product.save();
      if (product.quantityInStock <= 5) {
        return {
          product,
          message: "Low in Stock.",
        };
      } else {
        return {
          product,
          message: "Product added successfully!",
        };
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getAllProducts() {
    const products = await ProductModel.find();
    return products.map((product) => {
      const productJSON = product.toJSON();
      return productJSON;
    });
  }

  async getProductById(productId) {
    const product = await ProductModel.findById(productId);
    if (!product) {
      throw new Error("Product not found");
    }
    const productJSON = product.toJSON();
    return productJSON;
  }

  async updateProduct(productId, productData) {
    if (productData.quantityInStock < 0) {
      return { message: "QuantityInStock must be a positive integer" };
    }
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productId,
      productData,
      { new: true, runValidators: true }
    );
    if (!updatedProduct) {
      return { message: "Product not found" };
    }
    return {
      updatedProduct,
      message: "Updated successfully",
    };
  }

  async deleteProduct(productId) {
    const deletedProduct = await ProductModel.findByIdAndDelete(productId);

    return { message: "Product deleted successfully" };
  }
}

module.exports = ProductService;
