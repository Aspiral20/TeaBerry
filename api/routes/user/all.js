const express = require("express");
const UserController = require("../../controllers/user-controller");
const Router = express.Router;
const router = new Router();

// Admin
router.get('/', UserController.getUsers);
router.get('/statuses', UserController.getAllStatusCountUsers);

module.exports = router