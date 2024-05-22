const mongoose = require("mongoose");
const validator  = require("validator");

const MessageSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true,
        minLength: [3 , "first name must containe At least 3 character"],
    },
    lastName: {
        type: String,
        required: true,
        minLength: [3 , "Last name must containe At least 3 character"],
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail , "Please provide a Valid Email"],
    },
    phone: {
        type: String,
        required: true,
        minLength: [11 , "Phonr number must contain exact 11 digits!"],
        maxLength: [11 , "Phonr number must contain exact 11 digits!"],
    },
    message: {
        type: String,
        required: true,
        minLength: [10 , "Message  must containe At least 3 characters!"],
    },
})

//module.exports = mongoose.model("Message" , MessageSchema)

module.exports = mongoose.model("Message" , MessageSchema);