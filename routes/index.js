const express=require("express");
const router=express.Router();

const msg=require("./../chat_channel/index");
const user=require("./../chat_channel/index");
const rection=require("./../chat_channel/index");

router.use("/message",msg);
router.use("/user",user);
router.use("/rection",rection);

module.exports=router;



