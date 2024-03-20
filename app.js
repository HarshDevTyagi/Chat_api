require("./database/database")

const express=require("express");
const bodyParser=express.json;
const routes=require("./routes/index");


const app=express();
app.use(bodyParser());

app.use("/formessage",routes);
app.use("/chat",routes);
app.use("/rectionat",routes)

module.exports=app;