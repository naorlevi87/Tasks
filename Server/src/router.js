import express from "express";
import { loginRoute } from "./routes/loginRoute.js";
import { taskRoute } from "./routes/taskRoute.js";
const router = new express.Router();
import isLoggedIn from "./middleware/isLoggedIn.js";


router.post("/login", loginRoute.login); 
router.get('/tasks',isLoggedIn, taskRoute.getAllTasks);
router.post('/tasks',isLoggedIn, taskRoute.createNewTask);
router.put('/tasks/:id',isLoggedIn, taskRoute.updateTask);
router.delete('/tasks/:id',isLoggedIn, taskRoute.deleteTask);



export default router;