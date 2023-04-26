const ProductSchema = require('../models/product-model.schema')

class ProductService {
  async addProduct(product) {
    const { name, quantity, price, brand, d_added, d_updated, description } = product;
    const productAdded = await ProductSchema.create({ name, quantity, price, brand, d_added, d_updated, description });
    return productAdded;
  }

  async removeProduct(id) {
    const product = await ProductSchema.deleteOne({_id: id});
    return product;
  }

  async updateProduct(id, data) {
    const product = await ProductSchema.updateOne({id: id}, {$set: data});
    return product;
  }

  async getProduct(id) {
    const product = await ProductSchema.findById(id);
    return product;
  }

  async getProducts() {
    const product = await ProductSchema.find();
    return product;
  }
}

module.exports = new ProductService()