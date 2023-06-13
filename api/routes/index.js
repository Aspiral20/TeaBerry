const express = require('express')
const Router = express.Router;
const router = new Router();

const ProductRouter = require('./product/index')
const AuthRouter = require('./auth/index')
const UserRouter = require('./user/index')

router.use('/product', ProductRouter)
router.use('/auth', AuthRouter)
router.use('/user', UserRouter)

module.exports = router