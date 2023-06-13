const express = require("express");
const UserController = require("../../controllers/user-controller");
const Router = express.Router;
const router = new Router();
const AuthMiddleware = require('../../middlewares/auth-middleware')

const AllUsersRouter = require('./all')
const { body } = require("express-validator");

router.use('/all', AllUsersRouter)

// Admin & Front
router.get('/:id', UserController.getUser);

// Admin
router.post('/search', UserController.searchUsers);
router.post('/update/:id', UserController.updateUser);

// Front
router.post('/mail_discount', AuthMiddleware, UserController.sendDiscountMail)
router.post(
  '/discount/:id',
  AuthMiddleware,
  UserController.updateDiscount
)


module.exports = router