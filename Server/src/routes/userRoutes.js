import express from "express";
import { userController } from "../controllers/userController.js";
const userRouter = new express.Router();



//router.post("/login", User.login); 

userRouter.post("/login", userController.authUser);

userRouter.post("/logout", userController.logoutUser);

userRouter.post("/").post(userController.registerUser).get(userController.getUsers);

userRouter.post("/profile").get(userController.getUserProfile).put(userController.updateUserProfile);

userRouter.post("/:id").get(userController.getUserbyId).put(userController.updateUser).delete(userController.deleteUser);


export default userRouter;