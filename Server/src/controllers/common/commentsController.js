import asyncHandler from '../middleware/asyncHandler.js';
import Comment from '../models/CommentModel.js';

const createComment = asyncHandler(async (req, res) => {
    const { content, refId, refModel } = req.body;

    const newComment = new Comment({
        content,
        user: req.user._id,
        refId,
        refModel
    });

    const savedComment = await newComment.save();

    res.status(201).json(savedComment);
});

const getCommentsByRef = asyncHandler(async (req, res) => {
    const { refModel, refId } = req.params;

    const comments = await Comment.find({ refModel, refId }).populate('user', 'name');

    res.status(200).json(comments);
});

const editComment = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;

    const comment = await Comment.findById(id);
    if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
    }

    comment.content = content;
    const updatedComment = await comment.save();
    res.status(200).json(updatedComment);
});

const deleteComment = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const comment = await Comment.findById(id);
    if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
    }

    await comment.remove();
    res.status(200).json({ message: "Comment deleted" });
});

const addReply = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;

    const comment = await Comment.findById(id);
    if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
    }

    const reply = { content, user: req.user._id };
    comment.replies.push(reply);

    await comment.save();
    res.status(201).json(reply);
});

const editReply = asyncHandler(async (req, res) => {
    const { commentId, replyId } = req.params;
    const { content } = req.body;

    const comment = await Comment.findById(commentId);
    if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
    }

    const reply = comment.replies.id(replyId);
    if (!reply) {
        return res.status(404).json({ message: "Reply not found" });
    }

    reply.content = content;
    await comment.save();
    res.status(200).json(reply);
});

const deleteReply = asyncHandler(async (req, res) => {
    const { commentId, replyId } = req.params;

    const comment = await Comment.findById(commentId);
    if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
    }

    const reply = comment.replies.id(replyId);
    if (!reply) {
        return res.status(404).json({ message: "Reply not found" });
    }

    reply.remove();
    await comment.save();
    res.status(200).json({ message: "Reply deleted" });
});

export const commentsController = { 
    createComment,
    getCommentsByRef,
    editComment,
    deleteComment,
    addReply,
    editReply,
    deleteReply
};
