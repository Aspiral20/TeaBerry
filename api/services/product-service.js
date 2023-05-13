const ProductSchema = require('../models/product-model.schema')
const { PRODUCTS_STATUSES } = require('../constants/products')
const fs = require("fs");
const path = require("path");

class ProductService {
  async addProduct(product) {
    const { name, type, brand, price, quantity, status, translation_key, image, description } = product;

    return await ProductSchema.create({
      name,
      type,
      brand,
      price,
      quantity,
      status,
      translation_key,
      description,
      image
    });
  }

  async removeProduct(id) {
    return ProductSchema.deleteOne({ id: id });
  }

  async removeProducts(data) {
    return ProductSchema.deleteMany({ _id: { $in: data } });
  }

  async updateProduct(id, data) {
    delete data.id;
    return ProductSchema.updateOne({ _id: id }, { $set: data });
  }

  async getProduct(id) {
    return ProductSchema.findById(id);
  }

  async getProducts() {
    return ProductSchema.find();
  }

  async getAllStatusCountProducts() {
    const count = await ProductSchema.find().count();
    const statusCountData = await ProductSchema.aggregate([{
      $group: {
        _id: "$status",
        status: { $first: "$status" },
        count: { $count: {} }
      }
    }, {
      $project: {
        _id: 0,
        status: 1,
        count: 1,
        percentage: {
          $round: [ {$multiply: [{ $divide: ["$count", { $literal: count }] }, 100]}, 2 ],
        },
      }
    }]);

    return [...statusCountData, { status: "total", count: count, percentage: 100 }]
  }

  async getStatusCountProducts(data) {
    return ProductSchema.aggregate([{
      $match: {
        status: { $in: data }
      }
    }, {
      $group: {
        _id: "$status",
        status: { $first: "$status" },
        count: { $count: {} }
      }
    }]);
  }

  async searchProducts(data) {
    const { field, regex } = data
    return ProductSchema.find({ [field]: { $regex: regex, $options: 'i' } });
  }
}

module.exports = new ProductService()