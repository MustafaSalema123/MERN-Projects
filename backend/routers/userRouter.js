const express = require("express");
//const userRegister = require("../controllers/userController");
//const Login = require("../controllers/userController");
const {userRegister , Login, addnewAdmin , getAllDoctors , getUserDetails, logoutAdmin,logoutPatient, addNewDoctor , generateOtpHandler , verifyOtpHandler}
 = require("../controllers/userController");

const router = express.Router();

const {isAdminAuthentication , isPatientAuthenticated }=  require("../middleware/Auth");

// http://localhost:4000/api/user/patient/register
// {
//     "firstName": "Testp",
//     "lastName":"Name",
//     "email":"test@gmail.com",
//     "phone":"99999999999",
//     "nic":"1234567890123",
//     "dob":"1/5/2005",
//     "gender":"Male",
//     "password":"asdfghjkl",
//     "role":"Patient"
   
// }
router.post("/patient/register" , userRegister);

// http://localhost:4000/api/user/login
// {
//     "email":"test@gmail.com",
//     "password":"asdfghjkl",
//     "confirmPassword": "asdfghjkl",
//     "role": "Patient"
// }
router.post("/login" , Login);


// http://localhost:4000/api/user/admin/addNew
// {
//     "firstName": "admin",
//     "lastName":"123",
//     "email":"admin@gmail.com",
//     "phone":"99999999999",
//     "nic":"1234567890123",
//     "dob":"1/5/2004",
//     "gender":"Male",
//     "password":"qwerty1234",
//     "role":"Admin"
   
// }
router.post("/admin/addNew" , isAdminAuthentication ,addnewAdmin);

//http://localhost:4000/api/user/doctors
router.get("/doctors" ,isPatientAuthenticated,getAllDoctors);

//http://localhost:4000/api/user/patient/me
router.get("/patient/me"  ,isPatientAuthenticated ,getUserDetails);

//http://localhost:4000/api/user/admin/me
router.get("/admin/me"  ,isAdminAuthentication ,getUserDetails);

//http://localhost:4000/api/user/patient/logout
router.get("/patient/logout"  ,isPatientAuthenticated ,logoutPatient);

//http://localhost:4000/api/user/admin/logout
router.get("/admin/logout"  ,isAdminAuthentication ,logoutAdmin); //isAdminAuthentication is when cookier is avaiable in browser



//http://localhost:4000/api/user/doctor/addNewDoctor
router.post("/doctor/addNewDoctor"  ,isAdminAuthentication ,addNewDoctor);


//http://localhost:4000/api/user/send-otp
router.post("/send-otp"   ,generateOtpHandler);

//http://localhost:4000/api/user/verify-otp
router.post("/verify-otp"   ,verifyOtpHandler);


module.exports = router;