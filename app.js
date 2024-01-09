const express = require('express');
const mongoose = require('mongoose');
const router = require('./routers/index.js');
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: '659a584692f48653affb0920'
  };
  next();
});
app.use(router);
app.listen(3000, () => {
  console.log(123);
});
module.exports.createCard = (req, res) => {
  console.log(req.user._id);
};
