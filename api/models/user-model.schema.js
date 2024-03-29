const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  full_name: { type: String, required: true },
  country: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },

  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  isActivated: { type: Boolean, required: true, default: false },       // daca account-ul e activat
  activationLink: { type: String, required: true },                      // link-ul de activare
  role: { type: String, required: true },
  discount: { type: Number, required: true }
})

module.exports = mongoose.model('User', UserSchema)