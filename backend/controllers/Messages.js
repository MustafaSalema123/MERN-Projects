const Message = require("../models/messageSchema");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { errorMiddleware, ErrorHandler } = require("../middleware/error");
//const ErrorHandler = require("../middleware/error");
//import {ErrorHandler} from "../middleware/error.js"


const sendMessage = catchAsyncErrors(async (req , res , next) => {
    const { firstName, lastName , email , phone , message} = req.body;

    if(!firstName ||  !lastName  ||  !email  ||  !phone  ||  !message)
    {
        // console.log(req.body);
        // return res.status(400).json({
        //     success:false,
        //     message : "Please fill full form",
        // });
        return next(new ErrorHandler("Please fill full form" , 400))
    }

    await Message.create( { firstName, lastName , email , phone , message});
    return res.status(200).json({
        success: true,
        message : "Message Send successfully ! ",
    });

});

const getAllMessages = catchAsyncErrors(async (req , res , next) => { 

    const messages = await Message.find();
    return res.status(200).json({
        success: true,
        messages,
    });
})

module.exports = { sendMessage , getAllMessages } ;