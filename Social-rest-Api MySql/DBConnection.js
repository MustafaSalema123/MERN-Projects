const mysql2 = require('mysql2')
require('dotenv').config();


var connection = mysql2.createConnection({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})


connection.connect((err) => 
{
    if(!err)
    {
        console.log('Database Connected')
    }else
    {
        console.log(err);
    }


});


module.exports = connection;