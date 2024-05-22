const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const express = require("express");

//imports routes
const user = require("./routes/user.route"); 

const CONNECTION_URL = "mongodb://localhost/nodeEcom";

const mongoDB = process.env.MONGODB_URI || CONNECTION_URL;
mongoose.set("strictQuery", false);
mongoose.connect(mongoDB);mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("open", () => console.log("MongoDB is connected"));
db.on("error", console.error.bind(console, "MongoDB connection error:"));
const app = express();
const port = 6000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/user", user);

app.get("/", (request, respone) => {
  respone.send("Welcome to node eOne POC app!!!!");
});

app.listen(port, () => {
  console.log(`E-One Backend is running on port ${port}`);
});
