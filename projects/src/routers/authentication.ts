import express,{Request,Response} from "express";
import mongoose, { mongo } from "mongoose";
import cors from "cors";
require('dotenv').config();

  




const router=express.Router();
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI||"5000")
   .then(() => console.log('MongoDB connected'))
   .catch(err => console.error('MongoDB connection error:', err));


export default router;