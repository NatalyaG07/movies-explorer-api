const routerUsers = require('express').Router();
const { validateEditProfile } = require('../middlewares/validators');
const {
  editProfile,
  getInfoAboutMe,
} = require('../controllers/users');

routerUsers.get('/me', getInfoAboutMe);

routerUsers.patch('/me', validateEditProfile, editProfile);

module.exports = routerUsers;
