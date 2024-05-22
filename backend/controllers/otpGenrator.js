// const crypto = require('crypto');
// const User = require("../models/userSchema");
// const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// const generateOtp = () => {
//     return crypto.randomBytes(3).toString('hex'); // Generate a 6-digit OTP
// };


// // Generate OTP and send email
// const generateOtpHandler = catchAsyncErrors(async (req, res, next) => {
//     const { email } = req.body;

//     let user = await User.findOne({ email });
//     if (user) {
//         return next(new ErrorHandler("User already registered!", 400));
//     }

//     const otp = generateOtp();
//     await Otp.create({ email, otp, expiresAt: Date.now() + 10 * 60 * 1000 }); // OTP expires in 10 minutes

//     await sendOtpEmail(email, otp);

//     res.status(200).json({
//         success: true,
//         message: "OTP sent to email!",
//     });
// });

// const verifyOtpHandler = catchAsyncErrors(async (req, res, next) => {
//     const { email, otp } = req.body;

//     const otpRecord = await Otp.findOne({ email, otp, expiresAt: { $gt: Date.now() } });
//     if (!otpRecord) {
//         return next(new ErrorHandler("Invalid or expired OTP", 400));
//     }

//     res.status(200).json({
//         success: true,
//         message: "OTP verified!",
//     });
// });