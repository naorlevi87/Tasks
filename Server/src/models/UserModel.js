import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    dateOfBirth: { type: Date },
    profilePicture: { type: String },
    isAdmin: { type: Boolean, default: false },
});

const User = mongoose.model('User', userSchema);

export {
     User
};