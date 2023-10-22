import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import morgan from "morgan";
import router from "./src/router.js"
import mongoose from "mongoose";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_DB_CONNECTION_STRING;

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.use(router);

mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING).then (()=> {
    //console.log("Connected to MongoDB");
    app.listen(PORT);
})







