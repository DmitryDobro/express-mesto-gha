const { default: mongoose } = require('mongoose');
const validator = require('validator');

const cardScheme = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: {
      value: true,
      message: ' Поля name является обязательным',
    },
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: ' Поля link является обязательным',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    ref: 'user',
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});
module.exports = mongoose.model('card', cardScheme);
