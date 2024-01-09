const { default: mongoose } = require('mongoose');

const cardScheme = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: {
      value:true,
      message:" Поля name является обязательным"
    },
  },
  link: {
    type: String,
    required: {
      value:true,
      message:" Поля link является обязательным"
    },
  },
  owner: {
    type: Object,
    required: true,
  },
  likes: {
    type: Object,
    required: true,
    default: [],
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});
module.exports = mongoose.model('card', cardScheme);
