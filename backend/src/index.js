import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB } from './lib/db.js';
import { server, app } from './lib/socket.js';
import AuthRoutes from "./routes/auth.route.js";
import MessageRoutes from "./routes/message.route.js";
import ClinicallogRoutes from "./routes/clinicallog.route.js";
import AdminRoutes from "./routes/admin.route.js";
import DiseaseRoutes from "./routes/disease.route.js";
import path from 'path'

dotenv.config();
const PORT = process.env.PORT || 5001;
const __dirname=path.resolve();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true, 
}));

app.use("/api/auth", AuthRoutes);
app.use("/api/message", MessageRoutes);
app.use("/api/clinicallog", ClinicallogRoutes);
app.use("/api/admin", AdminRoutes);
app.use("/api/disease", DiseaseRoutes);

if(process.env.NODE_ENV==="production"){
  app.use(express.static(path.join(__dirname,"../frontend/dist")))

  app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend", "dist","index.html"));
  });
}

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
