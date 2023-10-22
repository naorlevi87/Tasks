import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import morgan from "morgan";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_DB_CONNECTION_STRING;

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));

import userRouter from "./src/routes/userRoutes.js";
import taskRouter from "./src/routes/taskRoutes.js";


mongoose.connect(MONGO_URI).then (()=> {
    //console.log("Connected to MongoDB");
    app.use(userRouter);
    app.use(taskRouter);
    app.listen(PORT);
})







