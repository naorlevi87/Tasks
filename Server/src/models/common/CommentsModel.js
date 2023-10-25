import mongoose from "mongoose";

const replySchema = new mongoose.Schema({
    content: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }
}, {
    timestamps: true
});

const commentSchema = new mongoose.Schema({
    content: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    replies: [replySchema],
    refId: { type: mongoose.Schema.Types.ObjectId, required: true },
    refModel: { type: String, required: true }
}, {
    timestamps: true
});

const Comments = mongoose.model('Comment', commentSchema);

export default Comments;
