import express from 'express'
import dotenv from "dotenv"
import cors from 'cors'
import { connectDb } from './lib/db.js';
import cookieParser from 'cookie-parser';
import userModel from './models/UserModel.js';
import CouponModel from './models/CouponModel.js';
import { generateAndSendJWT } from './middleware/userLanded.js';
import adminModel from './models/adminModel.js';
import adminRouter from './routes/adminRoutes.js';
import couponRoute from './routes/couponRoute.js';




//initializing dotenv
dotenv.config();

//initializing app
const app = express()
const port=3001

// middle wares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials:true,
    origin:"http://localhost:3000",
}))

app.use('/admin',adminRouter)
app.use('/coupon',couponRoute)

app.get('/',(req,res)=>{
    res.send("hello its working blud")
})

//starting a session
app.get('/SessionStart',generateAndSendJWT,(req,res)=>{
    res.json({
        sucess:true,
        message:"session started"
    })
})

app.listen(port,()=>{
    connectDb();
    console.log("listeneing");
})
