//import express from "express";
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const dbConnection = require("./database/dbConnection");
const messageRouter = require("./routers/messageRouter");
const userRouter = require("./routers/userRouter");
const appointmentRouter = require("./routers/appointmentRouter");
//const config = require("dotenv");
require('dotenv').config();
//const  errorMiddleware  = require("./middleware/error");
const { errorMiddleware  , ErrorHandler} = require("./middleware/error");

const app = express();


app.use(cors({
    origin: [process.env.FRONTEND_URL , process.env.DASHBOARD_URL],
    methods: ["GET" , "POST" , "PUT" , "DELETE"],
    credentials: true,
})
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
}));


app.use("/api/message" , messageRouter);
app.use("/api/user" , userRouter);
app.use("/api/appointment" , appointmentRouter);


dbConnection();
app.use(errorMiddleware);

//config({path:"./config/config.env"})
//export default app;
module.exports = app;