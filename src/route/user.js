import express from "express";  
import userController from "../controller/userController.js";
import auth from "../middleware/auth.js"
const router = express.Router();


router.post('/register', (req, res)=> userController.register(req, res));
router.post('/login', (req, res)=> userController.login(req, res));
router.get('/users', auth, (req, res)=> userController.getAllUsers(req, res));
router.delete('/users/:id', auth, (req, res)=> userController.deleteUser(req, res));
router.put('/users/:id', auth, (req, res)=> userController.updateUser(req, res));





export default router