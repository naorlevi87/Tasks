import express from "express";
import { taskController } from "../controllers/taskController.js";
const taskRouter = new express.Router();
import isLoggedIn from "../middleware/isLoggedIn.js";

//@desc     get all tasks
//@route    GET /api/tasks
//@access   Private/Admin
taskRouter.get('/',isLoggedIn, taskController.getAllTasks);

//@desc     create a new task
//@route    POST /api/tasks
//@access   Public
taskRouter.post('/',isLoggedIn, taskController.createNewTask);

//@desc     Update task by id
//@route    PUT /api/tasks/:id
//@access   Public
//@param    {String:id} req.params.id
taskRouter.put('/:id',isLoggedIn, taskController.updateTaskById);

//@desc     create a new task
//@route    DELETE /api/tasks/:id
//@access   Private/Admin
//@param    {String:id} req.params.id
taskRouter.delete('/:id',isLoggedIn, taskController.deleteTaskById);



export default taskRouter;