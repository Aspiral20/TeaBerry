const express = require("express");
const { body } = require("express-validator");
const UserController = require("../../controllers/user-controller");
const Router = express.Router;
const router = new Router();
// const PrivilegesController = require('../controllers/privileges-controller.js');
const passwdRegSize = { min: 6, max: 32 }

// Api
router.get('/activate/:link', UserController.activate);

// Admin & Front
router.post(
  '/registration',
  body('email').isEmail(),
  body('password')
    // .isLength({ max: passwdRegSize.max })
    .isStrongPassword({ minLength: passwdRegSize.min }),
  UserController.registration
);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.get('/refresh', UserController.refresh);

module.exports = router