import express, { Application, Request, Response } from "express";
import errorHandler from "./src/middlewares/errorHandler";
import {BasketRouter} from "./src/routes/BasketRouter";
import cors from 'cors';
import dotenv from "dotenv";
dotenv.config();

const app : Application = express();

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173' 
}));

app.get("/", (req: Request, res: Response) => {
    res.send("NewMind AI - Mert Topcu - E-commerce Fullstack Microservice App");
  });

app.use("/basket",BasketRouter)


// -> My errorhandler middleware I just used info and error level for now handle with winston
app.use(errorHandler);

export default app;