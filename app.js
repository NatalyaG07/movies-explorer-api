require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');

const allRouters = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

const { NODE_ENV, HOST_DB } = process.env;

const app = express();
app.listen(3000);

mongoose.connect(NODE_ENV === 'production' ? HOST_DB : 'mongodb://localhost:27017/moviesdb', {
  useNewUrlParser: true,
});

app.use(cors({
  origin: [
    // 'https://mesto.natalya.g.nomoredomains.icu',
    // 'http://mesto.natalya.g.nomoredomains.icu',
    'localhost:3000',
    'http://diploma.natalya.g.nomoredomains.icu',
    'https://diploma.natalya.g.nomoredomains.icu',
  ],
  credentials: true,
}));

app.use(helmet());
app.use(bodyParser.json());

app.use(requestLogger);
app.use(allRouters);

app.use(errorLogger);
app.use(errors());

app.use(errorHandler);
