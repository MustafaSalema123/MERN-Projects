const express =  require("express");
const authRoute =  require("./routes/auth.route");
const cookieParser =  require("cookie-parser");
const dbconnection =  require("./database/dbConnection");

require("dotenv").config();
const cors = require("cors");

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
// app.use("/api/users", userRoute);
// app.use("/api/posts", postRoute);
// app.use("/api/test", testRoute);
// app.use("/api/chats", chatRoute);
// app.use("/api/messages", messageRoute);

dbconnection();


app.listen(process.env.PORT, () => {
  console.log(`Server is running! ${process.env.PORT}`);
});
