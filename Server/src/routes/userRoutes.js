import express from "express";
import { userController } from "../controllers/userController.js";
import { isAdmin, isLoggedIn } from "../middleware/authMiddleware.js";
const userRouter = new express.Router();

// ## User Routes to UserController ## 

//router.post("/login", User.login); 

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
userRouter.post('/login', userController.authUser);

// @desc    Register new user
// @route   POST /api/users
// @access  Public
userRouter.post('/', userController.registerUser);

// @desc    Logout current user & clear cookie
// @route   POST /api/users/logout
// @access  Private
userRouter.post('/logout',isLoggedIn, userController.logoutUser);

// @desc    Get current user profile
// @route   GET /api/users/profile
// @access  Private
userRouter.get('/profile',isLoggedIn,userController.getUserProfile)

// @desc    Update current user profile
// @route   PUT /api/users/profile
// @access  Private
userRouter.put('/profile',isLoggedIn,userController.updateUserProfile);

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
userRouter.get('/',isLoggedIn,isAdmin, userController.getUsers);

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
// @param   {String:id} req.params.id
userRouter.get('/:id',isLoggedIn,isAdmin, userController.getUserbyId);

// @desc    Delete user by ID 
// @route   DELETE /api/users/:id
// @access  Private/Admin
// @param   {String:id} req.params.id
userRouter.delete('/:id',isLoggedIn,isAdmin, userController.deleteUserById);

// @desc    Update user by ID
// @route   PUT /api/users/:id
// @access  Private/Admin
// @param   {String:id} req.params.id
userRouter.put('/:id',isLoggedIn,isAdmin, userController.updateUserById);


export default userRouter;


