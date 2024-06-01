const mongoose = require("mongoose");
require('dotenv').config();


const dbConnection = () => {
    mongoose.connect(process.env.MONGO_URL , {
        dbName: "RealState",
    }).then(()=> {
        console.log("connected to database");
    }).catch((err) => {
        console.log(" some error is accoured " , err)
    })
} 

module.exports = dbConnection;