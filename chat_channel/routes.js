const express=require("express");
const router=express.Router();
const {createNewuser, createNewmsg, reaction_atcontroller, seen_atcontroller, delivery_atcontroller, chat_channel_created,
       chat_detail_controller, updatemsg, rem, muted_controller_fuction, admin_controller_fuction, fetchuser, active_controller_fuction, delete_collection_message}=require("./controller_chat_channel");
const { pageination, userdetailmodel, seenfunction, fetchdataffunction } = require("./model");
//delivery end point 
router.post("/delivery",async(req,res)=>{
    try { var delivery_msg={
        "collection_name":req.body.collection_name,
        "message":req.body.message,
        "deliver_to":req.body.deliver_to,
        "delivery_t":req.body.delivery_t,
    };



    const newdelivery=await delivery_atcontroller({
        delivery_msg,
    });
    res.status(200).json({
        status:1,
        msg:newdelivery,
        rescode:200});
        
    } catch (error) {
        res.status(400).json({
            sdtv: "from routes/chat_channel",
            status:0,
            msg:error.message,
            rescode:400});
    
    }
})
//seen_at end point 
router.post ("/seen_at",async(req,res)=>{
    try {
        var seen_byuser={
           "collection_name":req.body.collection_name,
            "message":req.body.message,
            "seen":req.body.seen,
            "seen_by":req.body.seen_by,
            };
            console.log(seen_byuser);
           
            const newUser=await seen_atcontroller({
                seen_byuser,
            });
            res.status(200).json({
                status:1,
                msg:newUser,
                rescode:200});
        
    } 
    catch (error) {
        res.status(400).json({
            sdtv: "from routes/chat_channel",
            status:0,
            msg:error.message,
            rescode:400});
    }
})
//reaction_at end point 
router.post ("/reaction_at",async(req,res)=>{
    try {
        var userreaction={
            "collection_name":req.body.collection_name,
            "message":req.body.message,
            "reaction": req.body.reaction,
            "reacted_by":req.body.reacted_by,
            "reaction_emoji":req.body.reaction_emoji,
            "reacted_at":req.body.reacted_at,
};
            console.log("user",userreaction);

            const newUser=await reaction_atcontroller({
                userreaction,
            });
            res.status(200).json({
                status:1,
                msg:newUser,
                rescode:200});
        
    } 
    catch (error) {
        res.status(400).json({
            sdtv: "from routes/chat_channel",
            status:0,
            msg:error.message,
            rescode:400});
    }
})
// userchat end point 
router.post("/userchat",async(req,res)=>{
    try {
        var user={
            "collection_name":req.body.collection_name,
            "Name": req.body.Name,
            "Email":req.body.Email,
            "profilepic":req.body.profilepic,
           
        };
               const newUser=await createNewuser({
                user,
          
               });
               res.status(200).json({
                 status:1,
                 msg:newUser,
                 rescode:200});
        

    } catch (error) {
        res.status(400).json({
            sdtv: "from routes/chat_channel",
            status:0,
            msg:error.message,
            rescode:400});
    }
})
//msg end point 
router.post("/msg",async(req,res)=>{
    try {
       const message={
        "collection_name":req.body.collection_name,
        "message":req.body.message,
        "send_by":req.body.send_by,
        "time":req.body.time,
        "message_type":req.body.message_type,
      
            "_replyto":req.body._replyto,
            "message_id":req.body.message_id,
            "message_reply_type":req.body.message_reply_type,
            "replyto":req.body.replyto,
            "replyby":req.body.replyby
            
           }
          
       
           
          const newUser=await createNewmsg({
           message,
          
          });
          res.status(200).json({
            status:1,
            msg:newUser,
            rescode:200});
        
        

    } catch (error) {
        res.status(400).json({
            status:0,
            msg:error.message,
            rescode:400});
        

        
    }
});
//chatchannel name end point
router.post("/chat_channel",async(req,res)=>{
    try {
        var user={
            "Name": req.body.Name,
            "Email":req.body.Email,
           
        };
        
        console.log(JSON.stringify( user) + "routes ");

               const newUser=await chat_channel_created({
                user,
             });

             console.log(newUser);
               res.status(200).json({
              
                 status:1,
                 msg:newUser,
                 rescode:200});

    } catch (error) {
        res.status(400).json({
            msga:"heyta",
            status:0,
            msg:error.message,
            rescode:400});
    }
});
//detail
router.post("/detail_chat_channel",async(req,res)=>{
   try {
    

    var chat_detail={
        "Detail":req.body.Detail,
        "chat_channel_user":req.body.chat_channel_user,
    }
    console.log("hrsh");
    console.log(chat_detail );

    const newdetail=await chat_detail_controller({
        chat_detail,
     });
     res.status(200).json({
              
        status:1,
        msg:newdetail,
        rescode:200});


   } catch (error) {
    res.status(400).json({
        msga:"heyta",
        status:0,
        msg:error.message,
        rescode:400});}
});
//edit end point
router.post ("/edit",async(req,res)=>{
    try {
        var edi ={
            "collection_name":req.body.collection_name,
            "messageid": req.body.messageid,
            "newmsg":req.body.newmsg,
        }
         console.log(edi.collection_name);
        const newdetail=await updatemsg({
          edi:{
                "collection_name":req.body.collection_name,
            "messageid":req.body.messageid,
            "newmsg":req.body.newmsg,
            }
         });
        res.status(200).json({
              
            status:1,
            msg:newdetail,
            rescode:200});
    


    } catch (error) {
        res.status(400).json({
            msga:"heyta",
            status:0,
            msg:error.message,
            rescode:400});
    }
})
// fetch end point
router.post('/page', async (req, res) => {
    const page = parseInt(req.body.page) ; 
    const pageSize = parseInt(req.body.pageSize); 
    const collection_name=req.body.collection_name;
    console.log(page,+pageSize);
    try {
        
        const data = await fetchdataffunction(collection_name).find().skip((page - 1) * pageSize).limit(pageSize);
    res.json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
 //delete end point
router.post("/delete_msg", async (req, res) => {
  try {
    var remove = {
      "collection_name": req.body.collection_name,
      "id": req.body.id,
    }
    console.log(remove.collection_name);
    // Assuming rem is a function defined elsewhere to remove the message
    const hat = await rem({
      remove
    });
    res.status(200).json({
              
        status:1,
        msg:hat,
        rescode:200});
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
//muted function
router.post("/muted",async(req,res)=>{
    try {
        var muteduser={
            "collection_name": req.body.collection_name,
            "user_id":req.body.user_id,
            "id": req.body.id,
            "mute":req.body.mute,
        }

        const muteuser=await muted_controller_fuction({
            muteduser,
        })

        res.status(200).json({
              
            status:1,
            msg:muteuser,
            rescode:200});
    
    } catch (error) {
        
    }
})
// admin end point 
router.post("/admin",async(req,res)=>{
     try {
        var admin_byuser={
            "collection_name":req.body.collection_name,
            "user_id":req.body.user_id,
            "id":req.body.id,
            "admin":req.body.admin
        }

        const admin_yesornot= await admin_controller_fuction({
            admin_byuser,
        })
        res.status(200).json({
              
            status:1,
            msg:admin_yesornot,
            rescode:200});
     } catch (error) {
        console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
     }
})
////user data return krna k end point 
router.post("/usersfetch", async (req, res) => {
    try {
        // Find the document containing the users array
       var fetch={
        "collection_name":req.body.collection_name,
       }
      console.log(fetch);
       const userDetail= await fetchuser({fetch});
        res.status(200).json({
            status: 1,
            users: userDetail,
            rescode: 200
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
//active status 

router.post("/active_statususer",async(req,res)=>{
    try {
        var active={
            "collection_name":req.body.collection_name,
            "user_id":req.body.user_id,
            "id":req.body.id,
            "active_status":req.body.active_status,
        }

        const activeuser=await active_controller_fuction({
            active,
        })
        res.status(200).json({
            status: 1,
            users: activeuser,
            rescode: 200
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
//delete collection

router.delete("/delete_collection",async(req,res)=>{
    try {
        const activeuser=await delete_collection_message({
            delete_collection:{
                "collection_name":req.body.collection_name,
            }
    });

        res.status(200).json({
            status: 1,
            users: "done",
            rescode: 200
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


module.exports=router;