import express, { json } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from './routes/auth.js'
import convRoutes from './routes/conversation.js'
import messagesRoutes from './routes/messages.js'
import usersRoutes from './routes/users.js'
import { Server, Socket } from "socket.io";



const app = express()
dotenv.config()
const PORT = process.env.PORT 


//Middlewares
app.use(cors(
    {
        origin: 'http://localhost:5173',
        credentials: true,
    }
))
app.use(cookieParser())
app.use(json())



// Routes
app.use('/api/auth', authRoutes)
app.use('/api/conv', convRoutes)
app.use('/api/messages', messagesRoutes)
app.use('/api/users', usersRoutes)



// Db connection
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB)
        console.log("Connected successfully to database!")
    } catch (error) {
        console.log(error)
    }
}



app.listen(PORT, () => {
    console.log(`listening on Port ${PORT}`)
    connect()
})