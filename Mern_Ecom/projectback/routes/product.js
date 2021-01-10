var express = require("express");
var router = express.Router();

const {isAdmin, isAuthenticated, isSignedIn} = require('../controllers/auth');

const {getUserById} = require('../controllers/user');

const {getProductById, createProduct,
     getProduct, photo, deleteProduct,
      updateProduct, getAllProducts,
        getAllUniqueCategories} = require('../controllers/product');

router.param("userId", getUserById);

router.param("productId", getProductById);

// all of actual routes

router.post("/product/create/:userId",isSignedIn, isAuthenticated, isAdmin , createProduct);


router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);

// delete route

router.delete("/product/:productId/:userId",isSignedIn, isAuthenticated, isAdmin, deleteProduct);

// update route

router.put("/product/:productId/:userId",isSignedIn, isAuthenticated, isAdmin, updateProduct);


// listing route

router.get("/products", getAllProducts);

router.get("/products/categories", getAllUniqueCategories);


module.exports = router;

