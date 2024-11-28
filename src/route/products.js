import express from "express";
import productController from "../controller/productController.js";
import upload from "../multerConfig.js";
import auth from "../middleware/auth.js";
 const router = express.Router();

 router.post('/product', auth,upload.single("image"), (req, res)=> productController.createProduct(req, res));
 router.get('/products', auth, (req, res)=> productController.getAllProducts(req, res));
 router.delete('/product/:id', auth, (req, res)=> productController.deleteProduct(req, res));
 router.put('/product/:id', auth, (req, res)=> productController.updateProduct(req, res));


 export default router