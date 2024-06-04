const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
//var cors = require('cors')
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");
const multer = require("multer");
const router = express.Router();
const path = require("path");

dotenv.config();


//app.use(cors())
mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
  }
);
app.use("/images" , express.static(path.join(__dirname,"public/images")));

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage =multer.diskStorage({
  destination:(req ,file , cb)=>
  {
    cb(null, "public/images");
  },
  filename: (req,file,cb)=>
  {
    cb(null, req.body.name);
  },
});


const upload = multer({storage: storage});
app.post("/api/upload" , upload.single("file") , (req , res)=>{
  try{
    return res.status(200).json("File Uploaded successfully");
  }catch(error)
  {
    console.error(error);
  }
});

const storageVedio =multer.diskStorage({
  destination:(req ,file , cb)=>
  {
    cb(null, "public/images/videos");
  },
  filename: (req,file,cb)=>
  {
    cb(null, req.body.name);
  },
});

const uploadVedio = multer({storage: storageVedio});
app.post("/api/upload/vedio" , uploadVedio.single("file") , (req , res)=>{

  try{
    return res.status(200).json("File Uploaded successfully");
  }catch(error)
  {
    console.error(error);
  }

});


app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);

app.listen(8800, () => {
  console.log("Backend server is running!");
});
