import express from "express";
import { taskController } from "../controllers/taskController.js";
const taskRouter = new express.Router();
import { isLoggedIn, isAdmin } from "../middleware/authMiddleware.js";

//@desc     get all tasks
//@route    GET /api/tasks
//@access   Private/Admin
taskRouter.get('/',isLoggedIn, isAdmin, taskController.getAllTasks);

//@desc     create a new task
//@route    POST /api/tasks
//@access   Public
taskRouter.post('/',isLoggedIn, taskController.createNewTask);

//@desc     Update task by id (current user's tasks only)
//@route    PUT /api/tasks/:id
//@access   Public
//@param    {String:id} req.params.id
taskRouter.put('/:id',isLoggedIn, taskController.updateTaskById);

//@desc     Delete a task by id (current user's tasks only)
//@route    DELETE /api/tasks/:id
//@access   Public
//@param    {String:id} req.params.id
taskRouter.delete('/:id',isLoggedIn, taskController.deleteTaskById);



export default taskRouter;