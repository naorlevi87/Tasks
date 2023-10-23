import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import morgan from "morgan";
import connectDB from "./src/config/db.js";
dotenv.config();
import userRouter from "./src/routes/userRoutes.js";
import taskRouter from "./src/routes/taskRoutes.js";

connectDB();
//console.log("Connected to MongoDB");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));


app.use('/api/users',userRouter);
app.use('/api/tasks',taskRouter);


app.listen(PORT);








