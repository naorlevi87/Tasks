import jwt from 'jsonwebtoken'


import asyncHandler from '../middleware/asyncHandler.js';
import {User} from '../models/UserModel.js';


const authUser = asyncHandler(async (req, res) => {
    console.log("Entered authUser function");
    res.send('authUser');
});


const registerUser = asyncHandler(async (req, res) => {
    res.send('registerUser');
});


const logoutUser = asyncHandler(async (req, res) => {
    res.send('logoutUser');
});


const getUserProfile = asyncHandler(async (req, res) => {
    res.send('getUserProfile');
});


const updateUserProfile = asyncHandler(async (req, res) => {
    res.send('updateUserProfile');
});


const getUsers = asyncHandler(async (req, res) => {
    console.log("Entered getUsers function");
    res.send('getUsers');
});


const getUserbyId = asyncHandler(async (req, res) => {
    res.send('getUserByID');
});


const deleteUserById = asyncHandler(async (req, res) => {
    res.send('deleteUserById');
});


const updateUserById = asyncHandler(async (req, res) => {
    res.send('updateUserById');
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
    deleteUserById,
    updateUserById,
    login
};
