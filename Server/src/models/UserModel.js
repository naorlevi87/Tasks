import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true},
    dateOfBirth: { type: Date },
    profilePicture: { type: String },
    isAdmin: { type: Boolean, default: false },
});

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.pre('save', async function (next) {
    if(this.isNew || this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
        
    } else {
        next();
    }
});

const User = mongoose.model('User', userSchema);

export default User;