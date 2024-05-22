const express = require("express");
const { postAppointment , getAllAppointments  ,deleteAppointment , updateAppointmentStatus} = require("../controllers/appointmentController");
const { isAdminAuthentication , isPatientAuthenticated } = require("../middleware/Auth");

const router = express.Router();

//http://localhost:4000/api/appointment/post
// {
//     "firstName": "Test",
//     "lastName":"Name",
//     "email":"test@gmail.com",
//     "phone":"99999999999",
//     "message":"I am new messages yet"
//TODO :   more Data
   
// }
//http://localhost:4000/api/appointment/post
router.post("/post" ,isPatientAuthenticated , postAppointment);

//http://localhost:4000/api/appointment/getall
router.get("/getall" , isAdminAuthentication ,getAllAppointments);

//http://localhost:4000/api/appointment/update/:id
router.put("/update/:id" , isAdminAuthentication ,updateAppointmentStatus);

//http://localhost:4000/api/appointment/delete/:id
router.put("/delete/:id" , isAdminAuthentication ,deleteAppointment);

module.exports = router;