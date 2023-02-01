const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  isActivated: {type: Boolean, required: true, default: false},       // daca account-ul e activat
  activationLink: {type: String, required: true}                      // link-ul de activare
})

module.exports = mongoose.model('User', UserSchema)