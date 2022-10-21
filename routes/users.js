const routerUsers = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  editProfile,
  getInfoAboutMe,
} = require('../controllers/users');

routerUsers.get('/me', getInfoAboutMe);

routerUsers.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email(),
  }),
}), editProfile);

module.exports = routerUsers;
