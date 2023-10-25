import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/UserModel.js';``

// protect routes

const isLoggedIn = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.jwt;

  if (token) {
    try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //console.log(decoded);
    req.user = await User.findById(decoded._id).select('-password');
    //console.log("User logged"+ req.user);
    next();
    } catch (err) {
        console.log(err);
      res.status(401);
      throw new Error('Not autherized, Invalid token');
    }
  } else {
    res.status(401);
    throw new Error('Not autherized, No token provided');
  }
});

const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error('Not autherized, Not admin');
    }
}

export {
    isLoggedIn,
    isAdmin
}
