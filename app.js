const express = require('express');
const mongoose = require('mongoose');

const allRouters = require('./routes/index');

const app = express();
app.listen(3000);

mongoose.connect('mongodb://localhost:27017/moviesdb', {
  useNewUrlParser: true,
});

app.use(allRouters);
