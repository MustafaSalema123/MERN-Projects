const express = require('express')

const postRoute = require("./routes/post.route");
const authRoute = require("./routes/auth.route");

require("dotenv").config();


const app = express();


app.use(express.json());
app.use("/api/test" , (req , res) => {
 res.send("Hello programmer")

});

app.use("/post" ,postRoute );
app.use("/api/auth" ,authRoute );
app.listen(process.env.PORT , () => 

{
    console.log(`server start at port number ${process.env.PORT}` );
})