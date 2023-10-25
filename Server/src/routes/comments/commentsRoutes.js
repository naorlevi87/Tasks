import express from "express";
import { commentsController } from "../controllers/commentsController.js";
import { isLoggedIn } from "../middleware/authMiddleware.js";

const commentsRouter = express.Router();

// @desc    Create a new comment
// @route   POST /api/comments
// @access  Private
commentsRouter.post('/', isLoggedIn, commentsController.createComment);

// @desc    Get comments for a specific model by ID
// @route   GET /api/comments/:refModel/:refId
// @access  Public
commentsRouter.get('/:refModel/:refId', commentsController.getCommentsByRef);

// @desc    Edit a comment by ID
// @route   PUT /api/comments/:id
// @access  Private
commentsRouter.put('/:id', isLoggedIn, commentsController.editComment);

// @desc    Delete a comment by ID
// @route   DELETE /api/comments/:id
// @access  Private
commentsRouter.delete('/:id', isLoggedIn, commentsController.deleteComment);

// @desc    Add a reply to a comment
// @route   POST /api/comments/:id/replies
// @access  Private
commentsRouter.post('/:id/replies', isLoggedIn, commentsController.addReply);

// @desc    Edit a reply
// @route   PUT /api/comments/:commentId/replies/:replyId
// @access  Private
commentsRouter.put('/:commentId/replies/:replyId', isLoggedIn, commentsController.editReply);

// @desc    Delete a reply
// @route   DELETE /api/comments/:commentId/replies/:replyId
// @access  Private
commentsRouter.delete('/:commentId/replies/:replyId', isLoggedIn, commentsController.deleteReply);

export default commentsRouter;
