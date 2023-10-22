import express from "express";
import { User } from "../controllers/userController.js";
const router = new express.Router();



router.post("/login", User.login); 




export default router;