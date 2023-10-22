import express from "express";
import { taskRoute } from "../controllers/taskController.js";
const router = new express.Router();
import isLoggedIn from "../middleware/isLoggedIn.js";


router.get('/tasks',isLoggedIn, taskRoute.getAllTasks);
router.post('/tasks',isLoggedIn, taskRoute.createNewTask);
router.put('/tasks/:id',isLoggedIn, taskRoute.updateTask);
router.delete('/tasks/:id',isLoggedIn, taskRoute.deleteTask);



export default router;