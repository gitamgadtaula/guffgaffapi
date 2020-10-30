//importing express dependencies
const express = require("express");
const app = express();

//for file upload
const fileUpload = require('express-fileupload');
// For POST-Support
let bodyParser = require("body-parser");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());
// To accept json parameters
app.use(express.json());

// enable files upload
app.use(fileUpload({
  createParentPath: true
}));
// load the files that are in the public directory from the /static path prefix.
app.use(express.static('public'))

//for dotenv file usage
require("dotenv").config();

//api routes
const routes = require("./routes/index");
app.use("/api", routes);

//mongo db database connection
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("connected to mongodb .."));

//listen to the changes in the app
app.listen(process.env.PORT, () =>
  console.log(`server running in http://localhost:${process.env.PORT}/`)
);
module.exports = app;
