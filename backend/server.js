const app = require("./app");
require('dotenv').config();
const cloudinary = require("cloudinary");

cloudinary.v2.config({
    cloud_name:  process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY ,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

app.listen(process.env.PORT , ()=>{
    console.log(`server listeing in port ${process.env.PORT}`)
});