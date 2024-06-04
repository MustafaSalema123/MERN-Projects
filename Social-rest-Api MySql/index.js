const express = require('express');
//const connection = require('./DBConnection')
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')
const usersRoute = require('./routes/users')
require('dotenv').config();
const http = require('http');
//app.use(cors())
const app = express();
app.use(express.urlencoded({extended: true}));

app.use(express.json());
app.use('/auth',authRoute)
app.use('/post',postRoute)
app.use('/users',usersRoute)


app.use(express.json());

//module.exports = app;
const server= http.createServer(app);
server.listen(process.env.PORT, () => {
    console.log("Backend server is running!");
  });