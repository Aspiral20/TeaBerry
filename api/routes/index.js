const express = require('express')
const Router = express.Router;
const router = new Router();
const { body } = require('express-validator')
const UserController = require('../controllers/user-controller.js');
const ProductController = require('../controllers/product-controller.js');
// const PrivilegesController = require('../controllers/privileges-controller.js');
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

// router.post('/admin/update/:privilege', PrivilegesController.updatePrivilege)   //todo admin privilege
router.post('/login', UserController.login);                 // cerere post pentru login
router.post('/logout', UserController.logout);               // cerere post pentru logout
router.get('/activate/:link', UserController.activate);      // activare a account-ului pe link care v-a veni pe email
router.get('/refresh', UserController.refresh);              // rescrie access token in cazul in care va deceda
//todo add authMiddleware
router.get('/users', UserController.getUsers);                // returneaza lista de utilizatori
router.get('/user/:id', UserController.getUser);                              // returneaza utilizatorul anumit
router.post('/user/search', UserController.searchUsers);
router.post('/update_user/:id', UserController.updateUser);                   // returneaza utilizatorul anumit
router.get('/users/statuses', UserController.getAllStatusCountUsers);

router.post('/product/add', ProductController.addProduct);
router.post('/product/update/:id', ProductController.updateProduct);
router.post('/product/remove/:id', ProductController.removeProduct);
router.post('/products/remove', ProductController.removeProducts);
router.post('/product/search', ProductController.searchProducts);
router.post('/products/count_statuses', ProductController.getStatusCountProducts);
router.get('/products/statuses', ProductController.getAllStatusCountProducts);
router.get('/product/:id', ProductController.getProduct);
router.get('/products', ProductController.getProducts);

module.exports = router