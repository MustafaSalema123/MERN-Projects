const express = require("express");
const {sendMessage , getAllMessages} = require("../controllers/Messages");
const { isAdminAuthentication } = require("../middleware/Auth");

const router = express.Router();

//http://localhost:4000/api/message/send
// {
//     "firstName": "Test",
//     "lastName":"Name",
//     "email":"test@gmail.com",
//     "phone":"99999999999",
//     "message":"I am new messages yet"
   
// }
router.post("/send" , sendMessage);

//http://localhost:4000/api/message/getall
router.get("/getall" , isAdminAuthentication ,getAllMessages);

module.exports = router;