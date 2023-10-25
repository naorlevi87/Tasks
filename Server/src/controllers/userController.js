import jwt from 'jsonwebtoken'


import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/UserModel.js';


const authUser = asyncHandler(async (req, res) => {
    const { email , password } = req.body;
    
    const user = await User.findOne({ email });
    if (user && (await user.comparePassword(password))) {

        // create a token
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'developmant',
            sameSite:'strict',
            maxAge: process.env.JWT_MAX_AGE,
        });

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(401);
        throw new Error('Incorrect email or password');
    }

    //res.send('authUser');
});


const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, isAdmin } = req.body;
    if(!name || !email || !password) {
        res.status(400);
        throw new Error('Please enter all fields');
    }
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    } 
    const user = await User.create({ 
        name, 
        email, 
        password,
        isAdmin
    });
    if (!user) {
        res.status(400);
        throw new Error('invalid user');
    } else {
        await authUser(req, res);
        res.status(201).json({ 
            _id: user._id, 
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } 


    

});


const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', 'none', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({massage: 'logout successfully'});
});


const getUserProfile = asyncHandler(async (req, res) => {
    if(!req.user) {
        res.status(401).send('user is not logged in');
    }
    
    const user = await User.findById(req.user._id);

    if (!user) {
        res.status(404);
        throw new Error('user not found');
        
    } else {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    }
});


const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findOne(req.user._id);
    if (!user) {
        res.status(404);
        throw new Error('user not found');
    }   else { 
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if(req.body.password) {
            user.password = req.body.password;
        }
    }
    const updatedUser = await user.save();
    res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
    });
    
});


const getUsers = asyncHandler(async (req, res) => {
const users = await User.find({});
    res.status(200).send(users);
});


const getUserbyId = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
        res.status(404);
        throw new Error('user not found');
        
    } else {
        res.status(200).json(user);
    }
});


const deleteUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        res.status(404);
        throw new Error('user not found');
        
    } else {    
        if (user.isAdmin) {
            res.status(401);
            throw new Error('cannot delete admin user');   
        }
        await user.deleteOne({_id: user.id});
        res.status(200).send('user deleted successfully');
    }
});


const updateUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        res.status(404);
        throw new Error('user not found');
        
    } else {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = req.body.isAdmin ;
    }
    const updatedUser = await user.save();
    res.status(200).send(updatedUser);
});









export const userController = { 
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    getUserbyId,
    deleteUserById,
    updateUserById
};
