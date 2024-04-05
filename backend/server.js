import "dotenv/config"
import express from "express";
import cors from "cors";

import dbConnect from "./services/dbConnect.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import classroomRoutes from "./routes/classroomRoutes.js";
import authRoutes from "./routes/authRoutes.js"
import bookingRoutes from "./routes/bookingRoutes.js"
import feedbackRoutes from "./routes/feedbackRoutes.js"

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

dbConnect();

app.use('/teacher',teacherRoutes);
app.use('/',classroomRoutes)
app.use('/',authRoutes);
app.use('/booking',bookingRoutes);
app.use('/',feedbackRoutes)

app.listen(4000,()=>{
    console.log(`server running on port 4000`)
})