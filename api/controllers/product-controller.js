const { ProductService } = require("../services");
const ApiError = require("../exceptions/api-error");

class ProductController {

  async addProduct(req, res, next) {
    try {
      const data = req.body
      const product = await ProductService.addProduct(data)

      return res.json({ status: 'success', product });
    } catch (e) {
      next(e)
    }
  }

  async removeProduct(req, res, next) {
    try {
      const id = req.params.id
      const product = await ProductService.removeProduct(id)

      return res.json({ statusCode: 200, product });
    } catch (e) {
      next(e)
    }
  }

  async updateProduct(req, res, next) {
    try {
      const id = req.params.id
      const data = req.body
      const product = await ProductService.updateProduct(id, data)

      return res.json({ statusCode: 200, product });
    } catch (e) {
      next(e)
    }
  }

  async getProduct(req, res, next) {
    try {
      const id = req.params.id
      const product = await ProductService.getProduct(id)

      return res.json(product)
    } catch (e) {
      next(e);
    }
  }

  async getProducts(req, res, next) {
    try {
      const products = await ProductService.getProducts();

      return res.json(products)
    } catch (e) {
      next(e)
    }
  }

  async getAllStatusCountProducts(req, res, next) {
    try {
      const products = await ProductService.getAllStatusCountProducts();

      return res.json(products)
    } catch (e) {
      next(e)
    }
  }

  async getStatusCountProducts(req, res, next) {
    try {
      const data = req.body;
      const products = await ProductService.getStatusCountProducts(data);

      return res.json(products)
    } catch (e) {
      next(e)
    }
  }

  async searchProducts(req, res, next) {
    try {
      const data = req.body
      const products = await ProductService.searchProducts(data);

      return res.json(products)
    } catch (e) {
      next(e)
    }
  }

  async removeProducts(req, res, next) {
    try {
      const data = req.body;
      if (data !== []) {
        const products = await ProductService.removeProducts(data);
        return res.json(products);
      }
    } catch (e) {
      next(e)
    }
  }

}

module.exports = new ProductController()