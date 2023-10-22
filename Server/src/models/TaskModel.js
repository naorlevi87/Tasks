import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    creationDate: { type: Date, default: Date.now },
    creatorUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    description: { type: String },
    assinedToID:  { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    taskProgress: { type: Number, default: 0, max: 1000, min: 0 }
    // Additional fields like creator, creation date, etc., can be added.
  });

  


  const Task = mongoose.model('Task', taskSchema);
  
  export { Task };