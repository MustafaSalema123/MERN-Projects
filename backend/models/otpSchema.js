const mongoose = require("mongoose");
const validator = require("validator");

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Please provide a Valid Email"],
    },
    otp: {
        type: String,
        required: true,
    },
    expiresAt: {
        type: Date,
        required: true,
    },
});

module.exports = mongoose.model("Otp", otpSchema);
