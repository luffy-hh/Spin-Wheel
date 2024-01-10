const { dbConnect } = require("./config/dbConnect");
const dotenv = require("dotenv").config();
const app = require("./app");
dbConnect();

const port = process.env.PORT || 3000;

app.listen(port, () => console.log("Server Listening at", port));
