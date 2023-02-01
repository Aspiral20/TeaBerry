const express = require('express')
const Router = express.Router;
const router = new Router();
const { body } = require('express-validator')
const UserController = require('../controllers/user-controller.js');
const authMiddleware = require('../middlewares/auth-middleware')

const passwdRegSize = {min: 6, max: 32}
router.post(
  '/registration',
  body('email').isEmail(),      // validare p/u email
  body('password')
    .isLength({ max: passwdRegSize.max })          // validare de parola dupa marime
    .isStrongPassword({minLength: passwdRegSize.min}),
  UserController.registration
);
router.post('/login', UserController.login);                 // cerere post pentru login
router.post('/logout', UserController.logout);               // cerere post pentru logout
router.get('/activate/:link', UserController.activate);      // activare a account-ului pe link care v-a veni pe email
router.get('/refresh', UserController.refresh);              // rescrie access token in cazul in care va deceda
router.get('/users', authMiddleware, UserController.getUsers);               // returneaza lista de utilizatori

module.exports = router