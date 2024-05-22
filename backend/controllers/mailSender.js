const nodemailer = require('nodemailer');
require('dotenv').config();


const mailSendingBody = { "Accepted": 'Hi! There, Your Appointment as been Accepted by Doctor  on ',
   "Pending": 'Hi! There, Your Appointment has been send to doctor and there your appointement status in pending on ',
   "Rejected" :'Hi! There, Your Appointment as been Rejected  due to doctor is not avilable on '

}


const sendOtpEmail = async (email, otp) => {

    

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host:'smt.gmail.com',
        secure: false,
        auth: {
            user: process.env.AUTH_EMAIL,
            pass: process.env.AUTH_PASS,
        },
    });
  
    // const transporter = nodemailer.createTransport({
    //     host: 'smtp.ethereal.email',
    //     port: 587,
    //     auth: {
    //         user: 'hillard.considine@ethereal.email',
    //         pass: 'DRcdydPvBwSmjM3VHW'
    //     }
    // });

    const mailOptionOtp = {
        from:process.env.AUTH_EMAIL,
        to: email,
        subject: 'Your OTP for registration',
        text: `Your OTP is ${otp}`,
    };


    try{
 
   
        await transporter.sendMail(mailOptionOtp);
    
    }catch(err)
    {
        console.log("mail send error " , err);
    }

    // try{
     
        // await transporter.sendMail(mailOptionOtp, function(error, info){ 
        //     if (error){
        //        console.log("dadadada " ,error);
        //         return  ;
        //     }
        //     console.log('Email Sent Successfully'); 
        //     console.log(info); });
        
    // }catch(err)
    // {
    //     console.log("mail send error " , err);
    // }
};

const sendStatusMail = async (email, status , appointmentDate) => {
    // const transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //         user: 'registerlink12@gmail.com',
    //         pass: 'asdfghjkl123',
    //     },
    // });


    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host:'smt.gmail.com',
        secure: false,
        auth: {
            user: process.env.AUTH_EMAIL,
            pass: process.env.AUTH_PASS,
        },
    });
  
    // const transporter = nodemailer.createTransport({
    //     host: 'smtp.ethereal.email',
    //     port: 587,
    //     auth: {
    //         user: 'hillard.considine@ethereal.email',
    //         pass: 'DRcdydPvBwSmjM3VHW'
    //     }
    // });

  

    const mailSendStatus  = {
        from: process.env.AUTH_EMAIL,
        to: email,
        subject: 'Appointment Status',
        text: `${mailSendingBody[status]} ${appointmentDate}. Thanks`,
      //  text: mailSendingBody[status] + {appointmentdate},
    };

     try{
 
   
        await transporter.sendMail(mailSendStatus);
    
    }catch(err)
    {
        console.log("mail send error " , err);
    }
};

module.exports = { sendOtpEmail , sendStatusMail };
//module.exports = sendStatusMail;