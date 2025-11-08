const express= require('express');
const { getProducts } = require('../controllers/product.controller');

const router= express.Router()

router.get('/product',getProducts);

module.exports=router;