const User = require("../models/userSchema");
const Otp = require("../models/otpSchema");
const  { sendOtpEmail } = require("./mailSender");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { errorMiddleware ,ErrorHandler } = require("../middleware/error");
//import {ErrorHandler} from "../middleware/error.js"
const generateToken = require("../utils/jwtToken")
const cloudinary = require("cloudinary");
const crypto = require('crypto');

const userRegister = catchAsyncErrors(async (req , res , next) => {
    const {firstName, lastName, email, phone, nic, dob, gender, password , role} = req.body;

    if(!firstName ||  !lastName  ||  !email  ||  !phone  ||  !nic  || !dob || !gender || !password )
    {
        // console.log(req.body);
        // return res.status(400).json({
        //     success:false,
        //     message : "Please fill full form",
        // });
        return next(new ErrorHandler("Please fill full form" , 400))
    }

    let user  = await User.findOne( { email});
    if(user)
    {
        return next(new ErrorHandler("User alredy registered!" , 400))
    
    }
    user = await User.create( { firstName, lastName, email, phone, nic, dob, gender, password , role: "Patient",});
    return res.status(200).json({
        success: true,
        message : "User register ! ",
    });

});


const Login = catchAsyncErrors(async (req , res , next) => {
    const { email , password  , confirmPassword , role } = req.body;
    if (!email || !password || !confirmPassword || !role) {
        return next(new ErrorHandler("Please Fill Full Form!", 400));
      }

    if (password !== confirmPassword) {
    return next(
        new ErrorHandler("Password & Confirm Password Do Not Match!", 400)
    );
    }

    const user = await User.findOne({ email }).select("+password");
   // const user2 = await User.findOne({ email }); password nhi aayega
    // console.log(user  ," user one + password "); 
    // console.log(user2  ," user two no password ");

    if (!user) {
        return next(new ErrorHandler("Invalid Email Or Password!", 400));
      }

      const isPasswordMatch = await user.comparePassword(password); // we create a  comparePassword in schema
      if (!isPasswordMatch) {
        return next(new ErrorHandler("Invalid Email Or Password!", 400));
      }
      if (role !== user.role) {
        return next(new ErrorHandler(`User Not Found With This Role!`, 400));
      }
      generateToken(user, "Login Successfully!", 201, res);
      //after login succefulkl it retun  
    //   {
    //     "success": true,
    //     "message": "Login Successfully!",
    //     "user": {
    //         "_id": "664b189d8ed4f0082345c5dc",
    //         "firstName": "Testp",
    //         "lastName": "Name",
    //         "email": "test@gmail.com",
    //         "phone": "99999999999",
    //         "nic": "1234567890123",
    //         "dob": "2005-01-04T18:30:00.000Z",
    //         "gender": "Male",
    //         "password": "$2b$10$14k7c6KYPqW1soekV1YUzONlsksVp5htqpa4I1HacTWbQQ5IwXxtu",
    //         "role": "Patient",
    //         "__v": 0
    //     },
    //     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NGIxODlkOGVkNGYwMDgyMzQ1YzVkYyIsImlhdCI6MTcxNjE5ODU0NywiZXhwIjoxNzE2Mjg0OTQ3fQ.G5Au8Rmcx0m4rrxAfukxI9FTamw-ZhBiAoDIc_NYlKk"
    // }
     

});

const addnewAdmin  = catchAsyncErrors(async (req , res , next)=> {

    const { firstName, lastName, email, phone, nic, dob, gender, password } =  req.body;
  if (
    !firstName ||!lastName ||!email ||!phone ||!nic ||!dob ||!gender || !password) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }

  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(new ErrorHandler("Admin With This Email Already Exists!", 400));
  }

  const admin = await User.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
    role: "Admin",
  });
  res.status(200).json({
    success: true,
    message: "New Admin Registered",
    admin,
  });
});


 const addNewDoctor = catchAsyncErrors(async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
      return next(new ErrorHandler("Doctor Avatar Required!", 400));
    }
    const { docAvatar } = req.files;
    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
    if (!allowedFormats.includes(docAvatar.mimetype)) {
      return next(new ErrorHandler("File Format Not Supported!", 400));
    }
    const {
      firstName,
      lastName,
      email,
      phone,
      nic,
      dob,
      gender,
      password,
      doctorDepartment,
    } = req.body;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !nic ||
      !dob ||
      !gender ||
      !password ||
      !doctorDepartment ||
      !docAvatar
    ) {
      return next(new ErrorHandler("Please Fill Full Form!", 400));
    }
    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
      return next(
        new ErrorHandler("Doctor With This Email Already Exists!", 400)
      );
    }
    const cloudinaryResponse = await cloudinary.uploader.upload(
      docAvatar.tempFilePath
    );
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.error(
        "Cloudinary Error:",
        cloudinaryResponse.error || "Unknown Cloudinary error"
      );
      return next(
        new ErrorHandler("Failed To Upload Doctor Avatar To Cloudinary", 500)
      );
    }
    const doctor = await User.create({
      firstName,
      lastName,
      email,
      phone,
      nic,
      dob,
      gender,
      password,
      role: "Doctor",
      doctorDepartment,
      docAvatar: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      },
    });
    console.log("doc" , doctor)
    res.status(200).json({
      success: true,
      message: "New Doctor Registered",
      doctor,
    });
  });

const getAllDoctors = catchAsyncErrors(async (req, res, next) => {
    const doctors = await User.find({ role: "Doctor" });
    res.status(200).json({
      success: true,
      doctors,
    });
  });
  

   const getUserDetails = catchAsyncErrors(async (req, res, next) => {

    const user= req.user;
    res.status(200).json({
        success: true,
        user,
   });
  });
  

  // Logout function for dashboard admin
 const logoutAdmin = catchAsyncErrors(async (req, res, next) => {
    res
      .status(201)
      .cookie("adminToken", "", {
        httpOnly: true,
        expires: new Date(Date.now()),
      })
      .json({
        success: true,
        message: "Admin Logged Out Successfully.",
      });
  });
  
  // Logout function for frontend patient
 const logoutPatient = catchAsyncErrors(async (req, res, next) => {
    res
      .status(201)
      .cookie("patientToken", "", {
        httpOnly: true,
        expires: new Date(Date.now()),
      })
      .json({
        success: true,
        message: "Patient Logged Out Successfully.",
      });
  });
// module.exports = userRegister;
// module.exports = Login;

const generateOtpHandler = catchAsyncErrors(async (req, res, next) => {
  const { email } = req.body;

  let user = await User.findOne({ email });
 
  if (user) {
      return next(new ErrorHandler("User already registered!", 400));
  }

  const otp = crypto.randomBytes(3).toString('hex');
  
  await Otp.create({ email, otp, expiresAt: Date.now() + 10 * 60 * 1000 }); // OTP expires in 10 minutes
  
  await sendOtpEmail(email, otp);
  
  res.status(200).json({
      success: true,
      message: "OTP sent to email!",
  });
});

const verifyOtpHandler = catchAsyncErrors(async (req, res, next) => {
  const { email, otp } = req.body;

  const otpRecord = await Otp.findOne({ email, otp, expiresAt: { $gt: Date.now() } });
  if (!otpRecord) {
      return next(new ErrorHandler("Invalid or expired OTP", 400));
  }

  res.status(200).json({
      success: true,
      message: "OTP verified!",
  });
});


module.exports = {userRegister , Login , addnewAdmin , getAllDoctors , getUserDetails , logoutAdmin , logoutPatient , addNewDoctor , generateOtpHandler , verifyOtpHandler};
