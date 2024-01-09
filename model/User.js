const { default: mongoose } = require('mongoose');

const userScheme = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: {
      value: true,
      message: ' Поля name является обязательным',
    },
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: {
      value: true,
      message: ' Поля about является обязательным',
    },
  },
  avatar: {
    type: String,
    required: {
      value: true,
      message: ' Поля avatar является обязательным',
    },
  },
});
module.exports = mongoose.model('user', userScheme);
