import express from 'express'
import dotenv from "dotenv"
import cors from 'cors'
import { connectDb } from './lib/db.js';
import cookieParser from 'cookie-parser';



//initializing dotenv
dotenv.config();

//initializing app
const app = express()
const port=3001

// middle wares
app.use(cors({
    credentials:true,
    origin:"http://localhost:3000/",
}))
app.use(express.json());
app.use(cookieParser());

app.get('/',(req,res)=>{
    res.send("hello its working blud")
})

app.listen(port,()=>{
    connectDb();
    console.log("listeneing");
})
