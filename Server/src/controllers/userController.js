import jwt from 'jsonwebtoken'


import asyncHandler from '../middleware/asyncHandler.js';
import {User} from '../models/UserModel.js';

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    res.send('authUser');
});

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    res.send('registerUser');
});

// @desc    Logout user & clear cookie
// @route   POST /api/users/logout
// @access  Private
const logoutUser = asyncHandler(async (req, res) => {
    res.send('logoutUser');
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    res.send('getUserProfile');
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
    res.send('updateUserProfile');
});

// @desc    Get users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    res.send('getUsers');
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
// @param {String:id} req.params.id
const getUserbyId = asyncHandler(async (req, res) => {
    res.send('getUsers');
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    res.send('deleteUser');
});

// @desc    Update user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
    res.send('updateUser');
});









const login =  (req,res)=> {
    //console.log(req.body);
    if(req.body.password === process.env.PASSWORD ){
        const token = jwt.sign({
            userId: 1, 
        }, process.env.SECRET);
        res.json({
            token
        });
        //console.log("logged in");
    } else {
        res.status(401).send("Wrong password");
    }
};

export const userController = { 
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    getUserbyId,
    deleteUser,
    updateUser,
    login
};
