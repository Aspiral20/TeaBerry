const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  status: { type: String, required: true },
  translation_key: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
})

module.exports = mongoose.model('Product', ProductSchema)