const express = require('express');
const mongoose = require('mongoose');

const allRouters = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
app.listen(3000);

mongoose.connect('mongodb://localhost:27017/moviesdb', {
  useNewUrlParser: true,
});

app.use(requestLogger); // Логгер запросов нужно подключить до всех обработчиков роутов
app.use(allRouters);

app.use(errorLogger); // нужно подключить после обработчиков роутов и до обработчиков ошибок
