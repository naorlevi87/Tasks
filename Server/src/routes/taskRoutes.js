import express from "express";
import { taskRoute } from "../controllers/taskController.js";
const taskRouter = new express.Router();
import isLoggedIn from "../middleware/isLoggedIn.js";


taskRouter.get('/tasks',isLoggedIn, taskRoute.getAllTasks);

taskRouter.post('/tasks',isLoggedIn, taskRoute.createNewTask);

taskRouter.put('/tasks/:id',isLoggedIn, taskRoute.updateTask);

taskRouter.delete('/tasks/:id',isLoggedIn, taskRoute.deleteTask);



export default taskRouter;