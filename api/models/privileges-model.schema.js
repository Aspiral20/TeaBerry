const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
  email: {type: String, unique: true, required: true},
  user: {type: Boolean, required: true, default: false},
  moderator: {type: Boolean, required: true, default: false},
  admin: {type: Boolean, required: true, default: false},
  creator: {type: Boolean, required: true, default: false}
})

module.exports = mongoose.model('Admin', AdminSchema)