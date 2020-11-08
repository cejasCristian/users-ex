const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/index");
const bodyParser = require("body-parser");
const cors = require("cors");

//create server
const app = express();

//enable cors
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

//connect to mongodb
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/users", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

//enable body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//enable routing
app.use("/", routes());

//port
app.listen(4000, () => {
  console.log("server working");
});
