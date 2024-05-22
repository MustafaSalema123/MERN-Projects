const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: [true, "First Name Is Required!"],
        minLength: [3, "first name must containe At least 3 character"],
    },
    lastName: {
        type: String,
        required: [true, "Email Is Required!"],
        minLength: [3, "Last name must containe At least 3 character"],
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Please provide a Valid Email"],
    },
    phone: {
        type: String,
        required: [true, "Phone Is Required!"],
        minLength: [11, "Phonr number must contain exact 11 digits!"],
        maxLength: [11, "Phonr number must contain exact 11 digits!"],
    },
    nic: {
        type: String,
        required: [true, "NIC Is Required!"],
        minLength: [13, "NIC Must Contain Only 13 Digits!"],
        maxLength: [13, "NIC Must Contain Only 13 Digits!"],
    },
    dob: {
        type: Date,
        required: [true, "DOB Is Required!"],
    },
    gender: {
        type: String,
        required: [true, "Gender Is Required!"],
        enum: ["Male", "Female"],
    },
    password: {
        type: String,
        required: [true, "Password Is Required!"],
        minLength: [8, "Password Must Contain At Least 8 Characters!"],
        select: false,
    },
    role: {
        type: String,
        required: [true, "User Role Required!"],
        enum: ["Patient", "Doctor", "Admin"],
    },
    doctorDepartment:{
        type: String,
    },
    docAvatar: {
        public_id: String,
        url: String,
    },
})

userSchema.pre("save" , async function (next) {
    if(!this.isModified("password"))
        {
            next();
        }
        this.password = await bcrypt.hash(this.password , 10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };

  userSchema.methods.generateJsonWebToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES,
    });
  };
//module.exports = mongoose.model("Message" , MessageSchema)

module.exports = mongoose.model("User", userSchema);