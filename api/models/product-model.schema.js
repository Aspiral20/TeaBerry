const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  brand: {type: String, required: true},
  d_added: { type: Date, required: true },
  d_updated: { type: Date, required: true },
  description: { type: String },
})

module.exports = mongoose.model('Product', ProductSchema)