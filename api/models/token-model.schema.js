const {Schema, model} = require("mongoose")
const {Types} = Schema

const TokenSchema = new Schema({
  user: {type: Types.ObjectId, ref: 'User'},
  refreshToken: {type: String, required: true}
})

module.exports = model('Token', TokenSchema)