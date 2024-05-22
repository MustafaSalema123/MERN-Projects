const Appointment = require("../models/appointmentSchema");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { errorMiddleware, ErrorHandler } = require("../middleware/error");
const User = require("../models/userSchema");

const { sendStatusMail } = require("./mailSender");
//const ErrorHandler = require("../middleware/error");
//import {ErrorHandler} from "../middleware/error.js"


 const postAppointment = catchAsyncErrors(async (req, res, next) => {
    const {firstName,lastName,email,phone,nic,dob,gender,appointment_date,department ,doctor_firstName, doctor_lastName,hasVisited, address, } = req.body;
    if (!firstName ||!lastName ||!email ||!phone ||!nic ||!dob || !gender ||!appointment_date ||
      !department || !doctor_firstName ||!doctor_lastName || !address
    ) {
      return next(new ErrorHandler("Please Fill Full Form!", 400));
    }
    const isConflict = await User.find({
      firstName: doctor_firstName,
      lastName: doctor_lastName,
      role: "Doctor",
      doctorDepartment: department,
    });
    if (isConflict.length === 0) {
      return next(new ErrorHandler("Doctor not found", 404));
    }
  
    if (isConflict.length > 1) {
      return next(
        new ErrorHandler(
          "Doctors Conflict! Please Contact Through Email Or Phone!",
          400
        )
      );
    }
    const doctorId = isConflict[0]._id;
    const patientId = req.user._id;
    const appointment = await Appointment.create({
      firstName,
      lastName,
      email,
      phone,
      nic,
      dob,
      gender,
      appointment_date,
      department,
      doctor: {
        firstName: doctor_firstName,
        lastName: doctor_lastName,
      },
      hasVisited,
      address,
      doctorId,
      patientId,
    });
    await sendStatusMail(appointment.email , "Pending")
    res.status(200).json({
      success: true,
      appointment,
      message: "Appointment Send!",
    });
  });
  

 const getAllAppointments = catchAsyncErrors(async (req, res, next) => {
    const appointments = await Appointment.find();
    res.status(200).json({
      success: true,
      appointments,
    });
  });



  const deleteAppointment = catchAsyncErrors(async (req, res, next) => {
    const {id} = req.params;

    const appointment = await Appointment.findById(id);
    if(!appointment)
    {
        return next(new ErrorHandler("Appointment Not Found!", 404));
    }

    await appointment.deleteOne();
    res.status(200).json({
      success: true,
    message: "Appointment Deleted!",
    });
  });


   const updateAppointmentStatus = catchAsyncErrors(
    async (req, res, next) => {
      const { id } = req.params;
      let appointment = await Appointment.findById(id);
      if (!appointment) {
        return next(new ErrorHandler("Appointment not found!", 404));
      }
      appointment = await Appointment.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });
      //todo currnrt user email that save in cookie
      await sendStatusMail(appointment.email , appointment.status , appointment.appointment_date)
      res.status(200).json({
        success: true,
        message: "Appointment Status Updated!",
      });
    }
  );

module.exports = { postAppointment , getAllAppointments  ,deleteAppointment , updateAppointmentStatus} ;