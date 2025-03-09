import express from 'express'
import AuthRoutes from "./routes/auth.route.js" 
import MessageRoutes from "./routes/message.route.js" 
import dotenv from "dotenv"
import { connectDB } from './lib/db.js';
import cookieParser from "cookie-parser"
import cors from "cors"

const app=express();


//.env 
dotenv.config()
const PORT=process.env.PORT


//middlewares
app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use("/api/auth",AuthRoutes)
app.use("/api/message",MessageRoutes)

app.listen(PORT,()=>{
    console.log('server is running on port 5001');
    connectDB()
})