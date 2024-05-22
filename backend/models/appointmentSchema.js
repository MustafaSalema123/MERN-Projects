const mongoose = require("mongoose");
const validator = require("validator");



const appointmentSchema = new mongoose.Schema({

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
    appointment_date: {
        type: String,
        required: [true, "Appointment Date Is Required!"],
      },
      department: {
        type: String,
        required: [true, "Department Name Is Required!"],
      }, 
      doctor: {
        firstName: {
          type: String,
          required: [true, "Doctor Name Is Required!"],
        },
        lastName: {
          type: String,
          required: [true, "Doctor Name Is Required!"],
        },
      }, 
      hasVisited: {
        type: Boolean,
        default: false,
      },
      address: {
        type: String,
        required: [true, "Address Is Required!"],
      },
      doctorId: {
        type: mongoose.Schema.ObjectId,
        required: [true, "Doctor Id Is Invalid!"],
      },
      patientId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Patient Id Is Required!"],
      },
      status: {
        type: String,
        enum: ["Pending", "Accepted", "Rejected"],
        default: "Pending",
      },
})

//module.exports = mongoose.model("Message" , MessageSchema)

module.exports = mongoose.model("Appointment", appointmentSchema);