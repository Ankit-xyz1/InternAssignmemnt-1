import express from 'express'
import dotenv from "dotenv"
import { connectDb } from "./src/lib/db.js";
import cors from 'cors'


dotenv.config();
const port = process.env.PORT;