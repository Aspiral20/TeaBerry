const express = require('express')
const Router = express.Router;
const router = new Router();
const { body } = require('express-validator')
const UserController = require('../controllers/user-controller.js');
// const AdminController = require('../controllers/admin-controller');
const authMiddleware = require('../middlewares/auth-middleware')

const passwdRegSize = {min: 6, max: 32}
router.post(
  '/registration',
  body('email').isEmail(),      // validare p/u email
  body('password')
    // .isLength({ max: passwdRegSize.max })          // validare de parola dupa marime
    .isStrongPassword({minLength: passwdRegSize.min}),
  UserController.registration
);
// router.post('/admin/update/:privilege', AdminController.updatePrivilege)   todo admin privilege
router.post('/login', UserController.login);                 // cerere post pentru login
router.post('/logout', UserController.logout);               // cerere post pentru logout
router.get('/activate/:link', UserController.activate);      // activare a account-ului pe link care v-a veni pe email
router.get('/refresh', UserController.refresh);              // rescrie access token in cazul in care va deceda
router.get('/users', authMiddleware, UserController.getUsers);               // returneaza lista de utilizatori
router.get('/user/:id', UserController.getUser);               // returneaza utilizatorul anumit
router.post('/update_user/:id', UserController.updateUser);               // returneaza utilizatorul anumit

module.exports = router