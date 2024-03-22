require("./database/database")

const express = require("express");
const bodyParser = require("body-parser"); // Correct import for bodyParser
const routes = require("./routes/index");
const rateLimit = require("express-rate-limit");

const app = express();


const limiter = rateLimit({
  windowMs:3000000, 
  max: 100, 
  message: 'Too many requests from this IP, please try again later.'
});

app.use(limiter);


app.use(bodyParser.json());


app.use("/formessage", routes);
app.use("/chat", routes);
app.use("/rectionat", routes);



module.exports = app;
