// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const DataError = require('../errors/data-err');
// const ConflictError = require('../errors/conflict-error');

module.exports.editProfile = (req, res, next) => {
  User.findOneAndUpdate({ _id: req.user._id }, { name: req.body.name, email: req.body.email }, {
    new: true, // обработчик then получит на вход обновлённую запись
    runValidators: true, // данные будут валидированы перед изменением
  })
    .then((user) => res.send({
      name: user.name,
      email: user.email,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new DataError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.getInfoAboutMe = (req, res, next) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => res.send({
      name: user.name,
      email: user.email,
    }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError('Пользователь с id не найден'));
      } else {
        next(err);
      }
    });
};
