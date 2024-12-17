const ProductService = require('../services/productService');

class ProductController {
  constructor() {
    this.productService = new ProductService();
  }

  async createProduct(req, res) {
    try {
      const product = await this.productService.addProduct(req.body, res);
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getProducts(req, res) {
    try {
      const products = await this.productService.getAllProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  }

  async getProductById(req, res) {
    try {
      const product = await this.productService.getProductById(req.params.id);
      res.json(product);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async updateProduct(req, res) {
    try {
      const product = await this.productService.updateProduct(req.params.id, req.body);
      res.json(product);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteProduct(req, res) {
    try {
      const result = await this.productService.deleteProduct(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = ProductController;
