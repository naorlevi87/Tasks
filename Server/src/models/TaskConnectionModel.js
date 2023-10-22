import mongoose from "mongoose";
//import UserModel from "./UserModel.js";
//import TaskModel from "./TaskModel.js";

const taskConnectionsSchema = new mongoose.Schema({
    creator: { type: mongoose.Schema.Types.ObjectId, ref: UserModel },
    creationDate: { type: Date, default: Date.now },
    from: { type: mongoose.Schema.Types.ObjectId, ref: TaskModel },
    to: { type: mongoose.Schema.Types.ObjectId, ref: TaskModel },
    connectionType: { type: String, required: true },
    connectionSemantic: { type: String, required: true}

});

// 1. Add Indexes for Improved Query Performance
taskConnectionsSchema.index({ from: 1, to: 1 });

// 2. Add Validation for connectionType and connectionSemantic if needed
const allowedConnectionTypes = ['Parent', 'Chiled', 'Parallel']; // 'from' is a parent task of 'to' etc. 
const allowedConnectionSemantics = ['Semantical', 'Practical', 'Geographical'];

taskConnectionsSchema.path('connectionType').validate(function (value) {
   return allowedConnectionTypes.includes(value);
}, 'Invalid connection type');

taskConnectionsSchema.path('connectionSemantic').validate(function (value) {
   return allowedConnectionSemantics.includes(value);
}, 'Invalid connection semantic');

const TaskConnection = mongoose.model('TaskConnection', taskConnectionsSchema);

module.exports = TaskConnection;