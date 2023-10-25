import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import morgan from "morgan";
import cookieParser from "cookie-parser";
import connectDB from "./src/config/db.js";
//import {seeder} from "./seeder.js"
dotenv.config();
import { notFound, errorHandler } from './src/middleware/errorMiddleware.js';


// importing the application routes files
import userRouter from "./src/routes/userRoutes.js";
import taskRouter from "./src/routes/taskRoutes.js";

// Connecting to MongoDB
connectDB();
//console.log("Connected to MongoDB");

// creating express app
const app = express();

// taking the port from the local .env file
const PORT = process.env.PORT;

// setting up body parsing middleware - urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// setting up cookie parser middleware
app.use(cookieParser());

app.use(cors());
app.use(morgan('tiny'));

// loading the application routes to the app
app.use('/api/users',userRouter);
app.use('/api/tasks',taskRouter);

// loading error handling middleware
app.use(notFound);
app.use(errorHandler);

//seeder.importData();
// starting the server
app.listen(PORT);








