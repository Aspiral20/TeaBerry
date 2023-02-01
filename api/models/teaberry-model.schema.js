const {model, Schema} = require('mongoose');

const TeaberrySchema = new Schema({
  blackTea: {
    id: {type: Number, required: true, unique: true},
    name: {type: String, required: true},
    content: {type: String, required: true},
    quantity: {type: Number, required: true},
    price: {type: Number, required: true},
    imgPath: {type: String, required: true}
  },
  greenTea: {
    id: {type: Number, required: true, unique: true},
    name: {type: String, required: true},
    content: {type: String, required: true},
    quantity: {type: Number, required: true},
    price: {type: Number, required: true},
    imgPath: {type: String, required: true}
  },
  mixes: {
    id: {type: Number, required: true, unique: true},
    name: {type: String, required: true},
    content: {type: String, required: true},
    quantity: {type: Number, required: true},
    price: {type: Number, required: true},
    imgPath: {type: String, required: true}
  },
  oolong: {
    id: {type: Number, required: true, unique: true},
    name: {type: String, required: true},
    content: {type: String, required: true},
    quantity: {type: Number, required: true},
    price: {type: Number, required: true},
    imgPath: {type: String, required: true}
  },
  whiteTea: {
    id: {type: Number, required: true, unique: true},
    name: {type: String, required: true},
    content: {type: String, required: true},
    quantity: {type: Number, required: true},
    price: {type: Number, required: true},
    imgPath: {type: String, required: true}
  }
})

module.exports = model('Teaberry', TeaberrySchema)